import React, { Suspense } from 'react';
import { getProducts } from '@/lib/data-service';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        Đang tải danh sách sản phẩm...
      </div>
    }>
      <ProductsClient products={products} />
    </Suspense>
  );
}
