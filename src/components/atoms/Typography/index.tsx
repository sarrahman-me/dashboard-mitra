/**
 * Komponen Typography digunakan untuk menampilkan teks dengan variasi gaya, ukuran, dan warna yang dapat disesuaikan.
 *
 * @param {ReactNode} children - Teks yang akan ditampilkan.
 * @param {string} variant - Variasi teks (opsional). Pilihan: "h1", "h2", "h3", "h4", "subtitle", "body", "helper".
 * @param {string} color - Warna teks (opsional dengan default primary). Pilihan: "primary", "secondary", "danger", "success", "warning".
 */

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "helper";
  color?: "primary" | "secondary" | "danger" | "success" | "warning";
}

const Typography = ({ children, variant, color }: TypographyProps) => {
  // Daftar kelas CSS untuk setiap variasi teks
  const classVariant = {
    h1: "text-5xl font-semibold",
    h2: "text-4xl font-semibold",
    h3: "text-3xl font-semibold",
    h4: "text-2xl font-semibold",
    subtitle: "text-lg md:text-xl font-medium",
    body: "sm:text-sm text-xs md:text-base",
    helper: "sm:text-sm text-xs",
  };

  const classColor = {
    primary: "text-slate-950 dark:text-slate-50",
    secondary: "text-gray-600 dark:text-gray-500",
    danger: "text-red-600 dark:text-red-500",
    success: "text-green-950 dark:text-green-50",
    warning: "text-orange-950 dark:text-orange-50",
  };

  const className = `
  ${classVariant[variant || "body"]} 
  ${classColor[color || "primary"]} 
  `;

  return <p className={className}>{children}</p>;
};

export default Typography;
