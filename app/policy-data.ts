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

export type PolicyGroup = { id: "national" | "beijing" | "districts" | "regions"; title: string; note: string; policies: PolicyWithBrief[] };

export const siteCutoff = {
  date: "2026-09-21",
  isoWeek: 39,
} as const;

function shiftDate(date: string, days: number) {
  const shifted = new Date(`${date}T00:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}

export const weeklyPeriods = {
  current: `${shiftDate(siteCutoff.date, -7)}—${shiftDate(siteCutoff.date, -1)}`,
  previous: `${shiftDate(siteCutoff.date, -14)}—${shiftDate(siteCutoff.date, -8)}`,
} as const;

const policyGroupsBase = [
  {
    id: "national" as const,
    title: "国家部委（22 项）",
    note: "与北京企业机会、合规或基础设施直接相关的国家政策基线。",
    policies: [
      { title: "工业和信息化部办公厅关于开展人工智能应用服务商培育专项行动的通知", issuer: "工业和信息化部办公厅", date: "2026-08-31", themes: "AI / 大模型 / 算力 / 数据 / 安全", href: "https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2026/art_6fbc038bf15c445ab53b2a94a3f9d4e4.html", status: "持续适用" },
      { title: "2026年工业和信息化领域创新任务揭榜挂帅工作通知", issuer: "工信部等七部门", date: "2026-07-29", themes: "AI / 大模型", status: "待回核" },
      { title: "第二批央企AI战略性高价值场景和行业高质量数据集", issuer: "国务院国资委", date: "2026-07-27", themes: "AI / 数据", href: "https://wap.sasac.gov.cn/n2588020/n2588072/n2590902/n2590904/c35690985/content.html", status: "持续适用" },
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
      { title: "2026年“数据要素×”大赛全国总决赛通知", issuer: "国家数据局等部门", date: "2026-09-08", themes: "数据 / AI / 场景", href: "https://www.nda.gov.cn/sjj/zwgk/tzgg/0908/20260908100236590767189_mobile.html", status: "滚动核验" },
    ],
  },
  {
    id: "beijing" as const,
    title: "北京市级（24 项）",
    note: "北京本市的政策、实施方案及可与企业行动直接关联的兑现机制。",
    policies: [
      { title: "北京市加快词元经济发展的行动方案（2026—2028年）", issuer: "北京市经济和信息化局、北京市发展和改革委员会", date: "2026-09-18", themes: "AI / 大模型 / Token / 算力 / 数据", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202609/t20260918_4870474.html", status: "持续适用" },
      { title: "北京市人工智能应用服务商资源池征集通知", issuer: "北京市经济和信息化局", date: "2026-09-18", themes: "AI / 大模型 / 数据 / 算力 / 安全", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202609/t20260918_4869930.html", status: "滚动核验" },
      { title: "北京市城市科技与精细化管理领域第二批揭榜挂帅任务榜单", issuer: "北京市科学技术委员会、中关村科技园区管理委员会", date: "2026-09-17", themes: "AI / 数据 / 场景 / 智能运维", href: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260917_4868421.html", status: "滚动核验" },
      { title: "北京市科学技术委员会、中关村科技园区管理委员会等部门关于发布2026年度“AI+”方向“揭榜挂帅”专项榜单及公开征集AI赋能生物育种方向储备课题的通知", issuer: "北京市科委、中关村管委会等部门", date: "2026-09-04", themes: "AI / 大模型 / 数据 / 场景", href: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260904_4851307.html", status: "滚动核验" },
      { title: "北京市科委等单位关于发布2026年度AI+气象“揭榜挂帅”专项榜单的通知", issuer: "北京市科委、中关村管委会、北京市气象局", date: "2026-08-17", themes: "AI / 大模型 / 数据 / 场景", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202608/t20260818_4827195.html", status: "滚动核验" },
      { title: "北京市科委、中关村管委会关于转发新一代人工智能国家科技重大专项2026年度“以赛代评”公开项目申报指南的通知", issuer: "北京市科委、中关村管委会", date: "2026-08-12", themes: "AI / 大模型", href: "https://kw.beijing.gov.cn/zwgk/zcwj/202608/t20260812_4820137.html", status: "滚动核验" },
      { title: "北京市科委、中关村管委会关于征集2026年“人工智能+新材料”创新发展储备课题的通知", issuer: "北京市科委、中关村管委会", date: "2026-08-06", themes: "AI / 数据 / 场景", href: "https://www.beijing.gov.cn/fuwu/lqfw/gggs/202608/t20260807_4812761.html", status: "滚动核验" },
      { title: "北京市经济和信息化局关于开展2026年度智能工厂梯度培育行动的通知", issuer: "北京市经济和信息化局", date: "2026-07-23", themes: "AI / 数据 / 算力", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4780574.html", status: "滚动核验" },
      { title: "北京市促进“人工智能+视听”产业高质量发展重点项目申报指南（2026年）", issuer: "北京市广播电视局", date: "2026-05-07", themes: "AI / 大模型 / 数据", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202605/t20260513_4649184.html", status: "滚动核验" },
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
      { title: "2026年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第二批）", issuer: "北京市经信局、市财政局", date: "2026-07-30", themes: "AI / 大模型 / Token / 数据", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202607/t20260730_4801241.html", status: "滚动核验" },
      { title: "促进商业卫星遥感数据资源开发利用的若干措施（2026—2030年）", issuer: "北京市经信局等", date: "2026-01-23", themes: "数据", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202601/t20260123_4459532.html", status: "持续适用" },
      { title: "北京人工智能创新高地建设行动计划", issuer: "北京市经信局等", date: "2026-01-05", themes: "AI / 算力", href: "https://jxj.beijing.gov.cn/ztzl/ywzt/hbjh/hbdt/zcwj/rgznzc/202603/t20260316_4557526.html", status: "持续适用" },
      { title: "关于征集2026年科技服务业专项企业效能提升项目（第二批）的通知", issuer: "北京市科委、中关村管委会", date: "2026-09-01", themes: "AI / 大模型 / 数据 / 算力 / 安全", href: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260901_4845672.html", status: "滚动核验" },
      { title: "关于征集北京市住房城乡建设领域创新应用场景的通知", issuer: "北京市住房和城乡建设委员会", date: "2026-09-02", themes: "AI / 数据 / 场景 / 智能运维", href: "https://zjw.beijing.gov.cn/bjjs/kjcxytg/znjz/zjtz76/744118225/index.shtml", status: "滚动核验" },
    ],
  },
  {
    id: "districts" as const,
    title: "北京各区（9 项）",
    note: "区级支持政策应结合注册地、项目落地地和当期申报要求使用。",
    policies: [
      { title: "经开区：关于支持词元驱动智能经济高质量发展的若干措施（试行）", issuer: "北京经济技术开发区管理委员会", date: "2026-08-03", themes: "AI / 大模型 / 算力 / 数据 / 场景", href: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202608/t20260805_4809951.html", status: "持续适用" },
      { title: "经开区：2026年人工智能行业大模型应用落地支持申报通知", issuer: "北京经济技术开发区信息技术产业局", date: "2026-07-31", themes: "AI / 大模型 / 场景", href: "https://open.beijing.gov.cn/html/yizhuang/zcqd/2026/8/1785742151631.html", status: "滚动核验" },
      { title: "经开区：关于支持人工智能原生人才发展的若干措施（AI人才八条）", issuer: "北京经济技术开发区管理委员会", date: "2026-08-18", themes: "AI / 大模型 / 人才", href: "https://kfqgw.beijing.gov.cn/ywdt/tt/cxzc/202608/t20260819_4828225.html", status: "滚动核验" },
      { title: "经开区：2026年亦城人才·人工智能超级个体（OPC）认定申报通知", issuer: "北京经开区工委组织人事部", date: "2026-07-08", themes: "AI / 大模型 / 人才", href: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260707_4750995.html", status: "滚动核验" },
      { title: "经开区：2026年数据领域核心技术攻关补贴申报通知", issuer: "北京市智慧城市基础设施与智能网联汽车协同发展工作办公室", date: "2026-07-03", themes: "数据 / AI", href: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202607/t20260703_4745935.html", status: "滚动核验" },
      { title: "通州区：支持数字经济高质量发展的若干措施", issuer: "通州区经信局", date: "2026-06-22", themes: "AI / 算力 / 数据", href: "https://www.bjtzh.gov.cn/bjtz/xxfb/202606/1792651.shtml", status: "持续适用" },
      { title: "昌平区：推动“人工智能+”创新发展行动计划（2026—2028年）", issuer: "昌平区政府办", date: "2026-04-27", themes: "AI", href: "https://www.bjchp.gov.cn/cpqzf/xxgk2671/zcwj/2026042815575798679/index.html", status: "持续适用" },
      { title: "海淀区：关于全面打造OPC创业生态的若干措施", issuer: "中关村科学城管委会", date: "2026-04-08", themes: "AI / 大模型", href: "https://zyk.bjhd.gov.cn/zwdt/zcwj/202604/t20260414_4811721.shtml", status: "持续适用" },
      { title: "北京经开区：进一步加快建设全域人工智能之城实施方案（2026—2027年）", issuer: "北京经开区管委会", date: "2026-01-29", themes: "AI / 大模型 / 算力 / 数据", href: "https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202601/t20260130_4478660.html", status: "持续适用" },
    ],
  },
  {
    id: "regions" as const,
    title: "外省市重点（15 项）",
    note: "优先收录上海、广东、浙江、江苏及重点城市的官方政策；外省市政策不等同于北京主体可申报。",
    policies: [
      { title: "杭州市滨江区加快推进人工智能产业高质量发展的若干政策", issuer: "杭州市滨江区人民政府", date: "2026-09-11", themes: "AI / 大模型 / Token / 算力 / 数据", href: "https://www.hzbjzx.gov.cn/data/2026/09/t20260902105056841.htm", status: "持续适用" },
      { title: "深圳市打造人工智能先锋城市项目扶持计划（第二批）申请指南", issuer: "深圳市工业和信息化局", date: "2026-08-27", themes: "AI / 大模型 / 算力", href: "https://gxj.sz.gov.cn/gkmlpt/content/12/12956/post_12956819.html?jump=true", status: "滚动核验" },
      { title: "2026年第一批上海市城市数字化转型（区块链创新应用）申请类项目拟支持情况公示", issuer: "上海市数据局", date: "2026-08-24", themes: "数据 / 安全", href: "https://sdb.sh.gov.cn/gsgg/20260824/148702e0f0f74443a81b259f4582ce21.html", status: "滚动核验" },
      { title: "2026年第一批算力生态合作伙伴名单公示", issuer: "上海市数据局、上海市通信管理局", date: "2026-08-25", themes: "算力 / 数据", href: "https://sdb.sh.gov.cn/gsgg/20260825/cd1a719b889b4d8584e6cb2d5d0fbbc4.html", status: "滚动核验" },
      { title: "南京市人工智能服务商、智能体开发商征集通知", issuer: "南京市工业和信息化局", date: "2026-08-13", themes: "AI / 大模型 / 算力 / 数据 / 安全", href: "https://gxj.nanjing.gov.cn/njsjjhxxhwyh/202608/t20260813_5893091.html", status: "滚动核验" },
      { title: "广州政务人工智能与城市可信数据空间建设答复", issuer: "广州市政务服务和数据管理局", date: "2026-08-24", themes: "AI / 数据 / 安全", href: "https://zsj.gz.gov.cn/gkmlpt/content/10/10976/post_10976669.html", status: "持续适用" },
      { title: "南京市抢占人工智能发展先机专题部署", issuer: "中共南京市委、南京市人民政府", date: "2026-08-28", themes: "AI / 大模型 / 算力 / 数据", href: "https://www.nanjing.gov.cn/zgnjsjb/jrtt/202608/t20260828_5900927.html", status: "滚动核验" },
      { title: "关于印发《南京江北新区促进软件产业高质量发展的若干政策措施》的通知", issuer: "南京江北新区管理委员会", date: "2026-07-29", themes: "AI / 软件 / 算力 / 安全", href: "https://njna.nanjing.gov.cn/njsjbxqglwyh/202607/t20260731_5887148.html", status: "持续适用" },
      { title: "广东省人工智能与机器人技能大赛（2026年）通知", issuer: "广东省工业和信息化厅等部门", date: "2026-09-01", themes: "AI / 机器人 / 人才", href: "https://gxj.gz.gov.cn/yw/tzgg/content/post_10987433.html", status: "滚动核验" },
      { title: "江苏省增补2026年贸易促进计划及重点展会资金（江苏数智电商展）", issuer: "江苏省商务厅", date: "2026-09-01", themes: "AI / 产业应用 / 资金", href: "https://doc.jiangsu.gov.cn/art/2026/9/3/art_78712_11824614.html", status: "滚动核验" },
      { title: "上海市经济信息化委关于组织开展人工智能应用服务商征集工作的通知", issuer: "上海市经济和信息化委员会", date: "2026-09-11", themes: "AI / 安全 / 智能运维", href: "https://sheitc.sh.gov.cn/cyfz/20260911/efa1c634559c44d7a61e9400a63acdb8.html", status: "滚动核验" },
      { title: "关于征集2026年上海市行业高质量数据集案例的通知", issuer: "上海市数据局", date: "2026-09-07", themes: "数据 / AI / 具身智能", href: "https://dt.sheitc.sh.gov.cn/cms/slddt/2861.jhtml", status: "滚动核验" },
      { title: "市工业和信息化局关于发布2026年模型券（申领）项目（第二批）申请指南的通知", issuer: "深圳市工业和信息化局", date: "2026-09-07", themes: "AI / 大模型 / 算力 / 资金", href: "https://gxj.sz.gov.cn/szsgyhxxhjwzgkml/szsgyhxxhjwzgkml/qt/tzgg/content/post_12970192.html", status: "滚动核验" },
      { title: "深圳市工业和信息化局等关于印发《深圳市推动人工智能与应用发展行动计划（2026—2028年）》的通知", issuer: "深圳市工业和信息化局、发展改革委、科技创新局", date: "2026-09-04", themes: "AI / 大模型 / 数据 / 算力 / 安全 / 视联网", href: "https://gxj.sz.gov.cn/gkmlpt/content/12/12965/post_12965466.html", status: "持续适用" },
      { title: "深圳市龙岗区人工智能（机器人）署关于延长2026年龙岗区场景应用揭榜项目榜单征集申报受理时限的通知", issuer: "深圳市龙岗区人工智能（机器人）署", date: "2026-09-03", themes: "AI / 场景 / 机器人", href: "https://www.lg.gov.cn/xxgk/zwgk/tzgg/content/post_12966833.html", status: "滚动核验" },
    ],
  },
];

const tailoredBriefs: Record<string, Pick<PolicyWithBrief, "summary" | "businessImpact" | "complianceImpact" | "action">> = {
  "北京市加快词元经济发展的行动方案（2026—2028年）": { summary: "北京将词元经济作为模型应用和智能体产业化的新抓手，覆盖 Token 工厂、算力适配、数据产品、智能体和工程师生态。", businessImpact: "模型服务、算力适配、数据产品、智能体交付和平台运营都可围绕词元计量、分发和消耗形成新业务入口。", complianceImpact: "行动方案是发展导向文件，不等同于当前财政补贴；具体支持比例、兑现批次和申报材料仍需配套通知。", action: "把 Token 用量、模型调用、算力合同、数据产品和智能体交付记录纳入统一台账，跟踪后续配套细则。" },
  "北京市人工智能应用服务商资源池征集通知": { summary: "北京征集人工智能应用服务商资源池，覆盖咨询规划、交付实施、运营管理、安全治理、培训测试等可交付能力。", businessImpact: "大模型、云网算力、数据、安全和智能运维等产线可通过服务商资源池和服务团获得后续场景对接机会。", complianceImpact: "申报主体须为在京独立法人或机构，具备稳定团队、项目案例和良好信用；这是资源池征集，不是直接补贴。", action: "在10月15日前按区经信主管部门要求准备服务案例、合同验收、团队与安全治理材料，避免把资源池认定误写成资金承诺。" },
  "北京市城市科技与精细化管理领域第二批揭榜挂帅任务榜单": { summary: "北京发布城市科技与精细化管理第二批揭榜挂帅任务，强调企业牵头、产学研协同、真实场景部署和可验收指标。", businessImpact: "智能运维、视联网、城市治理、数据平台和安全服务商可与高校院所及场景单位组成联合攻关团队。", complianceImpact: "参与单位原则上不超过4家，企业配套经费与财政科技经费比例不低于2:1，并承担两年维护和验收责任。", action: "在10月13日17:00前锁定榜单任务、场景用户、联合单位、预算和验收指标，通过科技项目平台提交。" },
  "工业和信息化部办公厅关于开展人工智能应用服务商培育专项行动的通知": { summary: "工信部启动人工智能应用服务商培育专项行动，建立全国服务商资源池，推动咨询规划、交付实施、运营管理和安全治理能力标准化。", businessImpact: "泛行业 IT 集成、云网算力、模型应用、安全治理和长期运维服务商可进入地方资源池、服务团和真实场景供需对接，形成跨产线联合交付机会。", complianceImpact: "该文件是服务商培育与信息报送行动，不是面向企业的直接补贴；地方资源池信息需按要求报送，服务商须将网络安全、数据安全、伦理治理和业务合规嵌入全流程。", action: "整理公司五条产线的服务商档案、典型项目、合同验收与安全治理能力，准备与北京市工信部门资源池和服务团对接。" },
  "第二批央企AI战略性高价值场景和行业高质量数据集": { summary: "国务院国资委发布第二批央企人工智能战略性高价值场景和行业高质量数据集，并同步上线 AI 开源社区、启动智能软件工厂联合筑基工程。", businessImpact: "央企高价值场景、行业数据集、智能软件与算力基础设施将形成更多上下游联合建设和场景开放机会。", complianceImpact: "本次为成果发布而非公开申报通知，具体参与方式、项目清单和采购条件需以各央企后续公告为准。", action: "梳理重点央企客户的场景与数据能力，跟踪后续场景开放、联合建设和采购信息。" },
  "北京市关于加快智能体引领发展的若干措施": { summary: "围绕基础模型、智能体原生应用、Token 经济、算力保障和安全治理推出十项措施。", businessImpact: "可关注智能体场景、Token 服务、算力券及重点项目支持。", complianceImpact: "智能体分级分类监管仍在探索，补贴和揭榜以配套通知为准。", action: "梳理智能体产品、算力和场景项目，跟进后续揭榜及券类细则。" },
  "北京市科学技术委员会、中关村科技园区管理委员会等部门关于发布2026年度“AI+”方向“揭榜挂帅”专项榜单及公开征集AI赋能生物育种方向储备课题的通知": { summary: "北京发布“AI+”方向揭榜挂帅榜单，并同步征集 AI 赋能生物育种储备课题，覆盖智慧感知安检、视频物联网络安全、人力资源智能体、科技项目管理和育种科学智能等方向。", businessImpact: "大模型、视频物联安全、智能运维、数据治理、科研智能体和生物育种团队可通过联合攻关进入真实场景，形成技术研发、集成实施和持续运营机会。", complianceImpact: "揭榜项目需全覆盖任务、具备可量化指标并接受真实场景验收，企业配套经费与财政科技经费比例不低于2:1；生物育种课题周期原则上不超过2年，具体经费以系统字段和附件为准。", action: "在9月23日18:00前筛选榜单方向，组织不超过4家联合单位，准备盖章简表、技术路线、数据合规说明、指标和配套经费证明。" },
  "北京市经济和信息化局关于开展2026年度智能工厂梯度培育行动的通知": { summary: "北京市组织基础级、先进级、卓越级和领航级智能工厂梯度培育，卓越级和领航级项目需在8月15日前完成线上申报并提交纸质材料。", businessImpact: "制造业客户的 AI 视觉、智能体、工业软件和数据治理项目可围绕智能工厂要素条件形成申报或交付方案。", complianceImpact: "申报主体需在京注册并接受现场核查；这是培育认定，不等同于财政补贴承诺。", action: "筛选已获先进级或具备申报基础的制造客户，按要素条件、场景指引和材料清单倒排准备。" },
  "北京市促进“人工智能+视听”产业高质量发展重点项目申报指南（2026年）": { summary: "面向视听技术、视听内容、视听场景等方向征集重点项目，本轮申报截止时间已由9月30日延至10月31日。", businessImpact: "多模态工具、视听大模型/智能体、AIGC 内容和智能修复项目可与广电视听客户形成申报与交付机会。", complianceImpact: "同一项目只能选择一个支持方向，需准备知识产权、投资凭证、版权、备案和播出证明等材料；延期只调整截止时间，不改变其他条件。", action: "在10月31日前按技术、内容、场景方向筛选项目，核对政策兑现入口和项目投资/版权证据。" },
  "北京市公共数据资源授权运营管理办法": { summary: "明确公共数据整体授权、授权期限、定价和收益分配的管理框架。", businessImpact: "可信数据空间、北数所交易及公共数据应用成为可进入的合作方向。", complianceImpact: "须符合授权协议、使用范围和数据安全要求。", action: "评估可申请的数据场景及授权运营合作路径。" },
  "支持人工智能OPC创新发展行动方案（试行）": { summary: "支持 AI 一人公司社区建设，并配置 Token、算力和数据券等创业支持。", businessImpact: "OPC 企业可关注社区入驻、券类支持、融资和路演机会。", complianceImpact: "支持对象、额度和兑现条件以当期申报要求为准。", action: "核对企业身份与入驻资格，准备产品和融资材料。" },
  "北京市AI赋能工业互联网高质量发展实施方案（2026—2028年）": { summary: "提出工业高质量数据集、工业智能体和解决方案供应商的建设目标。", businessImpact: "行业模型、智能体和软件智能化项目可争取相关支持。", complianceImpact: "项目需满足工业场景、数据质量和验收要求。", action: "围绕制造业客户形成可验收的数据集或智能体方案。" },
  "2026年高精尖产业发展项目资金实施指南（第一批）": { summary: "明确算力券、模型、软件智能化和服务券等资金支持方向。", businessImpact: "可按机构、行业模型、开源和备案模型等路径匹配资助。", complianceImpact: "该类指南具有批次与截止期，须以当期申报通知为准。", action: "核对申报主体、备案情况和项目材料，持续跟踪下一批指南。" },
  "2026年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第二批）": { summary: "第二批实施指南将人工智能高质量数据集建设奖励、Token 实际使用补贴和 OPC 全栈服务券纳入同一批次。数据集首次交易奖励最高 100 万元、累计最高 200 万元；Token 按认定费用最高 30% 补贴、单项目最高 1000 万元；OPC 三个月 Token、算力、数据消费达到 1000 元后可申请全额补贴，单家最高 10 万元。", businessImpact: "模型应用客户、工业数据集建设单位、OPC 企业和服务商均有明确切入口，适合把 Token 订单、数据交易和服务券产品放进同一客户清单。", complianceImpact: "申报主体须在京且无失信惩戒，同一单位原则上只能获得 2026 年高精尖项目资金一个方向支持；同一项目不得重复获得市级财政支持。", action: "在 8 月 31 日 17:30 前按方向锁定项目，分别准备 Token 账单和非关联方证明、数据集合规交易凭证或 OPC 三个月消费流水，并通过北京市政策兑现专区提交。" },
  "北京经开区：进一步加快建设全域人工智能之城实施方案（2026—2027年）": { summary: "提出建设全域人工智能之城，覆盖企业集聚、开发者、Token 和 OPC 生态。", businessImpact: "经开区落地企业可关注模型券、社区和产业场景机会。", complianceImpact: "需结合注册地、项目落地和区级具体兑现规则判断。", action: "评估亦庄落地可行性，并对接对应园区和场景资源。" },
  "经开区：2026年亦城人才·人工智能超级个体（OPC）认定申报通知": { summary: "经开区将人工智能超级个体纳入亦城人才体系，2026年申报窗口为7月9日至8月10日。", businessImpact: "符合条件的 AI 核心负责人和小团队可获得人才认定、奖励及企业服务配套，适合纳入 OPC 客户筛选。", complianceImpact: "申报人只能依托一个主体，主体须在经开区依法经营并按办事指南提交材料。", action: "今天优先检查申报状态、主体实地办公和团队人数等条件，逾期不再受理。" },
  "经开区：2026年数据领域核心技术攻关补贴申报通知": { summary: "经开区面向数据领域核心技术攻关项目开展2026年申报，窗口为7月6日至8月14日，统一通过政策兑现平台提交。", businessImpact: "数据基础设施、数据流通、数据安全和 AI 数据应用项目可寻找联合申报或交付机会。", complianceImpact: "具体支持方向、材料和金额以附件办事指南及平台项目页为准，不从通知标题推断补贴额度。", action: "在8月14日前核对办事指南、项目边界、预算和数据合规材料，联系经开区政策申报窗口。" },
  "北京市科委等单位关于发布2026年度AI+气象“揭榜挂帅”专项榜单的通知": { summary: "市科委、中关村管委会与市气象局围绕首都及京津冀极端天气预报发布3个 AI+气象榜单，覆盖0—6小时短临、0—72小时短期和15—60天次季节预测。", businessImpact: "气象模型、时空数据、算力平台和行业应用团队可联合申报，适合把模型研发、示范应用和防灾减灾场景打包推进。", complianceImpact: "申报不设注册年限、年龄、学历和职称门槛，但需覆盖榜单任务、企业配套经费与财政科技经费不低于2:1，并接受真实场景验收。", action: "在9月4日18:00前锁定榜单方向、联合单位和示范用户，准备盖章简表、技术路线、量化指标及配套经费证明。" },
  "北京市科委、中关村管委会关于转发新一代人工智能国家科技重大专项2026年度“以赛代评”公开项目申报指南的通知": { summary: "北京市转发新一代人工智能国家科技重大专项“以赛代评”公开项目指南，要求通过国家科技管理信息系统公共服务平台在线填报。", businessImpact: "具备基础模型、智能体、算法和应用研发能力的企业、高校及科研院所可关注国家重大专项公开赛道与联合攻关机会。", complianceImpact: "附件材料须全部电子扫描上传；受理时间为8月10日10:00至9月4日16:00，项目边界和资助方式以科技部原指南为准。", action: "先回读科技部原指南，确认项目赛道、牵头资格和附件清单，再在国家科技管理信息系统完成单位审核和提交。" },
  "北京市科委、中关村管委会关于征集2026年“人工智能+新材料”创新发展储备课题的通知": { summary: "面向材料智能研发服务能力提升和 AI 赋能关键产品开发，征集企业牵头的“人工智能+新材料”储备课题。", businessImpact: "材料数据计算、数据治理、专业模型、智能实验室和材料研发 CRO 服务商可与材料、装备、器件企业形成联合方案。", complianceImpact: "每家企业限报1项，企业配套经费与科技经费比例不低于2:1，支持周期和金额须登录科技计划综合管理平台查看；8月20日17:00截止。", action: "本轮已截止；保留课题方案、材料数据与知识产权证据，跟踪下一批 AI+新材料储备课题或正式立项通知。" },
  "经开区：关于支持词元驱动智能经济高质量发展的若干措施（试行）": { summary: "经开区以“词元”作为智能经济政策抓手，覆盖算力、数据券、模型聚合、场景消耗、OPC 券和智能体支付沙盒。", businessImpact: "算力运营、数据交易、模型聚合、智能体交付、具身智能和汽车制造等企业可从基础设施、服务中台和场景应用三条链路切入。", complianceImpact: "政策适用于亦庄新城225平方公里内依法经营主体，有效期至2030年12月31日；同一项目遵循从优不重复，智能体支付和数据流通仍需监管沙盒及合规验证。", action: "按算力、数据、平台、场景和 OPC 五类机会建立客户清单，等待配套兑现细则后再确认申报入口和材料。" },
  "经开区：2026年人工智能行业大模型应用落地支持申报通知": { summary: "经开区面向行业大模型应用落地开展2026年项目支持申报，官方窗口为7月31日至8月19日。", businessImpact: "医疗健康、商业航天、汽车制造等行业模型应用客户可围绕实际部署、调用消耗和场景效果形成申报或交付项目。", complianceImpact: "本轮已截止；支持方向、金额和材料以办事指南及政策兑现平台项目页为准，不能从通知标题推断补贴额度。", action: "本轮已截止；保存项目合同、模型调用和场景验收材料，跟踪经开区下一轮行业模型应用支持。" },
  "经开区：关于支持人工智能原生人才发展的若干措施（AI人才八条）": { summary: "经开区发布 AI 原生人才专项政策，覆盖顶尖科学家、产业精英、OPC、实习生、前沿部署工程师和产业交流生态。", businessImpact: "AI 原生创业团队、模型企业、高校和开发者社区可围绕人才引育、创业启动、算力集群、研发空间和产业场景对接形成服务机会。", complianceImpact: "官方发布信息披露产业精英最高500万元、OPC个人最高50万元和活动支持最高100万元，但具体认定条件、兑现批次和申请入口仍以正式政策文件及通知为准。", action: "先按顶尖人才、产业精英、OPC、实习生和生态活动五类建立客户清单，跟踪正式政策文本和申报批次，不提前承诺金额。" },
  "深圳市打造人工智能先锋城市项目扶持计划（第二批）申请指南": { summary: "深圳市工信局发布 2026 年人工智能先锋城市扶持计划第二批申请指南，项目包含模型券兑现、国产人工智能生态源头创新中心服务费用兑现。", businessImpact: "深圳本地模型应用企业可围绕已备案模型服务、智能体开发和应用迁移适配形成兑现项目；模型服务商、国产软硬件适配中心也有服务费用资助机会。", complianceImpact: "申报主体和项目实施地须在深圳市（含深汕特别合作区）；模型券兑现要求模型服务已完成且购买模型服务总费用不低于50万元，具体受理时间、材料和入口以官方附件及统一信息平台为准。该政策不直接适用于北京主体。", action: "将深圳客户单独建档，先核对模型备案、非关联方服务机构、合同、发票、支付凭证和项目验收材料；待官方附件可访问后再确认申报截止日与平台入口。" },
  "2026年第一批上海市城市数字化转型（区块链创新应用）申请类项目拟支持情况公示": { summary: "上海市数据局公示2026年第一批城市数字化转型（区块链创新应用）申请类项目拟支持单位，依据《上海市城市数字化转型专项资金管理办法》组织评审。", businessImpact: "区块链存证、可信流通、数据安全和城市数字化应用服务商可围绕入选项目寻找联合交付与复制机会。", complianceImpact: "这是拟支持结果公示，不是新的申报窗口；支持范围、金额和拨付以专项资金管理办法及后续正式文件为准。", action: "关注拟支持单位及项目方向，按数据安全、可信空间和城市治理场景建立合作清单。" },
  "2026年第一批算力生态合作伙伴名单公示": { summary: "上海市数据局、上海市通信管理局公布第一批算力生态合作伙伴38家，分为算力供给方、算力应用方和平台共建方。", businessImpact: "算力供给、算力应用、平台共建三类生态伙伴可形成算力调度、行业模型部署和平台运营合作机会。", complianceImpact: "名单公示不等同于财政补贴或采购承诺，合作条件和后续项目机会需以主管部门及入选单位公告为准。", action: "按供给、应用、平台三类筛选潜在伙伴，跟踪上海算力生态后续采购、场景开放和合作通知。" },
  "南京市人工智能服务商、智能体开发商征集通知": { summary: "南京市工信局面向甲方单位征集人工智能服务商和智能体开发商，建立“两商”资源储备库，覆盖算力数据、行业融合、安全合规和运维等服务。", businessImpact: "具备大模型、算力数据、AI一体化集成、安全合规和长效运维能力的企业，可进入南京后续项目供需匹配范围。", complianceImpact: "本轮材料申报截止2026年8月25日，征集为常态化工作，后续新增服务商可按月补充报送；需由甲方单位填报并提供合同、验收和上线证据。", action: "将现有客户项目合同、验收报告、运行截图和量化成效整理为“两商”证据包，跟踪按月补报和后续培育支持政策。" },
  "广州政务人工智能与城市可信数据空间建设答复": { summary: "广州市政数局在提案答复中披露“穗智政”政务人工智能中枢、公共数据授权运营平台和全省首个城市可信数据空间建设方向。", businessImpact: "政务智能体、轻量化模型、数据授权运营、可信数据空间和适老化智能终端形成持续场景合作机会。", complianceImpact: "提案答复属于工作部署和政策方向，不是直接财政补贴；数据开放和智能应用需遵守授权运营、数据安全与隐私保护要求。", action: "围绕政务、养老、基层治理和可信数据空间梳理可复制方案，等待后续试点、采购或场景征集公告。" },
  "南京市抢占人工智能发展先机专题部署": { summary: "南京市委理论学习中心组围绕人工智能和未来产业专题学习，提出加强算力芯片、模型、智能体、数据和人才供给，推进应用与创新创业。", businessImpact: "南京将继续把算力、模型、智能体、OPC和行业应用作为产业培育重点，适合提前布局生态伙伴和示范场景。", complianceImpact: "专题学习和工作部署不等同于已发布申报政策，具体支持额度、对象和入口需以后续正式通知为准。", action: "将南京列入外省市政策观察清单，跟踪算力基础设施、智能体应用和OPC培育的正式项目通知。" },
  "关于印发《南京江北新区促进软件产业高质量发展的若干政策措施》的通知": { summary: "南京江北新区自9月1日起实施软件产业政策，覆盖 AI+软件攻关、智算使用、首版次/首台套、国产操作系统适配和产教融合。", businessImpact: "泛行业 IT 运维、云网集成、信创适配、AI 软件和安全软件服务商可围绕最高200万元智算补贴、项目配套和适配改造形成客户机会。", complianceImpact: "政策适用于江北新区软件产业主导平台和街道，项目需就地运营或产业转化；同类政策按就高不重复执行。", action: "筛选南京及江北新区软件、信创和运维客户，核对注册/运营属地、智算使用凭证、适配投入和项目验收材料。" },
  "广东省人工智能与机器人技能大赛（2026年）通知": { summary: "广东省组织人工智能与机器人技能大赛，广州工信部门于9月1日转发，面向相关企业和个人开展宣传报名。", businessImpact: "可作为 AI、机器人、智能运维和人才生态的品牌展示与人才发现入口，适合连接广东本地客户及生态伙伴。", complianceImpact: "该事项为赛事通知，不是财政补贴或项目申报；报名资格、赛程和奖励以省级赛事原通知为准。", action: "关注省级赛事原文和报名入口，评估公司 AI、机器人及运维团队参赛或联合宣传机会。" },
  "江苏省增补2026年贸易促进计划及重点展会资金（江苏数智电商展）": { summary: "江苏省商务厅将江苏数智电商展增补纳入贸易促进计划，支持参展单位展位费，申报截止11月19日17:00。", businessImpact: "AI 软件、数据服务、智能制造和电商技术企业可借展会获取客户线索并申请展位费支持，适合与江苏本地渠道联合参展。", complianceImpact: "主体须在江苏省注册且信用良好；仅支持展位费，面积和单价有上限，补贴比例按统筹结果确定，不含运输、人员和会刊费用。", action: "在江苏政务服务完成法人注册，准备展位合同、发票和付款材料，11月19日17:00前通过省商务在线系统提交。" },
  "2026年“数据要素×”大赛全国总决赛通知": { summary: "国家数据局公布“数据要素×”大赛全国总决赛安排，入围团队须在9月16日24:00前通过赛事系统提交最终材料。", businessImpact: "数据产品、行业数据集和 AI 场景团队可借全国总决赛展示可复制成果，获得后续供需对接和推广机会。", complianceImpact: "该事项是赛事遴选，不等同于财政补贴；提交后材料不能修改，团队须确保数据权属、个人信息保护和知识产权证明完整。", action: "在9月16日24:00前完成 dataelementx.cn 线上提交，提前锁定参赛团队、案例数据和授权证明。" },
  "关于征集2026年科技服务业专项企业效能提升项目（第二批）的通知": { summary: "北京面向科技服务业企业征集效能提升项目，支持 AI、医疗健康、新材料、智能制造及大数据/大模型服务平台建设，申报截止9月23日18:00。", businessImpact: "公司 AI、数据、算力、安全和智能运维服务能力均可包装为科技服务平台、咨询交付或运营治理项目，适合与行业客户联合申报。", complianceImpact: "申报单位须为科技服务业法人，项目周期不超过1年且企业配套经费与科技经费不低于2:1；该项目金额以平台字段为准，不能预先承诺。", action: "在9月23日18:00前核对企业类型、项目周期、2:1配套经费和非关联交易材料，线上从北京市科技计划系统提交。" },
  "关于征集北京市住房城乡建设领域创新应用场景的通知": { summary: "北京住建领域公开征集 AI 视觉识别、智能规划设计、智能建造、设备预测性维护和建筑安全检测等创新应用场景，材料截止10月10日17:00。", businessImpact: "视联网、智能运维、云网集成和大模型团队可与建筑企业、物业和城市治理单位联合打造可落地示范场景。", complianceImpact: "这是场景征集与入选清单工作，不是直接财政补贴；申报主体须具备知识产权、完整解决方案和真实项目部署能力。", action: "在10月10日17:00前准备盖章申报材料、部署案例和数据安全说明，按通知邮箱提交。" },
  "上海市经济信息化委关于组织开展人工智能应用服务商征集工作的通知": { summary: "上海组织征集人工智能应用服务商和服务团，覆盖咨询规划、交付实施、运营管理、安全治理和测试评估，材料截止9月30日。", businessImpact: "公司泛行业 IT 集成、云网算力、安全和智能运维能力可按服务商或服务团形式进入上海资源池，形成跨区域项目机会。", complianceImpact: "服务商须为境内正常经营法人或非法人组织，服务团原则上由1家牵头并联合不少于2家成员；该事项是资源池征集，不是直接补贴。", action: "在9月30日前准备营业执照、信用记录、服务手册、团队证明、案例和资质材料，并提交所在区主管部门。" },
  "关于征集2026年上海市行业高质量数据集案例的通知": { summary: "上海征集已完成并经真实业务验证的行业高质量数据集案例，覆盖医疗、教育、城市治理、制造和具身智能等领域，材料截止9月24日17:00。", businessImpact: "数据治理、可信空间、模型训练和具身智能项目可用案例申报建立行业标杆，入选后有国家项目推荐和供需对接机会。", complianceImpact: "申报单位须为数据集权属单位并承担质量、安全合规和长期维护责任，需完成上海数据集开源社区登记；不属于直接财政补贴。", action: "在9月24日17:00前完成数据集登记，取得行业主管部门或区数据局推荐，并发送 Word 与盖章 PDF。" },
  "市工业和信息化局关于发布2026年模型券（申领）项目（第二批）申请指南的通知": { summary: "深圳发布2026年模型券申领项目第二批申请指南，具体申报要求、窗口和材料以官方附件为准，建议至少提前2个工作日提交。", businessImpact: "深圳本地模型服务机构、应用企业和算力服务商可围绕 Token/API 试用和模型消费券形成客户转化。", complianceImpact: "官方通知仅确认项目启动，金额、资格和截止时间仍需回到申请指南附件核验；该政策不直接适用于北京主体。", action: "先下载并核对附件指南和企业申报端指引，确认申报截止日、统一平台、模型清单与合同发票要求后再承诺。" },
  "深圳市工业和信息化局等关于印发《深圳市推动人工智能与应用发展行动计划（2026—2028年）》的通知": { summary: "深圳发布 AI 与应用发展行动计划，提出到2028年推动 AI 与科研、产业、消费、民生、治理和全球合作六大领域深度融合。", businessImpact: "先进制造、软件服务、专业服务、视联网/城市治理、智能运维和数据平台将持续出现 AI 改造、集成与运营需求。", complianceImpact: "行动计划是发展导向文件，不等同于当前可申报资金；具体补贴和项目入口需以后续专项指南为准。", action: "按六大领域建立深圳客户与生态伙伴清单，跟踪模型券、场景示范和行业专项配套通知。" },
  "深圳市龙岗区人工智能（机器人）署关于延长2026年龙岗区场景应用揭榜项目榜单征集申报受理时限的通知": { summary: "龙岗将 2026 年 AI 与机器人场景揭榜项目材料提交截止时间由9月4日延长至9月21日18:00。", businessImpact: "AI、机器人、视联网和智能运维方案商可利用延长期与龙岗场景方联合打磨方案，争取进入区级示范项目。", complianceImpact: "延长通知仅调整材料提交时间，其他申报事项仍以龙岗区人工智能产业扶持项目指南和实施细则为准。", action: "在9月21日18:00前回读龙岗项目指南，锁定场景方、技术指标、预算和部署证明后提交。" },
};

const policyIds: Record<string, string> = {
  "工业和信息化部办公厅关于开展人工智能应用服务商培育专项行动的通知": "nat-ai-service-providers-2026",
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
  "2026年“数据要素×”大赛全国总决赛通知": "nat-data-factor-finals-2026",
  "北京市关于加快智能体引领发展的若干措施": "bj-agent-measures",
  "北京市加快词元经济发展的行动方案（2026—2028年）": "bj-token-economy-action-2026",
  "北京市人工智能应用服务商资源池征集通知": "bj-ai-service-provider-pool-2026",
  "北京市城市科技与精细化管理领域第二批揭榜挂帅任务榜单": "bj-city-science-fine-management-bang-2026",
  "北京市公共数据资源授权运营管理办法": "bj-public-data-operation",
  "2026智慧城市场景创新需求（第四批）及智慧教育专项揭榜": "bj-smart-city-demand-202604",
  "2026年第三批AI赋能新型工业化高质量数据集需求清单": "bj-industrial-dataset-demand-202603",
  "推动高精尖产业深化产教融合行动方案（2026—2028年）": "bj-industry-education-2026",
  "支持人工智能OPC创新发展行动方案（试行）": "bj-ai-opc",
  "北京市AI赋能工业互联网高质量发展实施方案（2026—2028年）": "bj-ai-industrial-internet",
  "北京市智能眼镜产业高质量发展行动方案（2026—2030年）": "bj-smart-glasses",
  "北京市2026年推动经济稳中有进的若干措施": "bj-economic-measures-2026",
  "2026年高精尖产业发展项目资金实施指南（第一批）": "bj-high-tech-fund-202601",
  "2026年北京市高精尖产业发展项目资金和支持中小企业发展资金实施指南（第二批）": "bj-high-tech-fund-202602",
  "促进商业卫星遥感数据资源开发利用的若干措施（2026—2030年）": "bj-satellite-data",
  "北京人工智能创新高地建设行动计划": "bj-ai-innovation-highland",
  "关于征集2026年科技服务业专项企业效能提升项目（第二批）的通知": "bj-tech-service-efficiency-2026-batch2",
  "关于征集北京市住房城乡建设领域创新应用场景的通知": "bj-housing-ai-scenes-2026",
  "通州区：支持数字经济高质量发展的若干措施": "dist-tongzhou-digital-economy",
  "昌平区：推动“人工智能+”创新发展行动计划（2026—2028年）": "dist-changping-ai-plus",
  "海淀区：关于全面打造OPC创业生态的若干措施": "dist-haidian-opc",
  "北京经开区：进一步加快建设全域人工智能之城实施方案（2026—2027年）": "dist-etown-ai-city",
  "北京市经济和信息化局关于开展2026年度智能工厂梯度培育行动的通知": "bj-smart-factory-gradient-2026",
  "北京市促进“人工智能+视听”产业高质量发展重点项目申报指南（2026年）": "bj-ai-audiovisual-guide-2026",
  "北京市科委等单位关于发布2026年度AI+气象“揭榜挂帅”专项榜单的通知": "bj-ai-meteorology-bang-2026",
  "北京市科学技术委员会、中关村科技园区管理委员会等部门关于发布2026年度“AI+”方向“揭榜挂帅”专项榜单及公开征集AI赋能生物育种方向储备课题的通知": "bj-ai-plus-bang-breeding-2026",
  "北京市科委、中关村管委会关于转发新一代人工智能国家科技重大专项2026年度“以赛代评”公开项目申报指南的通知": "bj-national-ai-contest-2026",
  "北京市科委、中关村管委会关于征集2026年“人工智能+新材料”创新发展储备课题的通知": "bj-ai-new-materials-2026",
  "经开区：2026年亦城人才·人工智能超级个体（OPC）认定申报通知": "dist-etown-opc-talent-2026",
  "经开区：2026年数据领域核心技术攻关补贴申报通知": "dist-etown-data-core-2026",
  "经开区：关于支持词元驱动智能经济高质量发展的若干措施（试行）": "dist-etown-token-economy-2026",
  "经开区：2026年人工智能行业大模型应用落地支持申报通知": "dist-etown-industry-model-2026",
  "经开区：关于支持人工智能原生人才发展的若干措施（AI人才八条）": "dist-etown-ai-native-talent-2026",
  "深圳市打造人工智能先锋城市项目扶持计划（第二批）申请指南": "reg-shenzhen-ai-pioneer-2026-batch2",
  "2026年第一批上海市城市数字化转型（区块链创新应用）申请类项目拟支持情况公示": "reg-shanghai-blockchain-2026-batch1",
  "2026年第一批算力生态合作伙伴名单公示": "reg-shanghai-compute-partners-2026-batch1",
  "南京市人工智能服务商、智能体开发商征集通知": "reg-nanjing-ai-two-providers-2026",
  "广州政务人工智能与城市可信数据空间建设答复": "reg-guangzhou-ai-trusted-space-2026",
  "南京市抢占人工智能发展先机专题部署": "reg-nanjing-ai-future-industry-2026",
  "关于印发《南京江北新区促进软件产业高质量发展的若干政策措施》的通知": "reg-nanjing-jiangbei-software-2026",
  "广东省人工智能与机器人技能大赛（2026年）通知": "reg-guangdong-ai-robot-skills-2026",
  "杭州市滨江区加快推进人工智能产业高质量发展的若干政策": "reg-hangzhou-binjiang-ai-2026",
  "江苏省增补2026年贸易促进计划及重点展会资金（江苏数智电商展）": "reg-jiangsu-ai-ecommerce-expo-2026",
  "上海市经济信息化委关于组织开展人工智能应用服务商征集工作的通知": "reg-shanghai-ai-service-providers-2026",
  "关于征集2026年上海市行业高质量数据集案例的通知": "reg-shanghai-quality-dataset-cases-2026",
  "市工业和信息化局关于发布2026年模型券（申领）项目（第二批）申请指南的通知": "reg-shenzhen-model-voucher-claim-2026-batch2",
  "深圳市工业和信息化局等关于印发《深圳市推动人工智能与应用发展行动计划（2026—2028年）》的通知": "reg-shenzhen-ai-application-plan-2026",
  "深圳市龙岗区人工智能（机器人）署关于延长2026年龙岗区场景应用揭榜项目榜单征集申报受理时限的通知": "reg-shenzhen-longgang-ai-scenes-2026",
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
  "nat-ai-service-providers-2026": {
    opportunityLevel: "高",
    judgement: "国家层面把人工智能服务商纳入资源池、服务团和真实场景供需体系，政策重心从单点模型供给转向可交付、可运营、可治理的全链条服务能力。",
    customerTypes: ["泛行业 IT 集成与智能运维服务商", "大模型与智能体企业", "云网算力与数据服务商", "网络安全与合规服务机构"],
    scenarios: ["服务商资源池入库", "模数共振/算电协同服务团", "行业 AI 方案交付与运维"],
    relatedPolicies: [
      { type: "上位依据", policyId: "nat-agent-development" },
      { type: "同主题", policyId: "nat-inclusive-compute-sme" },
      { type: "同主题", policyId: "bj-ai-industrial-internet" },
    ],
  },
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
  "bj-ai-plus-bang-breeding-2026": {
    opportunityLevel: "高",
    judgement: "北京“AI+”揭榜挂帅把视频物联网络安全、智能体、科技管理和生物育种等具体业务问题直接转化为可验收任务，体现政策从宏观倡导转向场景化攻关。",
    customerTypes: ["大模型与智能体企业", "视频物联与网络安全服务商", "科研机构和高校", "生物育种与农业科技企业"],
    scenarios: ["视频物联安全风险感知", "人力资源/科技项目智能体", "生物育种科学智能"],
    relatedPolicies: [
      { type: "同主题", policyId: "bj-ai-meteorology-bang-2026" },
      { type: "同主题", policyId: "bj-ai-industrial-internet" },
      { type: "上位依据", policyId: "nat-agent-development" },
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
  "bj-high-tech-fund-202602": {
    opportunityLevel: "高",
    judgement: "第二批把 Token 消费、大模型应用、高质量数据集和 OPC 服务券集中到同一申报批次，体现市级资金从基础设施支持转向可核验的应用消耗与数据价值。",
    customerTypes: ["大模型与智能体企业", "软件与信息服务企业", "制造业行业客户", "AI 创业公司与 OPC"],
    scenarios: ["Token 应用补贴", "工业高质量数据集奖励", "OPC 全栈服务券"],
    relatedPolicies: [
      { type: "上位依据", policyId: "bj-agent-measures" },
      { type: "同主题", policyId: "bj-high-tech-fund-202601" },
      { type: "同主题", policyId: "bj-ai-industrial-internet" },
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
  "bj-ai-meteorology-bang-2026": {
    opportunityLevel: "高",
    judgement: "AI+气象榜单把模型研发、时空数据、算力和业务示范绑定到同一揭榜任务，适合以联合攻关方式切入。",
    customerTypes: ["大模型与智能体企业", "气象与时空数据服务商", "云服务与算力运营商", "科研机构和高校"],
    scenarios: ["极端天气短临预报", "数智融合预报", "防灾减灾示范应用"],
    relatedPolicies: [{ type: "同主题", policyId: "bj-national-ai-contest-2026" }, { type: "同主题", policyId: "bj-agent-measures" }],
  },
  "bj-national-ai-contest-2026": {
    opportunityLevel: "高",
    judgement: "国家新一代人工智能重大专项在北京组织推荐，窗口明确且强调项目成果和电子附件完整性。",
    customerTypes: ["大模型与智能体企业", "科研机构和高校", "央国企与大型企业数字化部门"],
    scenarios: ["国家重大专项公开赛道", "基础模型与智能体研发", "产学研联合攻关"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-agent-development" }, { type: "同主题", policyId: "bj-ai-meteorology-bang-2026" }],
  },
  "bj-ai-new-materials-2026": {
    opportunityLevel: "高",
    judgement: "AI+新材料将材料数据、专业模型、智能实验室和产业化验证串成研发服务链，适合寻找跨产线联合客户。",
    customerTypes: ["新材料与高端装备企业", "大模型与智能体企业", "数据服务与数据运营机构", "科研机构和高校"],
    scenarios: ["材料专业模型", "自主实验室", "材料研发 CRO 与应用验证"],
    relatedPolicies: [{ type: "同主题", policyId: "bj-ai-industrial-internet" }, { type: "同主题", policyId: "bj-public-data-operation" }],
  },
  "dist-etown-token-economy-2026": {
    opportunityLevel: "高",
    judgement: "经开区把词元消费、算力、数据券、模型聚合、场景应用和 OPC 券纳入一套智能经济政策框架，政策链条比单一模型券更完整。",
    customerTypes: ["云服务与算力运营商", "大模型与智能体企业", "数据服务与数据运营机构", "制造业行业客户"],
    scenarios: ["算力与数据券", "模型聚合和智能体交付", "具身智能与行业场景"],
    relatedPolicies: [{ type: "上位依据", policyId: "dist-etown-ai-city" }, { type: "同主题", policyId: "bj-high-tech-fund-202602" }],
  },
  "dist-etown-industry-model-2026": {
    opportunityLevel: "高",
    judgement: "经开区行业大模型应用支持已形成单独申报窗口，体现政策从模型供给转向行业实际落地和可验收应用。",
    customerTypes: ["大模型与智能体企业", "制造业行业客户", "汽车与新能源企业", "生物医药与商业航天企业"],
    scenarios: ["行业模型部署", "高吞吐量业务场景", "模型调用与效果验收"],
    relatedPolicies: [{ type: "上位依据", policyId: "dist-etown-token-economy-2026" }, { type: "同主题", policyId: "bj-agent-measures" }],
  },
  "dist-etown-ai-native-talent-2026": {
    opportunityLevel: "高",
    judgement: "AI人才八条把顶尖人才、产业精英、OPC、实习生和开发者生态纳入全链条支持，人才政策将成为经开区产业政策的重要入口。",
    customerTypes: ["AI 创业公司与 OPC", "大模型与智能体企业", "园区、科研机构和高校", "产业协会与开发者社区"],
    scenarios: ["AI 原生人才认定", "OPC 创业与实习", "开发者赛事和产业交流"],
    relatedPolicies: [{ type: "同主题", policyId: "dist-etown-opc-talent-2026" }, { type: "同主题", policyId: "dist-etown-token-economy-2026" }],
  },
  "reg-shenzhen-ai-pioneer-2026-batch2": {
    opportunityLevel: "高",
    judgement: "深圳已把模型服务消费与国产适配服务纳入第二批兑现窗口，体现地方政策从模型供给转向可核验的应用支出和生态服务交付。",
    customerTypes: ["深圳市内大模型与智能体企业", "模型服务机构与算力服务商", "国产软硬件适配中心", "制造业与现代服务业应用客户"],
    scenarios: ["模型券兑现", "智能体开发应用", "国产模型迁移与适配"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-agent-development" }, { type: "同主题", policyId: "bj-agent-measures" }],
  },
  "reg-nanjing-jiangbei-software-2026": {
    opportunityLevel: "高",
    judgement: "江北新区把 AI+软件、智算补贴、信创适配和运维型软件纳入同一政策包，适合泛行业 IT 运维与云网集成产线切入。",
    customerTypes: ["泛行业 IT 集成与智能运维服务商", "信创软硬件与安全软件企业", "AI 软件和智能体企业", "高校及产教融合平台"],
    scenarios: ["智算使用补贴", "国产操作系统适配", "工业软件/AI 软件攻关"],
    relatedPolicies: [{ type: "同主题", policyId: "nat-ai-service-providers-2026" }, { type: "同主题", policyId: "bj-ai-industrial-internet" }],
  },
  "reg-guangdong-ai-robot-skills-2026": {
    opportunityLevel: "观察",
    judgement: "广东人工智能与机器人技能大赛体现地方以赛事和人才评价扩大 AI、机器人产业生态的导向，适合作为客户触达和人才品牌入口。",
    customerTypes: ["AI 与机器人企业", "智能运维和集成服务商", "职业院校与培训机构", "产业园区和行业协会"],
    scenarios: ["技能赛事参赛", "人才发现与品牌宣传", "产教融合合作"],
    relatedPolicies: [{ type: "同主题", policyId: "nat-ai-service-providers-2026" }],
  },
  "reg-jiangsu-ai-ecommerce-expo-2026": {
    opportunityLevel: "中",
    judgement: "江苏将 AI 数智电商展纳入贸易促进资金，体现以展会和场景推广带动 AI 技术与产业渠道融合。",
    customerTypes: ["AI 软件与数据服务商", "智能制造和电商技术企业", "江苏本地渠道商", "产业园区和展会组织方"],
    scenarios: ["展位费补贴申报", "AI+电商产品展示", "渠道与客户线索拓展"],
    relatedPolicies: [{ type: "同主题", policyId: "nat-ai-service-providers-2026" }],
  },
  "nat-data-factor-finals-2026": {
    opportunityLevel: "高",
    judgement: "国家数据局把地方赛成果汇聚到全国总决赛，继续用赛事遴选数据开发利用和 AI 场景化应用，体现数据要素从资源登记走向可验证成果推广。",
    customerTypes: ["数据服务与数据运营机构", "大模型与智能体企业", "央国企与大型企业数字化部门", "科研机构和高校"],
    scenarios: ["数据要素×大赛全国总决赛", "行业数据集与 AI 应用展示", "数据产品供需对接"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-industry-datasets" }, { type: "同主题", policyId: "bj-public-data-operation" }],
  },
  "bj-token-economy-action-2026": {
    opportunityLevel: "高",
    judgement: "北京把 Token 计量、模型服务、算力适配、数据产品和智能体交付放进同一行动方案，政策信号从单点模型支持转向可计量的词元经济基础设施。",
    customerTypes: ["大模型与智能体企业", "云网算力与数据服务商", "泛行业 IT 集成与智能运维服务商", "央国企与大型企业数字化部门"],
    scenarios: ["Token 工厂和服务平台", "模型—算力适配", "数据产品与智能体交付"],
    relatedPolicies: [{ type: "同主题", policyId: "bj-agent-measures" }, { type: "配套细则", policyId: "bj-high-tech-fund-202602" }, { type: "同主题", policyId: "dist-etown-token-economy-2026" }],
  },
  "bj-ai-service-provider-pool-2026": {
    opportunityLevel: "高",
    judgement: "北京将人工智能服务商纳入市级资源池，强调咨询、交付、运营、安全和测试等可验证能力，体现 AI 政策从模型供给转向长期服务生态。",
    customerTypes: ["泛行业 IT 集成与智能运维服务商", "大模型与智能体企业", "网络安全与合规服务机构", "云网算力与数据服务商"],
    scenarios: ["服务商资源池入库", "联合服务团", "行业 AI 平台交付与运维"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-ai-service-providers-2026" }, { type: "同主题", policyId: "bj-ai-industrial-internet" }],
  },
  "bj-city-science-fine-management-bang-2026": {
    opportunityLevel: "高",
    judgement: "城市科技与精细化管理揭榜任务把 AI、视联网、智能运维和城市治理转化为有真实用户、有验收指标的项目，适合形成联合攻关和后续集成交付。",
    customerTypes: ["智能运维和云网集成服务商", "视频物联与网络安全服务商", "大模型与智能体企业", "城市治理和公共服务客户"],
    scenarios: ["城市精细化管理", "视联网与安全感知", "AI 运维和场景验收"],
    relatedPolicies: [{ type: "同主题", policyId: "bj-housing-ai-scenes-2026" }, { type: "上位依据", policyId: "nat-ai-service-providers-2026" }],
  },
  "bj-tech-service-efficiency-2026-batch2": {
    opportunityLevel: "高",
    judgement: "北京市把科技服务业企业效能提升项目单独列出，支持 AI、数据和智能制造服务能力进入可验收项目，政策重点从单一技术补贴转向专业服务交付能力。",
    customerTypes: ["泛行业 IT 集成与智能运维服务商", "大模型与智能体企业", "云网算力与数据服务商", "网络安全与合规服务机构"],
    scenarios: ["AI 技术服务平台建设", "行业数字化咨询与交付", "服务运营和安全治理"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-ai-service-providers-2026" }, { type: "同主题", policyId: "bj-ai-industrial-internet" }],
  },
  "bj-housing-ai-scenes-2026": {
    opportunityLevel: "高",
    judgement: "住建领域创新场景把 AI 视觉、规划设计、智能建造、设备预测性维护和建筑安全检测转化为公开场景征集，适合以试点项目切入而非等待单一补贴。",
    customerTypes: ["智能运维和云网集成服务商", "视频物联与网络安全服务商", "大模型与智能体企业", "建筑业及城市治理客户"],
    scenarios: ["施工现场视觉识别", "建筑设备预测性维护", "工程质量与安全检测", "建筑能耗优化"],
    relatedPolicies: [{ type: "同主题", policyId: "bj-ai-industrial-internet" }, { type: "同主题", policyId: "bj-smart-city-demand-202604" }],
  },
  "reg-hangzhou-binjiang-ai-2026": {
    opportunityLevel: "高",
    judgement: "杭州滨江将研发、开源、算力券、Token 券、数据券和模型采购支持组合成 AI 产业政策包，代表重点城市从单项补贴转向全链路生态激励。",
    customerTypes: ["大模型与智能体企业", "云网算力与数据服务商", "数据服务与数据运营机构", "AI 软件与行业应用客户"],
    scenarios: ["算力和 Token 券", "数据集研发与交易", "模型采购与开源生态"],
    relatedPolicies: [{ type: "同主题", policyId: "reg-shenzhen-model-voucher-claim-2026-batch2" }, { type: "同主题", policyId: "bj-token-economy-action-2026" }],
  },
  "reg-shanghai-ai-service-providers-2026": {
    opportunityLevel: "高",
    judgement: "上海将 AI 服务商和服务团纳入市级资源池，覆盖咨询规划、系统集成、运营管理、安全治理和测试评估，体现地方对可交付服务生态的标准化建设。",
    customerTypes: ["泛行业 IT 集成与智能运维服务商", "网络安全与合规服务机构", "大模型与智能体企业", "云网算力与数据服务商"],
    scenarios: ["上海 AI 服务商资源池", "服务团联合申报", "AI 平台交付与运维"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-ai-service-providers-2026" }],
  },
  "reg-shanghai-quality-dataset-cases-2026": {
    opportunityLevel: "高",
    judgement: "上海以已完成、真实场景验证的行业高质量数据集案例作为遴选对象，并要求权属、合规和长期维护责任清晰，说明数据集正从建设任务转向可复制案例资产。",
    customerTypes: ["数据服务与数据运营机构", "大模型与智能体企业", "制造、医疗和城市治理客户", "具身智能企业"],
    scenarios: ["行业高质量数据集案例", "数据集登记与开源社区", "数据集与模型协同应用"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-industry-datasets" }, { type: "同主题", policyId: "bj-public-data-operation" }],
  },
  "reg-shenzhen-model-voucher-claim-2026-batch2": {
    opportunityLevel: "高",
    judgement: "深圳模型券第二批重新开放申领项目，地方政策继续用模型消费券降低企业试用和应用成本；具体额度和截止时间需回到官方申请指南附件核验。",
    customerTypes: ["深圳市内大模型与智能体企业", "模型服务机构与算力服务商", "制造业和现代服务业应用客户", "国产软硬件适配中心"],
    scenarios: ["模型券申领", "多模型 API/Token 试用", "行业应用模型消费"],
    relatedPolicies: [{ type: "同主题", policyId: "reg-shenzhen-ai-pioneer-2026-batch2" }, { type: "上位依据", policyId: "nat-inclusive-compute-sme" }],
  },
  "reg-shenzhen-ai-application-plan-2026": {
    opportunityLevel: "高",
    judgement: "深圳将 AI 应用扩展到科研、先进制造、软件服务、专业服务、住房建设、交通物流和治理等全域场景，形成从模型、数据到行业交付的长期需求信号。",
    customerTypes: ["大模型与智能体企业", "泛行业 IT 集成与智能运维服务商", "视频物联与网络安全服务商", "制造业与城市治理客户"],
    scenarios: ["智能制造与工业软件", "AI+专业服务", "住房建设与城市治理智能化"],
    relatedPolicies: [{ type: "上位依据", policyId: "nat-agent-development" }, { type: "同主题", policyId: "reg-shenzhen-ai-pioneer-2026-batch2" }],
  },
  "reg-shenzhen-longgang-ai-scenes-2026": {
    opportunityLevel: "高",
    judgement: "龙岗区将 AI 与机器人场景揭榜申报期限延长，说明区级政策正在通过真实应用场景吸引解决方案供给，适合客户经理围绕部署效果组织联合申报。",
    customerTypes: ["AI 与机器人企业", "视频物联与网络安全服务商", "智能运维和集成服务商", "制造业及园区客户"],
    scenarios: ["龙岗 AI/机器人场景揭榜", "机器人应用示范", "行业解决方案联合申报"],
    relatedPolicies: [{ type: "同主题", policyId: "reg-shenzhen-ai-application-plan-2026" }],
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
  { title: "北京市加快词元经济发展的行动方案（2026—2028年）", changeType: "新增", date: "2026-09-18", detail: "北京发布词元经济行动方案，围绕 Token 工厂、模型与芯片适配、算力、数据产品、智能体、工程师生态和海外服务构建产业链；文件有效期至2028年12月31日，具体兑现以配套通知为准。", href: "https://jxj.beijing.gov.cn/zwgk/2024zcwj/202609/t20260918_4870474.html", status: "持续适用" },
  { title: "北京市人工智能应用服务商资源池征集通知", changeType: "新增", date: "2026-09-18", detail: "北京面向在京法人或机构征集 AI 应用服务商资源池，覆盖咨询规划、交付实施、运营管理、安全治理、培训测试等能力；材料须于10月15日前提交所在区经信主管部门，资源池征集不是直接财政补贴。", href: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202609/t20260918_4869930.html", status: "滚动核验" },
  { title: "北京市城市科技与精细化管理领域第二批揭榜挂帅任务榜单", changeType: "新增", date: "2026-09-17", detail: "北京发布城市科技与精细化管理第二批揭榜任务，要求企业牵头并联合高校院所，参与单位原则上不超过4家，配套经费与财政科技经费比例不低于2:1，申报截止10月13日17:00。", href: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260917_4868421.html", status: "滚动核验" },
  { title: "北京市促进“人工智能+视听”产业高质量发展重点项目申报指南（2026年）", changeType: "修订", date: "2026-09-20", detail: "北京市广播电视局将人工智能+视听重点项目申报截止时间由9月30日延至10月31日，申报入口仍为北京市政策兑现专区，其他支持方向和材料要求不变。", href: "https://gdj.beijing.gov.cn/zwxx/tzgg2/202609/t20260920_4871956.html", status: "滚动核验" },
]; 

export const priorityRegionWeeklyChanges: WeeklyChange[] = [
  { title: "杭州市滨江区加快推进人工智能产业高质量发展的若干政策", changeType: "新增", date: "2026-09-11", detail: "杭州滨江区新政策自9月11日起施行，组合支持研发、开源、算力券、Token券、数据券和模型采购，研发支持最高5000万元、算力券最高2000万元；政策仅适用于滨江区主体，具体兑现以区级细则和申报通知为准。", href: "https://www.hzbjzx.gov.cn/data/2026/09/t20260902105056841.htm", status: "持续适用" },
  { title: "上海市经济信息化委关于组织开展人工智能应用服务商征集工作的通知", changeType: "新增", date: "2026-09-11", detail: "上海面向境内正常经营法人或非法人组织征集人工智能服务商和服务团，覆盖咨询规划、交付实施、运营管理、安全治理和测试评估；申报材料须于9月30日前提交所在区主管部门。", href: "https://sheitc.sh.gov.cn/cyfz/20260911/efa1c634559c44d7a61e9400a63acdb8.html", status: "滚动核验" },
  { title: "关于征集2026年上海市行业高质量数据集案例的通知", changeType: "新增", date: "2026-09-07", detail: "上海征集已完成并经真实业务验证的行业高质量数据集案例，覆盖医疗、教育、城市治理、高端制造和具身智能等领域；材料须于9月24日17:00发送至指定邮箱，并完成数据集登记。", href: "https://dt.sheitc.sh.gov.cn/cms/slddt/2861.jhtml", status: "滚动核验" },
  { title: "市工业和信息化局关于发布2026年模型券（申领）项目（第二批）申请指南的通知", changeType: "新增", date: "2026-09-07", detail: "深圳启动2026年模型券（申领）项目第二批申报，具体资格、金额、截止时间和平台以申请指南附件为准，官方建议至少提前2个工作日提交。", href: "https://gxj.sz.gov.cn/szsgyhxxhjwzgkml/szsgyhxxhjwzgkml/qt/tzgg/content/post_12970192.html", status: "滚动核验" },
  { title: "深圳市推动人工智能与应用发展行动计划（2026—2028年）", changeType: "新增", date: "2026-09-04", detail: "深圳发布 AI 与应用发展行动计划，提出到2028年推动人工智能与科研、产业、消费、民生、治理和全球合作六大领域深度融合，形成长期场景和生态需求信号。", href: "https://gxj.sz.gov.cn/gkmlpt/content/12/12965/post_12965466.html", status: "持续适用" },
  { title: "深圳市龙岗区人工智能（机器人）署关于延长2026年龙岗区场景应用揭榜项目榜单征集申报受理时限的通知", changeType: "修订", date: "2026-09-03", detail: "龙岗区将 AI 与机器人场景应用揭榜项目材料提交截止时间由9月4日延长至9月21日18:00，其他申报事项仍按原申请指南和实施细则执行。", href: "https://www.lg.gov.cn/xxgk/zwgk/tzgg/content/post_12966833.html", status: "滚动核验" },
  { title: "江苏省增补2026年贸易促进计划及重点展会资金（江苏数智电商展）", changeType: "新增", date: "2026-09-01", detail: "江苏省商务厅将江苏数智电商展增补纳入贸易促进计划，支持参展单位展位费；申报截止2026年11月19日17:00，主体须在江苏省注册，补贴比例按统筹结果确定。", href: "https://doc.jiangsu.gov.cn/art/2026/9/3/art_78712_11824614.html", status: "滚动核验" },
  { title: "广东省人工智能与机器人技能大赛（2026年）通知", changeType: "新增", date: "2026-09-01", detail: "广州市工信局转发广东省人工智能与机器人技能大赛通知，面向相关企业和个人开展报名宣传；该事项为赛事和人才生态信号，不是财政补贴。", href: "https://gxj.gz.gov.cn/yw/tzgg/content/post_10987433.html", status: "滚动核验" },
  { title: "南京江北新区促进软件产业高质量发展的若干政策措施", changeType: "新增", date: "2026-09-01", detail: "南京江北新区政策自9月1日起施行，支持AI+软件攻关、智算使用、国产操作系统适配、首版次/首台套和产教融合；软件企业智算业务单个企业每年最高200万元补贴，具体申报由经济发展局指导。", href: "https://njna.nanjing.gov.cn/njsjbxqglwyh/202607/t20260731_5887148.html", status: "持续适用" },
  { title: "上海市第一批城市数字化转型（区块链创新应用）拟支持项目", changeType: "新增", date: "2026-08-24", detail: "上海市数据局依据《上海市城市数字化转型专项资金管理办法》公示第一批区块链创新应用申请类项目拟支持单位，公示期为8月24日至8月28日；这是评审结果公示，不是新的申报窗口。", href: "https://sdb.sh.gov.cn/gsgg/20260824/148702e0f0f74443a81b259f4582ce21.html", status: "滚动核验" },
  { title: "上海市第一批算力生态合作伙伴名单公示", changeType: "新增", date: "2026-08-25", detail: "上海市数据局、上海市通信管理局公布第一批算力生态合作伙伴38家，其中算力供给方12家、算力应用方18家、平台共建方8家；公示期为8月25日至9月1日，不等同于财政补贴。", href: "https://sdb.sh.gov.cn/gsgg/20260825/cd1a719b889b4d8584e6cb2d5d0fbbc4.html", status: "滚动核验" },
  { title: "南京市人工智能服务商、智能体开发商征集", changeType: "截止", date: "2026-08-25", detail: "南京市工信局“两商”征集本轮材料于8月25日截止，要求由甲方单位提交盖章申报表、合同关键页、验收报告、上线截图等证据；该项工作为常态化征集，后续新增服务商可按月补报。", href: "https://gxj.nanjing.gov.cn/njsjjhxxhwyh/202608/t20260813_5893091.html", status: "滚动核验" },
  { title: "广州政务人工智能与城市可信数据空间建设答复", changeType: "新增", date: "2026-08-24", detail: "广州市政数局提案答复披露“穗智政”政务人工智能中枢、公共数据授权运营平台和全省首个城市可信数据空间建设方向，属于工作部署与场景信号，不是直接财政补贴。", href: "https://zsj.gz.gov.cn/gkmlpt/content/10/10976/post_10976669.html", status: "持续适用" },
  { title: "南京市抢占人工智能发展先机专题部署", changeType: "新增", date: "2026-08-28", detail: "南京市委理论学习中心组专题学习人工智能与未来产业，提出加强算力芯片、模型、智能体、数据和人才供给；这是地方产业方向信号，具体支持需等待正式通知。", href: "https://www.nanjing.gov.cn/zgnjsjb/jrtt/202608/t20260828_5900927.html", status: "滚动核验" },
];

export const previousWeeklyChanges: WeeklyChange[] = [
  { title: "关于征集2026年科技服务业专项企业效能提升项目（第二批）的通知", changeType: "新增", date: "2026-09-01", detail: "北京面向科技服务业企业征集效能提升项目，支持 AI、医疗健康、新材料、智能制造及大数据/大模型服务平台建设；项目周期不超过1年，企业配套经费与科技经费比例不低于2:1，申报截止9月23日18:00。", href: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260901_4845672.html", status: "滚动核验" },
  { title: "关于征集北京市住房城乡建设领域创新应用场景的通知", changeType: "新增", date: "2026-09-02", detail: "北京住建领域公开征集 AI 视觉识别、规划设计、智能建造、设备预测性维护、建筑安全检测、能耗优化和行业大模型等场景，材料提交截止10月10日17:00；该事项为场景征集，不是直接财政补贴。", href: "https://zjw.beijing.gov.cn/bjjs/kjcxytg/znjz/zjtz76/744118225/index.shtml", status: "滚动核验" },
  { title: "2026年“数据要素×”大赛全国总决赛通知", changeType: "新增", date: "2026-09-08", detail: "国家数据局公布全国总决赛安排，入围团队须在9月16日24:00前通过 dataelementx.cn 提交最终材料，提交后不能修改；赛事不是直接财政补贴。", href: "https://www.nda.gov.cn/sjj/zwgk/tzgg/0908/20260908100236590767189_mobile.html", status: "滚动核验" },
  { title: "2026年度“AI+”方向“揭榜挂帅”专项榜单及AI赋能生物育种储备课题", changeType: "修订", date: "2026-09-07", detail: "本周复核后，AI+方向揭榜挂帅/生物育种储备课题仍处于申报期，截止时间为9月23日18:00；补充确认参与单位原则上不超过4家、企业配套经费与财政科技经费比例不低于2:1。", href: "https://kw.beijing.gov.cn/zwgk/zwgksbrl/202609/t20260904_4851307.html", status: "滚动核验" },
]; 
