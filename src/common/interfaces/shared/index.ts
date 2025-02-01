import { Express } from "express";
import { Server } from 'http'
import { GraphQLSchema } from "graphql";
import { userDocument } from "../user";
import { createDataLoaders } from "src/dataloaders";
import { BaseContext } from "@apollo/server";

declare global {
    namespace Express {
        interface Request {
            user?: userDocument,
            token?: string
        }
    }
}

export interface GrapghqlServer {
    app: Express,
    httpServer: Server
    schema: GraphQLSchema
}

export type DataloaderMap = ReturnType<typeof createDataLoaders>
export interface GrapghqlContext extends BaseContext, DataloaderMap {
    user?: userDocument,
    token?: string
}

export interface GrapghqlSubscriptionServer {
    httpServer: Server
    schema: GraphQLSchema
}