import { createListingLoader } from "./listing";

export const createDataLoaders = () => ({
    listingLoader: createListingLoader()
})