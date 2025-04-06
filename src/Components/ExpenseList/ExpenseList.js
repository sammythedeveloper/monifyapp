import React from "react";
import { Link } from "react-router-dom";
import ExpenseChart from "./ExpenseChart/ExpenseChart";
import Footer from "../Footer/Footer";
import AppLayout from "../AppLayout/AppLayout";

const ExpenseList = ({ expenses, deleteExpense }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Categorize expenses by type
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <AppLayout >
      <div
        className="relative w-full h-screen bg-cover bg-center "
      >
        <div className="p-6 min-h-screen font-caveat">
          <div className="mb-8 text-center">
            <h1 className=" uppercase text-4xl font-extrabold text-white tracking-wider ">
              Your Expense List
            </h1>
            <div className="w-full max-w-3xl mx-auto mt-6">
              <ExpenseChart expenses={expenses} />
            </div>
          </div>
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(categorizedExpenses).map((category) => (
                <div
                  key={category}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category}
                  </h3>
                  <p className="text-xl font-medium text-green-600">
                    $
                    {categorizedExpenses[category]
                      .reduce((acc, item) => acc + item.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Total Expenses Box */}
              <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <h3 className="uppercase tracking-wider font-semibold  text-gray-800">
                  Total Expenses
                </h3>
                <p className="uppercase tracking-wider font-semibold text-red-600">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Expense Table Wrapper for Responsiveness */}
          <div className="overflow-x-auto  rounded-lg ">
            <table className="min-w-full table-auto">
              <thead className="bg-purple-700 h-24 ">
                <tr>
                  <th className=" uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                    Category
                  </th>
                  <th className=" uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                    Date
                  </th>
                  <th className=" uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                    Amount
                  </th>
                  <th className=" uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                    Edit
                  </th>
                  <th className=" uppercase px-4 py-2 text-left text-sm tracking-wider text-white">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b">
                    <td className="px-4 py-2 text-sm text-white">
                      {expense.category}
                    </td>
                    <td className="px-4 py-2 text-sm text-white">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-white">
                      ${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-blue-600">
                      <Link to={`/edit/${expense.id}`}>
                        <button className="px-3 py-1 bg text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
        </div>
        <Footer />
      </div>
    </AppLayout>
  );
};

export default ExpenseList;
