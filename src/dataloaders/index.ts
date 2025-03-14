import { createListingLoader } from "./listing";
import { createRequestTourLoader } from "./request";
import { createUserLoader } from "./user";

export const createDataLoaders = () => ({
    listingLoader: createListingLoader(),
    userLoader: createUserLoader(),
    requestTourLoader: createRequestTourLoader(),
})