import { FieldError, MyContext } from "../types";
import {
  Resolver,
  Ctx,
  Query,
  InputType,
  Field,
  ObjectType,
  Mutation,
  Arg,
} from "type-graphql";
import { Group } from "../entities/Group";
import { GroupVisibility } from "../enums";
import { slugify } from "../utils/slugify";
import { User } from "../entities/User";
import { GroupUser } from "../entities/GroupUser";
import { Collection } from "@mikro-orm/core";

@InputType()
class NewGroupInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  visibility: GroupVisibility;
}

@ObjectType()
class GroupResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Group, { nullable: true })
  group?: Group;
}

@Resolver()
export class GroupResolver {
  // dev tools

  // get all groups
  @Query(() => [Group])
  groups(@Ctx() { em }: MyContext): Promise<Group[]> {
    return em.find(Group, {});
  }

  // prod tools

  // queries
  @Query(() => [GroupUser], { nullable: true })
  async myGroups(
    @Arg("userId") userId: number,
    @Ctx() { em }: MyContext
  ): Promise<Collection<GroupUser> | null> {
    const currentUser = await em.findOne(User, { id: userId });
    if (!currentUser) {
      return null;
    }

    return currentUser.groups;
  }

  @Query(() => Group, { nullable: true })
  async groupBySlug(
    @Arg("slug") slug: string,
    @Ctx() { em }: MyContext
  ): Promise<Group | null> {
    const group = await em.findOne(Group, { slug: slug });
    if (!group) {
      return null;
    }
    return group;
  }

  // mutations
  @Mutation(() => GroupResponse)
  async createGroup(
    @Arg("input") input: NewGroupInput,
    @Ctx() { em, req }: MyContext
  ): Promise<GroupResponse> {
    // validate input
    if (input.name.length < 1) {
      return {
        errors: [
          {
            field: "name",
            message: "group name empty",
          },
        ],
      };
    }
    if (input.description.length < 1) {
      return {
        errors: [
          {
            field: "description",
            message: "group description empty",
          },
        ],
      };
    }
    if (input.visibility.length < 1) {
      return {
        errors: [
          {
            field: "visibility",
            message: "group visibility empty",
          },
        ],
      };
    }
    if (!Object.values(GroupVisibility).includes(input.visibility)) {
      return {
        errors: [
          {
            field: "visibility",
            message: "invalid visibility enum",
          },
        ],
      };
    }

    // create group
    const slug = slugify(input.name);
    const group = em.create(Group, {
      name: input.name,
      description: input.description,
      slug: slug,
      visibility: input.visibility,
    });

    // insert user as owner
    const currentUserId = req.session.userId;
    const currentUser = await em.findOne(User, { id: currentUserId });
    if (!currentUser) {
      return {
        errors: [
          {
            field: "user",
            message: "invalid user",
          },
        ],
      };
    }

    const owner = em.create(GroupUser, {
      user: currentUser,
      group: group,
      role: "owner",
    });
    group.users.add(owner);
    currentUser?.groups.add(owner);

    try {
      await em.persistAndFlush(group);
    } catch (error) {
      console.error(error);
    }

    try {
      await em.persistAndFlush(currentUser);
    } catch (error) {
      console.error(error);
    }

    try {
      await em.persistAndFlush(owner);
    } catch (error) {
      console.error(error);
    }

    return { group };
  }

  @Mutation(() => GroupResponse, { nullable: true })
  async updateGroup(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name: String,
    @Arg("description", { nullable: true }) description: String,
    @Arg("visibility", { nullable: true }) visibility: GroupVisibility,
    @Ctx() { em }: MyContext
  ): Promise<GroupResponse | null> {
    const group = await em.findOne(Group, { id });
    if (!group) {
      return null;
    }

    if (typeof name !== "undefined") {
      if (name.length > 1) {
        group.name = name as string;
        group.slug = slugify(name as string);
      }
    }

    if (typeof description !== "undefined") {
      if (description.length > 1) {
        group.description = description as string;
      }
    }

    if (typeof visibility !== "undefined") {
      if (!Object.values(GroupVisibility).includes(visibility)) {
        return {
          errors: [
            {
              field: "visibility",
              message: "invalid visibility enum",
            },
          ],
        };
      }

      if (visibility !== group.visibility && visibility.length > 1) {
        group.visibility = visibility;
      }
    }

    try {
      await em.persistAndFlush(group);
    } catch (error) {
      console.error(error);
    }

    return { group };
  }

  @Mutation(() => GroupResponse)
  async joinGroup(
    @Arg("id") id: number,
    @Ctx() { em, req }: MyContext
  ): Promise<GroupResponse> {
    const group = await em.findOne(Group, { id });
    if (!group) {
      return {
        errors: [
          {
            field: "group",
            message: "invalid group",
          },
        ],
      };
    }

    const currentUser = await em.findOne(User, { id: req.session.userId });
    if (!currentUser) {
      return {
        errors: [
          {
            field: "user",
            message: "invalid user",
          },
        ],
      };
    }

    const groupUsers = group.users.getItems();
    for (let i = 0; i < groupUsers.length; i++) {
      if (groupUsers[i].user.id === currentUser.id) {
        return {
          errors: [
            {
              field: "group user",
              message: "User already in group",
            },
          ],
        };
      }
    }

    if (group.visibility !== "open") {
      return {
        errors: [
          {
            field: "group",
            message: "group visibility not OPEN",
          },
        ],
      };
    }

    const groupUser = em.create(GroupUser, {
      user: currentUser,
      group: group,
      role: "read",
    });

    group.users.add(groupUser);
    currentUser.groups.add(groupUser);

    try {
      await em.persistAndFlush(groupUser);
    } catch (error) {
      console.error(error);
    }

    try {
      await em.persistAndFlush(group);
    } catch (error) {
      console.error(error);
    }

    try {
      await em.persistAndFlush(currentUser);
    } catch (error) {
      console.error(error);
    }

    return { group };
  }
}
