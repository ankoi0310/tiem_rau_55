'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '@/app/auth/actions';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMsg('');
    const result = await login(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
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

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 text-center">
              {errorMsg}
            </div>
          )}

          {/* Form Body */}
          <form action={handleLoginSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
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
                  name="password"
                  required
                  placeholder="••••••••"
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
                  <span>Đăng nhập qua Email</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-slate-100 after:h-px after:flex-1 after:bg-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Hoặc
            </span>
          </div>

          {/* Google Login Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleGoogleLogin}
            className="bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-semibold text-xs py-3.5 rounded-2xl w-full flex items-center justify-center gap-3 transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Tiếp tục với Google</span>
          </motion.button>

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
