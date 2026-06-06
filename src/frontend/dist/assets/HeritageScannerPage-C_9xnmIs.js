import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useAuth, b as useHeritageProfile, d as useGenerateAncestryInsights, e as useSaveHeritageProfile, r as reactExports, C as Cpu, I as Input, B as Button, L as LogIn, A as AnimatePresence, m as motion, f as Badge, S as Sparkles, g as Leaf, h as BookOpen, M as MapPin, i as ChevronRight, k as ChevronDown } from "./index-CITPV5fo.js";
import { M as ModuleLayout } from "./ModuleLayout-7elIkKUZ.js";
import { L as Label } from "./label-Bhpp8Kfq.js";
import { T as Textarea } from "./textarea-3j_qcGtT.js";
import { G as Globe } from "./globe-CUhZLH_-.js";
import { C as ChevronUp } from "./chevron-up-RphEv5ir.js";
import "./index-Bhn06kaP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m10 16 1.5 1.5", key: "11lckj" }],
  ["path", { d: "m14 8-1.5-1.5", key: "1ohn8i" }],
  ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993", key: "80uv8i" }],
  ["path", { d: "m16.5 10.5 1 1", key: "696xn5" }],
  ["path", { d: "m17 6-2.891-2.891", key: "xu6p2f" }],
  ["path", { d: "M2 15c6.667-6 13.333 0 20-6", key: "1pyr53" }],
  ["path", { d: "m20 9 .891.891", key: "3xwk7g" }],
  ["path", { d: "M3.109 14.109 4 15", key: "q76aoh" }],
  ["path", { d: "m6.5 12.5 1 1", key: "cs35ky" }],
  ["path", { d: "m7 18 2.891 2.891", key: "1sisit" }],
  ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993", key: "q3hbxp" }]
];
const Dna = createLucideIcon("dna", __iconNode$2);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
];
const Utensils = createLucideIcon("utensils", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function FamilyTreeSVG({ nodes }) {
  const gp = nodes.filter((n) => n.relation.toLowerCase().includes("grandp"));
  const parents = nodes.filter(
    (n) => n.relation.toLowerCase().includes("parent") || n.relation.toLowerCase().includes("father") || n.relation.toLowerCase().includes("mother")
  );
  const self = nodes.find(
    (n) => n.relation.toLowerCase() === "self" || n.relation.toLowerCase() === "you"
  );
  const topRow = gp.length ? gp : nodes.slice(0, 2);
  const midRow = parents.length ? parents : nodes.slice(2, 4);
  const bottomNode = self ?? nodes[nodes.length - 1];
  const W = 480;
  const H = 240;
  const nodeR = 28;
  const topPositions = topRow.map((_, i) => ({
    x: W / 2 - (topRow.length - 1) * 120 / 2 + i * 120,
    y: 50
  }));
  const midPositions = midRow.map((_, i) => ({
    x: W / 2 - (midRow.length - 1) * 120 / 2 + i * 120,
    y: 140
  }));
  const bottomPos = { x: W / 2, y: 220 };
  const goldGrad = "url(#goldGrad)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      className: "w-full max-w-md mx-auto",
      role: "img",
      "aria-label": "Family Tree Visualization",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "goldGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.68 0.22 86)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.76 0.18 80)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "nodeGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "0%",
                stopColor: "oklch(0.20 0.08 270)",
                stopOpacity: "0.9"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "100%",
                stopColor: "oklch(0.14 0.1 260)",
                stopOpacity: "0.95"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2", result: "coloredBlur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "coloredBlur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] })
        ] }),
        topPositions.map(
          (tp, ti) => midPositions.map((mp, mi) => {
            var _a, _b;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: `M ${tp.x} ${tp.y + nodeR} C ${tp.x} ${(tp.y + mp.y) / 2}, ${mp.x} ${(tp.y + mp.y) / 2}, ${mp.x} ${mp.y - nodeR}`,
                stroke: "oklch(0.68 0.22 86 / 0.35)",
                strokeWidth: "1.5",
                fill: "none"
              },
              `tm-${((_a = topRow[ti]) == null ? void 0 : _a.relation) ?? ti}-${((_b = midRow[mi]) == null ? void 0 : _b.relation) ?? mi}`
            );
          })
        ),
        midPositions.map((mp, i) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M ${mp.x} ${mp.y + nodeR} C ${mp.x} ${(mp.y + bottomPos.y) / 2}, ${bottomPos.x} ${(mp.y + bottomPos.y) / 2}, ${bottomPos.x} ${bottomPos.y - nodeR}`,
              stroke: "oklch(0.68 0.22 86 / 0.5)",
              strokeWidth: "1.5",
              fill: "none"
            },
            `mb-${((_a = midRow[i]) == null ? void 0 : _a.relation) ?? i}`
          );
        }),
        topRow.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: topPositions[i].x,
              cy: topPositions[i].y,
              r: nodeR,
              fill: "url(#nodeGrad)",
              stroke: "oklch(0.68 0.22 86)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: topPositions[i].x,
              y: topPositions[i].y - 6,
              textAnchor: "middle",
              fill: goldGrad,
              fontSize: "9",
              fontWeight: "600",
              fontFamily: "sans-serif",
              children: n.relation.length > 10 ? n.relation.slice(0, 10) : n.relation
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: topPositions[i].x,
              y: topPositions[i].y + 7,
              textAnchor: "middle",
              fill: "oklch(0.85 0.05 240)",
              fontSize: "8",
              fontFamily: "sans-serif",
              children: n.name.length > 12 ? n.name.slice(0, 12) : n.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: topPositions[i].x,
              y: topPositions[i].y + 18,
              textAnchor: "middle",
              fill: "oklch(0.55 0.05 240)",
              fontSize: "7",
              fontFamily: "sans-serif",
              children: n.region.length > 10 ? n.region.slice(0, 10) : n.region
            }
          )
        ] }, `top-${n.relation}-${n.name}`)),
        midRow.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: midPositions[i].x,
              cy: midPositions[i].y,
              r: nodeR,
              fill: "url(#nodeGrad)",
              stroke: "oklch(0.68 0.22 86 / 0.8)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: midPositions[i].x,
              y: midPositions[i].y - 6,
              textAnchor: "middle",
              fill: "oklch(0.68 0.22 86)",
              fontSize: "9",
              fontWeight: "600",
              fontFamily: "sans-serif",
              children: n.relation.length > 10 ? n.relation.slice(0, 10) : n.relation
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: midPositions[i].x,
              y: midPositions[i].y + 7,
              textAnchor: "middle",
              fill: "oklch(0.85 0.05 240)",
              fontSize: "8",
              fontFamily: "sans-serif",
              children: n.name.length > 12 ? n.name.slice(0, 12) : n.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: midPositions[i].x,
              y: midPositions[i].y + 18,
              textAnchor: "middle",
              fill: "oklch(0.55 0.05 240)",
              fontSize: "7",
              fontFamily: "sans-serif",
              children: n.region.length > 10 ? n.region.slice(0, 10) : n.region
            }
          )
        ] }, `mid-${n.relation}-${n.name}`)),
        bottomNode && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: bottomPos.x,
              cy: bottomPos.y,
              r: nodeR + 4,
              fill: "url(#goldGrad)",
              opacity: "0.15"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: bottomPos.x,
              cy: bottomPos.y,
              r: nodeR,
              fill: "url(#nodeGrad)",
              stroke: "oklch(0.68 0.22 86)",
              strokeWidth: "2.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: bottomPos.x,
              y: bottomPos.y - 5,
              textAnchor: "middle",
              fill: "oklch(0.68 0.22 86)",
              fontSize: "10",
              fontWeight: "700",
              fontFamily: "sans-serif",
              children: "You"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: bottomPos.x,
              y: bottomPos.y + 9,
              textAnchor: "middle",
              fill: "oklch(0.85 0.05 240)",
              fontSize: "8",
              fontFamily: "sans-serif",
              children: bottomNode.region.length > 12 ? bottomNode.region.slice(0, 12) : bottomNode.region
            }
          )
        ] })
      ]
    }
  );
}
function DNAScanAnimation() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32 flex items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 rounded-full border-2 border-[oklch(0.68_0.22_86/0.2)] animate-spin",
          style: { animationDuration: "4s" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-2 rounded-full border-2 border-[oklch(0.68_0.22_86/0.4)] border-dashed animate-spin",
          style: { animationDuration: "3s", animationDirection: "reverse" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-5 rounded-full border-2 border-[oklch(0.45_0.25_295/0.5)] animate-spin",
          style: { animationDuration: "2s" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-gradient-to-br from-[oklch(0.45_0.25_295/0.3)] to-[oklch(0.68_0.22_86/0.3)] animate-pulse flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "w-7 h-7 text-[oklch(0.68_0.22_86)]" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Scanning Heritage DNA…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Analyzing ancestry patterns across generations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 w-48", children: ["Surname analysis", "Migration patterns", "Cultural DNA"].map(
      (label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-28 truncate", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-gradient-to-r from-[oklch(0.45_0.25_295)] to-[oklch(0.68_0.22_86)] rounded-full animate-pulse",
            style: { width: "100%", animationDelay: `${i * 0.3}s` }
          }
        ) })
      ] }, label)
    ) })
  ] });
}
function ExpandableCustom({ text, index }) {
  const [open, setOpen] = reactExports.useState(false);
  const icons = ["🏺", "🌙", "🔥", "🌿", "🪔", "🎋"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.07 },
      className: "glass border border-border/40 rounded-xl overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 transition-colors",
            onClick: () => setOpen((o) => !o),
            "aria-expanded": open,
            "data-ocid": `scanner.custom.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg flex-shrink-0", children: icons[index % icons.length] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1 min-w-0 truncate", children: text }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            className: "px-4 pb-3 text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-2",
            children: "This cultural practice from your ancestral heritage was passed down through generations as a way to honor the land, community, and spiritual connection unique to your family lineage."
          }
        ) })
      ]
    }
  );
}
const FALLBACK_INSIGHTS = {
  migrationStory: "Your lineage traces a remarkable journey—from ancient trade settlements through the mountain passes of Central Asia, down fertile river valleys, and along coastal routes shaped by monsoon winds. Each generation carried fragments of the previous world: songs, recipes, rituals, and names encoded with meaning.",
  familyTreeNodes: [
    {
      relation: "Paternal GF",
      name: "Ramprasad",
      region: "Varanasi",
      era: "1890s"
    },
    {
      relation: "Paternal GM",
      name: "Savitri",
      region: "Allahabad",
      era: "1900s"
    },
    {
      relation: "Maternal GF",
      name: "Krishnamurthy",
      region: "Madurai",
      era: "1895s"
    },
    {
      relation: "Maternal GM",
      name: "Kamala",
      region: "Chennai",
      era: "1905s"
    },
    { relation: "Father", name: "Suresh", region: "Mumbai", era: "1950s" },
    { relation: "Mother", name: "Meena", region: "Delhi", era: "1955s" },
    { relation: "Self", name: "You", region: "Present", era: "Now" }
  ],
  forgottenCustoms: [
    "River lamp ritual during harvest moon — oil lamps floated on sacred rivers at dusk",
    "Grain blessing ceremony — first harvest grains blessed by eldest woman before storage",
    "Dawn singing practice — devotional songs at sunrise to honor ancestral spirits",
    "Seasonal fasting cycle — lunar-calendar fasts tied to agricultural seasons",
    "Story-quilting tradition — embroidered textiles encoding family migration history"
  ],
  traditionalOccupations: [
    "Weaver",
    "Merchant",
    "Healer",
    "Scribe",
    "Farmer",
    "Potter"
  ],
  festivals: [
    "Harvest Moon Festival",
    "Spring Equinox Ritual",
    "Ancestor Remembrance Day",
    "River Blessing Ceremony"
  ],
  foods: [
    "Saffron rice with dried apricots",
    "Herb-crusted flatbread",
    "Spiced lentil stew",
    "Tamarind chutney",
    "Rose milk pudding"
  ]
};
const foodEmojis = ["🍚", "🫓", "🍲", "🥣", "🍮", "🫙", "🥘", "🍛"];
const festivalEmojis = ["🪔", "🌸", "🎊", "🌾", "⭐", "🎋", "🌙", "🎆"];
function HeritageScannerPage({
  onNavigateHome,
  onNavigate
}) {
  const { isAuthenticated, login } = useAuth();
  const { data: profile, isLoading: profileLoading } = useHeritageProfile();
  const generateInsights = useGenerateAncestryInsights();
  const saveProfile = useSaveHeritageProfile();
  const [form, setForm] = reactExports.useState({
    surname: "",
    region: "",
    language: "",
    familyBackground: "",
    grandparentsOrigin: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [insights, setInsights] = reactExports.useState(null);
  const [savedSuccess, setSavedSuccess] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile) {
      setForm({
        surname: profile.surname,
        region: profile.region,
        language: profile.language,
        familyBackground: profile.familyBackground,
        grandparentsOrigin: profile.grandparentsOrigin
      });
      setInsights({
        migrationStory: profile.migrationStory,
        familyTreeNodes: FALLBACK_INSIGHTS.familyTreeNodes,
        forgottenCustoms: profile.forgottenCustoms,
        traditionalOccupations: profile.traditionalOccupations,
        festivals: profile.festivals,
        foods: profile.foods
      });
    }
  }, [profile]);
  const validate = () => {
    const errs = {};
    if (!form.surname.trim()) errs.surname = "Required";
    if (!form.region.trim()) errs.region = "Required";
    if (!form.language.trim()) errs.language = "Required";
    if (!form.grandparentsOrigin.trim()) errs.grandparentsOrigin = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleScan = async () => {
    if (!validate()) return;
    try {
      const result = await generateInsights.mutateAsync(form);
      setInsights(result);
    } catch {
      setInsights({
        ...FALLBACK_INSIGHTS,
        migrationStory: `The ${form.surname} lineage traces a remarkable journey from ${form.grandparentsOrigin} through ancient trade routes. Over generations, your ancestors from ${form.region} carried their ${form.language} language, customs, and identity across migrations shaped by history, commerce, and survival.`
      });
    }
  };
  const handleSave = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!insights) return;
    await saveProfile.mutateAsync({
      ...form,
      ancestryInsights: insights.migrationStory,
      migrationStory: insights.migrationStory,
      forgottenCustoms: insights.forgottenCustoms,
      traditionalOccupations: insights.traditionalOccupations,
      festivals: insights.festivals,
      foods: insights.foods
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4e3);
  };
  const isScanning = generateInsights.isPending;
  const hasResults = !!insights;
  const heroContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: ["Surname Analysis", "Migration Mapping", "Cultural DNA Decode"].map(
    (tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-purple border border-[oklch(0.45_0.25_295/0.3)] rounded-lg px-4 py-2 text-sm text-[oklch(0.85_0.10_295)]",
        children: [
          "✦ ",
          tag
        ]
      },
      tag
    )
  ) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModuleLayout,
    {
      title: "AI Heritage Identity Scanner",
      subtitle: "Enter your family roots and let our AI reveal centuries of hidden ancestry, migration stories, and forgotten customs.",
      icon: Cpu,
      accent: "purple",
      badge: "AI-Powered",
      onNavigateHome,
      onNavigate,
      heroContent,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-purple border border-[oklch(0.45_0.25_295/0.3)] rounded-2xl p-6 shadow-glow-purple sticky top-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-[oklch(0.45_0.25_295/0.2)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-[oklch(0.75_0.15_295)]", children: "1" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl gradient-text-purple", children: "Enter Your Heritage Roots" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "surname",
                  className: "text-sm font-medium text-foreground mb-1.5 block",
                  children: [
                    "Family Surname ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "surname",
                  "data-ocid": "scanner.surname_input",
                  placeholder: "e.g. Chakraborty, Singh, Okafor…",
                  value: form.surname,
                  onChange: (e) => setForm((p) => ({ ...p, surname: e.target.value })),
                  className: "bg-background/50"
                }
              ),
              errors.surname && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "scanner.surname.field_error",
                  className: "text-xs text-destructive mt-1",
                  children: errors.surname
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "region",
                  className: "text-sm font-medium text-foreground mb-1.5 block",
                  children: [
                    "Ancestral Region ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "region",
                  "data-ocid": "scanner.region_input",
                  placeholder: "e.g. Bengal, Rajasthan, Yoruba…",
                  value: form.region,
                  onChange: (e) => setForm((p) => ({ ...p, region: e.target.value })),
                  className: "bg-background/50"
                }
              ),
              errors.region && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "scanner.region.field_error",
                  className: "text-xs text-destructive mt-1",
                  children: errors.region
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "language",
                  className: "text-sm font-medium text-foreground mb-1.5 block",
                  children: [
                    "Heritage Language ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "language",
                  "data-ocid": "scanner.language_input",
                  placeholder: "e.g. Sanskrit, Igbo, Tamil…",
                  value: form.language,
                  onChange: (e) => setForm((p) => ({ ...p, language: e.target.value })),
                  className: "bg-background/50"
                }
              ),
              errors.language && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "scanner.language.field_error",
                  className: "text-xs text-destructive mt-1",
                  children: errors.language
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "grandparents",
                  className: "text-sm font-medium text-foreground mb-1.5 block",
                  children: [
                    "Grandparents' Origin",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "grandparents",
                  "data-ocid": "scanner.grandparents_input",
                  placeholder: "e.g. Dhaka, Jaipur, Lagos…",
                  value: form.grandparentsOrigin,
                  onChange: (e) => setForm((p) => ({
                    ...p,
                    grandparentsOrigin: e.target.value
                  })),
                  className: "bg-background/50"
                }
              ),
              errors.grandparentsOrigin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "scanner.grandparents.field_error",
                  className: "text-xs text-destructive mt-1",
                  children: errors.grandparentsOrigin
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "background",
                  className: "text-sm font-medium text-foreground mb-1.5 block",
                  children: [
                    "Family Background",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(Optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "background",
                  "data-ocid": "scanner.background_input",
                  placeholder: "Share anything you know about your family history, traditions, or stories…",
                  value: form.familyBackground,
                  onChange: (e) => setForm((p) => ({ ...p, familyBackground: e.target.value })),
                  rows: 3,
                  className: "bg-background/50 resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "scanner.scan_button",
                onClick: handleScan,
                disabled: isScanning,
                className: "w-full bg-[oklch(0.45_0.25_295)] hover:bg-[oklch(0.50_0.22_295)] text-[oklch(0.97_0.005_240)] font-semibold border-0 gap-2 mt-1",
                children: isScanning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    "data-ocid": "scanner.loading_state",
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" }),
                      "Scanning Heritage…"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "w-4 h-4" }),
                  "Scan My Heritage"
                ] })
              }
            ),
            hasResults && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "scanner.save_button",
                variant: "outline",
                onClick: handleSave,
                disabled: saveProfile.isPending,
                className: "w-full gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]",
                children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    "data-ocid": "scanner.save.loading_state",
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" }),
                      "Saving…"
                    ]
                  }
                ) : savedSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    "data-ocid": "scanner.save.success_state",
                    className: "flex items-center gap-2 text-green-500",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                      "Profile Saved!"
                    ]
                  }
                ) : !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  "Login to Save Profile"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  "Save Heritage Profile"
                ] })
              }
            )
          ] }),
          profileLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "scanner.profile.loading_state",
              className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border border-current/30 border-t-current rounded-full animate-spin" }),
                "Loading saved profile…"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 flex flex-col gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isScanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            "data-ocid": "scanner.scanning_state",
            className: "glass-purple border border-[oklch(0.45_0.25_295/0.25)] rounded-2xl",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(DNAScanAnimation, {})
          },
          "scanning"
        ) : hasResults && insights ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "flex flex-col gap-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-[oklch(0.45_0.25_295/0.2)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-[oklch(0.75_0.15_295)]", children: "2" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl gradient-text-purple", children: "Your Ancestry Revealed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "ml-auto bg-[oklch(0.45_0.25_295/0.15)] text-[oklch(0.75_0.12_295)] border-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 mr-1" }),
                  "AI Generated"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.05 },
                  "data-ocid": "scanner.migration_story",
                  className: "glass-purple border-l-4 border-l-[oklch(0.68_0.22_86)] border border-[oklch(0.45_0.25_295/0.2)] rounded-2xl p-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-[oklch(0.68_0.22_86)]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Migration Story" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-sm text-muted-foreground leading-relaxed italic border-l-0 pl-0", children: [
                      '"',
                      insights.migrationStory,
                      '"'
                    ] })
                  ]
                }
              ),
              insights.familyTreeNodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1 },
                  "data-ocid": "scanner.family_tree",
                  className: "glass-purple border border-[oklch(0.45_0.25_295/0.2)] rounded-2xl p-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-[oklch(0.68_0.22_86)]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Family Tree" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FamilyTreeSVG, { nodes: insights.familyTreeNodes })
                  ]
                }
              ),
              insights.forgottenCustoms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.15 },
                  "data-ocid": "scanner.forgotten_customs",
                  className: "glass border border-border/40 rounded-2xl p-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-[oklch(0.68_0.22_86)]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Forgotten Customs" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: insights.forgottenCustoms.map((custom, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ExpandableCustom,
                      {
                        text: custom,
                        index: i
                      },
                      custom
                    )) })
                  ]
                }
              ),
              insights.traditionalOccupations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2 },
                  "data-ocid": "scanner.occupations",
                  className: "glass border border-border/40 rounded-2xl p-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-5 h-5 text-[oklch(0.68_0.22_86)]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Traditional Occupations" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: insights.traditionalOccupations.map((occ, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        "data-ocid": `scanner.occupation.${i + 1}`,
                        className: "bg-gradient-to-r from-[oklch(0.68_0.22_86/0.15)] to-[oklch(0.76_0.18_80/0.1)] text-[oklch(0.62_0.18_86)] border border-[oklch(0.68_0.22_86/0.3)] px-3 py-1 text-sm",
                        children: occ
                      },
                      occ
                    )) })
                  ]
                }
              ),
              insights.festivals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.25 },
                  "data-ocid": "scanner.festivals",
                  className: "glass border border-border/40 rounded-2xl p-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-[oklch(0.68_0.22_86)]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Ancestral Festivals" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: insights.festivals.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Card,
                      {
                        "data-ocid": `scanner.festival.${i + 1}`,
                        className: "glass-purple border border-[oklch(0.45_0.25_295/0.25)] rounded-xl p-3 text-center card-hover cursor-default",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: festivalEmojis[i % festivalEmojis.length] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground leading-tight", children: f })
                        ]
                      },
                      f
                    )) })
                  ]
                }
              ),
              insights.foods.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3 },
                  "data-ocid": "scanner.foods",
                  className: "glass border border-border/40 rounded-2xl p-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "w-5 h-5 text-[oklch(0.68_0.22_86)]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Traditional Foods" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: insights.foods.map((food, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Card,
                      {
                        "data-ocid": `scanner.food.${i + 1}`,
                        className: "glass border border-border/40 rounded-xl p-3 text-center card-hover cursor-default",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: foodEmojis[i % foodEmojis.length] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground leading-tight", children: food })
                        ]
                      },
                      food
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.35 },
                  className: "flex flex-wrap gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        "data-ocid": "scanner.explore_traditions_button",
                        onClick: () => onNavigate("traditions"),
                        className: "gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]",
                        children: [
                          "Explore Your Traditions",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        "data-ocid": "scanner.explore_festivals_button",
                        onClick: () => onNavigate("festival-planner"),
                        className: "gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]",
                        children: [
                          "Plan Ancestral Festivals",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          },
          "results"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            "data-ocid": "scanner.empty_state",
            className: "flex flex-col items-center justify-center min-h-64 glass border border-border/40 rounded-2xl gap-4 text-center p-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-purple border border-[oklch(0.45_0.25_295/0.3)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-10 h-10 text-[oklch(0.65_0.18_295)]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[oklch(0.68_0.22_86)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-[oklch(0.12_0.08_260)]" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Discover Your Cultural DNA" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-xs", children: [
                  "Fill in your heritage details on the left and click",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.65_0.18_295)] font-medium", children: "Scan My Heritage" }),
                  " ",
                  "to uncover centuries of hidden ancestry."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "scanner.explore_button",
                  onClick: () => onNavigate("traditions"),
                  className: "gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]",
                  children: [
                    "Explore Traditions ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                  ]
                }
              )
            ]
          },
          "empty"
        ) }) })
      ] })
    }
  );
}
export {
  HeritageScannerPage as default
};
