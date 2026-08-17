export type SubsidyStatus = "current" | "effective_waiting_round" | "closed" | "lead_pending";
export type SourceGrade = "official" | "official_repost" | "lead_only";

export type SubsidySource = {
  title: string;
  url: string;
  publisher: string;
  sourceGrade: SourceGrade;
  evidence: string;
};

export type SubsidyPolicy = {
  id: string;
  title: string;
  region: string;
  supportDirections: string[];
  mechanism: string;
  beneficiaries: string[];
  status: SubsidyStatus;
  applicationWindow: string;
  amount: string;
  eligibility: string;
  applicationUrl?: string;
  basisPolicyIds: string[];
  sources: SubsidySource[];
  verifiedAt: string;
  summary: string;
  businessImpact: string;
  complianceImpact: string;
  action: string;
};

export type CoverageStatus = "verified_records" | "scanned_no_official" | "lead_pending_verification" | "not_scanned";

export type CoverageRecord = {
  district: string;
  scanStatus: CoverageStatus;
  lastScanned: string;
  channelsChecked: string[];
  leadCount: number;
  nextReview: string;
};

const BEIJING_REDEMPTION = "https://zhengce.beijing.gov.cn";
const ETOWN_PORTAL = "https://zcdx.kfqgw.beijing.gov.cn";

export const subsidyPolicies: SubsidyPolicy[] = [
  {
    id: "bj-high-end-ai-compute-2026",
    title: "2026 年北京市高精尖产业发展项目资金——算力券补贴",
    region: "北京市级",
    supportDirections: ["世界模型、智能体和行业模型研发", "人工智能开源创新", "新模型备案登记"],
    mechanism: "事后补贴",
    beneficiaries: ["模型研发企业", "智能体与行业应用企业", "算力租用企业", "新备案模型企业"],
    status: "closed",
    applicationWindow: "2026-03-04—2026-04-15（本轮已截止）",
    amount: "按方向不超过算力合同额的 10%—50%；最高 30 万—3000 万元",
    eligibility: "在京注册的研发机构或信息软件、制造、科技服务业独立法人；租用非关联方智能算力用于规定方向；同一实施内容不得重复享受市级财政支持。",
    applicationUrl: BEIJING_REDEMPTION,
    basisPolicyIds: ["bj-high-tech-fund-202601", "nat-inclusive-compute-sme"],
    sources: [{ title: "2026 年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第一批）", url: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202602/t20260214_4516700.html", publisher: "北京市经济和信息化局、北京市财政局", sourceGrade: "official", evidence: "指南方向 14 明确支持对象、算力合同额比例、分类上限及 2026 年 4 月 15 日截止时间。" }],
    verifiedAt: "2026-08-03",
    summary: "市级算力券将模型研发、智能体、行业模型、开源和备案支持放进同一批次，但首批申报窗口已经结束。",
    businessImpact: "算力合同、使用日志和项目成果可以作为下一批市级资金的共同材料底座。",
    complianceImpact: "最高额度不是自动获得的金额，实际发生额、非关联方合同和不重复支持要求需要逐项核验。",
    action: "保留合同、发票、算力使用日志和备案/任务证据，等待下一批指南发布后快速匹配方向。",
  },
  {
    id: "bj-innovation-compute-voucher-2026",
    title: "首都科技条件平台与科技创新券（2026 年修订版）——算力创新券",
    region: "北京市级",
    supportDirections: ["模型训练和推理算力", "智能体研发与应用", "科技型中小微企业服务"],
    mechanism: "电子券",
    beneficiaries: ["科技型中小微企业", "孵化器在孵 AI 企业", "智能体研发团队"],
    status: "current",
    applicationWindow: "按创新券批次申领；额度发完即止",
    amount: "服务合同实际发生额最高 25%；标杆/省部级以上孵化器在孵企业年上限 50 万元，其他科技型中小微企业年上限 20 万元",
    eligibility: "主体符合科技型小微企业条件，主业符合人工智能等高精尖方向，并使用具备资质和计量日志能力的开放单位算力。",
    applicationUrl: "https://kw.beijing.gov.cn",
    basisPolicyIds: ["bj-high-tech-fund-202601"],
    sources: [
      { title: "首都科技条件平台与科技创新券实施办法（2026 年修订版）", url: "https://kw.beijing.gov.cn/zwgk/zcwj/202606/t20260623_4711352.html", publisher: "北京市科学技术委员会、中关村科技园区管理委员会", sourceGrade: "official", evidence: "实施办法明确算力创新券支持内容、开放单位条件、补贴比例、年度上限和有效期。" },
      { title: "2026 年首批首都科技创新券启动申领", url: "https://www.beijing.gov.cn/fuwu/lqfw/gggs/202604/t20260414_4581263.html", publisher: "北京市人民政府", sourceGrade: "official_repost", evidence: "官方转载说明电子券按周期发放，科技型中小微企业可按需领取。" },
    ],
    verifiedAt: "2026-08-03",
    summary: "创新券把算力支持做成电子券，企业需要先确认自身类型、开放单位资质和算力计量口径。",
    businessImpact: "适合把算力服务商、孵化器和科技型客户放在同一条销售链路中推进。",
    complianceImpact: "领取后有有效期，使用登记和专家评审是兑现前置条件；算力服务主业单位存在适用边界。",
    action: "先核验企业类型、开放单位资质和算力计量日志，再按批次领取电子券。",
  },
  {
    id: "bj-sme-service-token-voucher-2026",
    title: "2026 年北京市中小企业服务券——大模型应用/Token 计费资源包",
    region: "北京市级",
    supportDirections: ["大模型应用", "Token 计费资源包", "企业 AI 应用平台", "云端模型和智能化工具"],
    mechanism: "服务券",
    beneficiaries: ["中小企业", "需要 Token/API 的软件企业", "传统企业 AI 应用试点"],
    status: "current",
    applicationWindow: "服务券产品上架后至额度发完，最晚不超过 2026-08-31",
    amount: "已评审上架服务合同金额最高 30%；单个企业年度最高补贴 20 万元",
    eligibility: "符合中小企业划型标准，购买已评审上架的 Token 资源包、模型充值包或企业 AI 应用平台；服务机构申请兑付。",
    applicationUrl: "https://www.smebj.cn",
    basisPolicyIds: ["bj-high-tech-fund-202601", "bj-ai-opc"],
    sources: [
      { title: "2026 年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第一批）", url: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202602/t20260214_4516700.html", publisher: "北京市经济和信息化局、北京市财政局", sourceGrade: "official", evidence: "指南方向 24 明确大模型应用服务券比例、单企业年度上限和最晚期限。" },
      { title: "2026 年度北京市中小企业服务券拟配券产品名单", url: "https://jxj.beijing.gov.cn/jxdt/tzgg/202604/P020260403686838324257.pdf", publisher: "北京市经济和信息化局", sourceGrade: "official", evidence: "官方附件列出 Token 计费资源包、大模型产品现金充值包和企业 AI 应用平台等产品。" },
    ],
    verifiedAt: "2026-08-03",
    summary: "市级服务券把 Token 消费和企业 AI 应用平台纳入配券产品，窗口接近年度最晚期限。",
    businessImpact: "模型服务商可以通过上架产品触达中小企业客户，客户经理应先匹配产品清单再谈补贴。",
    complianceImpact: "未上架服务、非实际使用费用和缺少订单留痕的支出不能直接作为服务券核销依据。",
    action: "先在产品清单锁定服务商和 Token 产品，核对企业类型、年度额度和订单留痕。",
  },
  {
    id: "haidian-model-voucher-2026",
    title: "2026 年中关村科学城模型券政策申报指南",
    region: "海淀区",
    supportDirections: ["基础大模型 API 调用", "国产模型应用生态", "海淀企业用户模型调用"],
    mechanism: "模型券",
    beneficiaries: ["基础模型企业", "海淀区 AI 应用企业", "需要 API/Token 补贴的客户"],
    status: "closed",
    applicationWindow: "2026-03-30—2026-04-05（本轮已截止）",
    amount: "不超过 2 家基础大模型企业，每家 6 个月补贴上限 5000 万元；用户企业 API 调用补贴比例不超过 50%，单家年上限 200 万元",
    eligibility: "申报企业须在海淀规范经营并完成基础大模型备案；近三个月日均 Token 调用量不少于 10000 亿，服务企业客户不少于 10000 家，其中海淀企业用户不少于 500 家。",
    applicationUrl: "https://zyk.bjhd.gov.cn/zwdt/zcwj/202603/t20260330_4810202.shtml",
    basisPolicyIds: ["bj-agent-measures", "bj-ai-opc"],
    sources: [
      { title: "关于《2026 年中关村科学城模型券政策申报指南》的政策解读", url: "https://zyk.bjhd.gov.cn/zwdt/zcjd/202603/t20260330_4810204.shtml", publisher: "中关村科学城管理委员会", sourceGrade: "official", evidence: "官方解读明确补贴上限、比例、模型企业和用户企业条件、材料及申报日期。" },
      { title: "2026 年中关村科学城模型券政策申报指南", url: "https://zyk.bjhd.gov.cn/zwdt/zcwj/202603/t20260330_4810202.shtml", publisher: "中关村科学城管理委员会", sourceGrade: "official", evidence: "官方政策文件页保留本轮申报规则，当前批次已截止。" },
    ],
    verifiedAt: "2026-08-03",
    summary: "海淀模型券以高门槛基础模型企业遴选和用户 API 调用补贴为核心，适合提前准备下一轮。",
    businessImpact: "模型企业的备案、调用量、客户数和生态方案是核心竞争材料，应用企业需要等待入选模型名单。",
    complianceImpact: "本轮不是所有企业都能直接申领的通用消费券，调用量和补贴凭证需要接受专项审计。",
    action: "模型企业提前整理备案、Token 调用量、客户数和生态项目；应用企业跟踪下一轮模型名单。",
  },
  {
    id: "fengtai-ai-measures-2025",
    title: "丰台区支持人工智能科技创新和产业创新融合发展的若干措施",
    region: "丰台区",
    supportDirections: ["智能算力租用", "大模型合规备案", "垂类模型和智能体", "数据集与重大场景"],
    mechanism: "年度征集/事后补贴",
    beneficiaries: ["工业智能企业", "模型与智能体研发企业", "需要备案辅导的企业", "场景建设方"],
    status: "effective_waiting_round",
    applicationWindow: "政策有效至 2028-12-31；当前批次待年度通知",
    amount: "算力 20% 最高 200 万元；工业智能 30% 最高 300 万元；备案大模型最高 50 万/60 万元；垂类模型或智能体最高 20 万元",
    eligibility: "按企业是模型方、算力使用方还是场景建设方分别适用，年度资金总额和评审认定决定实际额度。",
    applicationUrl: "https://www.bjft.gov.cn/xxfb/ftzcwj/ftbmwj/202601/t20260121_202302.shtml",
    basisPolicyIds: ["bj-ai-industrial-internet", "bj-agent-measures"],
    sources: [{ title: "丰台区支持人工智能科技创新和产业创新融合发展的若干措施", url: "https://www.bjft.gov.cn/xxfb/ftzcwj/ftbmwj/202601/t20260121_202302.shtml", publisher: "北京市丰台区科学技术和信息化局", sourceGrade: "official", evidence: "政策原文明确有效期至 2028 年 12 月 31 日，并列明算力、备案、模型服务、数据和场景支持上限。" }],
    verifiedAt: "2026-08-03",
    summary: "丰台将算力、备案、垂类模型、智能体、数据和场景放在一套长期有效的区级措施中。",
    businessImpact: "客户可按模型方、算力使用方、场景方三种角色准备材料，年度征集是主要窗口。",
    complianceImpact: "文件中的最高额度不等于自动获得，且需按从优不重复原则与其他区级政策比对。",
    action: "提前留存合同、备案和项目投入证据，等待年度征集通知。",
  },
  {
    id: "etown-model-voucher-2026-h1",
    title: "经开区 2026 年上半年人工智能“模型券”申报",
    region: "北京经开区",
    supportDirections: ["企业购买和调用模型服务", "多模型统一结算", "AI 原生企业和 OPC 研发"],
    mechanism: "模型券/平台抵扣",
    beneficiaries: ["经开区企业", "OPC/独立开发者团队", "需要多模型调用的应用企业"],
    status: "closed",
    applicationWindow: "2026-06-26—2026-07-17（本轮已截止）",
    amount: "具体项目额度以办事指南和平台审核为准；即时补贴平台模型服务补贴比例最高可达 65%",
    eligibility: "在北京经开区依法经营，并在规定申报期通过市级或经开区政策兑现平台提交申请。",
    applicationUrl: BEIJING_REDEMPTION,
    basisPolicyIds: ["dist-etown-ai-city", "bj-agent-measures"],
    sources: [
      { title: "经开区 2026 年上半年人工智能“模型券”申报通知", url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202606/t20260625_4715131.html", publisher: "北京市人民政府、北京经开区", sourceGrade: "official", evidence: "官方通知明确申报期为 6 月 26 日至 7 月 17 日，并指定市级/经开区政策兑现平台。" },
      { title: "经开区上线“模型券”即时补贴平台", url: "https://kfqgw.beijing.gov.cn/ywdt/gzdt/202607/t20260715_4764261.html", publisher: "北京经开区管委会", sourceGrade: "official_repost", evidence: "官方工作动态披露平台已上线，企业购买模型服务最高可叠加 65% 补贴。" },
    ],
    verifiedAt: "2026-08-03",
    summary: "经开区已形成申报批次与即时平台两种模型券入口，首个半年批次已经截止。",
    businessImpact: "区内企业可通过平台低成本试用多模型，模型服务商也获得统一结算入口。",
    complianceImpact: "最高 65% 不是统一比例，模型清单、企业信用和实时券包规则要以平台为准。",
    action: "筛选客户时先核对经开区经营条件，再持续关注平台余额、模型清单和下一期通知。",
  },
  {
    id: "etown-model-voucher-live",
    title: "经开区模型券即时补贴平台（持续使用入口）",
    region: "北京经开区",
    supportDirections: ["多模型统一展示、调用和结算", "企业模型体验", "免垫资即时补贴"],
    mechanism: "即时抵扣",
    beneficiaries: ["经开区中小企业", "OPC/独立开发者团队", "AI 应用试点企业"],
    status: "current",
    applicationWindow: "平台持续开放；模型、券包和余额实时变化",
    amount: "在集采优惠价格基础上，模型服务补贴比例最高可达 65%",
    eligibility: "在经开区依法经营，通过平台完成企业信用核验并购买适用模型服务。",
    applicationUrl: ETOWN_PORTAL,
    basisPolicyIds: ["dist-etown-ai-city"],
    sources: [{ title: "补贴比例最高可达 65%：经开区上线“模型券”即时补贴平台", url: "https://kfqgw.beijing.gov.cn/ywdt/gzdt/202607/t20260715_4764261.html", publisher: "北京经开区管委会", sourceGrade: "official_repost", evidence: "经开区官方动态说明平台面向区内依法经营企业开放，购买模型服务时即时叠加补贴。" }],
    verifiedAt: "2026-08-03",
    summary: "即时平台把模型券从申报制延伸为购买时抵扣，适合客户经理现场演示和小规模验证。",
    businessImpact: "客户可以先用平台做模型选型和低成本试用，再根据实际调用量扩大采购。",
    complianceImpact: "即时抵扣不是现金拨付，实际比例、模型清单和信用核验结果随平台规则变化。",
    action: "先用平台做小规模模型体验，保存调用记录并复核实际抵扣比例。",
  },
  {
    id: "etown-ai-data-measures-2025",
    title: "经开区数据产业高质量发展若干措施——数据券、备案和数据产品支持",
    region: "北京经开区",
    supportDirections: ["数据集、接口和数据模型采购", "高质量人工智能数据集", "公共数据授权运营", "算力/模型/数据券联动"],
    mechanism: "数据券/免申即享（按批次核验）",
    beneficiaries: ["行业数据企业", "AI 模型和具身智能企业", "制造与医药数据应用客户", "数据交易平台服务商"],
    status: "effective_waiting_round",
    applicationWindow: "政策有效至 2027-12-31；数据券与备案奖励按具体项目通知",
    amount: "每年发放 1 亿元数据券；采购数据集、接口、模型按交易额 10% 补贴，单主体年度最高 100 万元；高质量数据集最高 200 万元",
    eligibility: "重点支持工业制造、医药健康、智能网联汽车、具身智能等产业；数据产品采购需通过合规交易平台并证明交易金额和用途。",
    applicationUrl: ETOWN_PORTAL,
    basisPolicyIds: ["dist-etown-ai-city", "bj-public-data-operation"],
    sources: [
      { title: "经开区关于加快推进数据产业高质量发展的若干措施", url: "https://www.beijing.gov.cn/cs/gncs/zcwj/202603/t20260327_4568265.html", publisher: "北京经济技术开发区管理委员会", sourceGrade: "official", evidence: "政策明确每年 1 亿元数据券、交易额 10% 和单主体 100 万元上限；高质量数据集最高 200 万元。" },
      { title: "亦庄模数世界大模型生态服务站设立", url: "https://www.beijing.gov.cn/ywdt/gzdt/202605/t20260507_4639961.html", publisher: "北京市人民政府、北京经开区", sourceGrade: "official_repost", evidence: "官方动态披露备案辅导、模型备案优质企业奖励和算力/模型/数据券统筹方向。" },
    ],
    verifiedAt: "2026-08-03",
    summary: "经开区把数据交易、数据集、备案和模型/算力券放入同一产业链，体现数据要素与 AI 应用联动。",
    businessImpact: "具身智能、制造、医药和数据交易平台客户都有潜在切入点，适合做组合式客户方案。",
    complianceImpact: "数据采购必须通过合规流通交易平台；备案奖励和免申即享线索需等具体批次核对。",
    action: "把数据采购、模型训练、算力使用和备案放进一张成本表，评估券种能否叠加。",
  },
  {
    id: "tongzhou-opc-support-2026",
    title: "北京城市副中心支持数智创新 OPC 创新发展的若干措施",
    region: "通州区",
    supportDirections: ["模型券和算力券", "OPC 注册与办公", "园区/孵化器生态"],
    mechanism: "年度评审/券类支持",
    beneficiaries: ["OPC/独立开发者", "城市副中心 AI 初创企业", "AI 工具和算力服务商"],
    status: "effective_waiting_round",
    applicationWindow: "政策方向已发布；具体批次、认定和入口待后续通知",
    amount: "优质数智创新 OPC 单个企业年度模型券、算力券最高 50 万元",
    eligibility: "面向城市副中心优质数智创新 OPC 企业或团队，结合企业登记、园区/孵化器、项目和成长性接受评审。",
    applicationUrl: "https://www.bjtzh.gov.cn/bjtz/xxfb/202606/1792736.shtml",
    basisPolicyIds: ["dist-tongzhou-digital-economy", "bj-ai-opc"],
    sources: [{ title: "关于北京城市副中心支持数智创新 OPC 创新发展的若干措施", url: "https://www.bjtzh.gov.cn/bjtz/xxfb/202606/1792736.shtml", publisher: "中关村科技园区通州园管理委员会等", sourceGrade: "official", evidence: "通州区官方政策页面明确优质 OPC 单企业年度模型券、算力券最高 50 万元。" }],
    verifiedAt: "2026-08-03",
    summary: "通州把 OPC 作为数智创新主体培育，当前更适合做注册地、园区和材料的提前准备。",
    businessImpact: "OPC 客户可从主体、园区、产品和使用凭证四个维度建立准备清单。",
    complianceImpact: "优质 OPC 不等于所有个人开发者，当前未检出独立申报批次。",
    action: "先核实 OPC 认定口径和项目落地要求，准备产品、订单及模型/算力使用证明。",
  },
  {
    id: "dist-etown-opc-talent-2026",
    title: "2026年亦城人才·人工智能超级个体（OPC）认定申报",
    region: "北京经开区",
    supportDirections: ["OPC 人才认定", "团队奖励", "人才服务与企业合规服务"],
    mechanism: "人才认定/奖励",
    beneficiaries: ["人工智能超级个体（OPC）团队负责人", "经开区 AI 创业小团队"],
    status: "closed",
    applicationWindow: "2026-07-09—2026-08-10（本轮已截止）",
    amount: "经认定的 OPC 团队按分类分级可获 7.2 万元—50 万元奖励；具体等级以办事指南和评审结果为准",
    eligibility: "申报人为 OPC 团队主要负责人；所在主体在经开区依法经营、实地办公，员工总数不超过 10 人；每位申报人只能依托一个主体申报。",
    applicationUrl: "https://zhengce.beijing.gov.cn",
    basisPolicyIds: ["dist-etown-ai-city"],
    sources: [
      { title: "中共北京市委经济技术开发区工委组织人事部关于开展2026年亦城人才·人工智能超级个体（OPC）认定申报的通知", url: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260707_4750995.html", publisher: "北京经开区工委组织人事部", sourceGrade: "official", evidence: "官方通知明确申报期为 2026 年 7 月 9 日至 8 月 10 日、申报入口、单主体申报和咨询电话。" },
      { title: "超级个体人才纳入亦城人才体系 经济技术开发区启动2026年OPC人才认定申报工作", url: "https://www.beijing.gov.cn/ywdt/gzdt/202607/t20260710_4757039.html", publisher: "北京经开区管委会", sourceGrade: "official_repost", evidence: "北京市政府官方转载披露 OPC 团队奖励区间为 7.2 万元至 50 万元及主体、团队人数等条件。" },
    ],
    verifiedAt: "2026-08-10",
    summary: "经开区首次把人工智能超级个体纳入亦城人才体系，本轮申报已于 8 月 10 日截止。",
    businessImpact: "适合把 AI 初创团队、OPC 服务站和园区客户纳入人才与企业服务联合清单。",
    complianceImpact: "奖励金额是分类分级结果，不是普遍定额；主体经营、实地办公和重复申报限制必须逐项核验。",
    action: "本轮已截止；保留主体经营、实地办公和团队材料，跟踪下一年度 OPC 人才认定通知。",
  },
  {
    id: "dist-etown-data-core-2026",
    title: "2026年数据领域核心技术攻关补贴申报",
    region: "北京经开区",
    supportDirections: ["数据领域核心技术攻关", "数据基础设施与流通", "数据安全与 AI 数据应用"],
    mechanism: "项目补贴申报",
    beneficiaries: ["经开区数据产业企业", "数据基础设施与安全企业", "AI 数据应用项目承担单位"],
    status: "closed",
    applicationWindow: "2026-07-06—2026-08-14（本轮已截止）",
    amount: "待核（通知正文未列明，具体支持方向、金额和材料以《办事指南》及政策兑现平台项目页为准）",
    eligibility: "面向符合经开区政策要求的数据领域核心技术攻关项目，须通过北京市政策兑现专区或经开区政策兑现平台在线申报。",
    applicationUrl: "https://zhengce.beijing.gov.cn",
    basisPolicyIds: ["etown-ai-data-measures-2025"],
    sources: [{ title: "北京市智慧城市基础设施与智能网联汽车协同发展工作办公室关于开展2026年数据领域核心技术攻关补贴申报的通知", url: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260703_4745935.html", publisher: "北京经开区管委会相关办公室", sourceGrade: "official", evidence: "官方通知明确申报时间、政策兑现入口、政策咨询电话和办事指南附件；金额正文未列明，保持待核。" }],
    verifiedAt: "2026-08-10",
    summary: "经开区数据领域核心技术攻关补贴本轮已于 8 月 14 日截止，金额仍需回到办事指南核验。",
    businessImpact: "数据基础设施、数据安全和 AI 数据应用企业可寻找项目联合申报、技术服务和材料辅导机会。",
    complianceImpact: "不能从“补贴申报”标题推断补贴比例或上限，必须以附件指南和平台字段为准。",
    action: "本轮已截止；保留项目边界、预算和数据合规材料，跟踪下一批申报通知。",
  },
  {
    id: "bj-high-tech-fund-202602",
    title: "2026年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第二批）——Token、数据集与 OPC 服务券",
    region: "北京市级",
    supportDirections: ["人工智能赋能新型工业化高质量数据集建设奖励", "人工智能大模型应用 Token 补贴", "OPC 全栈资源包服务券"],
    mechanism: "项目奖励/费用补贴/服务券",
    beneficiaries: ["在京信息软件业企业", "在京工业企业", "高质量数据集建设单位", "OPC 企业"],
    status: "current",
    applicationWindow: "2026-07-31—2026-08-31 17:30；OPC专项服务券常态化申报",
    amount: "数据集首次交易奖励最高 100 万元、每次复卖增加最高 20 万元、单个数据集累计最高 200 万元，单企业年度累计最高 500 万元；Token 按补贴期内认定费用最高 30% 补贴，单项目最高 1000 万元；OPC 三个月 Token、算力、数据消费达到 1000 元后全额补贴，单家最高 10 万元",
    eligibility: "申报单位须在京且无失信惩戒；数据集须完成合规交易并有应用价值；Token 补贴面向购买非关联方 Token 的信息软件业、工业企业；OPC 服务券需通过 OPC 成长社区并满足三个月累计消费额 1000 元；同一单位原则上只能获得 2026 年高精尖项目资金一个方向支持。",
    applicationUrl: BEIJING_REDEMPTION,
    basisPolicyIds: ["bj-high-tech-fund-202602", "bj-agent-measures", "bj-ai-industrial-internet"],
    sources: [{ title: "北京市经济和信息化局 北京市财政局 关于印发2026年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第二批）的通知", url: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202607/t20260730_4801241.html", publisher: "北京市经济和信息化局、北京市财政局", sourceGrade: "official", evidence: "官方文件明确数据集奖励、Token费用最高30%补贴、OPC服务券条件、8月31日17:30截止时间和北京市政策兑现专区入口。" }],
    verifiedAt: "2026-08-17",
    summary: "市级第二批高精尖资金把数据集交易奖励、Token实际使用补贴和 OPC 全栈服务券放入同一申报批次。",
    businessImpact: "模型应用客户、工业数据集建设单位、OPC 企业和服务商均可形成明确项目切入口，适合做 Token 订单、数据交易和服务券的组合式客户清单。",
    complianceImpact: "同一单位原则上只能选择一个高精尖项目资金方向，且已获市级财政支持的相同实施内容原则上不重复支持；材料需对费用、交易、主体资格和消费流水负责。",
    action: "在 8 月 31 日 17:30 前按方向锁定项目，分别准备 Token 账单和非关联方证明、数据集合规交易凭证或 OPC 三个月消费流水，通过北京市政策兑现专区提交。",
  },
  {
    id: "bj-ai-audiovisual-support-2026",
    title: "北京市促进“人工智能+视听”产业高质量发展重点项目申报指南（2026年）",
    region: "北京市级",
    supportDirections: ["视听多模态工具", "视听大模型与智能体", "AIGC 视听内容", "智能修复与视听场景"],
    mechanism: "项目奖励/事后支持",
    beneficiaries: ["北京广电视听领域法人和活动单位", "视听技术与内容制作企业", "视听大模型和智能体项目单位"],
    status: "current",
    applicationWindow: "2026-06-01—2026-09-30",
    amount: "技术/场景方向按项目总投资不超过 30%，单项最高 300 万元；内容方向单项最高 300 万元；安全、服务方向按项目总投资不超过 30%，单项最高 100 万元",
    eligibility: "项目原则上应于 2025 年 1 月至 2026 年 9 月研发、制作或建设完成并投入使用/播出/运营；同一项目只能选择一个支持方向，且不得重复享受同方向市级财政支持。",
    applicationUrl: "https://zhengce.beijing.gov.cn",
    basisPolicyIds: ["bj-ai-audiovisual-guide-2026"],
    sources: [
      { title: "北京市促进“人工智能+视听”产业高质量发展重点项目申报指南（2026年）", url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202605/t20260513_4649184.html", publisher: "北京市广播电视局", sourceGrade: "official", evidence: "官方指南列明申报期、项目完成时间、五类支持方向及申报材料。" },
      { title: "北京市促进“人工智能+视听”产业高质量发展重点项目支持管理办法（2026—2029年）", url: "https://gdj.beijing.gov.cn/zwxx/2024zcwj/202605/t20260511_4645308.html", publisher: "北京市广播电视局", sourceGrade: "official", evidence: "官方管理办法列明技术/场景、内容、安全和服务方向的奖励比例与单项上限。" },
    ],
    verifiedAt: "2026-08-10",
    summary: "视听 AI 项目支持覆盖技术、内容、场景、安全和服务五类方向，申报窗口持续至 9 月 30 日。",
    businessImpact: "适合把多模态模型、视频理解、数字人、内容生产和智能运维能力与广电视听客户联合包装。",
    complianceImpact: "需准备知识产权、版权、备案、播出和投资凭证；同一项目不得跨方向或重复申报。",
    action: "先完成项目方向单选和证据清单，确认政策兑现平台的当期项目入口后再承诺支持金额。",
  },
];

export const subsidyThemes = ["算力", "Token", "数据", "场景", "模型", "OPC"] as const;

const districtNames = ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区", "北京市级", "北京经开区"];

export const coverageRecords: CoverageRecord[] = districtNames.map((district) => {
  const verified = subsidyPolicies.filter((policy) => policy.region === district);
  if (verified.length > 0) {
    const currentScan = district === "北京市级" || district === "北京经开区" ? "2026-08-10" : "2026-08-03";
    return { district, scanStatus: "verified_records", lastScanned: currentScan, channelsChecked: ["政府政策库", "主管部门通知", "政策兑现平台"], leadCount: 0, nextReview: "2026-08-17" };
  }
  if (["朝阳区", "石景山区", "昌平区", "大兴区", "顺义区", "房山区"].includes(district)) {
    return { district, scanStatus: "scanned_no_official", lastScanned: "2026-08-03", channelsChecked: ["区政府网站", "区经信/科信部门", "政策兑现入口"], leadCount: 0, nextReview: "2026-08-10" };
  }
  if (district === "门头沟区") {
    return { district, scanStatus: "lead_pending_verification", lastScanned: "2026-08-03", channelsChecked: ["区级公开平台", "园区/平台动态"], leadCount: 1, nextReview: "2026-08-07" };
  }
  return { district, scanStatus: "not_scanned", lastScanned: "—", channelsChecked: [], leadCount: 0, nextReview: "2026-08-10" };
});

export function currentSubsidies(): SubsidyPolicy[] {
  return subsidyPolicies.filter((policy) => policy.status === "current");
}

export function subsidyStatusLabel(status: SubsidyStatus): string {
  return {
    current: "当前可申报",
    effective_waiting_round: "政策有效·等批次",
    closed: "本轮已截止",
    lead_pending: "线索待核验",
  }[status];
}

export const subsidyMetrics = {
  total: subsidyPolicies.length,
  current: subsidyPolicies.filter((policy) => policy.status === "current").length,
  waiting: subsidyPolicies.filter((policy) => policy.status === "effective_waiting_round").length,
  closed: subsidyPolicies.filter((policy) => policy.status === "closed").length,
  pending: subsidyPolicies.filter((policy) => policy.status === "lead_pending").length,
  verifiedRegions: coverageRecords.filter((item) => item.scanStatus === "verified_records").length,
  scannedRegions: coverageRecords.filter((item) => item.scanStatus !== "not_scanned").length,
};
