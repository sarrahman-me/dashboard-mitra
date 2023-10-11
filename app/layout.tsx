"use client";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { GoogleAnalytics } from "@/functions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body id="root">
        {/* <GoogleAnalytics /> */}
        <div className="bg-slate-50 dark:bg-slate-900 dark:text-white text-black min-h-screen">
          <Provider store={store}>{children}</Provider>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
