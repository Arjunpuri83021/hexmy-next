"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TelegramPopup from "./TelegramPopup";
import TabBar from "./TabBar";
import { useState, useEffect } from "react";

export default function AppFrame({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isReelsPage = pathname?.startsWith("/reels");
  const isOwnSitePage = pathname?.startsWith("/get-your-own-site");
  const isHomePage = pathname === "/";
  const [showAds, setShowAds] = useState(false);

  // Step 1: Start 60-second timer on mount
  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAds(true);
    }, 60000); // 1 minute = 60,000ms

    return () => clearTimeout(adTimer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Load Bootstrap CSS only for admin */}
      {isAdmin && (
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
      )}
      {!isAdmin && !isReelsPage && <Navbar />}
      {!isAdmin && (isHomePage || isReelsPage) && <TabBar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && !isReelsPage && <Footer />}
      
      {/* Telegram popup - only on non-admin pages */}
      {!isAdmin && <TelegramPopup />}

      {/* Global scripts only for public site, not for admin */}
      {/* Step 2: Only show ads after 1 minute delay */}
      {!isAdmin && !isReelsPage && !isOwnSitePage && showAds && (
        <>
          <Script src="//pl23903697.revenuecpmgate.com/5f/0a/3d/5f0a3dbfe0494732a6f51e9f464470b1.js" strategy="afterInteractive" />
          <Script src="//pl23903471.revenuecpmgate.com/26/ce/da/26ceda18834199e5759604d14f16cf08.js" strategy="afterInteractive" />
          <Script id="ad-snrxhp" strategy="afterInteractive">{`
            (function(snrxhp){
              var d = document,
                  s = d.createElement('script'),
                  l = d.scripts[d.scripts.length - 1];
              s.settings = snrxhp || {};
              s.src = "//greatcomfortable.com/c.D/9J6GbH2L5mlWS/WpQr9yN/T-QM4/MAD-gl0/M/iA0k1WNyDEg_wdOkDRQvzB";
              s.async = true;
              s.referrerPolicy = 'no-referrer-when-downgrade';
              l.parentNode.insertBefore(s, l);
            })({});
          `}</Script>
          <Script id="ad-fajt" strategy="afterInteractive">{`
            (function(fajt){
              var d = document,
                  s = d.createElement('script'),
                  l = d.scripts[d.scripts.length - 1];
              s.settings = fajt || {};
              s.src = "//greatcomfortable.com/c/Dx9.6WbE2r5vl/SmWfQR9SNKT/Q/3AM_z/Qh0JMOC/0/1TNEDucvzlN/D/Qwxn";
              s.async = true;
              s.referrerPolicy = 'no-referrer-when-downgrade';
              l.parentNode.insertBefore(s, l);
            })({});
          `}</Script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Hexmy",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://hexmy.com",
                description:
                  "Premium adult entertainment videos featuring top stars and categories",
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hexmy.com"}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />
        </>
      )}
    </div>
  );
}
