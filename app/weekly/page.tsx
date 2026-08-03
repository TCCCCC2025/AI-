import { SiteNav } from "../components/SiteNav";
import { previousWeeklyChanges, weeklyChanges } from "../policy-data";

function WeeklyList({ items }: { items: typeof weeklyChanges }) {
  return items.length ? <div className="weekly-list">{items.map((item) => <article className="weekly-card" key={item.title}><div><span className="change-type">{item.changeType}</span><time>{item.date}</time></div><h2>{item.href ? <a href={item.href}>{item.title} ↗</a> : item.title}</h2><p>{item.detail}</p><span className={`status ${item.status === "持续适用" ? "active" : item.status === "滚动核验" ? "rolling" : "review"}`}>{item.status}</span></article>)}</div> : <div className="empty-state"><span className="empty-mark">—</span><div><h2>本周无已核验重大变化</h2><p>将继续跟踪官方发布和申报窗口。</p></div></div>;
}

export default function WeeklyPage() {
  return <main>
    <header className="page-hero"><p className="eyebrow">WEEKLY POLICY UPDATE · 2026-07-20—2026-08-02</p><h1>本周最新政策</h1><p>截至 2026-08-03，分开呈现本周与上周完成官方核验的新增、修订、截止与移出事项。</p></header>
    <SiteNav />
    <section className="weekly-page">
      <section className="weekly-period"><div className="section-heading"><p className="eyebrow">CURRENT WEEK · 2026-07-27—2026-08-02</p><h2>本周最新</h2><p>当前周已完成核验的政策变化。</p></div><WeeklyList items={weeklyChanges} /></section>
      <section className="weekly-period previous-period"><div className="section-heading"><p className="eyebrow">PREVIOUS WEEK · 2026-07-20—2026-07-26</p><h2>上周政策</h2><p>上周已核验事项继续保留，便于回看政策连续性。</p></div><WeeklyList items={previousWeeklyChanges} /></section>
    </section>
    <footer>北京 AI 政策情报 · 自动更新计划：每周一 09:00（北京时间）</footer>
  </main>;
}
