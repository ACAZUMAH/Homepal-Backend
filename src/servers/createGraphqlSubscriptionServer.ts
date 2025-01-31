import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { grapghqlSubscriptionServer } from "src/common/interfaces";

export const createGraphqlSubscriptionServer = ({ httpServer, schema }: grapghqlSubscriptionServer) => {
  const wsServer = new WebSocketServer({
    path: "/graphql",
    server: httpServer,
  });

  const serverCleanup = useServer({ schema }, wsServer);

  return serverCleanup
};
