export type SubsidyStatus =
  | "open"
  | "closing_soon"
  | "closed"
  | "rolling"
  | "effective_no_round"
  | "pending_verification";

export type SubsidyPolicy = {
  id: string;
  name: string;
  level: "市级" | "区级";
  district: string;
  issuer: string;
  policyType: "算力券" | "模型券/Token券" | "数据券" | "备案奖励" | "场景补贴" | "OPC/人才" | "综合支持";
  themes: string[];
  status: SubsidyStatus;
  changeType: "新增" | "修订" | "截止" | "移出";
  effectiveFrom?: string;
  effectiveTo?: string;
  applicationWindow?: string;
  deadline?: string;
  amount: string;
  supportDirection: string[];
  eligibility: string[];
  materials: string[];
  portal: { label: string; href: string }[];
  contact?: string;
  customerTypes: string[];
  opportunity: "高" | "中" | "观察";
  action: string;
  compliance: string[];
  source: { title: string; href: string; tier: "A" | "B" | "C" | "lead"; evidence: string }[];
  lastVerified: string;
  verificationNote: string;
};

export type DistrictCoverage = {
  district: string;
  evidenceCount: number;
  verificationState: "已核验政策" | "待持续扫描";
  lastVerified: string;
};

const POLICY_REDEMPTION_PORTAL = "https://zhengce.beijing.gov.cn";
const ETOWN_REDEMPTION_PORTAL = "https://zcdx.kfqgw.beijing.gov.cn";
const SME_SERVICE_PORTAL = "https://www.smebj.cn";

export const subsidyPolicies: SubsidyPolicy[] = [
  {
    id: "bj-high-end-ai-compute-2026",
    name: "2026 年北京市高精尖产业发展项目资金——算力券补贴",
    level: "市级",
    district: "北京市级",
    issuer: "北京市经济和信息化局、北京市财政局",
    policyType: "算力券",
    themes: ["算力", "大模型", "智能体", "备案", "开源"],
    status: "closed",
    changeType: "新增",
    effectiveFrom: "2026-02-14",
    applicationWindow: "2026-03-04—2026-04-15",
    deadline: "2026-04-15",
    amount: "按方向不超过算力合同额的 10%—50%；最高 30 万—3000 万元",
    supportDirection: [
      "新型研发机构开展世界模型、智能体、行业模型等研究攻关：最高 3000 万元",
      "工业和信息化部创新任务揭榜挂帅：最高 500 万元",
      "人工智能开源创新项目：最高 100 万元",
      "新备案登记模型企业：最高 30 万元",
    ],
    eligibility: [
      "在京注册的新型研发机构，或具有独立法人资格的信息软件业、制造业、科技服务业企业",
      "租赁非关联方智能算力并用于规定的模型研发、智能体创新、行业模型应用、开源软件或新模型备案",
      "企业近 3 年无违法失信联合惩戒记录，且同一实施内容不得重复享受市级财政支持",
    ],
    materials: ["企业和项目基本信息", "算力服务合同及支付证明", "项目研发/备案或任务佐证材料", "按方向要求的附件材料"],
    portal: [{ label: "北京市政策兑现专区", href: POLICY_REDEMPTION_PORTAL }],
    contact: "以实施指南附件 27 公布的方向联系人为准",
    customerTypes: ["模型研发企业", "智能体与行业应用企业", "算力租用企业", "新备案模型企业"],
    opportunity: "高",
    action: "保留合同、发票、算力使用日志和备案/任务证据，等待下一批次或年度指南发布后快速匹配方向。",
    compliance: ["按事后补贴核验实际发生额，不能用关联方算力合同替代。", "同一实施内容原则上不得重复申报市级财政资金。"],
    source: [
      {
        title: "2026 年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第一批）",
        href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202602/t20260214_4516700.html",
        tier: "A",
        evidence: "方向 14 明确支持对象、合同额比例、分类上限及 2026 年 4 月 15 日截止时间。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "首批申报期已截止；政策方向仍可作为下一轮市级算力券准备依据。",
  },
  {
    id: "bj-innovation-compute-voucher-2026",
    name: "首都科技条件平台与科技创新券（2026 年修订版）——算力创新券",
    level: "市级",
    district: "北京市级",
    issuer: "北京市科学技术委员会、中关村科技园区管理委员会",
    policyType: "算力券",
    themes: ["算力", "模型训练", "智能体", "科技型中小微企业"],
    status: "rolling",
    changeType: "修订",
    effectiveFrom: "2026-06-23",
    amount: "支付金额最高不超过同一服务合同实际发生额的 25%；标杆/省部级以上孵化器在孵企业年上限 50 万元，其他科技型中小微企业年上限 20 万元",
    supportDirection: ["租用开放单位算力开展人工智能模型训练和推理", "支持智能体研发及应用过程中的算力使用"],
    eligibility: [
      "领取主体须符合科技型小微企业条件",
      "企业主业符合人工智能等高精尖产业方向，且使用开放单位的算力设备",
      "开放单位需具备 IDC/ISP 资质、北京服务基础、不低于 300P FLOPS 智能算力和计量日志能力",
    ],
    materials: ["创新券领取/科研活动登记信息", "算力服务合同和计量日志", "使用登记及专家评审所需材料"],
    portal: [{ label: "首都科技条件平台/创新券系统（按当期通知）", href: "https://kw.beijing.gov.cn" }],
    contact: "市科委、中关村管委会按当期申领通知公布的联系人",
    customerTypes: ["科技型中小微企业", "孵化器在孵 AI 企业", "智能体研发团队"],
    opportunity: "高",
    action: "先确认企业类型、开放单位资质和算力计量日志，再按批次领取电子券；额度发完即止。",
    compliance: ["创新券领取后有效期最长 1 年，使用登记和专家评审是兑现前置条件。", "算力服务为主业的开放单位原则上不纳入支持范围。"],
    source: [
      {
        title: "首都科技条件平台与科技创新券实施办法（2026 年修订版）",
        href: "https://kw.beijing.gov.cn/zwgk/zcwj/202606/t20260623_4711352.html",
        tier: "A",
        evidence: "第十六至二十条明确算力创新券支持内容、开放单位条件、比例、年度上限和有效期。",
      },
      {
        title: "2026 年首批首都科技创新券启动申领",
        href: "https://www.beijing.gov.cn/fuwu/lqfw/gggs/202604/t20260414_4581263.html",
        tier: "B",
        evidence: "官方转载说明电子券按周期发放、科技型中小微企业可按需领取。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "办法现行有效，具体批次、开放单位名单和余额以创新券系统当期通知为准。",
  },
  {
    id: "bj-sme-service-token-voucher-2026",
    name: "2026 年北京市中小企业服务券——大模型应用/Token 计费资源包",
    level: "市级",
    district: "北京市级",
    issuer: "北京市经济和信息化局、北京市财政局",
    policyType: "模型券/Token券",
    themes: ["Token", "大模型应用", "中小企业", "数智转型"],
    status: "closing_soon",
    changeType: "新增",
    effectiveFrom: "2026-02-14",
    applicationWindow: "服务券产品上架后至额度发完，最晚不超过 2026-08-31",
    deadline: "2026-08-31",
    amount: "购买上架服务产品合同金额最高 30%；单个企业年度最高补贴 20 万元",
    supportDirection: ["大模型应用", "Token 计费资源包", "企业 AI 应用平台", "云端模型和智能化工具"],
    eligibility: [
      "符合中小企业划型标准且财务管理制度健全、内部管理规范",
      "购买已评审上架的服务券配券产品，例如 Token 计费资源包、模型产品充值包和企业 AI 应用平台",
      "服务券补贴由服务机构申请兑付，企业先在产品清单中选择可用服务",
    ],
    materials: ["企业基本信息和中小企业类型证明", "服务合同/订单和付款凭证", "服务使用或交付证明", "按服务机构要求的核销材料"],
    portal: [{ label: "北京市中小企业公共服务平台", href: SME_SERVICE_PORTAL }],
    contact: "以服务机构和北京市中小企业公共服务平台当期通知为准",
    customerTypes: ["中小企业", "需要 Token/API 的软件企业", "传统企业 AI 应用试点"],
    opportunity: "高",
    action: "先在产品清单中锁定服务商和 Token 产品，再核对企业类型、年度额度和订单留痕，避免只买服务却无法核销。",
    compliance: ["企业不能把未上架服务或非实际使用费用作为服务券产品。", "服务券资金由服务机构申请兑付，企业需保留真实订单和使用证明。"],
    source: [
      {
        title: "2026 年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第一批）",
        href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202602/t20260214_4516700.html",
        tier: "A",
        evidence: "方向 24 明确大模型应用服务券比例、单企业年度上限、服务机构申请方式和最晚 8 月 31 日期限。",
      },
      {
        title: "2026 年度北京市中小企业服务券拟配券产品名单",
        href: "https://jxj.beijing.gov.cn/jxdt/tzgg/202604/P020260403686838324257.pdf",
        tier: "A",
        evidence: "官方附件列出 Token 计费资源包、大模型产品现金充值包、豆包大模型、HiAgent 等产品。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "本年度服务券最晚期限临近；是否仍有余额需以服务平台和服务机构实时状态为准。",
  },
  {
    id: "haidian-model-voucher-2026",
    name: "2026 年中关村科学城模型券政策申报指南",
    level: "区级",
    district: "海淀区",
    issuer: "中关村科学城管理委员会",
    policyType: "模型券/Token券",
    themes: ["模型券", "Token", "基础大模型", "应用生态"],
    status: "closed",
    changeType: "新增",
    effectiveFrom: "2026-03-30",
    applicationWindow: "2026-03-30—2026-04-05",
    deadline: "2026-04-05",
    amount: "遴选不超过 2 家基础大模型企业，每家 6 个月补贴上限 5000 万元；对企业用户 API 调用补贴比例不超过 50%，单家用户企业年上限 200 万元",
    supportDirection: ["基础大模型企业 API 调用补贴", "国产模型应用生态建设", "海淀企业用户模型调用"],
    eligibility: [
      "申报企业须为在海淀区规范经营的实体，财务管理制度健全、经营稳定",
      "须完成基础大模型备案并对外提供 API 调用服务",
      "近三个月日均 Token 调用量不少于 10000 亿、服务企业客户不少于 10000 家，其中海淀区企业用户不少于 500 家",
      "用户企业须为在海淀区规范经营的主体，补贴方案不得超过 50% 且单用户企业年上限 200 万元",
    ],
    materials: ["《中关村科学城模型券政策申报书》", "模型备案和 API 服务证明", "Token 调用量、客户数量和收费模式证明", "应用生态建设方案"],
    portal: [{ label: "海淀区政策申报/当期征集入口", href: "https://zyk.bjhd.gov.cn/zwdt/zcwj/202603/t20260330_4810202.shtml" }],
    contact: "以中关村科学城管理委员会当期征集通知为准",
    customerTypes: ["基础模型企业", "海淀区 AI 应用企业", "需要 API/Token 补贴的客户"],
    opportunity: "高",
    action: "基础模型企业重点准备备案、Token 调用量、客户数和生态项目；应用企业关注下一轮入选模型和配套用户政策。",
    compliance: ["本轮为基础模型企业遴选，不是所有企业直接申领的通用消费券。", "模型调用量、客户数和补贴凭证需要接受专项审计。"],
    source: [
      {
        title: "关于《2026 年中关村科学城模型券政策申报指南》的政策解读",
        href: "https://zyk.bjhd.gov.cn/zwdt/zcjd/202603/t20260330_4810204.shtml",
        tier: "A",
        evidence: "官方解读明确补贴上限、补贴比例、模型企业和用户企业条件、材料及申报日期。",
      },
      {
        title: "2026 年中关村科学城模型券政策申报指南",
        href: "https://zyk.bjhd.gov.cn/zwdt/zcwj/202603/t20260330_4810202.shtml",
        tier: "A",
        evidence: "官方政策文件页面标记本轮政策已失效，但保留下一轮政策准备依据。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "本轮申报已于 4 月 5 日截止；下一轮是否启动、入选模型和用户申领方式需等待海淀区新通知。",
  },
  {
    id: "fengtai-ai-measures-2025",
    name: "丰台区支持人工智能科技创新和产业创新融合发展的若干措施",
    level: "区级",
    district: "丰台区",
    issuer: "北京市丰台区科学技术和信息化局",
    policyType: "综合支持",
    themes: ["算力", "模型券", "备案", "数据", "场景", "人才"],
    status: "effective_no_round",
    changeType: "新增",
    effectiveFrom: "2025-10-30",
    effectiveTo: "2028-12-31",
    amount: "算力 20% 最高 200 万元；工业智能 30% 最高 300 万元；备案大模型最高 50 万/60 万元；购买通用模型服务做垂类模型或智能体最高 20 万元",
    supportDirection: ["智能算力租用", "大模型合规备案", "垂类模型和智能体开发", "数据集/语料库", "重大场景和首试首用"],
    eligibility: [
      "人工智能伙伴计划企业可申请算力支持；工业智能企业适用提高后的比例和上限",
      "通过国家生成式人工智能备案的大模型可申请备案支持，工业大模型有单独上限",
      "购买通用大模型开展垂类模型、模型服务或智能体开发应用的企业，经评审认定可申请",
      "措施按年度征集，支持额度受年度资金总额控制，并与区内政策从优不重复",
    ],
    materials: ["企业和项目基本信息", "算力/模型服务合同及投入凭证", "模型备案证明或场景评审材料", "数据集、语料库或应用成效证明"],
    portal: [{ label: "丰台区政策兑现专区（当年度项目）", href: POLICY_REDEMPTION_PORTAL }],
    contact: "丰台区科学技术和信息化局按年度申报通知公布的联系人",
    customerTypes: ["工业智能企业", "模型与智能体研发企业", "需要备案辅导的企业", "场景建设方"],
    opportunity: "高",
    action: "按企业是模型方、算力使用方还是场景建设方建立申报清单，提前留存合同、备案和项目投入证据，等待年度征集。",
    compliance: ["政策采用年度征集和评审认定，文件中的最高额度不是自动获得的金额。", "同一项目与区内其他惠企政策按从优不重复原则执行。"],
    source: [
      {
        title: "丰台区支持人工智能科技创新和产业创新融合发展的若干措施",
        href: "https://www.bjft.gov.cn/xxfb/ftzcwj/ftbmwj/202601/t20260121_202302.shtml",
        tier: "A",
        evidence: "政策原文明确有效期至 2028 年 12 月 31 日，并列明算力、备案、模型服务、数据和场景支持上限。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "政策现行有效，但当前批次未检出开放申报窗口；下一步按年度通知复核。",
  },
  {
    id: "etown-model-voucher-2026-h1",
    name: "经开区 2026 年上半年人工智能“模型券”申报",
    level: "区级",
    district: "北京经开区",
    issuer: "北京经济技术开发区信息技术产业局",
    policyType: "模型券/Token券",
    themes: ["模型券", "Token", "模型调用", "AI 原生"],
    status: "closed",
    changeType: "新增",
    effectiveFrom: "2026-06-25",
    applicationWindow: "2026-06-26—2026-07-17",
    deadline: "2026-07-17",
    amount: "具体项目额度以办事指南和平台审核为准；经开区即时补贴平台上线后，模型服务补贴比例最高可达 65%",
    supportDirection: ["企业购买和调用模型服务", "多模型统一选型、结算和补贴", "AI 原生企业和 OPC 轻量化研发"],
    eligibility: [
      "在北京经开区依法经营的企业",
      "在规定申报期内通过市级或经开区政策兑现平台提交申请",
      "即时补贴平台的适用模型、优惠价格、信用核验和实时额度以平台规则为准",
    ],
    materials: ["企业主体和经营信息", "平台注册/登录信息", "模型服务购买与调用记录", "办事指南要求的其他材料"],
    portal: [
      { label: "北京市政策兑现专区", href: POLICY_REDEMPTION_PORTAL },
      { label: "经开区政策兑现综合服务平台", href: ETOWN_REDEMPTION_PORTAL },
    ],
    contact: "经开区政务服务大厅政策申报窗口：010-67857878 转 4、010-67857687；信息技术产业局：010-83508303",
    customerTypes: ["经开区企业", "OPC/独立开发者团队", "需要多模型调用的应用企业"],
    opportunity: "高",
    action: "把客户是否在经开区依法经营作为第一筛选条件，并持续关注平台余额、模型清单和下一期申报通知。",
    compliance: ["上半年申报已截止，不能把本轮通知当作当前开放窗口。", "即时补贴比例最高 65% 来自官方工作动态，具体实时规则以平台为准。"],
    source: [
      {
        title: "经开区 2026 年上半年人工智能“模型券”申报通知",
        href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202606/t20260625_4715131.html",
        tier: "A",
        evidence: "官方通知明确申报期为 6 月 26 日至 7 月 17 日，并指定市级/经开区政策兑现平台。",
      },
      {
        title: "经开区上线“模型券”即时补贴平台",
        href: "https://kfqgw.beijing.gov.cn/ywdt/gzdt/202607/t20260715_4764261.html",
        tier: "C",
        evidence: "经开区官方工作动态披露平台已上线，企业购买模型服务最高可叠加 65% 补贴。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "上半年申报期已截止；即时补贴平台已上线，后续批次和实时额度需以经开区平台为准。",
  },
  {
    id: "etown-model-voucher-live",
    name: "经开区模型券即时补贴平台（持续使用入口）",
    level: "区级",
    district: "北京经开区",
    issuer: "北京经济技术开发区信息技术产业局",
    policyType: "模型券/Token券",
    themes: ["模型券", "Token", "即时补贴", "多模型"],
    status: "open",
    changeType: "新增",
    effectiveFrom: "2026-07-15",
    amount: "在集采优惠价格基础上，模型服务补贴比例最高可达 65%；具体券包、模型和余额以平台实时规则为准",
    supportDirection: ["多模型统一展示、调用、结算", "企业模型体验和应用开发", "免垫资的即时补贴"],
    eligibility: ["在北京经开区依法经营的企业", "通过经开区模型券平台完成企业信用核验和模型服务购买"],
    materials: ["企业主体信息", "平台账户和信用核验信息", "模型服务购买与调用记录"],
    portal: [{ label: "经开区政策兑现综合服务平台", href: ETOWN_REDEMPTION_PORTAL }],
    contact: "以经开区模型券平台在线提示和信息技术产业局联系方式为准",
    customerTypes: ["经开区中小企业", "OPC/独立开发者团队", "AI 应用试点企业"],
    opportunity: "高",
    action: "优先用平台做低成本模型选型和小规模试用，再根据调用量、模型清单和企业信用核验结果判断可抵扣金额。",
    compliance: ["“最高 65%”不是所有模型和企业的统一比例，需以平台实时券包规则核对。", "平台即时抵扣不等于企业获得现金拨付。"],
    source: [
      {
        title: "补贴比例最高可达 65%：经开区上线“模型券”即时补贴平台",
        href: "https://kfqgw.beijing.gov.cn/ywdt/gzdt/202607/t20260715_4764261.html",
        tier: "C",
        evidence: "经开区官方工作动态说明平台面向区内依法经营企业开放，购买模型服务时即时叠加补贴。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "平台已上线；金额、模型清单和实际补贴比例随平台规则变化，客户使用前需重新核验。",
  },
  {
    id: "etown-ai-data-measures-2025",
    name: "经开区数据产业高质量发展若干措施——数据券、备案和数据产品支持",
    level: "区级",
    district: "北京经开区",
    issuer: "北京经济技术开发区管理委员会",
    policyType: "数据券",
    themes: ["数据券", "数据集", "公共数据", "备案", "算力", "模型"],
    status: "rolling",
    changeType: "新增",
    effectiveFrom: "2025-07-15",
    effectiveTo: "2027-12-31",
    amount: "每年发放 1 亿元数据券；采购数据集、数据接口、数据模型按交易额 10% 补贴，单主体年度最高 100 万元；高质量数据集最高 200 万元；已备案优质大模型免申即享 100 万元专项奖励线索",
    supportDirection: ["数据集、数据接口、数据模型采购", "高质量人工智能数据集和语料库", "公共数据授权运营", "算力券、模型券、数据券联动"],
    eligibility: [
      "重点支持工业制造、医药健康、智能网联汽车、具身智能等产业企业",
      "数据产品采购应通过合规数据流通交易平台并能证明交易金额和用途",
      "高质量数据集支持需经评审认定；数据券年度额度受预算和平台规则控制",
    ],
    materials: ["数据交易合同和平台交易凭证", "数据产品/数据集质量、合规和应用证明", "企业主体与项目材料", "按当期数据券或专项通知要求提交的附件"],
    portal: [{ label: "经开区政策兑现综合服务平台", href: ETOWN_REDEMPTION_PORTAL }],
    contact: "经开区信息技术局、营商环境局按具体项目通知公布的联系人",
    customerTypes: ["行业数据企业", "AI 模型和具身智能企业", "需要数据集/接口的制造与医药客户", "数据交易平台服务商"],
    opportunity: "高",
    action: "把客户的数据采购、模型训练、算力使用和备案放在一张成本表中，评估数据券与模型券/算力券是否可叠加。",
    compliance: ["数据采购必须通过合规流通交易平台，不能用无法证明来源和用途的数据费用替代。", "“免申即享 100 万元”需以具体备案奖励批次和企业名单规则核对，不宜直接承诺。"],
    source: [
      {
        title: "经开区关于加快推进数据产业高质量发展的若干措施",
        href: "https://www.beijing.gov.cn/cs/gncs/zcwj/202603/t20260327_4568265.html",
        tier: "A",
        evidence: "第八条明确每年 1 亿元数据券、交易额 10% 和单主体 100 万元上限；第九条明确高质量数据集最高 200 万元。",
      },
      {
        title: "亦庄模数世界大模型生态服务站设立",
        href: "https://www.beijing.gov.cn/ywdt/gzdt/202605/t20260507_4639961.html",
        tier: "C",
        evidence: "经开区官方动态披露备案辅导、模型备案优质企业免申即享 100 万元和算力/模型/数据券年度统筹方向。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "政策条款有效；数据券、备案奖励和具体申报批次须按经开区当期通知分别核验。",
  },
  {
    id: "tongzhou-opc-support-2026",
    name: "北京城市副中心支持数智创新 OPC 创新发展的若干措施",
    level: "区级",
    district: "通州区",
    issuer: "中关村科技园区通州园管理委员会、通州区政务服务和数据管理局等",
    policyType: "OPC/人才",
    themes: ["OPC", "算力券", "模型券", "创业"],
    status: "effective_no_round",
    changeType: "新增",
    effectiveFrom: "2026-06-01",
    amount: "对优质数智创新 OPC，单个企业年度模型券、算力券最高 50 万元；具体批次、评审和券种组合以当期通知为准",
    supportDirection: ["模型券和算力券", "OPC 注册、办公和 AI 工具服务", "园区/孵化器生态支持"],
    eligibility: [
      "面向北京城市副中心优质数智创新 OPC 企业或团队，具体认定条件以实施细则为准",
      "需结合企业登记、园区/孵化器、数智创新项目或成长性等条件接受评审",
      "券额度受年度财政预算和项目评审控制，不是自动普惠发放",
    ],
    materials: ["企业主体和 OPC 认定/项目材料", "模型或算力服务合同与使用证明", "项目计划、产品或订单证明", "当期通知要求的其他材料"],
    portal: [{ label: "北京市政策兑现专区（如当期项目上线）", href: POLICY_REDEMPTION_PORTAL }],
    contact: "通州区相关主管部门或城市副中心政策服务窗口按当期通知为准",
    customerTypes: ["OPC/独立开发者", "城市副中心 AI 初创企业", "AI 工具和算力服务商"],
    opportunity: "中",
    action: "先核实 OPC 认定口径和项目落地要求，再准备产品、订单、模型/算力实际使用和园区关系材料。",
    compliance: ["政策支持对象是优质 OPC，不等同于所有个人开发者都可直接领取。", "当前未检出独立申报批次，入口和申报时间必须以通州区后续通知为准。"],
    source: [
      {
        title: "关于北京城市副中心支持数智创新 OPC 创新发展的若干措施",
        href: "https://www.bjtzh.gov.cn/bjtz/xxfb/202606/1792736.shtml",
        tier: "A",
        evidence: "通州区官方政策页面摘要明确优质 OPC 单企业年度模型券、算力券最高 50 万元。",
      },
    ],
    lastVerified: "2026-08-03",
    verificationNote: "政策方向已检出，独立申报入口和本年度批次尚待通州区主管部门通知。",
  },
];

export const subsidyThemes = ["算力券", "模型券/Token券", "数据券", "备案奖励", "场景补贴", "OPC/人才"] as const;

const districtNames = [
  "东城区",
  "西城区",
  "朝阳区",
  "丰台区",
  "石景山区",
  "海淀区",
  "门头沟区",
  "房山区",
  "通州区",
  "顺义区",
  "昌平区",
  "大兴区",
  "怀柔区",
  "平谷区",
  "密云区",
  "延庆区",
  "北京市级",
  "北京经开区",
];

export const subsidyDistricts: DistrictCoverage[] = districtNames.map((district) => {
  const records = subsidyPolicies.filter((item) => item.district === district);
  return {
    district,
    evidenceCount: records.length,
    verificationState: records.length > 0 ? "已核验政策" : "待持续扫描",
    lastVerified: records.length > 0 ? records.reduce((latest, item) => (item.lastVerified > latest ? item.lastVerified : latest), "") : "—",
  };
});

export function currentSubsidies(): SubsidyPolicy[] {
  return subsidyPolicies.filter((item) => !["closed", "pending_verification"].includes(item.status));
}

export function subsidyStatusLabel(status: SubsidyStatus): string {
  const labels: Record<SubsidyStatus, string> = {
    open: "当前可申报",
    closing_soon: "即将截止",
    closed: "本轮已截止",
    rolling: "滚动/额度制",
    effective_no_round: "政策有效·待批次",
    pending_verification: "待官方核验",
  };
  return labels[status];
}

export const subsidyMetrics = {
  total: subsidyPolicies.length,
  current: currentSubsidies().length,
  open: subsidyPolicies.filter((item) => item.status === "open").length,
  closingSoon: subsidyPolicies.filter((item) => item.status === "closing_soon").length,
  rolling: subsidyPolicies.filter((item) => item.status === "rolling").length,
  closed: subsidyPolicies.filter((item) => item.status === "closed").length,
  pendingVerification: subsidyPolicies.filter((item) => item.status === "pending_verification").length,
  districtEvidence: subsidyDistricts.filter((item) => item.evidenceCount > 0).length,
};
