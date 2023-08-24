import { TextFooter } from "@/layouts/components/molecules";
import { Sidebar, BottomBar, AppBar } from "@/layouts/components/organisms";

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
