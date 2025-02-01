export const listingTypeDef = `#graphql
    enum Mode {
        SALE
        RENT
    } 

    type Listing {
        id: ID!
        name: String!
        description: String!
        address: String!
        price: Float!
        bathrooms: Int!
        bedrooms: Int!
        type: String!
        mode: Mode!
        amenities: [String!]!
        imageUrls: [String!]!
        userRef: String
    }

    input listingFilter {
        page: Int 
        limit: Int 
        name: String
        description: String
        adress: String
        price: Float
        bathrooms: Int
        bedrooms: Int
        type: String
        mode: Mode
        amenities: [String]  
        search: String
    }

    type listingConnection {
        edges: [Listing]!
        PageInfo: PageInfo!
    }

    type deleteResponse {
        message: String
    }

    extend type Query {
        getListing(id: ID!): Listing!
        getListings(filter: listingFilter): listingConnection
    }

    input createListingInput {
        name: String!
        description: String!
        address: String!
        price: Float!
        bathrooms: Int!
        bedrooms: Int!
        type: String!
        mode: Mode!
        amenities: [String!]!
        imageUrls: [String!]!
    }

    input updateListingInput {
        id: ID!
        name: String
        description: String
        address: String
        price: Float
        bathrooms: Int
        bedrooms: Int
        type: String
        mode: Mode
        amenities: [String]
        imageUrls: [String]
    }

    extend type Mutation {
        createListing(data: createListingInput): Listing!
        updateListing(data: updateListingInput): Listing!
        deleteListing(id: ID!): deleteResponse
    }
`;
