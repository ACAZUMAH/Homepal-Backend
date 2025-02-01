import { Express } from "express"
import { logResponseTime } from "./response-log"
import { verifyAccessToken } from "./verify-token";

const middlewares = [ logResponseTime, verifyAccessToken ]

export const applyMiddlewares = (app: Express) => {
    middlewares.map(middleware => app.use(middleware))
};