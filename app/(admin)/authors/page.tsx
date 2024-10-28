import Link from "next/link";

import {getAllAuthors} from "@/actions/authorActions";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import SearchBar from "@/app/_components/search-bar";

import ManageAuthors from "./_components/manage-authors";

export const metadata = {
  title: "Manage Authors",
};

interface ManageAuthorsPageProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

export default async function ManageAuthorsPage({
  searchParams,
}: ManageAuthorsPageProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";

  const authors = await getAllAuthors({
    searchString: searchText,
    pageNumber: page,
    pageSize: 5,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="flex justify-between">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">Manage Authors</h2>
          <p className="text-gray-600">Admin manage all authors.</p>
        </div>
        <Link
          href="/authors/create"
          className={cn(buttonVariants(), "bg-blue-700 hover:bg-blue-800")}
        >
          Create Author
        </Link>
      </div>
      <div className="mb-8">
        <SearchBar placeholder="Search authors" />
      </div>
      <ManageAuthors
        data={authors?.data}
        emptyTitle="No author found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={authors?.totalPages}
      />
    </div>
  );
}
