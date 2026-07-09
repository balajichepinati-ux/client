'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  Server,
  Printer,
  Cctv,
  Network,
  MousePointer2,
  Zap,
  KeyRound,
  ArrowUpRight,
} from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  category: 'hardware' | 'network-servers' | 'security' | 'power-software';
  icon: React.ComponentType<{ className?: string }>;
  specs: string[];
  description: string;
  badge?: string;
}

const productsData: ProductItem[] = [
  {
    id: 'laptops-desktops',
    title: 'Laptops & Desktop Computers',
    category: 'hardware',
    icon: Laptop,
    specs: ['Business Workstations', 'Premium Ultra-books', 'High-performance PCs', 'Custom Configurations'],
    description: 'Procurement of top-tier desktop computers and laptops from Lenovo, Dell, HP, and Apple customized for corporate productivity.',
    badge: 'Popular',
  },
  {
    id: 'servers-storage',
    title: 'Servers & Storage Solutions',
    category: 'network-servers',
    icon: Server,
    specs: ['Rack & Tower Servers', 'Network Attached Storage (NAS)', 'Enterprise SAN', 'Cloud Storage Integrations'],
    description: 'High-availability servers and secure data storage arrays configured to ensure continuous uptime and robust backup capabilities.',
    badge: 'Enterprise',
  },
  {
    id: 'cctv-surveillance',
    title: 'CCTV Surveillance Systems',
    category: 'security',
    icon: Cctv,
    specs: ['IP Cameras & NVRs', 'AI Video Analytics', 'Night Vision & 4K Recording', 'Remote App Monitoring'],
    description: 'State-of-the-art security installations providing round-the-clock facility monitoring, motion warnings, and automatic feeds archiving.',
    badge: 'Security',
  },
  {
    id: 'networking-products',
    title: 'Networking Products',
    category: 'network-servers',
    icon: Network,
    specs: ['Managed PoE Switches', 'Enterprise Wi-Fi Routers', 'Fiber Optic Modules', 'Firewalls & Gateways'],
    description: 'Hardware modules to design high-speed, reliable, and secure local area networks that support high-density traffic.',
  },
  {
    id: 'printers-scanners',
    title: 'Printers & Scanners',
    category: 'hardware',
    icon: Printer,
    specs: ['LaserJet MFP Printers', 'High-Speed Document Scanners', 'Plotters & Wide-Format', 'Print Management Systems'],
    description: 'Secure and efficient imaging systems designed to optimize office printing workflows and minimize paper usage.',
  },
  {
    id: 'ups-power',
    title: 'UPS & Power Backup Solutions',
    category: 'power-software',
    icon: Zap,
    specs: ['Online & Line-Interactive', 'Modular Battery Banks', 'Surge Protectors', 'Real-time Status Alerting'],
    description: 'Uninterrupted power supplies to protect your valuable network units and prevent data loss during power fluctuations.',
  },
  {
    id: 'accessories-peripherals',
    title: 'Computer Accessories & Peripherals',
    category: 'hardware',
    icon: MousePointer2,
    specs: ['FHD Monitor Screens', 'Ergonomic Keyboards', 'Docking Hub Stations', 'Cables & Adaptor Units'],
    description: 'Essential high-quality computer accessories to complete workspaces and optimize team comfort.',
  },
  {
    id: 'software-licensing',
    title: 'Software & Licensing',
    category: 'power-software',
    icon: KeyRound,
    specs: ['OS (Windows/Server)', 'Microsoft 365 Cloud Suites', 'Enterprise Antiviruses', 'CAD & Creative Licensing'],
    description: 'Official corporate software licenses, OS setups, and SaaS subscriptions managed and renewed automatically.',
    badge: 'Licensing',
  },
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'hardware', name: 'Hardware' },
  { id: 'network-servers', name: 'Network & Servers' },
  { id: 'security', name: 'Security' },
  { id: 'power-software', name: 'Power & Software' },
];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = productsData.filter(
    (product) => activeFilter === 'all' || product.category === activeFilter
  );

  const handleInquiry = (productTitle: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Pre-fill message if elements exist
      setTimeout(() => {
        const messageInput = document.getElementById('form-message') as HTMLTextAreaElement;
        if (messageInput) {
          messageInput.value = `Hello ZERO ERROR team, I would like to get a quote and more details regarding "${productTitle}".`;
          messageInput.focus();
        }
      }, 800);
    }
  };

  return (
    <section
      id="products"
      className="relative py-24 bg-slate-50 dark:bg-bg-dark border-t border-b border-black/[0.03] dark:border-white/[0.03] transition-colors"
    >
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-100">
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-primary-royal/5 dark:bg-primary-royal/10 glow-orb" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-accent-cyan/5 dark:bg-accent-cyan/8 glow-orb" />
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
            Product Portfolio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5"
          >
            Hardware & IT Infrastructure Supply
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base md:text-lg text-slate-600 dark:text-slate-400"
          >
            We partner with global technology manufacturers to supply certified, highly reliable, and enterprise-grade hardware devices optimized for corporate workflows.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide font-inter border transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-gradient-to-r from-primary-royal to-primary-electric text-white border-transparent shadow-lg shadow-primary-royal/20'
                  : 'bg-white hover:bg-slate-100 border-black/5 dark:border-white/5 text-slate-700 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:bg-white/[0.06]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const IconComponent = product.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:shadow-[0_15px_30px_rgba(21,101,255,0.06)] dark:hover:shadow-[0_15px_30px_rgba(21,101,255,0.15)] dark:hover:border-primary-royal/30 transition-all duration-300"
                >
                  <div>
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-royal/10 text-primary-royal dark:bg-accent-cyan/15 dark:text-accent-cyan">
                        {product.badge}
                      </span>
                    )}

                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-primary-royal/5 dark:bg-primary-royal/10 text-primary-royal dark:text-accent-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="font-outfit text-xl font-bold text-slate-800 dark:text-white group-hover:text-primary-royal dark:group-hover:text-accent-cyan transition-colors mb-3">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Tech specs bullets */}
                    <ul className="space-y-2 mb-6">
                      {product.specs.map((spec, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary-royal/60 dark:bg-accent-cyan" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button inside card */}
                  <button
                    onClick={() => handleInquiry(product.title)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50 hover:bg-primary-royal hover:text-white dark:bg-white/[0.01] dark:hover:bg-primary-royal/20 dark:hover:border-primary-royal/30 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all duration-300"
                  >
                    Get A Quote <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
