export interface NutritionalFacts {
  calories: string;
  fiber: string;
  vitamins: string[];
  carb?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'greens' | 'fruits' | 'spices';
  categoryName: string;
  price: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount: number;
  images: string[];
  shortDescription: string;
  description: string;
  nutritionalFacts: NutritionalFacts;
  origin: string;
  certifications: string[];
  weight: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'greens', name: 'Rau hữu cơ' },
  { id: 'fruits', name: 'Trái cây cao cấp' },
  { id: 'spices', name: 'Gia vị & thảo mộc' },
] as const;
