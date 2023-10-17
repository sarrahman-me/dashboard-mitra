import { useState } from "react";
import { Combobox } from "@headlessui/react";

/**
 * Komponen Autocomplete digunakan untuk membuat kotak seleksi dengan kemampuan pencarian otomatis.
 *
 * @param {any} value - Nilai yang saat ini dipilih.
 * @param {function} setValue - Fungsi yang dipanggil saat nilai dipilih.
 * @param {Object[]} lists - Daftar item yang tersedia untuk dipilih.
 * @param {string[]} keyValue - Array berisi dua string: kunci unik dan nama yang digunakan untuk pencarian dan tampilan.
 */

interface AutocompleteProps {
  value: any;
  setValue: (item: string) => void;
  lists: any;
  keyValue: string[];
}

function Autocomplete({ value, keyValue, lists, setValue }: AutocompleteProps) {
  const [query, setQuery] = useState("");

  const classNameTextfield = `border text-left bg-white dark:bg-slate-800 focus:border-2 p-2 border-indigo-600 hover:border-indigo-600 focus:border-indigo-600 dark:focus:border-indigo-600 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed w-full rounded-md`;

  const classNameOptions = `mt-2 p-2 border border-indigo-600 bg-white dark:bg-slate-800 rounded-md shadow-md`;

  /* `filteredList` digunakan untuk memfilter array `lists` berdasarkan nilai `query`. */
  const filteredList =
    query === ""
      ? lists
      : lists.filter((list: any) =>
          list[keyValue[1]].toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={value} onChange={(e) => setValue(e)}>
      <Combobox.Input
        className={classNameTextfield}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Combobox.Options className={classNameOptions}>
        {filteredList.map((list: any) => (
          <Combobox.Option key={list[keyValue[0]]} value={list[keyValue[1]]}>
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
                {list[keyValue[1]]}
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
