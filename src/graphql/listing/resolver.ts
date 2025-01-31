import { MutationCreateListingArgs, MutationDeleteListingArgs, MutationUpdateListingArgs, QueryGetListingArgs, QueryGetListingsArgs } from "src/common/graphql/graphql"
import { GrapghqlContext } from "src/common/interfaces"
import * as service from '../../services/listing'

const getListing = (_:any, { id }: QueryGetListingArgs) => {
    return service.getListingById(id)
}

const getListings = (_:any, args: QueryGetListingsArgs) => {
    return service.getListings(args.filter!)
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

export const listingResoler = {
    Query: {
        getListing,
        getListings
    },
    Mutation: {
        createListing,
        updateListing,
        deleteListing
    }
}