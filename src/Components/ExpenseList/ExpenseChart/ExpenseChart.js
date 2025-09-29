import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const ExpenseChart = ({ expenses }) => {
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) acc[expense.category] = 0;
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const categories = Object.keys(categorizedExpenses);

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categorizedExpenses),
        backgroundColor: "rgba(55,65,81,1)", // dark zinc background
        borderColor: "rgba(168,85,247,1)",   // purple border
        borderWidth: 1.5,
        borderRadius: 50, // max radius for tube/capsule
        barPercentage: 0.6, // thinner tube-like bar
        categoryPercentage: 0.8,
        hoverBackgroundColor: "rgba(55,65,81,1)",
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#18181b",
        titleColor: "#a855f7",
        bodyColor: "#fff",
        bodyFont: { weight: "500" },
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
        padding: 10,
      },
      title: {
        display: true,
        text: "Expenses by Category",
        color: "#fff",
        font: { size: 18, weight: "bold" },
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#e5e5e5", font: { size: 14, weight: "500" } },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { display: false }, // hide numbers
      },
    },
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-3xl">
        <div className="w-full h-80 sm:h-96 md:h-[400px] lg:h-[450px] rounded-xl shadow-lg shadow-purple-500/50">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
