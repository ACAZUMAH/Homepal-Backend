import { Express } from "express"
import { logResponseTime } from "./response-log"

const middlewares = [ logResponseTime ]

export const applyMiddlewares = (app: Express) => {
    middlewares.map(middleware => app.use(middleware))
};