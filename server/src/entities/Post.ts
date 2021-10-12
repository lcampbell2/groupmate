import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Group } from "./Group";
import { User } from "./User";

// @ObjectType()
// class PostReply {
//   @Field()
//   replyAuthor: User;
//   @Field()
//   replyText: string;
// }

@ObjectType()
@Entity()
export class Post {
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
  title!: string;

  @Field()
  @Property({ type: "text" })
  descrpition!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;

  @Field(() => Group)
  @ManyToOne(() => Group)
  group: Group;

  // replies, nullable: true
  // [PostReply]
}
