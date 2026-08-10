import type { Metadata } from "next";
import { allPolicies, policyGroups, policyMetrics, weeklyChanges } from "./policy-data";
import { subsidyMetrics } from "./subsidy-data";
import { SiteNav } from "./components/SiteNav";

export const metadata: Metadata = {
  title: "北京 AI 政策情报",
  description: "北京 AI、大模型、算力与数据政策的全景总览、周更与分类政策库。",
};

const policyCount = policyGroups.reduce((total, group) => total + group.policies.length, 0);
const themeCount = new Set(policyGroups.flatMap((group) => group.policies.flatMap((policy) => policy.themes.split(" / ")))).size;
const priorityPolicies = allPolicies.filter((policy) => policy.opportunityLevel === "高").slice(0, 3);
const compliancePolicies = allPolicies.filter((policy) => policy.judgement.includes("合规")).slice(0, 3);

export default function Home() {
  return <main>
    <section className="hero"><p className="eyebrow">BEIJING · AI POLICY INTELLIGENCE</p><div className="hero-grid"><div><h1>北京 AI<br />政策情报</h1><p className="intro">覆盖国家、北京市和重点区的 AI、大模型、算力与数据政策；每周核验、分类沉淀、动态维护。</p></div><aside className="as-of"><span>本期截止</span><strong>2026-08-10</strong><p>中国标准时间 · 第 32 周</p></aside></div></section>
    <SiteNav />
    <section className="overview"><div className="section-heading"><p className="eyebrow">POLICY LANDSCAPE</p><h2>政策全景</h2><p>首页呈现整体态势；完整政策请进入分类页查看。</p></div><div className="overview-grid"><article><strong>{policyCount}</strong><span>项政策基线</span></article><article><strong>3</strong><span>个政策层级</span></article><article><strong>{themeCount}</strong><span>个核心主题</span></article><article><strong>{weeklyChanges.length}</strong><span>项本周变化</span></article></div><div className="level-links">{policyGroups.map((group) => <a key={group.id} href={`/${group.id}`}><span>{group.title}</span><strong>{group.policies.length} 项</strong><p>{group.note}</p><i>查看政策库 ↗</i></a>)}</div></section>
    <section className="role-entry"><div className="section-heading"><p className="eyebrow">ROLE-BASED BRIEFING</p><h2>按角色使用</h2><p>同一套政策库，分别服务管理判断与客户沟通。</p></div><div className="role-entry-grid"><a className="role-entry-card leadership-entry" href="/leadership"><span>管理视角</span><h3>政策分析</h3><p>3 条核心判断、重点机会、政策依据链、趋势预警和管理建议。</p><strong>进入政策分析 ↗</strong></a><a className="role-entry-card client-entry" href="/client-manager"><span>一线视角</span><h3>客户分类</h3><p>按 7 类客户准备政策话题、需求问题和下一步动作。</p><strong>进入客户分类 ↗</strong></a></div></section>
    <section className="subsidy-entry"><div><p className="eyebrow">SUBSIDY INTELLIGENCE</p><h2>补贴申报雷达</h2><p>当前有 {subsidyMetrics.current} 项已核验可申报窗口，另有 {subsidyMetrics.waiting} 项政策有效但等待批次。来源网址继续内部留档，页面只呈现可行动的核验结果。</p></div><div className="subsidy-entry-links"><a href="/subsidies"><span>有效申报入口 · 全部政策库 · 区域扫描</span><strong>进入补贴申报雷达 ↗</strong></a></div></section>
    <section className="judgement-overview"><div className="section-heading"><p className="eyebrow">PERIOD JUDGEMENT</p><h2>本期判断</h2><p>把政策状态转成可跟进的机会、风险与核验任务。</p></div><div className="judgement-metrics"><article><strong>{policyMetrics.highOpportunity}</strong><span>高机会政策</span></article><article><strong>{policyMetrics.complianceAttention}</strong><span>合规关注</span></article><article><strong>{policyMetrics.pendingVerification}</strong><span>待回核事项</span></article><article><strong>{policyMetrics.rollingVerification}</strong><span>滚动核验</span></article></div></section>
    <section className="intelligence-board"><div className="section-heading"><p className="eyebrow">OPPORTUNITY &amp; RISK</p><h2>机会与风险看板</h2></div><div className="board-columns"><article><p className="board-label opportunity-label">优先机会</p>{priorityPolicies.length > 0 ? priorityPolicies.map((policy) => <div className="board-item" key={policy.id}><h3><a href={`/${policyGroups.find((group) => group.policies.some((item) => item.id === policy.id))?.id}#${policy.id}`}>{policy.title}</a></h3><p>{policy.customerTypes.slice(0, 2).join(" · ")}</p><strong>{policy.action}</strong></div>) : <p>本期暂无已完成业务研判的高机会政策。</p>}</article><article><p className="board-label risk-label">合规提醒</p>{compliancePolicies.length > 0 ? compliancePolicies.map((policy) => <div className="board-item" key={policy.id}><h3>{policy.title}</h3><p>{policy.judgement}</p></div>) : <p>本期暂无新增的专项合规提醒。</p>}</article></div></section>
    <section className="dashboard"><article className="lead-card"><div className="card-topline"><span className="tag verified">经官方核验</span><span>本周重点变化</span></div><h2>央企 AI 建设进入场景与数据集协同阶段</h2><p>国务院国资委发布第二批央企人工智能战略性高价值场景和行业高质量数据集，并同步推进开源生态、智能软件工厂、算力与数据治理能力建设。</p><a className="source-link" href="/weekly">查看本周最新 <span>↗</span></a></article><aside className="status-panel"><p className="panel-label">更新机制</p><div className="metric"><strong>新增</strong><span>已核验政策进入分类库</span></div><div className="metric"><strong>复核</strong><span>申报、征集、试行及时更新</span></div><p className="note">失效、截止或被替代事项将从正式库移出，并在本周页记录调整依据。</p></aside></section>
    <section className="radar"><div className="section-heading"><p className="eyebrow">ACTION RADAR</p><h2>申报窗口雷达</h2></div><div className="empty-state"><span className="empty-mark">—</span><div><h3>本期未发现未来 30 天内、已完成官方核验的新增申报截止日</h3><p>后续将持续跟踪北京市政策兑现专区、经信局与重点区通知。</p></div></div></section>
    <section className="method"><div><p className="eyebrow">VERIFICATION STANDARD</p><h2>信息不是越多越好，<br />而是越可复核越好。</h2></div><ol><li><span>01</span><p><strong>官方原文优先</strong>以发文机关页面及附件为准。</p></li><li><span>02</span><p><strong>政策状态管理</strong>新增、修订、截止与移出都有依据。</p></li><li><span>03</span><p><strong>机会与合规并列</strong>每项政策均说明业务机会与边界。</p></li></ol></section>
    <footer>北京 AI 政策情报 · 自动更新计划：每周一 09:00（北京时间）</footer>
  </main>;
}
