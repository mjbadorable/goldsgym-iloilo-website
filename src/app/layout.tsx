import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { DayPassProvider } from "@/components/day-pass/day-pass-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { OG_IMAGE, SHARE_DESCRIPTION, SHARE_TITLE } from "@/lib/page-metadata";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | Fitness Gym in Iloilo City, Iloilo Business Park`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "gym in Iloilo",
    "fitness gym in Iloilo",
    "Gold's Gym Iloilo",
    "Iloilo Business Park gym",
    "Mandurriao gym",
    "personal trainer Iloilo",
    "Gym80 Iloilo",
  ],
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_PH",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  // No `icons` here: src/app/icon.png (64px) and apple-icon.png (180px) are picked up by file convention.
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebas.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        <noscript>
          <style>{".scroll-reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <DayPassProvider>
          <div className="stack-underlay flex min-h-svh flex-col">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-gold focus:px-4 focus:py-3 focus:font-label focus:text-[1.25rem] focus:text-gold-ink"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </DayPassProvider>
      </body>
    </html>
  );
}
