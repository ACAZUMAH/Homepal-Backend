import mongoose from "mongoose";
import { logger } from "../../logger/logger";

export const connectDB = (url: string) => {
  mongoose.connection.on("connected", () => {
    logger.info("Connected to batabase");
  });

  mongoose.connection.on("error", (err) => {
    logger.info("Batabase error", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.error("database disconnected");
  });

  mongoose.connect(url, {});
};
