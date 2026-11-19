"use client";

import Image from "next/image";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";
import { getProductHref, type Product } from "../../data/products";

export default function ChatProductMiniCard({ product }: { product: Product }) {
  const { addToCart } = useShopContext();

  return (
    <article className="flex min-w-0 items-center gap-3 rounded-xl border border-purple-100 bg-white p-2.5 shadow-sm">
      <Link aria-label={`جزئیات ${product.name}`} className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-purple-50" href={getProductHref(product.id)}>
        <Image alt={product.imageAlt} className="object-contain p-1.5" fill sizes="64px" src={product.image} unoptimized />
      </Link>
      <div className="min-w-0 flex-1">
        <Link className="line-clamp-1 text-xs font-bold text-gray-800 hover:text-purple-700" href={getProductHref(product.id)}>{product.name}</Link>
        <p className="mt-1 text-[10px] font-black text-purple-800">{product.price.toLocaleString("fa-IR")} تومان</p>
        <button className="mt-2 rounded-lg bg-purple-600 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm transition hover:bg-purple-700" onClick={() => addToCart(product)} type="button">
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  );
}
