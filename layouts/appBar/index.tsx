"use client";
import { ResizeLayarButton, ToggleDarkMode } from "../../components/atoms";

export default function AppBar() {
  return (
    <div className="p-2 px-4 md:p-4 divide-x-8 divide-transparent md:px-8 flex justify-end items-center">
      <ResizeLayarButton />
      <ToggleDarkMode />
    </div>
  );
}
