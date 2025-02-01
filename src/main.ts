import { config } from "dotenv";
import { logger } from "./logger/logger";

const main = async () => {
  config();
  const app = await import("./app");
  app.default();
};

main().catch((err) => {
  logger.error(`Error starting Server: ${err}`);
  process.exit(1);
});
