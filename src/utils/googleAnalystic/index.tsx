"use client";
import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src={"https://www.googletagmanager.com/gtag/js?id=G-8T6EQFC7FT"}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8T6EQFC7FT');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
