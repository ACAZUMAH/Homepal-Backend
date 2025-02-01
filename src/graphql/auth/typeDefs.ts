export const authTypeDefs = `#graphql
    type Authenticated {
        user: User!
        token: String
    }

    type LoginResponse {
        message: String!
    }

    extend type Mutation {
        loginWithPhoneNumber(phoneNumber: PhoneNumber!): LoginResponse!
        completeAuthAndGenerateToken(token: String!): Authenticated!
    }
`;
