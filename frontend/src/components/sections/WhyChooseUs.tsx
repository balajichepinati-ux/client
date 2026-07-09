'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Banknote, ShieldAlert, Cpu, HeartHandshake, CheckCircle } from 'lucide-react';

interface ReasonItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const reasons: ReasonItem[] = [
  {
    title: 'High-Quality IT Products',
    description: 'We procure hardware only from authorized OEM lines ensuring original builds, valid local warranties, and certified performance.',
    icon: Cpu,
    color: 'text-primary-electric bg-primary-royal/5 dark:bg-primary-royal/10 border-primary-royal/20',
  },
  {
    title: 'Competitive Pricing',
    description: 'Direct corporate ties with technology partners allow us to provide institutional discounts and highly optimized project quotes.',
    icon: Banknote,
    color: 'text-accent-green bg-accent-green/5 dark:bg-accent-green/10 border-accent-green/20',
  },
  {
    title: 'Fast Delivery & Setup',
    description: 'Active logistics networks across India and local dispatch channels ensure lightning-fast shipping times and timely installations.',
    icon: Truck,
    color: 'text-accent-orange bg-accent-orange/5 dark:bg-accent-orange/10 border-accent-orange/20',
  },
  {
    title: 'Professional Support',
    description: 'Our engineers are OEM certified (Cisco CCNA, Microsoft MCSE, ITIL) to provide complex diagnostic and configuration support.',
    icon: ShieldCheck,
    color: 'text-accent-cyan bg-accent-cyan/5 dark:bg-accent-cyan/10 border-accent-cyan/20',
  },
  {
    title: 'Customized IT Solutions',
    description: 'We do not sell cookie-cutter packages. Every active network, storage node, and server layout is custom-drawn for your workflow.',
    icon: HeartHandshake,
    color: 'text-accent-violet bg-accent-violet/5 dark:bg-accent-violet/10 border-accent-violet/20',
  },
  {
    title: 'Enterprise Security',
    description: 'We follow security-by-design. All active nodes, CCTV networks, and OS systems are audited for vulnerabilities prior to handover.',
    icon: ShieldAlert,
    color: 'text-rose-500 bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/20',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="relative py-24 bg-slate-50 dark:bg-bg-dark border-t border-b border-black/[0.03] dark:border-white/[0.03] transition-colors"
    >
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-100">
        <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-primary-royal/5 dark:bg-primary-royal/8 glow-orb" />
        <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-accent-cyan/5 dark:bg-accent-cyan/8 glow-orb" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Highlight Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-royal/20 bg-primary-royal/5 dark:bg-primary-royal/10 text-primary-royal dark:text-accent-cyan text-xs font-bold uppercase tracking-wider mb-4">
              Why Partner With Us
            </div>
            
            <h2 className="font-outfit text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Engineering Trust, Delivering Excellence
            </h2>
            
            <p className="font-inter text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              At **ZERO ERROR IT SOLUTIONS**, our name is our pledge. We combine top-tier technical skills with a customer-first approach to provide reliable, enterprise-grade technology services.
            </p>

            {/* Glowing Brand Card */}
            <div className="relative w-full p-8 rounded-3xl border border-primary-royal/20 bg-white/70 dark:bg-primary-royal/10 backdrop-blur-md shadow-xl overflow-hidden group">
              {/* Animated hover glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-royal/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-royal/10 dark:bg-accent-cyan/15 flex items-center justify-center text-primary-royal dark:text-accent-cyan font-bold">
                    ZE
                  </div>
                  <span className="font-outfit font-extrabold text-lg tracking-wide text-slate-800 dark:text-white">
                    Our Core Promise
                  </span>
                </div>
                
                <p className="font-inter text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  We verify every system design and complete comprehensive diagnostics prior to commissioning, ensuring a smooth, hassle-free transition.
                </p>

                <div className="flex flex-col gap-3">
                  {[
                    '100% Original OEM Products Only',
                    'Comprehensive Post-Install SLA Support',
                    'Zero-Tolerance Quality Auditing Framework',
                  ].map((promise, index) => (
                    <div key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-accent-green shrink-0 animate-pulse" />
                      <span className="text-xs font-semibold font-inter">{promise}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Grid list of reasons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, idx) => {
              const IconComponent = reason.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-start shadow-sm"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${reason.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-outfit text-lg font-bold text-slate-800 dark:text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
