import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { __prod__ } from "./constants";
import { GroupResolver } from "./resolvers/group";
// import { User } from "./entities/User";
// import { Post } from "./entities/Post";
// import { Group } from "./entities/Group";
// import { GroupUser } from "./entities/GroupUser";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  //    use to clear db
  // ====================================
  // await orm.em.nativeDelete(GroupUser, {});
  // await orm.em.nativeDelete(User, {});
  // await orm.em.nativeDelete(Group, {});
  // await orm.em.nativeDelete(Post, {});
  // ====================================

  // await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  redis.on("error", (error) => {
    console.error(error);
  });
  redis.on("connect", () => {
    console.info("Successfully connected to redis");
  });

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "gnbviouwesgnfdegndeognbgouerdsbhouge",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver, GroupResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res, redis }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        //options
      }),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log("\n==============ERROR================\n");
  console.error(err);
});
