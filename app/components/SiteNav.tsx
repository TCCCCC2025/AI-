const links = [
  { href: "/", label: "首页总览" },
  { href: "/leadership", label: "领导看政策" },
  { href: "/client-manager", label: "客户经理找机会" },
  { href: "/weekly", label: "本周最新" },
  { href: "/national", label: "国家" },
  { href: "/beijing", label: "北京市级" },
  { href: "/districts", label: "区级" },
];

export function SiteNav() {
  return <nav className="topic-nav" aria-label="站点导航">{links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>;
}
