import React, { useState, useEffect, useRef } from "react";
import AppLayout from "../AppLayout/AppLayout.jsx";
import { CutCornerButton } from "../Header/CutCornerButton.jsx";
import { motion } from "framer-motion";

// Categories with icons
const categories = [
  { name: "Food", icon: "🍔" },
  { name: "Transport", icon: "🚗" },
  { name: "Grocery", icon: "🛒" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Bills", icon: "💡" },
  { name: "Other", icon: "📦" },
];

// Payment methods
const paymentMethods = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Crypto",
];

// Recurring frequencies
const frequencies = ["Daily", "Weekly", "Monthly", "Yearly"];

const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

const AddExpense = ({ addExpense, editingExpense, saveEditedExpense }) => {
  const [category, setCategory] = useState(categories[0].name);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [notes, setNotes] = useState("");
  const [currency, setCurrency] = useState(currencies[0]);
  const [receipt, setReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef();

  // Load editing expense data
  useEffect(() => {
    if (editingExpense) {
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setAmount(editingExpense.amount);
      setTitle(editingExpense.title || "");
      setTags(editingExpense.tags || []);
      setPaymentMethod(editingExpense.paymentMethod || paymentMethods[0]);
      setIsRecurring(editingExpense.isRecurring || false);
      setFrequency(editingExpense.frequency || frequencies[0]);
      setNotes(editingExpense.notes || "");
      setCurrency(editingExpense.currency || currencies[0]);
      setReceipt(null);
      setReceiptPreview(editingExpense.receiptPreview || null);
    } else {
      setCategory(categories[0].name);
      setDate("");
      setAmount("");
      setTitle("");
      setTags([]);
      setPaymentMethod(paymentMethods[0]);
      setIsRecurring(false);
      setFrequency(frequencies[0]);
      setNotes("");
      setCurrency(currencies[0]);
      setReceipt(null);
      setReceiptPreview(null);
    }
  }, [editingExpense]);

  // Handle file upload for receipt
  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceipt(file);
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  // Handle tag toggle (multi-select)
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // Validate year length in date input (YYYY-MM-DD)
  const validateDate = (dateStr) => {
    if (!dateStr) return false;
    // Regex to validate correct YYYY-MM-DD and max year length 4 digits
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }
    if (!date || !validateDate(date)) {
      setErrorMessage("Valid date is required (YYYY-MM-DD).");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Amount must be a positive number.");
      return;
    }

    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      title: title.trim(),
      category,
      date,
      amount: parseFloat(amount),
      tags,
      paymentMethod,
      isRecurring,
      frequency: isRecurring ? frequency : null,
      notes,
      currency,
      receipt, // You'd handle uploading or saving this later
      receiptPreview,
    };

    if (editingExpense) {
      saveEditedExpense(newExpense);
    } else {
      addExpense(newExpense);
      setSuccessMessage("Expense successfully added!");
      // Reset form
      setCategory(categories[0].name);
      setDate("");
      setAmount("");
      setTitle("");
      setTags([]);
      setPaymentMethod(paymentMethods[0]);
      setIsRecurring(false);
      setFrequency(frequencies[0]);
      setNotes("");
      setCurrency(currencies[0]);
      setReceipt(null);
      setReceiptPreview(null);
    }
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          {editingExpense ? "Edit Expense" : "Add New Expense"}
        </motion.h2>

        {/* Category selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat.name)}
              className={`cursor-pointer bg-zinc-800 border rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all ${
                category === cat.name
                  ? "border-purple-500 shadow-lg shadow-purple-500/50 scale-110"
                  : "border-zinc-700"
              }`}
            >
              <div className="text-4xl">{cat.icon}</div>
              <span className="mt-2 font-semibold uppercase tracking-wider">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 rounded-lg p-8 space-y-6 shadow-lg"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-1 uppercase text-zinc-400 font-extrabold"
            >
              Title / Description *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Coffee with friends"
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block mb-1 uppercase text-zinc-400 font-extrabold"
            >
              Date *
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Amount & Currency */}
          <div className="flex gap-4">
            <div className="flex-grow">
              <label
                htmlFor="amount"
                className="block mb-1 uppercase text-zinc-400 font-extrabold"
              >
                Amount *
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                required
              />
            </div>
            <div className="w-28">
              <label
                htmlFor="currency"
                className="block mb-1 uppercase text-zinc-400 font-extrabold"
              >
                Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label
              htmlFor="paymentMethod"
              className="block mb-1 uppercase text-zinc-400 font-extrabold"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Tags (multi-select) */}
          <div>
            <label className="block mb-2 uppercase text-zinc-400 font-extrabold">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {["work", "personal", "urgent", "food", "travel", "other"].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full border text-sm font-semibold uppercase tracking-wider transition ${
                      tags.includes(tag)
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-purple-700 hover:border-purple-700"
                    }`}
                  >
                    #{tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Recurring */}
          <div className="flex items-center gap-4">
            <label className="uppercase text-zinc-400 font-extrabold">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="mr-2"
              />
              Recurring Expense
            </label>

            {isRecurring && (
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {frequencies.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block mb-1 uppercase text-zinc-400 font-extrabold"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional details (optional)"
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="block mb-1 uppercase text-zinc-400 font-extrabold">
              Receipt (optional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleReceiptUpload}
              className="text-sm text-zinc-400"
            />
            {receiptPreview && (
              <img
                src={receiptPreview}
                alt="Receipt preview"
                className="mt-4 max-w-xs max-h-48 rounded-md border border-zinc-700 object-contain"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <CutCornerButton type="submit">
              {editingExpense ? "Save Changes" : "Add Expense"}
            </CutCornerButton>
          </div>

          {/* Alerts */}
          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm font-semibold uppercase tracking-wider">
              {successMessage}
            </p>
          )}
        </form>
      </div>
  );
};

export default AddExpense;
