import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Tag, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { communityStories } from "../data";

interface StoryVaultSectionProps {
  onNavigateSignup?: () => void;
}

export function StoryVaultSection({
  onNavigateSignup,
}: StoryVaultSectionProps) {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="stories" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <Badge
              variant="secondary"
              className="mb-4 bg-[oklch(0.68_0.22_86/0.10)] text-[oklch(0.45_0.14_86)] border-[oklch(0.68_0.22_86/0.20)] uppercase tracking-widest text-xs"
            >
              Community Story Vault
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl text-foreground italic">
              Living <span className="gradient-text-gold">Memories</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Real stories from real people, preserving the threads of heritage
              that connect us all.
            </p>
          </div>
          <Button
            data-ocid="stories.preserve_legacy_button"
            onClick={onNavigateSignup}
            className="btn-ripple bg-gradient-to-r from-[oklch(0.68_0.22_86)] to-[oklch(0.72_0.20_80)] text-[oklch(0.12_0.08_260)] font-semibold border-0 shadow-elevated gap-2 shrink-0"
          >
            <Upload className="w-4 h-4" />
            Preserve Your Legacy
          </Button>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          data-ocid="stories.list"
        >
          {communityStories.map((story, i) => (
            <motion.article
              key={story.id}
              data-ocid={`stories.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card border border-border card-hover group"
            >
              {/* Image — responsive height */}
              <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.08_260/0.6)] to-transparent" />
                <Badge className="absolute top-3 left-3 bg-[oklch(0.12_0.08_260/0.7)] text-[oklch(0.99_0.005_240)] border-0 text-xs backdrop-blur-sm">
                  {story.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg text-foreground italic mb-2 line-clamp-2 group-hover:text-[oklch(0.45_0.14_86)] transition-colors duration-300">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {story.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">
                    {story.author}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {story.location}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {story.date}
                  </span>
                  <button
                    type="button"
                    data-ocid={`stories.like_button.${i + 1}`}
                    onClick={() => toggleLike(story.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-smooth ${
                      likedStories.has(story.id)
                        ? "text-[oklch(0.60_0.16_40)]"
                        : "text-muted-foreground hover:text-[oklch(0.60_0.16_40)]"
                    }`}
                    aria-label={`Like story: ${story.title}`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${likedStories.has(story.id) ? "fill-current scale-110" : ""}`}
                    />
                    {story.likes + (likedStories.has(story.id) ? 1 : 0)}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
