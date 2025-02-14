export const userTypeDefs = `#graphql 
   type favoriteProperties {
      propertyId: String!
   }

   type User {
      id: String!
      firstName: String
      lastName: String
      phoneNumber: PhoneNumber!
      email: EmailAddress
      profile: String
      isAuthenticated: Boolean
      createdAt: DateTime!
      updatedAt: DateTime!

      Listings: [Listing]

      savedProperties: [Listing]
   }

   extend type Query {
      me: User!
      user(id: ID!): User!
      getUserListings: Listing
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
       saveProperty(propertyId: String!): User!
       removeSavedProperty(propertyId: String!): User!
   }
`;