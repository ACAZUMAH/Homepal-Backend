import { Types } from "mongoose";
import { Mode } from "src/common/enums";

export interface listingDocument {
  _id: Types.ObjectId;
  name: string;
  description: string;
  address: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  type: string;
  mode: Mode;
  amenities: Array<string>
  imageUrls: Array<string>;
  userRef: string | Types.ObjectId;
}

export interface createListingInput {
  name: string;
  description: string;
  address: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  type: string;
  mode: Mode;
  amenities: Array<string>;
  imageUrls: Array<string>;
  userRef: string | Types.ObjectId;
}

export interface updateListingInput {
  id: string;
  userRef: Types.ObjectId | string;
  name?: string | null;
  description?: string | null;
  address?: string | null;
  price?: number | null;
  bathrooms?: number | null;
  bedrooms?: number | null;
  type?: string | null;
  mode?: Mode | null;
  amenities?: Array<string | null> | null;
  imageUrls?: Array<string | null> | null;
}

export interface listingFilter {
  page?: string | number | null;
  limit?: string | number | null;
  name?: string | null;
  address?: string | null;
  price?: number | null;
  bathrooms?: number | null;
  bedrooms?: number | null;
  type?: string | null;
  mode?: Mode | null;
  amenities?: Array<string | null> | null;
  userRef?: string | Types.ObjectId | null;
  search?: string | null;
  sort?: string | null;
}
