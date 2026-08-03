import type { Metadata } from "next";
import { SubsidyRadarPage } from "../components/SubsidyRadarPage";

export const metadata: Metadata = {
  title: "补贴申报雷达｜北京 AI 政策情报",
  description: "北京市级、各区和经开区 AI、Token、算力、数据、模型、场景与 OPC 补贴政策的条件、金额、入口、依据和趋势分析。",
};

export default function SubsidiesPage() {
  return <SubsidyRadarPage />;
}
