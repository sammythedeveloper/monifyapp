import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddExpense from "./Components/AddExpense/AddExpense";
import ExpenseList from "./Components/ExpenseList/ExpenseList";
import EditExpense from "./Components/EditExpense/EditExpense";
import Header from "./Components/Header/Header";
import Home from "./Components/HomePage/Home.jsx";
import { Features } from "./Components/Feature/Feature.jsx";
import Footer from "./Components/Footer/Footer.js";
import AppLayout from "./Components/AppLayout/AppLayout.jsx";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const saveEditedExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
              <Footer />
            </>
          }
        />
        <Route
          path="/features"
          element={
            <>
              <AppLayout />
              <Features />
              <Footer />
            </>
          }
        />
        <Route
          path="/add-expense"
          element={
            <>
              <AddExpense addExpense={addExpense} />
              <Footer />
            </>
          }
        />
        <Route
          path="/list"
          element={
            <ExpenseList
              expenses={expenses}
              startEditExpense={setEditingExpense}
              deleteExpense={deleteExpense}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <EditExpense
                expenses={expenses}
                saveEditedExpense={saveEditedExpense}
                setEditingExpense={setEditingExpense}
              />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
