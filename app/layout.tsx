"use client";
import "./globals.css";
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
        <GoogleAnalytics
          GA_TRACKING_ID={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYSTIC_ID}`}
        />
        <div className="bg-slate-50 dark:bg-slate-900 dark:text-white text-black min-h-screen">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
