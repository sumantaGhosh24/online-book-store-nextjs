"use server";

import {revalidatePath} from "next/cache";
import {SortOrder} from "mongoose";

import connectDB from "@/lib/db";
import {destroyFromCloudinary, uploadToCloudinary} from "@/lib/cloudinary";
import {dynamicBlurDataUrl} from "@/lib/utils";
import AuthorModel from "@/models/authorModel";
import BookModel from "@/models/bookModel";

interface FetchAuthorsParams {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

interface CreateAuthorParams {
  name: string;
  formData: any;
  path: string;
}

interface UpdateAuthorParams {
  id: string;
  name: string;
  formData?: any;
  public_id?: string;
  path: string;
}

export async function getAllAuthors({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  searchString = "",
}: FetchAuthorsParams) {
  try {
    connectDB();

    const nameCondition = searchString
      ? {name: {$regex: searchString, $options: "i"}}
      : {};
    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const authorsQuery = await AuthorModel.find(nameCondition)
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const authorsCount = await AuthorModel.countDocuments(nameCondition);
    return {
      data: JSON.parse(JSON.stringify(authorsQuery)),
      totalPages: Math.ceil(authorsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get all authors data: ${error.message}`);
  }
}

export async function getAuthor(id: string) {
  try {
    connectDB();

    const author = await AuthorModel.findById(id);

    return author;
  } catch (error: any) {
    throw new Error(`Failed to get author data: ${error.message}`);
  }
}

export async function getAuthors() {
  try {
    connectDB();

    const authors = await AuthorModel.find({});

    return JSON.parse(JSON.stringify(authors));
  } catch (error: any) {
    throw new Error(`Failed to get authors data: ${error.message}`);
  }
}

export async function createAuthor({name, formData, path}: CreateAuthorParams) {
  try {
    connectDB();

    const book = await AuthorModel.findOne({name});
    if (book) throw new Error("This book already created.");

    const files = formData.getAll("files");

    const [res] = await uploadToCloudinary(files);

    const blurData = await dynamicBlurDataUrl(res.secure_url);

    const newBook = new AuthorModel({
      name: name.toLowerCase(),
      image: {
        url: res?.secure_url,
        public_id: res?.public_id,
        blurHash: blurData,
      },
    });

    await newBook.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create book: ${error.message}`);
  }
}

export async function updateAuthor({
  id,
  name,
  formData,
  public_id,
  path,
}: UpdateAuthorParams) {
  try {
    connectDB();

    const author = await AuthorModel.findById(id);
    if (!author) throw new Error("Author not found.");

    if (!formData) {
      await AuthorModel.findByIdAndUpdate(id, {
        name: name.toLowerCase(),
      });
    } else {
      const files = formData.getAll("files");

      if (!public_id) throw new Error("Image id not found!");

      const [res] = await uploadToCloudinary(files);
      const blurData = await dynamicBlurDataUrl(res.secure_url);
      await Promise.all([
        AuthorModel.findByIdAndUpdate(id, {
          name: name.toLowerCase(),
          image: {
            url: res?.secure_url,
            public_id: res?.public_id,
            blurHash: blurData,
          },
        }),
        destroyFromCloudinary(public_id),
      ]);
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update author: ${error.message}`);
  }
}

export async function deleteAuthor(id: string, publicId: string) {
  try {
    connectDB();

    const books = await BookModel.findOne({author: id});
    if (books) throw new Error("Please delete all book of this author first.");

    await Promise.all([
      AuthorModel.findByIdAndDelete(id),
      destroyFromCloudinary(publicId),
    ]);

    revalidatePath("/authors");
  } catch (error: any) {
    throw new Error(`Failed to delete author: ${error.message}`);
  }
}
