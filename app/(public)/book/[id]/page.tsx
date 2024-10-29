import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getBookReviews} from "@/actions/reviewActions";
import {getBook} from "@/actions/bookActions";

import BookDetails from "../../_components/book-details";
import CreateReviewForm from "../../_components/create-review-form";
import BookReviews from "../../_components/book-reviews";

export const metadata = {
  title: "Book",
};

interface BookDetailsPageProps {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
}

export default async function BookDetailsPage({
  params,
  searchParams,
}: BookDetailsPageProps) {
  const book = await getBook(params.id);

  if (!book) redirect("/");

  const user = await getServerUser();

  const page = Number(searchParams?.page) || 1;

  const reviews = await getBookReviews({
    pageNumber: page,
    pageSize: 5,
    book: book._id,
  });

  return (
    <>
      <BookDetails book={book} />
      <CreateReviewForm book={book} user={user} />
      <BookReviews
        data={reviews?.data}
        emptyTitle="No review found"
        emptyStateSubtext="Try again later"
      />
    </>
  );
}
