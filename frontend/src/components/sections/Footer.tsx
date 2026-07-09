'use client';

import { useState } from 'react';
import { Cpu, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const response = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
      } else {
        alert(result.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      alert('A network error occurred. Please try again.');
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
        {/* Brand Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-royal to-accent-cyan flex items-center justify-center shadow-md shadow-primary-royal/20">
              <Cpu className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-extrabold text-lg leading-tight tracking-wider text-white group-hover:text-accent-cyan transition-colors">
                ZERO ERROR
              </span>
              <span className="font-inter text-[10px] font-semibold tracking-widest text-slate-500">
                IT SOLUTIONS
              </span>
            </div>
          </a>

          <p className="font-inter text-sm leading-relaxed text-slate-500 max-w-sm">
            Deliver certified, cost-effective, and enterprise-grade hardware, advanced networking designs, safety surveillance grids, and AMC service packages to modern corporate offices.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              {
                label: 'LinkedIn',
                href: '#',
                svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                label: 'Twitter',
                href: '#',
                svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                label: 'Facebook',
                href: '#',
                svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                ),
              },
              {
                label: 'YouTube',
                href: '#',
                svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02-1.782-.48-8.978-.48-8.978-.48s-7.196 0-8.978.48c-.98.272-1.748 1.04-2.02 2.02-.48 1.782-.48 8.978-.48 8.978s0 7.196.48 8.978c.272.98 1.04 1.748 2.02 2.02 1.782.48 8.978.48 8.978.48s7.196 0 8.978-.48c.98-.272 1.748-1.04 2.02-2.02.48-1.782.48-8.978.48-8.978s0-7.196-.48-8.978zm-14.498 11.14v-6.606l6.39 3.303-6.39 3.303z" />
                  </svg>
                ),
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-royal hover:text-white flex items-center justify-center hover:bg-white/[0.08] transition-all"
                aria-label={social.label}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="font-outfit font-extrabold text-sm text-white tracking-widest uppercase mb-2">
            Navigation
          </h4>
          <ul className="space-y-2.5 font-inter text-sm font-semibold">
            {[
              { name: 'Home', href: '#home' },
              { name: 'Products', href: '#products' },
              { name: 'Services', href: '#services' },
              { name: 'Industries', href: '#industries' },
              { name: 'Process', href: '#process' },
              { name: 'About', href: '#about' },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Types Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="font-outfit font-extrabold text-sm text-white tracking-widest uppercase mb-2">
            IT Solutions
          </h4>
          <ul className="space-y-2.5 font-inter text-sm font-semibold text-slate-500">
            <li>
              <a href="#products" onClick={(e) => handleScrollTo(e, '#products')} className="hover:text-slate-300 transition-colors">
                Laptops & Computers
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleScrollTo(e, '#products')} className="hover:text-slate-300 transition-colors">
                Server Stack Racks
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleScrollTo(e, '#products')} className="hover:text-slate-300 transition-colors">
                CCTV Surveillance Units
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleScrollTo(e, '#products')} className="hover:text-slate-300 transition-colors">
                Enterprise Routers & Switches
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-slate-300 transition-colors">
                AMC Support Contracts
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-slate-300 transition-colors">
                Software Licences Sync
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="font-outfit font-extrabold text-sm text-white tracking-widest uppercase mb-2">
            Newsletter
          </h4>
          <p className="font-inter text-xs leading-relaxed text-slate-500 mb-2">
            Receive monthly security alert advisories, hardware upgrade tips, and company updates.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 py-2 text-xs font-bold text-accent-green">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Subscribed Successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative flex">
              <input
                type="email"
                placeholder="Enter corporate email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-primary-royal pr-10"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-primary-royal hover:bg-primary-electric text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Border separator */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-inter text-xs text-slate-600 font-medium">
          © {new Date().getFullYear()} ZERO ERROR IT SOLUTIONS. All rights reserved.
        </span>
        <div className="flex items-center gap-6 font-inter text-xs text-slate-600 font-medium">
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">AMC SLA Terms</a>
        </div>
      </div>
    </footer>
  );
}
