import { TextFooter } from "@/components/molecules";
import { BottomBar, AppBar, Sidebar } from "@/layouts";

export const metadata = {
  title: "Dashboard - TokoKeramik.com",
  description: "Platform pendukung ritel keramik",
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
        <div className="p-2 md:p-4">{children}</div>
        <TextFooter />
        <BottomBar />
      </div>
    </div>
  );
}
