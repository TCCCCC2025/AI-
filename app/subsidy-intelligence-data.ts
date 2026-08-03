import type { SourceGrade } from "./subsidy-data.ts";

export type PolicyBasis = {
  stage: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  sourceGrade: SourceGrade;
};

export type PolicyIntelligence = {
  id: string;
  title: string;
  fact: string;
  judgement: string;
  nextSignal: string;
  confidence: "高" | "中" | "观察";
  horizon: "近期" | "1—3 个月" | "中期";
  relatedPolicyIds: string[];
  basis: PolicyBasis[];
  warning?: { trigger: string; likelyAction: string; leadTime: string; recommendedAction: string };
};

export type ReadinessState = "已具备" | "待补齐" | "不适用";

export type ReadinessPlaybook = {
  customerType: string;
  items: Array<{ label: string; evidence: string; owner: string; state: ReadinessState }>;
  now: string;
  nextSignal: string;
  contact: string;
};

export const policyIntelligence: PolicyIntelligence[] = [
  {
    id: "trend-token-from-consumption-to-platform",
    title: "Token 支持从费用补贴走向平台化即时抵扣",
    fact: "北京市中小企业服务券已把 Token 计费资源包列入上架产品；经开区模型券平台已上线并披露最高 65% 的即时补贴比例。",
    judgement: "业务上，客户经理应把 Token 支持拆成“服务券产品上架”和“平台实时抵扣”两条路径，前者重订单核销，后者重区域资格与平台规则。",
    nextSignal: "继续核验北京市服务券产品余额、经开区平台券包和下一批模型券通知，重点记录实际可用模型与抵扣比例。",
    confidence: "高",
    horizon: "近期",
    relatedPolicyIds: ["bj-sme-service-token-voucher-2026", "etown-model-voucher-live", "etown-model-voucher-2026-h1"],
    basis: [
      { stage: "市级实施指南", title: "2026 年北京市高精尖产业发展项目资金实施指南", publisher: "北京市经济和信息化局", date: "2026-02-14", url: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202602/t20260214_4516700.html", sourceGrade: "official" },
      { stage: "区级平台动态", title: "经开区上线模型券即时补贴平台", publisher: "北京经开区管委会", date: "2026-07-15", url: "https://kfqgw.beijing.gov.cn/ywdt/gzdt/202607/t20260715_4764261.html", sourceGrade: "official_repost" },
    ],
    warning: { trigger: "服务券最晚期限或平台券包余额接近临界", likelyAction: "出现新一批产品上架、续发服务券或调整实时抵扣规则", leadTime: "1—4 周", recommendedAction: "现在就锁定服务商、订单和使用记录，避免窗口出现后再补材料。" },
  },
  {
    id: "trend-compute-layered-vouchers",
    title: "算力支持形成市级创新券、项目资金和区级补贴的分层结构",
    fact: "北京市高精尖项目资金、科技创新券和丰台区人工智能措施分别覆盖研发项目算力、科技型中小微企业算力和区级年度征集。",
    judgement: "算力客户不应只问“有没有算力补贴”，而应按主体类型、算力用途、合同关系和是否存在开放单位资质，匹配不同的资金路径。",
    nextSignal: "跟踪下一批市级高精尖资金指南、创新券开放单位名单和各区年度算力支持通知。",
    confidence: "高",
    horizon: "1—3 个月",
    relatedPolicyIds: ["bj-high-end-ai-compute-2026", "bj-innovation-compute-voucher-2026", "fengtai-ai-measures-2025"],
    basis: [
      { stage: "市级项目资金", title: "2026 年北京市高精尖产业发展项目资金实施指南", publisher: "北京市经济和信息化局、北京市财政局", date: "2026-02-14", url: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202602/t20260214_4516700.html", sourceGrade: "official" },
      { stage: "市级创新券", title: "首都科技条件平台与科技创新券实施办法（2026 年修订版）", publisher: "北京市科委、中关村管委会", date: "2026-06-23", url: "https://kw.beijing.gov.cn/zwgk/zcwj/202606/t20260623_4711352.html", sourceGrade: "official" },
      { stage: "区级长期措施", title: "丰台区支持人工智能科技创新和产业创新融合发展的若干措施", publisher: "丰台区科信局", date: "2026-01-21", url: "https://www.bjft.gov.cn/xxfb/ftzcwj/ftbmwj/202601/t20260121_202302.shtml", sourceGrade: "official" },
    ],
    warning: { trigger: "年度资金指南或创新券额度重新开放", likelyAction: "算力使用方需要在短窗口内提交合同、发票、日志和项目证明", leadTime: "2—6 周", recommendedAction: "建立客户算力账单台账，提前完成非关联方合同和计量日志检查。" },
  },
  {
    id: "trend-data-scenario-linkage",
    title: "数据券与高质量数据集成为模型、具身智能和行业场景的连接器",
    fact: "经开区数据产业措施明确数据券、数据集、数据模型和公共数据授权运营方向，并将制造、医药、智能网联汽车和具身智能列为重点产业。",
    judgement: "政策趋势从单独补贴算力转向补贴“数据采购—模型训练—场景应用”的链路，客户经理应同时寻找数据供给方和场景需求方。",
    nextSignal: "核验经开区数据券当期申报入口、高质量数据集评审通知和公共数据授权运营项目清单。",
    confidence: "中",
    horizon: "1—3 个月",
    relatedPolicyIds: ["etown-ai-data-measures-2025"],
    basis: [
      { stage: "区级产业措施", title: "经开区关于加快推进数据产业高质量发展的若干措施", publisher: "北京经开区管委会", date: "2026-03-27", url: "https://www.beijing.gov.cn/cs/gncs/zcwj/202603/t20260327_4568265.html", sourceGrade: "official" },
      { stage: "北京市级制度", title: "北京市公共数据资源授权运营管理办法", publisher: "北京市政数局", date: "2026-07-02", url: "https://zwfwj.beijing.gov.cn/zwgk/2024zcwj/202607/t20260707_4750937.html", sourceGrade: "official" },
    ],
    warning: { trigger: "数据券批次或数据集评审通知发布", likelyAction: "场景单位、数据供给方和模型企业需要形成联合申报或采购方案", leadTime: "4—8 周", recommendedAction: "现在建立数据权属、授权链、质量说明和场景验收指标的材料包。" },
  },
  {
    id: "trend-opc-agent-ecosystem",
    title: "OPC/智能体生态从创业扶持延伸到 Token、算力和场景配套",
    fact: "北京市智能体和 OPC 政策、经开区人工智能之城措施以及通州 OPC 措施均把创业主体、智能体应用、模型/算力支持和园区生态纳入政策方向。",
    judgement: "OPC 客户的政策价值不只在注册奖励，更在于其能否成为场景验证、模型调用和园区生态的轻量入口。",
    nextSignal: "关注各区 OPC 认定口径、园区入驻批次、智能体揭榜和模型/算力券配套细则。",
    confidence: "中",
    horizon: "中期",
    relatedPolicyIds: ["tongzhou-opc-support-2026"],
    basis: [
      { stage: "北京市级措施", title: "北京市关于加快智能体引领发展的若干措施", publisher: "北京市发展改革委等", date: "2026-07-23", url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html", sourceGrade: "official" },
      { stage: "区级措施", title: "北京城市副中心支持数智创新 OPC 创新发展的若干措施", publisher: "通州区相关部门", date: "2026-06-01", url: "https://www.bjtzh.gov.cn/bjtz/xxfb/202606/1792736.shtml", sourceGrade: "official" },
    ],
    warning: { trigger: "园区发布 OPC 入驻或智能体场景征集", likelyAction: "产品原型、知识产权、场景意向和团队材料成为快速筛选条件", leadTime: "2—4 周", recommendedAction: "为 OPC 客户准备一页产品说明、场景意向和模型/算力使用预算。" },
  },
  {
    id: "trend-preparation-before-window",
    title: "政策有效但等批次的客户准备价值高于等待公告",
    fact: "丰台区、通州区和经开区数据产业措施均存在政策方向已发布但具体批次、额度或入口需按当期通知核验的情形。",
    judgement: "未开放不代表没有动作空间；提前形成资格、合同、发票、备案、数据权属和场景验收材料，能显著缩短申报响应时间。",
    nextSignal: "关注区级政府网站、主管部门通知、政策兑现平台和园区运营方的同主题更新。",
    confidence: "高",
    horizon: "近期",
    relatedPolicyIds: ["fengtai-ai-measures-2025", "etown-ai-data-measures-2025", "tongzhou-opc-support-2026"],
    basis: [
      { stage: "区级有效政策", title: "丰台区人工智能科技创新和产业创新融合措施", publisher: "丰台区科信局", date: "2026-01-21", url: "https://www.bjft.gov.cn/xxfb/ftzcwj/ftbmwj/202601/t20260121_202302.shtml", sourceGrade: "official" },
      { stage: "区级有效政策", title: "经开区数据产业高质量发展若干措施", publisher: "北京经开区管委会", date: "2026-03-27", url: "https://www.beijing.gov.cn/cs/gncs/zcwj/202603/t20260327_4568265.html", sourceGrade: "official" },
    ],
    warning: { trigger: "区级部门发布年度资金预算、征集通知或平台上线动态", likelyAction: "政策从“有效待批次”切换为可申报或限额制窗口", leadTime: "7—30 天", recommendedAction: "每周复核来源库并把客户材料状态更新为已具备/待补齐。" },
  },
];

export const readinessPlaybooks: ReadinessPlaybook[] = [
  {
    customerType: "大模型/智能体企业",
    items: [
      { label: "主体与注册地", evidence: "营业执照、注册地和高新/科技型资质", owner: "客户", state: "待补齐" },
      { label: "备案或登记", evidence: "模型备案/登记、服务上线说明", owner: "客户合规", state: "待补齐" },
      { label: "Token 与客户数", evidence: "调用量、客户数、收费和 API 日志", owner: "产品/财务", state: "待补齐" },
      { label: "场景与生态方案", evidence: "场景合同/意向、应用成效和验收指标", owner: "销售/交付", state: "待补齐" },
    ],
    now: "先按模型企业、用户企业和场景方三类角色整理证据，不等待新批次才开始统计 Token。",
    nextSignal: "模型券遴选、智能体揭榜或园区生态征集通知。",
    contact: "经信/科信主管部门、园区运营方和模型券平台",
  },
  {
    customerType: "算力与云服务商",
    items: [
      { label: "开放单位资质", evidence: "IDC/ISP、算力资源和北京服务基础证明", owner: "客户", state: "待补齐" },
      { label: "资源与计量", evidence: "算力规格、计费口径、使用日志和账单", owner: "产品/财务", state: "待补齐" },
      { label: "服务目录", evidence: "可上架 Token/算力服务产品与合同模板", owner: "产品", state: "待补齐" },
      { label: "交付与安全", evidence: "SLA、数据安全、运维和验收材料", owner: "交付/安全", state: "待补齐" },
    ],
    now: "先确认能否作为创新券开放单位或服务券上架机构，再完善订单和日志留痕。",
    nextSignal: "创新券开放单位名单、服务券产品清单和平台模型/算力券入口。",
    contact: "市科委/经信部门、创新券平台、政策兑现平台",
  },
  {
    customerType: "数据服务与数据运营机构",
    items: [
      { label: "数据权属与授权链", evidence: "权属、授权、来源和使用范围文件", owner: "法务/合规", state: "待补齐" },
      { label: "数据集说明", evidence: "质量指标、更新频率、脱敏和评测说明", owner: "数据产品", state: "待补齐" },
      { label: "交易与交付", evidence: "合规交易平台合同、发票和交付证明", owner: "销售/财务", state: "待补齐" },
      { label: "场景成效", evidence: "模型训练、具身智能或行业应用成效", owner: "客户/交付", state: "待补齐" },
    ],
    now: "将数据产品、合规材料和应用场景绑定，形成可提交的数据券/数据集项目包。",
    nextSignal: "数据券批次、高质量数据集评审或公共数据授权运营项目。",
    contact: "数据主管部门、经开区/园区数据运营平台和场景单位",
  },
  {
    customerType: "场景单位/央国企",
    items: [
      { label: "场景需求", evidence: "业务问题、数据边界和可量化目标", owner: "业务部门", state: "待补齐" },
      { label: "预算与采购", evidence: "预算来源、采购路径和供应商准入", owner: "采购/财务", state: "待补齐" },
      { label: "数据提供边界", evidence: "授权范围、脱敏、出域和安全审查", owner: "法务/安全", state: "待补齐" },
      { label: "验收指标", evidence: "准确率、效率、成本和上线验收标准", owner: "业务/技术", state: "待补齐" },
    ],
    now: "先把场景写成可验收的需求卡，便于对接数据、模型和智能体企业。",
    nextSignal: "场景揭榜、高质量数据集需求清单和央国企场景开放公告。",
    contact: "行业主管部门、央国企数字化部门、园区场景平台",
  },
  {
    customerType: "OPC/初创企业",
    items: [
      { label: "主体或园区身份", evidence: "企业主体、园区/孵化器入驻和 OPC 认定", owner: "客户", state: "待补齐" },
      { label: "产品原型", evidence: "产品说明、演示、知识产权或开源仓库", owner: "产品/技术", state: "待补齐" },
      { label: "使用预算", evidence: "模型/Token/算力成本表和使用记录", owner: "产品/财务", state: "待补齐" },
      { label: "订单或场景", evidence: "客户意向、试点合同和成长性证明", owner: "销售", state: "待补齐" },
    ],
    now: "把注册地、园区关系、产品原型和模型/算力成本放进一页准备卡。",
    nextSignal: "园区入驻、OPC 认定、模型券/算力券或智能体场景征集。",
    contact: "园区运营方、区级科信/经信部门、政策服务窗口",
  },
];
