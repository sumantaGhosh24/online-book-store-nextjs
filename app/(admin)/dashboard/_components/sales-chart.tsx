"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesChartProps {
  sales: {
    price: number;
    totalPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalBookSales: number;
  };
}

const SalesChart = ({sales}: SalesChartProps) => {
  const labels = [
    "Price",
    "Total Price",
    "Tax Price",
    "Shipping Price",
    "Total Book Sales",
  ];
  const datasets = [
    sales.price,
    sales.totalPrice,
    sales.taxPrice,
    sales.shippingPrice,
    sales.totalBookSales,
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dashboard Sales Chart",
        data: datasets,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Bar data={data} />
    </div>
  );
};

export default SalesChart;
