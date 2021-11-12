import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { GroupVisibility } from "../enums";
import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { GroupUser } from "./GroupUser";
import { User } from "./User";
import { GroupEvent } from "./GroupEvent";

@ObjectType()
@Entity()
export class Group {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  // group name
  @Field(() => String)
  @Property({ type: "text" })
  name: string;

  // group description
  @Field(() => String)
  @Property({ type: "text" })
  description: string;

  // slug for URL
  @Field(() => String)
  @Property({ type: "text" })
  slug: string;

  // group visibility
  @Field(() => String)
  @Enum(() => GroupVisibility)
  visibility: GroupVisibility;

  // user affiliations
  @Field(() => [GroupUser])
  @OneToMany(() => GroupUser, (gu: GroupUser) => gu.group, { nullable: true })
  users = new Collection<GroupUser>(this);

  // group posts
  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (p: Post) => p.group, { nullable: true })
  posts = new Collection<Post>(this);

  // invite requests received
  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User)
  inviteRequests: Collection<User> = new Collection<User>(this);

  // General meeting time
  // @Field(() => GroupEvent, { nullable: true })
  // @Property()
  // generalMeeting?: GroupEvent;

  // Group Events
  @Field(() => [GroupEvent], { nullable: true })
  @OneToMany(() => GroupEvent, (e: GroupEvent) => e.group, { nullable: true })
  events = new Collection<GroupEvent>(this);
}
