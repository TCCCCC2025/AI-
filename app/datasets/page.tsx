import { datasetMetrics, datasetPolicies, type DatasetPolicy } from "../dataset-data";
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

export default function DatasetsPage() {
  return <main>
    <header className="page-hero dataset-hero"><p className="eyebrow">DATASET POLICY MODULE · VERIFIED SOURCES</p><h1>高质量数据集政策</h1><p>把国家制度、北京供给征集、平台入口和企业落地动作放在一张图里，专门服务数据集建设、可信空间和 AI 训练数据项目。</p></header>
    <SiteNav />
    <section className="dataset-page">
      <div className="dataset-summary"><div><p className="eyebrow">FROM DATA SUPPLY TO MODEL VALUE</p><h2>数据集政策已经从“资源征集”走向“建设、测评、流通、应用”全链条。</h2><p>页面只收录可回溯到官方原文的政策或平台信息；金额、批次和申报窗口未在原文明确的，统一标为待核或滚动核验。</p></div><div className="dataset-metrics"><article><strong>{datasetMetrics.total}</strong><span>条模块记录</span></article><article><strong>{datasetMetrics.national}</strong><span>条国家依据</span></article><article><strong>{datasetMetrics.beijing}</strong><span>条北京机制</span></article><article><strong>{datasetMetrics.active}</strong><span>条持续适用</span></article></div></div>
      <section className="dataset-ladder"><div><span>01</span><strong>建</strong><p>采集、加工、标注和质量评测。</p></div><div><span>02</span><strong>测</strong><p>形成目录、凭证、标准和可验证样本。</p></div><div><span>03</span><strong>流</strong><p>产权登记、授权运营和可信空间流通。</p></div><div><span>04</span><strong>用</strong><p>进入模型训练、行业场景和应用验收。</p></div></section>
      <section className="dataset-list"><div className="section-heading"><p className="eyebrow">POLICY LIBRARY · {datasetMetrics.total} RECORDS</p><h2>政策与入口</h2><p>按国家依据、北京市级机制和政策信号整理，点击标题可回到官方原文。</p></div><div className="dataset-card-list">{datasetPolicies.map((policy) => <DatasetCard key={policy.id} policy={policy} />)}</div></section>
      <section className="dataset-action"><div><p className="eyebrow">CLIENT ACTION</p><h2>客户经理先问三件事</h2></div><ol><li><strong>数据从哪里来？</strong><span>有没有授权链、来源证明和版本记录？</span></li><li><strong>数据能不能测？</strong><span>有没有样本、质量指标、标注规范和评测报告？</span></li><li><strong>数据怎么用？</strong><span>是训练、交易、可信空间流通，还是行业场景交付？</span></li></ol></section>
    </section>
    <footer>北京 AI 政策情报 · 高质量数据集模块 · 每周一 09:00（北京时间）更新</footer>
  </main>;
}
