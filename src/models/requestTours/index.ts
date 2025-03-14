import mongoose from "mongoose";
import { TourMode, VideoCallMode } from "src/common/enums";
import { RequestTourDocument } from "src/common/interfaces";

const tourSchema = new mongoose.Schema<RequestTourDocument>(
  {
    propertyId: { type: String, required: true },
    agentId: { type: String, required: true },
    clientId: { type: String, required: true },
    tourMode: {
      type: String,
      enum: Object.values(TourMode),
      required: true,
      default: TourMode.IN_PERSON,
    },
    scheduledDate: { type: Date, required: true },
    videoCallMode: {
      type: String,
      enum: Object.values(VideoCallMode),
    },
    contactDetails: { type: String, required: true },
  },
  { timestamps: true }
);

export const tourModel = mongoose.model<RequestTourDocument>(
  "request tours",
  tourSchema
);
