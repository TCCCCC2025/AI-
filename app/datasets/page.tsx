import { datasetMetrics, datasetPolicies, datasetRelatedPolicies, datasetSubsidies, type DatasetPolicy, type DatasetRelatedPolicy } from "../dataset-data";
import type { SubsidyPolicy } from "../subsidy-data";
import { SiteNav } from "../components/SiteNav";

function DatasetCard({ policy }: { policy: DatasetPolicy }) {
  const statusClass = policy.status === "持续适用" ? "active" : policy.status === "滚动核验" ? "rolling" : "review";
  return <article className="dataset-card" id={policy.id}>
    <div className="dataset-card-head">
      <div><span className="dataset-level">{policy.level} · {policy.category}</span><h2><a href={policy.sourceUrl}>{policy.title} <span>↗</span></a></h2><p>{policy.issuer} · {policy.date}</p></div>
      <span className={`status ${statusClass}`}>{policy.status}</span>
    </div>
    <div className="dataset-tags">{policy.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    <div className="dataset-facts"><section><h3>政策概要</h3><p>{policy.summary}</p></section><section><h3>支持方向</h3><p>{policy.supportDirection}</p></section><section><h3>申报/入口条件</h3><p>{policy.eligibility}</p>{policy.entry && <a className="dataset-card-entry" href={policy.entry.href}>{policy.entry.label} ↗</a>}</section><section><h3>企业机会</h3><p>{policy.businessImpact}</p></section><section><h3>合规边界</h3><p>{policy.complianceImpact}</p></section><section><h3>行动提示</h3><p>{policy.action}</p></section></div>
  </article>;
}

function RelatedPolicyRow({ policy }: { policy: DatasetRelatedPolicy }) {
  return <article className="dataset-related-card">
    <div className="dataset-related-head"><span className="dataset-level">{policy.level} · {policy.relation}</span><span className={`status ${policy.status === "持续适用" ? "active" : policy.status === "滚动核验" ? "rolling" : "review"}`}>{policy.status}</span></div>
    <h3><a href={policy.sourceUrl}>{policy.title} <span>↗</span></a></h3>
    <p>{policy.issuer} · {policy.date}</p>
  </article>;
}

function DatasetSubsidyCard({ subsidy }: { subsidy: SubsidyPolicy }) {
  const statusLabel = subsidy.status === "current" ? "当前可申报" : subsidy.status === "effective_waiting_round" ? "政策有效·待批次" : subsidy.status === "closed" ? "本轮已截止" : "线索待核";
  const statusClass = subsidy.status === "current" ? "active" : subsidy.status === "closed" ? "review" : subsidy.status === "lead_pending" ? "pending" : "rolling";
  const entry = subsidy.applicationUrl ?? subsidy.applicationEntry;
  return <article className="dataset-subsidy-card">
    <div className="dataset-related-head"><span className="dataset-level">{subsidy.region} · {subsidy.mechanism}</span><span className={`status ${statusClass}`}>{statusLabel}</span></div>
    <h3>{subsidy.title}</h3>
    <div className="dataset-subsidy-facts"><div><span>支持方向</span><strong>{subsidy.supportDirections.join("、")}</strong></div><div><span>支持金额</span><strong>{subsidy.amount}</strong></div><div><span>申报窗口</span><strong>{subsidy.applicationWindow}</strong></div></div>
    <p>{subsidy.summary}</p>
    <div className="dataset-subsidy-links">{subsidy.sources.slice(0, 2).map((source) => <a key={source.url} href={source.url}>政策依据：{source.title} ↗</a>)}{entry && <a href={entry}>申报入口 ↗</a>}</div>
  </article>;
}

export default function DatasetsPage() {
  return <main>
    <header className="page-hero dataset-hero"><p className="eyebrow">DATASET POLICY MODULE · VERIFIED SOURCES</p><h1>高质量数据集政策</h1><p>把国家制度、北京供给征集、平台入口和企业落地动作放在一张图里，专门服务数据集建设、可信空间和 AI 训练数据项目。</p></header>
    <SiteNav />
    <section className="dataset-page">
      <div className="dataset-summary"><div><p className="eyebrow">FROM DATA SUPPLY TO MODEL VALUE</p><h2>数据集政策已经从“资源征集”走向“建设、测评、流通、应用”全链条。</h2><p>本页把核心数据集政策、现有政策库中的关联记录、补贴雷达中的数据类事项和本次补充核验的外省市政策统一归档；金额、批次和申报窗口未在原文明确的，统一标为待核或滚动核验。</p></div><div className="dataset-metrics"><article><strong>{datasetMetrics.combined}</strong><span>统一归档记录</span></article><article><strong>{datasetMetrics.total}</strong><span>模块核心政策</span></article><article><strong>{datasetMetrics.related}</strong><span>现有库关联政策</span></article><article><strong>{datasetMetrics.subsidies}</strong><span>补贴/申报关联</span></article></div></div>
      <section className="dataset-ladder"><div><span>01</span><strong>建</strong><p>采集、加工、标注和质量评测。</p></div><div><span>02</span><strong>测</strong><p>形成目录、凭证、标准和可验证样本。</p></div><div><span>03</span><strong>流</strong><p>产权登记、授权运营和可信空间流通。</p></div><div><span>04</span><strong>用</strong><p>进入模型训练、行业场景和应用验收。</p></div></section>
      <section className="dataset-list"><div className="section-heading"><p className="eyebrow">CORE POLICY LIBRARY · {datasetMetrics.total} RECORDS</p><h2>核心政策与入口</h2><p>按国家依据、北京市级机制和政策信号整理，点击标题可回到官方原文。</p></div><div className="dataset-card-list">{datasetPolicies.map((policy) => <DatasetCard key={policy.id} policy={policy} />)}</div></section>
      <section className="dataset-aggregation"><div className="section-heading"><p className="eyebrow">MERGED FROM POLICY LIBRARY · {datasetMetrics.related} RECORDS</p><h2>现有政策库中的全部关联记录</h2><p>自动从国家、北京市级、区级和外省市政策库中归并标题、主题或分析字段涉及数据集、语料、数据资源、可信数据空间、数据产权和数据券的记录。</p></div><div className="dataset-related-list">{datasetRelatedPolicies.map((policy) => <RelatedPolicyRow key={policy.id} policy={policy} />)}</div></section>
      <section className="dataset-aggregation dataset-subsidy-section"><div className="section-heading"><p className="eyebrow">MERGED FROM SUBSIDY RADAR · {datasetMetrics.subsidies} RECORDS</p><h2>补贴与申报关联事项</h2><p>补贴雷达中与数据集、语料、数据产品、数据券或可信数据空间有关的事项集中展示；已截止事项保留，用于准备下一批材料。</p></div><div className="dataset-subsidy-list">{datasetSubsidies.map((subsidy) => <DatasetSubsidyCard key={subsidy.id} subsidy={subsidy} />)}</div></section>
      <section className="dataset-action"><div><p className="eyebrow">CLIENT ACTION</p><h2>客户经理先问三件事</h2></div><ol><li><strong>数据从哪里来？</strong><span>有没有授权链、来源证明和版本记录？</span></li><li><strong>数据能不能测？</strong><span>有没有样本、质量指标、标注规范和评测报告？</span></li><li><strong>数据怎么用？</strong><span>是训练、交易、可信空间流通，还是行业场景交付？</span></li></ol></section>
    </section>
    <footer>北京 AI 政策情报 · 高质量数据集模块 · 每周一 09:00（北京时间）更新</footer>
  </main>;
}
