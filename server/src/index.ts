import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { __prod__ } from "./constants";
// import { User } from "./entities/User";
// import { sendEmail } from "./utils/sendEmail";

const main = async () => {
  // sendEmail("l.campbell144768@gmail.com", "testing testing 123");
  const orm = await MikroORM.init(mikroOrmConfig);
  // use to delete all users from db
  // await orm.em.nativeDelete(User, {});
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  redisClient.on("error", (error) => {
    console.error(error);
  });
  redisClient.on("connect", () => {
    console.info("Successfully connected to redis");
  });

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
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
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
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
