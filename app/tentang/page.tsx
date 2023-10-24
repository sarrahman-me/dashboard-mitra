import Image from "next/image";
import signature from "@/public/signature.png";
import { Footer, NavBar } from "@/src/components";
import { mainPages } from "@/src/data/pages";

export default function Tentang() {
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
            secara online. Di sini, kami ingin memberikan Anda gambaran tentang
            siapa kami dan apa yang kami perjuangkan.
          </p>
          <h2 className="text-xl font-medium mt-4">Latar Belakang Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami, para pendiri tokokeramik.com, mengawali perjalanan kami dalam
            dunia keramik dari berbagai latar belakang yang berbeda, membawa
            pengalaman dan pengetahuan yang berharga dalam industri ini.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Saya, Rahman, saya adalah pendiri tokokeramik.com. Sebelumnya, saya
            memiliki pengalaman yang kuat di bidang penjualan, pemasaran produk
            keramik dan supervisor operasional selama beberapa tahun di beberapa
            perusahaan.
          </p>
          <h2 className="text-xl font-medium mt-4">Visi Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami percaya bahwa bisnis keramik memiliki potensi besar, dan inilah
            mengapa kami menciptakan tokokeramik.com. Visi kami adalah untuk
            menjadikan tokokeramik.com sebagai solusi lengkap bagi mereka yang
            ingin menjalankan bisnis keramik secara efisien dan sukses.
          </p>
          <h2 className="text-xl font-medium mt-4">Layanan Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Hingga saat ini, aplikasi tokokeramik.com hanya tersedia untuk
            wilayah Kota Samarinda - Kalimantan Timur, dan sekitarnya. Namun,
            kami berkomitmen untuk terus berkembang dan menjelajahi berbagai
            wilayah di Indonesia. Kami ingin memastikan bahwa semua orang, di
            mana pun mereka berada, memiliki akses ke alat dan informasi yang
            mereka butuhkan untuk meraih keberhasilan dalam bisnis keramik.
          </p>
          <h2 className="text-xl font-medium mt-4">Misi Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Misi kami adalah menyediakan platform yang memudahkan Anda dalam
            memulai dan mengembangkan bisnis keramik Anda. Kami ingin membantu
            Anda membangun toko online yang dirancang khusus, menjelajahi produk
            keramik dari berbagai pilihan suplier terdekat, dan memberikan
            wawasan berharga tentang aktivitas pelanggan Anda.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Kami berkomitmen untuk memberikan dukungan dan solusi yang Anda
            butuhkan untuk meraih kesuksesan dalam bisnis keramik Anda.
            Bersama-sama, kita akan menciptakan masa depan yang lebih cerah bagi
            industri keramik di Indonesia.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Terima kasih telah memilih tokokeramik.com sebagai mitra bisnis
            Anda. Kami berharap dapat terus melayani Anda dan membantu Anda
            mencapai impian bisnis keramik Anda. Jika Anda memiliki pertanyaan
            atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi
            kami. Kami selalu siap membantu Anda.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Terima kasih atas dukungan Anda!
          </p>
          <div className="flex justify-end mt-5">
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
