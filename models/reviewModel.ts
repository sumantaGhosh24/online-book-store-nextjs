import {Schema, model, models} from "mongoose";

import {IBook} from "./bookModel";
import {IUser} from "./userModel";

export interface IReview extends Document {
  _id: string;
  user: IUser;
  book: IBook;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    book: {type: Schema.Types.ObjectId, ref: "Book", required: true},
    comment: {type: String, required: true},
    rating: {type: Number, required: true},
  },
  {timestamps: true}
);

const ReviewModel = models?.Review || model<IReview>("Review", ReviewSchema);

export default ReviewModel;
