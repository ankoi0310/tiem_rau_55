import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { mockProducts } from '@/data/products';

export async function POST() {
  try {
    const supabase = await createClient();

    // Check if user is authenticated and is an admin (optional for safety)
    // For local development, we will just allow the seed if no products exist or just append

    const snakeCaseProducts = mockProducts.map(p => ({
      name: p.name,
      slug: p.slug,
      category_id: p.category, // map category to category_id
      category_name: p.categoryName,
      price: p.price,
      unit: p.unit,
      rating: p.rating,
      reviews_count: p.reviewsCount,
      stock_status: p.stockStatus,
      stock_count: p.stockCount,
      images: p.images,
      short_description: p.shortDescription,
      description: p.description,
      nutritional_facts: p.nutritionalFacts,
      origin: p.origin,
      certifications: p.certifications,
      weight: p.weight,
    }));

    const { error } = await supabase
      .from('products')
      .upsert(snakeCaseProducts); // Assuming `products` table accepts upserts on `id`

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Seeded products successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
