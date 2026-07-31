import { policyGroups, type PolicyGroup } from "../policy-data";
import { PolicyCard } from "./PolicyCard";
import { SiteNav } from "./SiteNav";

export function PolicyIndexPage({ groupKey }: { groupKey: PolicyGroup["id"] }) {
  const group = policyGroups.find((item) => item.id === groupKey);
  if (!group) return null;
  return <main>
    <header className="page-hero"><p className="eyebrow">POLICY LIBRARY</p><h1>{group.title}</h1><p>{group.note}</p></header>
    <SiteNav />
    <section className="policy-page"><p className="page-note">发文机关、日期和政策状态来自官方原文核验；机会等级、客户类型和行动建议属于业务研判，具体资格与兑现条件以当期官方通知为准。</p>
      <div className="policy-card-list">{group.policies.map((policy) => <PolicyCard key={policy.title} policy={policy} />)}</div>
    </section>
    <footer>北京 AI 政策情报 · 每周一 09:00（北京时间）更新</footer>
  </main>;
}
