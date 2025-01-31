export const listingTypeDef = `#graphql
    enum Mode {
        SALE
        RENT
    } 

    type Listing {
        id: ID!
        name: String!
        description: String!
        adress: String!
        price: Float!
        bathrooms: Int!
        bedrooms: Int!
        type: String!
        mode: Mode!
        amenities: [String!]!
        imageUrls: [String!]!
        userRef: String!
    }

    input filter {
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
    }

    type Query {
        getListing(id: ID!): Listing!
        getListings(filter: filter): [Listing!]
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
        mode: Mode!
        amenities: [String]
        imageUrls: [String]
    }

    type Mutation {
        createListing(data: createListingInput): Listing!
        updateListing(data: updateListingInput): Listing!
        deleteListing(id: ID!): Listing
    }
`;
