import Image from "next/image";
import signature from "@/public/signature.png";
import { Footer, NavBar } from "@/src/components";
import { mainPages } from "@/src/data/pages";
import mixpanel from "@/config/mixpanel";

export default function Tentang() {
  mixpanel.track("Page viewed", {
    Page: "Tentang",
  });

  return (
    <>
      <NavBar pages={mainPages} />
      <div className="container mx-auto max-w-screen-md p-8">
        <div className="divide-y-8 divide-transparent">
          <h1 className="text-2xl font-semibold">
            Tentang Kami - tokokeramik.com
          </h1>
          <p className="text-gray-800 dark:text-slate-50">
            Selamat datang di tokokeramik.com! Kami adalah platform yang
            didedikasikan untuk mengubah cara Anda menjalankan bisnis keramik
            secara online. Kami ingin memberikan Anda gambaran tentang siapa
            kami dan apa yang kami perjuangkan.
          </p>

          <h2 className="text-xl font-medium mt-8">Latar Belakang Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami, para pendiri tokokeramik.com, memulai perjalanan kami dalam
            dunia keramik dari latar belakang yang berbeda, menghadirkan
            pengalaman dan pengetahuan berharga dalam industri ini.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Nama saya Rahman, saya adalah pembuat aplikasi tokokeramik.com.
            Pengalaman di bidang penjualan, pemasaran produk keramik, dan
            supervisor operasional di perusahaan bahan bangunan. pengalaman itu
            menuntun saya melangkah dalam memberikan solusi yang baik untuk
            semua mitra dan saya juga memiliki kemampuan yang sangat kuat dalam
            merancang keseluruhan aplikasi seorang diri membuat saya memahami
            apa yang saya perjuangkan.
          </p>

          <h2 className="text-xl font-medium mt-8">Visi & Misi Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami percaya bisnis keramik memiliki potensi besar, dan kami
            menciptakan tokokeramik.com untuk menjadi solusi lengkap bagi bisnis
            keramik dengan efisiensi dan kesuksesan. Misi kami adalah
            menyediakan platform yang memudahkan memulai dan mengembangkan
            bisnis keramik, menjelajahi produk dari berbagai pilihan supplier
            terdekat, dan memberikan wawasan berharga tentang aktivitas
            pelanggan.
          </p>

          <h2 className="text-xl font-medium mt-8">Layanan Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Aplikasi tokokeramik.com saat ini hanya tersedia untuk wilayah
            Kalimantan Timur, namun kami bertekad untuk berkembang dan
            menjangkau seluruh Indonesia. Tujuan kami adalah memastikan setiap
            orang, di manapun berada, memiliki akses ke alat dan informasi untuk
            meraih kesuksesan dalam bisnis keramik.
          </p>

          <h2 className="text-xl font-medium mt-8">
            Keunggulan & Dampak Positif
          </h2>
          <p className="text-gray-800 dark:text-slate-50">
            Tokokeramik.com menjadi inovator pertama di Kalimantan Timur, dengan
            fokus pengembangan produk dan layanan yang memberikan solusi terbaik
            kepada pelanggan. Penggunaan aplikasi memberikan kemudahan akses
            informasi dan dukungan penuh dalam mengembangkan toko keramik.
          </p>

          <p className="text-gray-800 dark:text-slate-50">
            Kami berkomitmen memberikan dukungan dan solusi bagi kesuksesan
            bisnis keramik Anda, dan bersama-sama menciptakan masa depan lebih
            cerah bagi industri keramik di Indonesia.
          </p>

          <p className="text-gray-800 dark:text-slate-50">
            Terima kasih telah memilih tokokeramik.com sebagai mitra bisnis
            Anda. Kami berharap dapat terus melayani dan membantu Anda mencapai
            impian bisnis keramik. Jika ada pertanyaan atau butuh bantuan lebih
            lanjut, jangan ragu untuk menghubungi kami. Kami siap membantu Anda.
          </p>

          <p className="text-gray-800 dark:text-slate-50">
            Terima kasih atas dukungan Anda!
          </p>

          <div className="flex justify-end mt-8">
            <div className="divide-y-8 divide-transparent">
              <p className="text-gray-800 dark:text-slate-50">Salam hangat,</p>
              <Image src={signature} alt="Signature" width={100} height={75} />
              <p className="text-gray-800 dark:text-slate-50">
                Muhammad Nur Rahman
              </p>
              <p className="text-gray-800 dark:text-slate-50">
                Pendiri tokokeramik.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
