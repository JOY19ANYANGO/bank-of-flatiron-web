import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Searchbar({ onSearch }) {
  const [description, setDescription] = useState("");

  function handleSearch(event) {
    setDescription(event.target.value);
    // Pass the entered description back to the parent component
    onSearch(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className="flex justify-center w-full my-4">
      <div className="flex items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Search transaction description"
          value={description}
          onChange={handleSearch}
          className="flex-grow p-2 text-green-500 bg-black border-2 border-green-500 rounded-l-md outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover:border-green-300"
        />
        <div className="p-2 bg-black border-2 border-green-500 rounded-r-md">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-green-500 animate-pulse transition duration-300 ease-in-out hover:text-green-300"
          />
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
