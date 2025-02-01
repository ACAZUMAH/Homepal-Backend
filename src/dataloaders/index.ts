import { createListingLoader } from "./listing";
import { createUserLoader } from "./user";

export const createDataLoaders = () => ({
    listingLoader: createListingLoader(),
    userLoader: createUserLoader()
})