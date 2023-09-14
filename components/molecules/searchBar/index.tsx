"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
import { BiImage } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    Loading.dots("Mencari...");

    if (!searchTerm && !image) {
      Loading.remove();
      Notify.warning("Masukkan kata kunci pencarian atau unggah gambar");
      return;
    }

    if (image) {
      try {
        const response = await PostDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/ai/predict`,
          {
            image,
          }
        );

        if (response.predicted_class) {
          router.push(
            `/dashboard/barang/pencarian?query=${response.predicted_class}`
          );
        } else {
          Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
        }
      } catch (error) {
        console.error("Error:", error);
        Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
      }
    } else {
      router.push(`/dashboard/barang/pencarian?query=${searchTerm}`);
    }

    Loading.remove();
  };

  const handleImageIconClick = () => {
    // Ketika ikon gambar diklik, klik juga tombol input file
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center items-center py-3">
      <div className="relative flex items-center w-full md:w-2/3 mx-2">
        <input
          type="text"
          placeholder="Cari berdasarkan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white dark:bg-slate-800 w-full px-4 py-2 rounded-md shadow-md placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <div className="absolute right-0 mr-2 p-2">
          <button
            onClick={handleSearch}
            type="submit"
            className="mr-5 rounded-md bg-transparent border-none cursor-pointer focus:outline-none text-indigo-500"
          >
            <RiSearchLine size={20} />
          </button>
          <button
            type="button"
            className="rounded-md bg-transparent border-none cursor-pointer focus:outline-none text-indigo-500"
            onClick={handleImageIconClick}
            title="Pencarian Gambar"
          >
            <BiImage size={20} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
              ref={fileInputRef}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
