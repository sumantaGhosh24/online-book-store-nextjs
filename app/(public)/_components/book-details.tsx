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
  user?: any;
}

const BookDetails = ({book, user}: BookDetailProps) => {
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
    <div className="container mx-auto my-10 space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {book.image.map((img: any) => (
                <CarouselItem key={img.public_id}>
                  <Image
                    src={img.url}
                    alt={img.public_id}
                    height={400}
                    width={500}
                    className="h-[420px] w-full rounded-xl object-cover"
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
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-3">{book.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {book.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-3xl font-bold text-${primaryColor}-500`}>
              ₹{book.price}
            </span>
            <span className="text-xl text-gray-500 line-through">
              ₹{book.mrp}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-semibold">
              {Math.round(
                ((parseInt(book.mrp) - parseInt(book.price)) /
                  parseInt(book.mrp)) *
                  100
              )}
              % OFF
            </span>
          </div>
          {user && (
            <Button
              type="button"
              disabled={loading}
              className={`w-fit flex items-center gap-2 text-white bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
              onClick={() => addToCart()}
            >
              <ShoppingCart size={18} />
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 flex items-center gap-3">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{book.category.name}</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center gap-3">
              <Image
                src={book.author.image.url}
                alt={book.author.image.public_id}
                height={50}
                width={50}
                className="rounded-full"
              />
              <div>
                <p className="text-sm text-gray-500">Author</p>
                <p className="font-semibold">{book.author.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 border-t"></div>
      <div>
        <h2 className="text-2xl font-bold mb-4">About this book</h2>
        <p className="leading-7 text-gray-700 dark:text-gray-300">
          {book.content}
        </p>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-8">
        <p>Created: {new Date(book.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(book.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BookDetails;
