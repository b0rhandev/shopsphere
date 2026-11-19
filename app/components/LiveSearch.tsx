"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useShopContext } from "../context/ShopContext";
import { useStoreSearch } from "./home/ProductSearch";

export default function LiveSearch({ className = "" }: { className?: string }) {
  const { query, setQuery, filteredProducts } = useStoreSearch();
  const { products, addToCart } = useShopContext();
  const [isFocused, setIsFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = query.trim();
  const matchingProducts = filteredProducts.slice(0, 6);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setIsFocused(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsFocused(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsFocused(false);
  }

  return (
    <div className={`relative min-w-0 ${className}`} ref={rootRef}>
      <form aria-label="جستجو در محصولات" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-gray-400 shadow-sm transition focus-within:border-purple-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-100 dark:border-purple-500/20 dark:bg-[#151124] dark:focus-within:border-purple-400/40" onSubmit={submitSearch} role="search">
        <svg aria-hidden="true" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
        <input
          aria-label="نام محصول یا دسته‌بندی را وارد کنید"
          aria-autocomplete="list"
          aria-controls="live-search-results"
          aria-expanded={isFocused && Boolean(normalizedQuery)}
          className="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-violet-50"
          onChange={(event) => {
            setQuery(event.target.value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder="جستجو در محصولات..."
          role="combobox"
          type="search"
          value={query}
        />
        {query && <button aria-label="پاک کردن جستجو" className="shrink-0 rounded-full px-1 text-xs text-gray-400 hover:text-purple-700" onClick={() => setQuery("")} type="button">پاک‌کردن</button>}
        <button aria-label="نمایش نتایج جستجو" className="grid size-8 shrink-0 place-items-center rounded-lg bg-purple-600 text-white transition hover:bg-purple-700" type="submit">
          <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
        </button>
      </form>

      {isFocused && normalizedQuery && (
        <div className="absolute inset-x-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-2 shadow-[0_18px_50px_rgba(54,34,91,0.2)] backdrop-blur-xl dark:border-purple-400/20 dark:bg-[#151124]/95">
          <p className="px-3 py-2 text-[10px] font-semibold text-gray-500 dark:text-violet-200/70">
            {filteredProducts.length ? `${filteredProducts.length.toLocaleString("fa-IR")} نتیجه در فروشگاه` : "نتیجه‌ای برای این جستجو پیدا نشد"}
          </p>
          {matchingProducts.length ? (
            <ul className="max-h-80 space-y-1 overflow-y-auto" id="live-search-results" role="listbox">
              {matchingProducts.map((product) => (
                <li className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-purple-50 dark:hover:bg-[#211a37]" key={product.id}>
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-purple-50 dark:bg-[#201a35]">
                    <Image alt={product.imageAlt} className="object-contain p-1" fill sizes="48px" src={product.image} unoptimized />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-gray-800 dark:text-violet-50">{product.name}</span>
                    <span className="mt-1 block text-[10px] font-semibold text-purple-700 dark:text-violet-300">{product.price.toLocaleString("fa-IR")} تومان</span>
                  </span>
                  <span className="rounded-full bg-rose-50 px-2 py-1 text-[9px] font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">{product.discount.toLocaleString("fa-IR")}٪ تخفیف</span>
                  <button aria-label={`افزودن ${product.name} به سبد خرید`} className="rounded-lg bg-purple-600 px-2.5 py-2 text-[10px] font-bold text-white transition hover:bg-purple-700" onClick={() => { addToCart(product); setIsFocused(false); }} type="button">افزودن</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 pb-3 text-xs leading-6 text-gray-500 dark:text-violet-200/70">نام محصول یا دسته‌بندی دیگری را جستجو کنید.</p>
          )}
        </div>
      )}
      <span className="sr-only">{products.length.toLocaleString("fa-IR")} محصول در فروشگاه موجود است.</span>
    </div>
  );
}
