import Image from "next/image";
import logo from "@/public/logo.png";
import { FaTachometerAlt, FaCube, FaUsers, FaSitemap } from "react-icons/fa";
import { BsFillDatabaseFill } from "react-icons/bs";
import { DropdownList, ListIcon } from "@/layouts/components/molecules";

const menuItems = [
  {
    label: "Barang",
    icon: (
      <FaCube className="flex-shrink-0 w-5 h-5 text-amber-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-900 dark:group-hover:text-white" />
    ),
    href: "/dashboard/barang",
  },
  {
    label: "Suplier",
    icon: (
      <FaUsers className="flex-shrink-0 w-5 h-5 text-amber-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-900 dark:group-hover:text-white" />
    ),
    href: "/dashboard/suplier",
  },
  {
    label: "Mitra",
    icon: (
      <FaSitemap className="flex-shrink-0 w-5 h-5 text-amber-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-900 dark:group-hover:text-white" />
    ),
    href: "/dashboard/mitra",
  },
];

const listMenu = [
  {
    label: "Brand",
    href: "/dashboard/data/brand",
  },
  {
    label: "Kategori Barang",
    href: "/dashboard/data/kategori-barang",
  },
  {
    label: "Tekstur",
    href: "/dashboard/data/tekstur",
  },
  {
    label: "Motif",
    href: "/dashboard/data/motif",
  },
  {
    label: "Kualitas",
    href: "/dashboard/data/kualitas",
  },
  {
    label: "Ukuran",
    href: "/dashboard/data/ukuran",
  },
  {
    label: "Warna",
    href: "/dashboard/data/warna",
  },
];

export default function Sidebar() {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 select-none"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="justify-center flex">
          <Image className="h-28 w-28" src={logo} alt="logo" />
        </div>
        <ul className="space-y-2 m-2 pl-3 font-medium">
          <ListIcon
            key={"Dashboard"}
            href={"/dashboard"}
            text={"Dashboard"}
            iconComponent={
              <FaTachometerAlt className="flex-shrink-0 w-5 h-5 text-amber-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-900 dark:group-hover:text-white" />
            }
          />
          {menuItems.map((item) => (
            <ListIcon
              key={item.label}
              href={item.href}
              text={item.label}
              iconComponent={item.icon}
            />
          ))}
          <DropdownList
            iconComponent={
              <BsFillDatabaseFill className="flex-shrink-0 w-5 h-5 text-amber-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-900 dark:group-hover:text-white" />
            }
            title="Master Data"
            listMenu={listMenu}
          />
        </ul>
      </div>
    </aside>
  );
}
