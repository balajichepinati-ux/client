'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  Landmark,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Factory,
  Hotel,
  Scale,
} from 'lucide-react';

interface IndustryItem {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const industries: IndustryItem[] = [
  {
    name: 'Corporate Enterprises',
    description: 'Supplying and configuring corporate offices with high-performance employee laptops, secure servers, meeting room setups, and structured LAN cabling.',
    icon: Building2,
    color: 'group-hover:text-primary-electric border-primary-royal/20',
  },
  {
    name: 'Government Departments',
    description: 'Providing secure network firewalls, high-availability servers, bulk workspace setups, and custom logistics supporting municipal and state administration.',
    icon: Landmark,
    color: 'group-hover:text-accent-violet border-accent-violet/20',
  },
  {
    name: 'Healthcare & Hospitals',
    description: 'Setting up high-speed LAN lines, medical-grade monitor screens, centralized storage for PACS medical images, and secure CCTV monitoring solutions.',
    icon: HeartPulse,
    color: 'group-hover:text-rose-500 border-rose-500/20',
  },
  {
    name: 'Educational Institutions',
    description: 'Structuring computer education labs, smart classroom projectors, campus-wide Wi-Fi access controllers, and school surveillance coverage layouts.',
    icon: GraduationCap,
    color: 'group-hover:text-accent-cyan border-accent-cyan/20',
  },
  {
    name: 'Retail Networks',
    description: 'Supplying POS computers, label printing modules, inventory backend server storage, and high-resolution CCTV security mapping to prevent inventory leakage.',
    icon: ShoppingCart,
    color: 'group-hover:text-accent-green border-accent-green/20',
  },
  {
    name: 'Manufacturing & Industrial',
    description: 'Provisioning rugged industrial computing terminals, wireless network routers, data log storage servers, and IIoT communication cabling solutions.',
    icon: Factory,
    color: 'group-hover:text-accent-orange border-accent-orange/20',
  },
  {
    name: 'Hospitality & Hotels',
    description: 'Configuring guest Wi-Fi captive portals, centralized hotel property server databases, and site-wide surveillance maps for high-density safety.',
    icon: Hotel,
    color: 'group-hover:text-blue-500 border-blue-500/20',
  },
  {
    name: 'Financial Institutions',
    description: 'Implementing double-layer hardware firewalls, secure remote VPN nodes, redundant automatic storage backups, and compliance safety systems.',
    icon: Scale,
    color: 'group-hover:text-emerald-500 border-emerald-500/20',
  },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative py-24 bg-white dark:bg-bg-dark transition-colors"
    >
      {/* Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-100">
        <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-accent-cyan/5 dark:bg-accent-cyan/8 glow-orb" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-primary-royal/5 dark:bg-primary-royal/8 glow-orb" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-royal/20 bg-primary-royal/5 dark:bg-primary-royal/10 text-primary-royal dark:text-accent-cyan text-xs font-bold uppercase tracking-wider mb-4"
          >
            Industries We Serve
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5"
          >
            Tailored Solutions for Every Sector
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base md:text-lg text-slate-600 dark:text-slate-400"
          >
            Technology requirements differ vastly across sectors. We specialize in designing and delivering hardware environments custom-tailored to meet the compliance, performance, and security needs of your specific industry.
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {industries.map((ind, index) => {
            const IconComponent = ind.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={index}
                className="group relative p-7 rounded-2xl border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.03] hover:shadow-[0_20px_45px_-15px_rgba(21,101,255,0.12)] dark:hover:border-primary-royal/20 transition-all duration-400"
              >
                {/* Visual Icon */}
                <div className={`w-12 h-12 rounded-xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-6 group-hover:scale-110 group-hover:bg-primary-royal/5 dark:group-hover:bg-primary-royal/10 transition-all duration-300 shadow-sm ${ind.color}`}>
                  <IconComponent className="w-5.5 h-5.5" />
                </div>

                {/* Name */}
                <h3 className="font-outfit text-lg font-bold text-slate-800 dark:text-white mb-3">
                  {ind.name}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ind.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
