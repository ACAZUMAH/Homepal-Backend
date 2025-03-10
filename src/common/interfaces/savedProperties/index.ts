import { Types } from "mongoose";

export interface savedProperties {
    propertyIds: Array<Types.ObjectId | string>
}