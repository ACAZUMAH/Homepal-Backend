import mongoose from "mongoose";
import { makeOfferDocument } from "src/common/interfaces";

const OfferSchema = new mongoose.Schema<makeOfferDocument>({
    propertyId: { type: String, required: true },
    agentId: { type: String, required: true },
    clientId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    offerAmount: { type: Number, },
    message: { type: String }
}, { timestamps: true })

export const offerModel = mongoose.model('offers', OfferSchema)