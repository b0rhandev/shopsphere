"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { imageAssets } from "../../data/images";

interface AdminSidebarProps {
  darkMode: boolean;
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

export type AdminTab = "dashboard" | "products" | "orders";

const links = [
  { label: "داشبورد", icon: "home", tab: "dashboard" as const },
  { label: "محصولات", icon: "box", tab: "products" as const },
  { label: "سفارش‌ها", icon: "cart", tab: "orders" as const },
  { label: "مشتریان", href: "#recent-orders", icon: "users" },
  { label: "گزارش‌ها", href: "#sales-chart", icon: "chart" },
  { label: "تنظیمات", href: "#settings", icon: "settings" },
];

function SidebarIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v8l9 5 9-5V8M12 13v8" /></>,
    cart: <><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" /><circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /><path d="M15 9h4v4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.6-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.6.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.9Z" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
  };
  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
      {paths[name] ?? paths.home}
    </svg>
  );
}

export default function AdminSidebar({ darkMode, activeTab, onSelectTab }: AdminSidebarProps) {
  return (
    <aside className={`flex h-full flex-col border-l p-4 transition-colors ${darkMode ? "border-white/10 bg-[#151321]" : "border-purple-100/70 bg-white/80"}`}>
      <Link aria-label="بازگشت به فروشگاه ShopSphere" className="flex items-center gap-3 px-2 py-3" href="/">
        <span className="grid size-10 place-items-center rounded-xl bg-purple-100 text-purple-700 shadow-sm">
          <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
            <path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /><path d="m9 14 2 2 4-4" />
          </svg>
        </span>
        <span className={`text-lg font-black ${darkMode ? "text-white" : "text-gray-900"}`}>Shop<span className="text-purple-600">Sphere</span></span>
      </Link>

      <p className={`mb-3 mt-8 px-3 text-[10px] font-bold tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>مدیریت فروشگاه</p>
      <nav aria-label="منوی پنل مدیریت" className="grid gap-1.5">
        {links.map((link) => {
          const active = link.tab === activeTab;
          const className = `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
            active
              ? "bg-purple-600 text-white shadow-[0_8px_18px_rgba(109,40,217,0.22)]"
              : darkMode ? "text-gray-300 hover:bg-white/5 hover:text-white" : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
          }`;
          const content = <><SidebarIcon name={link.icon} />{link.label}</>;
          return link.tab ? (
            <button aria-current={active ? "page" : undefined} className={className} key={link.label} onClick={() => onSelectTab(link.tab)} type="button">{content}</button>
          ) : (
            <Link className={className} href={link.href ?? "#"} key={link.label}>{content}</Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className={`mb-4 flex items-center gap-3 rounded-2xl p-3 ${darkMode ? "bg-white/5" : "bg-purple-50"}`} id="admin-profile">
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
            <Image alt="تصویر برهان، مدیر فروشگاه" className="object-cover" fill sizes="40px" src={imageAssets.borhanAvatar} unoptimized />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>برهان</span>
            <span className={`mt-0.5 block text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>مدیر فروشگاه</span>
          </span>
          <SidebarIcon name="logout" />
        </div>
        <Link className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${darkMode ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`} href="/">
          <SidebarIcon name="logout" /> بازگشت به فروشگاه
        </Link>
      </div>
    </aside>
  );
}
