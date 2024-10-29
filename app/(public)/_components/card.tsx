"use client";

import Image from "next/image";
import Link from "next/link";

import {Badge} from "@/components/ui/badge";
import {IBook} from "@/models/bookModel";

import {usePrimaryColor} from "@/app/_components/primary-provider";

interface CardProps {
  book: IBook;
}

const Card = ({book}: CardProps) => {
  const {primaryColor} = usePrimaryColor();

  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-4 shadow-md dark:bg-black shadow-black dark:shadow-white">
      <Link href={`/book/${book._id}`}>
        <Image
          src={book.image[0].url}
          alt="Card Image"
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL={book.image[0].blurHash}
          priority
          className="mb-4 h-40 w-full rounded-md object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
        >
          ₹ {book.price}
        </Badge>
        <Badge
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white line-through`}
        >
          ₹ {book.mrp}
        </Badge>
        <Badge
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 line-clamp-1 uppercase text-white`}
        >
          {book.category.name}
        </Badge>
        <Badge
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 line-clamp-1 uppercase text-white`}
        >
          {book.author.name}
        </Badge>
      </div>
      <Link href={`/book/${book._id}`}>
        <p className="mb-2 text-xl font-bold capitalize">{book.title}</p>
        <p className="mb-2 text-sm font-bold capitalize">{book.description}</p>
      </Link>
    </div>
  );
};

export default Card;
