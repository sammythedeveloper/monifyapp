import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Here I used React Router hooks for routing
import AddExpense from "../AddExpense/AddExpense"; // Here I want to use the AddExpense component to edit an expense

const EditExpense = ({ expenses, saveEditedExpense, setEditingExpense }) => {
  const { id } = useParams(); // Here I used useParams to extract the id from the URL
  const expenseToEdit = expenses.find((expense) => expense.id === parseInt(id)); // Here I want to find the specific expense to edit based on the id
  const [successMessage, setSuccessMessage] = useState(""); // Here I used useState to manage the success message state
  const navigate = useNavigate(); // Here I want to navigate to different routes in the app

  const handleSaveEditedExpense = (updatedExpense) => {
    saveEditedExpense(updatedExpense); // Here I want to save the updated expense using the parent method
    setSuccessMessage("Change Saved Successfully!"); // Here I used setSuccessMessage to display a success message

    // Here I want to clear the message after 3 seconds (optional)
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div>
      {expenseToEdit ? ( // Here I want to check if the expense to edit exists
        <div>
          <AddExpense
            addExpense={() => {}} // Here I used an empty function as we don't need to add a new expense
            editingExpense={expenseToEdit} // Here I want to pass the expense to edit to the AddExpense component
            saveEditedExpense={handleSaveEditedExpense} // Here I want to pass the function to handle saving the edited expense
            setEditingExpense={setEditingExpense} // Here I used the state setter to manage editing state
          />
          {successMessage && <p>{successMessage}</p>} {/* Here I want to display the success message if it exists */}
          <button onClick={() => navigate("/")}></button> {/* Here I want to navigate back to the home page */}
        </div>
      ) : (
        <p>Expense not found.</p> // Here I want to display a message if the expense is not found
      )}
    </div>
  );
};

export default EditExpense;
