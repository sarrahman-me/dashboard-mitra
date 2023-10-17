import { Listbox } from "@headlessui/react";

interface SelectProps {
  value: any;
  setValue: any;
  lists: any[];
}

const Select = ({ setValue, value, lists }: SelectProps) => {
  return (
    <Listbox value={value} onChange={setValue}>
      <div className="relative">
        <Listbox.Button className="border focus:border-2 p-2 border-indigo-600 hover:border-indigo-600 focus:border-indigo-600 dark:focus:border-indigo-600 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed w-full rounded-md">
          {value.name}
        </Listbox.Button>
        <Listbox.Options className="mt-2 p-2 border border-indigo-600 bg-white dark:bg-slate-800 rounded-md shadow-md">
          {lists.map((list) => (
            <Listbox.Option key={list.id} value={list} disabled={list.disabled}>
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
                  {list.name}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default Select;
