"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {Pen} from "lucide-react";

import DialogProvider from "@/app/_components/dialog-provider";
import Pagination from "@/app/_components/pagination";
import {usePrimaryColor} from "@/app/_components/primary-provider";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {IAuthor} from "@/models/authorModel";

import DeleteAuthor from "./delete-author";

interface ManageAuthorsProps {
  data: IAuthor[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number;
  totalPages: number;
  urlParamName?: string;
}

const ManageAuthors = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: ManageAuthorsProps) => {
  const {primaryColor} = usePrimaryColor();

  const router = useRouter();

  const handleUpdate = (id: string) => {
    router.push(`/authors/update/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of all authors.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((author) => (
                <TableRow key={author._id}>
                  <TableCell className="font-medium">{author._id}</TableCell>
                  <TableCell>{author.name}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={author.image.url}
                          alt={author.image.public_id}
                          placeholder="blur"
                          blurDataURL={author.image.blurHash}
                          priority
                          height={50}
                          width={50}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Author Image"
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={author.image.url}
                          alt={author.image.public_id}
                          placeholder="blur"
                          blurDataURL={author.image.blurHash}
                          priority
                          height={200}
                          width={500}
                          className="h-[200px] w-full rounded"
                        />
                      </div>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>
                    {new Date(author.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(author.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      onClick={() => handleUpdate(author._id)}
                      className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300 mb-4 md:mr-4`}
                    >
                      <Pen size={24} className="mr-2" />
                      Update
                    </Button>
                    <DeleteAuthor
                      id={author._id}
                      publicId={author.image.public_id}
                    />
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

export default ManageAuthors;
