"use client";
import Head from "next/head";
import { Benefits, Cta, Jumbotron } from "@/layouts";
import { SectionTitle } from "@/components/molecules";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { MdOutlineInsights } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";
import { Footer, NavBar } from "@/src/components/organisms";
import { mainPages } from "@/src/data/pages";

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
      <Head>
        <title>Toko Keramik - Jual Keramik tak pernah semudah ini</title>
        <meta name="description" content="Jual keramik dari mana saja" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
