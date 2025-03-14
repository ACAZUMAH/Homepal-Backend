import { tourModel } from "src/models";
import DataLoader from "dataloader";

export const createRequestTourLoader = () => {
    const getRequestToursById = async (ids: readonly string[]) => {
       const tours = await tourModel.find({ _id: { $in: ids }})

       return ids.map((id) => tours.find((tour) => tour._id.toString() === id))
    }

    return new DataLoader(getRequestToursById)
}