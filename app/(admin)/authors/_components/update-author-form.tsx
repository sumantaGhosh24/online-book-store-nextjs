"use client";

import {useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import toast from "react-hot-toast";

import {IAuthor} from "@/models/authorModel";
import {AuthorValidation} from "@/validations/author";
import {updateAuthor} from "@/actions/authorActions";
import {validFiles} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {usePrimaryColor} from "@/app/_components/primary-provider";

interface UpdateAuthorFormProps {
  author: IAuthor;
}

interface File {
  status: string;
  imgUrl: string;
  message?: string;
  fileUpload: undefined;
}

const UpdateAuthorForm = ({author}: UpdateAuthorFormProps) => {
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const pathname = usePathname();

  const form = useForm<z.infer<typeof AuthorValidation>>({
    resolver: zodResolver(AuthorValidation),
    defaultValues: {
      name: author.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof AuthorValidation>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("files", file.fileUpload!);
        URL.revokeObjectURL(file.imgUrl);
      }

      if (file) {
        await updateAuthor({
          id: author._id,
          name: values.name,
          formData,
          public_id: author.image.public_id,
          path: pathname,
        });
      } else {
        await updateAuthor({
          id: author._id,
          name: values.name,
          path: pathname,
        });
      }

      toast.success("Successfully update a author!");
      setFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (files: any) => {
    if (!files.length) return;
    // eslint-disable-next-line array-callback-return
    [...files].map((file) => {
      const result = validFiles(file);
      if (result?.message) return toast("something went wrong");
      setFile(result as any);
    });
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer;
    handleImageChange(data.files);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl font-bold">Update Author</h1>
        {author.image && (
          <Image
            src={author.image.url}
            alt={author.image.public_id}
            height={200}
            width={500}
            className="mb-5 w-full"
          />
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center rounded-full bg-black">
            <Image
              src={file?.imgUrl || "https://placehold.co/600x400.png"}
              alt="image"
              width={150}
              height={150}
              sizes="50vw"
              priority
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 text-base font-semibold text-gray-200">
            <Input
              type="file"
              accept=".png, .jpg, .jpeg"
              placeholder="Add your image"
              className="cursor-pointer border-none bg-transparent outline-none file:text-blue-800 text-black dark:text-white"
              hidden
              onChange={(e) => handleImageChange(e.target.files)}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base font-semibold">
                Author Name
              </FormLabel>
              <FormControl>
                <Input
                  type="name"
                  className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                  placeholder="Enter author name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
        >
          {loading ? "Processing..." : "Update Author"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateAuthorForm;