'use client';

import { API_URL } from '@/utils/api';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  ShoppingBag,
  Sliders,
  MessageSquare,
  Briefcase,
  Mail,
  UserCheck,
  LogOut,
  Plus,
  Trash2,
  Check,
  X,
  FileText,
  Upload,
  Cpu,
} from 'lucide-react';

interface Stats {
  products: number;
  services: number;
  inquiries: number;
  subscribers: number;
  applications: number;
  totalReviews: number;
  approvedReviews: number;
  averageRating: number;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const router = useRouter();

  // Data Lists
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  // Product Form states
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCat, setProdCat] = useState('laptop');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImageFile, setProdImageFile] = useState<File | null>(null);
  const [prodSpecs, setProdSpecs] = useState('');
  const [prodSubmitLoading, setProdSubmitLoading] = useState(false);

  // Review Approval Trigger Loading Map
  const [reviewActionLoading, setReviewActionLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // 1. Guard check: redirect to login if no token is found
    const token = localStorage.getItem('adminToken');
    if (!token || token !== 'zeroerror_secure_admin_auth_token_2026') {
      router.push('/admin');
      return;
    }

    setAdminEmail(localStorage.getItem('adminEmail') || 'admin@zeroerror.in');
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken') || '';

    try {
      // 1. Fetch Analytics
      const resStats = await fetch(`${API_URL}/api/admin/analytics`, {
        headers: { 'x-admin-token': token },
      });
      const dataStats = await resStats.json();
      if (resStats.ok && dataStats.success) {
        setStats(dataStats.data.stats);
      }

      // 2. Fetch Inquiries
      const resInq = await fetch(`${API_URL}/api/admin/contacts`, {
        headers: { 'x-admin-token': token },
      });
      const dataInq = await resInq.json();
      if (resInq.ok && dataInq.success) {
        setInquiries(dataInq.data);
      }

      // 3. Fetch Products
      const resProd = await fetch(`${API_URL}/api/products`);
      const dataProd = await resProd.json();
      if (resProd.ok && dataProd.success) {
        setProducts(dataProd.data);
      }

      // 4. Fetch Services
      const resSvc = await fetch(`${API_URL}/api/services`);
      const dataSvc = await resSvc.json();
      if (resSvc.ok && dataSvc.success) {
        setServices(dataSvc.data);
      }

      // 5. Fetch Applications
      const resApp = await fetch(`${API_URL}/api/careers/applications`, {
        headers: { 'x-admin-token': token },
      });
      const dataApp = await resApp.json();
      if (resApp.ok && dataApp.success) {
        setApplications(dataApp.data);
      }

      // 6. Fetch Reviews
      const resRev = await fetch(`${API_URL}/api/reviews?adminMode=true`, {
        headers: { 'x-admin-token': token },
      });
      const dataRev = await resRev.json();
      if (resRev.ok && dataRev.success) {
        setReviews(dataRev.data);
      }

      // 7. Fetch Subscribers
      const resSub = await fetch(`${API_URL}/api/admin/subscribers`, {
        headers: { 'x-admin-token': token },
      });
      const dataSub = await resSub.json();
      if (resSub.ok && dataSub.success) {
        setSubscribers(dataSub.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    router.push('/admin');
  };

  // --- Reviews Moderation Trigger ---
  const toggleReviewApproval = async (id: string, currentStatus: boolean) => {
    setReviewActionLoading((prev) => ({ ...prev, [id]: true }));
    const token = localStorage.getItem('adminToken') || '';

    try {
      const response = await fetch(`${API_URL}/api/reviews/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ isApproved: !currentStatus }),
      });

      if (response.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isApproved: !currentStatus } : r))
        );
      } else {
        alert('Failed to update review status.');
      }
    } catch (err) {
      console.error('Moderation error:', err);
    } finally {
      setReviewActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    const token = localStorage.getItem('adminToken') || '';

    try {
      const response = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });

      if (response.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert('Failed to delete review.');
      }
    } catch (err) {
      console.error('Delete review error:', err);
    }
  };

  // --- Product Management CRUD ---
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodDesc) return;
    setProdSubmitLoading(true);
    const token = localStorage.getItem('adminToken') || '';

    try {
      let finalImageUrl = editingProduct?.image || null;

      // 1. Upload Product Image to storage if selected
      if (prodImageFile) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(prodImageFile);

        const uploadPromise = new Promise<string>((resolve, reject) => {
          fileReader.onload = async () => {
            try {
              const res = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  fileData: fileReader.result as string,
                  fileName: prodImageFile.name,
                  fileType: prodImageFile.type,
                  folder: 'products',
                }),
              });
              const data = await res.json();
              if (res.ok && data.success) {
                resolve(data.url);
              } else {
                reject(new Error(data.message || 'Image upload failed.'));
              }
            } catch (err) {
              reject(err);
            }
          };
        });

        finalImageUrl = await uploadPromise;
      }

      // 2. Add or Edit Product record
      const url = editingProduct
        ? `${API_URL}/api/products/${editingProduct.id}`
        : `${API_URL}/api/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({
          name: prodName,
          category: prodCat,
          description: prodDesc,
          price: prodPrice || null,
          image: finalImageUrl,
          specs: prodSpecs.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
        }),
      });

      if (response.ok) {
        setShowProductForm(false);
        setEditingProduct(null);
        setProdName('');
        setProdDesc('');
        setProdPrice('');
        setProdSpecs('');
        setProdImageFile(null);
        fetchDashboardData();
      } else {
        const errResult = await response.json();
        alert(errResult.message || 'Failed to save product details.');
      }
    } catch (err: any) {
      console.error('Product save error:', err);
      alert(err.message || 'An error occurred while saving product details.');
    } finally {
      setProdSubmitLoading(false);
    }
  };

  const handleEditProductClick = (prod: any) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdCat(prod.category);
    setProdDesc(prod.description);
    setProdPrice(prod.price ? String(prod.price) : '');
    setProdSpecs(prod.specs.join(', '));
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const token = localStorage.getItem('adminToken') || '';

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });

      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete product.');
      }
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-200 transition-colors">
      {/* Top dashboard navbar */}
      <header className="sticky top-0 w-full z-30 py-4 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-royal to-accent-cyan flex items-center justify-center">
            <Cpu className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-outfit font-extrabold text-sm tracking-wider">ZERO ERROR ADMIN</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-inter text-xs text-slate-400 font-semibold">{adminEmail}</span>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout containing Sidebar and Tab Views */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-black/[0.05] dark:border-white/[0.05] bg-white dark:bg-bg-dark-card/25 p-6 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-primary-royal text-white shadow-md'
                : 'hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-600 dark:text-slate-400'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'inquiries'
                ? 'bg-primary-royal text-white shadow-md'
                : 'hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-600 dark:text-slate-400'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Client Inquiries</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-primary-royal text-white shadow-md'
                : 'hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-600 dark:text-slate-400'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Product Inventory</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'reviews'
                ? 'bg-primary-royal text-white shadow-md'
                : 'hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-600 dark:text-slate-400'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Review Moderation</span>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'applications'
                ? 'bg-primary-royal text-white shadow-md'
                : 'hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-600 dark:text-slate-400'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Applications</span>
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'subscribers'
                ? 'bg-primary-royal text-white shadow-md'
                : 'hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-600 dark:text-slate-400'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Newsletter Subscriptions</span>
          </button>
        </aside>

        {/* Dynamic Viewport Content */}
        <main className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-4 border-primary-royal border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && stats && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="font-outfit text-2xl font-bold">Overview</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-2">
                      <span className="font-inter text-xs text-slate-400 font-bold uppercase tracking-wider">Inquiries</span>
                      <p className="font-outfit text-3xl font-extrabold text-primary-royal dark:text-accent-cyan">{stats.inquiries}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-2">
                      <span className="font-inter text-xs text-slate-400 font-bold uppercase tracking-wider">Products</span>
                      <p className="font-outfit text-3xl font-extrabold text-primary-royal dark:text-accent-cyan">{stats.products}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-2">
                      <span className="font-inter text-xs text-slate-400 font-bold uppercase tracking-wider">Applications</span>
                      <p className="font-outfit text-3xl font-extrabold text-primary-royal dark:text-accent-cyan">{stats.applications}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-2">
                      <span className="font-inter text-xs text-slate-400 font-bold uppercase tracking-wider">Subscribers</span>
                      <p className="font-outfit text-3xl font-extrabold text-primary-royal dark:text-accent-cyan">{stats.subscribers}</p>
                    </div>
                  </div>

                  {/* Short review analytics card */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm max-w-md space-y-3">
                    <h3 className="font-outfit text-sm font-bold text-slate-400 uppercase tracking-wider">Average Rating Score</h3>
                    <div className="flex items-center gap-4">
                      <span className="font-outfit text-4xl font-extrabold">{stats.averageRating} / 5</span>
                      <div className="text-xs text-slate-400 font-semibold">
                        <p>{stats.approvedReviews} Approved Reviews</p>
                        <p>{stats.totalReviews} Total Received</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- INQUIRIES TAB --- */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="font-outfit text-2xl font-bold">Client Inquiries</h2>
                  {inquiries.length === 0 ? (
                    <p className="font-inter text-sm text-slate-400">No contact submissions found in database.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-outfit text-base font-bold">{inq.name}</h4>
                              <p className="font-inter text-xs text-slate-400">{inq.email} | {inq.phone}</p>
                            </div>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-primary-royal/10 dark:bg-primary-royal/20 text-primary-royal dark:text-accent-cyan text-[10px] font-bold uppercase tracking-wider">
                              {inq.service}
                            </span>
                          </div>
                          <p className="font-inter text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-white/[0.02] pt-2">
                            {inq.message}
                          </p>
                          <span className="block text-[10px] text-slate-400 font-semibold text-right">
                            {new Date(inq.createdAt).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- PRODUCTS MANAGER --- */}
              {activeTab === 'products' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h2 className="font-outfit text-2xl font-bold">Product Inventory</h2>
                    {!showProductForm && (
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setShowProductForm(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-royal text-white text-xs font-bold shadow-md shadow-primary-royal/15"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Product</span>
                      </button>
                    )}
                  </div>

                  {showProductForm ? (
                    <form onSubmit={handleProductSubmit} className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-md space-y-4 max-w-xl">
                      <h3 className="font-outfit text-lg font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400">Product Name</label>
                          <input
                            type="text"
                            required
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] text-sm focus:outline-none"
                            placeholder="Dell Latitude 3440"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400">Category</label>
                          <select
                            value={prodCat}
                            onChange={(e) => setProdCat(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] text-sm focus:outline-none"
                          >
                            <option value="laptop">Laptop</option>
                            <option value="desktop">Desktop</option>
                            <option value="server">Server</option>
                            <option value="storage">Storage</option>
                            <option value="cctv">CCTV</option>
                            <option value="network">Network</option>
                            <option value="power">Power</option>
                            <option value="software">Software</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Price (INR - Optional)</label>
                        <input
                          type="number"
                          value={prodPrice}
                          onChange={(e) => setProdPrice(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] text-sm focus:outline-none"
                          placeholder="e.g. 52000"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Specifications (Comma Separated)</label>
                        <input
                          type="text"
                          value={prodSpecs}
                          onChange={(e) => setProdSpecs(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] text-sm focus:outline-none"
                          placeholder="Intel i5, 8GB RAM, 512GB SSD"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Description</label>
                        <textarea
                          rows={3}
                          required
                          value={prodDesc}
                          onChange={(e) => setProdDesc(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] text-sm focus:outline-none resize-none"
                          placeholder="Short product overview..."
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400">Upload Product Image (Optional)</label>
                        <div className="relative border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-4 text-center hover:bg-slate-50/30 transition-all">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files && setProdImageFile(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                          <p className="font-inter text-xs text-slate-500">
                            {prodImageFile ? prodImageFile.name : 'Select product image file'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={prodSubmitLoading}
                          className="px-6 py-2.5 rounded-xl bg-primary-royal text-white text-xs font-bold shadow-md shadow-primary-royal/20"
                        >
                          {prodSubmitLoading ? 'Saving...' : 'Save Product'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowProductForm(false);
                            setEditingProduct(null);
                            setProdImageFile(null);
                          }}
                          className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-black/5 dark:border-white/5 shadow-sm bg-white dark:bg-bg-dark-card/20">
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-bg-dark-card border-b border-black/[0.05] dark:border-white/[0.05] text-slate-400 font-bold uppercase tracking-wider">
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((p) => (
                            <tr key={p.id} className="border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                              <td className="p-4 font-semibold">{p.name}</td>
                              <td className="p-4 font-bold text-primary-royal dark:text-accent-cyan uppercase text-[10px]">{p.category}</td>
                              <td className="p-4">{p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Request'}</td>
                              <td className="p-4 text-right flex justify-end gap-2">
                                <button
                                  onClick={() => handleProductSubmit}
                                  onClickCapture={() => handleEditProductClick(p)}
                                  className="px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/10 hover:bg-slate-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 flex items-center gap-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* --- REVIEW MODERATION TAB --- */}
              {activeTab === 'reviews' && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="font-outfit text-2xl font-bold">Review Moderation</h2>
                  {reviews.length === 0 ? (
                    <p className="font-inter text-sm text-slate-400">No client reviews received yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="font-outfit text-base font-bold">{rev.name}</h4>
                              <p className="font-inter text-xs text-slate-400">{rev.email} | rating: {rev.rating}/5 stars</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Moderation approval toggle */}
                              <button
                                onClick={() => toggleReviewApproval(rev.id, rev.isApproved)}
                                disabled={reviewActionLoading[rev.id]}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                  rev.isApproved
                                    ? 'bg-accent-green/10 hover:bg-accent-green/20 text-accent-green'
                                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500'
                                }`}
                              >
                                {reviewActionLoading[rev.id] ? (
                                  <div className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                                ) : rev.isApproved ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                                <span>{rev.isApproved ? 'Approved' : 'Pending Approval'}</span>
                              </button>

                              <button
                                onClick={() => deleteReview(rev.id)}
                                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="font-inter text-xs text-slate-500 dark:text-slate-400 italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- JOB APPLICATIONS TAB --- */}
              {activeTab === 'applications' && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="font-outfit text-2xl font-bold">Job Applications</h2>
                  {applications.length === 0 ? (
                    <p className="font-inter text-sm text-slate-400">No career applications submitted yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <h4 className="font-outfit text-base font-bold">{app.name}</h4>
                              <p className="font-inter text-xs text-slate-400">{app.email} | {app.phone}</p>
                              <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-primary-royal/10 dark:bg-primary-royal/20 text-primary-royal dark:text-accent-cyan text-[10px] font-bold">
                                Role: {app.career?.title || 'General Position'}
                              </span>
                            </div>
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-royal/10 dark:bg-primary-royal/20 text-primary-royal dark:text-accent-cyan text-xs font-bold hover:scale-[1.01] transition-transform self-start"
                            >
                              <FileText className="w-4 h-4" />
                              <span>View Resume PDF</span>
                            </a>
                          </div>
                          {app.coverLetter && (
                            <p className="font-inter text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-white/[0.02] pt-2">
                              <strong>Cover Letter:</strong><br/>
                              {app.coverLetter}
                            </p>
                          )}
                          <span className="block text-[9px] text-slate-400 text-right">
                            Submitted: {new Date(app.createdAt).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- NEWSLETTER SUBSCRIBERS TAB --- */}
              {activeTab === 'subscribers' && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="font-outfit text-2xl font-bold">Newsletter Subscriptions</h2>
                  {subscribers.length === 0 ? (
                    <p className="font-inter text-sm text-slate-400">No newsletter subscribers found.</p>
                  ) : (
                    <div className="max-w-md overflow-x-auto rounded-2xl border border-black/5 dark:border-white/5 shadow-sm bg-white dark:bg-bg-dark-card/20">
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-bg-dark-card border-b border-black/[0.05] dark:border-white/[0.05] text-slate-400 font-bold uppercase tracking-wider">
                            <th className="p-4">Email Address</th>
                            <th className="p-4">Subscribed Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((s) => (
                            <tr key={s.id} className="border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                              <td className="p-4 font-semibold">{s.email}</td>
                              <td className="p-4">{new Date(s.subscribedAt).toLocaleDateString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
