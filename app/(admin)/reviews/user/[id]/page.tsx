import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getUserReviews} from "@/actions/reviewActions";
import ManageReviews from "@/app/_components/manage-reviews";

export const metadata = {
  title: "User Reviews",
};

interface UserReviewsPageProps {
  searchParams: {[key: string]: string | string[] | undefined};
  params: {id: string};
}

export default async function UserReviewsPage({
  searchParams,
  params,
}: UserReviewsPageProps) {
  const page = Number(searchParams?.page) || 1;

  if (!params.id) redirect("/reviews");

  const reviews = await getUserReviews({
    pageNumber: page,
    pageSize: 10,
    user: params.id,
  });

  const user = await getServerUser();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage User Reviews</h2>
        <p className="text-gray-600">Admin manage user reviews.</p>
      </div>
      <ManageReviews
        data={reviews?.data}
        emptyTitle="No user reviews found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={reviews?.totalPages}
        user={user}
      />
    </div>
  );
}
