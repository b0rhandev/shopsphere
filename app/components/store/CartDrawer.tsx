"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { getProductHref } from "../../data/products";
import { useShopContext } from "../../context/ShopContext";

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m18 6-12 12M6 6l12 12" />
    </svg>
  );
}

export default function CartDrawer() {
  const { products, cartItems, cartCount, isCartDrawerOpen, closeCartDrawer, setCartQuantity, removeFromCart, placeOrder } = useShopContext();
  const entries = Object.entries(cartItems).flatMap(([productId, quantity]) => {
    const product = products.find((item) => item.id === productId);
    return product ? [{ product, quantity }] : [];
  });
  const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);

  useEffect(() => {
    if (!isCartDrawerOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeCartDrawer();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end" dir="rtl">
      <button aria-label="بستن سبد خرید" className="absolute inset-0 cursor-pointer bg-gray-950/40 backdrop-blur-[2px]" onClick={closeCartDrawer} type="button" />
      <aside aria-labelledby="cart-drawer-title" aria-modal="true" className="relative flex h-full w-full max-w-md flex-col border-l border-gray-100 bg-white shadow-2xl" role="dialog">
        <header className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
          <div>
            <p className="text-xs font-semibold text-purple-700">خریدت را کامل کن</p>
            <h2 className="mt-1 text-xl font-black text-gray-950" id="cart-drawer-title">سبد خرید</h2>
          </div>
          <button aria-label="بستن پنل سبد خرید" className="grid size-10 place-items-center rounded-full bg-gray-50 text-gray-500 transition hover:bg-purple-50 hover:text-purple-700" onClick={closeCartDrawer} type="button">
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {entries.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-2xl bg-purple-50 text-purple-700">
                <svg aria-hidden="true" className="size-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" />
                  <circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" />
                </svg>
              </span>
              <h3 className="mt-4 font-bold text-gray-900">سبد خریدت هنوز خالی است</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">محصولات موردعلاقه‌ات را پیدا کن و همین‌جا ببین.</p>
              <button className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700" onClick={closeCartDrawer} type="button">
                ادامه خرید
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
              {entries.map(({ product, quantity }) => (
                <article className="flex gap-3 rounded-2xl border border-gray-100 p-3" key={product.id}>
                  <Link aria-label={`جزئیات ${product.name}`} className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-purple-50" href={getProductHref(product.id)} onClick={closeCartDrawer}>
                    <Image alt={product.imageAlt} className="object-contain p-2" fill sizes="80px" src={product.image} unoptimized />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-purple-600">{product.category}</p>
                        <Link className="mt-1 line-clamp-2 text-sm font-bold text-gray-900 hover:text-purple-700" href={getProductHref(product.id)} onClick={closeCartDrawer}>{product.name}</Link>
                      </div>
                      <button aria-label={`حذف ${product.name}`} className="text-xs text-gray-400 transition hover:text-rose-600" onClick={() => removeFromCart(product.id)} type="button">حذف</button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button aria-label={`افزایش تعداد ${product.name}`} className="grid size-7 place-items-center text-purple-700" onClick={() => setCartQuantity(product.id, quantity + 1)} type="button">+</button>
                        <span className="min-w-6 text-center text-xs font-bold">{quantity.toLocaleString("fa-IR")}</span>
                        <button aria-label={`کاهش تعداد ${product.name}`} className="grid size-7 place-items-center text-purple-700" onClick={() => setCartQuantity(product.id, quantity - 1)} type="button">−</button>
                      </div>
                      <span className="text-xs font-black text-purple-800">{(product.price * quantity).toLocaleString("fa-IR")} تومان</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {entries.length > 0 && (
          <footer className="border-t border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{cartCount.toLocaleString("fa-IR")} قلم محصول</span>
              <span className="text-lg font-black text-gray-950">{total.toLocaleString("fa-IR")} تومان</span>
            </div>
            <button className="mt-4 w-full rounded-xl bg-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md" onClick={() => placeOrder()} type="button">
              ثبت نهایی سفارش
            </button>
            <Link className="mt-3 block text-center text-xs font-semibold text-purple-700 hover:text-purple-900" href="/cart" onClick={closeCartDrawer}>
              مشاهده سبد و ادامه فرایند خرید
            </Link>
            <p className="mt-3 text-center text-[10px] leading-5 text-gray-400">ثبت سفارش در این نسخه به‌صورت محلی در مرورگر ذخیره می‌شود.</p>
          </footer>
        )}
      </aside>
    </div>
  );
}
