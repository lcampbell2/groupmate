import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { GroupEvent } from "./GroupEvent";

@ObjectType()
@Entity()
export class EventLocation {
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
  address: string;

  @Field()
  @Property({ type: "text" })
  locationName: string;

  @Field(() => GroupEvent)
  @ManyToOne(() => GroupEvent)
  event: GroupEvent;
}
