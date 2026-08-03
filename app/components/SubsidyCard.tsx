import { subsidyStatusLabel, type SubsidyPolicy } from "../subsidy-data";

function statusClass(status: SubsidyPolicy["status"]) {
  if (status === "open" || status === "closing_soon") return "active";
  if (status === "rolling" || status === "effective_no_round") return "rolling";
  return "review";
}

function List({ items }: { items: string[] }) {
  return <ul className="subsidy-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function SubsidyCard({ policy }: { policy: SubsidyPolicy }) {
  return <article className="subsidy-card" id={policy.id}>
    <div className="subsidy-card-head">
      <div>
        <p className="subsidy-kicker">{policy.level} · {policy.district} · {policy.policyType}</p>
        <h3>{policy.name}</h3>
        <p className="subsidy-meta">{policy.issuer} · 核验于 {policy.lastVerified}</p>
      </div>
      <span className={`status ${statusClass(policy.status)}`}>{subsidyStatusLabel(policy.status)}</span>
    </div>

    <div className="subsidy-facts">
      <div><span>支持金额/比例</span><strong>{policy.amount}</strong></div>
      <div><span>申报窗口</span><strong>{policy.applicationWindow ?? "以当期通知为准"}</strong></div>
      <div><span>截止日期</span><strong>{policy.deadline ?? "滚动或待批次"}</strong></div>
    </div>

    <div className="subsidy-tags">
      <section><h4>支持方向</h4><div>{policy.supportDirection.map((item) => <span key={item}>{item}</span>)}</div></section>
      <section><h4>适合客户</h4><div>{policy.customerTypes.map((item) => <span key={item}>{item}</span>)}</div></section>
    </div>

    <details open className="subsidy-details">
      <summary>展开申报分析</summary>
      <div className="subsidy-detail-grid">
        <section><h4>申报条件</h4><List items={policy.eligibility} /></section>
        <section><h4>申报材料</h4><List items={policy.materials} /></section>
        <section><h4>申报入口</h4><div className="subsidy-links">{policy.portal.map((portal) => <a key={portal.href} href={portal.href}>{portal.label} ↗</a>)}</div>{policy.contact && <p className="subsidy-contact">联系人/咨询：{policy.contact}</p>}</section>
        <section><h4>客户经理行动</h4><p>{policy.action}</p></section>
        <section><h4>合规提醒</h4><List items={policy.compliance} /></section>
        <section><h4>核验依据</h4><div className="subsidy-sources">{policy.source.map((source) => <a key={source.href} href={source.href}><span>{source.tier === "A" ? "官方原文" : source.tier === "B" ? "官方转载" : source.tier === "C" ? "官方动态" : "线索"}</span>{source.title} ↗<small>{source.evidence}</small></a>)}</div></section>
      </div>
    </details>
    <p className="subsidy-note">{policy.verificationNote} · 本条信息不替代正式申报审核。</p>
  </article>;
}
