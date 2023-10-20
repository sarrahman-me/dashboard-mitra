"use client";
import React from "react";

/**
 * Tombol yang dapat disesuaikan.
 *
 * @param {string} variant - Variasi tombol ("contained", "outlined", "text").
 * @param {string} size - Ukuran tombol ("medium", "small", "large", "full").
 * @param {string} type - Tipe tombol ("button", "reset", "submit").
 * @param {boolean} disabled - Apakah tombol dinonaktifkan.
 * @param {boolean} loading - Apakah tombol sedang dalam status "loading".
 * @param {function} onClick - Fungsi yang dipanggil saat tombol diklik.
 * @param {ReactNode} children - Konten tombol.
 * @param {ReactNode} icon - Ikon yang ditampilkan di samping teks tombol.
 */

interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  color?:
    | "primaryContained"
    | "primaryOutlined"
    | "dangerContained"
    | "dangerOutlined";
  size?: "medium" | "small" | "large" | "full";
  type?: "button" | "reset" | "submit";
  disabled?: true | false;
  loading?: true | false;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = ({
  variant,
  children,
  size,
  type,
  disabled,
  loading,
  icon,
  onClick,
  color,
}: ButtonProps) => {
  /* mendefinisikan className tailwind CSS yang berbeda untuk setiap varian tombol. */

  const classVariant = {
    contained: "border text-white disabled:bg-gray-500 disabled:border-none",

    outlined: "border-2 hover:shadow-md disabled:border-gray-500",

    text: "hover:bg-slate-200 dark:hover:bg-slate-800",
  };

  const colorVariant = {
    primaryContained: "border-indigo-600 bg-indigo-600 hover:bg-indigo-800",
    primaryOutlined: "border-indigo-600 hover:border-indigo-500",
    dangerContained: "border-red-600 bg-red-600 hover:bg-red-800",
    dangerOutlined: "border-red-600 hover:border-red-500",
  };

  const classSize = {
    small: "text-xs py-1 px-2",
    medium: "text-sm py-1.5 px-3",
    large: "text-base py-2 px-4",
    full: "w-full py-1.5 justify-center",
  };

  const defaultClass = `flex items-center font-medium rounded-md disabled:cursor-not-allowed transition`;

  const defaultColor =
    variant == "contained" ? "primaryContained" : "primaryOutlined";

  const className = `
  ${defaultClass}
  ${classVariant[variant || "contained"]} 
  ${colorVariant[color || defaultColor]}
  ${classSize[size || "medium"]}
  `;

  const classIcon = `ml-2 ${loading ? "animate-spin" : ""}`;

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={className}
    >
      {loading ? "Loading ..." : children}
      {icon && <span className={classIcon}>{icon}</span>}
    </button>
  );
};

export default Button;
