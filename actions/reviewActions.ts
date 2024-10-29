"use server";

import {revalidatePath} from "next/cache";
import {SortOrder} from "mongoose";

import connectDB from "@/lib/db";
import ReviewModel from "@/models/reviewModel";
import BookModel from "@/models/bookModel";
import UserModel from "@/models/userModel";

interface ReviewParams {
  id?: string;
  user: string;
  book: string;
  comment: string;
  rating: string;
  path: string;
}

interface FetchReviewParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

interface FetchBookReviewsParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
  book: string;
}

interface FetchUserReviewsParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
  user: string;
}

const populateReview = (query: any) => {
  return query
    .populate({
      path: "book",
      model: BookModel,
      select: "_id title image price",
    })
    .populate({
      path: "user",
      model: UserModel,
      select: "_id name email image",
    });
};

export async function getAllReviews({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchReviewParams) {
  try {
    connectDB();

    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const reviewsQuery = ReviewModel.find({})
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const reviews = await populateReview(reviewsQuery);
    const reviewsCount = await ReviewModel.countDocuments({});
    return {
      data: JSON.parse(JSON.stringify(reviews)),
      totalPages: Math.ceil(reviewsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get all reviews data: ${error.message}`);
  }
}

export async function getBookReviews({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  book,
}: FetchBookReviewsParams) {
  try {
    connectDB();

    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const reviewsQuery = ReviewModel.find({book})
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const reviews = await populateReview(reviewsQuery);
    const reviewsCount = await ReviewModel.countDocuments({book});
    return {
      data: JSON.parse(JSON.stringify(reviews)),
      totalPages: Math.ceil(reviewsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get book reviews data: ${error.message}`);
  }
}

export async function getUserReviews({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  user,
}: FetchUserReviewsParams) {
  try {
    connectDB();

    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const reviewsQuery = ReviewModel.find({user})
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const reviews = await populateReview(reviewsQuery);
    const reviewsCount = await ReviewModel.countDocuments({user});
    return {
      data: JSON.parse(JSON.stringify(reviews)),
      totalPages: Math.ceil(reviewsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get user reviews data: ${error.message}`);
  }
}

export async function createReview({
  user,
  book,
  comment,
  rating,
  path,
}: ReviewParams) {
  try {
    connectDB();

    const newReview = new ReviewModel({
      user,
      book,
      comment: comment.toLowerCase(),
      rating,
    });

    await newReview.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}
