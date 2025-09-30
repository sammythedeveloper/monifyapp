import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Title
);

const ExpenseChart = ({ expenses }) => {
  // Aggregate by date for wave effect
  const dailyExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (!acc[date]) acc[date] = 0;
    acc[date] += expense.amount;
    return acc;
  }, {});

  const labels = Object.keys(dailyExpenses);
  const values = Object.values(dailyExpenses);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        fill: true,
        borderColor: "#fff",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#a855f7",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 10,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c } = chart;
          const gradient = c.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(0, "rgba(255,255,255,0.9)");
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          return gradient;
        },
        tension: 0.5, // smooth wave
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
        padding: 10,
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
      },
      title: {
        display: true,
        text: "Expenses Trend",
        color: "#fff",
        font: { size: 18, weight: "bold" },
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#e5e5e5", font: { size: 12, weight: "500" } },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { display: false }, // hide numbers
      },
    },
  };

  return (
    <div className="flex items-center justify-center py-10 relative">
      {/* Scanlines */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-white/20"
            style={{ top: `${(i / 12) * 100}%` }}
          />
        ))}
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <div className="w-full h-80 sm:h-96 md:h-[400px] lg:h-[450px] rounded-xl bg-black shadow-lg shadow-purple-500/50">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
