"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getProductHref, type Product } from "../../data/products";
import { useShopContext } from "../../context/ShopContext";

interface ProductSearchContextValue {
  query: string;
  setQuery: (query: string) => void;
  filteredProducts: Product[];
}

const ProductSearchContext = createContext<ProductSearchContextValue | null>(null);

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("fa")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[\u200c\u0640]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function ProductSearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { products } = useShopContext();
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query);
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      normalizeSearchText(`${product.name} ${product.category} ${product.imageAlt}`).includes(normalizedQuery),
    );
  }, [normalizedQuery, products]);

  return (
    <ProductSearchContext.Provider value={{ query, setQuery, filteredProducts }}>
      {children}
    </ProductSearchContext.Provider>
  );
}

export function useStoreSearch() {
  const context = useContext(ProductSearchContext);

  if (!context) {
    throw new Error("Product search components must be rendered inside ProductSearchProvider.");
  }

  return context;
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShopContext();
  const favorite = isInWishlist(product.id);
  const productHref = getProductHref(product.id);

  return (
    <article className="group rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4">
      <Link aria-label={`مشاهده جزئیات ${product.name}`} className="block" href={productHref}>
        <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-gray-50">
        <Image
          alt={product.imageAlt}
          className="object-contain p-3 transition duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px"
          src={product.image}
          unoptimized
        />
        <span className="absolute right-2 top-2 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white">٪{product.discount}-</span>
        </div>
        <p className="text-[10px] font-semibold text-purple-600">{product.category}</p>
        <h3 className="mt-1 min-h-10 text-sm font-semibold leading-6 text-gray-800">{product.name}</h3>
      </Link>
      <div className="mt-2 flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link aria-label={`مشاهده قیمت و جزئیات ${product.name}`} className="min-w-0" href={productHref}>
          <p className="break-words text-[10px] leading-4 text-gray-400 line-through">{product.oldPrice.toLocaleString("fa-IR")} تومان</p>
          <p className="mt-0.5 break-words text-xs font-bold leading-5 text-purple-800 sm:whitespace-nowrap sm:text-sm">{product.price.toLocaleString("fa-IR")} تومان</p>
        </Link>
        <div className="flex items-center justify-end gap-2">
          <button
            aria-label={favorite ? `حذف ${product.name} از علاقه‌مندی‌ها` : `افزودن ${product.name} به علاقه‌مندی‌ها`}
            aria-pressed={favorite}
            className={`grid size-9 shrink-0 place-items-center rounded-xl transition-transform duration-200 active:scale-90 ${favorite ? "bg-rose-50 text-rose-500" : "bg-gray-50 text-gray-500 hover:bg-rose-50 hover:text-rose-500"}`}
            onClick={() => toggleWishlist(product.id)}
            type="button"
          >
            <svg aria-hidden="true" className="size-4" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 8.8 1.5Z" />
            </svg>
          </button>
          <button aria-label={`افزودن ${product.name} به سبد خرید`} className="grid size-9 shrink-0 place-items-center rounded-xl bg-purple-600 text-white shadow-sm transition hover:bg-purple-700" onClick={() => addToCart(product)} type="button">
          <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
            <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" />
            <circle cx="10" cy="21" r="1" />
            <circle cx="18" cy="21" r="1" />
          </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductResults() {
  const { query, setQuery, filteredProducts } = useStoreSearch();

  return (
    <div aria-live="polite" className="min-w-0">
      {query.trim() && (
        <p className="mb-4 text-sm text-gray-500">
          {filteredProducts.length > 0
            ? `${filteredProducts.length.toLocaleString("fa-IR")} محصول برای «${query.trim()}» پیدا شد`
            : `محصولی برای «${query.trim()}» پیدا نشد`}
        </p>
      )}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-purple-200 bg-purple-50/60 px-5 py-10 text-center">
          <p className="font-bold text-gray-800">نتیجه‌ای پیدا نشد</p>
          <p className="mt-2 text-sm text-gray-500">نام محصول یا دسته‌بندی را کوتاه‌تر یا با املای دیگری جستجو کنید.</p>
          <button className="mt-4 rounded-full bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700" onClick={() => setQuery("")} type="button">
            نمایش همه محصولات
          </button>
        </div>
      )}
    </div>
  );
}
