"use client";
import { Logo, ResizeLayarButton, ToggleDarkMode } from "../../atoms";
import BottomBar from "../BottomBar";

/**
 * Komponen AppBar digunakan untuk membuat bilah aplikasi yang dapat menampilkan judul dan opsi lainnya.
 *
 */

export default function AppBar() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <div className="p-2 px-4 md:p-4 divide-x-8 divide-transparent md:px-8 flex justify-between items-center">
        <div className="sm:hidden">
          <Logo />
        </div>
        <div className="flex items-center divide-x-8 divide-transparent">
          <ResizeLayarButton />
          <ToggleDarkMode />
        </div>
      </div>
      <BottomBar />
    </div>
  );
}