import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { testimonials } from "../data";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () =>
    setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-5"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.22 86) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

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
            Community Voices
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl text-foreground italic mb-4">
            Stories of <span className="gradient-text-gold">Revival</span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-10">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            data-ocid="testimonials.featured_card"
            className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-border shadow-premium relative"
          >
            <Quote className="absolute top-5 right-5 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 text-[oklch(0.68_0.22_86/0.15)]" />

            {/* Stars */}
            <div className="flex gap-1 mb-4 sm:mb-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={`t-star-${n}`}
                  className="w-4 h-4 fill-[oklch(0.68_0.22_86)] text-[oklch(0.68_0.22_86)]"
                />
              ))}
            </div>

            <blockquote className="font-display text-base sm:text-xl italic text-foreground leading-relaxed mb-6 sm:mb-8">
              "{testimonials[active].quote}"
            </blockquote>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[oklch(0.68_0.22_86/0.15)] flex items-center justify-center font-bold text-gold font-display text-base sm:text-lg flex-shrink-0">
                {testimonials[active].avatar}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">
                  {testimonials[active].name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {testimonials[active].role} · {testimonials[active].location}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls + dots */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            data-ocid="testimonials.prev_button"
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted hover:text-gold transition-smooth flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={`dot-${t.id}`}
                type="button"
                data-ocid={`testimonials.dot.${i + 1}`}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-6 h-2.5 bg-[oklch(0.68_0.22_86)]"
                    : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            data-ocid="testimonials.next_button"
            onClick={next}
            className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted hover:text-gold transition-smooth flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* All testimonial mini cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12"
          data-ocid="testimonials.list"
        >
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              type="button"
              data-ocid={`testimonials.item.${i + 1}`}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`text-left p-4 rounded-xl border transition-smooth ${
                active === i
                  ? "border-[oklch(0.68_0.22_86/0.50)] bg-[oklch(0.68_0.22_86/0.06)]"
                  : "border-border bg-card hover:border-[oklch(0.68_0.22_86/0.30)]"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-[oklch(0.68_0.22_86/0.12)] flex items-center justify-center text-xs font-bold text-gold">
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                "{t.quote}"
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
