import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Clock,
  Play,
  Send,
  Shield,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { searchAIResponse } from "../data";
import type { AIResponse, AIVideo } from "../types";

const SUGGESTIONS = [
  "Bharatanatyam",
  "Kalaripayattu",
  "Madhubani Art",
  "Japanese Noh",
  "Māori Tā Moko",
  "Welsh Language Revival",
  "Balinese Kecak",
  "Jamdani Weaving",
];

const INFO_PANELS = [
  {
    key: "background" as const,
    label: "Historical Background",
    color: "text-[oklch(0.80_0.15_86)]",
    borderColor: "border-[oklch(0.80_0.15_86/0.25)]",
  },
  {
    key: "decline" as const,
    label: "Why It Declined",
    color: "text-[oklch(0.75_0.18_40)]",
    borderColor: "border-[oklch(0.75_0.18_40/0.25)]",
  },
  {
    key: "revivalStrategy" as const,
    label: "Revival Strategy",
    color: "text-[oklch(0.75_0.18_155)]",
    borderColor: "border-[oklch(0.75_0.18_155/0.25)]",
  },
  {
    key: "tourismOpportunities" as const,
    label: "Tourism Opportunities",
    color: "text-[oklch(0.72_0.18_220)]",
    borderColor: "border-[oklch(0.72_0.18_220/0.25)]",
  },
];

function VideoCard({ video, index }: { video: AIVideo; index: number }) {
  const [playing, setPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const thumbSrc = thumbError
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl overflow-hidden border border-[oklch(0.68_0.22_86/0.20)] bg-[oklch(0.10_0.06_260/0.60)] flex flex-col"
    >
      {/* Click-to-play thumbnail / iframe player */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            aria-label={`Play ${video.title}`}
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.68_0.22_86)]"
          >
            {/* Thumbnail image */}
            <img
              src={thumbSrc}
              alt={video.title}
              onError={() => setThumbError(true)}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <span className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.06_260/0.70)] via-transparent to-transparent" />
            {/* Play button circle */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-[oklch(0.15_0.06_260/0.80)] border-2 border-[oklch(0.68_0.22_86/0.60)] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[oklch(0.68_0.22_86)] transition-all duration-200">
                <Play className="w-6 h-6 text-[oklch(0.68_0.22_86)] fill-[oklch(0.68_0.22_86)] ml-1" />
              </span>
            </span>
            {/* YouTube logo badge */}
            <span className="absolute bottom-2 right-2 bg-[oklch(0.08_0.06_260/0.85)] rounded px-1.5 py-0.5 text-[10px] font-bold text-[oklch(0.65_0.20_25)] uppercase tracking-wider">
              YouTube
            </span>
          </button>
        )}
      </div>
      {/* Video metadata */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-[oklch(0.80_0.20_86)] leading-snug line-clamp-2 flex-1">
            {video.title}
          </h4>
          <span className="flex items-center gap-1 text-[10px] text-[oklch(0.99_0.005_240/0.45)] flex-shrink-0 bg-[oklch(0.99_0.005_240/0.06)] px-2 py-0.5 rounded-full">
            <Clock className="w-2.5 h-2.5" />
            {video.duration}
          </span>
        </div>
        <p className="text-xs text-[oklch(0.99_0.005_240/0.55)] leading-relaxed line-clamp-2">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}

export function AIAssistantSection() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");

  const handleSearch = (query?: string) => {
    const q = (query ?? input).trim();
    if (!q) return;
    setLoading(true);
    setInput(q);
    setActiveQuery(q);
    // Simulate a brief AI "thinking" delay for UX
    setTimeout(() => {
      const result = searchAIResponse(q);
      setResponse(result);
      setLoading(false);
    }, 900);
  };

  return (
    <section className="py-16 sm:py-24 bg-deep-blue relative overflow-hidden">
      {/* Decorative gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(0.68 0.22 86 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">
              AI Heritage Assistant
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[oklch(0.99_0.005_240)] italic mb-4">
            Ask About Any{" "}
            <span className="gradient-text-gold">Lost Tradition</span>
          </h2>
          <p className="text-[oklch(0.99_0.005_240/0.55)] max-w-xl mx-auto text-sm sm:text-base">
            Explore 20+ world heritage traditions with accurate, detailed
            information and curated documentary videos for every topic.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <Input
              data-ocid="ai_assistant.search_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. Bharatanatyam, Japanese Noh, Welsh language, Maori tattoo…"
              className="flex-1 h-12 sm:h-14 text-base glass-dark text-[oklch(0.99_0.005_240)] placeholder:text-[oklch(0.99_0.005_240/0.35)] border-[oklch(0.68_0.22_86/0.25)] focus:border-[oklch(0.68_0.22_86/0.60)] bg-[oklch(0.12_0.08_260/0.50)]"
            />
            <Button
              data-ocid="ai_assistant.search_button"
              onClick={() => handleSearch()}
              size="lg"
              disabled={loading}
              className="h-12 sm:h-14 px-5 sm:px-6 bg-gradient-to-r from-[oklch(0.68_0.22_86)] to-[oklch(0.72_0.20_80)] text-[oklch(0.12_0.08_260)] font-semibold border-0 shadow-glow min-h-[48px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[oklch(0.12_0.08_260)] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </motion.div>

          {/* Suggestion Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide"
          >
            <span className="text-xs text-[oklch(0.99_0.005_240/0.40)] self-center mr-1 flex-shrink-0">
              Try:
            </span>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={s}
                type="button"
                data-ocid={`ai_assistant.suggestion.${i + 1}`}
                onClick={() => handleSearch(s)}
                className="text-xs px-3 py-1.5 rounded-full glass-gold text-[oklch(0.68_0.22_86)] hover:bg-[oklch(0.68_0.22_86/0.20)] transition-smooth flex-shrink-0 min-h-[36px]"
              >
                {s}
              </button>
            ))}
          </motion.div>

          {/* Loading skeleton */}
          {loading && (
            <div
              data-ocid="ai_assistant.loading_state"
              className="glass-dark rounded-2xl p-8 border border-[oklch(0.68_0.22_86/0.20)] animate-pulse"
            >
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-[oklch(0.99_0.005_240/0.08)] rounded w-3/4" />
                <div className="h-3 bg-[oklch(0.99_0.005_240/0.06)] rounded w-1/2" />
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="h-28 bg-[oklch(0.99_0.005_240/0.05)] rounded-xl"
                  />
                ))}
              </div>
              <div className="h-5 bg-[oklch(0.68_0.22_86/0.10)] rounded w-40 mb-4" />
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-48 bg-[oklch(0.99_0.005_240/0.04)] rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Response panel */}
          <AnimatePresence>
            {response && !loading && (
              <motion.div
                key={activeQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                data-ocid="ai_assistant.response_panel"
                className="glass-dark rounded-2xl p-5 sm:p-8 border border-[oklch(0.68_0.22_86/0.20)]"
              >
                {/* Tradition header */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.68_0.22_86)] to-[oklch(0.60_0.16_40)] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[oklch(0.12_0.08_260)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[oklch(0.68_0.22_86)] font-semibold uppercase tracking-wider">
                      AI Heritage Analysis
                    </p>
                    <h3 className="font-display text-base sm:text-lg text-[oklch(0.99_0.005_240)] italic truncate">
                      {response.tradition}
                    </h3>
                  </div>
                  <Badge className="ml-auto flex-shrink-0 bg-[oklch(0.68_0.22_86/0.15)] text-[oklch(0.68_0.22_86)] border-0 text-xs">
                    Researched
                  </Badge>
                </div>

                {/* 4-panel info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
                  {INFO_PANELS.map(({ key, label, color, borderColor }) => (
                    <div
                      key={key}
                      className={`p-4 rounded-xl bg-[oklch(0.99_0.005_240/0.03)] border ${borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 ${color}`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider ${color}`}
                        >
                          {label}
                        </span>
                      </div>
                      <p className="text-sm text-[oklch(0.99_0.005_240/0.72)] leading-relaxed">
                        {response[key]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Watch & Learn — videos section */}
                {response.videos.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[oklch(0.68_0.22_86)] to-[oklch(0.60_0.16_40)] flex items-center justify-center flex-shrink-0">
                        <Play className="w-3.5 h-3.5 text-[oklch(0.12_0.08_260)] fill-[oklch(0.12_0.08_260)]" />
                      </div>
                      <h4 className="text-sm font-semibold text-[oklch(0.80_0.20_86)] uppercase tracking-wider">
                        Watch &amp; Learn
                      </h4>
                      <span className="text-xs text-[oklch(0.99_0.005_240/0.35)] ml-1">
                        — curated documentaries
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {response.videos.map((video, i) => (
                        <VideoCard
                          key={video.youtubeId}
                          video={video}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sources & Accuracy note */}
                <div className="flex items-start gap-2 pt-4 border-t border-[oklch(0.99_0.005_240/0.08)]">
                  <Shield className="w-3.5 h-3.5 text-[oklch(0.68_0.22_86/0.60)] flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[oklch(0.99_0.005_240/0.35)] leading-relaxed">
                    Information sourced from{" "}
                    <span className="text-[oklch(0.68_0.22_86/0.70)]">
                      UNESCO
                    </span>
                    , academic research, and cultural heritage institutions.
                    Videos are curated educational documentaries from trusted
                    channels.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
