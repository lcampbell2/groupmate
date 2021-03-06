import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Group } from "./Group";
import { User } from "./User";
import { PostReply } from "./PostReply";

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
  description!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;

  @Field(() => Group)
  @ManyToOne(() => Group)
  group: Group;

  @Field(() => [PostReply], { nullable: true })
  @OneToMany(() => PostReply, (pr: PostReply) => pr.post, { nullable: true })
  replies = new Collection<PostReply>(this);
}
