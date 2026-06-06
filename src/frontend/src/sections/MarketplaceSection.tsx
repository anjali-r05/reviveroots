import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { artists } from "../data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={`star-${n}`}
          className={`w-3.5 h-3.5 ${n <= Math.floor(rating) ? "fill-[oklch(0.68_0.22_86)] text-[oklch(0.68_0.22_86)]" : "text-muted-foreground"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

export function MarketplaceSection() {
  return (
    <section id="artists" className="py-24 bg-background">
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
            Support Local Artisans
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl text-foreground italic mb-4">
            Heritage <span className="gradient-text-gold">Marketplace</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Buy directly from master artisans preserving centuries-old crafts.
            Every purchase funds a tradition.
          </p>
        </motion.div>

        {/* Artisan Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          data-ocid="marketplace.artists_list"
        >
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              data-ocid={`marketplace.artist.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border shadow-card overflow-hidden card-hover group"
            >
              {/* Cover image */}
              <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.craft}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.08_260/0.75)] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-[oklch(0.99_0.005_240)] text-lg italic font-medium">
                    {artist.craft}
                  </p>
                  <div className="flex items-center gap-1.5 text-[oklch(0.68_0.22_86)]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs text-[oklch(0.99_0.005_240/0.75)]">
                      {artist.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-base">
                      {artist.name}
                    </h3>
                    <StarRating rating={artist.rating} />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-muted text-muted-foreground border-0 shrink-0"
                  >
                    {artist.sales} sales
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {artist.bio}
                </p>

                <p className="text-xs font-semibold text-[oklch(0.45_0.14_86)] mb-4 uppercase tracking-wider">
                  Speciality: {artist.speciality}
                </p>

                {/* Products preview */}
                <div className="space-y-2 mb-5">
                  {artist.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                    >
                      <span className="text-sm text-foreground/80 truncate min-w-0">
                        {product.name}
                      </span>
                      <span className="text-sm font-semibold text-gold ml-2 shrink-0">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  data-ocid={`marketplace.shop_artist_button.${i + 1}`}
                  className="w-full bg-gradient-to-r from-[oklch(0.68_0.22_86)] to-[oklch(0.72_0.20_80)] text-[oklch(0.12_0.08_260)] font-semibold border-0 gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop Artisan
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
