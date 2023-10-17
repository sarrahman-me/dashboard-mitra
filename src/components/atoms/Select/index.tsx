import { Listbox } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";

/**
 * Komponen Select digunakan untuk membuat kotak pilihan sederhana hanya string[] dengan daftar pilihan.
 *
 * @param {any} value - Nilai yang saat ini dipilih.
 * @param {function} setValue - Fungsi yang dipanggil saat nilai dipilih.
 * @param {string} placeholder - Teks placeholder yang ditampilkan saat tidak ada pilihan yang dipilih.
 * @param {string[]} lists - Daftar pilihan yang tersedia.
 */

interface SelectProps {
  value: any;
  setValue: any;
  lists: string[];
  placeholder?: string;
}

const Select = ({ setValue, value, placeholder, lists }: SelectProps) => {
  const classNameButton = `border text-left bg-white dark:bg-slate-800 focus:border-2 p-2 border-indigo-600 hover:border-indigo-600 focus:border-indigo-600 dark:focus:border-indigo-600 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed w-full rounded-md`;

  const classNameOptions = `mt-2 p-2 focus:outline-none border border-indigo-600 bg-white dark:bg-slate-800 rounded-md shadow-md max-h-48 overflow-scroll`;

  return (
    <Listbox value={value} onChange={setValue}>
      {/* tombol untuk pilih data */}
      <div className="relative flex items-center">
        <Listbox.Button className={classNameButton}>
          {value || placeholder}
        </Listbox.Button>

        <div className="relative flex items-center">
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
  );
};

export default Select;
