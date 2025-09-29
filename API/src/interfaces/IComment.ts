import { Document, ObjectId } from "mongoose";

export interface IComment extends Document {
    _id: ObjectId,
    author: string, 
    catName: string, 
    justification: string,
    created_at: Date
};