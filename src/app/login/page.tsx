'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // Mock login wait
      setTimeout(() => {
        setIsLoading(false);
        router.push('/');
      }, 1500);
    }
  };

  return (
    <div className="organic-pattern min-h-[75vh] flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-slate-100 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
      >
        {/* Glow shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Form Header */}
          <div className="text-center mb-8">
            <span className="w-9 h-9 rounded-xl badge-fresh flex items-center justify-center font-display font-bold text-lg text-white mx-auto mb-4 shadow-md">
              R
            </span>
            <h2 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight">
              Chào mừng trở lại
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Đăng nhập vào tài khoản Tiệm Rau 55
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-organic w-full pl-10 text-xs py-3"
                />
                <Mail size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Mật khẩu
                </label>
                <a href="#" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-organic w-full pl-10 text-xs py-3"
                />
                <Lock size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            {/* Remember box */}
            <label className="flex items-center gap-2.5 cursor-pointer py-1">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500/20 cursor-pointer"
              />
              <span className="text-[11px] font-medium text-slate-500">
                Ghi nhớ đăng nhập
              </span>
            </label>

            {/* Submit button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-xs py-4 rounded-2xl w-full shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 mt-2 transition-all"
            >
              {isLoading ? (
                <span>Đang đăng nhập...</span>
              ) : (
                <>
                  <LogIn size={14} />
                  <span>Đăng nhập</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Quick redirect footer */}
          <div className="text-center mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-0.5">
              Đăng ký ngay <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
