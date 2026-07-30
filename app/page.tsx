import type { Metadata } from "next";
import { policyGroups } from "./policy-data";

export const metadata: Metadata = {
  title: "北京 AI 政策情报",
  description: "北京 AI、大模型、算力与数据政策的核验周报、历史政策库与申报窗口。",
};

const policyCount = policyGroups.reduce((total, group) => total + group.policies.length, 0);

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">BEIJING · AI POLICY INTELLIGENCE</p>
        <div className="hero-grid"><div><h1>北京 AI<br />政策情报</h1><p className="intro">每周追踪 AI、大模型、算力与数据政策；以历史政策库为底稿，呈现经核验、可行动的信息。</p></div><aside className="as-of"><span>本期截止</span><strong>2026-07-30</strong><p>中国标准时间 · 第 30 周</p></aside></div>
      </section>

      <nav className="topic-nav" aria-label="站点栏目"><a href="#weekly">本周动态</a><a href="#library">政策库</a><a href="#radar">申报窗口</a><a href="#method">核验规则</a></nav>

      <section className="dashboard" id="weekly">
        <article className="lead-card"><div className="card-topline"><span className="tag verified">经官方核验</span><span>市级 · AI / 大模型 / 算力 / 数据</span></div><h2>智能体成为北京 AI 新政策主线</h2><p>北京市印发智能体引领发展措施，提出支持基础模型、智能体共性技术、标杆场景、Token 经济、算力保障与安全治理。</p><dl className="facts"><div><dt>政策文件</dt><dd>《北京市关于加快智能体引领发展的若干措施》</dd></div><div><dt>发文字号</dt><dd>京发改〔2026〕1185号</dd></div><div><dt>发布日期</dt><dd>2026-07-23</dd></div></dl><a className="source-link" href="https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html">查看官方原文 <span>↗</span></a></article>
        <aside className="status-panel"><p className="panel-label">政策库状态</p><div className="metric"><strong>{policyCount}</strong><span>项历史政策基线</span></div><div className="metric"><strong>3</strong><span>个政策层级</span></div><p className="note">每周新增已核验政策，并复核申报、征集、试行或已失效事项的适用状态。</p></aside>
      </section>

      <section className="policy-library" id="library">
        <div className="section-heading"><p className="eyebrow">POLICY BASELINE</p><h2>政策库基线（{policyCount} 项）</h2><p>来源于《2026年度北京AI大模型算力数据政策专项分析（领导汇报版）》；本页保留政策脉络，具体申报资格与兑现条件以当期官方通知为准。</p></div>
        <div className="library-legend"><span className="status active">持续适用</span><span className="status rolling">滚动核验</span><span className="status review">待回核</span><p>“滚动核验”用于公告、指南、揭榜或申报等会随批次变化的事项；不再适用的事项将从正式库移出并记录调整原因。</p></div>
        <div className="policy-groups">{policyGroups.map((group) => <section className="policy-group" key={group.title}><div className="group-heading"><h3>{group.title}</h3><p>{group.note}</p></div><div className="policy-list">{group.policies.map((policy) => <article className="policy-row" key={policy.title}><div className="policy-title">{policy.href ? <a href={policy.href}>{policy.title} <span>↗</span></a> : <span>{policy.title}</span>}<small>{policy.issuer}</small></div><time>{policy.date}</time><span className="themes">{policy.themes}</span><span className={`status ${policy.status === "持续适用" ? "active" : policy.status === "滚动核验" ? "rolling" : "review"}`}>{policy.status}</span></article>)}</div></section>)}</div>
      </section>

      <section className="radar" id="radar"><div className="section-heading"><p className="eyebrow">ACTION RADAR</p><h2>申报窗口雷达</h2></div><div className="empty-state"><span className="empty-mark">—</span><div><h3>本期未发现未来 30 天内、已完成官方核验的新增申报截止日</h3><p>历史申报、赛事和征集事项均按“滚动核验”管理；后续将持续跟踪北京市政策兑现专区、经信局与重点区通知。</p></div></div></section>

      <section className="method" id="method"><div><p className="eyebrow">VERIFICATION STANDARD</p><h2>信息不是越多越好，<br />而是越可复核越好。</h2></div><ol><li><span>01</span><p><strong>官方原文优先</strong>以发文机关页面及附件为准。</p></li><li><span>02</span><p><strong>政策状态管理</strong>新增、滚动核验、失效下架均留下调整依据。</p></li><li><span>03</span><p><strong>政策与申报分开</strong>长期措施和每轮申报分别追踪。</p></li><li><span>04</span><p><strong>待核实单列</strong>不将线索、解读或搜索摘要当作结论。</p></li></ol></section>

      <footer>北京 AI 政策情报 · 自动更新计划：每周一 09:00（北京时间）</footer>
    </main>
  );
}
