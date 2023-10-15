/* `Interface RadioGroupProps` mendefinisikan tipe props yang dapat digunakan ke `RadioGroup`
komponen. */

interface RadioGroupProps {
  label: string;
  options: string[];
  name: string;
  selectedValue: string;
  onRadioChange: (item: string) => void;
}

/**
 * Komponen Radio Group button yang digunakan
 *
 * @param {string} label - Label yang mendeskripsikan pilihan.
 * @param {string} name - Nama grup Radio button.
 */

/** */

const RadioGroup = ({
  label,
  name,
  options,
  onRadioChange,
  selectedValue,
}: RadioGroupProps) => {
  /* `Const classNameInput` membuat string yang berisi kelas tailwind CSS untuk komponen input. */

  const classNameInput =
    "w-4 h-4 text-indigo-600 bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-600";

  /* `Const classNameLabel` membuat string yang berisi kelas tailwind CSS untuk komponen label. */

  const classNameLabel = "ml-2 text-sm font-medium select-none";

  return (
    <div>
      <p className={classNameLabel}>{label}</p>
      {options.map((item, i) => (
        <div key={i} className="flex items-center mb-4">
          <input
            id={item}
            type="radio"
            value={item}
            name={name}
            className={classNameInput}
            checked={selectedValue === item}
            onChange={() => onRadioChange(item)}
          />
          <label htmlFor={item} className={classNameLabel}>
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
