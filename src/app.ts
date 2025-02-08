require("express-async-errors");
import http from "http";
import { createExpressApp } from "./servers/createExpressApp";
import { connectDB } from "./common/helpers/connectDB";
import { logger } from "./logger/logger";
import { errorHandler } from "./Middlewares/error-handler";
import createError from "http-errors";
//import { applyRouters } from "src/routers";
import { applyMiddlewares } from "./Middlewares";
import { createGraphqlServer } from "./servers/createGraphqlServer";
import { schema } from "./graphql";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = createExpressApp();

  await connectDB(`${process.env.MONGO_URI}`);

  const httpServer = http.createServer(app);

  applyMiddlewares(app);

  //applyRouters(app);

  await createGraphqlServer({ app, schema, httpServer })

  app.use(errorHandler);

//   app.all("*", (_, __, next) => {
//     return next(createError(404, "Unable to retrive requested reosurces"));
//   });

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });

  logger.info(`🚀 Server ready at http://localhost:${PORT}/`);
    logger.info(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
};

export default startServer;
