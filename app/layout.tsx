"use client";
import { Provider } from "react-redux";
import "./globals.css";
import { Inter } from "next/font/google";
import store from "@/redux/store";

// const inter = Inter({ subsets: ["latin"] });

// // Menyimpan metadata website seperti judul dan deskripsi yang akan digunakan untuk SEO dan social sharing.
// export const metadata = {
//   title: "TokoKeramik.com",
//   description: "Platform pendukung ritel keramik",
// };

// Mendefinisikan fungsi RootLayout yang akan digunakan sebagai layout utama aplikasi.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* Bagian utama dari layout, berisi children yang merupakan konten utama dari aplikasi, dan className inter.className yang digunakan untuk menambahkan font Inter ke dalam aplikasi. */}
      {/* <body id="root" className={inter.className}> */}
      <body id="root">
        <div className="bg-slate-50 dark:bg-slate-900 dark:text-white text-black min-h-screen">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
