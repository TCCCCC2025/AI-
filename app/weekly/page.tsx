import { SiteNav } from "../components/SiteNav";
import { weeklyChanges } from "../policy-data";

export default function WeeklyPage() {
  return <main>
    <header className="page-hero"><p className="eyebrow">WEEKLY POLICY UPDATE</p><h1>本周最新政策</h1><p>仅记录本周完成官方核验的新增、修订、截止与移出事项。</p></header>
    <SiteNav />
    <section className="weekly-page">
      {weeklyChanges.length ? <div className="weekly-list">{weeklyChanges.map((item) => <article className="weekly-card" key={item.title}><div><span className="change-type">{item.changeType}</span><time>{item.date}</time></div><h2>{item.href ? <a href={item.href}>{item.title} ↗</a> : item.title}</h2><p>{item.detail}</p><span className={`status ${item.status === "持续适用" ? "active" : item.status === "滚动核验" ? "rolling" : "review"}`}>{item.status}</span></article>)}</div> : <div className="empty-state"><span className="empty-mark">—</span><div><h2>本周无已核验重大变化</h2><p>将继续跟踪官方发布和申报窗口。</p></div></div>}
    </section>
    <footer>北京 AI 政策情报 · 自动更新计划：每周一 09:00（北京时间）</footer>
  </main>;
}

