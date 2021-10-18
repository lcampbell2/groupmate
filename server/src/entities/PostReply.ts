import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class PostReply {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" })
  message!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post;
}
