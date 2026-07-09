'use client';

import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  PackageOpen,
  Wrench,
  Activity,
  Send,
  HeartHandshake,
} from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We conduct full site audits, analyze active network loads, and document current hardware bottlenecks to understand your goals.',
    icon: Search,
    color: 'text-primary-electric border-primary-royal/20',
    bg: 'bg-primary-royal/5 dark:bg-primary-royal/10',
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Our certified engineers draw up detailed logical network diagrams, storage calculations, and precise project plans.',
    icon: Compass,
    color: 'text-accent-violet border-accent-violet/20',
    bg: 'bg-accent-violet/5 dark:bg-accent-violet/10',
  },
  {
    number: '03',
    title: 'Procurement',
    description: 'We source certified hardware directly from official OEM channels at corporate pricing tiers to secure local warranties.',
    icon: PackageOpen,
    color: 'text-accent-cyan border-accent-cyan/20',
    bg: 'bg-accent-cyan/5 dark:bg-accent-cyan/10',
  },
  {
    number: '04',
    title: 'Installation',
    description: 'Certified professionals lay structured copper/fiber lines, position surveillance camera angles, and mount server racks.',
    icon: Wrench,
    color: 'text-accent-orange border-accent-orange/20',
    bg: 'bg-accent-orange/5 dark:bg-accent-orange/10',
  },
  {
    number: '05',
    title: 'Testing',
    description: 'We perform network packet analysis, security penetration scans, CCTV backup tests, and battery bank diagnostics.',
    icon: Activity,
    color: 'text-rose-500 border-rose-500/20',
    bg: 'bg-rose-500/5 dark:bg-rose-500/10',
  },
  {
    number: '06',
    title: 'Deployment',
    description: 'Your new systems go live under direct supervision. We configure system backups and hand over logins and credentials.',
    icon: Send,
    color: 'text-accent-green border-accent-green/20',
    bg: 'bg-accent-green/5 dark:bg-accent-green/10',
  },
  {
    number: '07',
    title: 'SLA Support',
    description: 'We schedule monthly onsite preventive maintenance cycles and provide priority support response for peace of mind.',
    icon: HeartHandshake,
    color: 'text-blue-500 border-blue-500/20',
    bg: 'bg-blue-500/5 dark:bg-blue-500/10',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-24 bg-slate-50 dark:bg-bg-dark border-t border-b border-black/[0.03] dark:border-white/[0.03] transition-colors"
    >
      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-100">
        <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-primary-royal/5 dark:bg-primary-royal/8 glow-orb" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-accent-cyan/5 dark:bg-accent-cyan/8 glow-orb" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-royal/20 bg-primary-royal/5 dark:bg-primary-royal/10 text-primary-royal dark:text-accent-cyan text-xs font-bold uppercase tracking-wider mb-4"
          >
            How We Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5"
          >
            Our Implementation Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base md:text-lg text-slate-600 dark:text-slate-400"
          >
            From scoping your needs to long-term technical operations, we follow a rigorous 7-step deployment methodology to ensure zero project errors.
          </motion.p>
        </div>

        {/* Process Timeline Card Layout */}
        <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-6 md:ml-12 pl-8 md:pl-16 space-y-12 max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={idx}
                className="relative group bg-white dark:bg-white/[0.01] hover:bg-slate-100 dark:hover:bg-white/[0.03] border border-black/5 dark:border-white/5 p-6 md:p-8 rounded-2xl shadow-sm transition-all duration-300"
              >
                {/* Stepper Timeline Node */}
                <div className={`absolute top-6 left-[-50px] md:left-[-88px] w-9 h-9 md:w-12 md:h-12 rounded-full border-4 border-slate-50 dark:border-bg-dark flex items-center justify-center font-outfit font-extrabold text-xs md:text-base z-10 transition-colors shadow-md ${
                  step.bg
                } ${step.color}`}>
                  {step.number}
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${step.bg} ${step.color}`}>
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>

                  {/* Text details */}
                  <div className="flex-1">
                    <h3 className="font-outfit text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-primary-royal dark:group-hover:text-accent-cyan transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-inter text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
