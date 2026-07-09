'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Prefill name/company from localStorage if present
    const savedName = localStorage.getItem('review_name');
    const savedCompany = localStorage.getItem('review_company');
    if (savedName) setName(savedName);
    if (savedCompany) setCompany(savedCompany);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review = { name, company, rating, content, createdAt: new Date().toISOString() };
    // Save to localStorage (simple lightweight storage for demo)
    const existing = JSON.parse(localStorage.getItem('reviews') || '[]');
    existing.unshift(review);
    localStorage.setItem('reviews', JSON.stringify(existing));
    localStorage.setItem('review_name', name);
    localStorage.setItem('review_company', company);
    setSubmitted(true);
    setContent('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative py-24 bg-white dark:bg-bg-dark transition-colors overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-royal/20 bg-primary-royal/5 text-primary-royal text-xs font-bold uppercase tracking-wider mb-4">
            Reviews
          </div>
          <h2 className="font-outfit text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">Share Your Experience</h2>
          <p className="text-slate-600 dark:text-slate-400">We'd love to hear from you — leave a short review below.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-transparent"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company / Role (optional)"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  aria-label={`${s} star${s > 1 ? 's' : ''}`}
                  className={`p-1 rounded-md ${rating >= s ? 'bg-accent-orange/10' : 'bg-transparent'}`}
                >
                  <Star className={`w-6 h-6 ${rating >= s ? 'text-accent-orange' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your review..."
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-transparent"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button type="submit" className="px-5 py-3 bg-primary-royal text-white rounded-lg shadow-sm">Submit Review</button>
            {submitted && <span className="text-sm text-green-600">Thanks — your review was saved.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
