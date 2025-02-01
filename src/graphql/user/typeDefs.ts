export const userTypeDefs = `#graphql 
    type User {
       id: String!
       firstName: String
       lastName: String
       phoneNumber: String!
       email: String
       profile: String
       isAuthenticated: Boolean
       Listings: Listing
    }

    extend type Query {
       me: User!
       user(id: ID!): User!
    }

    input UpdateUserInput{
       firstName: String
       lastName: String
       phone: String
       email: String
       profile: String
    }

    extend type Mutation {
       updateUser(data: UpdateUserInput): User!
    }
`;