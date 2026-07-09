'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Briefcase, Heart, Clock, Award } from 'lucide-react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const statsData: StatItem[] = [
  {
    value: 100,
    suffix: '+',
    label: 'Corporate Projects',
    icon: Briefcase,
    color: 'text-primary-electric',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Happy Clients',
    icon: Heart,
    color: 'text-accent-violet',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Technical Support',
    icon: Clock,
    color: 'text-accent-cyan',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Customer Satisfaction',
    icon: Award,
    color: 'text-accent-green',
  },
];

function Counter({ value, suffix, duration = 1.5 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / (duration * 1000), 1);
      
      // Easing out quadratic
      const easedProgress = progressRatio * (2 - progressRatio);
      
      setCount(Math.floor(easedProgress * value));

      if (progressRatio < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-outfit font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight">
      {count}
      <span className="text-primary-electric dark:text-accent-cyan">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 bg-slate-900 text-white overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-primary-royal/20 glow-orb" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-accent-cyan/20 glow-orb" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center text-center">
          {statsData.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i}
                className="flex flex-col items-center p-4"
              >
                {/* Icon Wrapper */}
                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${stat.color} shadow-lg shadow-black/25`}>
                  <IconComp className="w-5.5 h-5.5" />
                </div>
                
                {/* Counter Value */}
                <div className="mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Counter Label */}
                <span className="font-inter text-xs md:text-sm font-semibold tracking-wide text-slate-400 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
