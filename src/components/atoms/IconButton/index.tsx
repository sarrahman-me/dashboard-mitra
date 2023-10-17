import React from "react";

/**
 * Komponen IconButton digunakan untuk membuat tombol dengan ikon yang dapat diklik.
 *
 * @param {ReactNode} icon - Ikona yang akan ditampilkan dalam tombol.
 * @param {function} onClick - Fungsi yang dipanggil saat tombol diklik.
 * @param {string} color - Warna latar belakang tombol (opsional). Pilihan: "primary", "secondary", "danger", "success", "warning".
 * @param {string} size - Ukuran tombol (opsional). Pilihan: "small", "medium", "large".
 * @param {string} otherClass - Kelas tambahan yang dapat diberikan pada IconButton (opsional).
 * 
 */

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "danger" | "success" | "warning";
  size?: "small" | "medium" | "large";
  otherClass?: string;
}

const IconButton = ({
  icon,
  onClick,
  color,
  size,
  otherClass,
}: IconButtonProps) => {
  // Daftar kelas CSS untuk setiap warna tombol
  const classColor = {
    primary: "bg-indigo-600 text-white hover:bg-white hover:text-indigo-600",
    secondary: "bg-gray-600 text-white hover:bg-white hover:text-gray-600",
    danger: "bg-red-600 text-white hover:bg-white hover:text-red-600",
    success: "bg-green-600 text-white hover:bg-white hover:text-green-600",
    warning: "bg-orange-600 text-white hover:bg-white hover:text-orange-600",
  };

  // Daftar kelas CSS untuk setiap ukuran tombol
  const classSize = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  };

  // Membentuk kelas CSS sesuai dengan properti yang diberikan
  const className = `rounded-md p-1 transition 
  ${classColor[color || "primary"]}
  ${classSize[size || "medium"]}
  ${otherClass}
  `;

  return (
    <button onClick={onClick} className={className}>
      {icon}
    </button>
  );
};

export default IconButton;
