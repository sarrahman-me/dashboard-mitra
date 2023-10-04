"use client";
import { ProfileAppBar } from "../../components/molecules";
import { ResizeLayarButton, ToggleDarkMode } from "../../components/atoms";

export default function AppBar() {
  return (
    <div className="select-none p-2 px-4 md:p-4 md:px-8 flex justify-between items-center">
      <div className="flex divide-x-8 divide-transparent">
        <ResizeLayarButton />
        <ToggleDarkMode />
      </div>
      <ProfileAppBar />
    </div>
  );
}
