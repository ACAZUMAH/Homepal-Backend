import DataLoader from "dataloader";
import { listingModel } from "src/models";

export const createListingLoader = () => {
    const getListingsById = async (ids: readonly string[]) => {
        const lisitngs = await listingModel.find({ _id: { $id: ids } })
        return ids.map((id) => lisitngs.find((listing) => listing._id.toString() === id))
    }

    return new DataLoader(getListingsById)
}