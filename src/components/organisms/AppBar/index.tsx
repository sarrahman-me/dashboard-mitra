"use client";
import { ResizeLayarButton, ToggleDarkMode, Typography } from "../../atoms";

/**
 * Komponen AppBar digunakan untuk membuat bilah aplikasi yang dapat menampilkan judul dan opsi lainnya.
 *
 * @param {string} title - Judul yang akan ditampilkan di AppBar (opsional).
 */

interface AppBarProps {
  title?: string;
}

export default function AppBar({ title }: AppBarProps) {
  return (
    <div className="p-2 px-4 md:p-4 divide-x-8 divide-transparent md:px-8 flex justify-between items-center">
      <div>
        <Typography>{title}</Typography>
      </div>
      <div className="flex items-center divide-x-8 divide-transparent">
        <ResizeLayarButton />
        <ToggleDarkMode />
      </div>
    </div>
  );
}
