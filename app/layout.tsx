import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "北京 AI 政策情报",
  description: "北京 AI、大模型、算力与数据政策的全景总览、周更、分类政策库和补贴申报雷达。",
  openGraph: {
    title: "北京 AI 政策情报",
    description: "北京 AI、大模型、算力与数据政策的核验周报与申报窗口。",
    images: [{ url: "/og.png", width: 1734, height: 908 }],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
