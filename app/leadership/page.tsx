import type { Metadata } from "next";
import {
  leadershipPriorityPolicies,
  leadershipRiskPolicies,
  leadershipSignals,
  managementActions,
  policyHref,
  themeMetrics,
} from "../audience-data";
import { SiteNav } from "../components/SiteNav";
import { policyGroups } from "../policy-data";

export const metadata: Metadata = {
  title: "领导看政策｜北京 AI 政策情报",
  description: "面向管理层的北京 AI 政策摘要、重点机会、风险与行动建议。",
};

export default function LeadershipPage() {
  return <main>
    <section className="audience-hero leadership-hero">
      <p className="eyebrow">LEADERSHIP BRIEF · 2026-08-03</p>
      <div>
        <h1>领导看政策</h1>
        <p>用一页快速掌握政策方向、业务机会、风险边界和需要推动的管理动作。</p>
      </div>
      <p className="audience-disclaimer">基于公开政策的业务研判</p>
    </section>
    <SiteNav />

    <section className="audience-section leadership-summary">
      <div className="section-heading"><p className="eyebrow">EXECUTIVE SUMMARY</p><h2>领导摘要</h2><p>先看趋势，再决定资源投入和跟踪重点。</p></div>
      <div className="signal-grid">{leadershipSignals.map((item, index) => <article key={item.title}><span className="signal-number">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.signal}</p><strong>{item.managementMeaning}</strong><div className="policy-link-row">{item.policyIds.map((policyId) => <a key={policyId} href={policyHref(policyId)}>查看依据 ↗</a>)}</div></article>)}</div>
    </section>

    <section className="audience-section priority-section">
      <div className="section-heading"><p className="eyebrow">PRIORITY OPPORTUNITIES</p><h2>重点机会</h2><p>从政策库中筛选高机会事项，供专项跟踪和资源配置参考。</p></div>
      <div className="priority-list">{leadershipPriorityPolicies.map((policy, index) => <article key={policy.id}><span>{String(index + 1).padStart(2, "0")}</span><div><h3><a href={policyHref(policy.id)}>{policy.title}</a></h3><p>{policy.customerTypes.slice(0, 2).join(" · ")}</p></div><strong>{policy.action}</strong></article>)}</div>
    </section>

    <section className="audience-section risk-section">
      <div className="section-heading"><p className="eyebrow">RISK &amp; VERIFICATION</p><h2>风险与核验</h2><p>把合规、时效和待核实事项放在业务推进之前检查。</p></div>
      <div className="risk-grid">{leadershipRiskPolicies.map((policy) => <article key={policy.id}><div><span className={`status ${policy.validity === "有效" ? "active" : policy.validity === "待核实" ? "review" : "rolling"}`}>{policy.validity}</span><span className="risk-level">{policy.level}</span></div><h3><a href={policyHref(policy.id)}>{policy.title}</a></h3><p>{policy.judgement}</p></article>)}</div>
    </section>

    <section className="audience-section management-section">
      <div className="section-heading"><p className="eyebrow">MANAGEMENT ACTIONS</p><h2>管理层建议</h2></div>
      <ol>{managementActions.map((action, index) => <li key={action}><span>{String(index + 1).padStart(2, "0")}</span><p>{action}</p></li>)}</ol>
    </section>

    <section className="audience-section structure-section">
      <div className="section-heading"><p className="eyebrow">POLICY STRUCTURE</p><h2>政策结构</h2><p>当前纳入正式库的政策分布。</p></div>
      <div className="structure-wrap"><div className="structure-levels">{policyGroups.map((group) => <a key={group.id} href={`/${group.id}`}><span>{group.title}</span><strong>{group.policies.length}</strong><i>项政策</i></a>)}</div><div className="theme-metrics">{Object.entries(themeMetrics).map(([theme, count]) => <article key={theme}><strong>{count}</strong><span>{theme}</span></article>)}</div></div>
    </section>
    <footer>北京 AI 政策情报 · 领导视图 · 基于公开政策的业务研判</footer>
  </main>;
}
