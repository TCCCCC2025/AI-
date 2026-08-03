import type { Metadata } from "next";
import { SubsidyRadarPage } from "../components/SubsidyRadarPage";

export const metadata: Metadata = {
  title: "补贴申报雷达｜北京 AI 政策情报",
  description: "北京市级、各区和经开区 AI、Token、算力、数据、备案、场景与 OPC 补贴政策的申报条件、金额、入口和核验依据。",
};

export default function SubsidiesPage() {
  return <SubsidyRadarPage />;
}
