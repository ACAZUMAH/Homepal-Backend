import mongoose from "mongoose";
import { Mode } from "src/common/enums";
import { listingDocument } from "src/common/interfaces";

const listingSchema = new mongoose.Schema<listingDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    type: { type: String, required: true },
    mode: {
      type: String,
      enum: Object.values(Mode),
      required: true,
      default: Mode.SALE,
    },
    amenities: [{ type: String }],
    imageUrls: [{ type: String, required: true }],
    userRef: { type: String, ref: "users", required: true },
  },
  { timestamps: true }
);

export const listingModel = mongoose.model<listingDocument>('listing', listingSchema)