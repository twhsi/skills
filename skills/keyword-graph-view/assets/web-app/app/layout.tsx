import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "keyword-graph-view.twhsi.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Keyword Graph View",
    description: "從文本提取 8 個關鍵字，建立沒有中心目標的加權分散式網路。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Keyword Graph View",
      description: "8 個關鍵字、彩虹權重連線與節點筆記。",
      url: origin,
      siteName: "Keyword Graph View",
      images: [{ url: `${origin}/og.png`, width: 1664, height: 960, alt: "Keyword Graph View weighted network" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Keyword Graph View",
      description: "8 個關鍵字、彩虹權重連線與節點筆記。",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
