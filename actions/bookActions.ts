"use server";

import {revalidatePath} from "next/cache";
import {SortOrder} from "mongoose";

import connectDB from "@/lib/db";
import {destroyFromCloudinary, uploadToCloudinary} from "@/lib/cloudinary";
import {dynamicBlurDataUrl} from "@/lib/utils";
import BookModel from "@/models/bookModel";
import CategoryModel from "@/models/categoryModel";
import AuthorModel from "@/models/authorModel";
import UserModel from "@/models/userModel";

import getServerUser from "./getServerUser";

interface FetchBooksParams {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
  category?: string;
  author?: string;
}

interface CreateBookParams {
  title: string;
  description: string;
  content: string;
  formData: any;
  category: string;
  author: string;
  price: string;
  mrp: string;
}

interface UpdateBookParams {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  price: string;
  mrp: string;
  path: string;
}

interface UpdateBookImageParams {
  id: string;
  formData: any;
  path: string;
}

interface DeleteBookImageParams {
  id: string;
  public_id: string;
  path: string;
}

const getCategoryByName = async (name: any) => {
  return CategoryModel.findOne({name: {$regex: name, $options: "i"}});
};

const getAuthorByName = async (name: any) => {
  return AuthorModel.findOne({name: {$regex: name, $options: "i"}});
};

const populateBook = (query: any) => {
  return query
    .populate({
      path: "category",
      model: CategoryModel,
      select: "_id name",
    })
    .populate({
      path: "author",
      model: AuthorModel,
      select: "_id name image",
    });
};

export async function getBook(id: string) {
  try {
    connectDB();

    const book = await BookModel.findById(id)
      .populate("author", "_id name image")
      .populate("category", "_id name");

    return JSON.parse(JSON.stringify(book));
  } catch (error: any) {
    throw new Error(`Failed to get book data: ${error.message}`);
  }
}

export async function getBooks({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  searchString = "",
  category,
  author,
}: FetchBooksParams) {
  try {
    connectDB();

    const titleCondition = searchString
      ? {title: {$regex: searchString, $options: "i"}}
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const authorCondition = author ? await getAuthorByName(author) : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? {category: categoryCondition._id} : {},
        authorCondition ? {author: authorCondition._id} : {},
      ],
    };
    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const booksQuery = BookModel.find(conditions)
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const books = await populateBook(booksQuery);
    const booksCount = await BookModel.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(books)),
      totalPages: Math.ceil(booksCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get books data: ${error.message}`);
  }
}

export async function createBook({
  title,
  description,
  content,
  formData,
  category,
  author,
  price,
  mrp,
}: CreateBookParams) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized.");

    const files = formData.getAll("files");

    const photos = await uploadToCloudinary(files);

    const blurDataPromise = photos.map((photo) =>
      dynamicBlurDataUrl(photo.secure_url)
    );

    const blurData = await Promise.all(blurDataPromise);

    const imageData = photos.map((photo, i) => ({
      url: photo.secure_url,
      public_id: photo.public_id,
      blurHash: blurData[i],
    }));

    const newBook = new BookModel({
      owner: user?._id,
      title,
      description,
      content,
      image: imageData,
      category,
      author,
      price,
      mrp,
    });

    await newBook.save();

    revalidatePath("/books");
  } catch (error: any) {
    throw new Error(`Failed to create book: ${error.message}`);
  }
}

export async function updateBook({
  id,
  title,
  description,
  content,
  category,
  author,
  price,
  mrp,
  path,
}: UpdateBookParams) {
  try {
    connectDB();

    const book = await BookModel.findById(id);
    if (!book) throw new Error("Book not found.");

    await BookModel.findByIdAndUpdate(id, {
      title,
      description,
      content,
      category,
      author,
      price,
      mrp,
    });

    revalidatePath(path);
    revalidatePath("/books");
  } catch (error: any) {
    throw new Error(`Failed to update book: ${error.message}`);
  }
}

export async function updateBookImage({
  id,
  formData,
  path,
}: UpdateBookImageParams) {
  try {
    connectDB();

    const book = await BookModel.findById(id);
    if (!book) throw new Error("Book not found.");

    const files = formData.getAll("files");

    const photos = await uploadToCloudinary(files);

    const blurDataPromise = photos.map((photo) =>
      dynamicBlurDataUrl(photo.secure_url)
    );

    const blurData = await Promise.all(blurDataPromise);

    const imageData = photos.map((photo, i) => ({
      url: photo.secure_url,
      public_id: photo.public_id,
      blurHash: blurData[i],
    }));

    await BookModel.findByIdAndUpdate(id, {
      image: [...book.image, ...imageData],
    });

    revalidatePath(path);
    revalidatePath("/books");
  } catch (error: any) {
    throw new Error(`Failed to update book image: ${error.message}`);
  }
}

export async function deleteBookImage({
  id,
  public_id,
  path,
}: DeleteBookImageParams) {
  try {
    connectDB();

    const book = await BookModel.findById(id);
    if (!book) throw new Error("Book not found.");

    await Promise.all([
      BookModel.findByIdAndUpdate(id, {
        image: book.image.filter((img: any) => img.public_id !== public_id),
      }),
      destroyFromCloudinary(public_id),
    ]);

    revalidatePath(path);
    revalidatePath("/books");
  } catch (error: any) {
    throw new Error(`Failed to delete book image: ${error.message}`);
  }
}

export async function deleteBook(id: string) {
  try {
    connectDB();

    const book = await BookModel.findById(id);
    if (!book) throw new Error("This book does not exists.");

    book.image.map(
      async (img: any) => await destroyFromCloudinary(img.public_id)
    );

    await BookModel.findByIdAndDelete(id);

    revalidatePath("/books");
  } catch (error: any) {
    throw new Error(`Failed to delete book: ${error.message}`);
  }
}
