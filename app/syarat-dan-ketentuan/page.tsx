import Image from "next/image";
import signature from "@/public/signature.png";
import { Footer, NavBar } from "@/src/components";
import { mainPages } from "@/src/data/pages";
import mixpanel from "@/config/mixpanel";

export default function SyaratKetentuan() {
  mixpanel.track("Page viewed", {
    Page: "Syarat dan Ketentuan",
  });

  return (
    <>
      <NavBar pages={mainPages} />
      <div className="container mx-auto max-w-screen-md p-8">
        <div className="divide-y-8 divide-transparent">
          <h1 className="text-2xl font-semibold">Syarat dan Ketentuan</h1>
          <p className="text-gray-800 dark:text-slate-50">
            Dengan mengakses dan menggunakan layanan kami, Anda dianggap
            menerima dan menyetujui syarat dan ketentuan berikut. Mohon untuk
            tidak melanjutkan penggunaan situs ini jika Anda tidak menyetujui
            syarat dan ketentuan ini.
          </p>

          <h2 className="text-xl font-medium mt-4">1. Definisi</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Terminologi berikut ini berlaku untuk Syarat dan Ketentuan ini:
          </p>
          <ul className="list-disc pl-6">
            <li className="text-gray-800 dark:text-slate-50">
              &quot;Klien&quot;, &quot;Anda&quot;, dan &quot;Milik Anda&quot;
              mengacu pada Anda, pengguna situs web ini, yang tunduk pada syarat
              dan ketentuan Perusahaan.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              &quot;Perusahaan&quot;, &quot;Kami Sendiri&quot;,
              &quot;Kami&quot;, &quot;Milik Kami&quot; dan &quot;Kita&quot;,
              mengacu pada Perusahaan kami.
            </li>
            <li className="text-gray-800 dark:text-slate-50">
              &quot;Pihak&quot;, &quot;Para Pihak&quot;, atau &quot;Kami&quot;,
              mengacu pada Klien dan perusahaan kami.
            </li>
          </ul>

          <h2 className="text-xl font-medium mt-4">2. Penggunaan Cookie</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kami menggunakan cookie. Dengan mengakses situs TokoKeramik.com,
            Anda setuju untuk menggunakan cookie sesuai dengan Kebijakan Privasi
            TokoKeramik.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Sebagian besar situs web interaktif menggunakan cookie untuk
            mengumpulkan detail pengguna untuk setiap kunjungan. Cookies
            digunakan oleh situs web kami untuk mengaktifkan fungsionalitas area
            tertentu guna memudahkan pengguna dalam mengakses situs web kami.
            Mitra afiliasi/iklan kami juga mungkin menggunakan cookie.
          </p>

          <h2 className="text-xl font-medium mt-4">3. Lisensi</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kecuali dinyatakan lain, TokoKeramik.com dan/atau pemegang
            lisensinya memiliki hak kekayaan intelektual atas semua materi di
            situs ini. Semua hak kekayaan intelektual dilindungi undang-undang.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Anda diberikan izin untuk mengakses materi ini dari TokoKeramik.com
            untuk penggunaan pribadi Anda dengan batasan yang diatur dalam
            syarat dan ketentuan ini. Anda tidak diperkenankan untuk
            mempublikasikan ulang, menjual, menyewakan, atau mensublisensikan
            materi dari TokoKeramik.com.
          </p>

          <h2 className="text-xl font-medium mt-4">4. Komentar</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Bagian dari situs web ini memberikan kesempatan bagi pengguna untuk
            memposting dan bertukar pendapat dan informasi. TokoKeramik.com
            tidak memfilter, mengedit, atau mempublikasikan komentar sebelum
            kehadirannya di situs web.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            Komentar tidak mencerminkan pandangan dan pendapat TokoKeramik.com,
            agen, dan/atau afiliasinya. Komentar mencerminkan pandangan dan
            pendapat orang yang memposting pandangan dan pendapatnya.
          </p>
          <p className="text-gray-800 dark:text-slate-50">
            TokoKeramik.com berhak memantau semua komentar dan menghapus
            komentar apa pun yang dianggap tidak pantas, menyinggung, atau
            melanggar syarat dan ketentuan ini.
          </p>

          <h2 className="text-xl font-medium mt-4">5. Hak dan Lisensi</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Dengan memposting komentar di situs ini, Anda menjamin dan
            menyatakan bahwa Anda berhak memposting komentar tersebut dan
            memiliki semua lisensi dan persetujuan yang diperlukan untuk
            melakukannya.
          </p>

          <h2 className="text-xl font-medium mt-4">6. Penghapusan Tautan</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Jika Anda menemukan tautan apa pun di TokoKeramik.com yang
            menyinggung atau bermasalah, Anda dapat menghubungi kami dan memberi
            tahu kami kapan saja. Kami akan mempertimbangkan permintaan Anda
            untuk menghapus tautan tersebut, namun kami tidak berkewajiban untuk
            menanggapi Anda secara langsung.
          </p>

          <h2 className="text-xl font-medium mt-4">
            7. Perubahan Kebijakan Privasi
          </h2>
          <p className="text-gray-800 dark:text-slate-50">
            Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu.
            Perubahan akan diberitahukan kepada Anda melalui layanan kami atau
            melalui email. Pastikan untuk memeriksa kebijakan ini secara berkala
            untuk tetap memahami bagaimana data Anda dielola.
          </p>

          <h2 className="text-xl font-medium mt-4">8. Hubungi Kami</h2>
          <p className="text-gray-800 dark:text-slate-50">
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan
            Privasi kami atau penggunaan data Anda, jangan ragu untuk
            menghubungi kami melalui alamat email yang tertera di halaman
            kontak.
          </p>

          <div className="flex justify-end mt-5">
            <div className="divide-y-8 divide-transparent">
              <p className="text-gray-800 dark:text-slate-50">
                Terima kasih atas kepercayaan Anda kepada TokoKeramik.com
              </p>
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
