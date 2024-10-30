"use state";

import {useState} from "react";
import Image from "next/image";
import {MinusCircle, PlusCircle, XCircle} from "lucide-react";
import toast from "react-hot-toast";

import {addCart, removeCart} from "@/actions/cartActions";
import {formatFloatingNumber} from "@/lib/utils";
import {IBook} from "@/models/bookModel";
import {Button} from "@/components/ui/button";
import {TableCell, TableRow} from "@/components/ui/table";
import DialogProvider from "@/app/_components/dialog-provider";
import {usePrimaryColor} from "@/app/_components/primary-provider";

interface CartProps {
  book: {
    book: IBook;
    quantity: number;
    price: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  };
  ind: number;
}

const Cart = ({book, ind}: CartProps) => {
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const handleDecrement = async () => {
    setLoading(true);
    try {
      if (book.quantity <= 1) {
        await removeCart({bookId: book.book._id, path: "/cart"});
      } else {
        await addCart({
          bookId: book.book._id,
          quantity: book.quantity - 1,
          path: "/cart",
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async () => {
    setLoading(true);
    try {
      await addCart({
        bookId: book.book._id,
        quantity: book.quantity + 1,
        path: "/cart",
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeCart({bookId: book.book._id, path: "/cart"});
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{ind}</TableCell>
      <TableCell>
        <DialogProvider
          trigger={
            <Image
              src={book?.book?.image[0].url}
              alt={book?.book?.image[0].public_id}
              placeholder="blur"
              blurDataURL={book?.book?.image[0].blurHash}
              priority
              height={50}
              width={50}
              className="h-12 animate-pulse cursor-pointer"
            />
          }
          title="Book Image"
        >
          <div>
            <Image
              src={book?.book?.image[0].url}
              alt={book?.book?.image[0].public_id}
              placeholder="blur"
              blurDataURL={book?.book?.image[0].blurHash}
              priority
              height={200}
              width={500}
              className="h-[200px] w-full rounded"
            />
            <p className="text-lg mt-4 capitalize">{book?.book?.title}</p>
          </div>
        </DialogProvider>
      </TableCell>
      <TableCell>
        <Button
          type="button"
          size="icon"
          disabled={loading}
          className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
          onClick={handleDecrement}
        >
          <MinusCircle />
        </Button>
      </TableCell>
      <TableCell>{book.quantity}</TableCell>
      <TableCell>
        <Button
          type="button"
          size="icon"
          disabled={loading}
          className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
          onClick={handleIncrement}
        >
          <PlusCircle />
        </Button>
      </TableCell>
      <TableCell>
        <Button
          type="button"
          size="icon"
          disabled={loading}
          className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
          onClick={handleRemove}
        >
          <XCircle />
        </Button>
      </TableCell>
      <TableCell>{formatFloatingNumber(book.price)}</TableCell>
      <TableCell>{formatFloatingNumber(book.taxPrice)}</TableCell>
      <TableCell>{formatFloatingNumber(book.shippingPrice)}</TableCell>
      <TableCell>{formatFloatingNumber(book.totalPrice)}</TableCell>
    </TableRow>
  );
};

export default Cart;
