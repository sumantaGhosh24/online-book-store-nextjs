import {
  getDashboardDetails,
  getDashboardSales,
} from "@/actions/dashboardActions";

import DetailsChart from "./_components/details-chart";
import SalesChart from "./_components/sales-chart";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const details = await getDashboardDetails();

  const sales = await getDashboardSales();

  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-start justify-between gap-5 flex-col">
          <DetailsChart details={details} />
          <SalesChart sales={sales} />
        </div>
      </div>
    </div>
  );
}
