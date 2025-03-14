import { Types } from "mongoose";

export interface makeOfferDocument {
  _id: Types.ObjectId;
  propertyId: string | Types.ObjectId;
  agentId: string | Types.ObjectId;
  clientId: string | Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  offerAmount: Number;
  message?: string;
}

export interface createOffer {
  propertyId: string | Types.ObjectId;
  agentId: string | Types.ObjectId;
  clientId: string | Types.ObjectId;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phoneNumber: string;
  offerAmount: Number;
  message?: string | null;
}
