'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitSuccess(true);
        reset();
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitSuccess(false), 5000);
      } else {
        alert(result.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-white dark:bg-bg-dark transition-colors"
    >
      {/* Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-100">
        <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-primary-royal/5 dark:bg-primary-royal/8 glow-orb" />
        <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-accent-cyan/5 dark:bg-accent-cyan/8 glow-orb" />
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
            Contact Details
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5"
          >
            Let’s Build Something Great Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base md:text-lg text-slate-600 dark:text-slate-400"
          >
            Have an upcoming IT procurement need, surveillance setup, or network issue? Contact us today to receive a free consultations audit session and custom quote.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side: Contact Information & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="font-outfit text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Office Information
              </h3>
              
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-royal/5 dark:bg-primary-royal/10 border border-primary-royal/20 flex items-center justify-center text-primary-royal dark:text-accent-cyan shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit font-bold text-sm text-slate-400 uppercase tracking-wide">
                    Office Address
                  </span>
                  <span className="font-inter text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                    ZERO ERROR IT SOLUTIONS,<br />
                    Near Municipal Office, Nellore,<br />
                    Andhra Pradesh, India
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-royal/5 dark:bg-primary-royal/10 border border-primary-royal/20 flex items-center justify-center text-primary-royal dark:text-accent-cyan shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit font-bold text-sm text-slate-400 uppercase tracking-wide">
                    Phone Numbers
                  </span>
                  <a
                    href="tel:+918184846379"
                    className="font-inter text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-royal dark:hover:text-accent-cyan transition-colors mt-1"
                  >
                    +91 81848 46379
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-royal/5 dark:bg-primary-royal/10 border border-primary-royal/20 flex items-center justify-center text-primary-royal dark:text-accent-cyan shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit font-bold text-sm text-slate-400 uppercase tracking-wide">
                    Support Email
                  </span>
                  <a
                    href="mailto:praveenrajgandham@gmail.com"
                    className="font-inter text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-royal dark:hover:text-accent-cyan transition-colors mt-1"
                  >
                    praveenrajgandham@gmail.com
                  </a>
                </div>
              </div>

              {/* Instant CTAs (WhatsApp & Direct Call) */}
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href="https://wa.me/918184846379?text=Hello%20Zero%20Error%20team,%20I'm%20interested%20in%20your%20IT%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs md:text-sm shadow-md transition-all group"
                >
                  <MessageSquare className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+918184846379"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-royal hover:bg-primary-electric text-white font-bold text-xs md:text-sm shadow-md transition-all group"
                >
                  <PhoneCall className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                  Call Support Line
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-sm">
              <iframe
                title="ZERO ERROR IT SOLUTIONS Location"
                src="https://maps.google.com/maps?q=Municipal%20Office,%20Nellore,%20Andhra%20Pradesh,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Side: Form Submission */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.02] shadow-xl md:shadow-2xl transition-all duration-300">
              <h3 className="font-outfit text-2xl font-bold text-slate-800 dark:text-white mb-6">
                Request Free Quote
              </h3>

              {isSubmitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-accent-green mb-4 animate-bounce" />
                  <h4 className="font-outfit text-xl font-bold text-slate-850 dark:text-white mb-2">
                    Inquiry Submitted Successfully!
                  </h4>
                  <p className="font-inter text-sm text-slate-650 dark:text-slate-400 max-w-sm">
                    Thank you for reaching out. A certified IT solutions advisor will review your project details and contact you within the next 2 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register('name')}
                        className={`px-4 py-3 rounded-xl border bg-white dark:bg-black/20 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-royal transition-all ${
                          errors.name ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] font-bold text-red-500">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        className={`px-4 py-3 rounded-xl border bg-white dark:bg-black/20 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-royal transition-all ${
                          errors.email ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] font-bold text-red-500">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        {...register('phone')}
                        className={`px-4 py-3 rounded-xl border bg-white dark:bg-black/20 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-royal transition-all ${
                          errors.phone ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] font-bold text-red-500">{errors.phone.message}</span>
                      )}
                    </div>

                    {/* Service Type Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">
                        Required Solution
                      </label>
                      <select
                        {...register('service')}
                        className={`px-4 py-3 rounded-xl border bg-white dark:bg-black/20 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-royal transition-all ${
                          errors.service ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                        }`}
                      >
                        <option value="" className="text-slate-700 bg-white dark:bg-bg-dark">Select a service...</option>
                        <option value="procurement" className="text-slate-700 bg-white dark:bg-bg-dark">IT Procurement (Hardware)</option>
                        <option value="infrastructure" className="text-slate-700 bg-white dark:bg-bg-dark">IT Infrastructure Setup</option>
                        <option value="cctv" className="text-slate-700 bg-white dark:bg-bg-dark">CCTV & Surveillance Systems</option>
                        <option value="network" className="text-slate-700 bg-white dark:bg-bg-dark">Network Design & Security</option>
                        <option value="amc" className="text-slate-700 bg-white dark:bg-bg-dark">Annual Maintenance Contract (AMC)</option>
                        <option value="consulting" className="text-slate-700 bg-white dark:bg-bg-dark">IT Consulting & Auditing</option>
                        <option value="support" className="text-slate-700 bg-white dark:bg-bg-dark">24/7 Technical Support</option>
                        <option value="bulk" className="text-slate-700 bg-white dark:bg-bg-dark">Bulk Supply (Govt / Corporate)</option>
                      </select>
                      {errors.service && (
                        <span className="text-[11px] font-bold text-red-500">{errors.service.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">
                      Project Requirements
                    </label>
                    <textarea
                      id="form-message"
                      rows={5}
                      placeholder="Please details your requirements here..."
                      {...register('message')}
                      className={`px-4 py-3 rounded-xl border bg-white dark:bg-black/20 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-royal transition-all ${
                        errors.message ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] font-bold text-red-500">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-white overflow-hidden group shadow-[0_10px_20px_rgba(21,101,255,0.25)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-royal to-primary-electric transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-primary-royal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
