'use client';

import { API_URL } from '@/utils/api';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, Mail, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // If already logged in, skip login screen
    const token = localStorage.getItem('adminToken');
    if (token === 'zeroerror_secure_admin_auth_token_2026') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem('adminToken', result.token);
        localStorage.setItem('adminEmail', result.admin.email);
        router.push('/admin/dashboard');
      } else {
        setErrorMessage(result.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      // Fail-soft for offline local testing: allow default credentials if server is not running
      if (email === 'admin@zeroerror.in' && password === 'zeroerror_admin_pass_2026') {
        localStorage.setItem('adminToken', 'zeroerror_secure_admin_auth_token_2026');
        localStorage.setItem('adminEmail', 'admin@zeroerror.in');
        router.push('/admin/dashboard');
      } else {
        setErrorMessage('Could not connect to backend server. Ensure Express is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleMockLogin = () => {
    setLoading(true);
    // Simulate Supabase Google OAuth Redirect Flow
    setTimeout(() => {
      localStorage.setItem('adminToken', 'zeroerror_secure_admin_auth_token_2026');
      localStorage.setItem('adminEmail', 'praveenrajgandham@gmail.com');
      router.push('/admin/dashboard');
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark transition-colors px-6">
      {/* Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-primary-royal/20 rounded-full blur-[90px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-accent-cyan/20 rounded-full blur-[90px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Header brand */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-royal to-accent-cyan flex items-center justify-center shadow-lg shadow-primary-royal/20">
              <Cpu className="w-6 h-6 text-white animate-pulse" />
            </div>
          </Link>
          <div>
            <h1 className="font-outfit text-3xl font-extrabold text-primary-navy dark:text-white mt-4">
              Admin Portal
            </h1>
            <p className="font-inter text-xs text-slate-400 font-semibold tracking-wide uppercase mt-1">
              Zero Error IT Solutions
            </p>
          </div>
        </div>

        {/* Login form Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-xl space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal text-sm"
                  placeholder="admin@zeroerror.in"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Master Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal text-sm"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-royal to-primary-electric text-white text-sm font-bold shadow-md shadow-primary-royal/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-100 dark:border-white/[0.05]"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">or</span>
            <div className="flex-grow border-t border-slate-100 dark:border-white/[0.05]"></div>
          </div>

          {/* Google Login Trigger */}
          <button
            onClick={handleGoogleMockLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white hover:bg-slate-50 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 text-sm font-bold flex items-center justify-center gap-2.5 transition-all"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
