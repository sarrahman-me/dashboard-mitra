"use client";
import { RiSearchLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form
      className="flex justify-center items-center py-3"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/dashboard/barang/pencarian?query=${searchTerm}`);
      }}
    >
      <div className="relative flex items-center w-full md:w-2/3 mx-2">
        <input
          type="text"
          placeholder="Cari apapun..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white w-full px-4 py-2 rounded-md shadow-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="absolute right-0 mr-2 p-2 rounded-md bg-transparent border-none cursor-pointer focus:outline-none"
        >
          <RiSearchLine size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
