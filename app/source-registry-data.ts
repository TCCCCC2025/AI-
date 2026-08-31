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
  ["https://www.beijing.gov.cn/zhengce/zhengcefagui/202608/t20260818_4827195.html", "2026年度AI+气象“揭榜挂帅”专项榜单", "北京市科委、中关村管委会、北京市气象局", "北京市级", "bj-ai-meteorology-bang-2026"],
  ["https://kw.beijing.gov.cn/zwgk/zcwj/202608/t20260812_4820137.html", "新一代人工智能国家科技重大专项“以赛代评”北京转发通知", "北京市科委、中关村管委会", "北京市级", "bj-national-ai-contest-2026"],
  ["https://www.beijing.gov.cn/fuwu/lqfw/gggs/202608/t20260807_4812761.html", "2026年人工智能+新材料创新发展储备课题征集", "北京市科委、中关村管委会", "北京市级", "bj-ai-new-materials-2026"],
  ["https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202608/t20260805_4809951.html", "经开区词元驱动智能经济若干措施（试行）", "北京经济技术开发区管理委员会", "区级", "dist-etown-token-economy-2026"],
  ["https://open.beijing.gov.cn/html/yizhuang/zcqd/2026/8/1785742151631.html", "经开区2026年人工智能行业大模型应用落地支持申报", "北京经济技术开发区信息技术产业局", "区级", "dist-etown-industry-model-2026"],
  ["https://kfqgw.beijing.gov.cn/ywdt/tt/cxzc/202608/t20260819_4828225.html", "经开区支持人工智能原生人才发展若干措施（AI人才八条）", "北京经济技术开发区管理委员会", "区级", "dist-etown-ai-native-talent-2026"],
  ["https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260707_4750995.html", "2026年亦城人才·人工智能超级个体（OPC）认定申报通知", "北京经开区工委组织人事部", "区级", "dist-etown-opc-talent-2026"],
  ["https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260703_4745935.html", "2026年数据领域核心技术攻关补贴申报通知", "北京市智慧城市基础设施与智能网联汽车协同发展工作办公室", "区级", "dist-etown-data-core-2026"],
  ["https://gxj.sz.gov.cn/gkmlpt/content/12/12956/post_12956819.html?jump=true", "深圳市打造人工智能先锋城市项目扶持计划（第二批）申请指南", "深圳市工业和信息化局", "外省市", "reg-shenzhen-ai-pioneer-2026-batch2"],
  ["https://gxj.sz.gov.cn/gkmlpt/content/12/12760/post_12760215.html", "深圳市打造人工智能先锋城市项目扶持计划操作规程（2026年修订版）", "深圳市工业和信息化局", "外省市", "reg-shenzhen-ai-pioneer-2026-batch2"],
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
  region: level === "国家" ? "国家" : level === "北京市级" ? "北京市级" : level === "外省市" ? "深圳市" : "北京各区",
  firstSeen: level === "外省市" ? "2026-08-27" : "2026-08-03",
  lastVerified: level === "外省市" ? "2026-08-31" : "2026-08-03",
  verificationStatus: "verified",
  relatedPolicyIds: [relatedPolicyId],
  notes: level === "外省市" ? "深圳市官方通知与操作规程已核验；第二批申请指南的附件和统一信息平台受理字段待继续回读。" : "已纳入政策库来源索引，后续周更优先复核页面及其附件。",
  nextReview: level === "外省市" ? "2026-09-07" : "2026-08-10",
}));

const externalWeeklySeeds: SourceSeed[] = [
  { url: "https://sdb.sh.gov.cn/gsgg/20260824/148702e0f0f74443a81b259f4582ce21.html", title: "2026年第一批上海市城市数字化转型（区块链创新应用）申请类项目拟支持情况公示", publisher: "上海市数据局", sourceType: "official_policy", level: "外省市", region: "上海市", firstSeen: "2026-08-24", lastVerified: "2026-08-31", verificationStatus: "verified", relatedPolicyIds: ["reg-shanghai-blockchain-2026-batch1"], notes: "上海市数据局官方拟支持结果公示；依据《上海市城市数字化转型专项资金管理办法》，不等同于新的申报窗口。", nextReview: "2026-09-07" },
  { url: "https://sdb.sh.gov.cn/gsgg/20260825/cd1a719b889b4d8584e6cb2d5d0fbbc4.html", title: "2026年第一批算力生态合作伙伴名单公示", publisher: "上海市数据局、上海市通信管理局", sourceType: "official_policy", level: "外省市", region: "上海市", firstSeen: "2026-08-25", lastVerified: "2026-08-31", verificationStatus: "verified", relatedPolicyIds: ["reg-shanghai-compute-partners-2026-batch1"], notes: "官方名单公示38家伙伴，公示期8月25日至9月1日；不等同于财政补贴或采购承诺。", nextReview: "2026-09-07" },
  { url: "https://gxj.nanjing.gov.cn/njsjjhxxhwyh/202608/t20260813_5893091.html", title: "南京市人工智能服务商、智能体开发商征集通知", publisher: "南京市工业和信息化局", sourceType: "official_policy", level: "外省市", region: "南京市", firstSeen: "2026-08-13", lastVerified: "2026-08-31", verificationStatus: "verified", relatedPolicyIds: ["reg-nanjing-ai-two-providers-2026"], notes: "南京市工信局官方通知；本轮截止8月25日，征集为常态化工作，后续可按月补报。", nextReview: "2026-09-07" },
  { url: "https://zsj.gz.gov.cn/gkmlpt/content/10/10976/post_10976669.html", title: "广州政务人工智能与城市可信数据空间建设答复", publisher: "广州市政务服务和数据管理局", sourceType: "official_policy", level: "外省市", region: "广州市", firstSeen: "2026-08-24", lastVerified: "2026-08-31", verificationStatus: "verified", relatedPolicyIds: ["reg-guangzhou-ai-trusted-space-2026"], notes: "广州市政数局正式提案答复，披露“穗智政”、公共数据授权运营和城市可信数据空间建设方向；不是直接补贴通知。", nextReview: "2026-09-07" },
  { url: "https://www.nanjing.gov.cn/zgnjsjb/jrtt/202608/t20260828_5900927.html", title: "南京市抢占人工智能发展先机专题部署", publisher: "中共南京市委、南京市人民政府", sourceType: "official_policy", level: "外省市", region: "南京市", firstSeen: "2026-08-28", lastVerified: "2026-08-31", verificationStatus: "verified", relatedPolicyIds: ["reg-nanjing-ai-future-industry-2026"], notes: "南京市政府官方工作部署，作为产业方向信号观察；具体支持政策和申报入口待后续正式通知。", nextReview: "2026-09-07" },
];

const applicationSeeds: SourceSeed[] = [
  { url: "https://zhengce.beijing.gov.cn", title: "北京市政策兑现专区", publisher: "北京市人民政府", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-03", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "市级项目资金和部分区级项目的统一入口；本周复核AI+气象、高精尖资金第二批和AI+新材料窗口状态。", nextReview: "2026-08-31" },
  { url: "https://kw.beijing.gov.cn", title: "首都科技条件平台/创新券入口", publisher: "北京市科委、中关村管委会", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-03", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "创新券批次、开放单位和余额以平台实时状态为准；本周补充复核AI+气象及国家人工智能重大专项入口。", nextReview: "2026-08-31" },
  { url: "https://www.smebj.cn", title: "北京市中小企业公共服务平台", publisher: "北京市经济和信息化局", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-03", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "服务券产品清单、服务机构和核销信息入口。", nextReview: "2026-08-31" },
  { url: "https://zcdx.kfqgw.beijing.gov.cn", title: "经开区政策兑现综合服务平台", publisher: "北京经开区管委会", sourceType: "application_portal", level: "区级", region: "北京经开区", firstSeen: "2026-08-03", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "经开区政策申报和模型券即时补贴平台入口，需登录后核验实时券包；本周复核行业大模型支持窗口。", nextReview: "2026-08-31" },
  { url: "https://pm.kw.beijing.gov.cn", title: "市级科技项目统筹管理信息系统", publisher: "北京市科委、中关村管委会", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-17", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "AI+气象揭榜和市级科技项目在线申报入口。", nextReview: "2026-08-31" },
  { url: "https://mis.kw.beijing.gov.cn", title: "北京市科技计划综合管理平台-在线服务系统", publisher: "北京市科委、中关村管委会", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-08-06", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "AI+新材料储备课题申报入口；支持周期和金额以项目字段为准。", nextReview: "2026-08-31" },
  { url: "https://service.most.gov.cn/kjjh_tztg_all/20260731/5858.html", title: "新一代人工智能国家科技重大专项“以赛代评”原指南", publisher: "科技部国家科技管理信息系统公共服务平台", sourceType: "official_policy", level: "国家", region: "国家", firstSeen: "2026-08-12", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "北京市科委转发通知指定的原指南，赛道、牵头资格和资助方式以该页为准。", nextReview: "2026-08-31" },
  { url: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/index.html", title: "北京经开区政策文件栏目（本周扫描入口）", publisher: "北京经开区管委会", sourceType: "official_policy", level: "区级", region: "北京经开区", firstSeen: "2026-08-10", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "已复核词元驱动智能经济政策、AI人才八条及行业大模型申报窗口状态。", nextReview: "2026-08-31" },
  { url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/", title: "首都之窗政策文件栏目（本周扫描入口）", publisher: "北京市人民政府", sourceType: "official_policy", level: "市级", region: "北京市级", firstSeen: "2026-08-10", lastVerified: "2026-08-24", verificationStatus: "verified", notes: "已复核AI+气象榜单、AI+新材料储备课题和市级申报窗口。", nextReview: "2026-08-31" },
];

const allSeeds = [...fromSubsidySources, ...policySeeds, ...externalWeeklySeeds, ...applicationSeeds];
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
