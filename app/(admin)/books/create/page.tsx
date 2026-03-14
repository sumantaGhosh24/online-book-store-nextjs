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
    <div className="container mx-auto my-10 space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
      <CreateBookForm categories={categories} authors={authors} />
    </div>
  );
}
