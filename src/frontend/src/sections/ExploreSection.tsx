import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Landmark,
  Languages,
  Mic,
  Palette,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { heritageCategories } from "../data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages,
  Star,
  Palette,
  UtensilsCrossed,
  Landmark,
  Mic,
};

export function ExploreSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="explore" className="py-24 bg-background bg-pattern-subtle">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-[oklch(0.68_0.22_86/0.10)] text-[oklch(0.60_0.16_40)] border-[oklch(0.68_0.22_86/0.20)] uppercase tracking-widest text-xs"
          >
            Heritage Categories
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 italic">
            Explore Our{" "}
            <span className="gradient-text-gold">Living Archive</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Navigate through thousands of preserved traditions across six
            distinct heritage domains.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="explore.categories_list"
        >
          {heritageCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            const isHovered = hovered === cat.id;
            return (
              <motion.div
                key={cat.id}
                data-ocid={`explore.category.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative rounded-2xl overflow-hidden card-hover cursor-pointer border border-border shadow-card"
              >
                {/* Background gradient layer */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 transition-all duration-300 ${
                      isHovered
                        ? "bg-[oklch(0.68_0.22_86)] shadow-glow-sm"
                        : "bg-[oklch(0.68_0.22_86/0.10)]"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`w-7 h-7 transition-colors duration-300 ${
                          isHovered
                            ? "text-[oklch(0.12_0.08_260)]"
                            : "text-gold"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl text-foreground mb-2 italic group-hover:text-[oklch(0.20_0.12_86)] transition-colors duration-300">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[oklch(0.68_0.22_86/0.08)] text-[oklch(0.40_0.12_86)] border-0"
                    >
                      {cat.count} entries
                    </Badge>
                    <ArrowRight
                      className={`w-4 h-4 text-gold transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
