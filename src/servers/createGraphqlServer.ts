import { json } from "express";
import cors from "cors";
import { ApolloServer, ContextFunction } from "@apollo/server";
import {
  expressMiddleware,
  ExpressContextFunctionArgument,
} from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { GrapghqlServer, GrapghqlContext } from "src/common/interfaces";
import { createGraphqlSubscriptionServer } from "./createGraphqlSubscriptionServer";
import { formatError } from "./formartError";
import { createDataLoaders } from "src/dataloaders";

const context: ContextFunction<[ExpressContextFunctionArgument], GrapghqlContext> = async ({ req }) => {
  const user = req.user;
  const token = req.token;
  const dataLoaders = createDataLoaders()

  return {
    user,
    token,
    ...dataLoaders
  };
};

export const createGraphqlServer = async ({app, schema, httpServer}: GrapghqlServer) => {
    const subscriptionServerCleanup = createGraphqlSubscriptionServer({ schema, httpServer })
  const server = new ApolloServer({
    schema,
    formatError,
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
