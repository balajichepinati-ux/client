'use client';

import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Eye, Rocket, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Zero Error Quality',
    description: 'We believe in doing things right the first time. Our precision setups guarantee maximum uptime and reliability.',
  },
  {
    icon: Users,
    title: 'Customer-First IT',
    description: 'Our Nellore-based team works directly with businesses of all sizes, ensuring fast turnaround times and custom solutions.',
  },
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'Our engineers are fully certified across networking, CCTV security, server maintenance, and IT hardware.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-200 transition-colors">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        {/* Banner */}
        <section className="relative overflow-hidden py-16 text-center">
          <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40">
            <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-primary-royal/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-accent-cyan/20 rounded-full blur-[80px]" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-outfit text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-primary-navy dark:text-white"
            >
              About <span className="text-gradient">Zero Error IT Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-inter text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Nelore's trusted technology partner, delivering reliable computer hardware, CCTV surveillance, and enterprise network design since 2018.
            </motion.p>
          </div>
        </section>

        {/* Corporate Profile & Vision */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-outfit text-3xl font-bold text-primary-navy dark:text-white">
              Who We Are
            </h2>
            <p className="font-inter text-slate-600 dark:text-slate-400 leading-relaxed">
              At <strong>ZERO ERROR IT SOLUTIONS</strong>, we are committed to providing reliable, cost-effective, and innovative IT products and services to modern businesses. Our goal is to supply technology solutions that improve corporate productivity, physical security, and business growth.
            </p>
            <p className="font-inter text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you need desktop computers, printers, networking switches, firewalls, CCTV cameras, or annual maintenance support (AMC), our team ensures zero layout bugs, zero connectivity limits, and zero quality errors.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="font-inter text-sm font-semibold">24/7 Support Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="font-inter text-sm font-semibold">Genuine Products Only</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="font-inter text-sm font-semibold">Custom Setup Audits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="font-inter text-sm font-semibold">Local Nellore Engineers</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            <div className="p-8 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-md flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-royal/10 dark:bg-primary-royal/20 flex items-center justify-center text-primary-royal dark:text-accent-cyan shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-outfit text-xl font-bold mb-2">Our Vision</h3>
                <p className="font-inter text-sm text-slate-500 dark:text-slate-400">
                  To become the primary tech partner in Andhra Pradesh, recognized for introducing error-free IT ecosystems and cutting-edge security configurations to modern enterprises.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-md flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 dark:bg-accent-cyan/20 flex items-center justify-center text-primary-electric dark:text-accent-cyan shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-outfit text-xl font-bold mb-2">Our Mission</h3>
                <p className="font-inter text-sm text-slate-500 dark:text-slate-400">
                  To empower small, medium, and corporate businesses with hardware integrations and certified network support that minimize operational risk and elevate physical security.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Corporate Values */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/30 transition-colors">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-outfit text-3xl font-bold mb-4 text-primary-navy dark:text-white">
                Our Foundational Pillars
              </h2>
              <p className="font-inter text-slate-500 dark:text-slate-400">
                These principles guide every corporate procurement deal, CCTV deployment, and networking support contract we complete.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm text-center space-y-4 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-royal/10 dark:bg-primary-royal/20 flex items-center justify-center text-primary-royal dark:text-accent-cyan mx-auto">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-outfit text-lg font-bold">{val.title}</h3>
                    <p className="font-inter text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {val.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
