import { createClient } from '@/utils/supabase/server'
import { Product } from '@/data/products'

/**
 * Ánh xạ (Map) dữ liệu từ Supabase (snake_case) sang Frontend Interface (camelCase)
 */
function mapProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category_id, // Map category_id -> category
    categoryName: row.category_name,
    price: row.price,
    unit: row.unit,
    rating: row.rating,
    reviewsCount: row.reviews_count,
    stockStatus: row.stock_status,
    stockCount: row.stock_count,
    images: row.images || [],
    shortDescription: row.short_description,
    description: row.description,
    nutritionalFacts: row.nutritional_facts,
    origin: row.origin,
    certifications: row.certifications || [],
    weight: row.weight,
  };
}

/**
 * Lấy danh sách sản phẩm từ bảng `products` trong Supabase
 */
export async function getProducts(isStaticBuild = false): Promise<Product[]> {
  const supabase = await createClient(isStaticBuild)
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error.message)
    return []
  }

  return (products || []).map(mapProduct)
}

/**
 * Lấy chi tiết một sản phẩm theo ID
 */
export async function getProductById(id: string, isStaticBuild = false): Promise<Product | null> {
  const supabase = await createClient(isStaticBuild)
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching product ${id}:`, error.message)
    return null
  }

  return product ? mapProduct(product) : null
}

/**
 * Lấy thông tin user profile hiện tại
 */
export async function getUserProfile(isStaticBuild = false) {
  const supabase = await createClient(isStaticBuild)
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return null
  }

  return profile
}
