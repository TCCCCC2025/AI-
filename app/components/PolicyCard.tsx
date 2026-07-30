import type { PolicyWithBrief } from "../policy-data";

export function PolicyCard({ policy }: { policy: PolicyWithBrief }) {
  return <article className="policy-card">
    <div className="policy-card-head">
      <div><h2>{policy.href ? <a href={policy.href}>{policy.title} <span>↗</span></a> : policy.title}</h2><p>{policy.issuer} · {policy.date} · {policy.themes}</p></div>
      <span className={`status ${policy.status === "持续适用" ? "active" : policy.status === "滚动核验" ? "rolling" : "review"}`}>{policy.status}</span>
    </div>
    <div className="brief-grid">
      <section><h3>政策概要</h3><p>{policy.summary}</p></section>
      <section><h3>企业机会</h3><p>{policy.businessImpact}</p></section>
      <section><h3>合规与业务影响</h3><p>{policy.complianceImpact}</p></section>
      <section><h3>行动提示</h3><p>{policy.action}</p></section>
    </div>
  </article>;
}

