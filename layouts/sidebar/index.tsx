"use client";
import { deleteCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Confirm, Loading, Report } from "notiflix";
import {
  RiAccountBoxFill,
  RiFeedbackFill,
  RiLogoutBoxFill,
} from "react-icons/ri";
import { FaCube, FaStoreAlt } from "react-icons/fa";
import { MdCardMembership, MdDashboard } from "react-icons/md";
import { ListIcon } from "@/components/atoms";
import { DeleteDataApi, GetDataApi } from "@/utils";
import { useEffect } from "react";
import { setProfile } from "@/redux/slice/profile";

const menuItems = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    href: "/dashboard",
  },
  {
    label: "Barang",
    icon: <FaCube />,
    href: "/dashboard/barang",
  },
  {
    label: "Membership",
    icon: <MdCardMembership />,
    href: "/dashboard/membership",
  },
  {
    label: "Webstore",
    icon: <FaStoreAlt />,
    href: "/dashboard/webstore",
  },
];

const personalMenu = [
  {
    label: "Kritik & Saran",
    icon: <RiFeedbackFill />,
    href: "/dashboard/feedback",
  },
  {
    label: "Account",
    icon: <RiAccountBoxFill />,
    href: "/dashboard/account",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { profile } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const responseProfile = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
      );
      if (responseProfile.status === 401) {
        Report.warning(
          "Sesi anda berakhir",
          "Silahkan lakukan autentikasi ulang untuk tetap mengakses dashboard",
          "Okay",
          () => {
            deleteCookie("tx");
            deleteCookie("rtx");
            router.push("/login");
            window.location.reload();
          }
        );
      }
      dispatch(setProfile(responseProfile?.data));
    }
    fetchData();
  }, [dispatch, router]);

  const handleLogout = async () => {
    Loading.circle();
    Confirm.show(
      "Konfirmasi",
      "Yakin Untuk Keluar ?",
      "Keluar",
      "Batal",
      async () => {
        try {
          const responseLogout = await DeleteDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/logout`
          );
          if (responseLogout.success) {
            deleteCookie("tx");
            deleteCookie("rtx");
            router.push("/login");
            window.location.reload();
            Loading.remove();
          }
        } catch (error) {
          console.error(error);
          Loading.remove();
        }
      },
      () => {
        Loading.remove();
      },
      {
        okButtonBackground: "#FF0000",
        titleColor: "#FF0000",
      }
    );
  };

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 select-none"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="my-8">
          <div className="justify-center flex">
            <RiAccountBoxFill className="h-10 w-10 text-slate-50 bg-indigo-500 dark:bg-transparent rounded" />
          </div>
          <p className="text-xs text-center my-1">{profile.email}</p>
        </div>
        <ul className="space-y-3 mt-5 m-2 pl-3 font-medium">
          {menuItems.map((item) => (
            <ListIcon
              key={item.label}
              href={item.href}
              text={item.label}
              iconComponent={item.icon}
            />
          ))}
          <hr />
          {personalMenu.map((item) => (
            <ListIcon
              key={item.label}
              href={item.href}
              text={item.label}
              iconComponent={item.icon}
            />
          ))}
          {/* ----- item Logout ----- */}
          <li
            onClick={handleLogout}
            className={`cursor-pointer flex text-red-900 items-center p-2 rounded-lg dark:text-slate-50`}
          >
            <div
              className={`text-red-500 bg-white dark:bg-slate-800 p-2 rounded-xl`}
            >
              {<RiLogoutBoxFill />}
            </div>
            <span className="flex-1 ml-3 whitespace-nowrap text-red-950 dark:text-white">
              Keluar
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
