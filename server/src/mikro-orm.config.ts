import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";
import { __prod__ } from "./constants";
import { Group } from "./entities/Group";
import { GroupUser } from "./entities/GroupUser";
import { PostReply } from "./entities/PostReply";
import { GroupEvent } from "./entities/GroupEvent";
import { EventLocation } from "./entities/EventLocation";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
  entities: [
    Post,
    User,
    Group,
    GroupUser,
    PostReply,
    GroupEvent,
    EventLocation,
  ],
  dbName: "capstone",
  port: 5433,
  type: "postgresql",
  user: "capstone",
  password: "capstone",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
