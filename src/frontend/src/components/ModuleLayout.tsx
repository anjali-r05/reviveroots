import { Button } from "@/components/ui/button";
import type { AppRoute } from "@/types/index";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Home } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

export type ModuleAccent =
  | "purple"
  | "indigo"
  | "cyan"
  | "amber"
  | "coral"
  | "saffron"
  | "terracotta"
  | "magenta";

const accentConfig: Record<
  ModuleAccent,
  {
    orb1: string;
    orb2: string;
    headerBg: string;
    titleClass: string;
    iconBg: string;
    glassClass: string;
    borderClass: string;
    badgeBg: string;
  }
> = {
  purple: {
    orb1: "bg-[oklch(0.45_0.25_295/0.18)]",
    orb2: "bg-[oklch(0.55_0.18_280/0.12)]",
    headerBg: "bg-[oklch(0.10_0.06_280)]",
    titleClass: "gradient-text-purple",
    iconBg: "bg-[oklch(0.45_0.25_295/0.25)] border-[oklch(0.45_0.25_295/0.4)]",
    glassClass: "glass-purple",
    borderClass: "border-purple",
    badgeBg: "bg-[oklch(0.45_0.25_295/0.15)] text-[oklch(0.75_0.12_295)]",
  },
  indigo: {
    orb1: "bg-[oklch(0.40_0.20_275/0.18)]",
    orb2: "bg-[oklch(0.50_0.20_270/0.12)]",
    headerBg: "bg-[oklch(0.09_0.06_270)]",
    titleClass: "gradient-text-indigo",
    iconBg: "bg-[oklch(0.40_0.20_275/0.25)] border-[oklch(0.40_0.20_275/0.4)]",
    glassClass: "glass-indigo",
    borderClass: "border-indigo",
    badgeBg: "bg-[oklch(0.40_0.20_275/0.15)] text-[oklch(0.72_0.12_270)]",
  },
  cyan: {
    orb1: "bg-[oklch(0.65_0.15_200/0.18)]",
    orb2: "bg-[oklch(0.55_0.18_195/0.12)]",
    headerBg: "bg-[oklch(0.10_0.06_200)]",
    titleClass: "gradient-text-cyan",
    iconBg: "bg-[oklch(0.65_0.15_200/0.25)] border-[oklch(0.65_0.15_200/0.4)]",
    glassClass: "glass-cyan",
    borderClass: "border-cyan",
    badgeBg: "bg-[oklch(0.65_0.15_200/0.15)] text-[oklch(0.80_0.12_200)]",
  },
  amber: {
    orb1: "bg-[oklch(0.72_0.20_80/0.18)]",
    orb2: "bg-[oklch(0.65_0.18_75/0.12)]",
    headerBg: "bg-[oklch(0.10_0.05_70)]",
    titleClass: "gradient-text-amber",
    iconBg: "bg-[oklch(0.72_0.20_80/0.25)] border-[oklch(0.72_0.20_80/0.4)]",
    glassClass: "glass-amber",
    borderClass: "border-amber",
    badgeBg: "bg-[oklch(0.72_0.20_80/0.15)] text-[oklch(0.85_0.14_80)]",
  },
  coral: {
    orb1: "bg-[oklch(0.62_0.20_25/0.18)]",
    orb2: "bg-[oklch(0.55_0.18_20/0.12)]",
    headerBg: "bg-[oklch(0.10_0.05_20)]",
    titleClass: "gradient-text-coral",
    iconBg: "bg-[oklch(0.62_0.20_25/0.25)] border-[oklch(0.62_0.20_25/0.4)]",
    glassClass: "glass-coral",
    borderClass: "border-coral",
    badgeBg: "bg-[oklch(0.62_0.20_25/0.15)] text-[oklch(0.80_0.14_25)]",
  },
  saffron: {
    orb1: "bg-[oklch(0.75_0.18_65/0.18)]",
    orb2: "bg-[oklch(0.68_0.20_60/0.12)]",
    headerBg: "bg-[oklch(0.10_0.05_60)]",
    titleClass: "gradient-text-saffron",
    iconBg: "bg-[oklch(0.75_0.18_65/0.25)] border-[oklch(0.75_0.18_65/0.4)]",
    glassClass: "glass-saffron",
    borderClass: "border-saffron",
    badgeBg: "bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.88_0.14_65)]",
  },
  terracotta: {
    orb1: "bg-[oklch(0.52_0.18_35/0.18)]",
    orb2: "bg-[oklch(0.60_0.16_40/0.12)]",
    headerBg: "bg-[oklch(0.10_0.05_35)]",
    titleClass: "gradient-text",
    iconBg: "bg-[oklch(0.52_0.18_35/0.25)] border-[oklch(0.52_0.18_35/0.4)]",
    glassClass: "glass-dark",
    borderClass: "border-[oklch(0.52_0.18_35/0.4)]",
    badgeBg: "bg-[oklch(0.52_0.18_35/0.15)] text-[oklch(0.78_0.14_35)]",
  },
  magenta: {
    orb1: "bg-[oklch(0.50_0.28_330/0.18)]",
    orb2: "bg-[oklch(0.60_0.22_325/0.12)]",
    headerBg: "bg-[oklch(0.09_0.06_330)]",
    titleClass: "gradient-text-magenta",
    iconBg: "bg-[oklch(0.50_0.28_330/0.25)] border-[oklch(0.50_0.28_330/0.4)]",
    glassClass: "glass-magenta",
    borderClass: "border-magenta",
    badgeBg: "bg-[oklch(0.50_0.28_330/0.15)] text-[oklch(0.78_0.14_330)]",
  },
};

interface ModuleLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: ModuleAccent;
  badge?: string;
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
  children: ReactNode;
  heroContent?: ReactNode;
}

export function ModuleLayout({
  title,
  subtitle,
  icon: Icon,
  accent,
  badge,
  onNavigateHome,
  children,
  heroContent,
}: ModuleLayoutProps) {
  const cfg = accentConfig[accent];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-background font-body overflow-x-hidden"
      >
        {/* Module Hero Header */}
        <div
          className={`relative overflow-hidden ${cfg.headerBg} pt-16 pb-10 md:pb-16`}
        >
          {/* Floating orbs — hidden on mobile */}
          <div
            className={`hidden sm:block absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl ${cfg.orb1} pointer-events-none`}
          />
          <div
            className={`hidden sm:block absolute -bottom-12 -right-12 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl ${cfg.orb2} pointer-events-none`}
          />
          <div className="absolute inset-0 bg-[oklch(0.12_0.08_260/0.4)] pointer-events-none" />

          <div className="relative container mx-auto px-4 sm:px-6">
            {/* Back nav — truncate long title on mobile */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-hidden"
            >
              <button
                type="button"
                data-ocid="module.back_button"
                onClick={onNavigateHome}
                className="flex items-center gap-1.5 text-sm text-[oklch(0.99_0.005_240/0.6)] hover:text-[oklch(0.99_0.005_240)] transition-colors duration-200 group flex-shrink-0 min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden xs:inline">Back</span>
              </button>
              <span className="text-[oklch(0.99_0.005_240/0.2)] flex-shrink-0">
                /
              </span>
              <button
                type="button"
                data-ocid="module.home_link"
                onClick={onNavigateHome}
                className="flex items-center gap-1 text-sm text-[oklch(0.99_0.005_240/0.6)] hover:text-[oklch(0.99_0.005_240)] transition-colors duration-200 flex-shrink-0 min-h-[44px]"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <span className="text-[oklch(0.99_0.005_240/0.2)] flex-shrink-0">
                /
              </span>
              <span className="text-sm text-[oklch(0.99_0.005_240/0.8)] truncate min-w-0">
                {title}
              </span>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-10">
              {/* Icon + title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center ${cfg.iconBg} shadow-glow-sm flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[oklch(0.95_0.01_240)]" />
                  </div>
                  {badge && (
                    <span
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${cfg.badgeBg}`}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                <h1
                  className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 leading-tight ${cfg.titleClass}`}
                >
                  {title}
                </h1>
                <p className="text-[oklch(0.99_0.005_240/0.65)] text-base sm:text-lg max-w-2xl leading-relaxed font-body">
                  {subtitle}
                </p>
              </motion.div>

              {/* Optional hero content (stats, CTA) */}
              {heroContent && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="md:flex-shrink-0"
                >
                  {heroContent}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 py-8 md:py-14"
        >
          {children}
        </motion.main>

        {/* Module Footer */}
        <footer className="bg-card border-t border-border mt-12 sm:mt-16 py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              data-ocid="module.footer_home_link"
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group min-h-[44px]"
            >
              <Home className="w-4 h-4" />
              <span>ReviveRoots</span>
            </button>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ReviveRoots. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
