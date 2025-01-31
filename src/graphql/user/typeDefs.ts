export const userTypeDefs = `#graphql 
    type User {
       id: String!
       username: String!
       firstName: String!
       lastName: String!
       phone: String!
       email: String!
       profile: String!
       isAuthenticated: Boolean
       lisitngs: Listing
    }

    type Query {
       me: User!
       user(id: ID!): User!
    }

    input updateUserInput{
       firstName: String
       lastName: String
       phone: String
       email: String
       profile: String
    }

    type Mutation {
       updateUser(data: updateUserInput): User!
    }
`;