'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatVND } from '@/lib/format';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Shipping Fee Logic: Free shipping over 300,000 VND, otherwise 30,000 VND
  const shippingFee = cartTotal >= 300000 || cartTotal === 0 ? 0 : 30000;
  const grandTotal = cartTotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    // Mock API delay
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatePresence mode="wait">
        {checkoutSuccess ? (
          /* Checkout Success Overlay Screens */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto text-center bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl my-10"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Thành công
            </span>
            <h2 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight mt-4">
              Đặt hàng thành công!
            </h2>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Mã đơn hàng của bạn là <strong>#TR55-98746</strong>. Đội ngũ giao hàng lạnh tốc hành đang chuẩn bị đóng gói rau sạch và sẽ giao tới địa chỉ của bạn trong tối đa 2 giờ tới.
            </p>
            <div className="mt-8 space-y-3">
              <Link
                href="/products"
                className="block bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-xs py-3.5 rounded-2xl shadow-md transition-all duration-200"
              >
                Tiếp tục mua sắm
              </Link>
              <Link
                href="/"
                className="block bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs py-3.5 rounded-2xl transition-all duration-200"
              >
                Về trang chủ
              </Link>
            </div>
          </motion.div>
        ) : cart.length === 0 ? (
          /* Empty Cart Screen */
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={24} />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-base">Giỏ hàng của bạn đang trống</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
              Hãy lấp đầy giỏ hàng của bạn bằng những cọng rau hữu cơ tươi mát và củ quả mọng nước Đà Lạt nhé!
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-8 py-3.5 rounded-2xl shadow-md transition-all duration-200"
            >
              <ArrowLeft size={14} />
              <span>Quay lại mua sắm</span>
            </Link>
          </motion.div>
        ) : (
          /* Active Cart Workspace */
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Left Col: Items List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h1 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight flex items-center gap-3">
                  <ShoppingBag size={22} className="text-emerald-500" /> Giỏ hàng của bạn
                </h1>
                <Link
                  href="/products"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Tiếp tục mua sắm
                </Link>
              </div>

              {/* Items grid loop */}
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <motion.div
                    layout
                    key={item.product.id}
                    className="py-6 flex gap-4 sm:gap-6 items-center justify-between"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 sm:w-20 aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="grow min-w-0">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        {item.product.categoryName}
                      </span>
                      <Link href={`/products/${item.product.id}`} className="block">
                        <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 truncate hover:text-emerald-600 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">{item.product.unit}</p>

                      {/* Small mobile quantity row */}
                      <div className="flex items-center gap-3 mt-3 sm:hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-display font-bold text-xs text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Desktop adjustments / pricing */}
                    <div className="hidden sm:flex items-center gap-6 shrink-0">
                      <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 justify-between">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-white hover:text-emerald-500 flex items-center justify-center text-slate-600 shadow-sm"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-display font-extrabold text-slate-800 text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white hover:text-emerald-500 flex items-center justify-center text-slate-600 shadow-sm"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="w-24 text-right font-display font-extrabold text-slate-800 text-sm">
                        {formatVND(item.product.price * item.quantity)}
                      </div>
                    </div>

                    {/* Delete item button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all duration-200 shrink-0"
                      title="Xoá khỏi giỏ"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Col: Checkout Summaries */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-sm">
                <h3 className="font-display font-bold text-slate-800 text-base mb-6 pb-4 border-b border-slate-100">
                  Tóm tắt đơn hàng
                </h3>

                {/* Subtotal columns */}
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between text-slate-400 font-medium">
                    <span>Tạm tính ({cart.reduce((c, i) => c + i.quantity, 0)} sản phẩm)</span>
                    <span className="font-display font-bold text-slate-700">{formatVND(cartTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 font-medium">
                    <span>Phí vận chuyển (Xe lạnh)</span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-500 font-bold uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                        Miễn phí
                      </span>
                    ) : (
                      <span className="font-display font-bold text-slate-700">{formatVND(shippingFee)}</span>
                    )}
                  </div>

                  {/* Free shipping progress indicator */}
                  {cartTotal < 300000 && (
                    <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-500/10 text-[10px] text-slate-500 mt-2 leading-relaxed">
                      <span className="flex items-center gap-1 font-bold text-emerald-600 mb-1">
                        <Sparkles size={10} className="fill-emerald-500" />
                        Gợi ý mua thêm
                      </span>
                      Mua thêm <strong>{formatVND(300000 - cartTotal)}</strong> để được <strong>miễn phí vận chuyển</strong>.
                    </div>
                  )}

                  {/* Grand total row */}
                  <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between text-slate-800">
                    <span className="text-sm font-bold">Tổng thanh toán</span>
                    <span className="font-display font-extrabold text-2xl text-emerald-600 tracking-tight">
                      {formatVND(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Checkout forms */}
                <form onSubmit={handleCheckoutSubmit} className="mt-8 space-y-4">
                  <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-wider mb-2">Thông tin giao nhận</h4>
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên người nhận..."
                    className="input-organic w-full text-xs"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại liên hệ..."
                    className="input-organic w-full text-xs"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Địa chỉ nhận hàng chi tiết..."
                    className="input-organic w-full text-xs"
                  />

                  {/* Submit checkout buttons */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isCheckingOut}
                    className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-xs py-4 rounded-2xl w-full shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 mt-6 transition-all"
                  >
                    {isCheckingOut ? (
                      <span>Đang xử lý đơn hàng...</span>
                    ) : (
                      <>
                        <span>Xác Nhận Đặt Hàng</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Guarantees checklist */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col gap-4 text-[11px] text-slate-400 leading-relaxed font-medium">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p>Hoàn tiền 100% trong 24h nếu rau củ dập nát, héo úa hoặc hư hỏng sau giao hàng.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Heart size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p>Cam kết đóng bọc 100% bằng túi tự hủy sinh học phân hủy tự nhiên thân thiện môi trường.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
