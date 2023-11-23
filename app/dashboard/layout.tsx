"use client";
import { AppBar, FooterText, Sidebar } from "@/src/components";
import { RoomvoVisualize } from "@/src/utils";
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
        <FooterText />
      </div>
      <RoomvoVisualize />
    </div>
  );
}
