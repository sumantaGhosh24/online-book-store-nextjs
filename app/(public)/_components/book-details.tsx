"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {IBook} from "@/models/bookModel";
import Image from "next/image";

interface BookDetailProps {
  book: IBook;
}

const BookDetails = ({book}: BookDetailProps) => {
  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="max-w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <div className="mb-5 md:mb-0">
          <h2 className="text-2xl font-bold capitalize">{book.title}</h2>
          <h3 className="mt-5 text-xl">{book.description}</h3>
        </div>
        <div className="mx-auto w-[90%]">
          <Carousel>
            <CarouselContent>
              {book.image.map((img: any) => (
                <CarouselItem key={img.public_id}>
                  <Image
                    src={img.url}
                    alt={img.public_id}
                    height={200}
                    width={500}
                    className="h-[350px] w-full rounded"
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
        </div>
        <p className="text-base">{book.content}</p>
        <h4 className="flex gap-1 items-center">
          <span className="text-xl font-bold">Price:</span>
          <span className="font-bold">
            {book.price} / {book.mrp}
          </span>
          <span className="text-lg line-through">{book.price}</span>
        </h4>
        <div className="flex gap-5">
          <div className="flex items-center gap-3 rounded border border-primary p-5">
            <div>
              <h4 className="mb-2">Category: </h4>
              <h4>{book.category.name}</h4>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded border border-primary p-5">
            <Image
              src={book.author.image.url}
              alt={book.author.image.public_id}
              height={100}
              width={100}
              className="rounded"
            />
            <div>
              <h4 className="mb-2">Author: </h4>
              <h4>{book.author.name}</h4>
            </div>
          </div>
        </div>
        <h4>Created at: {new Date(book.createdAt).toLocaleDateString()}</h4>
        <h4>Updated at: {new Date(book.updatedAt).toLocaleDateString()}</h4>
      </div>
    </div>
  );
};

export default BookDetails;
