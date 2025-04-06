import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const chartRef = useRef(null); // Use ref to manage chart instance

  // Categorize expenses by type and sum them
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categorizedExpenses), // Categories
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categorizedExpenses), // Amounts
        backgroundColor: [
          "rgba(0, 255, 255, 0.8)", // Light Blue
          "rgba(255, 165, 0, 1)", // Coral
          "rgba(34, 193, 34, 1)", // Light Green
          "rgba(255, 221, 51, 1)", // Yellow
          "rgba(255, 105, 180, 1)", // Lavender
        ],
        borderColor: [
          "rgba(99, 184, 255, 1)", // Light Blue
          "rgba(253, 137, 111, 1)", // Coral
          "rgba(110, 196, 120, 1)", // Light Green
          "rgba(255, 199, 55, 1)", // Yellow
          "rgba(187, 98, 255, 1)", // Lavender
        ],
        borderWidth: 0, // Remove border for a cleaner look
        barThickness: 35, // Make bars thinner
        hoverBackgroundColor: [
          "rgba(99, 184, 255, 1)",
          "rgba(253, 137, 111, 1)",
          "rgba(110, 196, 120, 1)",
          "rgba(255, 199, 55, 1)",
          "rgba(187, 98, 255, 1)",
        ], // Hover color effect
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14, // Adjust font size of legend
            weight: "bold", // Bold the legend text
            color: "#333",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background for tooltips
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          weight: "bold",
        },
      },
      title: {
        display: true,
        text: "Expense Distribution by Category",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#333",
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start the x-axis from zero
        ticks: {
          color: "#fff",
          font: {
            weight: 460,
            size: 18, // Adjust font size of x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true, // Start the y-axis from zero
        ticks: {
          color: "#fff",
          font: {
            size: 18, // Adjust font size of y-axis labels
            weight: 460,
          },
        },
      },
    },
  };

  // Clean up the chart instance on component unmount or before re-render
  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.destroy();
    }
  }, [expenses]); // Recreate the chart whenever expenses change

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-3xl p-6  rounded-lg">
        <div className="w-full h-80 sm:h-96 md:h-[400px] lg:h-[500px]">
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
