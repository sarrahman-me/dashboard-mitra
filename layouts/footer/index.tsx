import Link from "next/link";
import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.png";

export default function Footer() {
  const navigation = [
    {
      name: "Membership",
      href: "/membership˝",
    },
    {
      name: "Blog",
      href: "/blog",
    },
  ];
  const legal = [
    {
      name: "Term",
      href: "/term",
    },
    {
      name: "Privacy",
      href: "/privacy",
    },
  ];
  return (
    <div className="relative">
      <div className="container p-8 mx-auto xl:px-0">
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div>
              {" "}
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
              >
                <span className="bg-indigo-600 rounded-md p-1 dark:bg-transparent">
                  <Image
                    src={Logo}
                    alt="Toko Keramik Logo"
                    width="32"
                    height="32"
                    className="w-8"
                  />
                </span>
                <span>TokoKeramik.com</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              TokoKeramik.com adalah layanan penyedia platform penjualan keramik
              dan granit yang menghubungkan setiap toko dan pembeli dari mana
              saja
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

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by{" "}
          <a href="https://web3templates.com/" target="_blank" rel="noopener">
            Sarrahman Digital Creative.
          </a>
        </div>
      </div>
    </div>
  );
}
