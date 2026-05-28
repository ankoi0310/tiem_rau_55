'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, CATEGORIES, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { SlidersHorizontal, Search, RotateCcw, X, Info, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ProductsContent() {
  const searchParams = useSearchParams();
  
  // Extract initial parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // State managers
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState<number>(600000); // 600,000 max
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Sync state if searchParams change externally (e.g. from navbar redirects)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // 2. Search Query Filter
    if (
      searchQuery.trim() &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    // 3. Price Filter
    if (product.price > priceRange) {
      return false;
    }
    // 4. Stock status filter
    if (onlyInStock && product.stockStatus === 'out_of_stock') {
      return false;
    }
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // default
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(600000);
    setOnlyInStock(false);
    setSortBy('default');
  };

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-tr from-emerald-50 to-teal-50/30 rounded-3xl p-8 lg:p-12 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-emerald-600 text-xs font-extrabold uppercase tracking-widest flex items-center gap-1 mb-1">
            <LayoutGrid size={12} /> Cửa hàng
          </span>
          <h1 className="font-display font-extrabold text-3xl text-slate-800 tracking-tight">
            Khám phá Cửa Hàng
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-lg">
            Nông sản thu hoạch sớm, gia vị thảo mộc thiên nhiên canh tác bền vững. Thưởng thức độ thanh ngọt tươi mọng tinh khiết.
          </p>
        </div>
        <div className="absolute right-[-40px] top-[-40px] w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. Search & Filter Bar Controls */}
      <div className="flex flex-col lg:flex-row items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search Field */}
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-organic w-full pr-10 pl-10 text-xs py-2.5"
          />
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-emerald-500"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3 w-full lg:w-auto lg:ml-auto">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-organic text-xs py-2 bg-white cursor-pointer grow lg:grow-0"
          >
            <option value="default">Mặc định (Mới nhất)</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating">Đánh giá tốt nhất</option>
          </select>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-600 font-semibold text-xs py-3 rounded-xl transition-all"
        >
          <SlidersHorizontal size={14} />
          <span>Bộ lọc & Tiêu chí</span>
        </button>
      </div>

      {/* 3. Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2">
              <SlidersHorizontal size={14} /> Bộ Lọc Tìm Kiếm
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              title="Đặt lại bộ lọc"
            >
              <RotateCcw size={10} /> Đặt lại
            </button>
          </div>

          {/* Categories Filter Block */}
          <div>
            <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-wider mb-4">Danh mục</h4>
            <div className="flex flex-col space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-50 text-emerald-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-500'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter Block */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-wider">Giá tối đa</h4>
              <span className="text-xs font-bold text-emerald-600">{formatVND(priceRange)}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="600000"
              step="10000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-medium">
              <span>{formatVND(20000)}</span>
              <span>{formatVND(600000)}</span>
            </div>
          </div>

          {/* Stock Filter Block */}
          <div>
            <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-wider mb-4">Trạng thái</h4>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500/20 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-500 transition-colors">
                Chỉ hiển thị sản phẩm còn hàng
              </span>
            </label>
          </div>
        </aside>

        {/* Product Cards Workspace */}
        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400 mb-4">
                <Info size={24} />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base">Không tìm thấy sản phẩm</h3>
              <p className="text-xs text-slate-400 mt-2">
                Không tìm thấy nông sản nào khớp với bộ lọc hiện tại của bạn. Vui lòng đặt lại hoặc thử các cụm từ khác nhé!
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all"
              >
                Đặt Lại Tất Cả Bộ Lọc
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* 4. Mobile Drawer Filters Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />

            {/* Content Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-full z-50 bg-white shadow-2xl p-6 flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2">
                  <SlidersHorizontal size={14} /> Bộ Lọc Tìm Kiếm
                </h3>
                <button
                  onClick={() => {
                    resetFilters();
                    setShowMobileFilters(false);
                  }}
                  className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"
                >
                  <RotateCcw size={10} /> Đặt lại
                </button>
              </div>

              {/* Category selector */}
              <div className="my-6">
                <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-wider mb-4">Danh mục</h4>
                <div className="flex flex-col space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowMobileFilters(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-50 text-emerald-600 font-bold'
                          : 'text-slate-600'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range selector */}
              <div className="my-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-wider">Giá tối đa</h4>
                  <span className="text-xs font-bold text-emerald-600">{formatVND(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="600000"
                  step="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Stock status checkbox */}
              <div className="my-6">
                <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-wider mb-4">Trạng thái</h4>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500/20 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-600">Chỉ hiển thị sản phẩm còn hàng</span>
                </label>
              </div>

              {/* Show results button */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-auto bg-emerald-500 text-white font-semibold text-xs py-3 rounded-xl shadow-md w-full"
              >
                Áp Dụng Bộ Lọc
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        Đang tải dữ liệu cửa hàng...
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
