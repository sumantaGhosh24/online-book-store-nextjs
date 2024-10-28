import {getAuthors} from "@/actions/authorActions";
import {getCategories} from "@/actions/categoryActions";

import CreateBookForm from "../_components/create-book-form";

export const metadata = {
  title: "Create Book",
};

export default async function CreateBookPage() {
  const categories = await getCategories();

  const authors = await getAuthors();

  return (
    <div className="my-20 flex min-h-screen w-full items-center justify-center">
      <div className="w-[80%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <CreateBookForm categories={categories} authors={authors} />
      </div>
    </div>
  );
}
