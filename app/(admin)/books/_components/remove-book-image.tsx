"use client";

import {useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {Trash} from "lucide-react";

import {IBook} from "@/models/bookModel";
import {deleteBookImage} from "@/actions/bookActions";
import {Card, CardContent} from "@/components/ui/card";

interface RemoveBookImageProps {
  book: IBook;
}

const RemoveBookImage = ({book}: RemoveBookImageProps) => {
  const [files, setFiles] = useState(book.image);
  const [loading, setLoading] = useState(false);

  const path = usePathname();

  const handleDelete = async (publicId: string) => {
    setLoading(true);
    try {
      setFiles((files) =>
        files.filter((file, i) => file.public_id !== publicId)
      );

      await deleteBookImage({
        id: book._id,
        public_id: publicId,
        path,
      });

      toast.success("Book image removed!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-20 flex w-full items-center justify-center">
      <div className="max-w-[80%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <div className="flex flex-col justify-start gap-10">
          <h1 className="mb-5 text-2xl font-bold">Remove Book Image</h1>
          {loading && (
            <h2 className="my-10 text-center text-xl font-bold">
              Deleting Image
            </h2>
          )}
          <div className="mb-5 flex flex-wrap items-start gap-2">
            {files.map((file, i) => (
              <Card className="relative mx-auto mb-5 !max-h-fit" key={i}>
                <CardContent className="p-0">
                  <Image
                    src={file.url}
                    alt={file.public_id}
                    width={250}
                    height={250}
                    placeholder="blur"
                    blurDataURL={file.blurHash}
                    priority
                    className="h-40 rounded-md object-cover transition-transform hover:scale-105"
                  />
                  <Trash
                    className="absolute right-1 top-1 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-gray-200 p-1 text-red-700 transition-all hover:bg-red-700 hover:text-gray-200"
                    onClick={() => handleDelete(file.public_id)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBookImage;
