"use server";

import {revalidatePath} from "next/cache";

import connectDB from "@/lib/db";
import BookModel from "@/models/bookModel";
import CartModel from "@/models/cartModel";

import getServerUser from "./getServerUser";

interface AddCartParams {
  bookId: string;
  quantity: number;
  path: string;
}

interface RemoveCartParams {
  bookId: string;
  path: string;
}

export async function getCart() {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    const cart = await CartModel.findOne({user: user._id}).populate(
      "books.book"
    );

    return JSON.parse(JSON.stringify(cart));
  } catch (error: any) {
    throw new Error(`Failed to get user reviews data: ${error.message}`);
  }
}

export async function addCart({bookId, quantity, path}: AddCartParams) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    let cart = await CartModel.findOne({user: user._id});
    if (cart) {
      let bookIndex = cart.books.findIndex((b: any) => b.book == bookId);

      const book = await BookModel.findById(bookId).select("price");

      if (bookIndex > -1) {
        let bookItem = cart.books[bookIndex];
        bookItem.quantity = quantity;
        bookItem.price = parseInt(book.price) * quantity;
        bookItem.taxPrice = (10 / 100) * bookItem.price;
        bookItem.shippingPrice = (5 / 100) * bookItem.price;
        bookItem.totalPrice =
          bookItem.price + bookItem.taxPrice + bookItem.shippingPrice;
        cart.books[bookIndex] = bookItem;
      } else {
        let price = parseInt(book.price);
        let taxPrice = (10 / 100) * price;
        let shippingPrice = (5 / 100) * price;
        let totalPrice = price + taxPrice + shippingPrice;

        cart.books.push({
          book: bookId,
          quantity,
          price,
          taxPrice,
          shippingPrice,
          totalPrice,
        });
      }

      cart = await cart.save();
    } else {
      const book = await BookModel.findById(bookId).select("price");

      let price = parseInt(book.price);
      let taxPrice = (10 / 100) * price;
      let shippingPrice = (5 / 100) * price;
      let totalPrice = price + taxPrice + shippingPrice;

      await CartModel.create({
        user: user._id,
        books: [
          {
            book: bookId,
            quantity,
            price,
            taxPrice,
            shippingPrice,
            totalPrice,
          },
        ],
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}

export async function removeCart({bookId, path}: RemoveCartParams) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    let cart = await CartModel.findOne({user: user._id});

    let bookIndex = cart.books.findIndex((b: any) => b.book == bookId);

    if (bookIndex > -1) {
      cart.books.splice(bookIndex, 1);
    }

    cart = await cart.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}

export async function clearCart(path: string) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    await CartModel.findOneAndDelete({user: user._id});

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}
