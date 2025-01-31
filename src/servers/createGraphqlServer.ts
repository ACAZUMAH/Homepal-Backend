import { json } from "express";
import cors from "cors";
import { ApolloServer, ContextFunction } from "@apollo/server";
import {
  expressMiddleware,
  ExpressContextFunctionArgument,
} from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { grapghqlServer, grapghqlContext } from "src/common/interfaces";
import { createGraphqlSubscriptionServer } from "./createGraphqlSubscriptionServer";
import { createDataLoaders } from "src/dataloaders";

const context: ContextFunction<[ExpressContextFunctionArgument], grapghqlContext> = async ({ req }) => {
  const user = req.user;
  const token = req.token;
  const dataLoaders = createDataLoaders()

  return {
    user,
    token,
    ...dataLoaders
  };
};

export const createGraphqlServer = async ({app, schema, httpServer}: grapghqlServer) => {
    const subscriptionServerCleanup = createGraphqlSubscriptionServer({ schema, httpServer })
  const server = new ApolloServer({
    schema,
    plugins: [{
        async serverWillStart() {
            return {
                async drainServer() { await subscriptionServerCleanup.dispose() }
            }
        }},
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  const apolloExpressMiddleware = expressMiddleware(server, { context });

  app.use("/graphql", cors(), json(), apolloExpressMiddleware);

  return server;
};
