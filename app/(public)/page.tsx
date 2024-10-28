import {getAuthors} from "@/actions/authorActions";
import {getBooks} from "@/actions/bookActions";
import {getCategories} from "@/actions/categoryActions";

import Filter from "../_components/filter";
import SearchBar from "../_components/search-bar";
import Books from "./_components/books";

export const metadata = {
  title: "Home",
};

interface HomeProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

export default async function HomePage({searchParams}: HomeProps) {
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
    <>
      <div className="my-5 p-8">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">All Books</h2>
          <p className="text-gray-600">Explore all books.</p>
        </div>
        <div className="mb-8 flex w-full flex-col gap-5 md:flex-row">
          <SearchBar placeholder="Search books" />
          <Filter categories={categories} authors={authors} />
        </div>
        <div>
          <Books
            data={books?.data}
            emptyTitle="No Books Found"
            emptyStateSubtext="Try again later"
            page={page}
            totalPages={books?.totalPages}
          />
        </div>
      </div>
    </>
  );
}
