export const generalTypeDef = `#graphql
    type PageInfo {
        page: Int!
        total: Int!
        limit: Int!
        hasNextPage: Boolean!
    }
    
    type Query {
        _empty: String
        hello: String
    }

    type Subscription {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;