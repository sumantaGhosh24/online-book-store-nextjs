import {z} from "zod";

export const BookValidation = z
  .object({
    title: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Title is required"})
      .max(25, {message: "Title maximum 25 characters long"}),
    description: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Description is required"})
      .max(250, {message: "Description maximum 100 characters long"}),
    content: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Content is required"})
      .max(350, {message: "Content maximum 250 characters long"}),
    category: z.string().min(1, {message: "Category is required"}),
    author: z.string().min(1, {message: "Author is required"}),
    price: z.string().min(1, {message: "Price is required"}),
    mrp: z.string().min(1, {message: "Mrp is required"}),
  })
  .refine((data) => parseInt(data.mrp) > parseInt(data.price), {
    message: "Mrp must be greater than price",
    path: ["mrp"],
  });
