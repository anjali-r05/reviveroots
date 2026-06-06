import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, UserPlus } from "lucide-react";
import { motion } from "motion/react";

// Only use large orbs on non-mobile screens (controlled via className)
const floatingOrbs = [
  { id: "orb-1", size: 280, x: "10%", y: "20%", delay: 0, opacity: 0.12 },
  { id: "orb-2", size: 200, x: "75%", y: "10%", delay: 1, opacity: 0.1 },
  { id: "orb-3", size: 160, x: "85%", y: "55%", delay: 2, opacity: 0.08 },
];

interface HeroSectionProps {
  onNavigateSignup?: () => void;
}

export function HeroSection({ onNavigateSignup }: HeroSectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-heritage-revival.dim_1400x700.jpg')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient-overlay" />

      {/* Floating blobs — hidden on mobile for performance */}
      <div className="hidden sm:block">
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle, oklch(0.68 0.22 86 / ${orb.opacity}) 0%, transparent 70%)`,
            }}
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative dots pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.68 0.22 86) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-3 sm:px-4 py-1.5 mb-5 sm:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[oklch(0.68_0.22_86)] animate-pulse-glow" />
            <span className="text-[10px] sm:text-xs font-semibold text-[oklch(0.68_0.22_86)] uppercase tracking-widest">
              AI-Powered Cultural Revival
            </span>
          </motion.div>

          {/* Headline — scales from mobile to desktop */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[oklch(0.99_0.005_240)] leading-[1.05] mb-5 sm:mb-6"
          >
            Reviving Forgotten{" "}
            <span className="italic gradient-text-gold">Cultures,</span>
            <br />
            One Story at a Time
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg text-[oklch(0.99_0.005_240/0.70)] max-w-xl leading-relaxed mb-8 sm:mb-10"
          >
            Discover, document, and restore disappearing traditions through AI
            and community participation. Your roots deserve a future.
          </motion.p>

          {/* CTAs — stack on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            <Button
              data-ocid="hero.join_revival_button"
              onClick={onNavigateSignup}
              size="lg"
              className="btn-ripple w-full sm:w-auto bg-gradient-to-r from-[oklch(0.68_0.22_86)] to-[oklch(0.72_0.20_80)] text-[oklch(0.12_0.08_260)] font-bold text-base px-6 sm:px-8 min-h-[52px] shadow-glow hover:shadow-glow border-0 transition-all duration-300 gap-2 text-lg"
            >
              <UserPlus className="w-5 h-5" />
              Sign Up Free
            </Button>
            <Button
              data-ocid="hero.explore_heritage_button"
              onClick={() => scrollTo("explore")}
              size="lg"
              variant="outline"
              className="group w-full sm:w-auto border-[oklch(0.99_0.005_240/0.30)] text-[oklch(0.99_0.005_240)] bg-transparent hover:bg-[oklch(0.99_0.005_240/0.08)] font-medium text-base px-6 sm:px-8 min-h-[48px] gap-2"
            >
              <Sparkles className="w-4 h-4 transition-transform group-hover:scale-110" />
              Explore Heritage
            </Button>
          </motion.div>

          {/* Mini stats — scrollable row on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-6 sm:gap-8 overflow-x-auto pb-1 scrollbar-hide"
          >
            {[
              { num: "1,200+", text: "Stories" },
              { num: "75+", text: "Traditions" },
              { num: "22", text: "States" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col flex-shrink-0">
                <span className="text-xl sm:text-2xl font-display font-bold text-gold">
                  {item.num}
                </span>
                <span className="text-xs text-[oklch(0.99_0.005_240/0.55)] uppercase tracking-wider">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo("stats")}
        data-ocid="hero.scroll_down_button"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[oklch(0.99_0.005_240/0.50)] hover:text-gold transition-smooth min-h-[44px] min-w-[44px] justify-end pb-1"
        animate={{ y: [0, 6, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest hidden sm:block">
          Discover
        </span>
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
