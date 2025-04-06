import React, { useState, useEffect } from "react";
import AppLayout from "../AppLayout/AppLayout.jsx";
import { CutCornerButton } from "../Header/CutCornerButton.jsx";

// Define categories for select dropdown
const categories = [
  "Food",
  "Transport",
  "Grocery",
  "Shopping",
  "Bills",
  "Other",
];

const AddExpense = ({ addExpense, editingExpense, saveEditedExpense }) => {
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error messages state

  // On editing an existing expense, update the state with the current expense data
  useEffect(() => {
    if (editingExpense) {
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setAmount(editingExpense.amount);
    } else {
      setCategory(categories[0]);
      setDate("");
      setAmount("");
    }
  }, [editingExpense]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: check if required fields are filled and amount is positive
    if (!date || !amount) {
      setErrorMessage("Both date and amount are required.");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setErrorMessage("Amount must be a positive number.");
      return;
    }
    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      category,
      date,
      amount: parseFloat(amount),
    };
    // If editing, save the edited expense; otherwise, add a new one
    if (editingExpense) {
      saveEditedExpense(newExpense);
    } else {
      addExpense(newExpense);
      setSuccessMessage("Expense successfully added!");
      setCategory(categories[0]);
      setDate("");
      setAmount("");
    }
    setErrorMessage(""); // Clear error message if successful
    setTimeout(() => {
      setSuccessMessage(""); // Hide success message after 2 seconds
    }, 2000);
  };
  return (
      <AppLayout>
        <div className="flex justify-center  ">
          <div className="w-full max-w-3xl px-6 py-8 bg-transparent ">
            <form onSubmit={handleSubmit} className="space-y-8 mb-10 ">
              <div>
                <label
                  htmlFor="category"
                  className="block uppercase font-extrabold text-white "
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-12 block w-full p-4 border  focus:ring-indigo-500 focus:border-indigo-500 font-semibold text-purple-700 uppercase "
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block uppercase font-extrabold text-white "
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg font-semibold text-purple-700 uppercase "
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block uppercase font-extrabold text-white "
                >
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 font-semibold text-black uppercase placeholder-purple-500 "
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 text-white uppercase font-extrabold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                >
                  <CutCornerButton className="hover:bg-white hover:text-black">
                    {editingExpense ? "Save Changes" : "Add Expense"}
                  </CutCornerButton>
                </button>
              </div>
            </form>
            {/* Display error message */}
            {errorMessage && (
              <p className="uppercase mt-4 text-sm text-red-600 tracking-wider ">
                {errorMessage}
              </p>
            )}
            {/* Display success message */}
            {successMessage && (
              <p className=" uppercase mt-4 text-sm text-green-600 tracking-wider  ">
                {successMessage}
              </p>
            )}
          </div>
      </div>
      </AppLayout>
  );
};

export default AddExpense;
