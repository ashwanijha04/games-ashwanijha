import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.parentSiteUrl }],
  creator: siteConfig.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.shortName,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <nav
          className="fixed top-0 left-0 right-0 z-100 px-6 md:px-8 border-b"
          style={{
            background: "rgba(10, 10, 11, 0.78)",
            borderColor: "var(--color-border)",
            backdropFilter: "saturate(180%) blur(8px)",
            WebkitBackdropFilter: "saturate(180%) blur(8px)",
          }}
        >
          <div className="max-w-[1080px] mx-auto flex items-center justify-between h-[56px]">
            <Link
              href={siteConfig.parentSiteUrl}
              className="text-[0.86rem] font-mono no-underline transition-colors"
              style={{ color: "var(--color-text-dim)" }}
            >
              ← ashwanijha.dev
            </Link>
            <span
              className="text-[0.86rem] font-mono"
              style={{ color: "var(--color-text-mute)" }}
            >
              {siteConfig.shortName}
            </span>
          </div>
        </nav>
        <main>{children}</main>
        <footer
          className="px-6 py-10 md:py-12 mt-8 border-t"
          style={{
            color: "var(--color-text-mute)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="max-w-[1080px] mx-auto text-[0.82rem]">
            <p>© 2026 {siteConfig.author} · Dubai, UAE</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
