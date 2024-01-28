import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { LuPackageSearch } from "react-icons/lu";
import { MdOutlineInsights } from "react-icons/md";
import { FaUncharted } from "react-icons/fa6";
import {
  Benefits,
  Cta,
  Footer,
  Jumbotron,
  NavBar,
  SectionTitle,
} from "@/src/components";
import { mainPages } from "@/src/data/pages";
import { TiTick } from "react-icons/ti";
import { TbAugmentedReality } from "react-icons/tb";

export const metadata = {
  title: "Toko Keramik - Jual Keramik tak pernah semudah ini",
  description: "Jual keramik dari mana saja",
};

const benefitOne = {
  title: "Webstore",
  desc: "Kamu juga akan mendapatkan analisa dari tren produk dan perilaku customer yang mengunjungi toko online mu",
  image:
    "https://ik.imagekit.io/sarrahmanme/Screenshot%202023-12-25%20at%2013.02.30.png?updatedAt=1703480628075",
  bullets: [
    {
      title: "Buat toko online mu sendiri",
      desc: "Kamu dapat membuat toko online yang dirancang khusus dengan berbagai fitur untuk menjual keramik",
      icon: <BsGlobeEuropeAfrica />,
    },
    {
      title: "Temukan keramik dari suplier di sekitarmu",
      desc: "Kamu dapat mencari berbagai keramik keinginan customermu dari berbagai suplier di sekitarmu",
      icon: <LuPackageSearch />,
    },
    {
      title: "Dapatkan wawasan dari aktifitas customer",
      desc: "Kamu dapat melihat keramik yang paling sering dicari dan mana dari barang mu yang paling populer",
      icon: <MdOutlineInsights />,
    },
  ],
};

const benefitVisualisasi = {
  title: "Visualisasi",
  desc: "imajinasi tanpa batas untuk penjualan yang lebih profesional",
  image:
    "https://ik.imagekit.io/sarrahmanme/Screenshot%202023-12-25%20at%2013.10.40.png?updatedAt=1703481063496",
  bullets: [
    {
      title: "visualisasi keramik",
      desc: "kamu dapat memvisualkan keramik diruangan pelanggan anda",
      icon: <TbAugmentedReality />,
    },
    {
      title: "imajinasi tak terbatas",
      desc: "tidak hanya memvisualkan lantai tetapi keseluruhan ruangan termasuk keramik dinding dan lantai sekaligus",
      icon: <FaUncharted />,
    },
    {
      title: "produk tersedia",
      desc: "produk yang sudah kamu visualisasikan dapat kamu pesan dari suplier terdekat",
      icon: <TiTick />,
    },
  ],
};

export default function RootPage() {
  return (
    <>
      <NavBar pages={mainPages} />
      <Jumbotron />
      <SectionTitle
        pretitle="Manfaat"
        title="Kenapa harus bergabung dengan tokokeramik.com ?"
      >
        Kamu akan mendapatkan dukungan dalam bisnis keramik mu untuk memulai dan
        berkembang dengan lebih mudah
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitVisualisasi} />
      <Cta />

      <Footer />
    </>
  );
}
