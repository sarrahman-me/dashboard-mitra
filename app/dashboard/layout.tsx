"use client";
import { TextFooter } from "@/components/molecules";
import { BottomBar, AppBar } from "@/layouts";
import { Sidebar } from "@/src/components";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expand, setExpand] = useState(true);

  const widthContentClass = expand ? "sm:ml-64" : "sm:ml-16";

  return (
    <div>
      <Sidebar expand={expand} setExpand={setExpand} />
      <div className={widthContentClass}>
        <AppBar />
        <div className="p-2 md:p-4">{children}</div>
        <TextFooter />
        <BottomBar />
      </div>
    </div>
  );
}
