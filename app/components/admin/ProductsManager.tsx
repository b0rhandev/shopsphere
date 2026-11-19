"use client";

import Image from "next/image";
import { useState } from "react";
import { useShopContext, type ProductInput } from "../../context/ShopContext";
import type { Product } from "../../data/products";
import AdminConfirmDialog from "./AdminConfirmDialog";
import ProductFormModal from "./ProductFormModal";

type ManagerDialog =
  | { type: "form"; product?: Product }
  | { type: "delete"; product: Product }
  | { type: "reset" }
  | null;

export default function ProductsManager() {
  const { products, addProduct, updateProduct, deleteProduct, resetDemoData } = useShopContext();
  const [dialog, setDialog] = useState<ManagerDialog>(null);

  function saveProduct(input: ProductInput) {
    if (dialog?.type !== "form") return;
    if (dialog.product) updateProduct(dialog.product.id, input);
    else addProduct(input);
    setDialog(null);
  }

  function confirmDialog() {
    if (dialog?.type === "delete") deleteProduct(dialog.product.id);
    if (dialog?.type === "reset") resetDemoData();
    setDialog(null);
  }

  return (
    <section className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm sm:p-6 dark:border-purple-500/20 dark:bg-[#151124]/90" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950 dark:text-violet-50">مدیریت محصولات</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-violet-200/70">{products.length.toLocaleString("fa-IR")} محصول در کاتالوگ زنده</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl border border-purple-200 px-3 py-2.5 text-xs font-bold text-purple-700 transition hover:bg-purple-50 dark:border-purple-400/20 dark:text-violet-200 dark:hover:bg-[#211a37]" onClick={() => setDialog({ type: "reset" })} type="button">بازگردانی داده‌های نمونه</button>
          <button className="rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-purple-700" onClick={() => setDialog({ type: "form" })} type="button">
            <svg aria-hidden="true" className="me-1 inline size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
            محصول جدید
          </button>
        </div>
      </div>

      <div className="mt-5 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-right">
          <thead><tr className="border-b border-gray-100 text-[10px] font-bold text-gray-500 dark:border-purple-500/20 dark:text-violet-200/70">
            <th className="pb-3">محصول</th><th className="pb-3">دسته‌بندی</th><th className="pb-3">قیمت قبلی</th><th className="pb-3">قیمت نهایی</th><th className="pb-3">تخفیف</th><th className="pb-3">عملیات</th>
          </tr></thead>
          <tbody>{products.map((product) => (
            <tr className="border-b border-gray-50 last:border-0 dark:border-purple-500/10" key={product.id}>
              <td className="py-3"><div className="flex items-center gap-3"><span className="relative size-11 overflow-hidden rounded-lg bg-purple-50 dark:bg-[#201a35]"><Image alt={product.imageAlt} className="object-contain p-1" fill sizes="44px" src={product.image} unoptimized /></span><span className="text-xs font-bold text-gray-800 dark:text-violet-50">{product.name}</span></div></td>
              <td className="py-3 text-xs text-gray-500 dark:text-violet-200/70">{product.category}</td>
              <td className="py-3 text-xs text-gray-400 line-through">{product.oldPrice.toLocaleString("fa-IR")}</td>
              <td className="py-3 text-xs font-bold text-gray-800 dark:text-violet-50">{product.price.toLocaleString("fa-IR")} تومان</td>
              <td className="py-3"><span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">{product.discount.toLocaleString("fa-IR")}٪</span></td>
              <td className="py-3"><div className="flex gap-2">
                <button aria-label={`ویرایش ${product.name}`} className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[10px] font-bold text-purple-700 hover:bg-purple-50 dark:border-purple-500/20 dark:text-violet-200" onClick={() => setDialog({ type: "form", product })} type="button">ویرایش</button>
                <button aria-label={`حذف ${product.name}`} className="rounded-lg border border-rose-100 px-2.5 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:text-rose-300" onClick={() => setDialog({ type: "delete", product })} type="button">حذف</button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {products.map((product) => (
          <article className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-purple-500/20" key={product.id}>
            <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-purple-50 dark:bg-[#201a35]"><Image alt={product.imageAlt} className="object-contain p-1" fill sizes="56px" src={product.image} unoptimized /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-gray-800 dark:text-violet-50">{product.name}</p>
              <p className="mt-1 text-[10px] text-gray-500 dark:text-violet-200/70">{product.category}</p>
              <p className="mt-1 text-[10px] text-gray-400">
                <span className="line-through">{product.oldPrice.toLocaleString("fa-IR")}</span>
                <span className="ms-2 font-bold text-gray-800 dark:text-violet-50">{product.price.toLocaleString("fa-IR")} تومان</span>
              </p>
              <p className="mt-1 text-[10px] font-semibold text-rose-600 dark:text-rose-300">{product.discount.toLocaleString("fa-IR")}٪ تخفیف</p>
            </div>
            <div className="grid shrink-0 gap-1">
              <button aria-label={`ویرایش ${product.name}`} className="px-2 py-1 text-[10px] font-bold text-purple-700 dark:text-violet-200" onClick={() => setDialog({ type: "form", product })} type="button">ویرایش</button>
              <button aria-label={`حذف ${product.name}`} className="px-2 py-1 text-[10px] font-bold text-rose-600 dark:text-rose-300" onClick={() => setDialog({ type: "delete", product })} type="button">حذف</button>
            </div>
          </article>
        ))}
      </div>

      {dialog?.type === "form" && <ProductFormModal onClose={() => setDialog(null)} onSave={saveProduct} product={dialog.product} />}
      {dialog?.type === "delete" && <AdminConfirmDialog confirmLabel="حذف محصول" description={`«${dialog.product.name}» از فروشگاه حذف می‌شود. سفارش‌های ثبت‌شده قبلی حفظ خواهند شد.`} onCancel={() => setDialog(null)} onConfirm={confirmDialog} title="حذف این محصول؟" />}
      {dialog?.type === "reset" && <AdminConfirmDialog confirmLabel="بازگردانی داده‌ها" description="فهرست محصولات به نمونه‌های اولیه برمی‌گردد و سبد خرید، علاقه‌مندی‌ها و سفارش‌های ذخیره‌شده پاک می‌شوند." onCancel={() => setDialog(null)} onConfirm={confirmDialog} title="بازگردانی داده‌های نمونه؟" />}
    </section>
  );
}
