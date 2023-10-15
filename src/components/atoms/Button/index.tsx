import React from "react";

/* `Interface ButtonProps` mendefinisikan tipe props yang dapat digunakan ke `Button`
komponen. */

interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  size?: "medium" | "small" | "large" | "full";
  type?: "button" | "reset" | "submit";
  disabled?: true | false;
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * Tombol yang dapat disesuaikan.
 *
 * @param {string} variant - Variasi tombol ("contained", "outlined", "text").
 * @param {string} size - Ukuran tombol ("medium", "small", "large", "full").
 * @param {string} type - Tipe tombol ("button", "reset", "submit").
 * @param {boolean} disabled - Apakah tombol dinonaktifkan.
 * @param {function} onClick - Fungsi yang dipanggil saat tombol diklik.
 * @param {ReactNode} children - Konten tombol.
 */
/** */

const Button = ({
  variant,
  children,
  size,
  type,
  disabled,
  onClick,
}: ButtonProps) => {
  /* Objek `classVariant` mendefinisikan kelas CSS yang berbeda untuk setiap varian tombol. */

  const classVariant = {
    contained:
      "font-medium border rounded border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-800 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:border-none ease-in duration-100",

    outlined:
      "font-medium border border-indigo-600 hover:shadow hover:border-indigo-500 hover:shadow rounded-md disabled:border-gray-500 disabled:cursor-not-allowed ease-in duration-100",

    text: "font-medium rounded hover:bg-slate-200 dark:hover:bg-slate-800 ease-in duration-100",
  };

  /* Objek `classSize` mendefinisikan kelas CSS yang berbeda untuk setiap ukuran tombol. */

  const classSize = {
    small: "text-xs py-1 px-2",
    medium: "text-sm py-1.5 px-3",
    large: "text-base py-2 px-4",
    full: "w-full py-1.5",
  };

  /* `Const className` membuat string yang berisi kelas CSS untuk komponen tombol. */

  const className = `
  ${classVariant[variant || "contained"]} 
  ${classSize[size || "medium"]}
  `;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
