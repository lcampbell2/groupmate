import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
  entities: [Post, User],
  dbName: "capstone",
  port: 5433,
  type: "postgresql",
  user: "capstone",
  password: "capstone",
  debug: process.env.NODE_ENV !== "production",
} as Parameters<typeof MikroORM.init>[0];
