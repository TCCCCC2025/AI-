import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "北京 AI 政策情报",
  description: "北京 AI、大模型、算力与数据政策的核验周报与申报窗口。",
};

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">BEIJING · AI POLICY INTELLIGENCE</p>
        <div className="hero-grid">
          <div>
            <h1>北京 AI<br />政策情报</h1>
            <p className="intro">每周追踪 AI、大模型、算力与数据政策；优先核验官方原文，清晰呈现可行动的信息。</p>
          </div>
          <aside className="as-of">
            <span>本期截止</span>
            <strong>2026-07-30</strong>
            <p>中国标准时间 · 第 30 周</p>
          </aside>
        </div>
      </section>

      <nav className="topic-nav" aria-label="站点栏目">
        <a href="#weekly">本周动态</a>
        <a href="#radar">申报窗口</a>
        <a href="#method">核验规则</a>
      </nav>

      <section className="dashboard" id="weekly">
        <article className="lead-card">
          <div className="card-topline"><span className="tag verified">经官方核验</span><span>市级 · AI / 大模型 / 算力 / 数据</span></div>
          <h2>智能体成为北京 AI 新政策主线</h2>
          <p>北京市印发智能体引领发展措施，提出支持基础模型、智能体共性技术、标杆场景、Token 经济、算力保障与安全治理。</p>
          <dl className="facts">
            <div><dt>政策文件</dt><dd>《北京市关于加快智能体引领发展的若干措施》</dd></div>
            <div><dt>发文字号</dt><dd>京发改〔2026〕1185号</dd></div>
            <div><dt>发布日期</dt><dd>2026-07-23</dd></div>
          </dl>
          <a className="source-link" href="https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html">查看官方原文 <span>↗</span></a>
        </article>

        <aside className="status-panel">
          <p className="panel-label">本周扫描</p>
          <div className="metric"><strong>1</strong><span>经官方核验的重点动态</span></div>
          <div className="metric"><strong>8</strong><span>核心官方入口已扫描</span></div>
          <p className="note">聚合资讯仅用于发现线索；未获官方证据的内容不会进入正式政策库。</p>
        </aside>
      </section>

      <section className="radar" id="radar">
        <div className="section-heading"><p className="eyebrow">ACTION RADAR</p><h2>申报窗口雷达</h2></div>
        <div className="empty-state"><span className="empty-mark">—</span><div><h3>本期未发现未来 30 天内、已完成官方核验的新增申报截止日</h3><p>后续将持续跟踪北京市政策兑现专区、经信局与重点区申报通知。</p></div></div>
      </section>

      <section className="method" id="method">
        <div><p className="eyebrow">VERIFICATION STANDARD</p><h2>信息不是越多越好，<br />而是越可复核越好。</h2></div>
        <ol>
          <li><span>01</span><p><strong>官方原文优先</strong>以发文机关页面及附件为准。</p></li>
          <li><span>02</span><p><strong>政策与申报分开</strong>长期措施和每轮申报分别追踪。</p></li>
          <li><span>03</span><p><strong>待核实单列</strong>不将线索、解读或搜索摘要当作结论。</p></li>
        </ol>
      </section>

      <footer>北京 AI 政策情报 · 自动更新计划：每周一 09:00（北京时间）</footer>
    </main>
  );
}
