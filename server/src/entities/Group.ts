import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { GroupVisibility } from "../enums";
import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { GroupUser } from "./GroupUser";

// @ObjectType()
// class Location {
//   @Field()
//   address: string;
//   @Field()
//   city: string;
//   @Field()
//   province: string;
//   @Field()
//   country: string;
//   @Field()
//   postalCode: string;
// }

// @ObjectType()
// class Event {
//   title: string;
//   description: string;
//   location: Location;
//   time: Date;
// }

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

  // general meeting time, nullable: true
  // Date

  // general meeting location, nullable: true
  // Location

  // online meeting link, nullable: true
  // string

  // events, nullable: true, one-to-many
  // [Event]
}
