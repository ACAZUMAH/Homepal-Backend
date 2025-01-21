import mongoose from "mongoose";
import { listingDocument } from "src/common/interfaces";

const listingSchema = new mongoose.Schema<listingDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true  },
    furnished: { type: Boolean, required: true },
    parking: { type: Boolean, required: true },
    type: { type: String, required: true },
    offer: { type: Boolean, required: true },
    imageUrls: [{ type: String, required: true  }],
    userRef: { type: String, ref: 'users', required: true }
},{ timestamps: true });

export const listingModel = mongoose.model('listing', listingSchema)