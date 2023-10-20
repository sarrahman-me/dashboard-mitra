"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface ItemSidebarProps {
  label: string;
  icon: any;
  expand: boolean;
  href: string;
}

const ItemSidebar = ({ label, icon, href, expand }: ItemSidebarProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const active =
    href !== "/dashboard"
      ? pathName === href || pathName.includes(href)
      : pathName === href;

  const colorClass = active
    ? "bg-indigo-600 dark:bg-gray-700 text-white"
    : "hover:bg-indigo-50 dark:hover:bg-gray-700";

  const colorIcon = active ? "text-white" : "text-gray-600 dark:text-gray-200";

  return (
    <div
      title={label}
      onClick={() => router.push(href)}
      className={`flex w-full my-3 p-3 cursor-pointer rounded-md items-center ${colorClass}`}
    >
      <div className={`text-xl ${colorIcon}`}>{icon}</div>
      {expand && <p className="font-medium ml-3">{label}</p>}
    </div>
  );
};

export default ItemSidebar;
