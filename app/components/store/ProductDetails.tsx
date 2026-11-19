"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../data/products";
import { StoreHeaderBar } from "./StoreActions";
import { useStore } from "./StoreProvider";

function DetailIcon({ type }: { type: "delivery" | "return" | "secure" }) {
  const paths = {
    delivery: <><path d="M3 7h11v11H3z" /><path d="M14 11h4l3 3v4h-7z" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="18" cy="19" r="1.5" /></>,
    return: <><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" /><path d="M3 3v5h5" /></>,
    secure: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  };

  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
      {paths[type]}
    </svg>
  );
}

export function ProductDetails({ product: initialProduct }: { product: Product }) {
  const { products, addToCart, toggleFavorite, isFavorite } = useStore();
  const product = products.find((item) => item.id === initialProduct.id);
  if (!product) {
    return (
      <>
        <StoreHeaderBar title="جزئیات محصول" />
        <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center" dir="rtl">
          <h1 className="text-2xl font-black text-gray-950">این محصول دیگر در فروشگاه موجود نیست.</h1>
          <Link className="mt-5 inline-flex rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white" href="/">بازگشت به فروشگاه</Link>
        </main>
      </>
    );
  }
  const favorite = isFavorite(product.id);

  return (
    <>
      <StoreHeaderBar title="جزئیات محصول" />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10" dir="rtl">
      <nav aria-label="مسیر صفحه" className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link className="transition hover:text-purple-700" href="/">خانه</Link>
        <span aria-hidden="true">/</span>
        <Link className="transition hover:text-purple-700" href="/#offers">محصولات</Link>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-gray-800">{product.name}</span>
      </nav>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-indigo-100 p-6 sm:min-h-[520px] sm:p-10">
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-purple-200/50 blur-3xl" />
          <span className="absolute right-5 top-5 z-10 rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-sm">
            {product.discount.toLocaleString("fa-IR")}٪ تخفیف
          </span>
          <div className="absolute bottom-10 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-[50%] bg-purple-300/40 blur-xl" />
          <Image
            alt={product.imageAlt}
            className="object-contain p-8 drop-shadow-xl transition duration-500 hover:scale-105 sm:p-12"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            src={product.image}
            unoptimized
          />
        </div>

        <div className="flex flex-col justify-center rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <span className="w-fit rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">{product.category}</span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">{product.name}</h1>
          <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">{product.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: "delivery" as const, label: "ارسال سریع", detail: "تحویل در کوتاه‌ترین زمان" },
              { icon: "return" as const, label: "۷ روز ضمانت", detail: "فرصت بررسی و بازگشت" },
              { icon: "secure" as const, label: "خرید مطمئن", detail: "پرداخت امن و پشتیبانی" },
            ].map((item) => (
              <div className="rounded-2xl bg-gray-50 p-3" key={item.label}>
                <span className="grid size-9 place-items-center rounded-xl bg-white text-purple-700 shadow-sm">
                  <DetailIcon type={item.icon} />
                </span>
                <p className="mt-3 text-xs font-bold text-gray-800">{item.label}</p>
                <p className="mt-1 text-[10px] leading-5 text-gray-500">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-gray-100 pt-6">
            <div>
              <p className="text-sm text-gray-400 line-through">{product.oldPrice.toLocaleString("fa-IR")} تومان</p>
              <p className="mt-1 text-2xl font-black text-purple-800">{product.price.toLocaleString("fa-IR")} <span className="text-sm">تومان</span></p>
            </div>
            <span className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">موجود و آماده ارسال</span>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md"
              onClick={() => addToCart(product)}
              type="button"
            >
              <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" />
                <circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" />
              </svg>
              افزودن به سبد خرید
            </button>
            <button
              aria-label={favorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
              aria-pressed={favorite}
              className={`grid size-12 shrink-0 place-items-center rounded-xl border transition-transform duration-200 active:scale-90 ${favorite ? "border-rose-200 bg-rose-50 text-rose-500" : "border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-500"}`}
              onClick={() => toggleFavorite(product.id)}
              type="button"
            >
              <svg aria-hidden="true" className="size-5" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 8.8 1.5Z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-xs font-bold text-purple-700">انتخابی برای روزهای بهتر</p>
        <h2 className="mt-2 text-xl font-black text-gray-900">چرا این محصول را دوست خواهید داشت؟</h2>
        <p className="mt-3 max-w-4xl text-sm leading-8 text-gray-600">
          {product.description} در ShopSphere تلاش می‌کنیم محصولی را پیش روی شما بگذاریم که در کنار ظاهر جذاب، استفاده‌ی روزمره را دلپذیرتر کند. پیش از خرید می‌توانید با خیال راحت جزئیات را بررسی کنید و در صورت نیاز از همراهی تیم پشتیبانی ما استفاده کنید.
        </p>
      </section>
      </main>
    </>
  );
}
