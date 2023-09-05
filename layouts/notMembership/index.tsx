"use client";

import { useRouter } from "next/navigation";

export default function NotMembership() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-semibold mb-4">
          Berlangganan Terlebih Dahulu
        </h1>
        <p className="text-gray-600 mb-6">
          Untuk mengakses koleksi barang kami, Kamu perlu berlangganan terlebih
          dahulu.
        </p>
        <button
          onClick={() => router.push("/dashboard/membership")}
          className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Berlangganan Sekarang
        </button>
      </div>
    </div>
  );
}
