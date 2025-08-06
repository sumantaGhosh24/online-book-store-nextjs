import {Schema, model, models} from "mongoose";

import {ICategory} from "./categoryModel";
import {IAuthor} from "./authorModel";

export interface IBook extends Document {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: {
    url: string;
    public_id: string;
    blurHash: string;
  }[];
  category: ICategory;
  author: IAuthor;
  price: string;
  mrp: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    image: [{url: String, public_id: String, blurHash: String}],
    category: {type: Schema.Types.ObjectId, required: true, ref: "Category"},
    author: {type: Schema.Types.ObjectId, required: true, ref: "Author"},
    price: {type: String, required: true},
    mrp: {type: String, required: true},
  },
  {timestamps: true}
);

BookSchema.index({title: "text", category: "text", author: "text"});

const BookModel = models?.Book || model<IBook>("Book", BookSchema);

export default BookModel;
