import { c as createLucideIcon, u as useAuth, aH as useGetUserProfile, aI as useGetUserActivitySummary, aJ as useUpdateLastLogin, r as reactExports, h as BookOpen, S as Sparkles, D as Camera, ao as ShoppingBag, aK as LayoutDashboard, j as jsxRuntimeExports, m as motion, g as Leaf, aL as LogOut, af as User, s as Star, ae as Music, M as MapPin } from "./index-CITPV5fo.js";
import { C as Calendar } from "./calendar-DLK9cukz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode);
const MODULE_CARDS = [
  {
    route: "heritage-scanner",
    label: "Heritage Scanner",
    description: "Uncover ancestry insights & family tree",
    icon: Compass,
    accent: "oklch(0.45 0.25 295)",
    border: "oklch(0.45 0.25 295 / 0.3)",
    bg: "oklch(0.45 0.25 295 / 0.08)"
  },
  {
    route: "language-revival",
    label: "Language Revival",
    description: "Learn lost languages with AI guidance",
    icon: BookOpen,
    accent: "oklch(0.4 0.2 275)",
    border: "oklch(0.4 0.2 275 / 0.3)",
    bg: "oklch(0.4 0.2 275 / 0.08)"
  },
  {
    route: "ar-time-travel",
    label: "AR Time Travel",
    description: "See history through your camera",
    icon: Camera,
    accent: "oklch(0.65 0.15 200)",
    border: "oklch(0.65 0.15 200 / 0.3)",
    bg: "oklch(0.65 0.15 200 / 0.08)"
  },
  {
    route: "storykeeper",
    label: "Storykeeper",
    description: "Preserve family memories & timelines",
    icon: Sparkles,
    accent: "oklch(0.72 0.2 80)",
    border: "oklch(0.72 0.2 80 / 0.3)",
    bg: "oklch(0.72 0.2 80 / 0.08)"
  },
  {
    route: "traditions",
    label: "Traditions",
    description: "Rediscover forgotten cultural customs",
    icon: Star,
    accent: "oklch(0.62 0.2 25)",
    border: "oklch(0.62 0.2 25 / 0.3)",
    bg: "oklch(0.62 0.2 25 / 0.08)"
  },
  {
    route: "gurukul",
    label: "Digital Gurukul",
    description: "Learn from verified cultural masters",
    icon: Music,
    accent: "oklch(0.75 0.18 65)",
    border: "oklch(0.75 0.18 65 / 0.3)",
    bg: "oklch(0.75 0.18 65 / 0.08)"
  },
  {
    route: "marketplace",
    label: "Marketplace",
    description: "Authentic artisan crafts & goods",
    icon: ShoppingBag,
    accent: "oklch(0.6 0.16 40)",
    border: "oklch(0.6 0.16 40 / 0.3)",
    bg: "oklch(0.6 0.16 40 / 0.08)"
  },
  {
    route: "festival-planner",
    label: "Festival Planner",
    description: "Personalized festival celebrations",
    icon: MapPin,
    accent: "oklch(0.5 0.28 330)",
    border: "oklch(0.5 0.28 330 / 0.3)",
    bg: "oklch(0.5 0.28 330 / 0.08)"
  }
];
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 animate-pulse",
      style: {
        background: "oklch(0.14 0.06 260 / 0.7)",
        border: "1px solid oklch(0.68 0.22 86 / 0.1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-xl mb-3",
            style: { background: "oklch(0.2 0.06 260)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-7 w-16 rounded-md mb-2",
            style: { background: "oklch(0.2 0.06 260)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-3 w-20 rounded",
            style: { background: "oklch(0.18 0.05 260)" }
          }
        )
      ]
    }
  );
}
function StatCard({ icon: Icon, label, value, accent, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "stat-card flex flex-col items-center gap-2 cursor-default",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: 0.1 + index * 0.07,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      },
      whileHover: {
        y: -4,
        boxShadow: `0 16px 48px ${accent.replace(")", " / 0.2)")}`
      },
      "data-ocid": `dashboard.stat_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-xl flex items-center justify-center",
            style: {
              background: `${accent.replace(")", " / 0.15)")}`,
              border: `1px solid ${accent.replace(")", " / 0.3)")}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", style: { color: accent } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-card-value font-display", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-card-label text-center", children: label })
      ]
    }
  );
}
function ModuleCard({ mod, onNavigate, index }) {
  const Icon = mod.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      "data-ocid": `dashboard.module_card.${index + 1}`,
      onClick: () => onNavigate(mod.route),
      className: "w-full text-left rounded-2xl p-4 flex flex-col gap-3 group",
      style: {
        background: mod.bg,
        border: `1px solid ${mod.border}`,
        backdropFilter: "blur(12px)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)"
      },
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.05, duration: 0.4 },
      whileHover: { y: -3, scale: 1.01 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            style: {
              background: `${mod.accent.replace(")", " / 0.15)")}`,
              border: `1px solid ${mod.border}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", style: { color: mod.accent } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-semibold text-sm leading-tight mb-1",
              style: { color: mod.accent },
              children: mod.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs leading-snug",
              style: { color: "oklch(0.99 0.005 240 / 0.45)" },
              children: mod.description
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-semibold mt-auto",
            style: { color: mod.accent, opacity: 0.7 },
            children: "Open Module →"
          }
        )
      ]
    }
  );
}
function DashboardPage({
  onNavigate,
  onNavigateHome
}) {
  const { shortPrincipal, logout, isAuthenticated } = useAuth();
  const { data: profile, isLoading: profileLoading } = useGetUserProfile();
  const { data: activity, isLoading: activityLoading } = useGetUserActivitySummary();
  const updateLastLogin = useUpdateLastLogin();
  const updateLastLoginMutate = updateLastLogin.mutate;
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      updateLastLoginMutate();
    }
  }, [isAuthenticated, updateLastLoginMutate]);
  const displayName = (profile == null ? void 0 : profile.fullName) || "Heritage Explorer";
  const lastLogin = (profile == null ? void 0 : profile.lastLoginAt) ? new Date(Number(profile.lastLoginAt) / 1e6).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric"
    }
  ) : null;
  const daysOnPlatform = (profile == null ? void 0 : profile.createdAt) ? Math.max(
    1,
    Math.floor(
      (Date.now() - Number(profile.createdAt) / 1e6) / 864e5
    )
  ) : 0;
  const stats = [
    {
      icon: Compass,
      label: "Heritage Scans",
      value: activity ? Number(activity.heritageScans) : 0,
      accent: "oklch(0.45 0.25 295)",
      index: 0
    },
    {
      icon: BookOpen,
      label: "Language Lessons",
      value: activity ? Number(activity.languageLessons) : 0,
      accent: "oklch(0.4 0.2 275)",
      index: 1
    },
    {
      icon: Sparkles,
      label: "Stories Saved",
      value: activity ? Number(activity.storiesSaved) : 0,
      accent: "oklch(0.72 0.2 80)",
      index: 2
    },
    {
      icon: Camera,
      label: "AR Captures",
      value: activity ? Number(activity.arCaptures) : 0,
      accent: "oklch(0.65 0.15 200)",
      index: 3
    },
    {
      icon: GraduationCap,
      label: "Courses Enrolled",
      value: activity ? Number(activity.coursesEnrolled) : 0,
      accent: "oklch(0.75 0.18 65)",
      index: 4
    },
    {
      icon: ShoppingBag,
      label: "Orders Placed",
      value: activity ? Number(activity.ordersPlaced) : 0,
      accent: "oklch(0.6 0.16 40)",
      index: 5
    },
    {
      icon: Calendar,
      label: "Festival Plans",
      value: activity ? Number(activity.festivalPlans) : 0,
      accent: "oklch(0.5 0.28 330)",
      index: 6
    },
    {
      icon: LayoutDashboard,
      label: "Days on Platform",
      value: profileLoading ? "…" : daysOnPlatform,
      accent: "oklch(0.68 0.22 86)",
      index: 7
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen relative overflow-x-hidden",
      style: { background: "oklch(0.1 0.05 260)" },
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed inset-0 overflow-hidden pointer-events-none",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute rounded-full",
                  style: {
                    width: 480,
                    height: 480,
                    top: "-15%",
                    left: "-10%",
                    background: "oklch(0.68 0.22 86 / 0.07)",
                    filter: "blur(100px)"
                  },
                  animate: { scale: [1, 1.1, 1] },
                  transition: {
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute rounded-full",
                  style: {
                    width: 360,
                    height: 360,
                    bottom: "-10%",
                    right: "-8%",
                    background: "oklch(0.6 0.16 40 / 0.06)",
                    filter: "blur(80px)"
                  },
                  animate: { scale: [1, 1.08, 1] },
                  transition: {
                    duration: 14,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute rounded-full hidden sm:block",
                  style: {
                    width: 200,
                    height: 200,
                    top: "40%",
                    left: "55%",
                    background: "oklch(0.45 0.25 295 / 0.04)",
                    filter: "blur(60px)"
                  },
                  animate: { scale: [1, 1.15, 1] },
                  transition: {
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            className: "sticky top-0 z-40",
            style: {
              backdropFilter: "blur(16px)",
              background: "oklch(0.12 0.06 260 / 0.85)",
              borderBottom: "1px solid oklch(0.68 0.22 86 / 0.12)"
            },
            "data-ocid": "dashboard.navbar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: onNavigateHome,
                  "data-ocid": "dashboard.home_link",
                  className: "flex items-center gap-2 group flex-shrink-0 min-h-[44px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-xl flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                          boxShadow: "0 0 16px oklch(0.68 0.22 86 / 0.3)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Leaf,
                          {
                            className: "w-4 h-4",
                            style: { color: "oklch(0.12 0.08 260)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display text-lg font-semibold",
                        style: { color: "oklch(0.99 0.005 240)" },
                        children: "ReviveRoots"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "dashboard.profile_button",
                    onClick: () => onNavigate("profile"),
                    className: "flex items-center gap-2 px-3 py-1.5 rounded-xl min-h-[40px] transition-smooth hover:opacity-80",
                    style: {
                      background: "oklch(0.68 0.22 86 / 0.1)",
                      border: "1px solid oklch(0.68 0.22 86 / 0.25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                            color: "oklch(0.12 0.08 260)"
                          },
                          children: displayName.charAt(0).toUpperCase()
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-sm font-medium hidden sm:block truncate max-w-[120px]",
                          style: { color: "oklch(0.99 0.005 240 / 0.85)" },
                          children: displayName
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "dashboard.logout_button",
                    onClick: () => {
                      logout();
                      onNavigateHome();
                    },
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl min-h-[40px] text-sm font-medium transition-smooth hover:opacity-80",
                    style: {
                      border: "1px solid oklch(0.68 0.22 86 / 0.2)",
                      color: "oklch(0.99 0.005 240 / 0.55)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Logout" })
                    ]
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.section,
            {
              className: "mb-10",
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              "data-ocid": "dashboard.greeting_section",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-3xl p-6 sm:p-8 overflow-hidden relative",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.14 0.08 265 / 0.9), oklch(0.16 0.08 260 / 0.7))",
                    border: "1px solid oklch(0.68 0.22 86 / 0.18)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 24px 72px oklch(0 0 0 / 0.35)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute top-0 left-0 right-0 h-[2px]",
                        style: {
                          background: "linear-gradient(90deg, oklch(0.68 0.22 86), oklch(0.72 0.2 80), oklch(0.6 0.16 40))"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm font-medium uppercase tracking-widest mb-2",
                            style: { color: "oklch(0.68 0.22 86 / 0.7)" },
                            children: "Welcome back"
                          }
                        ),
                        profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-9 w-64 rounded-lg animate-pulse",
                            style: { background: "oklch(0.2 0.06 260)" }
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "h1",
                          {
                            className: "font-display text-3xl sm:text-4xl leading-tight",
                            style: { color: "oklch(0.68 0.22 86)" },
                            "data-ocid": "dashboard.greeting_name",
                            children: [
                              displayName,
                              "!"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "mt-2 text-sm",
                            style: { color: "oklch(0.99 0.005 240 / 0.45)" },
                            children: [
                              "Your Heritage Journey",
                              " ",
                              lastLogin ? `· Last login: ${lastLogin}` : ""
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-ocid": "dashboard.edit_profile_button",
                          onClick: () => onNavigate("profile"),
                          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold min-h-[44px] transition-smooth hover:opacity-90",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                            color: "oklch(0.12 0.08 260)",
                            boxShadow: "0 4px 20px oklch(0.68 0.22 86 / 0.3)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                            "Edit Profile"
                          ]
                        }
                      ) })
                    ] }),
                    !profileLoading && ((profile == null ? void 0 : profile.email) || shortPrincipal) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
                      (profile == null ? void 0 : profile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs px-3 py-1 rounded-full",
                          style: {
                            background: "oklch(0.68 0.22 86 / 0.1)",
                            border: "1px solid oklch(0.68 0.22 86 / 0.2)",
                            color: "oklch(0.99 0.005 240 / 0.6)"
                          },
                          children: profile.email
                        }
                      ),
                      shortPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs px-3 py-1 rounded-full font-mono",
                          style: {
                            background: "oklch(0.68 0.22 86 / 0.07)",
                            border: "1px solid oklch(0.68 0.22 86 / 0.15)",
                            color: "oklch(0.99 0.005 240 / 0.4)"
                          },
                          children: [
                            "ID: ",
                            shortPrincipal
                          ]
                        }
                      ),
                      (profile == null ? void 0 : profile.heritageRegion) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs px-3 py-1 rounded-full",
                          style: {
                            background: "oklch(0.6 0.16 40 / 0.1)",
                            border: "1px solid oklch(0.6 0.16 40 / 0.25)",
                            color: "oklch(0.72 0.16 55)"
                          },
                          children: [
                            "🌍 ",
                            profile.heritageRegion
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", "data-ocid": "dashboard.stats_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-xl mb-5",
                style: { color: "oklch(0.99 0.005 240 / 0.8)" },
                children: "Your Impact"
              }
            ),
            activityLoading || profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
              /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s }, s.label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mb-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", "data-ocid": "dashboard.modules_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-xl mb-2",
                style: { color: "oklch(0.99 0.005 240 / 0.8)" },
                children: "Explore Your Heritage"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm mb-6",
                style: { color: "oklch(0.99 0.005 240 / 0.4)" },
                children: "Pick up where you left off or start something new"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: MODULE_CARDS.map((mod, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ModuleCard,
              {
                mod,
                onNavigate,
                index: i
              },
              mod.route
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mb-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", "data-ocid": "dashboard.activity_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-xl mb-5",
                style: { color: "oklch(0.99 0.005 240 / 0.8)" },
                children: "Recent Activity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-2xl overflow-hidden",
                style: {
                  background: "oklch(0.13 0.06 260 / 0.8)",
                  border: "1px solid oklch(0.68 0.22 86 / 0.12)",
                  backdropFilter: "blur(12px)"
                },
                children: activity && Object.values(activity).some((v) => Number(v) > 0) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  activity.heritageScans > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "activity-item",
                      "data-ocid": "dashboard.activity.heritage_scans",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                            style: {
                              background: "oklch(0.45 0.25 295 / 0.15)",
                              border: "1px solid oklch(0.45 0.25 295 / 0.3)"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Compass,
                              {
                                className: "w-4 h-4",
                                style: { color: "oklch(0.45 0.25 295)" }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm font-medium",
                              style: { color: "oklch(0.99 0.005 240 / 0.85)" },
                              children: "Heritage Scans Completed"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "text-xs",
                              style: { color: "oklch(0.99 0.005 240 / 0.4)" },
                              children: [
                                Number(activity.heritageScans),
                                " scan",
                                Number(activity.heritageScans) !== 1 ? "s" : "",
                                " on record"
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  activity.languageLessons > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "activity-item",
                      "data-ocid": "dashboard.activity.language_lessons",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                            style: {
                              background: "oklch(0.4 0.2 275 / 0.15)",
                              border: "1px solid oklch(0.4 0.2 275 / 0.3)"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              BookOpen,
                              {
                                className: "w-4 h-4",
                                style: { color: "oklch(0.4 0.2 275)" }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm font-medium",
                              style: { color: "oklch(0.99 0.005 240 / 0.85)" },
                              children: "Language Lessons Completed"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "text-xs",
                              style: { color: "oklch(0.99 0.005 240 / 0.4)" },
                              children: [
                                Number(activity.languageLessons),
                                " lesson",
                                Number(activity.languageLessons) !== 1 ? "s" : "",
                                " done"
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  activity.storiesSaved > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "activity-item",
                      "data-ocid": "dashboard.activity.stories",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                            style: {
                              background: "oklch(0.72 0.2 80 / 0.15)",
                              border: "1px solid oklch(0.72 0.2 80 / 0.3)"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Sparkles,
                              {
                                className: "w-4 h-4",
                                style: { color: "oklch(0.72 0.2 80)" }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm font-medium",
                              style: { color: "oklch(0.99 0.005 240 / 0.85)" },
                              children: "Stories Preserved"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "text-xs",
                              style: { color: "oklch(0.99 0.005 240 / 0.4)" },
                              children: [
                                Number(activity.storiesSaved),
                                " stor",
                                Number(activity.storiesSaved) !== 1 ? "ies" : "y",
                                " in your vault"
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "py-12 flex flex-col items-center gap-3",
                    "data-ocid": "dashboard.activity.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-14 h-14 rounded-2xl flex items-center justify-center",
                          style: {
                            background: "oklch(0.68 0.22 86 / 0.1)",
                            border: "1px solid oklch(0.68 0.22 86 / 0.2)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Sparkles,
                            {
                              className: "w-6 h-6",
                              style: { color: "oklch(0.68 0.22 86 / 0.6)" }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-medium",
                          style: { color: "oklch(0.99 0.005 240 / 0.5)" },
                          children: "No activity yet"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-center max-w-xs",
                          style: { color: "oklch(0.99 0.005 240 / 0.3)" },
                          children: "Start exploring — your heritage journey awaits"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": "dashboard.activity.explore_button",
                          onClick: () => onNavigate("heritage-scanner"),
                          className: "mt-2 px-4 py-2 rounded-xl text-sm font-semibold transition-smooth hover:opacity-90",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                            color: "oklch(0.12 0.08 260)"
                          },
                          children: "Begin Your Scan"
                        }
                      )
                    ]
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: "relative z-10 border-t py-6",
            style: { borderColor: "oklch(0.68 0.22 86 / 0.1)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs",
                style: { color: "oklch(0.99 0.005 240 / 0.3)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "© ",
                    (/* @__PURE__ */ new Date()).getFullYear(),
                    " ReviveRoots. Your identity, your heritage."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono",
                      style: { color: "oklch(0.68 0.22 86 / 0.4)" },
                      children: shortPrincipal
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  DashboardPage as default
};
