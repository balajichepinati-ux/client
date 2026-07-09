'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Three.js canvas dynamically to prevent SSR errors
const NetworkCanvas = dynamic(() => import('@/components/canvas/NetworkCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-dark animate-pulse" />,
});

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark text-white pt-24"
    >
      {/* 3D WebGL Canvas Background */}
      <NetworkCanvas />

      {/* Aurora mesh gradients */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-royal/20 glow-orb animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-accent-cyan/15 glow-orb animate-pulse-slow" style={{ animationDelay: '3s' }} />
        {/* Soft bottom fade to blend with next section */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-bg-dark to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-20">
        {/* Left Side: Typography & CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-royal/30 bg-primary-royal/10 text-accent-cyan text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
            ISO 9001:2015 Certified IT Partner
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-outfit font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 mb-6 drop-shadow-sm"
          >
            ZERO ERROR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-royal via-primary-electric to-accent-cyan">
              IT SOLUTIONS
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="font-outfit text-xl md:text-2xl font-semibold text-slate-200 tracking-wide mb-4"
          >
            Innovative IT Solutions for Modern Businesses
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-inter text-base md:text-lg text-slate-400 max-w-xl leading-relaxed mb-8"
          >
            We supply, install, and support high-quality IT infrastructure for corporate, enterprise, and government agencies. From data centers to surveillance networks, we deliver zero-compromise solutions.
          </motion.p>

          {/* Feature Bullets */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-lg"
          >
            {[
              'Enterprise-Grade Hardware',
              'Advanced CCTV & Security',
              'End-to-End Network Setup',
              '24/7 Dedicated Support',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="text-sm font-medium font-inter">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-extrabold text-white overflow-hidden group shadow-[0_10px_25px_rgba(21,101,255,0.35)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-royal to-primary-electric transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-primary-royal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Get Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, '#services')}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 font-bold text-slate-200 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Virtual space for WebGL rendering overlay */}
        <div className="lg:col-span-5 h-[350px] lg:h-[500px] pointer-events-none relative select-none hidden lg:block">
          {/* Subtle tech border box that highlights the floating 3D canvas objects */}
          <div className="absolute inset-0 border border-white/5 rounded-3xl bg-gradient-to-tr from-white/[0.01] to-white/[0.03] backdrop-blur-[2px]">
            {/* Corner crosshairs */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20" />
            
            {/* Dynamic details overlay */}
            <div className="absolute bottom-6 left-6 font-mono text-[10px] text-slate-500 flex flex-col gap-1">
              <span>SYS_REF: ZE-SECURE_V4</span>
              <span>RENDER: WEBGL_REALTIME_NODE_GRID</span>
              <span>LATENCY: &lt;2.4MS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Down Chevron Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-bounce">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-inter">Scroll down</span>
        <ChevronDown className="w-5 h-5 text-slate-400" />
      </div>
    </section>
  );
}
