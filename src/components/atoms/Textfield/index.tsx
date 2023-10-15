/* `Interface TextfieldProps` mendefinisikan tipe props yang dapat digunakan ke `Textfield`
komponen. */

interface TextfieldProps {
  type?: "text" | "number" | "password" | "date" | "email";
  placeholder?: string;
  label?: string;
  value?: string;
  name?: string;
  error?: string;
  onChange: (value: string) => void;
  variant?: "outlined" | "standard";
  disabled?: true | false;
  autoFocus?: true | false;
}

/**
 * Komponen Textfield yang dapat disesuaikan.
 *
 * @param {string} variant - Variasi Textfield ("outlined", "standard").
 * @param {string} placeholder - Placeholder Textfield dalam string.
 * @param {string} label - Label Textfield dalam string.
 * @param {string} name - Nama Textfield dalam string.
 * @param {string} type - Tipe Textfield ("text", "number", "password", "date", "email").
 * @param {boolean} disabled - Apakah Textfield dinonaktifkan.
 * @param {boolean} autoFocus - Apakah Textfield mendapatkan fokus secara otomatis.
 * @param {string} value - Nilai yang diisi dalam Textfield.
 * @param {string} error - Pesan kesalahan yang ditampilkan di bawah Textfield (opsional).
 */

/** */

const Textfield = ({
  placeholder,
  variant,
  type,
  disabled,
  value,
  onChange,
  autoFocus,
  label,
  error,
  name,
}: TextfieldProps) => {
  /* Objek `classVariant` mendefinisikan kelas CSS yang berbeda untuk setiap varian Textfield. */

  const classVariant = {
    outlined:
      "bg-white dark:bg-slate-800 p-2 border focus:border-2 border-indigo-600 hover:border-indigo-600 focus:ring-indigo-600 focus:border-indigo-600  dark:placeholder-gray-400 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 focus:outline-none rounded-md disabled:border-gray-500 disabled:cursor-not-allowed",

    standard:
      "bg-transparent p-2 border-b focus:border-b-2 border-indigo-600 hover:border-indigo-600 focus:border-indigo-600  dark:placeholder-gray-400  dark:focus:border-indigo-600 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed",
  };

  /* `Const className` membuat string yang berisi kelas CSS untuk komponen Textfield. */

  const className = `
      ${classVariant[variant || "outlined"]} 
      `;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm font-medium select-none">
          {label}
        </label>
      )}
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
      {error && (
        <p className="text-xs md:text-sm text-red-500 dark:text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textfield;
