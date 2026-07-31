import { allPolicies, policyGroups, type PolicyWithBrief } from "./policy-data.ts";

export type LeadershipSignal = {
  title: string;
  signal: string;
  managementMeaning: string;
  policyIds: string[];
};

type ClientPlaybookConfig = {
  id: string;
  label: string;
  policyIds: string[];
  possibleNeeds: string[];
  conversationStarter: string;
  discoveryQuestions: [string, string];
  nextStep: string;
};

export type ClientPlaybook = Omit<ClientPlaybookConfig, "policyIds"> & {
  policies: PolicyWithBrief[];
};

const policyMap = new Map(allPolicies.map((policy) => [policy.id, policy]));

function resolvePolicies(ids: string[]): PolicyWithBrief[] {
  return ids.map((id) => {
    const policy = policyMap.get(id);
    if (!policy) throw new Error(`Unknown audience policy reference: ${id}`);
    return policy;
  });
}

export function policyHref(policyId: string): string {
  const group = policyGroups.find((item) => item.policies.some((policy) => policy.id === policyId));
  if (!group) throw new Error(`Unknown policy link: ${policyId}`);
  return `/${group.id}#${policyId}`;
}

export const leadershipSignals: LeadershipSignal[] = [
  {
    title: "智能体成为北京 AI 政策主线",
    signal: "北京市政策已从基础模型能力进一步延伸到智能体应用、Token、算力、场景和安全治理。",
    managementMeaning: "应把智能体从单一产品方向提升为场景、算力、数据和治理协同推进的专项。",
    policyIds: ["bj-agent-measures", "bj-ai-opc", "nat-agent-development"],
  },
  {
    title: "行业数据集与公共数据进入落地阶段",
    signal: "国家和北京同步推动高质量数据集、公共数据授权运营及数据产权机制。",
    managementMeaning: "可围绕行业客户的数据治理、数据集建设、授权运营和可信流通形成机会清单。",
    policyIds: ["nat-industry-datasets", "bj-public-data-operation", "bj-industrial-dataset-demand-202603"],
  },
  {
    title: "政策机会与合规要求同步增强",
    signal: "算力、场景和资金支持持续推进，同时备案、伦理审查和拟人化服务治理要求更加具体。",
    managementMeaning: "业务推进需要把申报核验、模型备案、伦理和内容安全纳入同一项目检查表。",
    policyIds: ["bj-high-tech-fund-202601", "nat-ai-ethics-review", "nat-anthropomorphic-ai"],
  },
];

export const managementActions = [
  "建立智能体与行业场景专项跟踪，明确重点客户、场景和政策窗口。",
  "围绕算力、高质量数据集和公共数据运营形成可持续更新的机会清单。",
  "对备案、伦理、安全和滚动申报事项设置月度复核机制。",
];

export const leadershipPriorityPolicies = allPolicies
  .filter((policy) => policy.opportunityLevel === "高")
  .slice(0, 5);

export const leadershipRiskPolicies = allPolicies
  .filter((policy) => policy.judgement.includes("合规") || policy.validity === "待核实" || policy.validity === "滚动事项")
  .slice(0, 5);

export const themeMetrics = Object.fromEntries(
  ["AI", "大模型", "算力", "数据"].map((theme) => [
    theme,
    allPolicies.filter((policy) => policy.themes.split(" / ").includes(theme)).length,
  ]),
) as Record<"AI" | "大模型" | "算力" | "数据", number>;

const sharedNextStep = "核对关联政策原文，确认客户现状与属地条件，再形成场景或申报跟踪清单。";

const clientPlaybookConfigs: ClientPlaybookConfig[] = [
  {
    id: "enterprise",
    label: "央国企及大型企业数字化部门",
    policyIds: ["nat-2026-soe-ai-scenarios", "nat-ai-manufacturing", "bj-ai-industrial-internet", "bj-public-data-operation"],
    possibleNeeds: ["高价值 AI 场景规划", "行业数据集与数据治理", "企业智能体及安全治理"],
    conversationStarter: "近期政策正在推动央企高价值 AI 场景和行业数据集建设，可以结合现有数字化基础判断哪些场景最适合先形成示范。",
    discoveryQuestions: ["目前最希望通过 AI 改造的业务环节是什么？", "现有数据是否已经具备统一标准、授权和质量管理机制？"],
    nextStep: sharedNextStep,
  },
  {
    id: "model-agent",
    label: "大模型与智能体企业",
    policyIds: ["bj-agent-measures", "nat-agent-development", "nat-genai-filing-20260506", "nat-anthropomorphic-ai"],
    possibleNeeds: ["智能体产品与标杆场景", "备案和安全治理", "Token、算力及生态合作"],
    conversationStarter: "北京正在把智能体应用、Token、算力和安全治理放在同一政策框架下，可以一起梳理产品目前最需要补强的环节。",
    discoveryQuestions: ["当前产品处于模型、智能体平台还是行业应用阶段？", "备案、内容安全和用户保护目前由哪个团队负责？"],
    nextStep: sharedNextStep,
  },
  {
    id: "opc",
    label: "AI 创业公司与 OPC",
    policyIds: ["bj-ai-opc", "dist-haidian-opc", "dist-etown-ai-city", "bj-high-tech-fund-202601"],
    possibleNeeds: ["社区与园区入驻", "算力和 Token 支持", "场景、融资与申报"],
    conversationStarter: "北京和重点区正在形成 OPC 社区、算力、Token 和场景支持组合，可以先判断企业适合哪种属地和支持路径。",
    discoveryQuestions: ["企业当前最缺的是算力、场景、客户还是融资资源？", "注册地和主要研发办公地是否有调整空间？"],
    nextStep: sharedNextStep,
  },
  {
    id: "compute",
    label: "云、算力、芯片与数据中心企业",
    policyIds: ["nat-inclusive-compute-sme", "nat-compute-interconnection", "nat-internet-infrastructure", "bj-agent-measures"],
    possibleNeeds: ["普惠算力产品", "算力互联与调度", "智能体和中小企业算力场景"],
    conversationStarter: "国家正在推进普惠算力和算力互联，北京智能体政策也提出算力保障，可以讨论现有资源如何形成更可用的场景化服务。",
    discoveryQuestions: ["当前算力资源主要面向训练、推理还是通用云服务？", "是否已有面向中小企业或智能体客户的标准化产品？"],
    nextStep: sharedNextStep,
  },
  {
    id: "data",
    label: "数据服务、数据运营与安全治理机构",
    policyIds: ["bj-public-data-operation", "nat-data-property-registration", "nat-industry-datasets", "bj-satellite-data"],
    possibleNeeds: ["公共数据授权运营", "数据产权与产品化", "高质量数据集和可信流通"],
    conversationStarter: "公共数据授权运营、数据产权和高质量数据集政策正在形成组合，可以从现有数据资产和行业场景判断合作切入口。",
    discoveryQuestions: ["目前最具产品化价值的数据资源来自哪些行业或场景？", "数据授权、质量、安全和收益分配机制是否已经建立？"],
    nextStep: sharedNextStep,
  },
  {
    id: "manufacturing",
    label: "制造业及行业客户",
    policyIds: ["nat-ai-manufacturing", "bj-ai-industrial-internet", "bj-industrial-dataset-demand-202603", "nat-industry-datasets"],
    possibleNeeds: ["工业高质量数据集", "工业智能体", "软件智能化和场景改造"],
    conversationStarter: "国家和北京都在推动 AI+制造、工业智能体和高质量数据集，可以从生产、质检、设备和供应链场景中选择一个可验证的切口。",
    discoveryQuestions: ["哪个生产或运营环节的效率问题最突出？", "该场景所需数据能否持续获取并形成统一质量标准？"],
    nextStep: sharedNextStep,
  },
  {
    id: "park-research",
    label: "园区、科研机构和高校",
    policyIds: ["bj-industry-education-2026", "dist-changping-ai-plus", "dist-etown-ai-city", "nat-ai-ethics-review"],
    possibleNeeds: ["产教融合和成果转化", "区域 AI 生态与企业集聚", "科研项目伦理和场景开放"],
    conversationStarter: "北京各区正在通过产教融合、园区生态和场景开放推动 AI 落地，可以结合现有科研和企业资源设计可持续的合作机制。",
    discoveryQuestions: ["当前最希望引入哪类 AI 企业或科研成果？", "园区是否已有可开放的数据、算力或行业场景？"],
    nextStep: sharedNextStep,
  },
];

export const clientPlaybooks: ClientPlaybook[] = clientPlaybookConfigs.map(({ policyIds, ...playbook }) => ({
  ...playbook,
  policies: resolvePolicies(policyIds),
}));
