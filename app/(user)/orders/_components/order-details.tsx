"use client";

import Image from "next/image";

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
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <div className="relative overflow-x-auto mt-10">
          <h2 className="text-2xl font-bold mb-3">Order Items: </h2>
          <Table>
            <TableCaption>A list of order items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((book, ind) => (
                <TableRow key={ind + 1}>
                  <TableCell className="font-medium">{ind + 1}</TableCell>
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
                        <p className="text-lg mt-4 capitalize">
                          {book?.book?.title}
                        </p>
                      </div>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>
                    {formatFloatingNumber(book?.book?.price as any)}
                  </TableCell>
                  <TableCell>{book?.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <h2 className="text-xl font-bold">
          Payment Result:{" "}
          <span className="font-medium text-lg">
            {order.paymentResult.id} | {order.paymentResult.status} |{" "}
            {order.paymentResult.razorpay_order_id} |{" "}
            {order.paymentResult.razorpay_payment_id} |{" "}
            {order.paymentResult.razorpay_signature}
          </span>
        </h2>
        <h3 className="mt-5 text-xl font-bold">
          Shipping Address:{" "}
          <span className="font-medium text-lg">
            {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
            {order.shippingAddress.country}, {order.shippingAddress.zip},{" "}
            {order.shippingAddress.address}
          </span>
        </h3>
        <h3 className="mt-5 text-xl font-bold">
          Price: <span className="font-medium text-lg">{order.price}</span>
        </h3>
        <h3 className="mt-5 text-xl font-bold">
          Tax Price:{" "}
          <span className="font-medium text-lg">{order.taxPrice}</span>
        </h3>
        <h3 className="mt-5 text-xl font-bold">
          Shipping Price:{" "}
          <span className="font-medium text-lg">{order.shippingPrice}</span>
        </h3>
        <h3 className="mt-5 text-xl font-bold">
          Total Price:{" "}
          <span className="font-medium text-lg">{order.totalPrice}</span>
        </h3>
        <h3 className="mt-5 text-xl font-bold">
          Order Status:{" "}
          <span className="font-medium text-lg uppercase">
            {order.orderStatus}
          </span>
        </h3>
        <div className="flex items-center gap-3 rounded border border-primary p-5 w-fit">
          <Image
            src={order.user.image.url}
            alt={order.user.image.public_id}
            height={100}
            width={100}
            className="rounded"
          />
          <div>
            <h4 className="capitalize">{order.user.name}</h4>
            <h4>{order.user.email}</h4>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="mt-5 text-xl font-bold">
            Paid at:{" "}
            <span className="font-medium text-lg">
              {new Date(order.paidAt).toLocaleDateString()}
            </span>
          </h3>
          <h3 className="mt-5 text-xl font-bold">
            Deliver at:{" "}
            <span className="font-medium text-lg">
              {order.deliverAt
                ? new Date(order.deliverAt).toLocaleDateString()
                : "Not Deliver Yet"}
            </span>
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="mt-5 text-xl font-bold">
            Created at:{" "}
            <span className="font-medium text-lg">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </h3>
          <h3 className="mt-5 text-xl font-bold">
            Updated at:{" "}
            <span className="font-medium text-lg">
              {new Date(order.updatedAt).toLocaleDateString()}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
