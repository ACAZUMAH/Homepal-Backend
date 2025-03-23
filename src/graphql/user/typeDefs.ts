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
      id: ID!
      firstName: String
      lastName: String
      phoneNumber: PhoneNumber!
      email: EmailAddress
      profile: String
      isAuthenticated: Boolean
      createdAt: DateTime!
      updatedAt: DateTime!
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

      property: Listing

      client: User

      agent: User
   }

   type Offer {
      _id: ID!
      propertyId: String!
      agentId: String!
      clientId: String!
      firstName: String
      lastName: String
      email: String!
      phoneNumber: String!
      offerAmount: Int!
      message: String

      property: Listing
   }

   extend type Query {
      me: User!
      user(id: ID!): User!
      getUserListings(filters: ListingFilters): ListingConnection
      getRequestedTours: [TourRequest]
      getTourRequests: [TourRequest]
      getRecievedOffers: [Offer]
   }

   input UpdateUserInput{
       id: ID
       firstName: String
       lastName: String
       phone: String
       email: String
       phoneNumber: String
       profile: String
   }

   input CreateTourInput {
      propertyId: String!
      agentId: String!
      clientId: String!
      tourMode: TourMode!
      scheduledDate: DateTime!
      videoCallMode: VideoCallMode
      contactDetails: String!
   }

   input CreateOfferInput {
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
       createTourRequest(data: CreateTourInput): TourRequest
       createOffer(data: CreateOfferInput): Offer
   }
`;