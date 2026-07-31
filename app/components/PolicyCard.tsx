import { policyGroups, type PolicyWithBrief } from "../policy-data";

export function PolicyCard({ policy }: { policy: PolicyWithBrief }) {
  const related = policy.relatedPolicies
    .map((relation) => {
      const group = policyGroups.find((item) => item.policies.some((candidate) => candidate.id === relation.policyId));
      const relatedPolicy = group?.policies.find((candidate) => candidate.id === relation.policyId);
      return group && relatedPolicy ? { ...relation, group, policy: relatedPolicy } : null;
    })
    .filter((relation) => relation !== null);

  return <article className="policy-card" id={policy.id}>
    <div className="policy-card-head">
      <div><h2>{policy.href ? <a href={policy.href}>{policy.title} <span>↗</span></a> : policy.title}</h2><p>{policy.issuer} · {policy.date} · {policy.themes}</p></div>
      <span className={`status ${policy.status === "持续适用" ? "active" : policy.status === "滚动核验" ? "rolling" : "review"}`}>{policy.status}</span>
    </div>
    <div className="judgement-strip">
      <span className={`opportunity opportunity-${policy.opportunityLevel}`}>机会等级 · {policy.opportunityLevel}</span>
      <p><strong>业务研判</strong>{policy.judgement}</p>
    </div>
    <div className="intelligence-tags">
      <section><h3>可能涉及客户</h3><div>{policy.customerTypes.map((item) => <span key={item}>{item}</span>)}</div></section>
      <section><h3>应用场景</h3><div>{policy.scenarios.map((item) => <span key={item}>{item}</span>)}</div></section>
    </div>
    <div className="brief-grid">
      <section><h3>政策概要</h3><p>{policy.summary}</p></section>
      <section><h3>企业机会</h3><p>{policy.businessImpact}</p></section>
      <section><h3>合规与业务影响</h3><p>{policy.complianceImpact}</p></section>
      <section><h3>行动提示</h3><p>{policy.action}</p></section>
    </div>
    {related.length > 0 && <section className="related-policies"><h3>相关政策</h3><div>{related.map((relation) => <a key={`${relation.type}-${relation.policyId}`} href={`/${relation.group.id}#${relation.policyId}`}><span>{relation.type}</span>{relation.policy.title}</a>)}</div></section>}
    <p className="analysis-basis">{policy.analysisBasis} · 具体资格、额度与期限以官方原文和当期通知为准</p>
  </article>;
}
