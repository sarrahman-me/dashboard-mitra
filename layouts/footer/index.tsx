import { Logo } from "@/components/atoms";
import { TextFooter } from "@/components/molecules";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const navigation = [
    {
      name: "Tentang Kami",
      href: "/tentang",
    },
  ];
  const legal = [
    {
      name: "Privasi Data",
      href: "/kebijakan-privasi",
    },
    {
      name: "Syarat & Ketentuan",
      href: "/syarat-dan-ketentuan",
    },
  ];
  return (
    <div className="relative">
      <div className="container p-8 mx-auto xl:px-0">
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div>
              {" "}
              <Link href="/">
                <Logo size="text-2xl" />
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              kami selalu siap membantu Anda. Jika Anda memiliki pertanyaan atau
              mengalami masalah, kami akan dengan senang hati memberikan bantuan
              yang Anda butuhkan.
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <TextFooter />
      </div>
    </div>
  );
}
