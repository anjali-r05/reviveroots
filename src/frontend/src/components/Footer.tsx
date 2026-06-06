import { Leaf } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const footerLinks = {
  Platform: [
    "Explore Heritage",
    "Story Vault",
    "Artists Marketplace",
    "AI Assistant",
  ],
  Community: [
    "Contribute Stories",
    "Become a Champion",
    "Join Events",
    "Volunteer",
  ],
  Resources: ["Documentation", "Research Papers", "Press Kit", "Blog"],
  Company: ["About ReviveRoots", "Our Mission", "Team", "Contact Us"],
};

const socialLinks = [
  { icon: SiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: SiX, href: "https://x.com", label: "X_Twitter" },
  { icon: SiYoutube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-deep-blue text-[oklch(0.99_0.005_240)]">
      <div className="section-divider" />
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        {/* Top — 1-col mobile, 2-col sm, 3-col md, 5-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[oklch(0.68_0.22_86)] to-[oklch(0.60_0.16_40)] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[oklch(0.12_0.08_260)]" />
              </div>
              <span className="font-display text-xl font-semibold text-gold">
                ReviveRoots
              </span>
            </div>
            <p className="text-sm text-[oklch(0.99_0.005_240/0.55)] leading-relaxed mb-6 max-w-xs">
              Preserving the world's endangered traditions through technology,
              community, and storytelling.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center text-gold hover:bg-[oklch(0.68_0.22_86/0.20)] transition-smooth min-w-[44px] min-h-[44px]"
                  data-ocid={`footer.${label.toLowerCase()}_link`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="https://caffeine.ai"
                      className="text-sm text-[oklch(0.99_0.005_240/0.55)] hover:text-gold transition-smooth"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[oklch(0.99_0.005_240/0.10)] flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[oklch(0.99_0.005_240/0.40)]">
            © {year} ReviveRoots. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-[oklch(0.99_0.005_240/0.40)]">
            <a
              href="https://caffeine.ai"
              className="hover:text-gold transition-smooth"
            >
              Privacy Policy
            </a>
            <a
              href="https://caffeine.ai"
              className="hover:text-gold transition-smooth"
            >
              Terms of Service
            </a>
            <a
              href="https://caffeine.ai"
              className="hover:text-gold transition-smooth"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
