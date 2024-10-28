import {z} from "zod";

export const AuthorValidation = z.object({
  name: z
    .string()
    .min(1, {message: "Author name is required"})
    .trim()
    .toLowerCase(),
});
