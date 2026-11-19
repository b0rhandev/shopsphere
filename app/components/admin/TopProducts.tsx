"use client";

import { useMemo } from "react";
import { useShopContext } from "../../context/ShopContext";

export default function TopProducts({ darkMode }: { darkMode: boolean }) {
  const { orders, products } = useShopContext();
  const topProducts = useMemo(() => {
    const sold = new Map<string, number>();
    orders.forEach((order) => order.items.forEach((item) => {
      sold.set(item.productId, (sold.get(item.productId) ?? 0) + item.quantity);
    }));
    return [...sold.entries()]
      .map(([id, quantity]) => ({ product: products.find((product) => product.id === id), quantity }))
      .filter((entry): entry is { product: (typeof products)[number]; quantity: number } => Boolean(entry.product))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [orders, products]);
  const maxQuantity = Math.max(...topProducts.map((item) => item.quantity), 1);

  return (
    <section className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${darkMode ? "border-white/10 bg-[#151321]/90" : "border-white bg-white/90"}`} id="top-products">
      <div>
        <h2 className={`text-base font-black ${darkMode ? "text-white" : "text-gray-900"}`}>محصولات پرفروش</h2>
        <p className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>بر اساس اقلام سفارش‌های واقعی</p>
      </div>
      {topProducts.length === 0 ? (
        <p className={`mt-6 rounded-xl py-6 text-center text-xs ${darkMode ? "bg-white/5 text-gray-400" : "bg-gray-50 text-gray-500"}`}>پس از ثبت سفارش، محصولات پرفروش نمایش داده می‌شوند.</p>
      ) : (
        <ol className="mt-5 grid gap-4">
          {topProducts.map(({ product, quantity }, index) => (
            <li className="flex items-center gap-3" key={product.id}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-lg text-xs font-black ${darkMode ? "bg-white/5 text-gray-300" : "bg-purple-50 text-purple-700"}`}>{(index + 1).toLocaleString("fa-IR")}</span>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`truncate text-xs font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{product.name}</span>
                  <span className={`shrink-0 text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{quantity.toLocaleString("fa-IR")} عدد</span>
                </div>
                <div className={`h-1.5 overflow-hidden rounded-full ${darkMode ? "bg-white/10" : "bg-gray-100"}`}>
                  <div className="h-full rounded-full bg-purple-500" style={{ width: `${(quantity / maxQuantity) * 100}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
