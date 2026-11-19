"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { getProductHref } from "../../data/products";
import { StoreHeaderBar } from "./StoreActions";
import { useStore } from "./StoreProvider";
import type { ShopOrder } from "../../context/ShopContext";

function EmptyCollection({ favorites }: { favorites: boolean }) {
  return (
    <div className="rounded-3xl border border-dashed border-purple-200 bg-white px-6 py-14 text-center shadow-sm">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-purple-50 text-purple-700">
        <svg aria-hidden="true" className="size-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
          {favorites
            ? <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 8.8 1.5Z" />
            : <><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" /><circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>}
        </svg>
      </span>
      <h2 className="mt-4 text-xl font-black text-gray-900">{favorites ? "هنوز محصولی ذخیره نکرده‌اید" : "سبد خرید شما خالی است"}</h2>
      <p className="mt-2 text-sm text-gray-500">{favorites ? "محصولات موردعلاقه‌تان را با دکمه قلب اینجا نگه دارید." : "محصول دلخواهتان را پیدا کنید و به سبد خرید اضافه کنید."}</p>
      <Link className="mt-6 inline-flex rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700" href="/#offers">
        دیدن محصولات
      </Link>
    </div>
  );
}

function QuantityControl({ productId, quantity }: { productId: string; quantity: number }) {
  const { setCartQuantity } = useStore();

  return (
    <div aria-label="تغییر تعداد محصول" className="flex items-center rounded-xl border border-gray-200">
      <button aria-label="افزایش تعداد" className="grid size-9 place-items-center text-lg text-purple-700 hover:bg-purple-50" onClick={() => setCartQuantity(productId, quantity + 1)} type="button">+</button>
      <span className="min-w-8 text-center text-sm font-bold" aria-live="polite">{quantity.toLocaleString("fa-IR")}</span>
      <button aria-label="کاهش تعداد" className="grid size-9 place-items-center text-lg text-purple-700 hover:bg-purple-50" onClick={() => setCartQuantity(productId, quantity - 1)} type="button">−</button>
    </div>
  );
}

function CartLine({ productId, quantity }: { productId: string; quantity: number }) {
  const { products, removeFromCart } = useStore();
  const product = products.find((item) => item.id === productId);

  if (!product) return null;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <Link className="relative size-28 shrink-0 self-center overflow-hidden rounded-xl bg-purple-50 sm:self-auto" href={getProductHref(product.id)}>
        <Image alt={product.imageAlt} className="object-contain p-2" fill sizes="112px" src={product.image} unoptimized />
      </Link>
      <div className="min-w-0 flex-1 text-center sm:text-right">
        <p className="text-xs font-semibold text-purple-600">{product.category}</p>
        <Link className="mt-1 inline-block font-bold text-gray-900 hover:text-purple-700" href={getProductHref(product.id)}>{product.name}</Link>
        <p className="mt-2 text-sm font-black text-purple-800">{product.price.toLocaleString("fa-IR")} تومان</p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <QuantityControl productId={product.id} quantity={quantity} />
        <button className="text-xs font-semibold text-rose-600 hover:text-rose-700" onClick={() => removeFromCart(product.id)} type="button">حذف از سبد</button>
      </div>
    </article>
  );
}

type CheckoutStep = "cart" | "details" | "complete";

function CheckoutProgress({ step }: { step: CheckoutStep }) {
  const activeStep = step === "cart" ? 0 : step === "details" ? 1 : 2;
  const labels = ["سبد خرید", "اطلاعات ارسال", "تأیید نهایی"];

  return (
    <ol aria-label="مراحل ثبت سفارش" className="mb-6 grid grid-cols-3 gap-2">
      {labels.map((label, index) => (
        <li className={`flex items-center gap-2 border-b-2 pb-3 text-xs font-bold sm:text-sm ${index <= activeStep ? "border-purple-600 text-purple-700" : "border-gray-200 text-gray-400"}`} key={label}>
          <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs ${index <= activeStep ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-500"}`}>
            {index < activeStep ? "✓" : (index + 1).toLocaleString("fa-IR")}
          </span>
          {label}
        </li>
      ))}
    </ol>
  );
}

function CheckoutForm({
  total,
  itemCount,
  onBack,
  onComplete,
}: {
  total: number;
  itemCount: number;
  onBack: () => void;
  onComplete: (customerName: string) => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onComplete(String(formData.get("name") ?? ""));
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
      <form className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7" onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="text-xs font-bold text-purple-700">یک قدم تا خرید</p>
          <h2 className="mt-2 text-xl font-black text-gray-900">اطلاعات تحویل سفارش</h2>
          <p className="mt-2 text-sm text-gray-500">برای تحویل دقیق و سریع، اطلاعات زیر را وارد کنید.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-gray-700" htmlFor="checkout-name">
            نام و نام خانوادگی *
            <input autoComplete="name" className="rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100" id="checkout-name" name="name" placeholder="مثلاً سارا محمدی" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-gray-700" htmlFor="checkout-phone">
            شماره موبایل *
            <input autoComplete="tel" className="rounded-xl border border-gray-200 px-4 py-3 text-left font-normal outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100" dir="ltr" id="checkout-phone" inputMode="tel" maxLength={15} minLength={10} name="phone" placeholder="09123456789" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-gray-700 sm:col-span-2" htmlFor="checkout-address">
            نشانی کامل *
            <textarea autoComplete="street-address" className="min-h-24 resize-y rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100" id="checkout-address" name="address" placeholder="استان، شهر، خیابان، کوچه و پلاک" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-gray-700" htmlFor="checkout-postal">
            کد پستی *
            <input autoComplete="postal-code" className="rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100" id="checkout-postal" inputMode="numeric" name="postalCode" pattern="[۰-۹0-9]{10}" placeholder="کد پستی ۱۰ رقمی" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-gray-700" htmlFor="checkout-delivery">
            زمان ارسال
            <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-normal outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100" defaultValue="standard" id="checkout-delivery" name="delivery">
              <option value="standard">ارسال استاندارد رایگان</option>
              <option value="express">ارسال سریع</option>
            </select>
          </label>
        </div>
        <fieldset className="mt-6">
          <legend className="text-sm font-bold text-gray-800">روش پرداخت</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-purple-200 bg-purple-50/60 p-4">
              <input className="accent-purple-600" defaultChecked name="payment" type="radio" value="online" />
              <span><span className="block text-sm font-bold text-gray-800">پرداخت آنلاین</span><span className="mt-1 block text-xs text-gray-500">پرداخت امن با درگاه بانکی</span></span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-purple-200">
              <input className="accent-purple-600" name="payment" type="radio" value="delivery" />
              <span><span className="block text-sm font-bold text-gray-800">پرداخت هنگام تحویل</span><span className="mt-1 block text-xs text-gray-500">پس از دریافت سفارش</span></span>
            </label>
          </div>
        </fieldset>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:border-purple-200 hover:text-purple-700" onClick={onBack} type="button">
            بازگشت به سبد
          </button>
          <button className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md" type="submit">
            ثبت نهایی سفارش
          </button>
        </div>
        <p className="mt-4 text-xs leading-6 text-gray-400">پرداخت بانکی در این نسخه شبیه‌سازی می‌شود؛ سفارش شما در پنل مدیریت ثبت خواهد شد.</p>
      </form>

      <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-gray-900">مرور سفارش</h2>
        <p className="mt-2 text-xs text-gray-500">{itemCount.toLocaleString("fa-IR")} قلم محصول در سبد خرید شماست.</p>
        <div className="my-5 border-t border-gray-100" />
        <div className="flex justify-between text-sm text-gray-600"><span>مجموع محصولات</span><span>{total.toLocaleString("fa-IR")} تومان</span></div>
        <div className="mt-3 flex justify-between text-sm text-gray-600"><span>ارسال</span><span className="font-semibold text-emerald-700">رایگان</span></div>
        <div className="my-5 border-t border-gray-100" />
        <div className="flex justify-between font-black text-gray-900"><span>مبلغ کل</span><span className="text-purple-800">{total.toLocaleString("fa-IR")} تومان</span></div>
      </aside>
    </div>
  );
}

function CheckoutComplete({ order }: { order: ShopOrder }) {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
        <svg aria-hidden="true" className="size-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="m5 12 4 4L19 6" />
        </svg>
      </span>
      <p className="mt-5 text-xs font-bold text-emerald-700">همه‌چیز آماده است</p>
      <h2 className="mt-2 text-2xl font-black text-gray-950">سفارش شما با موفقیت ثبت شد</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">جزئیات سفارش در پنل مدیریت فروشگاه ذخیره شده است.</p>
      <div className="mx-auto mt-6 w-fit rounded-xl bg-gray-50 px-5 py-3 text-sm">
        <span className="text-gray-500">شماره سفارش: </span>
        <strong className="font-bold text-gray-800" dir="ltr">{order.id}</strong>
        <span className="mt-2 block text-xs text-gray-500">{order.timeLabel}</span>
      </div>
      <Link className="mt-7 inline-flex rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700" href="/">
        بازگشت به فروشگاه
      </Link>
    </section>
  );
}

function CartContent() {
  const { cartItems, products, placeOrder } = useStore();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [order, setOrder] = useState<ShopOrder | null>(null);
  const entries = useMemo(
    () => Object.entries(cartItems).filter(([productId]) => products.some((product) => product.id === productId)),
    [cartItems, products],
  );
  const total = entries.reduce((sum, [productId, quantity]) => {
    const product = products.find((item) => item.id === productId);
    return sum + (product?.price ?? 0) * quantity;
  }, 0);

  if (step === "complete" && order) return <CheckoutComplete order={order} />;
  if (entries.length === 0) return <EmptyCollection favorites={false} />;

  const itemCount = entries.reduce((count, [, quantity]) => count + quantity, 0);

  if (step === "details") {
    return (
      <>
        <CheckoutProgress step={step} />
        <CheckoutForm
          itemCount={itemCount}
          onBack={() => setStep("cart")}
          onComplete={(customerName) => {
            const createdOrder = placeOrder(customerName);
            if (createdOrder) {
              setOrder(createdOrder);
              setStep("complete");
            }
          }}
          total={total}
        />
      </>
    );
  }

  return (
    <>
      <CheckoutProgress step={step} />
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-3">
          {entries.map(([productId, quantity]) => <CartLine key={productId} productId={productId} quantity={quantity} />)}
        </div>
        <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">خلاصه سفارش</h2>
          <div className="mt-5 flex justify-between text-sm text-gray-600">
            <span>مجموع سبد خرید</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className="mt-3 flex justify-between text-sm text-gray-600">
            <span>هزینه ارسال</span>
            <span className="font-semibold text-emerald-700">رایگان</span>
          </div>
          <div className="my-5 border-t border-gray-100" />
          <div className="flex justify-between font-black text-gray-900">
            <span>مبلغ قابل پرداخت</span>
            <span className="text-purple-800">{total.toLocaleString("fa-IR")} تومان</span>
          </div>
          <button className="mt-5 w-full rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700" onClick={() => setStep("details")} type="button">
            ادامه فرایند خرید
          </button>
          <p className="mt-3 text-center text-[11px] leading-5 text-gray-500">در مرحله بعد، نشانی و روش پرداخت را انتخاب می‌کنید.</p>
        </aside>
      </div>
    </>
  );
}

function FavoriteLine({ productId }: { productId: string }) {
  const { products, toggleFavorite, addToCart } = useStore();
  const product = products.find((item) => item.id === productId);
  if (!product) return null;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <Link className="relative size-28 shrink-0 self-center overflow-hidden rounded-xl bg-purple-50" href={getProductHref(product.id)}>
        <Image alt={product.imageAlt} className="object-contain p-2" fill sizes="112px" src={product.image} unoptimized />
      </Link>
      <div className="min-w-0 flex-1 text-center sm:text-right">
        <p className="text-xs font-semibold text-purple-600">{product.category}</p>
        <Link className="mt-1 inline-block font-bold text-gray-900 hover:text-purple-700" href={getProductHref(product.id)}>{product.name}</Link>
        <p className="mt-2 text-sm font-black text-purple-800">{product.price.toLocaleString("fa-IR")} تومان</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-purple-700" onClick={() => addToCart(product)} type="button">افزودن به سبد</button>
        <button aria-label={`حذف ${product.name} از علاقه‌مندی‌ها`} className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 transition hover:border-rose-200 hover:text-rose-600" onClick={() => toggleFavorite(product.id)} type="button">حذف</button>
      </div>
    </article>
  );
}

function FavoritesContent() {
  const { favoriteIds, products } = useStore();
  const validFavorites = favoriteIds.filter((id) => products.some((product) => product.id === id));

  if (validFavorites.length === 0) return <EmptyCollection favorites />;

  return <div className="grid gap-3">{validFavorites.map((productId) => <FavoriteLine key={productId} productId={productId} />)}</div>;
}

export function StoreCollectionPage({ favorites = false }: { favorites?: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <StoreHeaderBar title={favorites ? "علاقه‌مندی‌های من" : "سبد خرید من"} />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6">
          <p className="text-xs font-bold text-purple-700">{favorites ? "انتخاب‌های شما" : "آماده برای سفارش"}</p>
          <h1 className="mt-2 text-3xl font-black text-gray-950">{favorites ? "علاقه‌مندی‌های من" : "سبد خرید شما"}</h1>
        </div>
        {favorites ? <FavoritesContent /> : <CartContent />}
      </main>
    </div>
  );
}
