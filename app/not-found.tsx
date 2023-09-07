import Link from "next/link";
import Notfound from "@/public/notfound.svg";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="text-center">
        <Image src={Notfound} alt="Not Found" />
        <h2 className="md:text-lg font-bold mt-8">
          Halaman yang Anda cari tidak ditemukan
        </h2>
      </div>
      <Link href="/dashboard">
        <button className="bg-white text-indigo-500 px-6 py-2 rounded-full mt-6 hover:bg-indigo-500 hover:text-white transition duration-300">
          Home
        </button>
      </Link>
    </div>
  );
}
