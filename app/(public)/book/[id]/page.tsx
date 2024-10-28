import {redirect} from "next/navigation";

import {getBook} from "@/actions/bookActions";

import BookDetails from "../../_components/book-details";

export const metadata = {
  title: "Book",
};

interface BookDetailsPageProps {
  params: {id: string};
}

export default async function BookDetailsPage({params}: BookDetailsPageProps) {
  const book = await getBook(params.id);

  if (!book) redirect("/");

  return (
    <>
      <BookDetails book={book} />
    </>
  );
}
