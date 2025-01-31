import { mergeSchemas } from "@graphql-tools/schema";
import { generalTypeDef } from "./general";
import { generalResolvers } from "./general";
import { listingTypeDef } from "./listing";
import { userTypeDefs } from "./user";

const typeDefs = [
    generalTypeDef,
    listingTypeDef,
    userTypeDefs
]

const resolvers = [
    generalResolvers
]

export const schema = mergeSchemas({typeDefs, resolvers})