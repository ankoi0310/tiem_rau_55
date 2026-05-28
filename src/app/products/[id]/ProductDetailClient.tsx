'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { Star, ShieldCheck, Leaf, ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatVND } from '@/lib/format';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'shipping'>('desc');

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const incrementQuantity = () => {
    if (product.stockStatus === 'in_stock' || quantity < product.stockCount) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const isLowStock = product.stockStatus === 'low_stock';
  const isOutOfStock = product.stockStatus === 'out_of_stock';

  const tabs = [
    { id: 'desc', label: 'Chi tiết sản phẩm' },
    { id: 'nutrition', label: 'Giá trị dinh dưỡng' },
    { id: 'shipping', label: 'Giao hàng & Bảo quản' },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="text-xs text-slate-400 font-medium mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-500 transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-emerald-500 transition-colors">
          Sản phẩm
        </Link>
        <span>/</span>
        <span className="text-slate-600 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main product view sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: Dynamic Carousel Frame */}
        <div className="flex flex-col gap-4">
          {/* Main Visual Window */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
            {/* Status indicators */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white/95 text-emerald-600 font-sans font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-full shadow-sm">
                <Leaf size={10} className="fill-emerald-600" />
                <span>{product.certifications[0]}</span>
              </div>
            )}

            {isOutOfStock ? (
              <div className="absolute inset-0 bg-slate-900/60 z-10 flex items-center justify-center">
                <span className="bg-white text-slate-800 font-display font-extrabold text-sm uppercase tracking-wider px-6 py-3 rounded-2xl shadow-lg">
                  Hết hàng
                </span>
              </div>
            ) : isLowStock ? (
              <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white font-sans font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                Chỉ còn {product.stockCount} {product.unit.split(' ')[0]}
              </div>
            ) : null}

            {/* Main active image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={product.images[activeImageIndex]}
                alt={`${product.name} active display`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Chevron step buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-700 hover:text-emerald-500 flex items-center justify-center shadow-md transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-700 hover:text-emerald-500 flex items-center justify-center shadow-md transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Thumbnail preview slider */}
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`aspect-square rounded-2xl overflow-hidden bg-slate-50 border-2 transition-all relative ${
                  activeImageIndex === idx
                    ? 'border-emerald-500 shadow-sm scale-95'
                    : 'border-transparent hover:border-slate-200'
                }`}
              >
                <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                {activeImageIndex === idx && (
                  <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detailed Specifications */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-sans font-bold text-[10px] uppercase tracking-widest rounded-full">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                <span className="text-xs text-slate-400 font-medium">({product.reviewsCount} đánh giá)</span>
              </div>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-4 mt-6">
              <span className="font-display font-extrabold text-3xl text-emerald-600 tracking-tight">
                {formatVND(product.price)}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ {product.unit}</span>
            </div>

            {/* Short summary list */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="font-bold text-slate-400 w-24">Xuất xứ:</span>
                <span>{product.origin}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="font-bold text-slate-400 w-24">Khối lượng:</span>
                <span>{product.weight}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="font-bold text-slate-400 w-24">Chứng chỉ:</span>
                <span className="flex flex-wrap gap-1.5">
                  {product.certifications.map((cert) => (
                    <span key={cert} className="bg-slate-100 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {cert}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-6 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Action Row: Counter + Add To Cart */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
            {!isOutOfStock ? (
              <>
                {/* Quantity adjuster */}
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1.5 w-full sm:w-fit justify-between">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 rounded-xl bg-white hover:text-emerald-500 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-display font-extrabold text-slate-800 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 rounded-xl bg-white hover:text-emerald-500 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-sm px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 grow w-full transition-all duration-200"
                >
                  <ShoppingCart size={16} />
                  <span>Thêm vào giỏ hàng</span>
                </motion.button>
              </>
            ) : (
              <div className="w-full text-center bg-slate-100 text-slate-500 font-semibold py-4 rounded-2xl text-xs">
                Sản phẩm tạm thời hết hàng. Vui lòng quay lại sau!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs sheet: Description, Nutrition, Shipping */}
      <div className="mb-20">
        <div className="flex border-b border-slate-100 mb-8 relative">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors duration-200 ${
                activeTab === t.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {activeTab === t.id && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab display viewport */}
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm text-xs leading-relaxed text-slate-600">
          <AnimatePresence mode="wait">
            {activeTab === 'desc' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="font-display font-bold text-slate-800 text-sm">Mô tả sản phẩm</h3>
                <p className="leading-relaxed">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-emerald-50/50 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">Cam kết chất lượng</h4>
                      <p className="text-[10px] text-slate-500 mt-1">Đổi trả miễn phí trong vòng 24 giờ nếu có bất kỳ lỗi hư hỏng hoặc dập nát nào trong quá trình vận chuyển.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-2xl flex items-start gap-3">
                    <Leaf className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">Tiêu chuẩn canh tác</h4>
                      <p className="text-[10px] text-slate-500 mt-1">Trồng hữu cơ nghiêm ngặt, nguồn nước tưới tinh khiết từ hồ Suối Vàng, đảm bảo lành tính tuyệt đối.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-display font-bold text-slate-800 text-sm mb-4">Hàm lượng dinh dưỡng chi tiết</h3>
                <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-100">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                      <th className="px-6 py-4">Thành phần</th>
                      <th className="px-6 py-4">Hàm lượng / Chỉ số</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">Calo (Năng lượng)</td>
                      <td className="px-6 py-4">{product.nutritionalFacts.calories}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">Chất xơ tự nhiên</td>
                      <td className="px-6 py-4">{product.nutritionalFacts.fiber}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">Vitamin & Khoáng chất</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.nutritionalFacts.vitamins.map((vit) => (
                            <span key={vit} className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px]">
                              {vit}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="font-display font-bold text-slate-800 text-sm">Chính sách giao nhận & bảo quản</h3>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Truck className="text-emerald-500 shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">Chuỗi cung ứng bảo quản lạnh</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Sản phẩm được xếp gọn trong xe tải lạnh chuyên nghiệp suốt chặng đường từ Đà Lạt về tổng kho. Ngay khi giao đi, bọc rau được chứa trong thùng đá khô để đảm bảo lá rau không bị héo úa hoặc mất nước dưới nắng nóng.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mt-4 text-[11px] text-slate-500">
                  <p>• <strong>Giao hàng trong 2 giờ:</strong> Áp dụng cho các đơn hàng nội thành Đà Lạt & TP.HCM.</p>
                  <p>• <strong>Bảo quản tại nhà:</strong> Nên cho rau vào túi zip đục lỗ và trữ trong ngăn mát tủ lạnh (nhiệt độ 4 - 8°C). Rửa sạch trước khi ăn.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products Row */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight mb-8">
            Có thể bạn cũng thích
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
