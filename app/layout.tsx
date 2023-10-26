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
      <head>
        <title>
          Tokokeramik.com - platform untuk penjual material bangunan
        </title>
        <link rel="manifest" href="/manifest.json" />
      </head>
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
