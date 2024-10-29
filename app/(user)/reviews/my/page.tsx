import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getUserReviews} from "@/actions/reviewActions";

import ManageReviews from "@/app/_components/manage-reviews";

export const metadata = {
  title: "My Reviews",
};

interface MyReviewsPageProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

export default async function MyReviewsPage({
  searchParams,
}: MyReviewsPageProps) {
  const page = Number(searchParams?.page) || 1;

  const user = await getServerUser();

  if (!user) redirect("/");

  const reviews = await getUserReviews({
    pageNumber: page,
    pageSize: 10,
    user: user._id,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage My Reviews</h2>
        <p className="text-gray-600">Admin manage my reviews.</p>
      </div>
      <ManageReviews
        data={reviews?.data}
        emptyTitle="No my reviews found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={reviews?.totalPages}
        user={user}
      />
    </div>
  );
}
