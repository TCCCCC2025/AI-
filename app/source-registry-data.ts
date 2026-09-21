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
  nextReview: "2026-09-21",
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

const currentWeekSeeds: SourceSeed[] = [
  { url: "https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2026/art_6fbc038bf15c445ab53b2a94a3f9d4e4.html", title: "人工智能应用服务商培育专项行动", publisher: "工业和信息化部办公厅", sourceType: "official_policy", level: "国家", region: "国家", firstSeen: "2026-08-31", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["nat-ai-service-providers-2026"], notes: "工信部官方通知；建立服务商资源池和服务团，要求各地区于2026年12月1日前报送资源池信息。", nextReview: "2026-09-21" },
  { url: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260904_4851307.html", title: "2026年度“AI+”方向揭榜挂帅及AI赋能生物育种储备课题", publisher: "北京市科委、中关村管委会等部门", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-04", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["bj-ai-plus-bang-breeding-2026"], notes: "北京官方申报日历页面；申报系统9月4日开通，9月23日18:00截止。", nextReview: "2026-09-21" },
  { url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202609/t20260901_4845849.html", title: "部分新兴领域信息采集（含人工智能）", publisher: "北京市军民融合发展促进中心", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-01", lastVerified: "2026-09-14", verificationStatus: "verified", notes: "官方通知要求持营业执照、身份证复印件及法人授权书到各区查阅工作通知；不构成补贴或公开申报。", nextReview: "2026-09-21" },
  { url: "https://njna.nanjing.gov.cn/njsjbxqglwyh/202607/t20260731_5887148.html", title: "南京江北新区促进软件产业高质量发展的若干政策措施", publisher: "南京江北新区管理委员会", sourceType: "official_policy", level: "外省市", region: "南京市江北新区", firstSeen: "2026-09-01", lastVerified: "2026-09-07", verificationStatus: "verified", relatedPolicyIds: ["reg-nanjing-jiangbei-software-2026"], notes: "官方政策自2026年9月1日起施行，覆盖AI+软件、智算、信创适配和产教融合。", nextReview: "2026-09-14" },
  { url: "https://gxj.gz.gov.cn/yw/tzgg/content/post_10987433.html", title: "广东省人工智能与机器人技能大赛（2026年）通知", publisher: "广州市工业和信息化局转发", sourceType: "official_repost", level: "外省市", region: "广州市", firstSeen: "2026-09-01", lastVerified: "2026-09-07", verificationStatus: "verified", relatedPolicyIds: ["reg-guangdong-ai-robot-skills-2026"], notes: "广州工信局官方转发；赛事和人才生态事项，不是财政补贴。", nextReview: "2026-09-14" },
  { url: "https://doc.jiangsu.gov.cn/art/2026/9/3/art_78712_11824614.html", title: "江苏省增补2026年贸易促进计划及重点展会资金", publisher: "江苏省商务厅", sourceType: "official_policy", level: "外省市", region: "江苏省", firstSeen: "2026-09-01", lastVerified: "2026-09-07", verificationStatus: "verified", relatedPolicyIds: ["reg-jiangsu-ai-ecommerce-expo-2026"], notes: "江苏省商务厅官方通知；支持江苏数智电商展展位费，申报截止11月19日17:00。", nextReview: "2026-09-14" },
  { url: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260901_4845672.html", title: "2026年科技服务业专项企业效能提升项目（第二批）", publisher: "北京市科委、中关村管委会", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-01", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["bj-tech-service-efficiency-2026-batch2"], notes: "北京科委官方申报日历；申报时间为9月1日至9月23日18:00，项目周期不超过1年且配套经费比例不低于2:1。", nextReview: "2026-09-21" },
  { url: "https://zjw.beijing.gov.cn/bjjs/kjcxytg/znjz/zjtz76/744118225/index.shtml", title: "北京市住房城乡建设领域创新应用场景征集", publisher: "北京市住房和城乡建设委员会", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-02", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["bj-housing-ai-scenes-2026"], notes: "北京住建委官方通知；AI视觉、智能建造、预测性维护等场景材料截止10月10日17:00，属于场景征集而非直接补贴。", nextReview: "2026-09-21" },
  { url: "https://www.nda.gov.cn/sjj/zwgk/tzgg/0908/20260908100236590767189_mobile.html", title: "2026年“数据要素×”大赛全国总决赛通知", publisher: "国家数据局等部门", sourceType: "official_policy", level: "国家", region: "国家", firstSeen: "2026-09-08", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["nat-data-factor-finals-2026"], notes: "国家数据局官方通知；入围团队通过dataelementx.cn提交最终材料，截止9月16日24:00。", nextReview: "2026-09-21" },
  { url: "https://sheitc.sh.gov.cn/cyfz/20260911/efa1c634559c44d7a61e9400a63acdb8.html", title: "上海市人工智能应用服务商征集", publisher: "上海市经济和信息化委员会", sourceType: "official_policy", level: "外省市", region: "上海市", firstSeen: "2026-09-11", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["reg-shanghai-ai-service-providers-2026"], notes: "上海经信委官方通知；服务商及服务团材料须于9月30日前提交所在区主管部门。", nextReview: "2026-09-21" },
  { url: "https://dt.sheitc.sh.gov.cn/cms/slddt/2861.jhtml", title: "2026年上海市行业高质量数据集案例征集", publisher: "上海市数据局", sourceType: "official_policy", level: "外省市", region: "上海市", firstSeen: "2026-09-07", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["reg-shanghai-quality-dataset-cases-2026"], notes: "上海市数据局官方通知；材料截止9月24日17:00，须完成上海数据集开源社区登记并取得主管部门推荐。", nextReview: "2026-09-21" },
  { url: "https://gxj.sz.gov.cn/szsgyhxxhjwzgkml/szsgyhxxhjwzgkml/qt/tzgg/content/post_12970192.html", title: "深圳市2026年模型券（申领）项目（第二批）申请指南通知", publisher: "深圳市工业和信息化局", sourceType: "official_policy", level: "外省市", region: "深圳市", firstSeen: "2026-09-07", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["reg-shenzhen-model-voucher-claim-2026-batch2"], notes: "深圳工信局官方通知；项目已启动，具体金额、资格和截止时间以申请指南附件为准。", nextReview: "2026-09-21" },
  { url: "https://gxj.sz.gov.cn/gkmlpt/content/12/12965/post_12965466.html", title: "深圳市推动人工智能与应用发展行动计划（2026—2028年）", publisher: "深圳市工业和信息化局、发展改革委、科技创新局", sourceType: "official_policy", level: "外省市", region: "深圳市", firstSeen: "2026-09-04", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["reg-shenzhen-ai-application-plan-2026"], notes: "深圳市正式行动计划，提出到2028年推动AI与科研、产业、消费、民生、治理和全球合作六大领域深度融合。", nextReview: "2026-09-21" },
  { url: "https://www.lg.gov.cn/xxgk/zwgk/tzgg/content/post_12966833.html", title: "深圳龙岗2026年场景应用揭榜项目延期通知", publisher: "深圳市龙岗区人工智能（机器人）署", sourceType: "official_policy", level: "外省市", region: "深圳市龙岗区", firstSeen: "2026-09-03", lastVerified: "2026-09-14", verificationStatus: "verified", relatedPolicyIds: ["reg-shenzhen-longgang-ai-scenes-2026"], notes: "龙岗区官方延期通知；材料提交截止由9月4日调整为9月21日18:00。", nextReview: "2026-09-21" },
];

const currentWeekAdditions: SourceSeed[] = [
  { url: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202609/t20260918_4870474.html", title: "北京市加快词元经济发展的行动方案（2026—2028年）", publisher: "北京市经济和信息化局、北京市发展和改革委员会", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-18", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["bj-token-economy-action-2026"], notes: "官方行动方案；支持 Token 工厂、模型芯片适配、算力、数据产品、智能体和工程师生态，具体兑现以配套通知为准。", nextReview: "2026-09-28" },
  { url: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202609/t20260918_4869487.html", title: "北京市人工智能应用服务商资源池征集通知", publisher: "北京市经济和信息化局", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-18", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["bj-ai-service-provider-pool-2026"], notes: "北京经信部门官方通知；材料须于10月15日前提交所在区经信主管部门，资源池征集不等同于直接补贴。", nextReview: "2026-09-28" },
  { url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202609/t20260918_4869930.html", title: "北京市人工智能应用服务商资源池征集通知（首都之窗）", publisher: "北京市人民政府", sourceType: "official_repost", level: "北京市级", region: "北京市级", firstSeen: "2026-09-18", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["bj-ai-service-provider-pool-2026"], notes: "首都之窗官方转载页，与市经信局原文交叉核验。", nextReview: "2026-09-28" },
  { url: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260917_4868421.html", title: "北京市城市科技与精细化管理领域第二批揭榜挂帅任务榜单", publisher: "北京市科委、中关村管委会", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-17", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["bj-city-science-fine-management-bang-2026"], notes: "官方榜单通知；企业牵头、参与单位原则上不超过4家，10月13日17:00截止。", nextReview: "2026-09-28" },
  { url: "https://gdj.beijing.gov.cn/zwxx/tzgg2/202609/t20260920_4871956.html", title: "关于延长北京市“人工智能+视听”重点项目申报时间的通知", publisher: "北京市广播电视局", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-20", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["bj-ai-audiovisual-guide-2026"], notes: "官方延期通知；申报截止由9月30日延至10月31日，其他要求不变。", nextReview: "2026-09-28" },
  { url: "https://kw.beijing.gov.cn/zwgk/zcwj/202609/t20260920_4871770.html", title: "2026年首都科技创新券启动申领通知", publisher: "北京市科委、中关村管委会", sourceType: "official_policy", level: "北京市级", region: "北京市级", firstSeen: "2026-09-21", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["bj-innovation-voucher-2026-current"], notes: "当前日启动的常态化创新券入口，先到先得、额度发完即止；不纳入上周周报变化，作为当前申报入口维护。", nextReview: "2026-09-28" },
  { url: "https://banshi.beijing.gov.cn/pubtask/task/1/110000000000/27d7b212-d995-4ca7-8883-93ea4dce387a.html?locationCode=110000000000", title: "首都科技创新券在线申领入口", publisher: "北京市政务服务平台", sourceType: "application_portal", level: "市级", region: "北京市级", firstSeen: "2026-09-21", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["bj-innovation-voucher-2026-current"], notes: "首都科技创新券办理入口；服务类型、额度和余额以登录后平台字段为准。", nextReview: "2026-09-28" },
  { url: "https://www.hzbjzx.gov.cn/data/2026/09/t20260902105056841.htm", title: "杭州市滨江区加快推进人工智能产业高质量发展的若干政策", publisher: "杭州市滨江区人民政府", sourceType: "official_policy", level: "外省市", region: "杭州市滨江区", firstSeen: "2026-09-02", lastVerified: "2026-09-21", verificationStatus: "verified", relatedPolicyIds: ["reg-hangzhou-binjiang-ai-2026"], notes: "滨江区官方发布页面；政策自9月11日起施行，组合支持研发、算力、Token、数据和模型采购。", nextReview: "2026-09-28" },
];

const allSeeds = [...fromSubsidySources, ...policySeeds, ...externalWeeklySeeds, ...applicationSeeds, ...currentWeekSeeds, ...currentWeekAdditions];
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
