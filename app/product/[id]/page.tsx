import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetails } from "../../components/store/ProductDetails";
import { products } from "../../data/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

function findProduct(id: string) {
  return products.find((product) => product.id === id);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) {
    return { title: "محصول پیدا نشد | ShopSphere" };
  }

  return {
    title: `${product.name} | ShopSphere`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
