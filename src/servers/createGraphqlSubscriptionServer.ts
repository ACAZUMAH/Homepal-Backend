import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { GrapghqlSubscriptionServer } from "src/common/interfaces";

export const createGraphqlSubscriptionServer = ({ httpServer, schema }: GrapghqlSubscriptionServer) => {
  const wsServer = new WebSocketServer({
    path: "/graphql",
    server: httpServer,
  });

  const serverCleanup = useServer({ schema }, wsServer);

  return serverCleanup
};
