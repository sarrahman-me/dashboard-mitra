export default function Select(props: {
  value: string;
  setValue: any;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor="select-option"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        Ukuran
      </label>
      <select
        id="select-option"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500`}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      >
        <option disabled value="">
          Choose an option
        </option>
        {props.options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
