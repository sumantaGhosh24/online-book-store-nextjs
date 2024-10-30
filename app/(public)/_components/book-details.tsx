"use client";

import {useState} from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {ShoppingCart} from "lucide-react";

import {addCart} from "@/actions/cartActions";
import {IBook} from "@/models/bookModel";
import {Button} from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {usePrimaryColor} from "@/app/_components/primary-provider";

interface BookDetailProps {
  book: IBook;
}

const BookDetails = ({book}: BookDetailProps) => {
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const addToCart = async () => {
    setLoading(true);
    try {
      await addCart({bookId: book._id, quantity: 1, path: "/cart"});

      toast.success("Product added to cart!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
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
          <span className="font-bold">{book.price}</span>
          <span className="text-lg line-through">{book.mrp}</span>
        </h4>
        <Button
          type="button"
          disabled={loading}
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
          onClick={() => addToCart()}
        >
          <ShoppingCart />
          {loading ? "Processing..." : "Add Cart"}
        </Button>
        <div className="flex gap-5">
          <div className="flex items-center gap-3 rounded border border-primary p-5">
            <h4>Category: </h4>
            <h4>{book.category.name}</h4>
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
        <div className="flex items-center justify-between">
          <h4>Created at: {new Date(book.createdAt).toLocaleDateString()}</h4>
          <h4>Updated at: {new Date(book.updatedAt).toLocaleDateString()}</h4>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
