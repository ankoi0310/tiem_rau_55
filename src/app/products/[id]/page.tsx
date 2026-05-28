import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    id: p.id,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  // Filter 4 related products of the same category, excluding the active one
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
