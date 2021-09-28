import { User } from "../entities/User";
import { MyContext } from "src/types";
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
// import { COOKIE_NAME } from "src/constants";

@InputType()
class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
class NewUserInput {
  @Field()
  username: string;
  @Field()
  displayName: string;
  @Field()
  password: string;
  @Field()
  confirmPassword: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserRepsonse)
  async register(
    @Arg("options") options: NewUserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserRepsonse> {
    if (options.username.length < 1) {
      return {
        errors: [
          {
            field: "username",
            message: "username empty",
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
      username: options.username,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.detail.includes("already exists")) {
        // duplicate username error
        return {
          errors: [
            {
              field: "username",
              message: "Username is taken",
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
      username: options.username.toLowerCase(),
    });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "user does not exist",
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
}
