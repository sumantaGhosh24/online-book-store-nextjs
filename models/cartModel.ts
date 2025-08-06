import {Schema, model, models} from "mongoose";

import {IUser} from "./userModel";
import {IBook} from "./bookModel";

export interface ICart extends Document {
  _id: string;
  user: IUser;
  books: {
    book: IBook;
    quantity: number;
    price: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    books: [
      {
        book: {type: Schema.Types.ObjectId, ref: "Book"},
        quantity: {type: Number},
        price: {type: Number},
        taxPrice: {type: Number},
        shippingPrice: {type: Number},
        totalPrice: {type: Number},
      },
    ],
  },
  {timestamps: true}
);

const CartModel = models?.Cart || model<ICart>("Cart", CartSchema);

export default CartModel;
