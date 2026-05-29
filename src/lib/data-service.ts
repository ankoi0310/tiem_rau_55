import { createClient } from '@/utils/supabase/server'

/**
 * Lấy danh sách sản phẩm từ bảng `products` trong Supabase
 */
export async function getProducts() {
  const supabase = await createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error.message)
    return []
  }

  return products
}

/**
 * Lấy chi tiết một sản phẩm theo ID
 */
export async function getProductById(id: string) {
  const supabase = await createClient()
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching product ${id}:`, error.message)
    return null
  }

  return product
}

/**
 * Lấy thông tin user profile hiện tại
 */
export async function getUserProfile() {
  const supabase = await createClient()
  
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
