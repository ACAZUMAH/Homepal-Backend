import { Types } from 'mongoose'

export interface listingDocument {
    _id: Types.ObjectId
    name: string 
    description: string
    address: string
    regularPrice: number 
    discountPrice: number
    bathrooms: number 
    bedrooms: number 
    furnished: boolean 
    parking: boolean
    type: string 
    offer: boolean
    imageUrls: Array<string>
    userRef: string 
};