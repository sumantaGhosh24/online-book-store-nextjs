import CreateAuthorForm from "../_components/create-author-form";

export const metadata = {
  title: "Create Author",
};

export default function CreateAuthorPage() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="min-w-[60%] space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
        <CreateAuthorForm />
      </div>
    </div>
  );
}
