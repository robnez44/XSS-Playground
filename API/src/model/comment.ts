import mongoose, { Schema } from "mongoose";
import { IComment } from "../interfaces/IComment";

const CommentSchema: Schema = new Schema<IComment>(
  {
    author: { type: String, required: true},
    catName: { type: String, required: true},
    justification: { type: String, required: true}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
    versionKey: false
  }
);

CommentSchema.index({ created_at: -1 });

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
