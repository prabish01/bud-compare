import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteData } from "@/lib/siteData";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: { default: siteData.name, template: `%s | ${siteData.name}` },
  description: siteData.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
