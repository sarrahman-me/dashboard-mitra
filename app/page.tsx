import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { LuPackageSearch } from "react-icons/lu";
import { MdOutlineInsights } from "react-icons/md";
import {
  Benefits,
  Cta,
  Footer,
  Jumbotron,
  NavBar,
  SectionTitle,
} from "@/src/components";
import { mainPages } from "@/src/data/pages";

export const metadata = {
  title: "Toko Keramik - Jual Keramik tak pernah semudah ini",
  description: "Jual keramik dari mana saja",
};

const benefitOne = {
  title: "Sorotan manfaat",
  desc: "Kamu juga akan mendapatkan analisa dari tren produk dan perilaku customer yang mengunjungi toko online mu",
  image:
    "https://ik.imagekit.io/sarrahmanme/default-image.jpg?updatedAt=1690537071869",
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
      <Cta />

      <Footer />
    </>
  );
}
