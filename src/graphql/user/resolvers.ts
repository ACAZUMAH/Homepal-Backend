import { GrapghqlContext, userDocument } from "src/common/interfaces"
import * as services from "../../services/user"
import { MutationSavePropertyArgs, MutationRemoveSavedPropertyArgs, MutationUpdateUserArgs, QueryUserArgs, MutationCreateTourRequestArgs, MutationCreateOfferArgs } from "src/common/graphql/graphql"
import { getListings } from "src/services/listing"
import * as tourServices from "src/services/tours"
import { createNewOffer } from "src/services/offers"

const me = (_:any, __: any, { user }: GrapghqlContext) => {
    return services.getUserById(user?._id!)
}

const user = (_: any, { id }: QueryUserArgs) => {
    return services.getUserById(id)
}

const updateUser = (_:any, args: MutationUpdateUserArgs, { user }: GrapghqlContext) => {
    return services.updateUser({ id: user?._id!, ...args.data})
}

const getUserListings = (_:any, { user }: GrapghqlContext) => {
    return getListings({ userRef: user?._id })
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


export const userResolvers = {
    Query: {
        me,
        user,
        getUserListings
    },
    Mutation: {
        updateUser,
        saveProperty,
        removeSavedProperty,
        createTourRequest,
        createOffer  
    },
    User: {
        savedProperties
    }
}