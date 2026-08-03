import {
  currentSubsidies,
  subsidyDistricts,
  subsidyMetrics,
  subsidyPolicies,
  subsidyStatusLabel,
  type SubsidyPolicy,
} from "../subsidy-data";
import { SiteNav } from "./SiteNav";
import { SubsidyCard } from "./SubsidyCard";

const statusOrder: Record<SubsidyPolicy["status"], number> = {
  open: 0,
  closing_soon: 1,
  rolling: 2,
  effective_no_round: 3,
  pending_verification: 4,
  closed: 5,
};

function deadlineValue(policy: SubsidyPolicy) {
  return policy.deadline ?? "9999-12-31";
}

function currentWindowSort(a: SubsidyPolicy, b: SubsidyPolicy) {
  return statusOrder[a.status] - statusOrder[b.status] || deadlineValue(a).localeCompare(deadlineValue(b));
}

function WindowCard({ policy }: { policy: SubsidyPolicy }) {
  return <article className="subsidy-window-card">
    <div className="subsidy-window-topline"><span className={`status ${policy.status === "open" || policy.status === "closing_soon" ? "active" : "rolling"}`}>{subsidyStatusLabel(policy.status)}</span><span>{policy.level} · {policy.district}</span></div>
    <h3><a href={`#${policy.id}`}>{policy.name} ↘</a></h3>
    <p className="subsidy-window-amount">{policy.amount}</p>
    <p>{policy.deadline ? `截止 ${policy.deadline}` : "没有固定截止日，按批次或额度开放"}</p>
    <p className="subsidy-window-action">{policy.action}</p>
  </article>;
}

export function SubsidyRadarPage() {
  const current = [...currentSubsidies()].sort(currentWindowSort);
  const coveredDistricts = subsidyDistricts.filter((item) => item.evidenceCount > 0);
  const waitingDistricts = subsidyDistricts.filter((item) => item.evidenceCount === 0);

  return <main>
    <header className="page-hero subsidy-hero"><p className="eyebrow">SUBSIDY APPLICATION RADAR · VERIFIED AS OF 2026-08-03</p><h1>补贴申报雷达</h1><p>先看能不能申报，再看支持多少。聚焦北京市级、各区和经开区的 Token/模型券、算力券、数据券、备案、场景和 OPC 支持。</p></header>
    <SiteNav />

    <section className="subsidy-page">
      <nav className="subsidy-anchor-nav" aria-label="补贴雷达分区"><a href="#current">当前窗口</a><a href="#all">全部政策库</a><a href="#coverage">区域覆盖</a></nav>

      <div className="subsidy-metrics">
        <article><strong>{subsidyMetrics.current}</strong><span>当前可跟进</span></article>
        <article><strong>{subsidyMetrics.open}</strong><span>当前可申报</span></article>
        <article><strong>{subsidyMetrics.closingSoon}</strong><span>30 日内截止</span></article>
        <article><strong>{subsidyMetrics.rolling}</strong><span>滚动/额度制</span></article>
        <article><strong>{subsidyMetrics.closed}</strong><span>本轮已截止</span></article>
      </div>

      <section id="current" className="subsidy-section">
        <div className="section-heading"><p className="eyebrow">WINDOW FIRST</p><h2>当前窗口</h2><p>默认优先显示当前可申报、即将截止和持续有效事项；金额、条件和入口均保留核验依据。</p></div>
        {current.length > 0 ? <div className="subsidy-window-list">{current.map((policy) => <WindowCard key={policy.id} policy={policy} />)}</div> : <div className="empty-state"><span className="empty-mark">—</span><div><h3>本期没有已核验的当前窗口</h3><p>继续跟踪政策兑现专区和各区当期通知。</p></div></div>}
      </section>

      <section id="all" className="subsidy-section">
        <div className="section-heading"><p className="eyebrow">AUDITABLE INVENTORY</p><h2>全部政策库</h2><p>已截止事项保留在这里用于下一轮准备；“待批次”不等于当前开放申报。</p></div>
        <div className="subsidy-card-list">{subsidyPolicies.map((policy) => <SubsidyCard key={policy.id} policy={policy} />)}</div>
      </section>

      <section id="coverage" className="subsidy-section subsidy-coverage">
        <div className="section-heading"><p className="eyebrow">DISTRICT COVERAGE</p><h2>区域覆盖与核验队列</h2><p>没有检出正式记录的区域标记为“待持续扫描”，不等于当地没有政策。</p></div>
        <div className="coverage-summary"><strong>{coveredDistricts.length}</strong><span>个区域已纳入证据记录</span><strong>{waitingDistricts.length}</strong><span>个区域待持续扫描</span></div>
        <div className="coverage-grid">{subsidyDistricts.map((item) => <article key={item.district}><div><h3>{item.district}</h3><span className={item.evidenceCount > 0 ? "status active" : "status review"}>{item.verificationState}</span></div><strong>{item.evidenceCount}</strong><p>最近核验：{item.lastVerified}</p></article>)}</div>
      </section>

      <p className="subsidy-disclaimer">核验标准：官方政策原文/申报通知/附件为正式依据；官方转载和工作动态用于交叉核验；新闻、公众号和媒体线索不会单独作为可申报结论。补贴额度受年度预算、评审、查重、平台余额和当期通知影响，正式申报前请再次打开官方来源和政策兑现入口。</p>
    </section>
    <footer>北京 AI 政策情报 · 补贴申报雷达 · 每周一 09:00（北京时间）更新</footer>
  </main>;
}
