import type { Metadata } from "next";
import { SourceRegistryPage } from "../components/SourceRegistryPage";

export const metadata: Metadata = {
  title: "政策来源库｜北京 AI 政策情报",
  description: "北京 AI 政策情报扫描过的政策原文、申报入口、官方转载和线索来源集合。",
};

export default function SourcesPage() {
  return <SourceRegistryPage />;
}
