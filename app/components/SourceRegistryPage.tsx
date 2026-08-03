"use client";

import { useMemo, useState } from "react";
import { sourceRegistry, type SourceType, type VerificationStatus } from "../source-registry-data";
import { SiteNav } from "./SiteNav";

const sourceTypeLabels: Record<SourceType, string> = {
  official_policy: "官方政策",
  application_portal: "申报入口",
  official_repost: "官方转载",
  platform_update: "平台/园区动态",
  lead: "新闻/公众号线索",
};

const verificationLabels: Record<VerificationStatus, string> = {
  verified: "已核验",
  lead: "待核验线索",
  not_found: "未检出正式记录",
  unavailable: "暂不可访问",
};

export function SourceRegistryPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("全部区域");
  const [sourceType, setSourceType] = useState("全部来源");
  const [verificationStatus, setVerificationStatus] = useState("全部状态");

  const regions = useMemo(() => ["全部区域", ...Array.from(new Set(sourceRegistry.map((item) => item.region))).sort()], []);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return sourceRegistry.filter((item) => {
      const haystack = [item.title, item.publisher, item.url, item.notes, ...item.relatedPolicyIds].join(" ").toLowerCase();
      return (!normalized || haystack.includes(normalized))
        && (region === "全部区域" || item.region === region)
        && (sourceType === "全部来源" || item.sourceType === sourceType)
        && (verificationStatus === "全部状态" || item.verificationStatus === verificationStatus);
    });
  }, [query, region, sourceType, verificationStatus]);

  return <main>
    <header className="page-hero source-registry-hero"><p className="eyebrow">SOURCE REGISTRY · REUSABLE SCAN INDEX</p><h1>政策来源库</h1><p>把扫描过且有复用价值的网址沉淀为目录。正式来源与线索来源分开，后续周更先复核这里，再补充新网址。</p></header>
    <SiteNav />
    <section className="source-registry-page">
      <div className="source-registry-summary"><strong>{sourceRegistry.length}</strong><span>条已登记来源</span><strong>{sourceRegistry.filter((item) => item.verificationStatus === "verified").length}</strong><span>条已核验</span><strong>{sourceRegistry.filter((item) => item.verificationStatus === "lead").length}</strong><span>条待核验线索</span></div>
      <div className="source-registry-method"><strong>使用规则</strong><span>来源库只记录扫描和复核痕迹；只有“官方政策/申报入口/官方转载”可作为正式政策依据，新闻、公众号或平台线索不会自动改变政策状态。</span></div>
      <form className="source-filters" onSubmit={(event) => event.preventDefault()}>
        <label>关键词<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="标题、机构、网址或政策 ID" /></label>
        <label>区域<select value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>来源类型<select value={sourceType} onChange={(event) => setSourceType(event.target.value)}><option>全部来源</option>{Object.entries(sourceTypeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label>核验状态<select value={verificationStatus} onChange={(event) => setVerificationStatus(event.target.value)}><option>全部状态</option>{Object.entries(verificationLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      </form>
      <div className="source-registry-result-head"><h2>来源记录</h2><span>显示 {filtered.length} / {sourceRegistry.length}</span></div>
      {filtered.length > 0 ? <div className="source-registry-list">{filtered.map((item) => <article className="source-registry-card" key={item.url}><div className="source-registry-card-head"><div><span className={`source-type source-type-${item.sourceType}`}>{sourceTypeLabels[item.sourceType]}</span><span className={`source-verify source-verify-${item.verificationStatus}`}>{verificationLabels[item.verificationStatus]}</span><h3><a href={item.url}>{item.title} ↗</a></h3><p>{item.publisher} · {item.level} · {item.region}</p></div><time>复核 {item.lastVerified}</time></div><p className="source-url">{item.url}</p><p>{item.notes}</p><div className="source-registry-meta"><span>首次发现：{item.firstSeen}</span><span>下次复核：{item.nextReview}</span><span>关联政策：{item.relatedPolicyIds.length ? item.relatedPolicyIds.map((id) => <a href={`/subsidies#${id}`} key={id}>{id}</a>) : "待关联"}</span></div></article>)}</div> : <div className="empty-state"><span className="empty-mark">—</span><div><h3>没有符合条件的来源记录</h3><p>请调整关键词、区域、来源类型或核验状态。</p></div></div>}
      <p className="source-registry-disclaimer">网址可能因外部站点调整而失效；来源库保留原始地址和核验日期，正式申报前仍应打开链接确认最新通知、附件和入口。</p>
    </section>
    <footer>北京 AI 政策情报 · 政策来源库 · 每周一 09:00（北京时间）更新</footer>
  </main>;
}
