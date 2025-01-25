import { Types } from "mongoose";

export interface listingDocument {
  _id: Types.ObjectId;
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: Array<string>;
  userRef: string | Types.ObjectId;
}

export interface createListingInput {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: Array<string>;
  userRef: string | Types.ObjectId;
}

export interface updateListingInput {
  id: string;
  userRef: Types.ObjectId | string
  name?: string;
  description?: string;
  address?: string;
  regularPrice?: number;
  discountPrice?: number;
  bathrooms?: number;
  bedrooms?: number;
  furnished?: boolean;
  parking?: boolean;
  type?: string;
  offer?: boolean;
  imageUrls?: Array<string>;
}

export interface listingFilter {
  page?: string | number | null;
  limit?: string | number | null;
  name?: string | null;
  address?: string | null;
  regularPrice?: number | null;
  discountPrice?: number | null;
  bathrooms?: number | null;
  bedrooms?: number | null;
  furnished?: boolean | null;
  parking?: boolean | null;
  type?: string | null;
  offer?: boolean | null;
  userRef?: string| Types.ObjectId | null;
  search?: string | null;
  sort?: string | null;
}
