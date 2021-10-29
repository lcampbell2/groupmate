import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Group } from "./Group";
import { User } from "./User";

@ObjectType()
class Location {
  @Field()
  @Property({ type: "text" })
  country: string;

  @Field()
  @Property({ type: "text" })
  region: string;

  @Field()
  @Property({ type: "text" })
  city: string;

  @Field()
  @Property({ type: "text" })
  postalCode: string;

  @Field()
  @Property({ type: "text" })
  locationName: string;
}

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

  @Field(() => User)
  @Property()
  createdBy: User;

  @Field(() => Group)
  @ManyToOne(() => Group)
  group: Group;

  // time + date
  @Field(() => String)
  @Property({ type: "timestamp" })
  timeStamp: string;

  // location
  @Field({ nullable: true })
  @Property()
  location?: Location;

  // online links
  @Field({ nullable: true })
  @Property()
  meetingLink?: string;
}
