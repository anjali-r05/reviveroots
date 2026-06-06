import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useGetUserProfile } from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import {
  BookOpen,
  Camera,
  ChevronDown,
  Cpu,
  LayoutDashboard,
  Leaf,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  Music,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const modules = [
  {
    route: "heritage-scanner" as AppRoute,
    label: "Heritage Scanner",
    description: "AI ancestry insights & identity",
    icon: Cpu,
    accent: "text-purple",
    glass: "glass-purple",
  },
  {
    route: "language-revival" as AppRoute,
    label: "Language Revival",
    description: "Learn lost languages with AI",
    icon: BookOpen,
    accent: "text-indigo",
    glass: "glass-indigo",
  },
  {
    route: "ar-time-travel" as AppRoute,
    label: "AR Time Travel",
    description: "See history through your camera",
    icon: Camera,
    accent: "text-cyan",
    glass: "glass-cyan",
  },
  {
    route: "storykeeper" as AppRoute,
    label: "Storykeeper",
    description: "Preserve family memories & stories",
    icon: Sparkles,
    accent: "text-amber",
    glass: "glass-amber",
  },
  {
    route: "traditions" as AppRoute,
    label: "Traditions",
    description: "Rediscover cultural customs",
    icon: Star,
    accent: "text-coral",
    glass: "glass-coral",
  },
  {
    route: "gurukul" as AppRoute,
    label: "Digital Gurukul",
    description: "Learn from verified cultural masters",
    icon: Music,
    accent: "text-saffron",
    glass: "glass-saffron",
  },
  {
    route: "marketplace" as AppRoute,
    label: "Marketplace",
    description: "Authentic artisan crafts & goods",
    icon: ShoppingBag,
    accent: "text-terracotta",
    glass: "glass-dark",
  },
  {
    route: "festival-planner" as AppRoute,
    label: "Festival Planner",
    description: "AI-powered festival celebrations",
    icon: MapPin,
    accent: "text-magenta",
    glass: "glass-magenta",
  },
];

interface NavbarProps {
  onNavigateSignup?: () => void;
  onNavigateLogin?: () => void;
  onNavigateHome?: () => void;
  onNavigate?: (route: AppRoute) => void;
}

export function Navbar({
  onNavigateSignup,
  onNavigateLogin,
  onNavigateHome,
  onNavigate,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [mobileModulesOpen, setMobileModulesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, logout, shortPrincipal } = useAuth();
  const { data: profile } = useGetUserProfile();

  const displayName = profile?.fullName
    ? profile.fullName.split(" ")[0]
    : "Roots Explorer";

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setModulesOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setModulesOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const id = href.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateTo = (route: AppRoute) => {
    setMobileOpen(false);
    setModulesOpen(false);
    setMobileModulesOpen(false);
    setUserMenuOpen(false);
    onNavigate?.(route);
  };

  const handleLogout = () => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    logout();
    onNavigateHome?.();
  };

  const handleSignInClick = () => {
    setMobileOpen(false);
    if (onNavigateLogin) onNavigateLogin();
  };

  const handleJoinClick = () => {
    setMobileOpen(false);
    if (onNavigateSignup) onNavigateSignup();
    else if (onNavigateLogin) onNavigateLogin();
  };

  const textClass = isScrolled
    ? "text-foreground/80 hover:text-foreground"
    : "text-[oklch(0.99_0.005_240/0.85)] hover:text-[oklch(0.68_0.22_86)]";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-elevated py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          data-ocid="navbar.logo_link"
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2 group flex-shrink-0 min-h-[44px]"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[oklch(0.68_0.22_86)] to-[oklch(0.60_0.16_40)] flex items-center justify-center shadow-glow-sm flex-shrink-0">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[oklch(0.12_0.08_260)]" />
          </div>
          <span
            className={`font-display text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-[oklch(0.99_0.005_240)]"
            }`}
          >
            ReviveRoots
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {(["#explore", "#stories", "#impact"] as const).map((href) => {
            const label = href.replace("#", "");
            return (
              <button
                key={href}
                type="button"
                data-ocid={`navbar.${label}_link`}
                onClick={() => scrollTo(href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-smooth capitalize ${textClass} hover:bg-[oklch(0.99_0.005_240/0.08)]`}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </button>
            );
          })}

          {/* Dashboard link — only when authenticated */}
          {isAuthenticated && (
            <button
              type="button"
              data-ocid="navbar.dashboard_link"
              onClick={() => navigateTo("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${textClass} hover:bg-[oklch(0.99_0.005_240/0.08)]`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </button>
          )}

          {/* Modules Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              data-ocid="navbar.modules_dropdown"
              onClick={() => setModulesOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${textClass} hover:bg-[oklch(0.99_0.005_240/0.08)]`}
            >
              Modules
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${modulesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {modulesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] glass shadow-premium rounded-2xl border border-border/40 p-4 grid grid-cols-2 gap-2"
                  data-ocid="navbar.modules_menu"
                >
                  {modules.map((mod) => (
                    <button
                      key={mod.route}
                      type="button"
                      data-ocid={`navbar.module.${mod.route}_link`}
                      onClick={() => navigateTo(mod.route)}
                      className="flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-smooth hover:bg-muted group"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg ${mod.glass} border border-border/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200`}
                      >
                        <mod.icon
                          className={`w-4 h-4 ${mod.accent}`}
                          size={16}
                        />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-sm font-semibold text-foreground leading-tight ${mod.accent}`}
                        >
                          {mod.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                          {mod.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop Auth CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isAuthenticated ? (
              <motion.div
                key="auth-logged-in"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                {/* User menu */}
                <div ref={userMenuRef} className="relative">
                  <button
                    type="button"
                    data-ocid="navbar.user_menu_button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-smooth hover:opacity-80"
                    style={{
                      background: "oklch(0.68 0.22 86 / 0.1)",
                      border: "1px solid oklch(0.68 0.22 86 / 0.25)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                        color: "oklch(0.12 0.08 260)",
                      }}
                    >
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className="text-sm font-medium max-w-[100px] truncate"
                      style={{
                        color: isScrolled
                          ? "oklch(0.2 0.06 260)"
                          : "oklch(0.99 0.005 240 / 0.85)",
                      }}
                    >
                      {displayName}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                      style={{
                        color: isScrolled
                          ? "oklch(0.4 0.04 260)"
                          : "oklch(0.99 0.005 240 / 0.5)",
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-2 w-52 glass shadow-premium rounded-xl border border-border/40 p-1.5 flex flex-col gap-0.5"
                        data-ocid="navbar.user_menu"
                      >
                        {shortPrincipal && (
                          <div
                            className="px-3 py-2 text-xs font-mono truncate"
                            style={{ color: "oklch(0.5 0.04 260)" }}
                          >
                            {shortPrincipal}
                          </div>
                        )}
                        <div
                          className="h-px mx-1 mb-1"
                          style={{ background: "oklch(0.88 0.01 240 / 0.4)" }}
                        />
                        <button
                          type="button"
                          data-ocid="navbar.profile_link"
                          onClick={() => navigateTo("profile")}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-muted"
                          style={{ color: "oklch(0.2 0.06 260)" }}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                        <button
                          type="button"
                          data-ocid="navbar.dashboard_menu_link"
                          onClick={() => navigateTo("dashboard")}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-muted"
                          style={{ color: "oklch(0.2 0.06 260)" }}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </button>
                        <div
                          className="h-px mx-1 my-0.5"
                          style={{ background: "oklch(0.88 0.01 240 / 0.4)" }}
                        />
                        <button
                          type="button"
                          data-ocid="navbar.logout_button"
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-muted"
                          style={{ color: "oklch(0.55 0.22 25)" }}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="auth-logged-out"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  data-ocid="navbar.login_text_button"
                  onClick={handleSignInClick}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-smooth ${
                    isScrolled
                      ? "border-[oklch(0.68_0.22_86/0.5)] text-foreground hover:text-[oklch(0.68_0.22_86)] hover:border-[oklch(0.68_0.22_86)]"
                      : "border-[oklch(0.99_0.005_240/0.35)] text-[oklch(0.99_0.005_240/0.90)] hover:border-[oklch(0.68_0.22_86/0.7)] hover:text-[oklch(0.68_0.22_86)]"
                  } hover:bg-[oklch(0.68_0.22_86/0.08)]`}
                >
                  Sign In
                </button>
                <Button
                  data-ocid="navbar.login_button"
                  onClick={handleJoinClick}
                  className="btn-ripple flex items-center gap-1.5 bg-gradient-to-r from-[oklch(0.68_0.22_86)] to-[oklch(0.72_0.20_80)] text-[oklch(0.12_0.08_260)] font-bold shadow-glow-sm hover:shadow-glow transition-all duration-300 border-0 px-5"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up Free
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          data-ocid="navbar.mobile_menu_toggle"
          className={`lg:hidden p-2 rounded-lg transition-smooth min-h-[44px] min-w-[44px] flex items-center justify-center ${
            isScrolled ? "text-foreground" : "text-[oklch(0.99_0.005_240)]"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/30 overflow-y-auto max-h-[80vh]"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {/* Home links */}
              {(["#explore", "#stories", "#impact"] as const).map((href) => {
                const label = href.replace("#", "");
                return (
                  <button
                    key={href}
                    type="button"
                    data-ocid={`navbar.mobile.${label}_link`}
                    onClick={() => scrollTo(href)}
                    className="text-left px-4 py-3 min-h-[44px] text-sm font-medium text-foreground hover:text-gold rounded-lg hover:bg-muted transition-smooth capitalize"
                  >
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </button>
                );
              })}

              {/* Dashboard link — mobile, only when authenticated */}
              {isAuthenticated && (
                <button
                  type="button"
                  data-ocid="navbar.mobile.dashboard_link"
                  onClick={() => navigateTo("dashboard")}
                  className="text-left px-4 py-3 min-h-[44px] text-sm font-medium text-foreground hover:text-gold rounded-lg hover:bg-muted transition-smooth flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
              )}

              {/* Modules section */}
              <div className="border-t border-border/30 mt-1 pt-2">
                <button
                  type="button"
                  data-ocid="navbar.mobile.modules_toggle"
                  onClick={() => setMobileModulesOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <span>Modules</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${mobileModulesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileModulesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-2 flex flex-col gap-1 overflow-hidden"
                    >
                      {modules.map((mod) => (
                        <button
                          key={mod.route}
                          type="button"
                          data-ocid={`navbar.mobile.module.${mod.route}_link`}
                          onClick={() => navigateTo(mod.route)}
                          className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg hover:bg-muted transition-smooth group"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg ${mod.glass} border border-border/30 flex items-center justify-center flex-shrink-0`}
                          >
                            <mod.icon className={`w-4 h-4 ${mod.accent}`} />
                          </div>
                          <span className={`text-sm font-medium ${mod.accent}`}>
                            {mod.label}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile auth section — always visible */}
              <div className="mt-2 pt-2 border-t border-border/30">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <span className="px-4 py-2 text-xs font-mono text-foreground/50 glass-gold rounded-lg border border-[oklch(0.68_0.22_86/0.2)] truncate">
                      {displayName}
                    </span>
                    <button
                      type="button"
                      data-ocid="navbar.mobile.profile_link"
                      onClick={() => navigateTo("profile")}
                      className="flex items-center gap-2 px-4 py-3 min-h-[44px] text-sm font-medium text-foreground hover:text-gold rounded-lg hover:bg-muted transition-smooth"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <Button
                      data-ocid="navbar.mobile.logout_button"
                      onClick={handleLogout}
                      variant="outline"
                      className="flex items-center gap-2 min-h-[44px] border-[oklch(0.68_0.22_86/0.4)] text-foreground hover:text-gold bg-transparent"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      data-ocid="navbar.mobile.signin_button"
                      onClick={handleSignInClick}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-sm font-medium text-foreground rounded-lg border border-[oklch(0.99_0.005_240/0.25)] hover:border-[oklch(0.68_0.22_86/0.5)] hover:text-[oklch(0.68_0.22_86)] transition-smooth"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </button>
                    <Button
                      data-ocid="navbar.mobile.login_button"
                      onClick={handleJoinClick}
                      className="w-full flex items-center gap-2 min-h-[44px] bg-gradient-to-r from-[oklch(0.68_0.22_86)] to-[oklch(0.72_0.20_80)] text-[oklch(0.12_0.08_260)] font-semibold border-0 shadow-glow-sm"
                    >
                      <UserPlus className="w-4 h-4" />
                      Join Free — Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
