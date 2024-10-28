import {redirect} from "next/navigation";

import {getAuthors} from "@/actions/authorActions";
import {getBook} from "@/actions/bookActions";
import {getCategories} from "@/actions/categoryActions";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import UpdateBookForm from "../../_components/update-book-form";
import AddBookImage from "../../_components/add-book-image";
import RemoveBookImage from "../../_components/remove-book-image";

export const metadata = {
  title: "Update Book",
};

interface UpdateBookPageProps {
  params: {id: string};
}

export default async function UpdateBookPage({params}: UpdateBookPageProps) {
  const book = await getBook(params.id);

  if (!book) redirect("/books");

  const categories = await getCategories();

  const authors = await getAuthors();

  return (
    <>
      <Tabs defaultValue="update-book" className="w-full">
        <TabsList className="mx-10 mt-10 grid grid-cols-3">
          <TabsTrigger value="update-book">Update Book</TabsTrigger>
          <TabsTrigger value="add-image">Add Book Image</TabsTrigger>
          <TabsTrigger value="remove-image">Remove Book Image</TabsTrigger>
        </TabsList>
        <TabsContent value="update-book">
          <UpdateBookForm
            book={JSON.parse(JSON.stringify(book))}
            categories={JSON.parse(JSON.stringify(categories))}
            authors={JSON.parse(JSON.stringify(authors))}
          />
        </TabsContent>
        <TabsContent value="add-image">
          <AddBookImage book={JSON.parse(JSON.stringify(book))} />
        </TabsContent>
        <TabsContent value="remove-image">
          <RemoveBookImage book={JSON.parse(JSON.stringify(book))} />
        </TabsContent>
      </Tabs>
    </>
  );
}
