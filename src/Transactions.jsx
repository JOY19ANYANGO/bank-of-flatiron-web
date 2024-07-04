import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import NewTransaction from "./Newtransaction";
import Searchbar from "./Searchbar";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Slideshow images for the background
  const slideshowImages = [
    "https://media.gettyimages.com/id/137896551/photo/exterior-view-of-skyscrapers.jpg?s=2048x2048&w=gi&k=20&c=-4HcZbZnwgXJyHReSsXnbYZXXLuqgOWURbRKIj8SyRA=",
    "https://media.gettyimages.com/id/1058699076/photo/low-angle-view-of-contemporary-corporate-skyscrapers-with-urban-architectural-design-in.jpg?s=2048x2048&w=gi&k=20&c=o3KLjlDAqOp8BtBv-H1BoUTUHj8da20UL9eaL_mgAf0=",
    "https://media.gettyimages.com/id/1215119911/photo/looking-directly-up-at-the-skyline-of-the-financial-district-in-central-london-stock-image.jpg?s=2048x2048&w=gi&k=20&c=CA1cgh-STqN3dMUGbGE2LJFLZHuN0cH6CLTgAT1adY8=",
  ];

  // Fetch the transactions
  useEffect(() => {
    fetch("http://localhost:4000/transactions")
      .then((r) => r.json())
      .then((data) => {
        console.log("Fetched data:", data);
        // Sort the fetched array alphabetically according to the category
        data.sort((a, b) =>
          a.category.toLowerCase().localeCompare(b.category.toLowerCase())
        );
        setTransactions(data);
      });
  }, []);

  // Add a new transaction
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // Filter transactions based on the entered description
  const handleSearch = (description) => {
    if (description === "" || description === null) {
      // Display all the transactions
      fetch("http://localhost:4000/transactions")
        .then((r) => r.json())
        .then((data) => {
          console.log("Fetched data:", data);
          data.sort((a, b) =>
            a.category.toLowerCase().localeCompare(b.category.toLowerCase())
          );
          setTransactions(data);
        });
    } else {
      // Filter transactions based on the entered description
      const filtered = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(description.toLowerCase())
      );
      filtered.sort((a, b) =>
        a.category.toLowerCase().localeCompare(b.category.toLowerCase())
      );
      setTransactions(filtered);
      console.log(filtered);
    }
  };

  const handleDelete = (id) => {
    // Filter out the transaction with the given id and update the transactions state
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  // Sort transactions by date
  const handleSortAscending = () => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setTransactions(sortedTransactions);
  };

  const handleSortDescending = () => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setTransactions(sortedTransactions);
  };

  // Sort transactions by description
  const handleSortDescription = () => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a.description.toLowerCase().localeCompare(b.description.toLowerCase())
    );
    setTransactions(sortedTransactions);
  };

  // Sort transactions by category
  const handleSortCategory = () => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a.category.toLowerCase().localeCompare(b.category.toLowerCase())
    );
    setTransactions(sortedTransactions);
  };

  // Automatically change background image in slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) =>
        prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dark:bg-black dark:text-white min-h-screen">
      <div
        className="slide flex flex-col justify-center items-center h-[70vh]"
        style={{
          backgroundImage: `url(${slideshowImages[backgroundIndex]})`,
          transition: "background-image 1s ease-in-out",
        }}
      >
        <h1 className="text-6xl font-calligraphy font-bold text-white mb-4 text-center">
          Bank of Flatiron
        </h1>
        <p className="text-3xl font-calligraphy font-bold text-white mb-4 text-center">
          Welcome to the Bank of Flatiron website.
        </p>
        <p className="text-3xl font-calligraphy font-bold text-white mb-4 text-center">
          where you can conveniently keep track of transactions by adding or removing them!
        </p>
        <NewTransaction addTransaction={addTransaction} />
      </div>
      
      <Searchbar onSearch={handleSearch} />
      {transactions.length === 0 ? (
        <p className="text-white">No transactions found</p>
      ) : (
        <table className="min-w-full bg-gray-800 text-white glowing-border">
          <thead>
            <tr>
              <th className="px-4 py-2 glowing-border">Date</th>
              <th className="px-4 py-2 glowing-border">Description</th>
              <th className="px-4 py-2 glowing-border">Category</th>
              <th className="px-4 py-2 glowing-border">Amount</th>
              <th className="px-4 py-2 glowing-border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="glowing-border">
                <td className="px-4 py-2 glowing-border">{transaction.date}</td>
                <td className="px-4 py-2 glowing-border">{transaction.description}</td>
                <td className="px-4 py-2 glowing-border">{transaction.category}</td>
                <td className="px-4 py-2 glowing-border">
                  ${Number(transaction.amount).toFixed(2)}
                </td>
                <td className="px-4 py-2 glowing-border">
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="delete-icon"
                    onClick={() => handleDelete(transaction.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex flex-col items-center mt-4">
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleSortAscending}
          >
            Sort by Date (Ascending)
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleSortDescending}
          >
            Sort by Date (Descending)
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleSortDescription}
          >
            Sort by Description
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleSortCategory}
          >
            Sort by Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
