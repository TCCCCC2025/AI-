import { subsidyPolicies } from "./subsidy-data.ts";

export type SourceType = "official_policy" | "application_portal" | "official_repost" | "platform_update" | "lead";
export type VerificationStatus = "verified" | "lead" | "not_found" | "unavailable";

export type SourceRegistryItem = {
  url: string;
  title: string;
  publisher: string;
  sourceType: SourceType;
  level: string;
  region: string;
  firstSeen: string;
  lastVerified: string;
  verificationStatus: VerificationStatus;
  relatedPolicyIds: string[];
  notes: string;
  nextReview: string;
};

type SourceSeed = Omit<SourceRegistryItem, "relatedPolicyIds"> & { relatedPolicyIds?: string[] };

const fromSubsidySources: SourceSeed[] = subsidyPolicies.flatMap((policy) => policy.sources.map((source) => ({
  url: source.url,
  title: source.title,
  publisher: source.publisher,
  sourceType: source.sourceGrade === "official" ? "official_policy" : "official_repost",
  level: policy.region === "北京市级" ? "北京市级" : "区级",
  region: policy.region,
  firstSeen: policy.verifiedAt,
  lastVerified: policy.verifiedAt,
  verificationStatus: "verified",
  relatedPolicyIds: [policy.id],
  notes: source.evidence,
  nextReview: "2026-08-24",
})));

const policySeeds: SourceSeed[] = [
  ["https://jxj.beijing.gov.cn/zwgk/2024zcwj/202607/t20260730_4801241.html", "2026年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第二批）", "北京市经济和信息化局、北京市财政局", "北京市级", "bj-high-tech-fund-202602"],
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html", "北京市关于加快智能体引领发展的若干措施", "北京市发展改革委等四部门", "北京市级", "bj-agent-measures"],
  ["https://zwfwj.beijing.gov.cn/zwgk/2024zcwj/202607/t20260707_4750937.html", "北京市公共数据资源授权运营管理办法", "北京市政数局", "北京市级", "bj-public-data-operation"],
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202606/t20260622_4710194.html", "支持人工智能 OPC 创新发展行动方案（试行）", "北京市经济和信息化局", "北京市级", "bj-ai-opc"],
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202605/t20260513_4649243.html", "北京市 AI 赋能工业互联网高质量发展实施方案", "北京市经济和信息化局", "北京市级", "bj-ai-industrial-internet"],
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202603/t20260318_4560553.html", "北京市 2026 年推动经济稳中有进的若干措施", "北京市政府办公厅", "北京市级", "bj-economic-measures-2026"],
  ["https://jxj.beijing.gov.cn/zwgk/2024zcwj/202606/t20260630_4739968.html", "2026 年第三批 AI 赋能新型工业化高质量数据集需求清单", "北京市经济和信息化局", "北京市级", "bj-industrial-dataset-demand-202603"],
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260701_4742201.html", "2026 智慧城市场景创新需求（第四批）及智慧教育专项揭榜", "北京市政数局", "北京市级", "bj-smart-city-demand-202604"],
  ["https://www.bjtzh.gov.cn/bjtz/xxfb/202606/1792651.shtml", "通州区支持数字经济高质量发展的若干措施", "通州区经信局", "区级", "dist-tongzhou-digital-economy"],
  ["https://www.bjchp.gov.cn/cpqzf/xxgk2671/zcwj/2026042815575798679/index.html", "昌平区推动人工智能创新发展行动计划", "昌平区政府办", "区级", "dist-changping-ai-plus"],
  ["https://zyk.bjhd.gov.cn/zwdt/zcwj/202604/t20260414_4811721.shtml", "海淀区关于全面打造 OPC 创业生态的若干措施", "中关村科学城管委会", "区级", "dist-haidian-opc"],
  ["https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202601/t20260130_4478660.html", "经开区全域人工智能之城实施方案", "北京经开区管委会", "区级", "dist-etown-ai-city"],
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4780574.html", "2026年度智能工厂梯度培育行动", "北京市经济和信息化局", "北京市级", "bj-smart-factory-gradient-2026"],
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202605/t20260513_4649184.html", "人工智能+视听重点项目申报指南（2026年）", "北京市广播电视局", "北京市级", "bj-ai-audiovisual-guide-2026"],
  ["https://gdj.beijing.gov.cn/zwxx/2024zcwj/202605/t20260511_4645308.html", "人工智能+视听重点项目支持管理办法（2026—2029年）", "北京市广播电视局", "北京市级", "bj-ai-audiovisual-guide-2026"],
  ["https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260707_4750995.html", "2026年亦城人才·人工智能超级个体（OPC）认定申报通知", "北京经开区工委组织人事部", "区级", "dist-etown-opc-talent-2026"],
  ["https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260703_4745935.html", "2026年数据领域核心技术攻关补贴申报通知", "北京市智慧城市基础设施与智能网联汽车协同发展工作办公室", "区级", "dist-etown-data-core-2026"],
  ["https://www.miit.gov.cn/zwgk/zcwj/wjfb/yj/art/2026/art_fefdddaaa4ac49edb130c85d048a2933.html", "关于推动互联网基础资源高质量发展的指导意见", "工信部等四部门", "国家", "nat-internet-infrastructure"],
  ["https://www.gov.cn/lianbo/202606/content_7073465.htm", "人工智能智能体互联系列国家标准", "国家市场监管总局、国家标准委", "国家", "nat-agent-standards"],
  ["https://www.gov.cn/zhengce/zhengceku/202606/content_7071755.htm", "人工智能+信息通信创新发展实施意见", "工业和信息化部", "国家", "nat-ai-telecom-2026"],
  ["https://www.nda.gov.cn/sjj/zwgk/tzgg/0608/20260608172117399715004_pc.html", "行业高质量数据集建设行动实施方案", "国家数据局", "国家", "nat-industry-datasets"],
  ["https://www.cac.gov.cn/2026-05/08/c_1779979789523320.htm", "智能体规范应用与创新发展实施意见", "国家网信办等", "国家", "nat-agent-development"],
  ["https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2026/art_58259bfb30924d6bb225b82b66d1008d.html", "普惠算力赋能中小企业发展专项行动", "工业和信息化部", "国家", "nat-inclusive-compute-sme"],
  ["https://www.gov.cn/zhengce/zhengceku/202601/content_7054201.htm", "人工智能+制造专项行动实施意见", "工业和信息化部等", "国家", "nat-ai-manufacturing"],
].map(([url, title, publisher, level, relatedPolicyId]) => ({
  url,
  title,
  publisher,
  sourceType: "official_policy",
  level,
  region: level === "国家" ? "国家" : level === "北京市级" ? "北京市级" : "北京各区",
  firstSeen: "2026-08-03",
  lastVerified: "2026-08-03",
  verificationStatus: "verified",
  relatedPolicyIds: [relatedPolicyId],
  notes: "已纳入政策库来源索引，后续周更优先复核页面及其附件。",
  nextReview: "2026-08-10",
}));

const applicationSeeds: SourceSeed[] = [
  { url: "https://zhengce.beijing.gov.cn", title: "北京市政策兑现专区", publisher: "北京市人民政府", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-03", lastVerified: "2026-08-17", verificationStatus: "verified", notes: "市级项目资金和部分区级项目的统一入口；本周复核第二批高精尖资金方向1、2、7的入口与截止时间。", nextReview: "2026-08-24" },
  { url: "https://kw.beijing.gov.cn", title: "首都科技条件平台/创新券入口", publisher: "北京市科委、中关村管委会", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-03", lastVerified: "2026-08-17", verificationStatus: "verified", notes: "创新券批次、开放单位和余额以平台实时状态为准。", nextReview: "2026-08-24" },
  { url: "https://www.smebj.cn", title: "北京市中小企业公共服务平台", publisher: "北京市经济和信息化局", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-03", lastVerified: "2026-08-17", verificationStatus: "verified", notes: "服务券产品清单、服务机构和核销信息入口。", nextReview: "2026-08-24" },
  { url: "https://zcdx.kfqgw.beijing.gov.cn", title: "经开区政策兑现综合服务平台", publisher: "北京经开区管委会", sourceType: "application_portal", level: "区级", region: "北京经开区", firstSeen: "2026-08-03", lastVerified: "2026-08-17", verificationStatus: "verified", notes: "经开区政策申报和模型券即时补贴平台入口，需登录后核验实时券包。", nextReview: "2026-08-24" },
  { url: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/index.html", title: "北京经开区政策文件栏目（本周扫描入口）", publisher: "北京经开区管委会", sourceType: "official_policy", level: "区级", region: "北京经开区", firstSeen: "2026-08-10", lastVerified: "2026-08-17", verificationStatus: "verified", notes: "已复核 2026 年 OPC 人才认定和数据领域核心技术攻关申报窗口状态。", nextReview: "2026-08-24" },
  { url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/", title: "首都之窗政策文件栏目（本周扫描入口）", publisher: "北京市人民政府", sourceType: "official_policy", level: "市级", region: "北京市级", firstSeen: "2026-08-10", lastVerified: "2026-08-17", verificationStatus: "verified", notes: "已复核高精尖产业资金第二批窗口、智能工厂梯度培育和人工智能+视听项目指南。", nextReview: "2026-08-24" },
];

const allSeeds = [...fromSubsidySources, ...policySeeds, ...applicationSeeds];
const uniqueSeeds = new Map<string, SourceSeed>();
for (const item of allSeeds) {
  const existing = uniqueSeeds.get(item.url);
  if (existing) {
    existing.relatedPolicyIds = Array.from(new Set([...(existing.relatedPolicyIds ?? []), ...(item.relatedPolicyIds ?? [])]));
  } else {
    uniqueSeeds.set(item.url, { ...item, relatedPolicyIds: [...(item.relatedPolicyIds ?? [])] });
  }
}

export const sourceRegistry: SourceRegistryItem[] = Array.from(uniqueSeeds.values()).map((item) => ({
  ...item,
  relatedPolicyIds: item.relatedPolicyIds ?? [],
}));
