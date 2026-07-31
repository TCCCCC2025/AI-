import type { Metadata } from "next";
import { clientPlaybooks, policyHref } from "../audience-data";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = {
  title: "客户经理找机会｜北京 AI 政策情报",
  description: "按客户类型整理的 AI 政策会前准备卡、建议话题、提问与下一步动作。",
};

export default function ClientManagerPage() {
  return <main>
    <section className="audience-hero client-hero">
      <p className="eyebrow">CLIENT CONVERSATION PLAYBOOK · 2026-07-30</p>
      <div>
        <h1>客户经理<br />找机会</h1>
        <p>会前准备卡：从客户类型出发，快速找到相关政策、可能需求和可继续讨论的问题。</p>
      </div>
      <p className="audience-disclaimer">基于公开政策的业务研判</p>
    </section>
    <SiteNav />

    <section className="audience-section playbook-section">
      <div className="section-heading"><p className="eyebrow">PRE-MEETING CARDS</p><h2>会前准备卡</h2><p>先选择客户类型；所有建议均需结合客户现状、属地条件和政策原文复核。</p></div>
      <div className="playbook-list">{clientPlaybooks.map((playbook, index) => <article className="playbook-card" key={playbook.id}>
        <aside><span>{String(index + 1).padStart(2, "0")}</span><p>客户类型</p></aside>
        <div className="playbook-content">
          <h2>{playbook.label}</h2>
          <div className="playbook-grid">
            <section className="policy-signals"><h3>相关政策信号</h3><div>{playbook.policies.map((policy) => <a key={policy.id} href={policyHref(policy.id)}><span>{policy.level}</span><strong>{policy.title}</strong><i className={`status ${policy.validity === "有效" ? "active" : policy.validity === "待核实" ? "review" : "rolling"}`}>{policy.validity}</i></a>)}</div></section>
            <section><h3>可能需求</h3><div className="need-tags">{playbook.possibleNeeds.map((need) => <span key={need}>{need}</span>)}</div></section>
            <section className="conversation-topic"><h3>建议话题</h3><p>{playbook.conversationStarter}</p></section>
            <section><h3>建议提问</h3><ol>{playbook.discoveryQuestions.map((question) => <li key={question}>{question}</li>)}</ol></section>
            <section className="next-action"><h3>下一步动作</h3><p>{playbook.nextStep}</p></section>
          </div>
          <p className="analysis-basis">基于公开政策的业务研判，不替代对客户需求、申报资格和政策有效性的正式核验。</p>
        </div>
      </article>)}</div>
    </section>
    <footer>北京 AI 政策情报 · 客户经理视图 · 基于公开政策的业务研判</footer>
  </main>;
}
