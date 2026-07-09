'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, UploadCloud, CheckCircle, X, ChevronRight } from 'lucide-react';

interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
}

const defaultJobs: JobItem[] = [
  {
    id: '1',
    title: 'Junior Network Support Engineer',
    department: 'Networking & Infrastructure',
    location: 'Nellore, AP (On-site)',
    description: 'We are looking for a certified network engineer to manage corporate network switches, firewalls, and structured CAT6 client cabling installations.',
    requirements: [
      'Basic knowledge of Cisco CCNA / Network routing protocols.',
      'Hands-on experience crimping, routing, and testing structured cables.',
      'Strong client troubleshooting communication skills.',
    ],
  },
  {
    id: '2',
    title: 'CCTV Installation Technician',
    department: 'Surveillance & Hardware',
    location: 'Nellore, AP (On-site)',
    description: 'Join our physical setups team installing HD Hikvision CCTV cameras, configuring NVR storage disks, and setting up remote surveillance viewer applications.',
    requirements: [
      'Prior CCTV dome/bullet camera installation experience (1-2 years).',
      'Knowledge of PoE network adapters and routing cables.',
      'Possess a valid two-wheeler license for local client support runs.',
    ],
  },
  {
    id: '3',
    title: 'B2B IT Sales Representative',
    department: 'Corporate Sourcing',
    location: 'Nellore, AP (Hybrid)',
    description: 'Lead client acquisitions across schools, hospitals, and hotels in Nellore district, offering hardware deals (Laptops, Printers, UPS, AMC packages).',
    requirements: [
      'Proven sales records in corporate IT procurement or hardware licensing.',
      'Excellent Telugu and English speaking skills.',
      'Ability to draft corporate quotation sheets and handle negotiations.',
    ],
  },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/careers');
        const result = await response.json();
        if (response.ok && result.success && result.data.length > 0) {
          setJobs(result.data);
        } else {
          setJobs(defaultJobs);
        }
      } catch (err) {
        console.warn('Backend unavailable, utilizing local career listings:', err);
        setJobs(defaultJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !name || !email || !phone || !resumeFile) {
      alert('Please fill all required inputs and upload your resume.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Convert file to Base64
      const fileReader = new FileReader();
      fileReader.readAsDataURL(resumeFile);
      fileReader.onload = async () => {
        const base64Data = fileReader.result as string;

        // 2. Upload file to backend server
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileData: base64Data,
            fileName: resumeFile.name,
            fileType: resumeFile.type,
            folder: 'resumes',
          }),
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok || !uploadResult.success) {
          throw new Error(uploadResult.message || 'File upload failed.');
        }

        // 3. Submit Career Application
        const applyRes = await fetch('http://localhost:5000/api/careers/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            careerId: selectedJob.id,
            name,
            email,
            phone,
            resumeUrl: uploadResult.url,
            coverLetter,
          }),
        });

        const applyResult = await applyRes.json();

        if (applyRes.ok && applyResult.success) {
          setSubmitSuccess(true);
          setName('');
          setEmail('');
          setPhone('');
          setCoverLetter('');
          setResumeFile(null);
          setTimeout(() => {
            setSubmitSuccess(false);
            setSelectedJob(null);
          }, 3500);
        } else {
          alert(applyResult.message || 'Failed to submit application.');
        }
      };
    } catch (err: any) {
      console.error('Job application submission error:', err);
      alert(err.message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-200 transition-colors">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        {/* Banner */}
        <section className="relative overflow-hidden py-12 text-center">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h1 className="font-outfit text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-primary-navy dark:text-white">
              Work With <span className="text-gradient">Zero Error</span>
            </h1>
            <p className="font-inter text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Build your career alongside certified networking professionals and tech engineers in Nellore.
            </p>
          </div>
        </section>

        {/* Job Listings List */}
        <section className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ x: 4 }}
                  className="p-6 rounded-2xl bg-white dark:bg-bg-dark-card border border-black/5 dark:border-white/5 shadow-sm hover:border-primary-royal/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-primary-royal/10 dark:bg-primary-royal/20 text-primary-royal dark:text-accent-cyan text-[10px] font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <h3 className="font-outfit text-lg font-bold text-primary-navy dark:text-white">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] text-xs font-bold transition-all border border-black/5 dark:border-white/5"
                  >
                    <span>View Opening</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Application Modal Overlay */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-bg-dark border border-black/10 dark:border-white/10 shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute right-6 top-6 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {submitSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle className="w-16 h-16 text-accent-green mx-auto animate-bounce" />
                    <h3 className="font-outfit text-2xl font-bold">Application Received!</h3>
                    <p className="font-inter text-sm text-slate-500 dark:text-slate-400">
                      Thank you for applying. Our recruiting team will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{selectedJob.department}</span>
                      <h3 className="font-outfit text-2xl font-bold text-primary-navy dark:text-white mt-1">
                        Apply: {selectedJob.title}
                      </h3>
                      <p className="font-inter text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedJob.location}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-black/[0.02] dark:border-white/[0.02] space-y-2">
                      <p className="font-inter text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {selectedJob.description}
                      </p>
                      <div>
                        <p className="font-inter text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Requirements</p>
                        <ul className="space-y-1">
                          {selectedJob.requirements.map((req, rdx) => (
                            <li key={rdx} className="font-inter text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 mt-1.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Form */}
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal transition-all text-sm"
                            placeholder="Your Name"
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
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal transition-all text-sm"
                          placeholder="Your 10-digit number"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Cover Letter (Optional)</label>
                        <textarea
                          rows={3}
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:outline-none focus:border-primary-royal transition-all text-sm resize-none"
                          placeholder="Brief introduction or background..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Upload PDF Resume</label>
                        <div className="relative border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center hover:bg-slate-50/30 dark:hover:bg-white/[0.01] transition-all">
                          <input
                            type="file"
                            accept=".pdf"
                            required
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="font-inter text-xs font-semibold text-slate-600 dark:text-slate-400">
                            {resumeFile ? resumeFile.name : 'Click to select or drag PDF file here'}
                          </p>
                          <p className="font-inter text-[10px] text-slate-400 mt-1">Maximum file size: 5MB</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-royal to-primary-electric text-white text-sm font-bold shadow-md shadow-primary-royal/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            'Submit Application'
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
