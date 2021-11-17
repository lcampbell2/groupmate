import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Group } from "./Group";

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

  @Field(() => Group)
  @ManyToOne(() => Group)
  group: Group;

  // time + date
  @Field(() => String)
  @Property({ type: "date" })
  startTime: string;

  @Field(() => String)
  @Property({ type: "date" })
  endTime: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  location?: string;

  // online links
  @Field({ nullable: true })
  @Property()
  meetingLink?: string;
}
