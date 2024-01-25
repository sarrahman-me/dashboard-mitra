"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Komponen Navlink digunakan untuk membuat tautan navigasi yang merespons pada aplikasi Next.js.
 *
 * @param {string} children - Teks yang akan ditampilkan sebagai tautan.
 * @param {string} href - Alamat URL yang akan dihubungkan oleh tautan.
 */

interface NavlinkProps {
  children: string;
  href: string;
}

const Navlink = ({ children, href }: NavlinkProps) => {
  // Mendapatkan alamat URL halaman saat ini
  const pathname = usePathname();

  // Memeriksa apakah tautan saat ini adalah halaman aktif
  const isCurrentPage =
    href !== "/"
      ? pathname === href || pathname.includes(href)
      : pathname === href;

  // Mendefinisikan kelas CSS untuk tautan berdasarkan status halaman
  const className = `hover:font-medium transition
  ${
    isCurrentPage
      ? "text-indigo-600 dark:text-indigo-300"
      : "text-gray-600 dark:text-gray-300"
  }
  `;

  if (href.includes("https")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};

export default Navlink;
