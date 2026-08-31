import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "北京 AI 政策情报",
  description: "覆盖国家、北京及重点外省市的 AI、大模型、算力与数据政策全景、政策分析、客户分类和补贴申报雷达。",
  openGraph: {
    title: "北京 AI 政策情报",
    description: "国家、北京及重点外省市 AI、大模型、算力与数据政策的核验周报、政策分析、客户分类与补贴申报窗口。",
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
