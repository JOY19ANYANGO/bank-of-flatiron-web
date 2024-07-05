import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewTransaction({ addTransaction }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!date || !description || !category || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    const newTransaction = {
      date,
      description,
      category,
      amount: parseFloat(amount),
    };
    addTransaction(newTransaction);
    toast.success("Transaction added successfully!");
    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-lg">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-gray-800 px-4 py-2 rounded-md transition duration-300 ease-in-out"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add Transaction"}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="text-green-500 block mb-1">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              className="w-full p-2 bg-black text-green-500 border-2 border-green-500 rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-green-500 block mb-1">
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-2 bg-black text-green-500 border-2 border-green-500 rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="text-green-500 block mb-1">
              Category:
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-2 bg-black text-green-500 border-2 border-green-500 rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="text-green-500 block mb-1">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 bg-black text-green-500 border-2 border-green-500 rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-gray-800 px-4 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Add Transaction
          </button>
        </form>
      )}
    </div>
  );
}

export default NewTransaction;
