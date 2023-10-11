"use client";
import { Provider } from "react-redux";
import "./globals.css";
import store from "@/redux/store";
import { GoogleAnalytics } from "@/functions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <GoogleAnalytics GA_TRACKING_ID="G-DFLVLS41N0" />
      <body id="root">
        <div className="bg-slate-50 dark:bg-slate-900 dark:text-white text-black min-h-screen">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
