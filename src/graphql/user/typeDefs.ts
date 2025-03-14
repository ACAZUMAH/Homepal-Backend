export const userTypeDefs = `#graphql 
   enum TourMode {
      IN_PERSON
      VIDEO_CALL
   }

   enum VideoCallMode {
      GOOGLE_MEET
      WHATSAPP
      FACE_TIME
   }

   type favoriteProperties {
      propertyId: String!
   }

   type User {
      _id: ID!
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

   type TourRequest {
      _id: ID!
      propertyId: String!
      agentId: String!
      clientId: String!
      tourMode: TourMode
      videoCallMode: VideoCallMode
      contactDetails: String
      scheduledDate: DateTime
   }

   type offer {
      propertyId: String!
      agentId: String!
      clientId: String!
      firstName: String
      lastName: String
      email: String!
      phoneNumber: String!
      offerAmount: Int!
      message: String
   }

   extend type Query {
      me: User!
      user(id: ID!): User!
      getUserListings: [Listing]
      getUserRequestedTours: [TourRequest]
      getRequestedToursOnUserProperty: [TourRequest]
   }

   input UpdateUserInput{
       firstName: String
       lastName: String
       phone: String
       email: String
       profile: String
   }

   input createTourInput {
      propertyId: String!
      agentId: String!
      clientId: String!
      tourMode: TourMode!
      scheduledDate: DateTime!
      videoCallMode: VideoCallMode
      contactDetails: String!
   }

   input createOfferInput {
      propertyId: String!
      agentId: String!
      clientId: String!
      firstName: String
      lastName: String
      email: String!
      phoneNumber: String!
      offerAmount: Int!
      message: String
   }

   extend type Mutation {
       updateUser(data: UpdateUserInput): User!
       saveProperty(propertyId: String!): User!
       removeSavedProperty(propertyId: String!): User!
       createTourRequest(data: createTourInput): TourRequest
       createOffer(data: createOfferInput): offer
   }
`;