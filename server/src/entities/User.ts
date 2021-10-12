import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { GroupUser } from "./GroupUser";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  // display name
  @Field()
  @Property({ type: "text" })
  displayName!: string;

  // email address
  @Field()
  @Property({ type: "text", unique: true })
  email!: string;

  // hashed password
  @Property({ type: "text" })
  password!: string;

  // user posts
  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (p: Post) => p.author, { nullable: true })
  posts = new Collection<Post>(this);

  // group affiliations
  @Field(() => [GroupUser])
  @OneToMany(() => GroupUser, (gu: GroupUser) => gu.user, { nullable: true })
  groups = new Collection<GroupUser>(this);
}
