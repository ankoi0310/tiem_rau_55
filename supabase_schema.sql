-- ==========================================
-- TỐI ƯU CƠ SỞ DỮ LIỆU & KHÓA QUAN HỆ
-- Dự án: Tiệm Rau 55
-- ==========================================

-- 1. Bảng Categories (Danh mục sản phẩm)
-- Tách riêng danh mục để chuẩn hóa dữ liệu, dễ dàng thêm/sửa danh mục sau này
CREATE TABLE categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Thêm dữ liệu mặc định cho Categories
INSERT INTO categories (id, name) VALUES 
  ('greens', 'Rau hữu cơ'),
  ('fruits', 'Trái cây cao cấp'),
  ('spices', 'Gia vị & thảo mộc');


-- 2. Bảng Products (Sản phẩm)
-- Sử dụng dấu ngoặc kép ("") để giữ nguyên định dạng camelCase giống với Interface của Frontend
CREATE TABLE products (
  id text PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE, -- Đảm bảo không có 2 sản phẩm trùng đường dẫn
  
  -- KHÓA NGOẠI (Foreign Key) liên kết với bảng categories
  category_id text NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  category_name text NOT NULL, -- (Denormalized) Giữ lại để Frontend không bị lỗi hiển thị
  
  price numeric NOT NULL CHECK (price >= 0),
  unit text NOT NULL,
  rating numeric NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count integer NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  
  -- Enum constraint cho trạng thái kho
  stock_status text NOT NULL CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock')),
  stock_count integer NOT NULL DEFAULT 0 CHECK (stock_count >= 0),
  
  images text[] NOT NULL DEFAULT '{}',
  short_description text NOT NULL,
  description text NOT NULL,
  
  -- JSONB cho dữ liệu linh hoạt (Nutritional Facts)
  nutritional_facts jsonb NOT NULL DEFAULT '{}'::jsonb,
  
  origin text NOT NULL,
  certifications text[] NOT NULL DEFAULT '{}',
  weight text NOT NULL,
  
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- INDEXES (Chỉ mục tối ưu hóa tốc độ truy vấn)
-- ==========================================

-- Tối ưu hóa tìm kiếm sản phẩm theo Category (rất hay dùng khi lọc)
CREATE INDEX idx_products_category ON products(category_id);

-- Tối ưu hóa tìm kiếm sản phẩm theo tên hoặc mô tả
CREATE INDEX idx_products_name_search ON products USING gin(to_tsvector('simple', name));

-- Tối ưu hóa truy xuất theo trạng thái tồn kho (để ẩn/hiện sản phẩm hết hàng)
CREATE INDEX idx_products_stock_status ON products(stock_status);

-- Tối ưu hóa truy xuất sản phẩm mới nhất
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- ==========================================
-- RLS (Row Level Security) - Bảo mật dữ liệu
-- ==========================================

-- Bật RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Cho phép TẤT CẢ MỌI NGƯỜI (ẩn danh) ĐỌC danh mục
CREATE POLICY "Cho phép đọc danh mục công khai" ON categories
  FOR SELECT USING (true);

-- Policy: Cho phép TẤT CẢ MỌI NGƯỜI (ẩn danh) ĐỌC sản phẩm
CREATE POLICY "Cho phép đọc sản phẩm công khai" ON products
  FOR SELECT USING (true);

-- Policy: (Tùy chọn) Chỉ Admin (authenticated) mới được Thêm/Sửa/Xóa sản phẩm
CREATE POLICY "Chỉ Admin được chỉnh sửa sản phẩm" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Chỉ Admin được chỉnh sửa danh mục" ON categories
  FOR ALL USING (auth.role() = 'authenticated');
