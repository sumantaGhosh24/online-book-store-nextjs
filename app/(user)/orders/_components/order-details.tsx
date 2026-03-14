"use client";

import Image from "next/image";
import {Package, CreditCard, MapPin, User} from "lucide-react";

import {formatFloatingNumber} from "@/lib/utils";
import {IOrder} from "@/models/orderModel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogProvider from "@/app/_components/dialog-provider";

interface OrderDetailProps {
  order: IOrder;
}

const OrderDetails = ({order}: OrderDetailProps) => {
  return (
    <div className="container mx-auto p-10 space-y-8 my-10 rounded-md shadow-md dark:shadow-gray-400">
      <div>
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">
          View order information, payment details and shipping status.
        </p>
      </div>
      <div className="border rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package size={22} />
          <div>
            <p className="text-sm text-muted-foreground">Order Status</p>
            <p className="font-semibold uppercase">{order.orderStatus}</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Created: {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <Table>
          <TableCaption>List of purchased books.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderItems.map((book, ind) => (
              <TableRow key={ind}>
                <TableCell>{ind + 1}</TableCell>
                <TableCell>
                  <DialogProvider
                    trigger={
                      <Image
                        src={book?.book?.image[0].url}
                        alt={book?.book?.image[0].public_id}
                        placeholder="blur"
                        blurDataURL={book?.book?.image[0].blurHash}
                        height={60}
                        width={60}
                        className="rounded cursor-pointer hover:scale-105 transition"
                      />
                    }
                    title="Book Preview"
                  >
                    <div className="space-y-3">
                      <Image
                        src={book?.book?.image[0].url}
                        alt={book?.book?.image[0].public_id}
                        height={250}
                        width={400}
                        className="rounded w-full"
                      />
                      <p className="text-lg font-medium capitalize">
                        {book?.book?.title}
                      </p>
                    </div>
                  </DialogProvider>
                </TableCell>
                <TableCell>
                  ₹{formatFloatingNumber(book?.book?.price as any)}
                </TableCell>

                <TableCell>{book?.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <User size={18} /> Customer
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={order.user.image.url}
              alt={order.user.image.public_id}
              height={60}
              width={60}
              className="rounded-full"
            />
            <div>
              <p className="font-medium capitalize">{order.user.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.user.email}
              </p>
            </div>
          </div>
        </div>
        <div className="border rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <MapPin size={18} /> Shipping Address
          </div>
          <p className="text-sm text-muted-foreground">
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state}, {order.shippingAddress.country} -{" "}
            {order.shippingAddress.zip}
          </p>
        </div>
        <div className="border rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <CreditCard size={18} /> Payment
          </div>
          <p className="text-sm">
            <span className="font-medium">Status:</span>{" "}
            {order.paymentResult.status}
          </p>
          <p className="text-sm">
            <span className="font-medium">Transaction ID:</span>{" "}
            {order.paymentResult.id}
          </p>
          <p className="text-sm">
            <span className="font-medium">Order ID:</span>{" "}
            {order.paymentResult.razorpay_order_id}
          </p>
        </div>
      </div>
      <div className="border rounded-xl p-6 space-y-3 w-full">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <div className="flex justify-between text-sm">
          <span>Items Price</span>
          <span>₹{order.price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>₹{order.taxPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>₹{order.shippingPrice}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{order.totalPrice}</span>
        </div>
      </div>
      <div className="text-sm text-muted-foreground flex items-center justify-between flex-wrap gap-6">
        <p>Paid: {new Date(order.paidAt).toLocaleDateString()}</p>
        <p>
          Delivered:{" "}
          {order.deliverAt
            ? new Date(order.deliverAt).toLocaleDateString()
            : "Not Delivered Yet"}
        </p>
        <p>Updated: {new Date(order.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
