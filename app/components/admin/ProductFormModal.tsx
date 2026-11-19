"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { imageAssets, type ProductImageKey } from "../../data/images";
import type { Product } from "../../data/products";
import type { ProductInput } from "../../context/ShopContext";

const imageKeys = Object.keys(imageAssets) as ProductImageKey[];

function parseLocalizedNumber(value: string) {
  const normalized = value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[,\s]/g, "");
  return Number(normalized);
}

export default function ProductFormModal({
  product,
  onClose,
  onSave,
}: {
  product?: Product;
  onClose: () => void;
  onSave: (input: ProductInput) => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [price, setPrice] = useState(product?.price.toString() ?? "");
  const [discount, setDiscount] = useState(product?.discount.toString() ?? "0");
  const [imageKey, setImageKey] = useState<ProductImageKey>(product?.imageKey ?? "mobile");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericPrice = parseLocalizedNumber(price);
    const numericDiscount = parseLocalizedNumber(discount);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0 || !Number.isInteger(numericDiscount) || numericDiscount < 0 || numericDiscount > 99) {
      setError("قیمت باید بیشتر از صفر و تخفیف بین صفر تا ۹۹ درصد باشد.");
      return;
    }
    onSave({
      name: name.trim(),
      category: category.trim(),
      price: numericPrice,
      discount: numericDiscount,
      imageKey,
      imageAlt: name.trim(),
      description: product?.description ?? "محصولی باکیفیت از فروشگاه ShopSphere.",
    });
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-[#0c0a14]/55 p-4 backdrop-blur-sm" dir="rtl">
      <button aria-label="بستن فرم محصول" className="fixed inset-0" onClick={onClose} type="button" />
      <form aria-labelledby="product-form-title" aria-modal="true" className="relative z-10 my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/80 bg-white p-5 shadow-2xl sm:p-7 dark:border-purple-500/20 dark:bg-[#151124]" onSubmit={submit} role="dialog">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-purple-700 dark:text-violet-300">کاتالوگ فروشگاه</p>
            <h2 className="mt-1 text-xl font-black text-gray-950 dark:text-violet-50" id="product-form-title">{product ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>
          </div>
          <button aria-label="بستن فرم" className="grid size-9 place-items-center rounded-full bg-gray-50 text-gray-500 hover:bg-purple-50 dark:bg-[#201a35] dark:text-violet-200" onClick={onClose} type="button">
            <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24"><path d="m18 6-12 12M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-xs font-bold text-gray-700 dark:text-violet-100">نام محصول
            <input className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-purple-500/20 dark:bg-[#0c0a14]" onChange={(event) => setName(event.target.value)} required value={name} />
          </label>
          <label className="grid gap-2 text-xs font-bold text-gray-700 dark:text-violet-100">دسته‌بندی
            <input className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-purple-500/20 dark:bg-[#0c0a14]" onChange={(event) => setCategory(event.target.value)} required value={category} />
          </label>
          <label className="grid gap-2 text-xs font-bold text-gray-700 dark:text-violet-100">قیمت نهایی (تومان)
            <input className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-purple-500/20 dark:bg-[#0c0a14]" inputMode="numeric" onChange={(event) => setPrice(event.target.value)} required value={price} />
          </label>
          <label className="grid gap-2 text-xs font-bold text-gray-700 dark:text-violet-100">تخفیف (درصد)
            <input className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-purple-500/20 dark:bg-[#0c0a14]" inputMode="numeric" max="99" min="0" onChange={(event) => setDiscount(event.target.value)} required value={discount} />
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="text-xs font-bold text-gray-700 dark:text-violet-100">تصویر محلی محصول</legend>
          <div className="mt-3 grid max-h-44 grid-cols-5 gap-2 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-2 sm:grid-cols-7 dark:border-purple-500/20 dark:bg-[#0c0a14]">
            {imageKeys.map((key) => (
              <button aria-label={`انتخاب تصویر ${key}`} aria-pressed={imageKey === key} className={`relative aspect-square overflow-hidden rounded-lg bg-white transition ${imageKey === key ? "ring-2 ring-purple-600 ring-offset-2 ring-offset-white dark:ring-offset-[#0c0a14]" : "opacity-75 hover:opacity-100"}`} key={key} onClick={() => setImageKey(key)} type="button">
                <Image alt="" className="object-contain p-1" fill sizes="64px" src={imageAssets[key]} unoptimized />
              </button>
            ))}
          </div>
        </fieldset>
        {error && <p aria-live="polite" className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 dark:border-purple-500/20 dark:text-violet-200" onClick={onClose} type="button">انصراف</button>
          <button className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700" type="submit">{product ? "ذخیره تغییرات" : "ثبت محصول"}</button>
        </div>
      </form>
    </div>
  );
}
