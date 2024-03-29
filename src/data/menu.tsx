"use client";
import {
  AiOutlineExperiment,
  AiOutlineHome,
  AiOutlineMenu,
} from "react-icons/ai";
import {
  MdOutlineCardMembership,
  MdOutlineFeedback,
  MdOutlineImageSearch,
  MdOutlineQrCode2,
} from "react-icons/md";
import { BiCube, BiStore } from "react-icons/bi";
import { TbTools } from "react-icons/tb";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbAugmentedReality2 } from "react-icons/tb";

export const menuItems = [
  {
    label: "Beranda",
    icon: <AiOutlineHome />,
    href: "/dashboard",
  },
  {
    label: "Barang",
    icon: <BiCube />,
    href: "/dashboard/barang",
  },
  {
    label: "Visualisasi",
    icon: <TbAugmentedReality2 />,
    href: "/dashboard/visualisasi",
  },
  {
    label: "Pencarian Gambar",
    icon: <MdOutlineImageSearch />,
    href: "/dashboard/search-image",
  },
  {
    label: "Toko Online",
    icon: <BiStore />,
    href: "/dashboard/webstore",
  },
  {
    label: "QR Code",
    icon: <MdOutlineQrCode2 />,
    href: "/dashboard/qr-code",
  },
  {
    label: "Langganan",
    icon: <MdOutlineCardMembership />,
    href: "/dashboard/membership",
  },
  {
    label: "Alat",
    icon: <TbTools />,
    href: "/dashboard/tools",
  },
  {
    label: "Eksperimen",
    icon: <AiOutlineExperiment />,
    href: "/dashboard/experiment",
  },
];

export const menuItemsPageMobile = [
  {
    label: "Beranda",
    icon: <AiOutlineHome />,
    href: "/dashboard",
  },
  {
    label: "Barang",
    icon: <BiCube />,
    href: "/dashboard/barang",
  },
  {
    label: "Visualisasi",
    icon: <TbAugmentedReality2 />,
    href: "/dashboard/visualisasi",
  },
  {
    label: "Pencarian Gambar",
    icon: <MdOutlineImageSearch />,
    href: "/dashboard/search-image",
  },
  {
    label: "Toko Online",
    icon: <BiStore />,
    href: "/dashboard/webstore",
  },
  {
    label: "QR Code",
    icon: <MdOutlineQrCode2 />,
    href: "/dashboard/qr-code",
  },
  {
    label: "Langganan",
    icon: <MdOutlineCardMembership />,
    href: "/dashboard/membership",
  },
  {
    label: "Alat",
    icon: <TbTools />,
    href: "/dashboard/tools",
  },
  {
    label: "Eksperimen",
    icon: <AiOutlineExperiment />,
    href: "/dashboard/experiment",
  },
  {
    label: "Kritik & Saran",
    icon: <MdOutlineFeedback />,
    href: "/dashboard/feedback",
  },
  {
    label: "Akun",
    icon: <RiAccountCircleLine />,
    href: "/dashboard/account",
  },
];

export const menuItemsMobile = [
  {
    label: "Beranda",
    icon: <AiOutlineHome />,
    href: "/dashboard",
  },
  {
    label: "Pencarian Gambar",
    icon: <MdOutlineImageSearch />,
    href: "/dashboard/search-image",
  },
  {
    label: "Barang",
    icon: <BiCube />,
    href: "/dashboard/barang",
  },
  {
    label: "Visualisasi",
    icon: <TbAugmentedReality2 />,
    href: "/dashboard/visualisasi",
  },
  {
    label: "Menu",
    icon: <AiOutlineMenu />,
    href: "/dashboard/menu",
  },
];

export const personalMenu = [
  {
    label: "Kritik & Saran",
    icon: <MdOutlineFeedback />,
    href: "/dashboard/feedback",
  },
  {
    label: "Akun",
    icon: <RiAccountCircleLine />,
    href: "/dashboard/account",
  },
];
