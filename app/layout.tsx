"use client";
import "./globals.css";
import store from "@/src/redux/store";
import { Provider } from "react-redux";
import { GoogleAnalytics, GoogleTagManager } from "@/src/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <GoogleTagManager />
        <title>
          Tokokeramik.com - platform untuk penjual material bangunan
        </title>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body id="root">
        {/* tag manager */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZF33TFW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GoogleAnalytics />
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-black min-h-screen">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
