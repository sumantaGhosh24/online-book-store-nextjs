import {getUsers} from "@/actions/userActions";
import SearchBar from "@/app/_components/search-bar";

import Users from "../_components/users";

export const metadata = {
  title: "Manage Users",
};

interface ManageUsersPageProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

export default async function ManageUsersPage({
  searchParams,
}: ManageUsersPageProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";

  const users = await getUsers({
    searchString: searchText,
    pageNumber: page,
    pageSize: 5,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage Users</h2>
        <p className="text-gray-600">Admin manage all users.</p>
      </div>
      <div className="mb-8">
        <SearchBar placeholder="Search users" />
      </div>
      <Users
        data={users?.data}
        emptyTitle="No Category found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={users?.totalPages}
      />
    </div>
  );
}
