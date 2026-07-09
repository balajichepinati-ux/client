'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Menu, X, Sun, Moon, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.includes('#')) {
      const hash = href.substring(href.indexOf('#'));
      if (pathname === '/') {
        e.preventDefault();
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-white/75 dark:bg-bg-dark/75 backdrop-blur-xl shadow-lg border-b border-black/[0.05] dark:border-white/[0.05]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleScrollTo(e, '/#home')}
          className="flex items-center gap-2 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-royal to-accent-cyan flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(21,101,255,0.4)]">
            <Cpu className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-extrabold text-lg leading-tight tracking-wider text-primary-navy dark:text-white group-hover:text-primary-royal dark:group-hover:text-accent-cyan transition-colors">
              ZERO ERROR
            </span>
            <span className="font-inter text-[10px] font-semibold tracking-widest text-slate-500 dark:text-slate-400">
              IT SOLUTIONS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative py-2 text-sm font-semibold tracking-wide font-inter transition-colors group ${
                    pathname === item.href
                      ? 'text-primary-royal dark:text-accent-cyan font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-royal dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-royal to-accent-cyan transition-all duration-300 rounded-full ${
                    pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-slate-100/50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Request Quote Button */}
          <Link
            href="/#contact"
            onClick={(e) => handleScrollTo(e, '/#contact')}
            className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden group shadow-[0_4px_15px_rgba(21,101,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-royal to-primary-electric transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-primary-royal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">Request Quote</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-black/5 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.02] text-slate-700 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-black/5 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.02] text-slate-700 dark:text-slate-300"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full max-h-[80vh] overflow-y-auto bg-white dark:bg-bg-dark border-b border-black/[0.05] dark:border-white/[0.05]"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={`block py-3 text-base font-semibold border-b border-slate-50 dark:border-white/[0.02] transition-colors ${
                      pathname === item.href
                        ? 'text-primary-royal dark:text-accent-cyan font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-primary-royal dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 flex flex-col gap-3">
                <Link
                  href="/#contact"
                  onClick={(e) => handleScrollTo(e, '/#contact')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-royal to-primary-electric text-center text-sm font-bold text-white shadow-md shadow-primary-royal/20"
                >
                  Request Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
