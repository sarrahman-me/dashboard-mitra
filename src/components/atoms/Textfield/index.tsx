import React from "react";

/**
 * Komponen Textfield yang dapat disesuaikan.
 *
 * @param {string} name - Nama Textfield dalam string.
 * @param {string} variant - Variasi Textfield ("outlined", "standard").
 * @param {string} placeholder - Placeholder Textfield dalam string.
 * @param {string} label - Label Textfield dalam string.
 * @param {string} type - Tipe Textfield ("text", "number", "password", "date", "email").
 * @param {boolean} disabled - Apakah Textfield dinonaktifkan.
 * @param {boolean} autoFocus - Apakah Textfield mendapatkan fokus secara otomatis.
 * @param {string} value - Nilai yang diisi dalam Textfield.
 * @param {string} error - Pesan kesalahan yang ditampilkan di bawah Textfield (opsional).
 * @param {ReactNode} icon - Ikon yang ingin ditampilkan di dalam Textfield (opsional).
 * @param {function} onClickIcon - Fungsi yang dipanggil saat ikon di dalam Textfield diklik (opsional).
 */

interface TextfieldProps {
  name: string;
  type?: "text" | "number" | "password" | "date" | "email";
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
  variant?: "outlined" | "standard";
  disabled?: true | false;
  autoFocus?: true | false;
  fullWidth?: true | false;
  icon?: React.ReactNode;
  onClickIcon?: () => void;
}

const Textfield = ({
  placeholder,
  variant,
  type,
  disabled,
  value,
  onChange,
  onClickIcon,
  autoFocus,
  fullWidth,
  label,
  icon,
  error,
  name,
}: TextfieldProps) => {
  /* Objek `classVariant` mendefinisikan kelas CSS yang berbeda untuk setiap varian Textfield. */

  const classVariant = {
    outlined:
      "bg-white dark:bg-slate-800 border focus:border-2 focus:ring-indigo-600 dark:placeholder-gray-400 dark:focus:ring-indigo-600 rounded-md  invalid:border-red-500",

    standard:
      "bg-transparent border-b focus:border-b-2 border-indigo-600 hover:border-indigo-600 dark:placeholder-gray-400 invalid:border-b-red-500",
  };

  /* "defaultClass" adalah class tailwind yang ada di semua variant textfield */

  const defaultClass = `placeholder:select-none p-2 border-indigo-600 hover:border-indigo-600 focus:border-indigo-600 dark:focus:border-indigo-600 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed`;

  /* `Const className` membuat string yang berisi kelas CSS untuk komponen Textfield. */

  const className = `
      ${defaultClass}
      ${classVariant[variant || "outlined"]} 
      ${fullWidth ? "w-full" : ""}
      `;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm font-medium select-none">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={name}
          value={value}
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          type={type}
        />
        {icon && (
          <div onClick={onClickIcon} className="relative flex items-center">
            <span className="absolute right-3 text-indigo-600">{icon}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs md:text-sm text-red-500 dark:text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textfield;
