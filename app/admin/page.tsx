"use client";

import { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar, { type AdminTab } from "../components/admin/AdminSidebar";
import RecentOrders from "../components/admin/RecentOrders";
import SalesChart from "../components/admin/SalesChart";
import StatCards from "../components/admin/StatCards";
import TopProducts from "../components/admin/TopProducts";
import ProductsManager from "../components/admin/ProductsManager";
import { useThemeContext } from "../context/ThemeContext";

const mobileTabs: Array<{ id: AdminTab; label: string }> = [
  { id: "dashboard", label: "داشبورد" },
  { id: "products", label: "محصولات" },
  { id: "orders", label: "سفارش‌ها" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const { theme, toggleTheme } = useThemeContext();
  const darkMode = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-[#0c0a14] text-white" : "bg-[#f7f5fb] text-gray-900"}`} dir="rtl">
      <div className="grid min-h-screen lg:grid-cols-[250px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen">
            <AdminSidebar activeTab={activeTab} darkMode={darkMode} onSelectTab={setActiveTab} />
          </div>
        </div>
        <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <AdminHeader darkMode={darkMode} onToggleTheme={toggleTheme} />
          <nav aria-label="بخش‌های پنل مدیریت" className="mt-4 grid grid-cols-3 gap-2 lg:hidden">
            {mobileTabs.map((tab) => (
              <button aria-current={activeTab === tab.id ? "page" : undefined} className={`rounded-xl px-3 py-3 text-xs font-bold transition ${activeTab === tab.id ? "bg-purple-600 text-white shadow-sm" : darkMode ? "border border-purple-500/20 bg-[#151124] text-violet-200" : "border border-purple-100 bg-white text-gray-600"}`} key={tab.id} onClick={() => setActiveTab(tab.id)} type="button">{tab.label}</button>
            ))}
          </nav>
          <div className="mt-6 grid gap-5">
            {activeTab === "dashboard" && (
              <>
                <StatCards darkMode={darkMode} />
                <div className="grid items-start gap-5 2xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)]">
                  <SalesChart darkMode={darkMode} />
                  <TopProducts darkMode={darkMode} />
                </div>
              </>
            )}
            {activeTab === "products" && <ProductsManager />}
            {activeTab === "orders" && <RecentOrders darkMode={darkMode} />}
            {activeTab === "dashboard" && <RecentOrders darkMode={darkMode} />}
            <footer className={`pb-2 text-center text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              ShopSphere · مدیریت سفارش‌ها و فروش
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
