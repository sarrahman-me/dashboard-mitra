/**
 * Komponen Typography digunakan untuk menampilkan teks dengan variasi gaya dan ukuran yang dapat disesuaikan.
 *
 * @param {string} children - Teks yang akan ditampilkan.
 * @param {string} variant - Variasi teks (opsional). Pilihan: "h1", "h2", "h3", "h4", "subtitle", "body".
 */

interface TypographyProps {
  children: string; // Teks yang akan ditampilkan.
  variant?: "h1" | "h2" | "h3" | "h4" | "subtitle" | "body"; // Variasi teks (opsional) default body.
}

const Typography = ({ children, variant }: TypographyProps) => {
  // Daftar kelas CSS untuk setiap variasi teks
  const classVariant = {
    h1: "text-5xl font-semibold text-slate-950 dark:text-slate-50",
    h2: "text-4xl font-semibold text-slate-950 dark:text-slate-50",
    h3: "text-3xl font-semibold text-slate-950 dark:text-slate-50",
    h4: "text-2xl font-semibold text-slate-950 dark:text-slate-50",
    subtitle: "text-lg md:text-xl font-medium text-slate-950 dark:text-slate-50",
    body: "sm:text-sm text-xs md:text-base text-slate-950 dark:text-slate-50",
  };

  const className = `
  ${classVariant[variant || "body"]} 
  `;

  return <p className={className}>{children}</p>;
};

export default Typography;
