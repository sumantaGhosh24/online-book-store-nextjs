import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getUserOrders} from "@/actions/orderActions";
import ManageOrders from "@/app/_components/manage-orders";

export const metadata = {
  title: "User Orders",
};

interface UserOrdersPageProps {
  searchParams: {[key: string]: string | string[] | undefined};
  params: {id: string};
}

export default async function UserOrdersPage({
  searchParams,
  params,
}: UserOrdersPageProps) {
  const page = Number(searchParams?.page) || 1;

  if (!params.id) redirect("/orders");

  const orders = await getUserOrders({
    pageNumber: page,
    pageSize: 10,
    user: params.id,
  });

  const user = await getServerUser();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage User Orders</h2>
        <p className="text-gray-600">Admin manage user orders.</p>
      </div>
      <ManageOrders
        data={orders?.data}
        emptyTitle="No user orders found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={orders?.totalPages}
        user={user}
      />
    </div>
  );
}
