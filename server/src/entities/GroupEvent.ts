import {
  Entity,
  ManyToOne,
  // OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Group } from "./Group";
// import { EventLocation } from "./EventLocation";
// import { User } from "./User";

@ObjectType()
@Entity()
export class GroupEvent {
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

  // @Field(() => User)
  // @Property()
  // createdBy: User;

  @Field(() => Group)
  @ManyToOne(() => Group)
  group: Group;

  // time + date
  @Field(() => String)
  @Property({ type: "date" })
  eventTime: string;

  // location
  // @Field(() => EventLocation, { nullable: true })
  // @OneToOne({ nullable: true })
  // location?: EventLocation;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  location?: string;

  // online links
  @Field({ nullable: true })
  @Property()
  meetingLink?: string;
}
