"use client";

import { useRouter } from "next/navigation";
import { FcLock } from "react-icons/fc";

export default function NotMembership() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded shadow text-center">
        <h1 className="text-2xl font-semibold mb-4">Halaman terkunci</h1>
        <div className="flex justify-center">
          <FcLock className="text-9xl" />
        </div>
        <p className="mb-6">
          Untuk mengakses halaman ini, Kamu perlu berlangganan terlebih dahulu.
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
