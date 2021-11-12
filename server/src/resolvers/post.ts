import { Post } from "../entities/Post";
import { BooleanResponse, FieldError, MyContext } from "../types";
import {
  Resolver,
  Query,
  Ctx,
  Arg,
  Int,
  Mutation,
  Field,
  ObjectType,
  // InputType,
} from "type-graphql";
import { User } from "../entities/User";
import { Group } from "../entities/Group";
import { PostReply } from "../entities/PostReply";
import { GroupEvent } from "../entities/GroupEvent";

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@ObjectType()
class EventResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => GroupEvent, { nullable: true })
  event?: GroupEvent;
}

// @InputType()
// class LocationInput {
//   @Field()
//   country: string;

//   @Field()
//   region: string;

//   @Field()
//   city: string;

//   @Field()
//   postalCode: string;

//   @Field()
//   address: string;

//   @Field()
//   locationName: string;
// }

@Resolver()
export class PostResolver {
  // queries
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  // TODO myEvents
  @Query(() => [GroupEvent], { nullable: true })
  async myEvents(
    @Ctx() { em, req }: MyContext
  ): Promise<Array<GroupEvent> | null> {
    const currentUser = await em.findOne(User, { id: req.session.userId });
    if (!currentUser) {
      console.error("invalid user");
      return null;
    }

    let userEvents: GroupEvent[] = [];

    await currentUser.groups.init();

    for (const group of currentUser.groups) {
      // console.log(group.group.name);
      try {
        await group.group.events.init();
        for (const event of group.group.events) {
          // console.log(event.title);
          userEvents.push(event);
        }
      } catch {
        console.error("no events");
      }
    }

    return userEvents;
  }

  // mutations
  @Mutation(() => PostResponse)
  async createPost(
    @Arg("title") title: String,
    @Arg("description") description: String,
    @Arg("groupId") groupId: number,
    @Ctx() { em, req }: MyContext
  ): Promise<PostResponse> {
    // validate input
    if (title.length < 1) {
      return {
        errors: [
          {
            field: "title",
            message: "post title empty",
          },
        ],
      };
    }
    if (description.length < 1) {
      return {
        errors: [
          {
            field: "description",
            message: "post description empty",
          },
        ],
      };
    }

    // add post to author user and group
    const author = await em.findOne(User, { id: req.session.userId });
    if (!author) {
      return {
        errors: [
          {
            field: "user",
            message: "invalid user",
          },
        ],
      };
    }
    const group = await em.findOne(Group, { id: groupId });
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

    const post = em.create(Post, { title, description, author, group });
    group?.posts.add(post);
    author?.posts.add(post);

    try {
      await em.persistAndFlush(post);
    } catch (err) {
      console.error(err);
    }

    try {
      await em.persistAndFlush(author);
    } catch (err) {
      console.error(err);
    }

    try {
      await em.persistAndFlush(group);
    } catch (err) {
      console.error(err);
    }

    return { post };
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: String,
    @Arg("description", () => String, { nullable: true }) description: String,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      if (title.length > 1) {
        post.title = title as string;
      }
    }

    if (typeof description !== "undefined") {
      if (description.length > 1) {
        post.description = description as string;
      }
    }

    try {
      await em.persistAndFlush(post);
    } catch (error) {
      console.error(error);
    }

    return post;
  }

  @Mutation(() => PostResponse)
  async createReply(
    @Arg("id") id: number,
    @Arg("message", () => String) message: String,
    @Ctx() { em, req }: MyContext
  ): Promise<PostResponse> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return {
        errors: [
          {
            field: "post",
            message: "invalid post",
          },
        ],
      };
    }

    const author = await em.findOne(User, { id: req.session.userId });
    if (!author) {
      return {
        errors: [
          {
            field: "user",
            message: "invalid user",
          },
        ],
      };
    }

    if (message.length < 1) {
      return {
        errors: [
          {
            field: "reply",
            message: "post reply empty",
          },
        ],
      };
    }

    const reply = em.create(PostReply, { message, author, post });
    post.replies.add(reply);

    try {
      await em.persistAndFlush(post);
    } catch (err) {
      console.error(err);
    }

    try {
      await em.persistAndFlush(reply);
    } catch (err) {
      console.error(err);
    }

    return { post };
  }

  // TOOD: removePost
  @Mutation(() => BooleanResponse)
  async removePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<BooleanResponse> {
    em.nativeDelete(Post, { id });
    return { status: true };
  }

  @Mutation(() => EventResponse)
  async createEvent(
    @Arg("groupId") groupId: number,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("eventTime") eventTime: string,
    @Arg("location", { nullable: true }) location: string,
    @Arg("meetingLink", { nullable: true }) meetingLink: string,
    @Ctx() { em, req }: MyContext
  ): Promise<EventResponse> {
    if (title.length < 1) {
      return {
        errors: [
          {
            field: "title",
            message: "event title empty",
          },
        ],
      };
    }
    if (description.length < 1) {
      return {
        errors: [
          {
            field: "description",
            message: "event description empty",
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
    const group = await em.findOne(Group, { id: groupId });
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

    if (eventTime.length < 1) {
      return {
        errors: [
          {
            field: "eventTime",
            message: "eventTime empty",
          },
        ],
      };
    }

    // if (location.locationName.length < 1) {
    //   return {
    //     errors: [
    //       {
    //         field: "locationName",
    //         message: "locationName empty",
    //       },
    //     ],
    //   };
    // }
    // if (location.address.length < 1) {
    //   return {
    //     errors: [
    //       {
    //         field: "address",
    //         message: "address empty",
    //       },
    //     ],
    //   };
    // }
    // if (location.city.length < 1) {
    //   return {
    //     errors: [
    //       {
    //         field: "city",
    //         message: "city empty",
    //       },
    //     ],
    //   };
    // }
    // if (location.region.length < 1) {
    //   return {
    //     errors: [
    //       {
    //         field: "region",
    //         message: "region empty",
    //       },
    //     ],
    //   };
    // }
    // if (location.country.length < 1) {
    //   return {
    //     errors: [
    //       {
    //         field: "country",
    //         message: "country empty",
    //       },
    //     ],
    //   };
    // }
    // if (location.postalCode.length < 1) {
    //   return {
    //     errors: [
    //       {
    //         field: "postalCode",
    //         message: "postalCode empty",
    //       },
    //     ],
    //   };
    // }

    const event = em.create(GroupEvent, {
      title,
      description,
      eventTime,
      location,
      group,
      meetingLink,
      // createdBy: currentUser,
    });
    group?.events.add(event);

    try {
      await em.persistAndFlush(event);
    } catch (err) {
      console.error(err);
    }

    try {
      await em.persistAndFlush(group);
    } catch (err) {
      console.error(err);
    }

    return { event };
  }
}
