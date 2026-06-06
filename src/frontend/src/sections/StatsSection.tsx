import { BookOpen, MapPin, Sparkles, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "../data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Sparkles,
  MapPin,
  Users,
};

function AnimatedCounter({
  target,
  suffix,
}: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="py-20 bg-deep-blue relative overflow-hidden">
      {/* Decorative gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.68 0.22 86 / 0.08) 0%, transparent 80%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-gold mb-3 block">
            Our Impact
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.99_0.005_240)] italic">
            Preserving Heritage at Scale
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          data-ocid="stats.section"
        >
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.label}
                data-ocid={`stats.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass-gold rounded-2xl p-4 sm:p-6 md:p-8 text-center group hover:bg-[oklch(0.68_0.22_86/0.15)] transition-smooth"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[oklch(0.68_0.22_86/0.15)] mb-4 group-hover:bg-[oklch(0.68_0.22_86/0.25)] transition-smooth">
                  {Icon && <Icon className="w-6 h-6 text-gold" />}
                </div>
                <div className="font-display text-4xl font-bold text-gold mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-[oklch(0.99_0.005_240/0.60)] font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
