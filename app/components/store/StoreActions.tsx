"use client";

import Link from "next/link";
import { useStore } from "./StoreProvider";

function CounterBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
      {count.toLocaleString("fa-IR")}
    </span>
  );
}

export function StoreActions() {
  const { cartCount, wishlist, openCartDrawer, openWishlistDrawer } = useStore();

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-4">
      <button aria-label={`علاقه‌مندی‌ها، ${wishlist.length} محصول`} className="relative grid size-9 place-items-center rounded-full text-gray-600 transition hover:bg-purple-50 hover:text-purple-700 sm:size-10" onClick={openWishlistDrawer} type="button">
        <svg aria-hidden="true" className={`size-5 transition-transform ${wishlist.length ? "scale-105 text-rose-500" : ""}`} fill={wishlist.length ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 8.8 1.5Z" />
        </svg>
        {wishlist.length > 0 && <CounterBadge count={wishlist.length} />}
      </button>
      <button aria-label={`سبد خرید، ${cartCount} محصول`} className="relative grid size-9 place-items-center rounded-full text-gray-600 transition hover:bg-purple-50 hover:text-purple-700 sm:size-10" onClick={openCartDrawer} type="button">
        <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" />
          <circle cx="10" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </svg>
        <CounterBadge count={cartCount} />
      </button>
    </div>
  );
}

export function StoreHeaderBar({ title }: { title?: string }) {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link aria-label="ShopSphere صفحه اصلی" className="flex items-center gap-2 text-lg font-black text-gray-900" href="/">
          <span className="grid size-9 place-items-center rounded-xl bg-purple-100 text-purple-700">
            <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /><path d="m9 14 2 2 4-4" />
            </svg>
          </span>
          Shop<span className="-ms-2 text-purple-700">Sphere</span>
        </Link>
        {title && <p className="hidden text-sm font-bold text-gray-600 sm:block">{title}</p>}
        <div className="flex items-center gap-2">
          <Link className="rounded-full px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-purple-50 hover:text-purple-700 sm:text-sm" href="/">
            ادامه خرید
          </Link>
          <StoreActions />
        </div>
      </div>
    </header>
  );
}
