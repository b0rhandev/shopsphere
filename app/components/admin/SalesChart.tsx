"use client";

import { useMemo } from "react";
import { useShopContext } from "../../context/ShopContext";

const number = (value: number) => value.toLocaleString("fa-IR");

export default function SalesChart({ darkMode }: { darkMode: boolean }) {
  const { orders } = useShopContext();
  const chart = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - index));
      return {
        date,
        key: date.toDateString(),
        label: new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(date),
        total: 0,
      };
    });
    const totals = new Map(days.map((day) => [day.key, day]));
    orders.forEach((order) => {
      const day = totals.get(new Date(order.createdAt).toDateString());
      if (day) day.total += order.total;
    });
    const max = Math.max(...days.map((day) => day.total), 1);
    const points = days.map((day, index) => ({
      ...day,
      x: 42 + (index * 616) / 6,
      y: 205 - (day.total / max) * 160,
    }));
    const line = points.map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
    ).join(" ");
    const area = `${line} L 658 220 L 42 220 Z`;
    return { points, line, area, max, total: days.reduce((sum, day) => sum + day.total, 0) };
  }, [orders]);

  return (
    <section className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${darkMode ? "border-white/10 bg-[#151321]/90" : "border-white bg-white/90"}`} id="sales-chart">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`text-base font-black ${darkMode ? "text-white" : "text-gray-900"}`}>نمودار فروش</h2>
          <p className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>درآمد هفت روز اخیر بر اساس سفارش‌های ثبت‌شده</p>
        </div>
        <div className="text-left">
          <p className={`text-xl font-black ${darkMode ? "text-white" : "text-gray-900"}`}>{number(chart.total)}</p>
          <p className={`mt-1 text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>تومان در ۷ روز</p>
        </div>
      </div>
      <div className="relative mt-5">
        {chart.total === 0 && (
          <p className={`pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            با ثبت سفارش، نمودار فروش اینجا نمایش داده می‌شود.
          </p>
        )}
        <svg aria-label="نمودار درآمد هفت روز اخیر" className="h-52 w-full overflow-visible" preserveAspectRatio="none" role="img" viewBox="0 0 700 245">
          <defs>
            <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".25" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[45, 95, 145, 195].map((y) => <line key={y} stroke={darkMode ? "#ffffff12" : "#e9e3f3"} strokeDasharray="4 6" x1="42" x2="658" y1={y} y2={y} />)}
          {chart.total > 0 && <path d={chart.area} fill="url(#salesFill)" />}
          <path d={chart.line} fill="none" stroke="#7c3aed" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {chart.points.map((point) => (
            <g key={point.key}>
              {point.total > 0 && <circle cx={point.x} cy={point.y} fill="#fff" r="4.5" stroke="#7c3aed" strokeWidth="3" />}
              <text className={darkMode ? "fill-gray-400" : "fill-gray-500"} dominantBaseline="hanging" fontSize="11" textAnchor="middle" x={point.x} y="228">{point.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
