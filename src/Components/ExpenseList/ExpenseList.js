import React from "react";
import { Link } from "react-router-dom";
import ExpenseChart from "./ExpenseChart/ExpenseChart";
import Footer from "../Footer/Footer";
import AppLayout from "../AppLayout/AppLayout";

const ExpenseList = ({ expenses, deleteExpense }) => {
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) acc[expense.category] = [];
    acc[expense.category].push(expense);
    return acc;
  }, {});

  // Helper to get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return "🍔";
      case "Transport":
        return "🚗";
      case "Grocery":
        return "🛒";
      case "Shopping":
        return "🛍️";
      case "Bills":
        return "💡";
      default:
        return "📦";
    }
  };

  return (
      <div className="relative w-full min-h-screen bg-cover bg-center p-6 font-caveat">
        <div className="mb-8 text-center">
          <h1 className="uppercase text-4xl font-extrabold text-white tracking-wider">
            Your Expense List
          </h1>
          <div className="w-full max-w-3xl mx-auto mt-6">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>

        {/* Expense Category Cards */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(categorizedExpenses).map((category) => (
            <div
              key={category}
              className="bg-zinc-800 border border-purple-500 rounded-xl p-5 flex justify-between items-center shadow-lg shadow-purple-500/50 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
                  {category}
                </h3>
              </div>
              <p className="text-xl font-bold text-green-400">
                $
                {categorizedExpenses[category]
                  .reduce((acc, item) => acc + item.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
          ))}

          {/* Total Expenses */}
          <div className="bg-zinc-800 border border-purple-500 rounded-xl p-5 flex justify-between items-center shadow-lg shadow-purple-500/50 transition-all hover:scale-105">
            <h3 className="uppercase tracking-wider font-semibold text-white">
              Total Expenses
            </h3>
            <p className="uppercase tracking-wider font-bold text-red-500">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Expense Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-700 h-24">
              <tr>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Category
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Title
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Amount
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Date
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Payment
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Recurring
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Tags
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Notes
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Receipt
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Edit
                </th>
                <th className="uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-zinc-700 hover:bg-zinc-900 transition-all"
                >
                  <td className="px-4 py-2 text-sm text-white flex items-center gap-1">
                    <span>{getCategoryIcon(expense.category)}</span>
                    {expense.category}
                  </td>
                  <td className="px-4 py-2 text-sm text-white">{expense.title}</td>
                  <td className="px-4 py-2 text-sm text-green-400">
                    {expense.currency} {expense.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-sm text-white">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-white">{expense.paymentMethod}</td>
                  <td className="px-4 py-2 text-sm text-purple-400">
                    {expense.isRecurring ? expense.frequency : "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-white flex flex-wrap gap-1">
                    {expense.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-purple-600 text-white rounded-full text-xs uppercase tracking-wider"
                      >
                        #{tag}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2 text-sm text-white">
                    {expense.notes || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {expense.receiptPreview ? (
                      <img
                        src={expense.receiptPreview}
                        alt="Receipt"
                        className="w-16 h-16 rounded-md object-contain border border-zinc-700"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-blue-600">
                    <Link to={`/edit/${expense.id}`}>
                      <button className="px-3 py-1 bg-transparent text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm text-red-600">
                    <button
                      className="px-3 py-1 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
  );
};

export default ExpenseList;
