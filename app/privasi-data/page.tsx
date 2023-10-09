import { Footer, NavigationBar } from "@/layouts";
import Head from "next/head";
import Image from "next/image";
import signature from "@/public/signature.png";

export default function KebijakanPrivasi() {
  return (
    <>
      <Head>
        <title>Kebijakan Privasi - TokoKeramik.com</title>
        <meta name="description" content="Privasi pengguna TokoKeramik.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <div className="container mx-auto max-w-screen-md p-8">
        <div className="divide-y-8 divide-transparent">
          <h1 className="text-2xl font-semibold">Kebijakan Privasi</h1>
          <p className="text-gray-800 dark:text-slate-50">
            Dengan menggunakan layanan kami, Anda mempercayakan informasi Anda
            kepada kami. Kami paham bahwa melindungi informasi Anda dan
            memberikan kontrol kepada Anda adalah tanggung jawab yang besar dan
            memerlukan kerja keras.
          </p>
          <h2 className="text-xl font-medium mt-4">
            Jenis Informasi yang Kami Kumpulkan
          </h2>
          <p className="text-gray-800 dark:text-slate-50">
            Ketika Anda menggunakan layanan kami, kami dapat mengumpulkan dan
            memproses informasi berikut:
          </p>
          <ul className="list-disc pl-6">
            <li className="text-gray-800 dark:text-slate-50">
              Informasi Pendaftaran: Untuk mendaftar dan menggunakan layanan
              kami, kami mungkin meminta Anda untuk memberikan informasi seperti
              nama, alamat email, dan nomor telepon. Catatan penting, kami akan
              melakukan enkripsi pada kata sandi Anda untuk menjaga keamanannya.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Informasi Penggunaan: Kami mengumpulkan informasi tentang
              interaksi Anda dengan aplikasi kami, termasuk aktivitas sistem,
              alamat IP, laporan kerusakan, serta waktu, tanggal, dan URL
              permintaan Anda.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Aktivitas Anda: Kami mengumpulkan informasi tentang aktivitas Anda
              di layanan kami, seperti istilah pencarian produk, interaksi
              terhadap produk (misalnya, klik dan suka), dan preferensi
              pengguna.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Informasi Lokasi: Kami memerlukan informasi lokasi yang akurat
              untuk menghubungkan Anda dengan pilihan suplier terdekat.
              Informasi lokasi dapat ditentukan menggunakan data kota dan alamat
              yang Anda masukkan di profil Anda atau alamat IP perangkat Anda.
            </li>
          </ul>
          <h2 className="text-xl font-medium mt-4">
            Bagaimana Kami Menggunakan Informasi Anda
          </h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami menggunakan informasi yang kami kumpulkan untuk:
          </p>
          <ul className="list-disc pl-6">
            <li className="text-gray-800 dark:text-slate-50">
              Memberikan layanan yang lebih baik kepada Anda, termasuk
              merekomendasikan produk dan layanan yang sesuai dengan minat Anda.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Menyesuaikan layanan kami untuk Anda.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Menghubungkan Anda dengan suplier di sekitar Anda.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Berinteraksi dengan Anda melalui email atau notifikasi untuk
              memberi tahu Anda tentang pembaruan atau perubahan penting dalam
              layanan kami.
            </li>
          </ul>
          <h2 className="text-xl font-medium mt-4">Keamanan Data</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami memahami pentingnya keamanan data Anda. Oleh karena itu, kami
            menjalankan praktik keamanan yang sesuai untuk melindungi data Anda
            dari akses yang tidak sah, perubahan, pengungkapan, atau
            penghancuran yang tidak sah.
          </p>
          <h2 className="text-xl font-medium mt-4">Berbagi Informasi</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami tidak akan membagikan informasi yang mengidentifikasi Anda
            secara pribadi kepada siapapun kecuali jika diperlukan untuk
            menjalankan layanan kami. Ini termasuk menghubungkan Anda dengan
            suplier terdekat. Kami tidak akan menjual atau menyewakan data Anda
            kepada pihak ketiga.
          </p>
          <h2 className="text-xl font-medium mt-4">Kontrol atas Data Anda</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami menghormati hak Anda untuk mengontrol data Anda. Anda memiliki
            hak untuk:
          </p>
          <ul className="list-disc pl-6">
            <li className="text-gray-800 dark:text-slate-50">
              Mengakses informasi yang kami miliki tentang Anda.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Memperbarui atau memperbaiki informasi yang tidak akurat atau
              tidak lengkap.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Meminta penghapusan data Anda.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              Meminta kami untuk menghentikan penggunaan data Anda untuk tujuan
              tertentu.
            </li>
          </ul>
          <h2 className="text-xl font-medium mt-4">
            Perubahan Kebijakan Privasi
          </h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu.
            Perubahan akan diberitahukan kepada Anda melalui layanan kami atau
            melalui email. Pastikan untuk memeriksa kebijakan ini secara berkala
            untuk tetap memahami bagaimana data Anda dielola.
          </p>
          <h2 className="text-xl font-medium mt-4">Hubungi Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan
            Privasi kami atau penggunaan data Anda, jangan ragu untuk
            menghubungi kami melalui alamat email sarrahman.me@gmail.com.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Terima kasih atas kepercayaan Anda kepada TokoKeramik.com. Kami
            berharap Anda menikmati pengalaman Anda menggunakan layanan kami!
          </p>
          <div className="flex justify-end mt-5">
            <div className="divide-y-8 divide-transparent">
              <p className="text-gray-800 dark:text-slate-50">Salam hangat,</p>
              <Image src={signature} alt="Signature" width={100} height={75} />
              <p className="text-gray-800 dark:text-slate-50">
                Muhammad Nur Rahman
              </p>
              <p className="text-gray-800 dark:text-slate-50">
                Pendiri TokoKeramik.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
