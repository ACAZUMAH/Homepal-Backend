import { Types } from "mongoose";

export interface favoriteProperties {
    propertyIds: Array<Types.ObjectId | string>
}