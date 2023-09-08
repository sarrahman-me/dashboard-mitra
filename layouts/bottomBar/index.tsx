"use client";
import { useRouter } from "next/navigation";
import { FaCube, FaStoreAlt } from "react-icons/fa";
import { MdCardMembership, MdDashboard } from "react-icons/md";

const menuItems = [
  {
    label: "Dashboard",
    icon: (
      <MdDashboard className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400" />
    ),
    href: "/dashboard",
  },
  {
    label: "Barang",
    icon: <FaCube className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400" />,
    href: "/dashboard/barang",
  },
  {
    label: "Membership",
    icon: (
      <MdCardMembership className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400" />
    ),
    href: "/dashboard/membership",
  },
  {
    label: "Webstore",
    icon: (
      <FaStoreAlt className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400" />
    ),
    href: "/dashboard/webstore",
  },
];

export default function BottomBar() {
  const router = useRouter();

  return (
    <div className="select-none sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {menuItems.map((item) => (
          <div
            className="inline-flex flex-col items-center justify-center px-5 group"
            key={item.label}
            onClick={() => router.push(item.href)}
          >
            <button
              className="inline-flex flex-col items-center justify-center px-5 group"
              type="button"
            >
              {item.icon}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
