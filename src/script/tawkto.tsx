"use client";
import Script from "next/script";

const Tawkto = () => {
  return (
    <>
      <Script id="tawk-to" strategy="afterInteractive" type="text/javascript">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/65b77ad20ff6374032c60832/1hlabfid6';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();`}
      </Script>
    </>
  );
};

export default Tawkto;
