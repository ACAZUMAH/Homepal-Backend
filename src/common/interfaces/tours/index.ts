import { Types } from "mongoose";
import { TourMode, VideoCallMode } from "src/common/enums";

export interface RequestTourDocument {
  _id: Types.ObjectId;
  propertyId: Types.ObjectId | string;
  agentId: Types.ObjectId | string;
  clientId: Types.ObjectId | string;
  tourMode: TourMode;
  scheduledDate: Date;
  videoCallMode?: VideoCallMode;
  contactDetails: string;
}

export interface createTourRequest {
  propertyId: Types.ObjectId | string
  agentId: Types.ObjectId | string;
  clientId: Types.ObjectId | string;
  tourMode: TourMode;
  scheduledDate: Date;
  videoCallMode?: VideoCallMode | null;
  contactDetails: string;
}