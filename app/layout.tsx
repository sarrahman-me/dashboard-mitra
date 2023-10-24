"use client";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import store from "@/src/redux/store";
import { Provider } from "react-redux";
import { GoogleAnalytics } from "@/src/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body id="root">
        <GoogleAnalytics />
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-black min-h-screen">
          <Provider store={store}>{children}</Provider>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
