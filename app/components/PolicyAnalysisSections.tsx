import { policyIntelligence, readinessPlaybooks } from "../subsidy-intelligence-data";

function BasisChain({ intelligenceId }: { intelligenceId: string }) {
  const item = policyIntelligence.find((entry) => entry.id === intelligenceId);
  if (!item) return null;
  return <article className="basis-chain-card">
    <div className="basis-chain-title"><span>政策依据链</span><h3>{item.title}</h3></div>
    <div className="basis-chain">{item.basis.map((node, index) => <div className="basis-node" key={`${node.url ?? node.title}-${index}`}><span>{index + 1}</span><div><strong>{node.stage}</strong><a href={node.url}>{node.title} ↗</a><small>{node.publisher} · {node.date} · {node.sourceGrade === "official" ? "官方原文" : "官方转载"}</small></div></div>)}</div>
  </article>;
}

export function PolicyAnalysisSections() {
  return <section className="policy-analysis-sections">
    <section id="basis" className="audience-section analysis-section">
      <div className="section-heading"><p className="eyebrow">POLICY LINEAGE</p><h2>政策依据链</h2><p>从上位依据到实施政策、当期通知和入口逐级核对；缺失环节明确显示，不补写推测。</p></div>
      <div className="basis-chain-list">{policyIntelligence.slice(0, 4).map((item) => <BasisChain key={item.id} intelligenceId={item.id} />)}</div>
    </section>

    <section id="trends" className="audience-section analysis-section intelligence-section">
      <div className="section-heading"><p className="eyebrow">FACT → JUDGEMENT → SIGNAL</p><h2>趋势与预警</h2><p>每张卡片把事实、业务研判和下一次扫描信号分开，置信度只代表当前证据强度。</p></div>
      <div className="trend-grid">{policyIntelligence.map((item) => <article className="trend-card" key={item.id}><div className="trend-card-top"><span className={`opportunity opportunity-${item.confidence === "高" ? "高" : item.confidence === "中" ? "中" : "观察"}`}>{item.confidence}置信度</span><span>{item.horizon}</span></div><h3>{item.title}</h3><section><h4>已核验事实</h4><p>{item.fact}</p></section><section><h4>业务研判</h4><p>{item.judgement}</p></section><section><h4>下一信号</h4><p>{item.nextSignal}</p></section>{item.warning && <div className="warning-card"><strong>前置预警 · {item.warning.leadTime}</strong><p>{item.warning.trigger} → {item.warning.likelyAction}</p><p>{item.warning.recommendedAction}</p></div>}</article>)}</div>
    </section>

    <section id="readiness" className="audience-section analysis-section readiness-section">
      <div className="section-heading"><p className="eyebrow">CLIENT READINESS</p><h2>客户准备度</h2><p>不做不可解释的总分，按客户类型检查证据是否齐备，并明确现在、信号和联系人。</p></div>
      <div className="readiness-grid">{readinessPlaybooks.map((playbook) => <article className="readiness-card" key={playbook.customerType}><h3>{playbook.customerType}</h3><div className="readiness-items">{playbook.items.map((item) => <div key={item.label}><span className={`readiness-state state-${item.state === "已具备" ? "ready" : item.state === "待补齐" ? "todo" : "na"}`}>{item.state}</span><strong>{item.label}</strong><p>{item.evidence} · 责任：{item.owner}</p></div>)}</div><div className="readiness-actions"><p><strong>现在做：</strong>{playbook.now}</p><p><strong>等信号：</strong>{playbook.nextSignal}</p><p><strong>联系：</strong>{playbook.contact}</p></div></article>)}</div>
    </section>
  </section>;
}
