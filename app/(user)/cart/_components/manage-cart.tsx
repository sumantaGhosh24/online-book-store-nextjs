"use client";

import {useState} from "react";
import {Trash, ShoppingCart} from "lucide-react";
import toast from "react-hot-toast";

import {clearCart} from "@/actions/cartActions";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {ICart} from "@/models/cartModel";

import Cart from "./cart";

interface ManageCartProps {
  cart: ICart;
}

const ManageCart = ({cart}: ManageCartProps) => {
  const [loading, setLoading] = useState(false);

  const handleClearCart = async () => {
    setLoading(true);
    try {
      await clearCart("/cart");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cart?.books?.length || 0;

  return (
    <section className="p-6 shadow-md rounded-md w-full dark:shadow-gray-400 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart size={26} />
          <h1 className="text-3xl font-bold">My Cart</h1>
        </div>
        {totalItems > 0 && (
          <Button
            type="button"
            disabled={loading}
            variant="destructive"
            onClick={handleClearCart}
            className="flex items-center gap-2"
          >
            <Trash size={16} />
            Clear Cart
          </Button>
        )}
      </div>
      {cart && cart.books && cart.books.length > 0 ? (
        <div className="border rounded-xl p-6">
          <Table>
            <TableCaption>Your selected books.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.books?.map((book, ind) => (
                <Cart book={book} ind={ind + 1} key={ind} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border rounded-xl p-12 text-center space-y-4">
          <ShoppingCart size={40} className="text-muted-foreground" />
          <h3 className="text-xl font-semibold">Your cart is empty</h3>
          <p className="text-muted-foreground">
            Add some books to start shopping.
          </p>
          <Button>Browse Books</Button>
        </div>
      )}
    </section>
  );
};

export default ManageCart;
