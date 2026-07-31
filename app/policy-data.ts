export type PolicyBase = {
  title: string;
  issuer: string;
  date: string;
  themes: string;
  href?: string;
  status: "持续适用" | "滚动核验" | "待回核";
};

export type Policy = PolicyBase & {
  id: string;
};

export type PolicyValidity = "现行有效" | "滚动事项" | "待核实" | "已截止" | "已废止" | "被替代";

export type OpportunityLevel = "高" | "中" | "观察";

export type RelatedPolicy = {
  type: "上位依据" | "配套细则" | "同主题";
  policyId: string;
};

export type PolicyAnalysis = {
  validity: PolicyValidity;
  opportunityLevel: OpportunityLevel;
  judgement: string;
  customerTypes: string[];
  scenarios: string[];
  relatedPolicies: RelatedPolicy[];
  analysisBasis: "官方事实 + 业务研判";
};

export type PolicyWithBrief = Policy & PolicyAnalysis & {
  summary: string;
  businessImpact: string;
  complianceImpact: string;
  action: string;
};

export type PolicyGroup = { id: "national" | "beijing" | "districts"; title: string; note: string; policies: PolicyWithBrief[] };

const policyGroupsBase = [
  {
    id: "national" as const,
    title: "国家部委（20 项）",
    note: "与北京企业机会、合规或基础设施直接相关的国家政策基线。",
    policies: [
      { title: "2026年工业和信息化领域创新任务揭榜挂帅工作通知", issuer: "工信部等七部门", date: "2026-07-29", themes: "AI / 大模型", status: "待回核" },
      { title: "第二批央企AI战略性高价值场景和行业高质量数据集", issuer: "国务院国资委", date: "2026-07-27", themes: "AI / 数据", status: "待回核" },
      { title: "智能体互信互联互操作全球合作倡议", issuer: "国家网信办", date: "2026-07-26", themes: "AI", href: "https://www.cac.gov.cn/", status: "待回核" },
      { title: "手机端侧生成式人工智能服务已备案信息公告（7款）", issuer: "国家网信办", date: "2026-07", themes: "大模型", href: "https://www.cac.gov.cn/", status: "待回核" },
      { title: "关于推动互联网基础资源高质量发展的指导意见", issuer: "工信部、中央网信办、国家发改委、国家数据局", date: "2026-07-13", themes: "AI / 算力 / 数据", href: "https://www.miit.gov.cn/zwgk/zcwj/wjfb/yj/art/2026/art_fefdddaaa4ac49edb130c85d048a2933.html", status: "持续适用" },
      { title: "生成式AI服务已备案信息公告（2026年5—6月）", issuer: "国家网信办", date: "2026-07-10", themes: "大模型", href: "https://www.cac.gov.cn/2026-07/10/c_1785427810632554.htm", status: "滚动核验" },
      { title: "数据产权登记工作指引（试行）", issuer: "国家数据局", date: "2026-07-01", themes: "数据", href: "https://www.nda.gov.cn/sjj/zwgk/zcfb/0704/20260703230745065425855_pc.html", status: "持续适用" },
      { title: "《人工智能 智能体互联》系列7项国家标准", issuer: "国家市场监管总局、国家标准委", date: "2026-06-26", themes: "AI / 大模型", href: "https://www.gov.cn/lianbo/202606/content_7073465.htm", status: "持续适用" },
      { title: "“人工智能+信息通信”创新发展实施意见（2026—2028年）", issuer: "工信部", date: "2026-06-03", themes: "AI", href: "https://www.gov.cn/zhengce/zhengceku/202606/content_7071755.htm", status: "持续适用" },
      { title: "关于推进行业高质量数据集建设行动的实施方案", issuer: "国家数据局", date: "2026-06-03", themes: "AI / 数据", href: "https://www.nda.gov.cn/sjj/zwgk/tzgg/0608/20260608172117399715004_pc.html", status: "持续适用" },
      { title: "2026年数字经济发展工作要点", issuer: "国家数据局", date: "2026-05-19", themes: "AI / 数据", href: "https://www.nda.gov.cn/sjj/ywpd/szjj/0519/20260519194643007508935_pc.html", status: "持续适用" },
      { title: "生成式AI服务已备案信息公告（2026年3—4月）", issuer: "国家网信办", date: "2026-05-13", themes: "大模型", href: "https://www.cac.gov.cn/2026-05/13/c_1780413225190669.htm", status: "滚动核验" },
      { title: "智能体规范应用与创新发展实施意见", issuer: "国家网信办、国家发改委、工信部", date: "2026-05-08", themes: "AI", href: "https://www.cac.gov.cn/2026-05/08/c_1779979789523320.htm", status: "持续适用" },
      { title: "关于举办2026年“数据要素×”大赛的通知", issuer: "国家数据局等20部门", date: "2026-04-27", themes: "数据", href: "https://www.nda.gov.cn/sjj/zwgk/tzgg/0427/20260427215820802616908_pc.html", status: "滚动核验" },
      { title: "人工智能拟人化互动服务管理暂行办法", issuer: "网信办等五部门", date: "2026-04-10", themes: "AI / 大模型", href: "https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm", status: "持续适用" },
      { title: "关于促进人工智能与能源双向赋能的行动方案", issuer: "国家发改委等", date: "2026-04-08", themes: "AI / 算力 / 数据", href: "https://www.gov.cn/zhengce/zhengceku/202605/content_7068153.htm", status: "持续适用" },
      { title: "关于开展普惠算力赋能中小企业发展专项行动的通知", issuer: "工信部办公厅", date: "2026-03-27", themes: "算力", href: "https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2026/art_58259bfb30924d6bb225b82b66d1008d.html", status: "持续适用" },
      { title: "人工智能科技伦理审查与服务办法（试行）", issuer: "工信部等十部门", date: "2026-03-20", themes: "AI", href: "https://www.miit.gov.cn/jgsj/kjs/wjfb/art/2026/art_2995f16b28504ddcbb604e918eb15759.html", status: "持续适用" },
      { title: "关于组织开展国家算力互联互通节点建设工作的通知", issuer: "工信部办公厅", date: "2026-01-27", themes: "算力", href: "https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2026/art_1e5f954ec70a44499acf63655c34b35e.html", status: "持续适用" },
      { title: "“人工智能+制造”专项行动实施意见", issuer: "工信部等八部门", date: "2026-01-07", themes: "AI", href: "https://www.gov.cn/zhengce/zhengceku/202601/content_7054201.htm", status: "持续适用" },
    ],
  },
  {
    id: "beijing" as const,
    title: "北京市级（12 项）",
    note: "北京本市的政策、实施方案及可与企业行动直接关联的兑现机制。",
    policies: [
      { title: "北京市关于加快智能体引领发展的若干措施", issuer: "市发改委等四部门", date: "2026-07-23", themes: "AI / 大模型 / 算力 / 数据", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html", status: "持续适用" },
      { title: "北京市公共数据资源授权运营管理办法", issuer: "北京市政数局", date: "2026-07-02", themes: "数据", href: "https://zwfwj.beijing.gov.cn/zwgk/2024zcwj/202607/t20260707_4750937.html", status: "持续适用" },
      { title: "2026智慧城市场景创新需求（第四批）及智慧教育专项揭榜", issuer: "北京市政数局", date: "2026-06-30", themes: "AI / 数据", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260701_4742201.html", status: "滚动核验" },
      { title: "2026年第三批AI赋能新型工业化高质量数据集需求清单", issuer: "北京市经信局", date: "2026-06-30", themes: "AI / 数据", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202606/t20260630_4739968.html", status: "滚动核验" },
      { title: "推动高精尖产业深化产教融合行动方案（2026—2028年）", issuer: "北京市经信局、市教委", date: "2026-06-29", themes: "AI", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202607/t20260703_4744989.html", status: "持续适用" },
      { title: "支持人工智能OPC创新发展行动方案（试行）", issuer: "北京市经信局", date: "2026-06-17", themes: "AI / 大模型 / 算力 / 数据", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202606/t20260622_4710194.html", status: "持续适用" },
      { title: "北京市AI赋能工业互联网高质量发展实施方案（2026—2028年）", issuer: "北京市经信局", date: "2026-05-10", themes: "AI / 大模型 / 算力 / 数据", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202605/t20260513_4649243.html", status: "持续适用" },
      { title: "北京市智能眼镜产业高质量发展行动方案（2026—2030年）", issuer: "北京市经信局", date: "2026-04-01", themes: "AI / 大模型", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202604/t20260403_4574651.html", status: "持续适用" },
      { title: "北京市2026年推动经济稳中有进的若干措施", issuer: "北京市政府办公厅", date: "2026-03-09", themes: "AI / 算力 / 数据", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202603/t20260318_4560553.html", status: "持续适用" },
      { title: "2026年高精尖产业发展项目资金实施指南（第一批）", issuer: "北京市经信局、市财政局", date: "2026-02-14", themes: "AI / 大模型 / 算力 / 数据", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202602/t20260214_4516700.html", status: "滚动核验" },
      { title: "促进商业卫星遥感数据资源开发利用的若干措施（2026—2030年）", issuer: "北京市经信局等", date: "2026-01-23", themes: "数据", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202601/t20260123_4459532.html", status: "持续适用" },
      { title: "北京人工智能创新高地建设行动计划", issuer: "北京市经信局等", date: "2026-01-05", themes: "AI / 算力", href: "https://jxj.beijing.gov.cn/ztzl/ywzt/hbjh/hbdt/zcwj/rgznzc/202603/t20260316_4557526.html", status: "持续适用" },
    ],
  },
  {
    id: "districts" as const,
    title: "北京各区（4 项）",
    note: "区级支持政策应结合注册地、项目落地地和当期申报要求使用。",
    policies: [
      { title: "通州区：支持数字经济高质量发展的若干措施", issuer: "通州区经信局", date: "2026-06-22", themes: "AI / 算力 / 数据", href: "https://www.bjtzh.gov.cn/bjtz/xxfb/202606/1792651.shtml", status: "持续适用" },
      { title: "昌平区：推动“人工智能+”创新发展行动计划（2026—2028年）", issuer: "昌平区政府办", date: "2026-04-27", themes: "AI", href: "https://www.bjchp.gov.cn/cpqzf/xxgk2671/zcwj/2026042815575798679/index.html", status: "持续适用" },
      { title: "海淀区：关于全面打造OPC创业生态的若干措施", issuer: "中关村科学城管委会", date: "2026-04-08", themes: "AI / 大模型", href: "https://zyk.bjhd.gov.cn/zwdt/zcwj/202604/t20260414_4811721.shtml", status: "持续适用" },
      { title: "北京经开区：进一步加快建设全域人工智能之城实施方案（2026—2027年）", issuer: "北京经开区管委会", date: "2026-01-29", themes: "AI / 大模型 / 算力 / 数据", href: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202601/t20260130_4478660.html", status: "持续适用" },
    ],
  },
];

const tailoredBriefs: Record<string, Pick<PolicyWithBrief, "summary" | "businessImpact" | "complianceImpact" | "action">> = {
  "北京市关于加快智能体引领发展的若干措施": { summary: "围绕基础模型、智能体原生应用、Token 经济、算力保障和安全治理推出十项措施。", businessImpact: "可关注智能体场景、Token 服务、算力券及重点项目支持。", complianceImpact: "智能体分级分类监管仍在探索，补贴和揭榜以配套通知为准。", action: "梳理智能体产品、算力和场景项目，跟进后续揭榜及券类细则。" },
  "北京市公共数据资源授权运营管理办法": { summary: "明确公共数据整体授权、授权期限、定价和收益分配的管理框架。", businessImpact: "可信数据空间、北数所交易及公共数据应用成为可进入的合作方向。", complianceImpact: "须符合授权协议、使用范围和数据安全要求。", action: "评估可申请的数据场景及授权运营合作路径。" },
  "支持人工智能OPC创新发展行动方案（试行）": { summary: "支持 AI 一人公司社区建设，并配置 Token、算力和数据券等创业支持。", businessImpact: "OPC 企业可关注社区入驻、券类支持、融资和路演机会。", complianceImpact: "支持对象、额度和兑现条件以当期申报要求为准。", action: "核对企业身份与入驻资格，准备产品和融资材料。" },
  "北京市AI赋能工业互联网高质量发展实施方案（2026—2028年）": { summary: "提出工业高质量数据集、工业智能体和解决方案供应商的建设目标。", businessImpact: "行业模型、智能体和软件智能化项目可争取相关支持。", complianceImpact: "项目需满足工业场景、数据质量和验收要求。", action: "围绕制造业客户形成可验收的数据集或智能体方案。" },
  "2026年高精尖产业发展项目资金实施指南（第一批）": { summary: "明确算力券、模型、软件智能化和服务券等资金支持方向。", businessImpact: "可按机构、行业模型、开源和备案模型等路径匹配资助。", complianceImpact: "该类指南具有批次与截止期，须以当期申报通知为准。", action: "核对申报主体、备案情况和项目材料，持续跟踪下一批指南。" },
  "北京经开区：进一步加快建设全域人工智能之城实施方案（2026—2027年）": { summary: "提出建设全域人工智能之城，覆盖企业集聚、开发者、Token 和 OPC 生态。", businessImpact: "经开区落地企业可关注模型券、社区和产业场景机会。", complianceImpact: "需结合注册地、项目落地和区级具体兑现规则判断。", action: "评估亦庄落地可行性，并对接对应园区和场景资源。" },
};

const policyIds: Record<string, string> = {
  "2026年工业和信息化领域创新任务揭榜挂帅工作通知": "nat-2026-innovation-challenge",
  "第二批央企AI战略性高价值场景和行业高质量数据集": "nat-2026-soe-ai-scenarios",
  "智能体互信互联互操作全球合作倡议": "nat-agent-interoperability",
  "手机端侧生成式人工智能服务已备案信息公告（7款）": "nat-mobile-genai-filing-202607",
  "关于推动互联网基础资源高质量发展的指导意见": "nat-internet-infrastructure",
  "生成式AI服务已备案信息公告（2026年5—6月）": "nat-genai-filing-20260506",
  "数据产权登记工作指引（试行）": "nat-data-property-registration",
  "《人工智能 智能体互联》系列7项国家标准": "nat-agent-standards",
  "“人工智能+信息通信”创新发展实施意见（2026—2028年）": "nat-ai-telecom-2026",
  "关于推进行业高质量数据集建设行动的实施方案": "nat-industry-datasets",
  "2026年数字经济发展工作要点": "nat-digital-economy-2026",
  "生成式AI服务已备案信息公告（2026年3—4月）": "nat-genai-filing-20260304",
  "智能体规范应用与创新发展实施意见": "nat-agent-development",
  "关于举办2026年“数据要素×”大赛的通知": "nat-data-factor-contest-2026",
  "人工智能拟人化互动服务管理暂行办法": "nat-anthropomorphic-ai",
  "关于促进人工智能与能源双向赋能的行动方案": "nat-ai-energy",
  "关于开展普惠算力赋能中小企业发展专项行动的通知": "nat-inclusive-compute-sme",
  "人工智能科技伦理审查与服务办法（试行）": "nat-ai-ethics-review",
  "关于组织开展国家算力互联互通节点建设工作的通知": "nat-compute-interconnection",
  "“人工智能+制造”专项行动实施意见": "nat-ai-manufacturing",
  "北京市关于加快智能体引领发展的若干措施": "bj-agent-measures",
  "北京市公共数据资源授权运营管理办法": "bj-public-data-operation",
  "2026智慧城市场景创新需求（第四批）及智慧教育专项揭榜": "bj-smart-city-demand-202604",
  "2026年第三批AI赋能新型工业化高质量数据集需求清单": "bj-industrial-dataset-demand-202603",
  "推动高精尖产业深化产教融合行动方案（2026—2028年）": "bj-industry-education-2026",
  "支持人工智能OPC创新发展行动方案（试行）": "bj-ai-opc",
  "北京市AI赋能工业互联网高质量发展实施方案（2026—2028年）": "bj-ai-industrial-internet",
  "北京市智能眼镜产业高质量发展行动方案（2026—2030年）": "bj-smart-glasses",
  "北京市2026年推动经济稳中有进的若干措施": "bj-economic-measures-2026",
  "2026年高精尖产业发展项目资金实施指南（第一批）": "bj-high-tech-fund-202601",
  "促进商业卫星遥感数据资源开发利用的若干措施（2026—2030年）": "bj-satellite-data",
  "北京人工智能创新高地建设行动计划": "bj-ai-innovation-highland",
  "通州区：支持数字经济高质量发展的若干措施": "dist-tongzhou-digital-economy",
  "昌平区：推动“人工智能+”创新发展行动计划（2026—2028年）": "dist-changping-ai-plus",
  "海淀区：关于全面打造OPC创业生态的若干措施": "dist-haidian-opc",
  "北京经开区：进一步加快建设全域人工智能之城实施方案（2026—2027年）": "dist-etown-ai-city",
};

const themeCustomers: Record<string, string[]> = {
  AI: ["大模型与智能体企业", "央国企与大型企业数字化部门"],
  大模型: ["大模型与智能体企业", "AI 创业公司与 OPC"],
  算力: ["云服务与算力运营商", "芯片、服务器与数据中心企业"],
  数据: ["数据服务与数据运营机构", "网络安全、数据治理与模型评测机构"],
};

const themeScenarios: Record<string, string> = {
  AI: "人工智能产品与行业应用",
  大模型: "大模型、智能体与生成式 AI 服务",
  算力: "智算基础设施与算力服务",
  数据: "数据集建设、授权运营与数据治理",
};

const tailoredAnalysis: Record<string, Partial<PolicyAnalysis>> = {
  "bj-agent-measures": {
    opportunityLevel: "高",
    judgement: "北京市级智能体支持主线已形成，场景、Token、算力和安全治理值得优先跟进。",
    customerTypes: ["大模型与智能体企业", "AI 创业公司与 OPC", "云服务与算力运营商", "央国企与大型企业数字化部门"],
    scenarios: ["智能体原生应用", "Token 与算力服务", "标杆场景建设"],
    relatedPolicies: [
      { type: "同主题", policyId: "bj-ai-opc" },
      { type: "配套细则", policyId: "bj-high-tech-fund-202601" },
      { type: "同主题", policyId: "nat-agent-development" },
    ],
  },
  "bj-public-data-operation": {
    opportunityLevel: "高",
    judgement: "公共数据授权运营进入制度化阶段，数据产品、可信空间和安全治理存在合作机会。",
    customerTypes: ["数据服务与数据运营机构", "网络安全、数据治理与模型评测机构", "央国企与大型企业数字化部门"],
    scenarios: ["公共数据授权运营", "可信数据空间", "数据产品开发与交易"],
    relatedPolicies: [
      { type: "同主题", policyId: "nat-data-property-registration" },
      { type: "同主题", policyId: "bj-satellite-data" },
    ],
  },
  "bj-ai-opc": {
    opportunityLevel: "高",
    judgement: "OPC 支持体系覆盖社区、Token、算力和融资，适合轻量化 AI 创业主体重点跟进。",
    customerTypes: ["AI 创业公司与 OPC", "大模型与智能体企业", "园区、科研机构和高校"],
    scenarios: ["OPC 社区入驻", "模型与智能体创业", "Token、算力及融资支持"],
    relatedPolicies: [
      { type: "上位依据", policyId: "bj-agent-measures" },
      { type: "同主题", policyId: "dist-haidian-opc" },
      { type: "同主题", policyId: "dist-etown-ai-city" },
    ],
  },
  "bj-ai-industrial-internet": {
    opportunityLevel: "高",
    judgement: "工业数据集、工业智能体和软件智能化形成组合机会，制造业客户项目化需求较明确。",
    customerTypes: ["制造业行业客户", "央国企与大型企业数字化部门", "数据服务与数据运营机构", "大模型与智能体企业"],
    scenarios: ["工业高质量数据集", "工业智能体", "工业软件智能化"],
    relatedPolicies: [
      { type: "上位依据", policyId: "nat-ai-manufacturing" },
      { type: "配套细则", policyId: "bj-industrial-dataset-demand-202603" },
    ],
  },
  "bj-high-tech-fund-202601": {
    opportunityLevel: "高",
    judgement: "资金指南直接连接算力、模型和软件项目，但批次与申报窗口必须持续核验。",
    customerTypes: ["大模型与智能体企业", "云服务与算力运营商", "软件与信息服务企业", "AI 创业公司与 OPC"],
    scenarios: ["算力券与服务券", "行业模型项目", "软件智能化项目"],
    relatedPolicies: [
      { type: "上位依据", policyId: "bj-agent-measures" },
      { type: "同主题", policyId: "bj-ai-innovation-highland" },
    ],
  },
  "dist-etown-ai-city": {
    opportunityLevel: "高",
    judgement: "经开区提供企业落地、模型与 Token 生态组合支持，适合评估属地化项目机会。",
    customerTypes: ["AI 创业公司与 OPC", "大模型与智能体企业", "云服务与算力运营商", "园区、科研机构和高校"],
    scenarios: ["企业落地与园区合作", "模型与 Token 服务", "产业场景开放"],
    relatedPolicies: [
      { type: "同主题", policyId: "bj-agent-measures" },
      { type: "同主题", policyId: "bj-ai-opc" },
    ],
  },
  "nat-anthropomorphic-ai": {
    opportunityLevel: "观察",
    judgement: "拟人化互动服务面临专门合规约束，产品设计、内容安全和用户保护需要优先核对。",
    customerTypes: ["大模型与智能体企业", "网络安全、数据治理与模型评测机构"],
    scenarios: ["拟人化智能体服务", "内容安全与用户保护"],
    relatedPolicies: [{ type: "同主题", policyId: "nat-agent-development" }],
  },
  "nat-ai-ethics-review": {
    opportunityLevel: "观察",
    judgement: "人工智能研发与应用项目需要关注科技伦理审查合规，尤其是高风险或敏感场景。",
    customerTypes: ["大模型与智能体企业", "园区、科研机构和高校", "网络安全、数据治理与模型评测机构"],
    scenarios: ["人工智能伦理审查", "高风险应用治理"],
    relatedPolicies: [{ type: "同主题", policyId: "nat-anthropomorphic-ai" }],
  },
};

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function mapValidity(status: PolicyBase["status"]): PolicyValidity {
  if (status === "待回核") return "待核实";
  if (status === "滚动核验") return "滚动事项";
  return "现行有效";
}

function addAnalysis(policy: Policy): PolicyAnalysis {
  const themes = policy.themes.split(" / ");
  const pending = policy.status === "待回核";
  const fallback: PolicyAnalysis = {
    validity: mapValidity(policy.status),
    opportunityLevel: pending ? "观察" : "中",
    judgement: pending
      ? "原文仍待精确回核，当前只作为政策线索观察。"
      : `该政策对${themes.join("、")}相关产品、项目或治理工作具有持续影响。`,
    customerTypes: unique(themes.flatMap((theme) => themeCustomers[theme] ?? [])).slice(0, 4),
    scenarios: unique(themes.map((theme) => themeScenarios[theme]).filter(Boolean)).slice(0, 3),
    relatedPolicies: [],
    analysisBasis: "官方事实 + 业务研判",
  };
  return { ...fallback, ...tailoredAnalysis[policy.id] };
}

function addBrief(policyBase: PolicyBase): PolicyWithBrief {
  const id = policyIds[policyBase.title];
  if (!id) throw new Error(`Missing stable policy ID: ${policyBase.title}`);
  const policy: Policy = { ...policyBase, id };
  const fallback = {
    summary: `${policy.title}明确了${policy.themes}领域的相关工作安排与支持方向。`,
    businessImpact: `企业可结合自身产品、场景或数据能力关注${policy.themes}相关机会。`,
    complianceImpact: policy.status === "待回核" ? "原文链接尚待精确回核，暂不应据此作出申报或合规判断。" : policy.status === "滚动核验" ? "公告、指南或征集事项会随批次变化，应以最新官方通知为准。" : "落实时仍应以正式原文、实施细则和当期通知为准。",
    action: policy.status === "待回核" ? "先完成官方原文回核，再评估适用性。" : "核对自身主体资格与业务关联，持续关注配套细则。",
  };
  return { ...policy, ...fallback, ...tailoredBriefs[policy.title], ...addAnalysis(policy) };
}

export const policyGroups: PolicyGroup[] = policyGroupsBase.map((group) => ({ ...group, policies: group.policies.map(addBrief) }));

export const allPolicies = policyGroups.flatMap((group) => group.policies);

export function getPolicyById(id: string) {
  return allPolicies.find((policy) => policy.id === id);
}

export const policyMetrics = {
  highOpportunity: allPolicies.filter((policy) => policy.opportunityLevel === "高").length,
  complianceAttention: allPolicies.filter((policy) => policy.judgement.includes("合规")).length,
  pendingVerification: allPolicies.filter((policy) => policy.validity === "待核实").length,
  rollingVerification: allPolicies.filter((policy) => policy.validity === "滚动事项").length,
};

export type WeeklyChange = { title: string; changeType: "新增" | "修订" | "截止" | "移出"; date: string; detail: string; href?: string; status: Policy["status"] };

export const weeklyChanges: WeeklyChange[] = [
  { title: "北京市关于加快智能体引领发展的若干措施", changeType: "新增", date: "2026-07-23", detail: "智能体、Token 经济、算力保障与场景支持成为北京市级政策重点。", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html", status: "持续适用" },
];
