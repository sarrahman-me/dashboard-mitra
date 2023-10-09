"use client";
import {
  Logo,
  ResizeLayarButton,
  ToggleDarkMode,
} from "../../components/atoms";

export default function AppBar() {
  return (
    <div className="p-2 px-4 md:p-4 divide-x-8 divide-transparent md:px-8 flex justify-between items-center">
      <div>
        <Logo size="text-xl" />
      </div>
      <div className="flex items-center">
        <ResizeLayarButton />
        <ToggleDarkMode />
      </div>
    </div>
  );
}
