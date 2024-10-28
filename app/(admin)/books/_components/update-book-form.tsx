"use client";

import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import toast from "react-hot-toast";

import {updateBook} from "@/actions/bookActions";
import {IAuthor} from "@/models/authorModel";
import {IBook} from "@/models/bookModel";
import {ICategory} from "@/models/categoryModel";
import {BookValidation} from "@/validations/book";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {usePrimaryColor} from "@/app/_components/primary-provider";

interface UpdateBookFormProps {
  book: IBook;
  categories: ICategory[];
  authors: IAuthor[];
}

const UpdateBookForm = ({book, categories, authors}: UpdateBookFormProps) => {
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const router = useRouter();
  const path = usePathname();

  const form = useForm<z.infer<typeof BookValidation>>({
    resolver: zodResolver(BookValidation),
    defaultValues: {
      title: book.title,
      description: book.description,
      content: book.content,
      category: book.category._id,
      author: book.author._id,
      price: book.price,
      mrp: book.mrp,
    },
  });

  const onSubmit = async (values: z.infer<typeof BookValidation>) => {
    setLoading(true);
    try {
      await updateBook({
        id: book._id,
        title: values.title,
        description: values.description,
        content: values.content,
        category: values.category,
        author: values.author,
        price: values.price,
        mrp: values.mrp,
        path,
      });

      toast.success("Successfully update a book!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-20 flex w-full items-center justify-center">
      <div className="min-w-[80%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <Form {...form}>
          <form
            className="flex flex-col justify-start gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h1 className="mb-5 text-2xl font-bold">Update Book</h1>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Book Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="title"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter book title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="category"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Book Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select book category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Book Author
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select book author" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {authors.map((author) => (
                          <SelectItem key={author._id} value={author._id}>
                            <Image
                              src={author.image.url}
                              alt={author.image.public_id}
                              height={50}
                              width={50}
                              className="mb-2 mr-4 inline-block h-5 w-5"
                            />
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Book Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your book description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Book Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your book content"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="price"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Book Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter book price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mrp"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Book Mrp
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter book mrp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
            >
              {loading ? "Processing..." : "Update Book"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateBookForm;
