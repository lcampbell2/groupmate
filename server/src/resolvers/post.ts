import { Post } from "../entities/Post";
import { FieldError, MyContext } from "../types";
import {
  Resolver,
  Query,
  Ctx,
  Arg,
  Int,
  Mutation,
  Field,
  ObjectType,
} from "type-graphql";
import { User } from "../entities/User";
import { Group } from "../entities/Group";

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

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

  // @Mutation(() => Boolean)
  // async removePost(
  //   @Arg("id") id: number,
  //   @Ctx() { em }: MyContext
  // ): Promise<boolean> {
  //   em.nativeDelete(Post, { id });
  //   return true;
  // }
}
