'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
      {/* Absolute decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-linear-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/20 rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles size={12} /> Nhận bí quyết sống xanh
            </span>
            <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
              Đăng ký nhận tin tức & ưu đãi 15%
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Nhận thông tin sản phẩm thu hoạch mới, các ưu đãi đặc quyền và công thức chế biến detox sạch mát mỗi tuần.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:max-w-md flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="w-full text-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <ShieldCheck size={18} /> Đăng ký thành công! Kiểm tra email của bạn nhé.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Nhập địa chỉ email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950/80 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 grow text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
                >
                  Đăng ký
                </button>
              </>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6 group">
              <span className="w-8 h-8 rounded-lg badge-fresh flex items-center justify-center font-display font-bold text-base tracking-wider">
                R
              </span>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                Tiệm<span className="text-emerald-400">Rau</span>55
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Nông sản sạch, thảo mộc hữu cơ chất lượng cao. Tiệm Rau 55 cam kết mang lại nguồn dinh dưỡng tươi sạch trọn vẹn nhất từ trang trại đến trực tiếp gian bếp nhà bạn.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors duration-200">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors duration-200">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/products?category=greens" className="hover:text-emerald-400 transition-colors duration-200">
                  Rau xanh hữu cơ
                </Link>
              </li>
              <li>
                <Link href="/products?category=fruits" className="hover:text-emerald-400 transition-colors duration-200">
                  Trái cây nhập khẩu
                </Link>
              </li>
            </ul>
          </div>

          {/* Support policy */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6">Chính sách & Hỗ trợ</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
                  Chính sách hoàn trả nông sản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
                  Giao hàng hỏa tốc trong 2 giờ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
                  Tiêu chuẩn canh tác VietGAP
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
                  Cẩm nang công thức món chay
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6">Liên hệ trực tiếp</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Số 55, Đường Hoàng Hoa Thám, Phường 10, TP. Đà Lạt, Lâm Đồng</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone size={18} className="text-emerald-400 shrink-0" />
                <a href="tel:0909555555" className="hover:text-emerald-400 transition-colors">
                  0909 555 555
                </a>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail size={18} className="text-emerald-400 shrink-0" />
                <a href="mailto:support@tiemrau55.com" className="hover:text-emerald-400 transition-colors">
                  support@tiemrau55.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Tiệm Rau 55. Mọi quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            Được kiến tạo bằng <Heart size={10} className="text-emerald-500 fill-emerald-500" /> & Nguồn nông sản Việt sạch
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
