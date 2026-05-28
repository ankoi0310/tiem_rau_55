'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronRight, Leaf, ShieldCheck, Truck, Sparkles, ArrowUpRight, Flame, Heart } from 'lucide-react';
import { products, CATEGORIES, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });

  // Filter products based on category
  const filteredProducts = selectedCategory === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.category === selectedCategory).slice(0, 8);

  // Mock promo countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Leaf className="text-emerald-500" size={24} />,
      title: '100% Canh Tác Hữu Cơ',
      desc: 'Nông sản đạt chuẩn USDA, VietGAP, tuyệt đối không dùng chất bảo quản độc hại.'
    },
    {
      icon: <Truck className="text-emerald-500" size={24} />,
      title: 'Giao Hỏa Tốc 2H',
      desc: 'Vận chuyển chuỗi lạnh giữ trọn vẹn vị tươi mát tự nhiên từ vườn đến gian bếp.'
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      title: 'Tuyệt Đối An Toàn',
      desc: 'Truy xuất nguồn gốc minh bạch rõ ràng trên từng bọc rau xanh, củ quả.'
    }
  ];

  return (
    <div className="organic-pattern pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 lg:py-24">
        {/* Abstract shapes & glows */}
        <div className="absolute top-0 right-0 w-1/2 h-[90%] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles size={12} className="fill-emerald-500" />
                <span>Nông sản Đà Lạt tươi mới mỗi ngày</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-800 leading-[1.1] tracking-tight">
                Dinh Dưỡng <span className="text-emerald-500 relative">Tươi Sạch</span> <br />
                Cho Sức Khỏe Vàng
              </h1>

              <p className="text-base text-slate-500 mt-6 leading-relaxed">
                Chúng tôi kết nối nông trại Đà Lạt đến trực tiếp mâm cơm gia đình bạn. Từng cọng rau hữu cơ được thu hoạch sớm, đóng gói tiêu chuẩn cao nhằm giữ trọn độ thanh mát dồi dào.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/products"
                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/10 flex items-center gap-2 transition-all duration-200"
                >
                  <ShoppingBag size={18} />
                  <span>Mua Sắm Ngay</span>
                </Link>
                <Link
                  href="#why-choose-us"
                  className="bg-white hover:bg-slate-50 border border-slate-100 px-8 py-4 rounded-2xl font-semibold text-slate-700 flex items-center gap-1.5 transition-all duration-200 shadow-sm"
                >
                  <span>Khám phá tiêu chuẩn</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-slate-100">
                <div>
                  <div className="font-display font-extrabold text-2xl text-slate-800">100%</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Canh tác hữu cơ</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-slate-800">5,000+</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Khách hàng yêu thích</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-slate-800">2 Giờ</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Giao hàng hỏa tốc</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Banner Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 lg:max-w-xl lg:ml-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
                alt="Tiệm Rau 55 premium food store banner"
                className="w-full h-full object-cover"
              />
              {/* Glass floating card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 glass-card rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Đặc sản tuần này</span>
                  <h4 className="font-display font-bold text-slate-800 text-sm mt-0.5">Nho Mẫu Đơn Shine Muscat giảm 15%</h4>
                </div>
                <Link
                  href="/products/8"
                  className="w-10 h-10 rounded-xl badge-fresh flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Feature Section */}
      <section id="why-choose-us" className="py-16 bg-white relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-16">
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Giá Trị Cốt Lõi</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight mt-2">
              Tại sao hàng ngàn bà nội trợ tin chọn Tiệm Rau 55?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-emerald-50/20 hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="font-display font-bold text-base text-slate-800 mt-6">{feat.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Filter Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Mua theo danh mục</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight mt-2">
              Sản phẩm hữu cơ mới về hôm nay
            </h2>
          </div>

          {/* Categories Pill Container */}
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'text-white'
                    : 'bg-white hover:bg-slate-50 border border-slate-100 text-slate-600 hover:text-emerald-500'
                }`}
              >
                {selectedCategory === cat.id && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full badge-fresh"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Animations */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
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

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="group bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-500/20 text-slate-700 hover:text-emerald-600 font-semibold px-8 py-3.5 rounded-2xl flex items-center gap-2 shadow-sm transition-all duration-300"
          >
            <span>Xem Tất Cả Sản Phẩm</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 4. Promotion Countdown Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-slate-900 rounded-[2.5rem] text-white p-8 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Promo Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                <Flame size={10} className="fill-amber-400" />
                <span>Giới Hạn Hôm Nay</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-[1.2]">
                Siêu Khuyến Mãi <br />
                Đồng Giá 39K Tất Cả Gia Vị
              </h2>

              <p className="text-slate-400 text-sm mt-4 max-w-md leading-relaxed">
                Nâng tầm hương vị bữa cơm gia đình với các gia vị hữu cơ cao cấp nhập khẩu từ Đơn Dương, Tây Nguyên và các đặc sản vùng miền nổi tiếng.
              </p>

              {/* Countdown Clock */}
              <div className="flex items-center gap-3 mt-8">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center font-display font-extrabold text-lg text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase mt-1.5">Giờ</span>
                </div>
                <span className="font-display font-bold text-slate-600">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center font-display font-extrabold text-lg text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase mt-1.5">Phút</span>
                </div>
                <span className="font-display font-bold text-slate-600">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center font-display font-extrabold text-lg text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase mt-1.5">Giây</span>
                </div>
              </div>

              {/* Promo Button */}
              <div className="mt-10">
                <Link
                  href="/products?category=spices"
                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-sm px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-200 inline-block"
                >
                  Mua Ngay Ưu Đãi
                </Link>
              </div>
            </div>

            {/* Promo Right Column Visual */}
            <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-slate-800 lg:max-w-md lg:ml-auto">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600"
                alt="High quality spices layout"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-white font-display font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-md uppercase tracking-wider">
                Đồng Giá 39K
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
