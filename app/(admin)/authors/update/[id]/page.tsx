import {redirect} from "next/navigation";

import {getAuthor} from "@/actions/authorActions";

import UpdateAuthorForm from "../../_components/update-author-form";

export const metadata = {
  title: "Update Author",
};

interface UpdateAuthorPageProps {
  params: {id: string};
}

export default async function UpdateAuthorPage({
  params,
}: UpdateAuthorPageProps) {
  const author = await getAuthor(params.id);

  if (!author) redirect("/authors");

  return (
    <div className="my-20 flex h-[90vh] w-full items-center justify-center">
      <div className="min-w-[60%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <UpdateAuthorForm author={JSON.parse(JSON.stringify(author))} />
      </div>
    </div>
  );
}
