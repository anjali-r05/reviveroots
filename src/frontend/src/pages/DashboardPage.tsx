import { useAuth } from "@/hooks/useAuth";
import {
  useGetUserActivitySummary,
  useGetUserProfile,
  useUpdateLastLogin,
} from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import {
  BookOpen,
  Calendar,
  Camera,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  LogOut,
  MapPin,
  Music,
  ShoppingBag,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

// ─── Module configs ────────────────────────────────────────────────────────────
const MODULE_CARDS = [
  {
    route: "heritage-scanner" as AppRoute,
    label: "Heritage Scanner",
    description: "Uncover ancestry insights & family tree",
    icon: Compass,
    accent: "oklch(0.45 0.25 295)",
    border: "oklch(0.45 0.25 295 / 0.3)",
    bg: "oklch(0.45 0.25 295 / 0.08)",
  },
  {
    route: "language-revival" as AppRoute,
    label: "Language Revival",
    description: "Learn lost languages with AI guidance",
    icon: BookOpen,
    accent: "oklch(0.4 0.2 275)",
    border: "oklch(0.4 0.2 275 / 0.3)",
    bg: "oklch(0.4 0.2 275 / 0.08)",
  },
  {
    route: "ar-time-travel" as AppRoute,
    label: "AR Time Travel",
    description: "See history through your camera",
    icon: Camera,
    accent: "oklch(0.65 0.15 200)",
    border: "oklch(0.65 0.15 200 / 0.3)",
    bg: "oklch(0.65 0.15 200 / 0.08)",
  },
  {
    route: "storykeeper" as AppRoute,
    label: "Storykeeper",
    description: "Preserve family memories & timelines",
    icon: Sparkles,
    accent: "oklch(0.72 0.2 80)",
    border: "oklch(0.72 0.2 80 / 0.3)",
    bg: "oklch(0.72 0.2 80 / 0.08)",
  },
  {
    route: "traditions" as AppRoute,
    label: "Traditions",
    description: "Rediscover forgotten cultural customs",
    icon: Star,
    accent: "oklch(0.62 0.2 25)",
    border: "oklch(0.62 0.2 25 / 0.3)",
    bg: "oklch(0.62 0.2 25 / 0.08)",
  },
  {
    route: "gurukul" as AppRoute,
    label: "Digital Gurukul",
    description: "Learn from verified cultural masters",
    icon: Music,
    accent: "oklch(0.75 0.18 65)",
    border: "oklch(0.75 0.18 65 / 0.3)",
    bg: "oklch(0.75 0.18 65 / 0.08)",
  },
  {
    route: "marketplace" as AppRoute,
    label: "Marketplace",
    description: "Authentic artisan crafts & goods",
    icon: ShoppingBag,
    accent: "oklch(0.6 0.16 40)",
    border: "oklch(0.6 0.16 40 / 0.3)",
    bg: "oklch(0.6 0.16 40 / 0.08)",
  },
  {
    route: "festival-planner" as AppRoute,
    label: "Festival Planner",
    description: "Personalized festival celebrations",
    icon: MapPin,
    accent: "oklch(0.5 0.28 330)",
    border: "oklch(0.5 0.28 330 / 0.3)",
    bg: "oklch(0.5 0.28 330 / 0.08)",
  },
];

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5 animate-pulse"
      style={{
        background: "oklch(0.14 0.06 260 / 0.7)",
        border: "1px solid oklch(0.68 0.22 86 / 0.1)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl mb-3"
        style={{ background: "oklch(0.2 0.06 260)" }}
      />
      <div
        className="h-7 w-16 rounded-md mb-2"
        style={{ background: "oklch(0.2 0.06 260)" }}
      />
      <div
        className="h-3 w-20 rounded"
        style={{ background: "oklch(0.18 0.05 260)" }}
      />
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent: string;
  index: number;
}

function StatCard({ icon: Icon, label, value, accent, index }: StatCardProps) {
  return (
    <motion.div
      className="stat-card flex flex-col items-center gap-2 cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.07,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 16px 48px ${accent.replace(")", " / 0.2)")}`,
      }}
      data-ocid={`dashboard.stat_card.${index + 1}`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `${accent.replace(")", " / 0.15)")}`,
          border: `1px solid ${accent.replace(")", " / 0.3)")}`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div className="stat-card-value font-display">{value}</div>
      <div className="stat-card-label text-center">{label}</div>
    </motion.div>
  );
}

// ─── Module Card ───────────────────────────────────────────────────────────────
interface ModuleCardProps {
  mod: (typeof MODULE_CARDS)[0];
  onNavigate: (route: AppRoute) => void;
  index: number;
}

function ModuleCard({ mod, onNavigate, index }: ModuleCardProps) {
  const Icon = mod.icon;
  return (
    <motion.button
      type="button"
      data-ocid={`dashboard.module_card.${index + 1}`}
      onClick={() => onNavigate(mod.route)}
      className="w-full text-left rounded-2xl p-4 flex flex-col gap-3 group"
      style={{
        background: mod.bg,
        border: `1px solid ${mod.border}`,
        backdropFilter: "blur(12px)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -3, scale: 1.01 }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `${mod.accent.replace(")", " / 0.15)")}`,
          border: `1px solid ${mod.border}`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: mod.accent }} />
      </div>
      <div className="min-w-0">
        <p
          className="font-semibold text-sm leading-tight mb-1"
          style={{ color: mod.accent }}
        >
          {mod.label}
        </p>
        <p
          className="text-xs leading-snug"
          style={{ color: "oklch(0.99 0.005 240 / 0.45)" }}
        >
          {mod.description}
        </p>
      </div>
      <span
        className="text-xs font-semibold mt-auto"
        style={{ color: mod.accent, opacity: 0.7 }}
      >
        Open Module →
      </span>
    </motion.button>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
interface DashboardPageProps {
  onNavigate: (route: AppRoute) => void;
  onNavigateHome: () => void;
}

export default function DashboardPage({
  onNavigate,
  onNavigateHome,
}: DashboardPageProps) {
  const { shortPrincipal, logout, isAuthenticated } = useAuth();
  const { data: profile, isLoading: profileLoading } = useGetUserProfile();
  const { data: activity, isLoading: activityLoading } =
    useGetUserActivitySummary();
  const updateLastLogin = useUpdateLastLogin();

  const updateLastLoginMutate = updateLastLogin.mutate;

  // Update last login on mount
  useEffect(() => {
    if (isAuthenticated) {
      updateLastLoginMutate();
    }
  }, [isAuthenticated, updateLastLoginMutate]);

  const displayName = profile?.fullName || "Heritage Explorer";

  const lastLogin = profile?.lastLoginAt
    ? new Date(Number(profile.lastLoginAt) / 1_000_000).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
        },
      )
    : null;

  const daysOnPlatform = profile?.createdAt
    ? Math.max(
        1,
        Math.floor(
          (Date.now() - Number(profile.createdAt) / 1_000_000) / 86_400_000,
        ),
      )
    : 0;

  const stats: StatCardProps[] = [
    {
      icon: Compass,
      label: "Heritage Scans",
      value: activity ? Number(activity.heritageScans) : 0,
      accent: "oklch(0.45 0.25 295)",
      index: 0,
    },
    {
      icon: BookOpen,
      label: "Language Lessons",
      value: activity ? Number(activity.languageLessons) : 0,
      accent: "oklch(0.4 0.2 275)",
      index: 1,
    },
    {
      icon: Sparkles,
      label: "Stories Saved",
      value: activity ? Number(activity.storiesSaved) : 0,
      accent: "oklch(0.72 0.2 80)",
      index: 2,
    },
    {
      icon: Camera,
      label: "AR Captures",
      value: activity ? Number(activity.arCaptures) : 0,
      accent: "oklch(0.65 0.15 200)",
      index: 3,
    },
    {
      icon: GraduationCap,
      label: "Courses Enrolled",
      value: activity ? Number(activity.coursesEnrolled) : 0,
      accent: "oklch(0.75 0.18 65)",
      index: 4,
    },
    {
      icon: ShoppingBag,
      label: "Orders Placed",
      value: activity ? Number(activity.ordersPlaced) : 0,
      accent: "oklch(0.6 0.16 40)",
      index: 5,
    },
    {
      icon: Calendar,
      label: "Festival Plans",
      value: activity ? Number(activity.festivalPlans) : 0,
      accent: "oklch(0.5 0.28 330)",
      index: 6,
    },
    {
      icon: LayoutDashboard,
      label: "Days on Platform",
      value: profileLoading ? "…" : daysOnPlatform,
      accent: "oklch(0.68 0.22 86)",
      index: 7,
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "oklch(0.1 0.05 260)" }}
      data-ocid="dashboard.page"
    >
      {/* Ambient background orbs */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 480,
            height: 480,
            top: "-15%",
            left: "-10%",
            background: "oklch(0.68 0.22 86 / 0.07)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 360,
            height: 360,
            bottom: "-10%",
            right: "-8%",
            background: "oklch(0.6 0.16 40 / 0.06)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute rounded-full hidden sm:block"
          style={{
            width: 200,
            height: 200,
            top: "40%",
            left: "55%",
            background: "oklch(0.45 0.25 295 / 0.04)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Top navbar bar */}
      <nav
        className="sticky top-0 z-40"
        style={{
          backdropFilter: "blur(16px)",
          background: "oklch(0.12 0.06 260 / 0.85)",
          borderBottom: "1px solid oklch(0.68 0.22 86 / 0.12)",
        }}
        data-ocid="dashboard.navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          {/* Logo */}
          <button
            type="button"
            onClick={onNavigateHome}
            data-ocid="dashboard.home_link"
            className="flex items-center gap-2 group flex-shrink-0 min-h-[44px]"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                boxShadow: "0 0 16px oklch(0.68 0.22 86 / 0.3)",
              }}
            >
              <Leaf
                className="w-4 h-4"
                style={{ color: "oklch(0.12 0.08 260)" }}
              />
            </div>
            <span
              className="font-display text-lg font-semibold"
              style={{ color: "oklch(0.99 0.005 240)" }}
            >
              ReviveRoots
            </span>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Profile */}
            <button
              type="button"
              data-ocid="dashboard.profile_button"
              onClick={() => onNavigate("profile")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl min-h-[40px] transition-smooth hover:opacity-80"
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
                className="text-sm font-medium hidden sm:block truncate max-w-[120px]"
                style={{ color: "oklch(0.99 0.005 240 / 0.85)" }}
              >
                {displayName}
              </span>
            </button>

            {/* Logout */}
            <button
              type="button"
              data-ocid="dashboard.logout_button"
              onClick={() => {
                logout();
                onNavigateHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl min-h-[40px] text-sm font-medium transition-smooth hover:opacity-80"
              style={{
                border: "1px solid oklch(0.68 0.22 86 / 0.2)",
                color: "oklch(0.99 0.005 240 / 0.55)",
              }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* ─── Hero greeting ─── */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          data-ocid="dashboard.greeting_section"
        >
          <div
            className="rounded-3xl p-6 sm:p-8 overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.14 0.08 265 / 0.9), oklch(0.16 0.08 260 / 0.7))",
              border: "1px solid oklch(0.68 0.22 86 / 0.18)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 72px oklch(0 0 0 / 0.35)",
            }}
          >
            {/* Gold accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.68 0.22 86), oklch(0.72 0.2 80), oklch(0.6 0.16 40))",
              }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <p
                  className="text-sm font-medium uppercase tracking-widest mb-2"
                  style={{ color: "oklch(0.68 0.22 86 / 0.7)" }}
                >
                  Welcome back
                </p>
                {profileLoading ? (
                  <div
                    className="h-9 w-64 rounded-lg animate-pulse"
                    style={{ background: "oklch(0.2 0.06 260)" }}
                  />
                ) : (
                  <h1
                    className="font-display text-3xl sm:text-4xl leading-tight"
                    style={{ color: "oklch(0.68 0.22 86)" }}
                    data-ocid="dashboard.greeting_name"
                  >
                    {displayName}!
                  </h1>
                )}
                <p
                  className="mt-2 text-sm"
                  style={{ color: "oklch(0.99 0.005 240 / 0.45)" }}
                >
                  Your Heritage Journey{" "}
                  {lastLogin ? `· Last login: ${lastLogin}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  data-ocid="dashboard.edit_profile_button"
                  onClick={() => onNavigate("profile")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold min-h-[44px] transition-smooth hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                    color: "oklch(0.12 0.08 260)",
                    boxShadow: "0 4px 20px oklch(0.68 0.22 86 / 0.3)",
                  }}
                >
                  <User className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Profile detail row */}
            {!profileLoading && (profile?.email || shortPrincipal) && (
              <div className="mt-5 flex flex-wrap gap-3">
                {profile?.email && (
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.68 0.22 86 / 0.1)",
                      border: "1px solid oklch(0.68 0.22 86 / 0.2)",
                      color: "oklch(0.99 0.005 240 / 0.6)",
                    }}
                  >
                    {profile.email}
                  </span>
                )}
                {shortPrincipal && (
                  <span
                    className="text-xs px-3 py-1 rounded-full font-mono"
                    style={{
                      background: "oklch(0.68 0.22 86 / 0.07)",
                      border: "1px solid oklch(0.68 0.22 86 / 0.15)",
                      color: "oklch(0.99 0.005 240 / 0.4)",
                    }}
                  >
                    ID: {shortPrincipal}
                  </span>
                )}
                {profile?.heritageRegion && (
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.6 0.16 40 / 0.1)",
                      border: "1px solid oklch(0.6 0.16 40 / 0.25)",
                      color: "oklch(0.72 0.16 55)",
                    }}
                  >
                    🌍 {profile.heritageRegion}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.section>

        {/* ─── Stats grid ─── */}
        <section className="mb-12" data-ocid="dashboard.stats_section">
          <h2
            className="font-display text-xl mb-5"
            style={{ color: "oklch(0.99 0.005 240 / 0.8)" }}
          >
            Your Impact
          </h2>
          {activityLoading || profileLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          )}
        </section>

        {/* Section divider */}
        <div className="section-divider mb-10" />

        {/* ─── Module shortcuts ─── */}
        <section className="mb-12" data-ocid="dashboard.modules_section">
          <h2
            className="font-display text-xl mb-2"
            style={{ color: "oklch(0.99 0.005 240 / 0.8)" }}
          >
            Explore Your Heritage
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
          >
            Pick up where you left off or start something new
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MODULE_CARDS.map((mod, i) => (
              <ModuleCard
                key={mod.route}
                mod={mod}
                onNavigate={onNavigate}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mb-10" />

        {/* ─── Recent activity ─── */}
        <section className="mb-12" data-ocid="dashboard.activity_section">
          <h2
            className="font-display text-xl mb-5"
            style={{ color: "oklch(0.99 0.005 240 / 0.8)" }}
          >
            Recent Activity
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.13 0.06 260 / 0.8)",
              border: "1px solid oklch(0.68 0.22 86 / 0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            {activity && Object.values(activity).some((v) => Number(v) > 0) ? (
              <div>
                {activity.heritageScans > 0n && (
                  <div
                    className="activity-item"
                    data-ocid="dashboard.activity.heritage_scans"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "oklch(0.45 0.25 295 / 0.15)",
                        border: "1px solid oklch(0.45 0.25 295 / 0.3)",
                      }}
                    >
                      <Compass
                        className="w-4 h-4"
                        style={{ color: "oklch(0.45 0.25 295)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.99 0.005 240 / 0.85)" }}
                      >
                        Heritage Scans Completed
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
                      >
                        {Number(activity.heritageScans)} scan
                        {Number(activity.heritageScans) !== 1 ? "s" : ""} on
                        record
                      </p>
                    </div>
                  </div>
                )}
                {activity.languageLessons > 0n && (
                  <div
                    className="activity-item"
                    data-ocid="dashboard.activity.language_lessons"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "oklch(0.4 0.2 275 / 0.15)",
                        border: "1px solid oklch(0.4 0.2 275 / 0.3)",
                      }}
                    >
                      <BookOpen
                        className="w-4 h-4"
                        style={{ color: "oklch(0.4 0.2 275)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.99 0.005 240 / 0.85)" }}
                      >
                        Language Lessons Completed
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
                      >
                        {Number(activity.languageLessons)} lesson
                        {Number(activity.languageLessons) !== 1 ? "s" : ""} done
                      </p>
                    </div>
                  </div>
                )}
                {activity.storiesSaved > 0n && (
                  <div
                    className="activity-item"
                    data-ocid="dashboard.activity.stories"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "oklch(0.72 0.2 80 / 0.15)",
                        border: "1px solid oklch(0.72 0.2 80 / 0.3)",
                      }}
                    >
                      <Sparkles
                        className="w-4 h-4"
                        style={{ color: "oklch(0.72 0.2 80)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.99 0.005 240 / 0.85)" }}
                      >
                        Stories Preserved
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
                      >
                        {Number(activity.storiesSaved)} stor
                        {Number(activity.storiesSaved) !== 1 ? "ies" : "y"} in
                        your vault
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="py-12 flex flex-col items-center gap-3"
                data-ocid="dashboard.activity.empty_state"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.68 0.22 86 / 0.1)",
                    border: "1px solid oklch(0.68 0.22 86 / 0.2)",
                  }}
                >
                  <Sparkles
                    className="w-6 h-6"
                    style={{ color: "oklch(0.68 0.22 86 / 0.6)" }}
                  />
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                >
                  No activity yet
                </p>
                <p
                  className="text-xs text-center max-w-xs"
                  style={{ color: "oklch(0.99 0.005 240 / 0.3)" }}
                >
                  Start exploring — your heritage journey awaits
                </p>
                <button
                  type="button"
                  data-ocid="dashboard.activity.explore_button"
                  onClick={() => onNavigate("heritage-scanner")}
                  className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold transition-smooth hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                    color: "oklch(0.12 0.08 260)",
                  }}
                >
                  Begin Your Scan
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 border-t py-6"
        style={{ borderColor: "oklch(0.68 0.22 86 / 0.1)" }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: "oklch(0.99 0.005 240 / 0.3)" }}
        >
          <span>
            © {new Date().getFullYear()} ReviveRoots. Your identity, your
            heritage.
          </span>
          <span
            className="font-mono"
            style={{ color: "oklch(0.68 0.22 86 / 0.4)" }}
          >
            {shortPrincipal}
          </span>
        </div>
      </footer>
    </div>
  );
}
