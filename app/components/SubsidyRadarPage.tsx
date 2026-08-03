import {
  coverageRecords,
  subsidyMetrics,
  subsidyPolicies,
  subsidyStatusLabel,
  type CoverageRecord,
  type SubsidyPolicy,
} from "../subsidy-data";
import { policyIntelligence, readinessPlaybooks } from "../subsidy-intelligence-data";
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
    <p className="subsidy-window-amount">{policy.amount}</p>
    <p>{policy.applicationWindow}</p>
    <p className="subsidy-window-action">{policy.action}</p>
  </article>;
}

function BasisChain({ intelligenceId }: { intelligenceId: string }) {
  const item = policyIntelligence.find((entry) => entry.id === intelligenceId);
  if (!item) return null;
  return <article className="basis-chain-card">
    <div className="basis-chain-title"><span>政策依据链</span><h3>{item.title}</h3></div>
    <div className="basis-chain">{item.basis.map((node, index) => <div className="basis-node" key={`${node.url ?? node.title}-${index}`}><span>{index + 1}</span><div><strong>{node.stage}</strong><a href={node.url}>{node.title} ↗</a><small>{node.publisher} · {node.date} · {node.sourceGrade === "official" ? "官方原文" : "官方转载"}</small></div></div>)}</div>
  </article>;
}

export function SubsidyRadarPage() {
  const current = subsidyPolicies.filter((policy) => policy.status === "current");
  const waiting = subsidyPolicies.filter((policy) => policy.status === "effective_waiting_round");
  const verified = coverageRecords.filter((item) => item.scanStatus === "verified_records");
  const leads = coverageRecords.filter((item) => item.scanStatus === "lead_pending_verification");

  return <main>
    <header className="page-hero subsidy-hero"><p className="eyebrow">SUBSIDY APPLICATION RADAR · VERIFIED AS OF 2026-08-03</p><h1>补贴申报雷达</h1><p>聚焦 Token、算力、数据、模型、场景和 OPC 支持；把政策依据、申报状态、趋势研判和客户准备动作放在同一入口。</p></header>
    <SiteNav />

    <section className="subsidy-page">
      <nav className="subsidy-anchor-nav" aria-label="补贴雷达分区"><a href="#current">当前窗口</a><a href="#basis">政策依据链</a><a href="#trends">趋势与预警</a><a href="#readiness">客户准备度</a><a href="#all">全部政策库</a><a href="#coverage">区域扫描</a></nav>

      <div className="subsidy-metrics">
        <article><strong>{subsidyMetrics.current}</strong><span>当前可申报</span></article>
        <article><strong>{subsidyMetrics.waiting}</strong><span>有效·等批次</span></article>
        <article><strong>{subsidyMetrics.closed}</strong><span>本轮已截止</span></article>
        <article><strong>{subsidyMetrics.verifiedRegions}</strong><span>已核验区域</span></article>
        <article><strong>{subsidyMetrics.scannedRegions}</strong><span>已扫描区域</span></article>
      </div>

      <section id="current" className="subsidy-section">
        <div className="section-heading"><p className="eyebrow">WINDOW FIRST</p><h2>当前窗口</h2><p>先看能否行动；正式结论只统计已核验来源，平台余额和实际额度仍须打开入口复核。</p></div>
        {current.length > 0 ? <div className="subsidy-window-list">{current.map((policy) => <WindowCard key={policy.id} policy={policy} />)}</div> : <div className="empty-state"><span className="empty-mark">—</span><div><h3>本期没有已核验的当前窗口</h3><p>继续跟踪政策兑现专区和各区当期通知。</p></div></div>}
        <div className="waiting-note"><strong>{waiting.length} 项政策有效但正在等待新批次</strong><span>先准备主体、合同、发票、日志、备案和场景材料，不把“有效”误读为“当前开放”。</span></div>
      </section>

      <section id="basis" className="subsidy-section">
        <div className="section-heading"><p className="eyebrow">POLICY LINEAGE</p><h2>政策依据链</h2><p>从上位依据到实施政策、当期通知和入口逐级核对；缺失环节明确显示，不补写推测。</p></div>
        <div className="basis-chain-list">{policyIntelligence.slice(0, 4).map((item) => <BasisChain key={item.id} intelligenceId={item.id} />)}</div>
      </section>

      <section id="trends" className="subsidy-section intelligence-section">
        <div className="section-heading"><p className="eyebrow">FACT → JUDGEMENT → SIGNAL</p><h2>趋势与预警</h2><p>每张卡片把事实、业务研判和下一次扫描信号分开，置信度只代表当前证据强度。</p></div>
        <div className="trend-grid">{policyIntelligence.map((item) => <article className="trend-card" key={item.id}><div className="trend-card-top"><span className={`opportunity opportunity-${item.confidence === "高" ? "高" : item.confidence === "中" ? "中" : "观察"}`}>{item.confidence}置信度</span><span>{item.horizon}</span></div><h3>{item.title}</h3><section><h4>已核验事实</h4><p>{item.fact}</p></section><section><h4>业务研判</h4><p>{item.judgement}</p></section><section><h4>下一信号</h4><p>{item.nextSignal}</p></section>{item.warning && <div className="warning-card"><strong>前置预警 · {item.warning.leadTime}</strong><p>{item.warning.trigger} → {item.warning.likelyAction}</p><p>{item.warning.recommendedAction}</p></div>}</article>)}</div>
      </section>

      <section id="readiness" className="subsidy-section readiness-section">
        <div className="section-heading"><p className="eyebrow">CLIENT READINESS</p><h2>客户准备度</h2><p>不做不可解释的总分，按客户类型检查证据是否齐备，并明确现在、信号和联系人。</p></div>
        <div className="readiness-grid">{readinessPlaybooks.map((playbook) => <article className="readiness-card" key={playbook.customerType}><h3>{playbook.customerType}</h3><div className="readiness-items">{playbook.items.map((item) => <div key={item.label}><span className={`readiness-state state-${item.state === "已具备" ? "ready" : item.state === "待补齐" ? "todo" : "na"}`}>{item.state}</span><strong>{item.label}</strong><p>{item.evidence} · 责任：{item.owner}</p></div>)}</div><div className="readiness-actions"><p><strong>现在做：</strong>{playbook.now}</p><p><strong>等信号：</strong>{playbook.nextSignal}</p><p><strong>联系：</strong>{playbook.contact}</p></div></article>)}</div>
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
