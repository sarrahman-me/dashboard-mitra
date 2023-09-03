import { TextFooter } from "@/components/molecules";
import {  BottomBar, AppBar, Sidebar } from "@/layouts";

export const metadata = {
  title: "Dashboard - sarrahman bangunan",
  description: "Sarrahman bangunan",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <div className="sm:ml-64">
        <AppBar />
        <div className="p-4 min-h-screen">{children}</div>
        <TextFooter />
        <BottomBar />
      </div>
    </div>
  );
}
