import mongoose from "mongoose";
import { logger } from "../../logger/logger";

export const connectDB = async (url: string) => {
  mongoose.connection.on("connected", () => {
    logger.info("Connected to batabase");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("Batabase error", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.error("database disconnected");
  });

  return mongoose.connect(url, {});
};
