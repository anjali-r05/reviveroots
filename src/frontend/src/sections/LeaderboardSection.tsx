import { Badge } from "@/components/ui/badge";
import { Award, Crown, Medal, Shield, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { champions } from "../data";
import type { ChampionBadge } from "../types";

const badgeConfig: Record<
  ChampionBadge,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  "revival-master": {
    label: "Revival Master",
    icon: Crown,
    color: "text-[oklch(0.68_0.22_86)]",
    bg: "bg-[oklch(0.68_0.22_86/0.15)]",
  },
  "heritage-keeper": {
    label: "Heritage Keeper",
    icon: Shield,
    color: "text-[oklch(0.60_0.16_40)]",
    bg: "bg-[oklch(0.60_0.16_40/0.15)]",
  },
  gold: {
    label: "Gold",
    icon: Trophy,
    color: "text-[oklch(0.72_0.22_86)]",
    bg: "bg-[oklch(0.72_0.22_86/0.12)]",
  },
  silver: {
    label: "Silver",
    icon: Medal,
    color: "text-[oklch(0.55_0.02_240)]",
    bg: "bg-[oklch(0.55_0.02_240/0.12)]",
  },
  bronze: {
    label: "Bronze",
    icon: Award,
    color: "text-[oklch(0.55_0.12_50)]",
    bg: "bg-[oklch(0.55_0.12_50/0.12)]",
  },
};

const positionColors = [
  "text-[oklch(0.68_0.22_86)]",
  "text-[oklch(0.75_0.02_240)]",
  "text-[oklch(0.55_0.12_50)]",
];

export function LeaderboardSection() {
  return (
    <section id="impact" className="py-24 bg-muted/20">
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
            className="mb-4 bg-[oklch(0.68_0.22_86/0.10)] text-[oklch(0.45_0.14_86)] border-[oklch(0.68_0.22_86/0.20)] uppercase tracking-widest text-xs"
          >
            Cultural Champions
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl text-foreground italic mb-4">
            Guardians of <span className="gradient-text-gold">Heritage</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Celebrating the community members who contribute most to preserving
            our shared cultural legacy.
          </p>
        </motion.div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mb-10">
          {champions.slice(0, 3).map((champ, i) => {
            const {
              icon: BadgeIcon,
              color,
              bg,
              label,
            } = badgeConfig[champ.badge];
            const heights = ["mt-4", "mt-0", "mt-8"];
            return (
              <motion.div
                key={champ.id}
                data-ocid={`leaderboard.podium.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col items-center ${heights[i]}`}
              >
                <div
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full ${bg} border-2 border-[oklch(0.68_0.22_86/0.30)] flex items-center justify-center mb-2 sm:mb-3 shadow-elevated`}
                >
                  <span
                    className={`font-display text-base sm:text-xl font-bold ${color}`}
                  >
                    {champ.avatar}
                  </span>
                  <div
                    className={`absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full ${bg} border border-border flex items-center justify-center`}
                  >
                    <span
                      className={`text-[10px] sm:text-xs font-bold ${positionColors[i] ?? "text-muted-foreground"}`}
                    >
                      {i + 1}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground text-center leading-tight mb-1 px-0.5">
                  {champ.name}
                </p>
                <div
                  className={`hidden xs:flex items-center gap-1 text-xs ${color} mb-1`}
                >
                  <BadgeIcon className="w-3 h-3" />
                  <span className="text-[10px] sm:text-xs">{label}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                  {champ.contributions}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Full list */}
        <div
          className="max-w-3xl mx-auto space-y-3"
          data-ocid="leaderboard.list"
        >
          {champions.map((champ, i) => {
            const {
              icon: BadgeIcon,
              color,
              bg,
              label,
            } = badgeConfig[champ.badge];
            return (
              <motion.div
                key={champ.id}
                data-ocid={`leaderboard.item.${i + 1}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-4 bg-card rounded-xl px-5 py-4 border border-border shadow-card hover:shadow-elevated transition-smooth group"
              >
                {/* Rank */}
                <span
                  className={`text-lg font-display font-bold w-8 text-center ${positionColors[i] ?? "text-muted-foreground"}`}
                >
                  {i + 1}
                </span>

                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center font-semibold text-sm ${color} shrink-0`}
                >
                  {champ.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {champ.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {champ.location} · Since {champ.joinDate}
                  </p>
                </div>

                {/* Badge */}
                <div
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full ${bg}`}
                >
                  <BadgeIcon className={`w-3.5 h-3.5 ${color}`} />
                  <span className={`text-xs font-medium ${color}`}>
                    {label}
                  </span>
                </div>

                {/* Stats */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">
                    {champ.contributions}
                  </p>
                  <p className="text-xs text-muted-foreground">contributions</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
