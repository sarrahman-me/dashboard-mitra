"use client";
import { Listbox } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import Label from "../Label";
import Typography from "../Typography";

/**
 * Komponen Select digunakan untuk membuat kotak pilihan sederhana yang hanya menerima input string dari daftar pilihan.
 *
 * @param {string} value - Nilai yang saat ini dipilih.
 * @param {function} setValue - Fungsi yang dipanggil saat nilai dipilih.
 * @param {string} placeholder - Teks placeholder yang ditampilkan saat tidak ada pilihan yang dipilih.
 * @param {string[]} lists - Daftar pilihan yang tersedia.
 * @param {string} label - Label untuk kotak pilihan (opsional).
 * @param {string} error - Pesan kesalahan yang ditampilkan di bawah kotak pilihan (opsional).
 * @param {string} size - Ukuran komponen (opsional, tersedia: "small", "medium", "large") default medium.
 * @param {boolean} noIcon - Menghilangkan ikon seleksi (opsional).
 */

interface SelectProps {
  value: string;
  setValue: (value: string) => void;
  lists: string[];
  placeholder?: string;
  label?: string;
  error?: string;
  size?: "small" | "medium" | "large";
  noIcon?: boolean;
}

const Select = ({
  setValue,
  value,
  placeholder,
  lists,
  label,
  noIcon,
  size,
  error,
}: SelectProps) => {
  const classSize = {
    small: "p-1 text-xs",
    medium: "p-2 text-base",
    large: "p-3 text-lg",
  };

  /* Objek `classColorBorder` mendefinisikan kelas CSS yang berbeda untuk setiap border pada varian Textfield ketika error. */
  const classColorBorder = {
    default:
      "border-gray-600 hover:border-gray-600 focus:border-indigo-600 dark:focus:border-indigo-600",
    error:
      "border-red-600 hover:border-red-600 focus:border-red-600 dark:focus:border-red-600",
  };

  const classNameButton = `border text-left bg-white dark:bg-slate-800 focus:border-2 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed w-full rounded-md
  ${classSize[size || "medium"]}
  ${!error ? classColorBorder.default : classColorBorder.error}`;

  const classNameOptions = `mt-2 focus:outline-none border border-indigo-600 bg-white dark:bg-slate-800 rounded-md shadow-md max-h-48 overflow-scroll
  ${classSize[size || "medium"]}
  `;

  return (
    <div>
      {label && <Label otherClass="mb-1">{label}</Label>}

      <Listbox value={value} onChange={setValue}>
        {/* tombol untuk pilih data */}
        <div className="relative flex items-center">
          <Listbox.Button className={classNameButton}>
            {value || placeholder}
          </Listbox.Button>

          <div
            className={`${noIcon ? "hidden" : "relative"} flex items-center`}
          >
            <span className="absolute right-3 text-indigo-600">
              <HiSelector />
            </span>
          </div>
        </div>

        {/* pilihan listbox */}
        <Listbox.Options className={classNameOptions}>
          {lists.map((list, i) => (
            <Listbox.Option key={i} value={list}>
              {({ active, selected }) => (
                <div
                  className={`${
                    active
                      ? "bg-indigo-100 text-indigo-600"
                      : selected
                      ? "bg-indigo-600 text-white"
                      : ""
                  } cursor-pointer select-none p-2 rounded-md`}
                >
                  {list}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>

      {error && (
        <Typography variant="helper" color="danger">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Select;
