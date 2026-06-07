import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interV = localFont({
  src: [
    { path: "../../public/fonts/InterV/regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/InterV/medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const rebondGrotesque = localFont({
  src: [
    { path: "../../public/fonts/RebondGrotesque/bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-rebond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wope: The New Era of SEO Research",
  description: "Elevate your marketing strategy with Wope's AI-driven research tools. Enjoy a 14-day unlimited trial to explore features like backlink analysis, SEO keyword insights, and content generation.",
  icons: {
    icon: "/seo/favicon-light.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interV.variable} ${rebondGrotesque.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-wope-bg text-white">{children}</body>
    </html>
  );
}
