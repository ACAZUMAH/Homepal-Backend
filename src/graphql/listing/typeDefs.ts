export const listingTypeDef = `#graphql
    enum Mode {
        SALE
        RENT
    } 

    type Listing {
        _id: ID!
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
        userRef: String!
        user: User!
    }

    input ListingFilters {
        page: Int 
        limit: Int 
        sort: String
        name: String
        description: String
        address: String
        price: Int
        bathrooms: Int
        bedrooms: Int
        type: String
        mode: Mode
        amenities: [String]  
        search: String
    }

    type ListingConnection {
        edges: [Listing!]
        PageInfo: PageInfo!
    }

    type DeleteResponse {
        message: String
    }

    extend type Query {
        listing(id: ID!): Listing!
        listings(filters: ListingFilters): ListingConnection
        getFavoriteProperties(ids: [ID!], filters: ListingFilters): ListingConnection
    }

    input CreateListingInput {
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

    input UpdateListingInput {
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
        createListing(data: CreateListingInput): Listing!
        updateListing(data: UpdateListingInput): Listing!
        deleteListing(id: ID!): DeleteResponse
    }
`;
