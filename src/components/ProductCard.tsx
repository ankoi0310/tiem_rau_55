'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Leaf } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { formatVND } from '@/lib/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const isLowStock = product.stockStatus === 'low_stock';
  const isOutOfStock = product.stockStatus === 'out_of_stock';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col h-full"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 shrink-0">
        {/* Certification badge */}
        {product.certifications && product.certifications.length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-emerald-600 shadow-sm backdrop-blur-md">
            <Leaf size={10} className="fill-emerald-600" />
            {product.certifications[0]}
          </div>
        )}

        {/* Stock status badges */}
        {isOutOfStock ? (
          <div className="absolute inset-0 bg-slate-900/60 z-10 flex items-center justify-center">
            <span className="bg-white/95 text-slate-800 font-display font-extrabold text-xs tracking-wider uppercase px-4 py-2 rounded-xl shadow-md">
              Hết hàng
            </span>
          </div>
        ) : isLowStock ? (
          <div className="absolute top-4 right-4 z-10 bg-amber-500/90 text-white font-sans font-bold text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-full shadow-sm">
            Chỉ còn {product.stockCount}
          </div>
        ) : null}

        {/* Image link */}
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          {/* Using normal HTML img to guarantee absolute rendering without configuring Next.js domain arrays */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Product Info Block */}
      <div className="p-5 flex flex-col grow justify-between">
        <div>
          {/* Category name & rating row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-600">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="block group/title">
            <h3 className="font-display font-bold text-base text-slate-800 line-clamp-1 group-hover/title:text-emerald-600 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price and Add button Row */}
        <div className="flex items-center justify-between gap-4 mt-5 pt-3 border-t border-slate-100/80">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-0.5">{product.unit}</div>
            <div className="font-display font-extrabold text-base text-slate-800 tracking-tight">
              {formatVND(product.price)}
            </div>
          </div>

          {/* Quick Add Button */}
          {!isOutOfStock && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              title="Thêm nhanh vào giỏ"
            >
              <ShoppingCart size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
