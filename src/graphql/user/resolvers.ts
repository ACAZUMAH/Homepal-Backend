import { GrapghqlContext, userDocument } from "src/common/interfaces"
import * as services from "../../services/user"
import { MutationAddFavoriteArgs, MutationRemoveFavoriteArgs, MutationUpdateUserArgs, QueryUserArgs, User } from "src/common/graphql/graphql"
import { getListings } from "src/services/listing"

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

const addFavorite = (_:any, { propertyId }: MutationAddFavoriteArgs, { user }: GrapghqlContext) => { 
    return services.addTofavoriteProperty({ id: user?._id!, propertyId })
}

const removeFavorite = (_:any, { propertyId }: MutationRemoveFavoriteArgs, { user }: GrapghqlContext) => {
    return services.removeFavoriteProperty({ id: user?._id!, propertyId })
}

const favoriteProperties = (parent: userDocument, _:any, { listingLoader }: GrapghqlContext) => {
    return parent.favoriteProperties ? listingLoader.loadMany(parent.favoriteProperties.propertyIds.map(String) ?? []) : null
}

export const userResolvers = {
    Query: {
        me,
        user,
        getUserListings
    },
    Mutation: {
        updateUser,
        addFavorite,
        removeFavorite
    },
    User: {
        favoriteProperties
    }
}