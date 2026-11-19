"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import { useShopContext } from "../../context/ShopContext";

function formatPrice(value: number) {
  return `${value.toLocaleString("fa-IR")} تومان`;
}

export default function StatCards({ darkMode }: { darkMode: boolean }) {
  const { orders, products } = useShopContext();
  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const soldItems = orders.reduce((sum, order) => sum + order.items.reduce((quantity, item) => quantity + item.quantity, 0), 0);
    return [
      { label: "درآمد کل", value: formatPrice(revenue), note: "از سفارش‌های ثبت‌شده", icon: "money", color: "bg-purple-50 text-purple-700" },
      { label: "سفارش‌ها", value: orders.length.toLocaleString("fa-IR"), note: "سفارش واقعی فروشگاه", icon: "orders", color: "bg-blue-50 text-blue-700" },
      { label: "محصولات فروخته‌شده", value: soldItems.toLocaleString("fa-IR"), note: "تعداد اقلام سفارش‌ها", icon: "items", color: "bg-emerald-50 text-emerald-700" },
      { label: "محصولات", value: products.length.toLocaleString("fa-IR"), note: "محصول فعال در فروشگاه", icon: "items", color: "bg-amber-50 text-amber-700" },
    ];
  }, [orders, products]);

  const iconPath: Record<string, ReactNode> = {
    money: <><path d="M3 7h18v13H3z" /><path d="M3 10h18M7 16h3M7 4h13v3" /><circle cx="17" cy="15" r="2" /></>,
    orders: <><path d="M5 4h14v17H5z" /><path d="M8 8h8m-8 4h8m-8 4h5M9 2h6v4H9z" /></>,
    items: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v8l9 5 9-5V8m-9 5v8" /></>,
    customers: <><circle cx="9" cy="8" r="4" /><path d="M2 21v-2a7 7 0 0 1 14 0v2m2-13a4 4 0 0 1 0 8m1 2a6 6 0 0 1 3 5" /></>,
  };

  return (
    <section aria-label="آمار فروشگاه" className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map((stat) => (
        <article className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${darkMode ? "border-white/10 bg-[#151321]/90" : "border-white bg-white/90"}`} key={stat.label}>
          <div className="flex items-start justify-between gap-2">
            <div className={`grid size-11 place-items-center rounded-xl ${stat.color}`}>
              <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">{iconPath[stat.icon]}</svg>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${darkMode ? "bg-white/5 text-gray-400" : "bg-gray-50 text-gray-500"}`}>آمار زنده</span>
          </div>
          <p className={`mt-5 text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
          <p className={`mt-2 truncate text-xl font-black ${darkMode ? "text-white" : "text-gray-900"}`} title={stat.value}>{stat.value}</p>
          <p className={`mt-2 text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{stat.note}</p>
        </article>
      ))}
    </section>
  );
}
