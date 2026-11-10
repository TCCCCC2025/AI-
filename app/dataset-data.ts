import { policyGroups } from "./policy-data.ts";
import { subsidyPolicies } from "./subsidy-data.ts";

export type DatasetLevel = "国家" | "北京市级" | "北京各区";
export type DatasetStatus = "持续适用" | "滚动核验" | "政策信号";

export type DatasetPolicy = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  level: DatasetLevel;
  category: "制度建设" | "供给征集" | "平台入口" | "产业政策" | "政策信号";
  status: DatasetStatus;
  sourceUrl: string;
  entry?: { label: string; href: string };
  tags: string[];
  summary: string;
  supportDirection: string;
  eligibility: string;
  businessImpact: string;
  complianceImpact: string;
  action: string;
};

export type DatasetRelatedPolicy = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  level: string;
  status: string;
  sourceUrl: string;
  relation: string;
};

export const datasetPolicies: DatasetPolicy[] = [
  {
    id: "nat-industry-high-quality-datasets-2026",
    title: "关于推进行业高质量数据集建设行动的实施方案",
    issuer: "国家数据局",
    date: "2026-06-03",
    level: "国家",
    category: "制度建设",
    status: "持续适用",
    sourceUrl: "https://www.nda.gov.cn/sjj/zwgk/tzgg/0608/20260608172117399715004_pc.html",
    tags: ["行业数据集", "人工智能+", "数据要素"],
    summary: "国家数据局围绕行业高质量数据集供给、流通和应用，部署强基扩容、标注攻坚、提质增效、应用赋能、管理服务、价值释放六项行动。",
    supportDirection: "重点行业数据集建设、数据标注和质量评测、供需对接、应用验证、数据产权与合规流通。",
    eligibility: "面向各行业数据管理部门、数据集建设单位、模型和应用企业，具体参与方式由行业和地方配套通知明确。",
    businessImpact: "数据治理、标注、质量评测、可信数据空间、模型训练和行业应用服务将从项目机会逐步变成标准化交付能力。",
    complianceImpact: "数据集必须具备合法来源、授权边界、质量管理、更新机制和安全保护方案；不能仅凭数据规模对外承诺可训练或可交易。",
    action: "按采集、清洗、标注、质检、封装、登记、交易和应用验证建立数据集台账，提前准备质量报告、授权链和样本集。",
  },
  {
    id: "nat-dataset-management-service-platform-2026",
    title: "国家数据集管理服务平台正式发布",
    issuer: "国家数据局",
    date: "2026-04-29",
    level: "国家",
    category: "平台入口",
    status: "持续适用",
    sourceUrl: "https://www.nda.gov.cn/sjj/zhuanti/ztszzh/0429/20260429223349173144038_pc.html",
    entry: { label: "国家数据集管理服务平台", href: "https://www.ndsms.cn" },
    tags: ["目录管理", "供需发布", "质量测评"],
    summary: "国家数据集管理服务平台提供数据集目录管理、供需发布、全域检索、凭证申领和质量测评等服务，支撑数据集全生命周期管理。",
    supportDirection: "数据集发布、目录汇聚、需求发布、质量测评、凭证申领和地方平台对接。",
    eligibility: "数据集供给方、需求方及数据管理部门可按平台规则使用相应功能，认证和凭证字段以平台实时要求为准。",
    businessImpact: "平台、数据商、行业客户和模型企业可以围绕数据集上架、检索、测评、交易和应用验证形成新的服务链路。",
    complianceImpact: "平台登记不等于数据权属确认或交易许可；数据集发布前仍需完成权属、个人信息、重要数据和行业监管要求核验。",
    action: "先注册并查看平台认证、凭证和质量测评字段，选择一个可公开说明来源和用途的数据集做试登记。",
  },
  {
    id: "nat-high-quality-dataset-construction-guide-2025",
    title: "《高质量数据集建设指引》",
    issuer: "国家数据局指导编制",
    date: "2025-08-28",
    level: "国家",
    category: "制度建设",
    status: "持续适用",
    sourceUrl: "https://www.nda.gov.cn/sjj/swdt/xwfb/0830/20250830210000366789341_mobile.html",
    tags: ["建设方法", "运营体系", "流通利用"],
    summary: "建设指引从体系化布局、设施化流通和生态化运营三个层面，给出高质量数据集从建设到应用的参考路径。",
    supportDirection: "数据集规划、建设流程、运营维护、质量保障、应用推广和生态协同。",
    eligibility: "适合作为企业、园区、行业平台和公共数据运营主体制定数据集建设方案的参考依据。",
    businessImpact: "咨询规划、数据工程、标注质检、数据产品运营和模型适配服务可以按全生命周期拆解为可售能力。",
    complianceImpact: "该指引是建设参考，不是统一补贴或自动准入承诺；项目交付仍需遵守行业主管部门和数据安全制度。",
    action: "用指引对现有数据项目做一次差距盘点，补齐数据治理、质量评价、运营责任和应用效果四类证据。",
  },
  {
    id: "bj-industry-high-quality-dataset-collection-2026",
    title: "北京市行业高质量数据集建设成果公开征集",
    issuer: "北京市政务服务和数据管理局",
    date: "2026-04-08",
    level: "北京市级",
    category: "供给征集",
    status: "滚动核验",
    sourceUrl: "https://banshi.beijing.gov.cn/zcjd/202604/t20260415_428575_qjd.html",
    entry: { label: "sjzyc@zwfwj.beijing.gov.cn", href: "mailto:sjzyc@zwfwj.beijing.gov.cn" },
    tags: ["资源目录", "典型案例", "需求清单"],
    summary: "北京公开征集行业高质量数据集资源、需求和典型案例，覆盖医疗、工业、城市治理、公共安全、具身智能等重点和创新领域。",
    supportDirection: "数据集资源、典型案例和需求信息三类成果；入选后可进入资源目录、需求清单，并择优推荐国家遴选。",
    eligibility: "申报单位需具备数据建设能力；资源和典型案例方向原则上提供不少于1000条样本数据，并满足数据安全合规要求。",
    businessImpact: "公司可作为数据集建设、治理、评测和场景集成服务方参与，也可协助行业客户把已有项目整理为可复用案例。",
    complianceImpact: "材料、样本和案例必须能说明数据来源、授权、质量、更新和安全责任；入选不等同于直接财政补贴。",
    action: "建立北京行业数据集客户清单，按资源、需求、典型案例三种方向分别准备样本、质量说明和盖章材料，申报批次以最新通知为准。",
  },
  {
    id: "bj-industrial-high-quality-dataset-demand-2026-batch2",
    title: "2026年第二批人工智能赋能新型工业化高质量数据集需求清单",
    issuer: "北京市经济和信息化局",
    date: "2026-04-30",
    level: "北京市级",
    category: "供给征集",
    status: "滚动核验",
    sourceUrl: "https://www.beijing.gov.cn/fuwu/lqfw/gggs/202604/t20260430_4626621.html",
    tags: ["工业数据", "65项需求", "建设单位"],
    summary: "北京发布第二批65个工业高质量数据集需求，面向符合条件的建设单位公开征集，重点支撑模型研发迭代和工业场景落地。",
    supportDirection: "工业制造领域数据采集、加工、标注、治理、质量评测、模型训练和场景应用。",
    eligibility: "建设单位应为在北京市注册的企业或新型研发机构，具备数据集建设所需的技术能力、人才团队和资金保障。",
    businessImpact: "工业软件、智能制造、云网集成、设备运维和数据治理团队可围绕具体需求与工厂、研究机构联合形成数据集建设项目。",
    complianceImpact: "需求清单不是统一补贴承诺；项目需核清需求方授权、工业数据安全、商业秘密、样本脱敏和后续运营责任。",
    action: "把65项需求按行业、数据类型和交付难度拆解，优先挑选已有客户和可提供样本的方向，等待下一批建设单位征集通知。",
  },
  {
    id: "bj-open-source-ecosystem-high-quality-dataset-2026",
    title: "北京市开源生态体系建设实施方案（2026—2028年）",
    issuer: "北京市经济和信息化局",
    date: "2026-05-07",
    level: "北京市级",
    category: "产业政策",
    status: "持续适用",
    sourceUrl: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202605/t20260507_4639888.html",
    tags: ["开源生态", "中文数据集", "具身智能"],
    summary: "北京提出开展高质量AI数据集征集，鼓励行业企业贡献中文数据集，推动具身智能、智能网联汽车、航空航天和生物医药等领域形成数据集。",
    supportDirection: "高质量中文数据集、标注库、数据清洗标注工具、质量验证工具和数据训练基地。",
    eligibility: "面向北京开源平台、行业企业、数据服务商和模型开发者，具体支持方式需以后续项目或配套通知为准。",
    businessImpact: "开源模型、数据标注工具、可信空间、具身智能和行业大模型客户将更重视数据集持续供给与社区协同。",
    complianceImpact: "开源不等于无权利边界；公开数据集仍需保留许可、来源、版本、风险和贡献者记录。",
    action: "为重点客户设计“数据集+工具+模型+场景”组合方案，优先积累可开源、可授权或可在可信空间流通的数据资产。",
  },
  {
    id: "bj-high-quality-dataset-policy-framework-signal-2026",
    title: "北京市关于加强高质量数据集建设提案答复",
    issuer: "北京市政务服务和数据管理局",
    date: "2026-09-04",
    level: "北京市级",
    category: "政策信号",
    status: "政策信号",
    sourceUrl: "https://zwfwj.beijing.gov.cn/zwgk/jyta/202609/t20260904_4850967.html",
    tags: ["制度保障", "数据产权", "标准评测"],
    summary: "答复提出以数据要素综合试验区、数据集资源建设、标准评测和产权制度为抓手，逐步形成高质量数据集政策支撑框架。",
    supportDirection: "制度试点、数据产权登记、资源建设、标准评测和数据要素市场化配置。",
    eligibility: "这是政策推进和工作答复，不是独立申报项目；适合用来判断北京市后续制度和项目方向。",
    businessImpact: "数据产权登记、标准评测、可信空间和行业数据运营会成为 AI 项目售前规划与合规交付的重要组成部分。",
    complianceImpact: "提案答复不构成金额、资格或开放入口承诺，不能直接作为申报依据。",
    action: "把答复中的制度方向与现有数据平台、数据治理和可信空间方案对照，持续跟踪正式实施细则和项目通知。",
  },
];

const datasetAdditionalPolicies: DatasetRelatedPolicy[] = [
  {
    id: "bj-industrial-dataset-demand-202601",
    title: "2026年第一批人工智能赋能新型工业化高质量数据集需求清单",
    issuer: "北京市经济和信息化局",
    date: "2026-01-07",
    level: "北京市级",
    status: "滚动核验",
    sourceUrl: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202601/t20260107_4407489.html",
    relation: "北京工业数据集需求与供需对接",
  },
  {
    id: "gz-ai-high-quality-dataset-2026",
    title: "广州市政务服务和数据管理局关于征集人工智能高质量数据集的通知",
    issuer: "广州市政务服务和数据管理局",
    date: "2026-05-20",
    level: "外省市",
    status: "滚动核验",
    sourceUrl: "https://zsj.gz.gov.cn/zwgk/tzgg/content/post_10818819.html",
    relation: "广州资源池、测评与供需对接",
  },
  {
    id: "js-high-quality-dataset-pilot-2026",
    title: "关于征集2026年江苏省高质量数据集建设先行先试项目的通知",
    issuer: "江苏省数据局",
    date: "2026-03-03",
    level: "外省市",
    status: "滚动核验",
    sourceUrl: "https://jszwb.jiangsu.gov.cn/art/2026/3/3/art_19390_11734809.html",
    relation: "江苏先行先试项目与常态化入库",
  },
  {
    id: "js-physical-ai-dataset-projects-2026",
    title: "物理AI与世界模型方向江苏省高质量数据集建设重点项目名单",
    issuer: "江苏省数据局",
    date: "2026-10-21",
    level: "外省市",
    status: "持续适用",
    sourceUrl: "https://jszwb.jiangsu.gov.cn/art/2026/10/21/art_71871_11845055.html",
    relation: "江苏物理AI、具身智能与世界模型数据集",
  },
  {
    id: "hb-industrial-high-quality-dataset-2026",
    title: "2026年湖北省工业高质量数据集和智能体评选结果公示",
    issuer: "湖北省经济和信息化厅",
    date: "2026-11-06",
    level: "外省市",
    status: "持续适用",
    sourceUrl: "https://jxt.hubei.gov.cn/fbjd/zc/qtzdgkwj/gsgg/202611/t20261106_6072089.shtml",
    relation: "湖北工业数据集与智能体典型项目",
  },
  {
    id: "gd-manufacturing-ai-dataset-cases-2026",
    title: "广东省制造业领域人工智能高质量数据集、行业大模型及智能体典型案例征集",
    issuer: "广东省工业和信息化厅（广州转发）",
    date: "2026-09-01",
    level: "外省市",
    status: "滚动核验",
    sourceUrl: "https://gxj.gz.gov.cn/yw/tzgg/content/post_10968599.html",
    relation: "广东制造业数据集与模型/智能体案例",
  },
  {
    id: "hn-ai-dataset-agent-cases-2026",
    title: "湖南省人工智能高质量行业数据集、语料库、智能体典型案例征集",
    issuer: "湖南省人民政府门户网站",
    date: "2026-08-10",
    level: "外省市",
    status: "滚动核验",
    sourceUrl: "https://www.hunan.gov.cn/zqt/xmsb/202608/t20260810_34042693.html",
    relation: "湖南行业数据集、语料库与智能体案例",
  },
];

const datasetKeywordRelations: Array<[RegExp, string]> = [
  [/高质量数据集|行业数据集|训练数据|语料|数据标注/, "数据集/语料直接相关"],
  [/可信数据空间|数据产权|科学数据|数据资源|数据产品/, "数据资产与流通配套"],
  [/数据要素|数据券/, "数据要素与采购支持"],
];

function datasetRelation(record: unknown) {
  const text = JSON.stringify(record);
  return datasetKeywordRelations.find(([pattern]) => pattern.test(text))?.[1] ?? "数据集应用关联";
}

const coreDatasetUrls = new Set(datasetPolicies.map((item) => item.sourceUrl));
const relatedPolicyMap = new Map<string, DatasetRelatedPolicy>();
for (const item of datasetAdditionalPolicies) relatedPolicyMap.set(item.id, item);
for (const group of policyGroups) {
  for (const policy of group.policies) {
    if (!policy.href || coreDatasetUrls.has(policy.href)) continue;
    if (!datasetKeywordRelations.some(([pattern]) => pattern.test(JSON.stringify(policy)))) continue;
    relatedPolicyMap.set(policy.id, {
      id: policy.id,
      title: policy.title,
      issuer: policy.issuer,
      date: policy.date,
      level: group.id === "national" ? "国家" : group.id === "beijing" ? "北京市级" : group.id === "districts" ? "北京各区" : "外省市",
      status: policy.status,
      sourceUrl: policy.href,
      relation: datasetRelation(policy),
    });
  }
}

export const datasetRelatedPolicies = Array.from(relatedPolicyMap.values()).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

export const datasetSubsidies = subsidyPolicies.filter((item) => /数据集|语料|可信数据空间|数据资源|数据产品|数据券/.test(JSON.stringify(item)));

export const datasetMetrics = {
  total: datasetPolicies.length,
  related: datasetRelatedPolicies.length,
  subsidies: datasetSubsidies.length,
  combined: datasetPolicies.length + datasetRelatedPolicies.length + datasetSubsidies.length,
  national: datasetPolicies.filter((item) => item.level === "国家").length,
  beijing: datasetPolicies.filter((item) => item.level === "北京市级").length,
  active: datasetPolicies.filter((item) => item.status === "持续适用").length,
  rolling: datasetPolicies.filter((item) => item.status === "滚动核验").length,
};
