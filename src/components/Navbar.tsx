"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, X, User, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { formatVND } from "@/lib/format";

export const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  // Listen to scrolls to add shadow/opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger pop animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      const start = setTimeout(() => setAnimateCart(true), 0);
      const end = setTimeout(() => setAnimateCart(false), 300);
      return () => {
        clearTimeout(start);
        clearTimeout(end);
      };
    }
  }, [cartCount]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/cart", label: "Giỏ hàng" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-sm py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 shrink-0 group"
            >
              <span className="w-9 h-9 rounded-xl badge-fresh flex items-center justify-center font-display font-bold text-lg tracking-wider">
                R
              </span>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-800">
                Tiệm<span className="text-emerald-500">Rau</span>55
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative py-2 text-sm font-medium tracking-wide transition-colors duration-200"
                  >
                    <span
                      className={
                        isActive
                          ? "text-emerald-600 font-semibold"
                          : "text-slate-600 hover:text-emerald-500"
                      }
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-emerald-500"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Search, Auth, Cart, Mobile Menu */}
            <div className="flex items-center space-x-4 grow md:grow-0 justify-end">
              {/* Desktop Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="hidden lg:flex items-center relative max-w-xs grow"
              >
                <input
                  type="text"
                  placeholder="Tìm rau sạch, trái cây..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-organic w-full pr-10 text-xs py-2 focus:w-64 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-3 text-slate-400 hover:text-emerald-500"
                >
                  <Search size={16} />
                </button>
              </form>

              {/* User Link */}
              <Link
                href="/login"
                className="p-2 text-slate-600 hover:text-emerald-500 hover:bg-emerald-50/50 rounded-full transition-all duration-200"
                title="Tài khoản"
              >
                <User size={20} />
              </Link>

              {/* Cart Toggle */}
              <Link
                href="/cart"
                className="relative p-2 text-slate-600 hover:text-emerald-500 hover:bg-emerald-50/50 rounded-full transition-all duration-200"
                title="Giỏ hàng"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: animateCart ? 1.3 : 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white font-sans font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile Burger Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-emerald-500 hover:bg-emerald-50/50 rounded-full transition-all duration-200"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full z-50 bg-white shadow-2xl p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="font-display font-extrabold text-lg text-slate-800">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-500 hover:text-emerald-500 hover:bg-emerald-50/50 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search form inside drawer */}
              <form onSubmit={handleSearchSubmit} className="my-6 relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-organic w-full pr-10 text-sm py-2.5"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-3 text-slate-400 hover:text-emerald-500"
                >
                  <Search size={16} />
                </button>
              </form>

              {/* Drawer Navigation Links */}
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-50/80 text-emerald-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-emerald-500"
                      }`}
                    >
                      <span className="text-sm font-medium">{link.label}</span>
                      <ArrowRight
                        size={14}
                        className={
                          isActive ? "text-emerald-500" : "text-slate-300"
                        }
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Bottom Promotion */}
              <div className="mt-auto p-4 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-600 text-white relative overflow-hidden shadow-md">
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                    Ưu đãi hôm nay
                  </span>
                  <h4 className="font-display font-bold text-base mt-1">
                    Miễn phí vận chuyển từ {formatVND(300000)}
                  </h4>
                  <p className="text-xs opacity-75 mt-1">
                    Giao hàng nhanh trong 2 giờ tại Đà Lạt & TP.HCM.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center mt-3 text-xs bg-white text-emerald-600 font-semibold px-3 py-1.5 rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Mua ngay
                  </Link>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
