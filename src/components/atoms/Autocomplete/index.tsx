import { useState } from "react";
import { Combobox } from "@headlessui/react";

/**
 * Komponen Autocomplete digunakan untuk membuat kotak seleksi dengan kemampuan pencarian otomatis.
 *
 * @param {any} value - Nilai yang saat ini dipilih.
 * @param {function} setValue - Fungsi yang dipanggil saat nilai dipilih.
 * @param {Object[]} lists - Daftar item yang tersedia untuk dipilih.
 * @param {Object} keyValue - Objek yang berisi dua properti: `key` dan `value`.
 *   - key: Nama properti dalam objek daftar yang berfungsi sebagai kunci unik.
 *   - value: Nama properti dalam objek daftar yang digunakan untuk pencarian dan tampilan.
 * @param {string} placeholder - Teks placeholder yang ditampilkan saat tidak ada pilihan yang dipilih.
 */

interface AutocompleteProps {
  value: any;
  setValue: (item: string) => void;
  placeholder: string;
  lists: any;
  keyValue: {
    key: string;
    value: string;
  };
}

function Autocomplete({
  value,
  keyValue,
  lists,
  setValue,
  placeholder,
}: AutocompleteProps) {
  const [query, setQuery] = useState("");

  const classNameTextfield = `border text-left bg-white dark:bg-slate-800 focus:border-2 p-2 border-indigo-600 hover:border-indigo-600 focus:border-indigo-600 dark:focus:border-indigo-600 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed w-full rounded-md`;

  const classNameOptions = `mt-2 p-2 border border-indigo-600 bg-white dark:bg-slate-800 rounded-md shadow-md max-h-48 overflow-scroll`;

  /* `filteredList` digunakan untuk memfilter array `lists` berdasarkan nilai `query`. */
  const filteredList =
    query === ""
      ? lists
      : lists.filter((list: any) =>
          list[keyValue.value].toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={value} onChange={(e) => setValue(e)}>
      <Combobox.Input
        placeholder={placeholder}
        className={classNameTextfield}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Combobox.Options className={classNameOptions}>
        {filteredList.map((list: any) => (
          <Combobox.Option
            key={list[keyValue.key]}
            value={list[keyValue.value]}
          >
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
                {list[keyValue.value]}
              </div>
            )}
          </Combobox.Option>
        ))}

        {/* menampilkan "Data tidak ada" saat data yang dicari tidak ada */}
        {filteredList.length === 0 && query.length > 0
          ? "Data tidak ada"
          : null}
      </Combobox.Options>
    </Combobox>
  );
}

export default Autocomplete;
