import { mergeSchemas } from "@graphql-tools/schema";
import { generalTypeDef } from "./general";
import { generalResolvers } from "./general";
import { listingTypeDef } from "./listing";
import { listingResoler } from "./listing/resolver";
import { userTypeDefs } from "./user";
import { userResolvers } from "./user/resolvers";
import { authTypeDefs } from "./auth/typeDefs";
import { authResolvers } from "./auth/resolvers";

const typeDefs = [
    generalTypeDef,
    authTypeDefs,
    userTypeDefs,
    listingTypeDef,
]

const resolvers = [
    generalResolvers,
    authResolvers,
    userResolvers,
    listingResoler
]

export const schema = mergeSchemas({typeDefs, resolvers})