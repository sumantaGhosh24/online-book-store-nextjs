"use server";

import connectDB from "@/lib/db";
import AuthorModel from "@/models/authorModel";
import BookModel from "@/models/bookModel";
import CategoryModel from "@/models/categoryModel";
import OrderModel from "@/models/orderModel";
import ReviewModel from "@/models/reviewModel";
import UserModel from "@/models/userModel";

export async function getDashboardDetails() {
  try {
    connectDB();

    const user = await UserModel.countDocuments();
    const author = await AuthorModel.countDocuments();
    const category = await CategoryModel.countDocuments();
    const book = await BookModel.countDocuments();
    const review = await ReviewModel.countDocuments();
    const order = await OrderModel.countDocuments();

    const data = {user, author, category, book, review, order};

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    throw new Error(`Failed to get dashboard details data: ${error.message}`);
  }
}

export async function getDashboardSales() {
  try {
    connectDB();

    const data = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          price: {$sum: "$price"},
          totalPrice: {$sum: "$totalPrice"},
          taxPrice: {$sum: "$taxPrice"},
          shippingPrice: {$sum: "$shippingPrice"},
          totalBookSales: {$sum: {$sum: "$orderItems.quantity"}},
        },
      },
      {
        $project: {
          _id: 0,
          price: 1,
          totalPrice: 1,
          taxPrice: 1,
          shippingPrice: 1,
          totalBookSales: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(data[0]));
  } catch (error: any) {
    throw new Error(`Failed to get dashboard sales data: ${error.message}`);
  }
}
