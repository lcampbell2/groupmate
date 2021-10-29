import { User } from "../entities/User";
import { FieldError, MyContext, BooleanResponse } from "../types";
import {
  Resolver,
  Arg,
  InputType,
  Field,
  Ctx,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import argon2 from "argon2";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { UserRole } from "../enums";
import { GroupUser } from "../entities/GroupUser";
import { Group } from "../entities/Group";

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
class NewUserInput {
  @Field()
  email: string;
  @Field()
  displayName: string;
  @Field()
  password: string;
  @Field()
  confirmPassword: string;
}

@ObjectType()
class UserRepsonse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  // dev tools
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    em.nativeDelete(User, { id });
    return true;
  }

  // prod tools

  // queries
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Query(() => Boolean)
  async isUserAdmin(
    @Arg("groupId") groupId: number,
    @Ctx() { em, req }: MyContext
  ) {
    const user = await em.findOne(User, { id: req.session.userId });
    if (!user) {
      console.error("invalid user");
      return false;
    }
    const group = await em.findOne(Group, { id: groupId });
    if (!group) {
      console.error("invalid group");
      return false;
    }
    const groupUser = await em.findOne(GroupUser, { user, group });
    if (!groupUser) {
      console.error("invalid group user");
      return false;
    }

    if (groupUser.role === "admin") {
      return true;
    } else {
      return false;
    }
  }

  @Query(() => Boolean)
  async isUserOwner(
    @Arg("groupId") groupId: number,
    @Ctx() { em, req }: MyContext
  ) {
    const user = await em.findOne(User, { id: req.session.userId });
    if (!user) {
      console.error("invalid user");
      return false;
    }
    const group = await em.findOne(Group, { id: groupId });
    if (!group) {
      console.error("invalid group");
      return false;
    }
    const groupUser = await em.findOne(GroupUser, { user, group });
    if (!groupUser) {
      console.error("invalid group user");
      return false;
    }

    if (groupUser.role === "owner") {
      return true;
    } else {
      return false;
    }
  }

  // TODO myEvents

  // mutations
  @Mutation(() => UserRepsonse)
  async register(
    @Arg("options") options: NewUserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserRepsonse> {
    if (options.email.length < 1) {
      return {
        errors: [
          {
            field: "email",
            message: "email empty",
          },
        ],
      };
    }
    if (!options.email.includes("@")) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email",
          },
        ],
      };
    }
    if (options.displayName.length < 1) {
      return {
        errors: [
          {
            field: "displayName",
            message: "displayName empty",
          },
        ],
      };
    }
    if (options.password.length < 1) {
      return {
        errors: [
          {
            field: "password",
            message: "password empty",
          },
        ],
      };
    }
    if (options.confirmPassword.length < 1) {
      return {
        errors: [
          {
            field: "confirmPassword",
            message: "confirmPassword empty",
          },
        ],
      };
    }
    if (options.password !== options.confirmPassword) {
      return {
        errors: [
          {
            field: "confirmPassword",
            message: "password and confirmPassword do not match",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      displayName: options.displayName,
      email: options.email,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.detail.includes("already exists")) {
        // duplicate email error
        return {
          errors: [
            {
              field: "email",
              message: "email is taken",
            },
          ],
        };
      }
      console.error(error);
    }

    // sets session cookie
    // login on registrations
    req.session!.userId = user.id;

    return { user };
  }

  @Mutation(() => UserRepsonse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserRepsonse> {
    const user = await em.findOne(User, {
      email: options.email.toLowerCase(),
    });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "user does not exist",
          },
        ],
      };
    }
    if (!options.email.includes("@")) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email",
          },
        ],
      };
    }
    if (options.email.length < 1) {
      return {
        errors: [
          {
            field: "email",
            message: "email empty",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "password is incorrect",
          },
        ],
      };
    }

    req.session!.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie("qid");
        if (err) {
          console.error(err);
          resolve(false);
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => UserRepsonse, { nullable: true })
  async updateEmail(
    @Arg("id") id: number,
    @Arg("email", () => String) email: String,
    @Ctx() { em }: MyContext
  ): Promise<UserRepsonse | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (typeof email !== "undefined") {
      // input field is empty
      if (email.length < 1) {
        return {
          errors: [
            {
              field: "email",
              message: "email empty",
            },
          ],
        };
      }
      if (!email.includes("@")) {
        return {
          errors: [
            {
              field: "email",
              message: "invalid email",
            },
          ],
        };
      }
      // email changed to existing email
      try {
        user.email = email as string;
        await em.persistAndFlush(user);
      } catch (error) {
        if (error.detail.includes("already exists")) {
          // duplicate email error
          return {
            errors: [
              {
                field: "email",
                message: "email is taken",
              },
            ],
          };
        }
        console.error(error);
      }
    }
    return { user };
  }

  @Mutation(() => UserRepsonse, { nullable: true })
  async updateDisplayName(
    @Arg("id") id: number,
    @Arg("displayName", () => String) displayName: String,
    @Ctx() { em }: MyContext
  ): Promise<UserRepsonse | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (typeof displayName !== "undefined") {
      // input field is empty
      if (displayName.length < 1) {
        return {
          errors: [
            {
              field: "displayName",
              message: "displayName empty",
            },
          ],
        };
      }
      // email changed to existing email
      user.displayName = displayName as string;
      await em.persistAndFlush(user);
    }
    return { user };
  }

  @Mutation(() => UserRepsonse, { nullable: true })
  async updatePassword(
    @Arg("id") id: number,
    @Arg("currentPassword", () => String)
    currentPassword: String,
    @Arg("newPassword", () => String)
    newPassword: String,
    @Arg("confirmNewPassword", () => String)
    confirmNewPassword: String,
    @Ctx() { em }: MyContext
  ): Promise<UserRepsonse | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (
      typeof currentPassword !== "undefined" &&
      typeof newPassword !== "undefined" &&
      typeof confirmNewPassword !== "undefined"
    ) {
      // currentPassword field is empty
      if (currentPassword.length < 1) {
        return {
          errors: [
            {
              field: "currentPassword",
              message: "currentPassword empty",
            },
          ],
        };
      }
      // newPassword field is empty
      if (newPassword.length < 1) {
        return {
          errors: [
            {
              field: "newPassword",
              message: "newPassword empty",
            },
          ],
        };
      }
      // confirmNewPassword field is empty
      if (confirmNewPassword.length < 1) {
        return {
          errors: [
            {
              field: "confirmNewPassword",
              message: "confirmNewPassword empty",
            },
          ],
        };
      }
      // password is incorrect
      const valid = await argon2.verify(
        user.password,
        currentPassword as string
      );
      if (!valid) {
        return {
          errors: [
            {
              field: "password",
              message: "password is incorrect",
            },
          ],
        };
      }
      // new password and confirmation do not match
      if (newPassword !== confirmNewPassword) {
        return {
          errors: [
            {
              field: "confirmNewPassword",
              message: "password and confirmPassword do not match",
            },
          ],
        };
      }
      const hashedPassword = await argon2.hash(newPassword as string);
      user.password = hashedPassword;
      await em.persistAndFlush(user);
    }
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em, redis }: MyContext
  ) {
    const user = await em.findOne(User, { email });
    // email not attached to user
    if (!user) {
      return true;
    }

    const resetToken = v4();

    await redis.set(
      `forgot-password:${resetToken}`,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 1
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/reset-password/${resetToken}">Reset your GroupMate password</a>`
    );

    return true;
  }

  @Mutation(() => UserRepsonse)
  async resetPassword(
    @Arg("resetToken") resetToken: string,
    @Arg("newPassword") newPassword: string,
    @Arg("confirmNewPassword") confirmNewPassword: string,
    @Ctx() { em, redis }: MyContext
  ): Promise<UserRepsonse> {
    // newPassword field is empty
    if (newPassword.length < 1) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "newPassword empty",
          },
        ],
      };
    }
    // confirmNewPassword field is empty
    if (confirmNewPassword.length < 1) {
      return {
        errors: [
          {
            field: "confirmNewPassword",
            message: "confirmNewPassword empty",
          },
        ],
      };
    }
    // new password and confirmation do not match
    if (newPassword !== confirmNewPassword) {
      return {
        errors: [
          {
            field: "confirmNewPassword",
            message: "password and confirmPassword do not match",
          },
        ],
      };
    }

    const userId = await redis.get(`forgot-password:${resetToken}`);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const user = await em.findOne(User, { id: parseInt(userId) });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user does not exist",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(newPassword as string);
    user.password = hashedPassword;
    await em.persistAndFlush(user);

    return { user };
  }

  @Mutation(() => BooleanResponse)
  async changeUserRole(
    @Arg("userId") userId: number,
    @Arg("groupId") groupId: number,
    @Arg("newRole") newRole: UserRole,
    @Ctx() { em, req }: MyContext
  ): Promise<BooleanResponse> {
    const group = await em.findOne(Group, { id: groupId });
    if (!group) {
      console.error("invalid group");
      return { status: false };
    }

    // see if currentUser is an admin
    const currentUser = await em.findOne(User, { id: req.session.userId });
    if (!currentUser) {
      console.error("invalid user");
      return { status: false };
    }
    const groupAdmin = await em.findOne(GroupUser, {
      user: currentUser,
      group,
    });
    if (
      !groupAdmin ||
      (groupAdmin.role !== "admin" && groupAdmin.role !== "owner")
    ) {
      console.error("current user is NOT a group admin");
      return { status: false };
    }

    // get user
    const user = await em.findOne(User, { id: userId });
    if (!user) {
      console.error("invalid user");
      return { status: false };
    }
    const groupUser = await em.findOne(GroupUser, { user, group });
    if (!groupUser) {
      console.error("invalid group user");
      return { status: false };
    }

    if (!Object.values(UserRole).includes(newRole)) {
      console.error("invalid user role value");
      return { status: false };
    }

    if (newRole === "owner") {
      console.error("Only one group owner allowed");
      return { status: false };
    }

    if (newRole === groupUser.role) {
      console.error("new role same as old");
      return { status: false };
    }

    groupUser.role = newRole;
    await em.persistAndFlush(groupUser);
    return { status: true };
  }
}
