import { Listing, MutationCreateListingArgs, MutationDeleteListingArgs, MutationUpdateListingArgs, QueryGetFavoritePropertiesArgs, QueryListingArgs, QueryListingsArgs } from "src/common/graphql/graphql"
import { GrapghqlContext } from "src/common/interfaces"
import * as service from '../../services/listing'

const listing = (_:any, { id }: QueryListingArgs) => {
    return service.getListingById(id)
}

const listings = (_:any, args: QueryListingsArgs) => {
    return service.getListings(args.filters!)
}

const createListing = (_: any, args: MutationCreateListingArgs, { user }: GrapghqlContext  ) => {
    return service.createListing({ userRef: `${user?._id!}`, ...args.data! })
}

const updateListing = (_:any, args: MutationUpdateListingArgs, { user }: GrapghqlContext) => {
    return service.updateListing({ userRef: user?._id!,  ...args.data! })
}

const deleteListing = (_: any, { id }: MutationDeleteListingArgs) => {
    return service.deleteListingById(id)
}

const getFavoriteProperties = (_:any, args: QueryGetFavoritePropertiesArgs) => {
    return service.getFavoriteListings(args.ids!, args.filters!)
}

const user = (parent: Listing, _: any, { userLoader }: GrapghqlContext) => {
    return parent.userRef ? userLoader.load(parent.userRef.toString()) : null
}

export const listingResoler = {
    Query: {
        listing,
        listings,
        getFavoriteProperties
    },
    Mutation: {
        createListing,
        updateListing,
        deleteListing
    },
    Listing: {
        user
    }
}