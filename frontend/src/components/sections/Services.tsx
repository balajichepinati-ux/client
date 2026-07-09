'use client';

import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Settings,
  Eye,
  Network,
  FileText,
  HelpCircle,
  Briefcase,
  Users2,
  Check,
} from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  gradient: string;
}

const servicesData: ServiceItem[] = [
  {
    title: 'Corporate IT Procurement',
    description: 'Procuring certified commercial hardware directly from leading OEMs at volume discount rates, handled with warranty protection.',
    icon: ShoppingBag,
    features: ['OEM direct partnerships', 'Volume-tier discounting', 'Asset tagging & logistics', 'DOA warranty returns'],
    gradient: 'from-blue-600/10 to-indigo-600/5',
  },
  {
    title: 'IT Infrastructure Setup',
    description: 'Physical installation, configuration, and structuring of server units, switches, hypervisors, and data backup frameworks.',
    icon: Settings,
    features: ['Server rack positioning', 'Hypervisor configs', 'Active Directory setup', 'SAN/NAS storage arrays'],
    gradient: 'from-violet-600/10 to-purple-600/5',
  },
  {
    title: 'CCTV Installation & Maintenance',
    description: 'Securing environments with multi-camera IP security systems integrated with AI analytics, remote viewing apps, and NVRs.',
    icon: Eye,
    features: ['IP-based HD dome/bullet', 'Night vision & audio feeds', 'NVR local backup', 'Mobile view integration'],
    gradient: 'from-cyan-600/10 to-blue-600/5',
  },
  {
    title: 'Network Design & Configuration',
    description: 'Planning local architectures, copper/fiber structured cabling runs, firewall installations, and enterprise VLAN segments.',
    icon: Network,
    features: ['Structured copper/fiber', 'VLAN division', 'Firewall gate rules', 'Wi-Fi density mapping'],
    gradient: 'from-emerald-600/10 to-teal-600/5',
  },
  {
    title: 'Annual Maintenance Contracts (AMC)',
    description: 'Outsource maintenance tasks to our certified technicians. Scheduled maintenance runs, hardware repairs, and server monitoring.',
    icon: FileText,
    features: ['Regular preventive checks', 'Unlimited breakdown calls', 'On-site parts replacement', 'OS security patching'],
    gradient: 'from-amber-600/10 to-orange-600/5',
  },
  {
    title: 'IT Consulting & Auditing',
    description: 'Analyzing current infrastructure bottlenecks, auditing network security loopholes, and outlining cloud transition strategies.',
    icon: Briefcase,
    features: ['Security auditing', 'Cloud migration map', 'Hardware upgrade lifecycle', 'Data protection policies'],
    gradient: 'from-rose-600/10 to-pink-600/5',
  },
  {
    title: '24/7 Technical Support',
    description: 'Dedicated engineers available around the clock to support your teams via remote diagnostics, helpdesk ticketing, or on-site visits.',
    icon: HelpCircle,
    features: ['Remote screen-share help', 'SLA-based response', 'Physical on-site visits', 'Software debug support'],
    gradient: 'from-blue-600/10 to-cyan-600/5',
  },
  {
    title: 'Bulk Supply for Corporate & Government',
    description: 'Sourcing, installing, and configuring massive orders of computers, accessories, and networking hubs for schools and ministries.',
    icon: Users2,
    features: ['Government portal compliance', 'Mass provisioning', 'Custom image installs', 'Statewide logistics runs'],
    gradient: 'from-indigo-600/10 to-violet-600/5',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 bg-white dark:bg-bg-dark transition-colors"
    >
      {/* Background glowing decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-100">
        <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-accent-violet/5 dark:bg-accent-violet/10 glow-orb" />
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-primary-royal/5 dark:bg-primary-royal/10 glow-orb" />
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
            Our Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5"
          >
            End-to-End Enterprise IT Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base md:text-lg text-slate-600 dark:text-slate-400"
          >
            We manage your technology lifecycle so you can focus on core business operations. Our service levels are backed by strict SLA commitments.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {servicesData.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.03] hover:shadow-[0_20px_50px_-20px_rgba(21,101,255,0.15)] hover:border-primary-royal/20 transition-all duration-500 overflow-hidden"
              >
                {/* Gradient mesh on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40 dark:opacity-20 group-hover:scale-105 transition-transform duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-royal to-primary-electric text-white flex items-center justify-center mb-6 shadow-md shadow-primary-royal/20 group-hover:scale-110 transition-transform duration-300">
                    <IconComp className="w-5.5 h-5.5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-outfit text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-primary-royal dark:group-hover:text-accent-cyan transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent-green/10 dark:bg-accent-green/20 text-accent-green flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-inter text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow hint indicator */}
                <div className="relative z-10 mt-8 flex justify-end">
                  <a
                    href="#contact"
                    className="text-xs font-bold text-primary-royal dark:text-accent-cyan hover:underline inline-flex items-center gap-1"
                  >
                    Inquire Service <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
