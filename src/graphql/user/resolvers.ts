import { GrapghqlContext, RequestTourDocument, userDocument } from "src/common/interfaces"
import * as services from "../../services/user"
import { MutationSavePropertyArgs, MutationRemoveSavedPropertyArgs, MutationUpdateUserArgs, QueryUserArgs, MutationCreateTourRequestArgs, MutationCreateOfferArgs, QueryGetUserListingsArgs, TourRequest } from "src/common/graphql/graphql"
import { getListings } from "src/services/listing"
import * as tourServices from "src/services/tours"
import { createNewOffer, getUserOffers } from "src/services/offers"

const me = (_:any, __: any, { user }: GrapghqlContext) => {
    return services.getUserById(user?._id!)
}

const user = (_: any, { id }: QueryUserArgs) => {
    return services.getUserById(id)
}

const updateUser = (_:any, args: MutationUpdateUserArgs, { user }: GrapghqlContext) => {
    return services.updateUser({ id: user?._id!, ...args.data })
}

const getUserListings = (_:any, args: QueryGetUserListingsArgs, { user }: GrapghqlContext) => {
    return getListings({ userRef: String(user?._id), ...args.filters })
}

const saveProperty = (_:any, { propertyId }: MutationSavePropertyArgs, { user }: GrapghqlContext) => { 
    return services.addToSavedProperty({ id: user?._id!, propertyId })
}

const removeSavedProperty = (_:any, { propertyId }: MutationRemoveSavedPropertyArgs, { user }: GrapghqlContext) => {
    return services.removeSavedProperty({ id: user?._id!, propertyId })
}

const savedProperties = (parent: userDocument, _:any, { listingLoader }: GrapghqlContext) => {
    return parent.savedProperties ? listingLoader.loadMany(parent.savedProperties.propertyIds.map(String) ?? []) : null
}

const createTourRequest = (_: any, args: MutationCreateTourRequestArgs ) => {
   return tourServices.createNewTourRequest({ ...args.data! });
};

const createOffer = (_:any, args: MutationCreateOfferArgs) => {
    return createNewOffer({ ...args.data! })
}

const property = (parent: TourRequest, _: any, { listingLoader }: GrapghqlContext) => {
    return parent.propertyId ? listingLoader.load(parent.propertyId.toString()) : null
}

const client = (parent: TourRequest, _:any, { userLoader }: GrapghqlContext) => {
    return parent.clientId ? userLoader.load(parent.clientId.toString()) : null
}

const agent = async (parent: TourRequest, _:any, { userLoader }: GrapghqlContext) => {
    return parent.agentId ? userLoader.load(parent.agentId.toString()) : null;
}

const getRequestedTours = (_: any, __: any, { user }: GrapghqlContext) => {
    return tourServices.getUserRequestTours({ clientId: user?._id })
}

const getTourRequests = (_: any, __: any, { user }: GrapghqlContext) => {
    return tourServices.getUserRequestTours({ agentId: user?._id })
}

const getRecievedOffers = (_:any, __: any, { user }: GrapghqlContext) => {
    return getUserOffers({ agentId: String(user?._id) })
}

export const userResolvers = {
    Query: {
        me,
        user,
        getUserListings,
        getRequestedTours,
        getTourRequests,
        getRecievedOffers
    },

    Mutation: {
        updateUser,
        saveProperty,
        removeSavedProperty,
        createTourRequest,
        createOffer  
    },

    User: {
        savedProperties,
    },

    TourRequest: {
        property,
        client,
        agent
    },

    Offer: {
        property
    }
}