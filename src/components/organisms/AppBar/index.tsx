"use client";
import { Logo, ResizeLayarButton, ToggleDarkMode } from "../../atoms";
import { TopBar } from "../../molecules";

/**
 * Komponen AppBar digunakan untuk membuat bilah aplikasi yang dapat menampilkan judul dan opsi lainnya.
 *
 */

export default function AppBar() {
  return (
    <div className="sticky top-0 z-50 bg-gray-100  dark:bg-gray-900">
      <div className="p-2 px-4 md:p-4 divide-x-8 divide-transparent md:px-8 flex justify-between sm:justify-end items-center">
        <div className="sm:hidden">
          <Logo />
        </div>
        <div className="flex items-center divide-x-8 divide-transparent">
          <ResizeLayarButton />
          <ToggleDarkMode />
        </div>
      </div>
      <TopBar />
    </div>
  );
}
