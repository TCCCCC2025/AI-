import {
  coverageRecords,
  subsidyMetrics,
  subsidyPolicies,
  subsidyStatusLabel,
  type CoverageRecord,
  type SubsidyPolicy,
} from "../subsidy-data";
import { SiteNav } from "./SiteNav";
import { SubsidyCard } from "./SubsidyCard";

const coverageLabels: Record<CoverageRecord["scanStatus"], string> = {
  verified_records: "已核验政策",
  scanned_no_official: "已扫描未检出正式记录",
  lead_pending_verification: "存在待核验线索",
  not_scanned: "待持续扫描",
};

function WindowCard({ policy }: { policy: SubsidyPolicy }) {
  return <article className="subsidy-window-card">
    <div className="subsidy-window-topline"><span className="status active">{subsidyStatusLabel(policy.status)}</span><span>{policy.region} · {policy.mechanism}</span></div>
    <h3><a href={`#${policy.id}`}>{policy.title} ↘</a></h3>
    <div className="subsidy-action-strip">
      <div><span>支持强度</span><strong>{policy.amount}</strong></div>
      <div><span>申报时间</span><strong>{policy.applicationWindow}</strong></div>
    </div>
    <p className="subsidy-window-action">{policy.action}</p>
    {policy.applicationUrl && <a className="subsidy-entry-link" href={policy.applicationUrl}>打开申报入口 ↗</a>}
  </article>;
}

export function SubsidyRadarPage() {
  const current = subsidyPolicies.filter((policy) => policy.status === "current");
  const waiting = subsidyPolicies.filter((policy) => policy.status === "effective_waiting_round");
  const verified = coverageRecords.filter((item) => item.scanStatus === "verified_records");
  const leads = coverageRecords.filter((item) => item.scanStatus === "lead_pending_verification");

  return <main>
    <header className="page-hero subsidy-hero"><p className="eyebrow">SUBSIDY APPLICATION RADAR · VERIFIED AS OF 2026-08-03</p><h1>补贴申报雷达</h1><p>聚焦 Token、算力、数据、模型、场景和 OPC 支持；有效申报入口只展示已完成核验、当前可以行动的事项。</p></header>
    <SiteNav />

    <section className="subsidy-page">
      <nav className="subsidy-anchor-nav" aria-label="补贴雷达分区"><a href="#effective">有效申报入口</a><a href="#all">全部政策库</a><a href="#coverage">区域扫描</a></nav>

      <div className="subsidy-metrics">
        <article><strong>{subsidyMetrics.current}</strong><span>当前可申报</span></article>
        <article><strong>{subsidyMetrics.waiting}</strong><span>有效·等批次</span></article>
        <article><strong>{subsidyMetrics.closed}</strong><span>本轮已截止</span></article>
        <article><strong>{subsidyMetrics.verifiedRegions}</strong><span>已核验区域</span></article>
        <article><strong>{subsidyMetrics.scannedRegions}</strong><span>已扫描区域</span></article>
      </div>

      <section id="effective" className="subsidy-section subsidy-effective-window">
        <div className="section-heading"><p className="eyebrow">ACTION FIRST · VERIFIED ENTRY</p><h2>有效申报入口</h2><p>先看能否行动；正式结论只统计已核验来源，平台余额和实际额度仍须打开入口复核。</p></div>
        {current.length > 0 ? <div className="subsidy-window-list">{current.map((policy) => <WindowCard key={policy.id} policy={policy} />)}</div> : <div className="empty-state"><span className="empty-mark">—</span><div><h3>本期没有已核验的有效申报入口</h3><p>继续跟踪政策兑现专区和各区当期通知。</p></div></div>}
        <div className="waiting-note"><strong>{waiting.length} 项政策有效但正在等待新批次</strong><span>先准备主体、合同、发票、日志、备案和场景材料，不把“有效”误读为“当前开放”。</span></div>
      </section>

      <section id="all" className="subsidy-section">
        <div className="section-heading"><p className="eyebrow">AUDITABLE INVENTORY</p><h2>全部政策库</h2><p>已截止事项保留用于下一轮准备；“政策有效·等批次”不等于当前开放申报。</p></div>
        <div className="subsidy-card-list">{subsidyPolicies.map((policy) => <SubsidyCard key={policy.id} policy={policy} />)}</div>
      </section>

      <section id="coverage" className="subsidy-section subsidy-coverage">
        <div className="section-heading"><p className="eyebrow">DISTRICT COVERAGE</p><h2>区域扫描状态</h2><p>“已扫描未检出”表示本轮按既定渠道未检出可作为正式结论的记录；“待持续扫描”表示本轮尚未完成等深度扫描，均不等于当地没有政策。</p></div>
        <div className="coverage-summary"><strong>{verified.length}</strong><span>个区域有已核验政策</span><strong>{leads.length}</strong><span>个区域存在待核验线索</span></div>
        <div className="coverage-grid">{coverageRecords.map((item) => <article key={item.district}><div><h3>{item.district}</h3><span className={`status coverage-${item.scanStatus}`}>{coverageLabels[item.scanStatus]}</span></div><p>最近扫描：{item.lastScanned}</p><p>检查渠道：{item.channelsChecked.length ? item.channelsChecked.join("、") : "尚未完成等深度扫描"}</p><p>线索数：{item.leadCount} · 下次复核：{item.nextReview}</p></article>)}</div>
      </section>

      <p className="subsidy-disclaimer">核验标准：官方政策原文、申报通知和附件为正式依据；官方转载和工作动态用于交叉核验；新闻、公众号和媒体线索不会单独作为可申报结论。补贴额度受年度预算、评审、查重、平台余额和当期通知影响，正式申报前请再次打开官方来源和入口。</p>
    </section>
    <footer>北京 AI 政策情报 · 补贴申报雷达 · 每周一 09:00（北京时间）更新</footer>
  </main>;
}
