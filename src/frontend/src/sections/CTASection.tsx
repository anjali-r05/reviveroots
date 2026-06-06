import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface CTASectionProps {
  onNavigateSignup?: () => void;
}

export function CTASection({ onNavigateSignup }: CTASectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-28 relative overflow-hidden bg-deep-blue">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-heritage-revival.dim_1400x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 hero-gradient-overlay opacity-95" />

      {/* Floating glowing blobs */}
      <motion.div
        className="absolute left-1/4 top-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.22 86 / 0.12) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 4,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-1/4 top-1/3 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.60 0.16 40 / 0.10) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">
              Start Your Journey
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[oklch(0.99_0.005_240)] italic leading-[1.05] mb-5 sm:mb-6">
            Your Roots <span className="gradient-text-gold">Deserve</span>
            <br />a Future
          </h2>

          <p className="text-base sm:text-lg text-[oklch(0.99_0.005_240/0.65)] max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12">
            Join 300+ contributors who are already preserving the world's most
            precious cultural traditions for generations to come.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              data-ocid="cta.join_revival_button"
              size="lg"
              onClick={onNavigateSignup}
              className="btn-ripple w-full sm:w-auto bg-gradient-to-r from-[oklch(0.68_0.22_86)] to-[oklch(0.72_0.20_80)] text-[oklch(0.12_0.08_260)] font-semibold text-base px-8 sm:px-10 min-h-[52px] shadow-glow hover:shadow-glow border-0 gap-2 transition-all duration-300"
            >
              Join the Revival
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              data-ocid="cta.explore_button"
              size="lg"
              variant="outline"
              onClick={() => scrollTo("explore")}
              className="w-full sm:w-auto border-[oklch(0.99_0.005_240/0.25)] text-[oklch(0.99_0.005_240)] bg-transparent hover:bg-[oklch(0.99_0.005_240/0.08)] font-medium text-base px-8 sm:px-10 min-h-[52px]"
            >
              Explore Heritage
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {[
              { label: "No credit card required" },
              { label: "Free community access" },
              { label: "Open source contributions" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-[oklch(0.99_0.005_240/0.50)] text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.68_0.22_86)]" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
