import { subsidyStatusLabel, type SubsidyPolicy } from "../subsidy-data";

function statusClass(status: SubsidyPolicy["status"]) {
  if (status === "current") return "active";
  if (status === "effective_waiting_round") return "rolling";
  return "review";
}

function List({ items }: { items: string[] }) {
  return <ul className="subsidy-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function SubsidyCard({ policy }: { policy: SubsidyPolicy }) {
  return <article className="subsidy-card" id={policy.id}>
    <div className="subsidy-card-head">
      <div>
        <p className="subsidy-kicker">{policy.region} · {policy.mechanism}</p>
        <h3>{policy.title}</h3>
        <p className="subsidy-meta">事实层核验于 {policy.verifiedAt}</p>
      </div>
      <span className={`status ${statusClass(policy.status)}`}>{subsidyStatusLabel(policy.status)}</span>
    </div>

    <div className="subsidy-facts">
      <div><span>支持金额/比例</span><strong>{policy.amount}</strong></div>
      <div><span>申报窗口</span><strong>{policy.applicationWindow}</strong></div>
      <div><span>支持机制</span><strong>{policy.mechanism}</strong></div>
    </div>

    <div className="subsidy-tags">
      <section><h4>支持方向</h4><div>{policy.supportDirections.map((item) => <span key={item}>{item}</span>)}</div></section>
      <section><h4>适合客户</h4><div>{policy.beneficiaries.map((item) => <span key={item}>{item}</span>)}</div></section>
    </div>

    <details open className="subsidy-details">
      <summary>展开申报分析</summary>
      <div className="subsidy-detail-grid">
        <section><h4>简要概要</h4><p>{policy.summary}</p></section>
        <section><h4>申报条件</h4><p>{policy.eligibility}</p></section>
        <section><h4>申报入口</h4>{policy.applicationUrl ? <a className="source-link" href={policy.applicationUrl}>打开政策/申报入口 ↗</a> : <p>尚未检出公开入口，以当期通知为准。</p>}</section>
        <section><h4>企业机会</h4><p>{policy.businessImpact}</p></section>
        <section><h4>合规与边界</h4><p>{policy.complianceImpact}</p></section>
        <section><h4>行动提示</h4><p>{policy.action}</p></section>
        <section className="subsidy-source-section"><h4>政策依据与核验</h4><div className="subsidy-sources">{policy.sources.map((source) => <a key={source.url} href={source.url}><span>{source.sourceGrade === "official" ? "官方原文" : source.sourceGrade === "official_repost" ? "官方转载" : "线索"}</span>{source.title} ↗<small>{source.evidence}</small></a>)}</div></section>
        <section><h4>关联政策 ID</h4><p className="subsidy-related-ids">{policy.basisPolicyIds.join(" · ")}</p><List items={["本条内容仅作为政策情报整理，不替代正式申报审核。"]} /></section>
      </div>
    </details>
  </article>;
}
