import React from 'react';
import { getProducts } from '@/lib/data-service';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const products = await getProducts();
  
  return <HomeClient products={products} />;
}
