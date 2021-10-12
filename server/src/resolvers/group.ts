import { MyContext } from "../types";
import { Resolver, Ctx, Query } from "type-graphql";
import { Group } from "../entities/Group";

@Resolver()
export class GroupResolver {
  // get all groups
  @Query(() => [Group])
  groups(@Ctx() { em }: MyContext): Promise<Group[]> {
    return em.find(Group, {});
  }
}
