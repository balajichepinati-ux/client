'use client';

import { API_URL } from '@/utils/api';

import { useState, useEffect } from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Cpu, ShoppingBag, Eye, X } from 'lucide-react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number | null;
  image: string | null;
  specs: string[];
}

const categories = [
  'All',
  'Laptop',
  'Desktop',
  'Server',
  'Storage',
  'CCTV',
  'Network',
  'Power',
  'Software',
];

const defaultProducts: ProductItem[] = [
  {
    id: '1',
    name: 'Dell Latitude Enterprise Laptop',
    category: 'laptop',
    description: 'High-performance corporate business laptop equipped with Intel Core i7, 16GB RAM, and 512GB SSD.',
    price: 68500,
    image: null,
    specs: ['Intel Core i7 13th Gen', '16GB DDR5 RAM', '512GB NVMe SSD', 'Windows 11 Pro'],
  },
  {
    id: '2',
    name: 'HP ProDesk Micro Business PC',
    category: 'desktop',
    description: 'Ultra-small form factor desktop for office environments. Features Intel Core i5 and dual DisplayPorts.',
    price: 42000,
    image: null,
    specs: ['Intel Core i5', '8GB RAM', '256GB SSD', 'Dual DP output'],
  },
  {
    id: '3',
    name: 'QNAP 4-Bay Centralized NAS Storage',
    category: 'storage',
    description: 'Centralized network storage system supporting RAID 0/1/5 configuration for local team back-ups.',
    price: 32000,
    image: null,
    specs: ['4 Drive Bays', '1.7GHz Quad Core', '2.5GbE Port', 'RAID Protection'],
  },
  {
    id: '4',
    name: 'Hikvision 4MP Dome CCTV Camera',
    category: 'cctv',
    description: 'High-definition dome network surveillance camera with built-in infrared night-vision and motion tracking.',
    price: 4500,
    image: null,
    specs: ['4 Megapixel HD', '30m Smart IR Night-vision', 'IP67 Weatherproof', 'POE Power'],
  },
  {
    id: '5',
    name: 'Ubiquiti UniFi 24-Port POE Switch',
    category: 'network',
    description: 'Managed Gigabit Ethernet switch offering 24 PoE+ ports and 2 SFP uplink slots for rack network installs.',
    price: 28500,
    image: null,
    specs: ['24 Gigabit Ports', 'PoE+ Budget 95W', '2 SFP Uplink Slots', 'Fanless Silent System'],
  },
  {
    id: '6',
    name: 'APC 1KVA Smart UPS Power Backup',
    category: 'power',
    description: 'Intelligent line-interactive battery backup providing surge protection and clean battery power.',
    price: 12500,
    image: null,
    specs: ['1000VA / 600W', 'LCD Display Panel', '8 Outlet Receptacles', 'Surge Mitigation'],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'All') {
          queryParams.append('category', selectedCategory);
        }
        if (searchQuery) {
          queryParams.append('search', searchQuery);
        }

        const response = await fetch(`${API_URL}/api/products?${queryParams.toString()}`);
        const result = await response.json();

        if (response.ok && result.success && result.data.length > 0) {
          setProducts(result.data);
        } else {
          // If no search matches, filter local fallbacks for display
          let filtered = defaultProducts;
          if (selectedCategory !== 'All') {
            filtered = defaultProducts.filter(
              (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
          }
          if (searchQuery) {
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          setProducts(filtered);
        }
      } catch (err) {
        console.warn('Backend server offline. Filtering local backup items:', err);
        let filtered = defaultProducts;
        if (selectedCategory !== 'All') {
          filtered = defaultProducts.filter(
            (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
        if (searchQuery) {
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search typing
    const delayTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-200 transition-colors">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        {/* Banner */}
        <section className="relative overflow-hidden py-12 text-center">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h1 className="font-outfit text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-primary-navy dark:text-white">
              IT Hardware <span className="text-gradient">Catalog</span>
            </h1>
            <p className="font-inter text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Sourcing authentic corporate computer hardware, networking gear, and CCTV surveillance setups.
            </p>
          </div>
        </section>

        {/* Search and Category Filters */}
        <section className="max-w-7xl mx-auto px-6 mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-bg-dark-card shadow-sm focus:outline-none focus:border-primary-royal focus:ring-1 focus:ring-primary-royal transition-all"
              />
            </div>

            {/* Config Indicator */}
            <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold self-end md:self-auto">
              <SlidersHorizontal className="w-4 h-4" />
              <span>{products.length} Items Found</span>
            </div>
          </div>

          {/* Categorical filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold font-inter tracking-wider uppercase transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-primary-royal to-primary-electric text-white border-transparent shadow-sm'
                    : 'bg-white dark:bg-bg-dark-card text-slate-500 dark:text-slate-400 border-black/5 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-bg-dark-card rounded-3xl border border-black/5 dark:border-white/5 shadow-sm max-w-xl mx-auto">
              <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="font-outfit text-xl font-bold">No products match search criteria.</h3>
              <p className="font-inter text-sm text-slate-400 mt-2">Try adjusting filters or typing another product name.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((prod) => (
                <motion.div
                  key={prod.id}
                  layoutId={`prod-card-${prod.id}`}
                  className="group relative rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {/* Category tag */}
                    <span className="inline-block px-3 py-1 rounded-lg bg-primary-royal/10 dark:bg-primary-royal/20 text-primary-royal dark:text-accent-cyan text-[10px] font-bold uppercase tracking-wider">
                      {prod.category}
                    </span>

                    {/* Product Name */}
                    <h3 className="font-outfit text-lg font-bold group-hover:text-primary-royal dark:group-hover:text-accent-cyan transition-colors line-clamp-1">
                      {prod.name}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Specifications List */}
                    <div className="pt-2">
                      <ul className="space-y-1">
                        {prod.specs.slice(0, 3).map((spec, sidx) => (
                          <li key={sidx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                            <div className="w-1 h-1 rounded-full bg-accent-cyan shrink-0" />
                            <span className="line-clamp-1">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-6 pt-0 flex items-center justify-between mt-4">
                    <div>
                      {prod.price ? (
                        <span className="font-outfit text-base font-extrabold text-primary-navy dark:text-white">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="font-inter text-xs font-semibold text-slate-400">
                          Price on Request
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="p-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-300 transition-colors"
                      aria-label="View Specs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Specs Details Modal Overlay */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-bg-dark border border-black/10 dark:border-white/10 shadow-2xl p-8 max-h-[85vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-6 top-6 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-primary-royal/10 dark:bg-primary-royal/20 text-primary-royal dark:text-accent-cyan text-[10px] font-bold uppercase tracking-wider mb-2">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-outfit text-2xl font-bold text-primary-navy dark:text-white">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  <div>
                    <h4 className="font-outfit text-sm font-bold mb-1.5 uppercase tracking-wider text-slate-400">Description</h4>
                    <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-outfit text-sm font-bold mb-2 uppercase tracking-wider text-slate-400">Technical Specifications</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProduct.specs.map((spec, sidx) => (
                        <li key={sidx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-black/[0.02] dark:border-white/[0.02] flex items-center gap-2">
                          <Cpu className="w-4.5 h-4.5 text-accent-cyan shrink-0" />
                          <span className="font-inter text-xs font-semibold">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between">
                    <div>
                      <p className="font-inter text-xs text-slate-400">Estimate Price</p>
                      <p className="font-outfit text-2xl font-extrabold text-primary-navy dark:text-white mt-1">
                        {selectedProduct.price ? `₹${selectedProduct.price.toLocaleString('en-IN')}` : 'Price on Request'}
                      </p>
                    </div>

                    <Link
                      href={`/#contact?product=${encodeURIComponent(selectedProduct.name)}`}
                      onClick={() => setSelectedProduct(null)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-royal to-primary-electric text-white text-sm font-bold shadow-md shadow-primary-royal/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
