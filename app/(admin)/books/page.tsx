import Link from "next/link";

import {getAuthors} from "@/actions/authorActions";
import {getBooks} from "@/actions/bookActions";
import {getCategories} from "@/actions/categoryActions";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Filter from "@/app/_components/filter";
import SearchBar from "@/app/_components/search-bar";

import ManageBooks from "./_components/manage-books";

export const metadata = {
  title: "Manage Books",
};

interface ManageBooksPageProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

export default async function MangeBooksPage({
  searchParams,
}: ManageBooksPageProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const author = (searchParams?.author as string) || "";

  const books = await getBooks({
    searchString: searchText,
    pageNumber: page,
    pageSize: 10,
    category,
    author,
  });

  const categories = await getCategories();

  const authors = await getAuthors();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="flex justify-between">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">Manage Books</h2>
          <p className="text-gray-600">Admin manage all books.</p>
        </div>
        <Link
          href="/books/create"
          className={cn(buttonVariants(), "bg-blue-700 hover:bg-blue-800")}
        >
          Create Book
        </Link>
      </div>
      <div className="mb-8 flex w-full flex-col gap-5 md:flex-row">
        <SearchBar placeholder="Search books" />
        <Filter categories={categories} authors={authors} />
      </div>
      <ManageBooks
        data={books?.data}
        emptyTitle="No book found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={books?.totalPages}
      />
    </div>
  );
}
