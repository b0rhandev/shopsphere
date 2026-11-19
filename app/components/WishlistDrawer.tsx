"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useShopContext } from "../context/ShopContext";
import { getProductHref } from "../data/products";

export default function WishlistDrawer() {
  const { products, wishlist, isWishlistDrawerOpen, closeWishlistDrawer, toggleWishlist, moveWishlistToCart } = useShopContext();
  const savedProducts = wishlist.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return product ? [product] : [];
  });

  useEffect(() => {
    if (!isWishlistDrawerOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeWishlistDrawer();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isWishlistDrawerOpen, closeWishlistDrawer]);

  if (!isWishlistDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end" dir="rtl">
      <button aria-label="بستن علاقه‌مندی‌ها" className="absolute inset-0 bg-[#0c0a14]/45 backdrop-blur-sm" onClick={closeWishlistDrawer} type="button" />
      <aside aria-labelledby="wishlist-title" aria-modal="true" className="relative flex h-full w-full max-w-md flex-col border-l border-gray-100 bg-white shadow-2xl dark:border-purple-500/20 dark:bg-[#151124]" role="dialog">
        <header className="flex items-center justify-between border-b border-gray-100 px-5 py-5 dark:border-purple-500/20">
          <div>
            <p className="text-xs font-semibold text-purple-700 dark:text-violet-300">انتخاب‌های دوست‌داشتنی</p>
            <h2 className="mt-1 text-xl font-black text-gray-950 dark:text-violet-50" id="wishlist-title">علاقه‌مندی‌های من</h2>
          </div>
          <button aria-label="بستن پنل علاقه‌مندی‌ها" className="grid size-10 place-items-center rounded-full bg-gray-50 text-gray-500 transition hover:bg-purple-50 hover:text-purple-700 dark:bg-[#201a35] dark:text-violet-200" onClick={closeWishlistDrawer} type="button">
            <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m18 6-12 12M6 6l12 12" /></svg>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          {savedProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-300">
                <svg aria-hidden="true" className="size-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 8.8 1.5Z" /></svg>
              </span>
              <h3 className="mt-4 font-bold text-gray-900 dark:text-violet-50">هنوز محصولی ذخیره نشده است</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-violet-200/70">با زدن قلب روی محصولات، آن‌ها را برای بعد نگه دارید.</p>
              <button className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700" onClick={closeWishlistDrawer} type="button">ادامه خرید</button>
            </div>
          ) : (
            <div className="grid gap-3">
              {savedProducts.map((product) => (
                <article className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-purple-500/20 dark:bg-[#1a1630]" key={product.id}>
                  <Link aria-label={`جزئیات ${product.name}`} className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-purple-50 dark:bg-[#201a35]" href={getProductHref(product.id)} onClick={closeWishlistDrawer}>
                    <Image alt={product.imageAlt} className="object-contain p-2" fill sizes="80px" src={product.image} unoptimized />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-purple-600 dark:text-violet-300">{product.category}</p>
                        <Link className="mt-1 line-clamp-2 text-sm font-bold text-gray-900 hover:text-purple-700 dark:text-violet-50" href={getProductHref(product.id)} onClick={closeWishlistDrawer}>{product.name}</Link>
                      </div>
                      <button aria-label={`حذف ${product.name} از علاقه‌مندی‌ها`} className="text-xs text-gray-400 transition hover:text-rose-500" onClick={() => toggleWishlist(product.id)} type="button">حذف</button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-purple-800 dark:text-violet-200">{product.price.toLocaleString("fa-IR")} تومان</span>
                      <button className="rounded-lg bg-purple-600 px-2.5 py-2 text-[10px] font-bold text-white transition hover:bg-purple-700" onClick={() => moveWishlistToCart(product.id)} type="button">انتقال به سبد خرید</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
