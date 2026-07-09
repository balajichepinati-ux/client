'use client';

import { API_URL } from '@/utils/api';

import { useState, useEffect } from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { ShieldAlert, Server, Network, ShieldCheck, PenTool, Key, Check } from 'lucide-react';

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const defaultServices: ServiceItem[] = [
  {
    title: 'Corporate IT Procurement',
    description: 'Bulk sourcing of desktop computers, high-performance laptops, custom office servers, scanners, and accessories.',
    icon: 'Server',
    features: ['Official Brand Warranties', 'Pre-configured Setup Options', 'Nellore Doorstep Delivery'],
  },
  {
    title: 'CCTV Installation & Safety Audits',
    description: 'Complete high-definition video monitoring system design, installation, storage setups, and continuous AMC coverage.',
    icon: 'ShieldCheck',
    features: ['Remote Mobile View Apps', 'Night-vision HD Feeds', 'Hard Disk Storage Arrays'],
  },
  {
    title: 'Network Design & Switch Configs',
    description: 'Enterprise networking setup including physical CAT6 cabling, secure Wi-Fi zoning, router settings, and firewalls.',
    icon: 'Network',
    features: ['Structured Cabling Layouts', 'Secure Firewall Settings', 'Seamless Enterprise Roaming'],
  },
  {
    title: 'Annual Maintenance Contracts (AMC)',
    description: 'Proactive support packages covering troubleshooting, hardware repairs, system health reviews, and software cleanups.',
    icon: 'ShieldAlert',
    features: ['Priority Service Tickets', 'Preventative Monthly Visits', 'Backup Hardware Loans'],
  },
  {
    title: 'Software Licensing & Cloud Systems',
    description: 'Sourcing and activation of Windows licenses, Microsoft 365, antivirus solutions, and network utility tools.',
    icon: 'Key',
    features: ['Genuine Cloud Subscriptions', 'Auto-renew Controls', 'Local Antivirus Installs'],
  },
  {
    title: 'Server & NAS Storage Design',
    description: 'Installation of centralized storage systems (NAS) or local business servers, providing automated backup syncs.',
    icon: 'PenTool',
    features: ['Automated Local Backups', 'Raid Mirror Protection', 'Secure Local File Shares'],
  },
];

// Helper to resolve icon from key string
const getIconComponent = (iconKey: string) => {
  switch (iconKey) {
    case 'Server':
      return Server;
    case 'Network':
      return Network;
    case 'ShieldCheck':
      return ShieldCheck;
    case 'ShieldAlert':
      return ShieldAlert;
    case 'Key':
      return Key;
    default:
      return PenTool;
  }
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services`);
        const result = await response.json();
        if (response.ok && result.success && result.data.length > 0) {
          setServices(result.data);
        } else {
          setServices(defaultServices);
        }
      } catch (err) {
        console.warn('Backend unavailable, using default fallback services:', err);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
            <h1 className="font-outfit text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-primary-navy dark:text-white">
              IT Products & <span className="text-gradient">Services</span>
            </h1>
            <p className="font-inter text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From structured cabling and security systems to corporate hardware sourcing and priority annual contracts.
            </p>
          </div>
        </section>

        {/* Services List Grid */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc, idx) => {
                const Icon = getIconComponent(svc.icon);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-8 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-royal/10 dark:bg-primary-royal/20 flex items-center justify-center text-primary-royal dark:text-accent-cyan">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-outfit text-xl font-bold text-primary-navy dark:text-white">
                        {svc.title}
                      </h3>
                      <p className="font-inter text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-white/[0.05] mt-6">
                      <ul className="space-y-2">
                        {svc.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                            <Check className="w-4 h-4 text-accent-green shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
