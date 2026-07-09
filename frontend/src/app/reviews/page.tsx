'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquarePlus, CheckCircle, X, ThumbsUp } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const defaultReviews: ReviewItem[] = [
  {
    id: '1',
    name: 'Praveen G. Gandham',
    email: 'praveen@hospital.com',
    rating: 5,
    comment: 'Procured all our corporate workstations and servers from Zero Error. Their hardware is genuine and their network configuration support was outstanding.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Suresh Kumar',
    email: 'suresh@nellorehotel.com',
    rating: 5,
    comment: 'Installed 16 dome CCTV cameras across our hotel. The HD feeds are crystal clear and the remote mobile viewing application was configured perfectly on our phones.',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Anil Prasad',
    email: 'principal@school.org',
    rating: 4,
    comment: 'We have an Annual Maintenance Contract (AMC) with them for school computer labs. Their engineers are responsive, arriving within 2 hours of raising a support ticket.',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [writeOpen, setWriteOpen] = useState(false);

  // Write Review form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const result = await response.json();
      if (response.ok && result.success && result.data.length > 0) {
        setReviews(result.data);
      } else {
        setReviews(defaultReviews);
      }
    } catch (err) {
      console.warn('Backend unavailable, using default fallback reviews:', err);
      setReviews(defaultReviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) {
      alert('Please fill out all form inputs.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          rating,
          comment,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setName('');
        setEmail('');
        setComment('');
        setRating(5);
        setTimeout(() => {
          setSubmitSuccess(false);
          setWriteOpen(false);
          fetchReviews(); // Refresh
        }, 3500);
      } else {
        alert(result.message || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Review submission error:', err);
      alert('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate rating summary
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? parseFloat((reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1))
    : 5.0;

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-200 transition-colors">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        {/* Banner */}
        <section className="relative overflow-hidden py-12 text-center">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h1 className="font-outfit text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-primary-navy dark:text-white">
              Customer <span className="text-gradient">Reviews</span>
            </h1>
            <p className="font-inter text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Read verified testimonials from Nellore schools, hotels, hospitals, and corporate clients.
            </p>
          </div>
        </section>

        {/* Aggregate Ratings Overview */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="p-8 rounded-3xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-2">
              <span className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">Average Customer Rating</span>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="font-outfit text-5xl font-extrabold text-primary-navy dark:text-white">{averageRating}</span>
                <div className="space-y-0.5">
                  <div className="flex items-center text-accent-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(averageRating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-inter text-xs text-slate-400">{totalReviews} Verified Submissions</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setWriteOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-royal to-primary-electric text-white text-sm font-bold shadow-md shadow-primary-royal/20 hover:scale-[1.02] active:scale-95 transition-all shrink-0"
            >
              <MessageSquarePlus className="w-4.5 h-4.5" />
              <span>Write a Review</span>
            </button>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-outfit text-base font-bold text-primary-navy dark:text-white">{rev.name}</h4>
                      <span className="font-inter text-[10px] text-slate-400 font-semibold">
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 text-accent-orange">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-inter text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <ThumbsUp className="w-3.5 h-3.5 text-primary-royal" />
                    <span>Verified Client</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Write Review Modal Overlay */}
        <AnimatePresence>
          {writeOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md rounded-3xl bg-white dark:bg-bg-dark border border-black/10 dark:border-white/10 shadow-2xl p-8"
              >
                <button
                  onClick={() => setWriteOpen(false)}
                  className="absolute right-6 top-6 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {submitSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle className="w-16 h-16 text-accent-green mx-auto animate-bounce" />
                    <h3 className="font-outfit text-2xl font-bold">Review Submitted!</h3>
                    <p className="font-inter text-sm text-slate-500 dark:text-slate-400">
                      Thank you for your rating. Your submission is pending moderation and will appear soon.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-outfit text-2xl font-bold text-primary-navy dark:text-white">
                        Write a Review
                      </h3>
                      <p className="font-inter text-xs text-slate-400 mt-1">Share your experience with Zero Error IT Solutions.</p>
                    </div>

                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal transition-all text-sm"
                          placeholder="Your name or business name"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal transition-all text-sm"
                          placeholder="email@example.com"
                        />
                      </div>

                      {/* Stars Selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Rating Score</label>
                        <div className="flex items-center gap-1.5 text-slate-300 dark:text-slate-700">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="focus:outline-none transition-transform active:scale-90"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= (hoverRating || rating)
                                    ? 'text-accent-orange fill-accent-orange'
                                    : ''
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Review Comments</label>
                        <textarea
                          rows={4}
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal transition-all text-sm resize-none"
                          placeholder="Tell us about the products sourced or IT infrastructure installation details..."
                        />
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-royal to-primary-electric text-white text-sm font-bold shadow-md shadow-primary-royal/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            'Submit Review'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
