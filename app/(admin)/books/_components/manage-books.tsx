"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";
import {Pen} from "lucide-react";

import {IBook} from "@/models/bookModel";
import {Button} from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {usePrimaryColor} from "@/app/_components/primary-provider";
import DialogProvider from "@/app/_components/dialog-provider";
import Pagination from "@/app/_components/pagination";

import DeleteBook from "./delete-book";

interface ManageBooksProps {
  data: IBook[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number;
  totalPages: number;
  urlParamName?: string;
}

const ManageBooks = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: ManageBooksProps) => {
  const {primaryColor} = usePrimaryColor();

  const router = useRouter();

  const handleUpdate = (id: string) => {
    router.push(`/books/update/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of your books.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Mrp</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">{book._id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={book.image[0].url}
                          alt={book.image[0].public_id}
                          placeholder="blur"
                          blurDataURL={book.image[0].blurHash}
                          priority
                          height={50}
                          width={50}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Book Images"
                    >
                      <Carousel>
                        <CarouselContent>
                          {book.image.map((img) => (
                            <CarouselItem key={img.public_id}>
                              <Image
                                src={img.url}
                                alt={img.public_id}
                                height={200}
                                width={100}
                                className="h-[250px] w-full"
                                placeholder="blur"
                                blurDataURL={img.blurHash}
                                priority
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>{book.category.name}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={book.author.image.url}
                          alt={book.author.image.public_id}
                          height={50}
                          width={50}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Author Details"
                    >
                      <Image
                        src={book.author.image.url}
                        alt={book.author.image.public_id}
                        height={300}
                        width={500}
                        className="h-[300px] w-full rounded"
                      />
                      <h3 className="text-xl font-bold capitalize">
                        {book.author.name}
                      </h3>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>{book.mrp}</TableCell>
                  <TableCell>
                    {new Date(book.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      onClick={() => handleUpdate(book._id)}
                      className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300 mb-4 md:mr-4`}
                    >
                      <Pen size={24} className="mr-2" />
                      Update
                    </Button>
                    <DeleteBook id={book._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[14px] bg-white py-28 text-center shadow shadow-black dark:bg-black dark:shadow-white">
          <h3 className="text-xl font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default ManageBooks;
