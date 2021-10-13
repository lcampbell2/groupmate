import { Entity, Enum, ManyToOne, PrimaryKey } from "@mikro-orm/core";
import { UserRole } from "../enums";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Group } from "./Group";

@ObjectType()
@Entity()
export class GroupUser {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => Group)
  @ManyToOne(() => Group)
  group: Group;

  @Field(() => String)
  @Enum(() => UserRole)
  role: UserRole;
}
