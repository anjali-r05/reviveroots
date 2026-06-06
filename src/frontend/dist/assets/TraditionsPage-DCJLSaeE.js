import { c as createLucideIcon, u as useAuth, R as useListTraditions, V as useMyTraditionPrefs, W as useRecommendedTraditions, Y as useSetTraditionPrefs, Z as useSaveTraditionItem, _ as useUnsaveTraditionItem, r as reactExports, $ as useTraditionsByType, a0 as useTraditionsByRegion, a1 as TraditionCategory, j as jsxRuntimeExports, s as Star, m as motion, B as Button, S as Sparkles, A as AnimatePresence, f as Badge, M as MapPin, a2 as Heart, i as ChevronRight, a3 as Languages, X } from "./index-CITPV5fo.js";
import { M as ModuleLayout } from "./ModuleLayout-7elIkKUZ.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CFBXo_eO.js";
import { L as Label } from "./label-Bhpp8Kfq.js";
import { S as Skeleton } from "./skeleton-LfVS1a4w.js";
import { G as Globe } from "./globe-CUhZLH_-.js";
import "./index-Bhn06kaP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 2v8l3-3 3 3V2", key: "sqw3rj" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
];
const BookMarked = createLucideIcon("book-marked", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const ListFilter = createLucideIcon("list-filter", __iconNode);
const CATEGORY_LABELS = {
  [TraditionCategory.recipe]: "Recipe",
  [TraditionCategory.ritual]: "Ritual",
  [TraditionCategory.folkSong]: "Folk Song",
  [TraditionCategory.dance]: "Dance",
  [TraditionCategory.celebration]: "Celebration",
  [TraditionCategory.clothing]: "Clothing",
  [TraditionCategory.custom]: "Custom",
  [TraditionCategory.spiritualPractice]: "Spiritual"
};
const CATEGORY_EMOJIS = {
  [TraditionCategory.recipe]: "🍛",
  [TraditionCategory.ritual]: "🕯️",
  [TraditionCategory.folkSong]: "🎵",
  [TraditionCategory.dance]: "💃",
  [TraditionCategory.celebration]: "🎊",
  [TraditionCategory.clothing]: "👘",
  [TraditionCategory.custom]: "📿",
  [TraditionCategory.spiritualPractice]: "🙏"
};
const CATEGORY_GRADIENTS = {
  [TraditionCategory.recipe]: "from-[oklch(0.72_0.2_80/0.5)] to-[oklch(0.82_0.14_75/0.3)]",
  [TraditionCategory.ritual]: "from-[oklch(0.45_0.25_295/0.5)] to-[oklch(0.55_0.18_280/0.3)]",
  [TraditionCategory.folkSong]: "from-[oklch(0.65_0.15_200/0.5)] to-[oklch(0.72_0.12_195/0.3)]",
  [TraditionCategory.dance]: "from-[oklch(0.62_0.2_25/0.5)] to-[oklch(0.7_0.16_20/0.3)]",
  [TraditionCategory.celebration]: "from-[oklch(0.68_0.22_86/0.5)] to-[oklch(0.76_0.18_80/0.3)]",
  [TraditionCategory.clothing]: "from-[oklch(0.5_0.28_330/0.5)] to-[oklch(0.6_0.22_325/0.3)]",
  [TraditionCategory.custom]: "from-[oklch(0.52_0.18_35/0.5)] to-[oklch(0.6_0.14_40/0.3)]",
  [TraditionCategory.spiritualPractice]: "from-[oklch(0.4_0.2_275/0.5)] to-[oklch(0.5_0.18_265/0.3)]"
};
const REGIONS = [
  "All",
  "India",
  "East Asia",
  "Middle East",
  "Latin America",
  "Africa",
  "Mediterranean"
];
const TYPE_FILTERS = [
  { key: "all", label: "🌍 All" },
  { key: TraditionCategory.recipe, label: "🍛 Recipes" },
  { key: TraditionCategory.ritual, label: "🕯️ Rituals" },
  { key: TraditionCategory.dance, label: "💃 Dance & Music" },
  { key: TraditionCategory.celebration, label: "🎊 Celebrations" },
  { key: TraditionCategory.clothing, label: "👘 Clothing" },
  { key: TraditionCategory.custom, label: "📿 Customs" },
  { key: TraditionCategory.spiritualPractice, label: "🙏 Spiritual" }
];
const HERITAGE_REGIONS = [
  "India",
  "China",
  "Japan",
  "Egypt",
  "Mexico",
  "Nigeria",
  "Greece",
  "Persia",
  "Turkey"
];
const HERITAGE_LANGUAGES = [
  "Tamil",
  "Hindi",
  "Sanskrit",
  "Mandarin",
  "Japanese",
  "Arabic",
  "Spanish",
  "Yoruba",
  "Greek"
];
const SAMPLE_TRADITIONS = [
  {
    id: 1n,
    title: "Kolam Floor Art",
    category: TraditionCategory.ritual,
    description: "Sacred geometric patterns drawn with rice flour at dawn to invite prosperity and ward off evil spirits — a living meditative practice passed through generations of South Indian women.",
    region: "South India",
    tags: ["art", "daily", "spiritual"],
    imageUrl: "",
    languages: ["Tamil", "Telugu"],
    steps: [
      "Wake before sunrise and purify yourself",
      "Clean the entrance with water",
      "Draw base dots in a grid pattern",
      "Connect dots with flowing curved lines",
      "Add color with natural pigments"
    ],
    createdAt: 0n
  },
  {
    id: 2n,
    title: "Mehndi Storytelling",
    category: TraditionCategory.custom,
    description: "Ancestral migration stories encoded in intricate henna designs worn during weddings and rites of passage — each motif a chapter of the family's oral history.",
    region: "Rajasthan",
    tags: ["body art", "wedding", "story"],
    imageUrl: "",
    languages: ["Hindi", "Rajasthani"],
    steps: [
      "Grind fresh henna leaves into a fine paste",
      "Add eucalyptus oil and lemon for staining",
      "Choose family motifs with ancestral meaning",
      "Apply with cone using steady pressure",
      "Leave to dry for 6-8 hours"
    ],
    createdAt: 0n
  },
  {
    id: 3n,
    title: "Biryani Dum Method",
    category: TraditionCategory.recipe,
    description: "Seven-layer slow-cooked rice ceremony passed through generations of royal kitchens since the Mughal era — a ritual of patience, love, and aromatic mastery.",
    region: "Hyderabad",
    tags: ["food", "royal", "Mughal"],
    imageUrl: "",
    languages: ["Urdu", "Telugu"],
    steps: [
      "Marinate meat in yogurt and spices overnight",
      "Parboil basmati rice with whole spices",
      "Caramelize onions until golden-brown",
      "Layer rice and meat alternately with saffron milk",
      "Seal the pot with dough and slow-cook on coal",
      "Rest 20 minutes before opening"
    ],
    createdAt: 0n
  },
  {
    id: 4n,
    title: "Bharatanatyam Temple Dance",
    category: TraditionCategory.dance,
    description: "Classical devotional dance form from Tamil Nadu temples — a living scripture in movement, each gesture narrating stories of deities and cosmic creation.",
    region: "Tamil Nadu",
    tags: ["dance", "temple", "classical"],
    imageUrl: "",
    languages: ["Tamil", "Sanskrit"],
    steps: [
      "Master the 27 basic hand mudras",
      "Learn the nine facial expressions (navarasas)",
      "Practice adavus (footwork sequences)",
      "Study abhinaya (expressive storytelling)"
    ],
    createdAt: 0n
  },
  {
    id: 5n,
    title: "Baul Mystic Music",
    category: TraditionCategory.folkSong,
    description: "Wandering mystic minstrels of Bengal who carry profound philosophical songs about the divine within. Their music is UNESCO recognized as intangible cultural heritage.",
    region: "Bengal",
    tags: ["music", "mysticism", "folk"],
    imageUrl: "",
    languages: ["Bengali"],
    steps: [
      "Learn ektara (one-string instrument) playing",
      "Study Baul philosophy texts",
      "Practice lalon geeti (devotional compositions)",
      "Wear saffron and walk the countryside singing"
    ],
    createdAt: 0n
  },
  {
    id: 6n,
    title: "Diwali Ancestor Lamp Ritual",
    category: TraditionCategory.celebration,
    description: "Ancient tradition of placing clay diyas at waterways during Pitru Paksha to guide ancestors' souls — a deeply personal ritual of remembrance and gratitude.",
    region: "North India",
    tags: ["festival", "light", "ancestor"],
    imageUrl: "",
    languages: ["Hindi", "Sanskrit"],
    steps: [
      "Shape clay diyas by hand or buy from potters",
      "Fill with mustard oil (symbolizing the sun)",
      "Add a cotton wick soaked in ghee",
      "Light at sunset while chanting ancestral prayers",
      "Float on rivers or place at doorsteps"
    ],
    createdAt: 0n
  },
  {
    id: 7n,
    title: "Ikat Textile Weaving",
    category: TraditionCategory.clothing,
    description: "An ancient resist-dyeing technique where patterns are dyed into threads before weaving — creating mesmerizing geometric designs that blur at the edges like watercolor dreams.",
    region: "Odisha",
    tags: ["textile", "craft", "geometric"],
    imageUrl: "",
    languages: ["Odia", "Telugu"],
    steps: [
      "Bundle threads and tie-resist with wax",
      "Dye in natural indigo or turmeric",
      "Repeat for multi-color patterns",
      "Carefully warp the loom aligning patterns",
      "Weave slowly to maintain pattern alignment"
    ],
    createdAt: 0n
  },
  {
    id: 8n,
    title: "Vipassana Meditation",
    category: TraditionCategory.spiritualPractice,
    description: "2,500-year-old insight meditation technique rediscovered by Gautama Buddha — observing breath and bodily sensations to achieve equanimity and liberation from suffering.",
    region: "India",
    tags: ["meditation", "buddhism", "mindfulness"],
    imageUrl: "",
    languages: ["Pali", "Hindi"],
    steps: [
      "Observe natural breathing for 3 days (Anapana)",
      "Scan body sensations from head to feet",
      "Maintain equanimity toward pleasant and unpleasant",
      "Practice Metta (loving-kindness) at session end"
    ],
    createdAt: 0n
  }
];
function TraditionCard({
  tradition,
  index,
  isSaved,
  isLoggedIn,
  onSave,
  onExplore
}) {
  const cat = tradition.category;
  const gradient = CATEGORY_GRADIENTS[cat] ?? CATEGORY_GRADIENTS[TraditionCategory.custom];
  const emoji = CATEGORY_EMOJIS[cat] ?? "✨";
  const label = CATEGORY_LABELS[cat] ?? String(cat);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.35 },
      "data-ocid": `traditions.item.${index + 1}`,
      className: "group relative glass border border-border/40 rounded-2xl overflow-hidden flex flex-col\n        transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_oklch(0.62_0.2_25/0.25)]\n        hover:border-[oklch(0.62_0.2_25/0.4)] cursor-pointer",
      onClick: () => onExplore(tradition),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl select-none", children: emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-background/60 backdrop-blur-sm text-foreground border-0 text-[10px] gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5" }),
                tradition.region
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `traditions.save_button.${index + 1}`,
                  onClick: (e) => {
                    e.stopPropagation();
                    onSave(tradition.id, isSaved);
                  },
                  "aria-label": isSaved ? "Unsave tradition" : "Save tradition",
                  className: `absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
            backdrop-blur-sm transition-all duration-200
            ${isSaved ? "bg-[oklch(0.62_0.2_25/0.9)] text-[oklch(0.97_0.005_240)]" : "bg-background/60 text-muted-foreground hover:text-[oklch(0.62_0.2_25)] hover:bg-background/80"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: `w-3.5 h-3.5 transition-all duration-200 ${isSaved ? "fill-current scale-110" : ""}`
                    }
                  )
                }
              ),
              !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-foreground/80 bg-background/80 rounded-full px-2 py-0.5", children: "Login to save" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[oklch(0.62_0.2_25/0.12)] text-[oklch(0.62_0.2_25)] border-0 text-[10px] shrink-0", children: label }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground leading-tight line-clamp-1", children: tradition.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1", children: tradition.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: tradition.languages.slice(0, 2).map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[9px] text-muted-foreground bg-muted rounded px-1 py-0.5",
                children: lang
              },
              lang
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                "data-ocid": `traditions.explore_button.${index + 1}`,
                onClick: (e) => {
                  e.stopPropagation();
                  onExplore(tradition);
                },
                className: "h-6 text-[11px] gap-1 text-[oklch(0.62_0.2_25)] hover:bg-[oklch(0.62_0.2_25/0.1)] px-2",
                children: [
                  "Explore ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function HorizontalScrollRow({
  title,
  badge,
  items,
  isSavedFn,
  isLoggedIn,
  onSave,
  onExplore
}) {
  const rowRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: title }),
      badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[oklch(0.68_0.22_86/0.15)] text-[oklch(0.68_0.22_86)] border-0 text-[10px]", children: badge })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: rowRef,
          className: "flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide",
          style: { scrollbarWidth: "none" },
          children: items.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-none w-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TraditionCard,
            {
              tradition: t,
              index: i,
              isSaved: isSavedFn(t.id),
              isLoggedIn,
              onSave,
              onExplore
            }
          ) }, String(t.id)))
        }
      )
    ] })
  ] });
}
function PrefsModal({
  open,
  onClose,
  onSave,
  isSaving
}) {
  const [selRegions, setSelRegions] = reactExports.useState([]);
  const [selLangs, setSelLangs] = reactExports.useState([]);
  const toggle = (arr, set, val) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "glass border border-border/60 max-w-md rounded-2xl p-6",
      "data-ocid": "traditions.prefs_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl gradient-text-gold", children: "Set Your Heritage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Personalize your tradition recommendations based on your roots." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground mb-2 block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "inline w-3 h-3 mr-1" }),
              "Heritage Regions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: HERITAGE_REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggle(selRegions, setSelRegions, r),
                className: `px-3 py-1 rounded-full text-xs transition-all duration-200 border
                    ${selRegions.includes(r) ? "bg-[oklch(0.68_0.22_86)] text-[oklch(0.1_0.05_260)] border-transparent" : "border-border/50 text-muted-foreground hover:border-[oklch(0.68_0.22_86/0.5)]"}`,
                children: r
              },
              r
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground mb-2 block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "inline w-3 h-3 mr-1" }),
              "Heritage Languages"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: HERITAGE_LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggle(selLangs, setSelLangs, l),
                className: `px-3 py-1 rounded-full text-xs transition-all duration-200 border
                    ${selLangs.includes(l) ? "bg-[oklch(0.62_0.2_25)] text-[oklch(0.97_0.005_240)] border-transparent" : "border-border/50 text-muted-foreground hover:border-[oklch(0.62_0.2_25/0.5)]"}`,
                children: l
              },
              l
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 border-border/50",
                onClick: onClose,
                "data-ocid": "traditions.prefs_cancel_button",
                children: "Skip for now"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 bg-[oklch(0.68_0.22_86)] text-[oklch(0.1_0.05_260)] hover:bg-[oklch(0.72_0.2_80)]",
                onClick: () => onSave(selRegions, selLangs),
                disabled: isSaving,
                "data-ocid": "traditions.prefs_save_button",
                children: isSaving ? "Saving…" : "Save Preferences"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function DetailModal({
  tradition,
  isSaved,
  isLoggedIn,
  onClose,
  onSave,
  related,
  onExplore
}) {
  if (!tradition) return null;
  const cat = tradition.category;
  const gradient = CATEGORY_GRADIENTS[cat] ?? CATEGORY_GRADIENTS[TraditionCategory.custom];
  const emoji = CATEGORY_EMOJIS[cat] ?? "✨";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!tradition, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "glass border border-border/60 max-w-2xl rounded-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto",
      "data-ocid": "traditions.detail_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-7xl select-none", children: emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "data-ocid": "traditions.detail_close_button",
                  className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-4 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-background/60 backdrop-blur-sm text-foreground border-0 text-[10px]", children: CATEGORY_LABELS[cat] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-background/60 backdrop-blur-sm text-foreground border-0 text-[10px] gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5" }),
                  tradition.region
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-2xl text-foreground leading-tight", children: tradition.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "traditions.detail_save_button",
                onClick: () => onSave(tradition.id, isSaved),
                "aria-label": isSaved ? "Unsave" : "Save to my traditions",
                className: `flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                ${isSaved ? "bg-[oklch(0.62_0.2_25/0.15)] text-[oklch(0.62_0.2_25)] border border-[oklch(0.62_0.2_25/0.4)]" : "bg-muted text-muted-foreground hover:bg-[oklch(0.62_0.2_25/0.1)] hover:text-[oklch(0.62_0.2_25)] border border-border/50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: `w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`
                    }
                  ),
                  isSaved ? "Saved" : "Save"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: tradition.description }),
          tradition.languages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-3.5 h-3.5 text-[oklch(0.68_0.22_86)]" }),
              "Languages"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tradition.languages.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "bg-[oklch(0.68_0.22_86/0.1)] text-[oklch(0.68_0.22_86)] border-0 text-[10px]",
                children: l
              },
              l
            )) })
          ] }),
          tradition.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tradition.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5",
              children: [
                "#",
                tag
              ]
            },
            tag
          )) }),
          tradition.steps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ListFilter, { className: "w-3.5 h-3.5 text-[oklch(0.62_0.2_25)]" }),
              cat === "recipe" ? "Instructions" : "How to Practice"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: tradition.steps.map((step, stepIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-5 h-5 rounded-full bg-[oklch(0.62_0.2_25/0.12)] text-[oklch(0.62_0.2_25)] text-[10px] font-bold flex items-center justify-center mt-0.5", children: stepIdx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground leading-relaxed", children: step })
            ] }, step)) })
          ] }),
          related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-semibold text-foreground mb-3", children: [
              "Related from ",
              tradition.region
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-2 overflow-x-auto pb-1",
                style: { scrollbarWidth: "none" },
                children: related.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => onExplore(r),
                    className: "flex-none glass border border-border/40 rounded-xl p-2.5 text-left hover:border-[oklch(0.62_0.2_25/0.4)] transition-all duration-200 w-36",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl block mb-1", children: CATEGORY_EMOJIS[r.category] ?? "✨" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-foreground line-clamp-2 leading-tight", children: r.title })
                    ]
                  },
                  String(r.id)
                ))
              }
            )
          ] }),
          !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[oklch(0.68_0.22_86/0.08)] border border-[oklch(0.68_0.22_86/0.2)] rounded-xl p-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Sign in to save this tradition to your heritage library" }) })
        ] })
      ]
    }
  ) });
}
function TraditionsPage({ onNavigateHome, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { data: allTraditions = [], isLoading } = useListTraditions();
  const { data: prefs, isLoading: prefsLoading } = useMyTraditionPrefs();
  const { data: recommended = [] } = useRecommendedTraditions();
  const setPrefs = useSetTraditionPrefs();
  const saveItem = useSaveTraditionItem();
  const unsaveItem = useUnsaveTraditionItem();
  const [activeType, setActiveType] = reactExports.useState(
    "all"
  );
  const [activeRegion, setActiveRegion] = reactExports.useState("All");
  const [activeTab, setActiveTab] = reactExports.useState("discover");
  const { data: byType = [] } = useTraditionsByType(
    activeType !== "all" ? activeType : ""
  );
  const { data: byRegion = [] } = useTraditionsByRegion(
    activeRegion !== "All" ? activeRegion : ""
  );
  const [showPrefsModal, setShowPrefsModal] = reactExports.useState(false);
  const [selectedTradition, setSelectedTradition] = reactExports.useState(null);
  const savedIds = new Set(((prefs == null ? void 0 : prefs.savedItemIds) ?? []).map(String));
  const isSaved = (id) => savedIds.has(String(id));
  const displayAll = allTraditions.length ? allTraditions : SAMPLE_TRADITIONS;
  let filtered;
  if (activeRegion !== "All" && activeType !== "all") {
    filtered = byRegion.filter((t) => t.category === activeType);
  } else if (activeRegion !== "All") {
    filtered = byRegion.length ? byRegion : displayAll.filter(
      (t) => t.region.toLowerCase().includes(activeRegion.toLowerCase())
    );
  } else if (activeType !== "all") {
    filtered = byType.length ? byType : displayAll.filter((t) => t.category === activeType);
  } else {
    filtered = displayAll;
  }
  const displayRecommended = recommended.length > 0 ? recommended : displayAll.slice(0, 6);
  const savedTraditions = displayAll.filter((t) => savedIds.has(String(t.id)));
  const getRelated = (t) => displayAll.filter((x) => x.region === t.region && x.id !== t.id).slice(0, 4);
  const toggleSave = (id, saved) => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    if (saved) {
      unsaveItem.mutate(id);
    } else {
      saveItem.mutate(id);
    }
  };
  const handleSavePrefs = async (regions, langs) => {
    await setPrefs.mutateAsync({
      heritageRegions: regions,
      heritageLanguages: langs
    });
    setShowPrefsModal(false);
  };
  const hasPrefs = prefs && (prefs.heritageRegions.length > 0 || prefs.heritageLanguages.length > 0);
  const heroContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-coral border border-[oklch(0.62_0.20_25/0.3)] rounded-xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-display font-bold gradient-text-coral", children: [
      displayAll.length,
      "+"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Living Traditions" })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ModuleLayout,
    {
      title: "Tradition Recommendation Engine",
      subtitle: "Rediscover forgotten recipes, folk songs, rituals, customs, clothing, seasonal celebrations, and spiritual practices from your heritage.",
      icon: Star,
      accent: "coral",
      badge: "Netflix-Style Discovery",
      onNavigateHome,
      onNavigate,
      heroContent,
      children: [
        !prefsLoading && !hasPrefs && isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "mb-6 glass border border-[oklch(0.68_0.22_86/0.3)] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
            "data-ocid": "traditions.prefs_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🌿" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Set your heritage to get personalized recommendations" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tell us your roots and we'll surface traditions you'll love" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-[oklch(0.68_0.22_86)] text-[oklch(0.1_0.05_260)] hover:bg-[oklch(0.72_0.2_80)] shrink-0",
                  onClick: () => setShowPrefsModal(true),
                  "data-ocid": "traditions.set_prefs_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 mr-1.5" }),
                    "Personalize"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 mb-8 bg-muted/50 rounded-full p-1 w-fit",
            "data-ocid": "traditions.tabs",
            children: ["discover", "saved"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `traditions.tab.${tab}`,
                onClick: () => setActiveTab(tab),
                className: `px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === tab ? "bg-[oklch(0.62_0.2_25)] text-[oklch(0.97_0.005_240)] shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: tab === "discover" ? "✨ Discover" : `💾 My Saved (${savedIds.size})`
              },
              tab
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          activeTab === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -20 },
              transition: { duration: 0.25 },
              children: savedTraditions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "traditions.saved_empty_state",
                  className: "flex flex-col items-center gap-4 py-20 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-14 h-14 text-[oklch(0.62_0.2_25)] opacity-30" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Your heritage library is empty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "Start saving traditions to build your personal heritage library — tap the heart on any tradition card." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "border-[oklch(0.62_0.2_25/0.4)] text-[oklch(0.62_0.2_25)] hover:bg-[oklch(0.62_0.2_25/0.08)] mt-2",
                        onClick: () => setActiveTab("discover"),
                        "data-ocid": "traditions.go_discover_button",
                        children: "Browse Traditions"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: savedTraditions.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TraditionCard,
                {
                  tradition: t,
                  index: i,
                  isSaved: true,
                  isLoggedIn: isAuthenticated,
                  onSave: toggleSave,
                  onExplore: setSelectedTradition
                },
                String(t.id)
              )) })
            },
            "saved"
          ),
          activeTab === "discover" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 20 },
              transition: { duration: 0.25 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    HorizontalScrollRow,
                    {
                      title: "Popular Traditions",
                      badge: "Top Picks",
                      items: displayRecommended,
                      isSavedFn: isSaved,
                      isLoggedIn: false,
                      onSave: toggleSave,
                      onExplore: setSelectedTradition
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => onNavigate("signup"),
                      className: "pointer-events-auto bg-[oklch(0.68_0.22_86)] text-[oklch(0.1_0.05_260)] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[oklch(0.72_0.2_80)] transition-colors shadow-lg",
                      "data-ocid": "traditions.login_cta_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "inline w-3 h-3 mr-1.5" }),
                        "Sign in for personalized picks"
                      ]
                    }
                  ) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  HorizontalScrollRow,
                  {
                    title: "✨ For You",
                    badge: "Personalized",
                    items: displayRecommended,
                    isSavedFn: isSaved,
                    isLoggedIn: isAuthenticated,
                    onSave: toggleSave,
                    onExplore: setSelectedTradition
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex gap-2 flex-wrap",
                      "data-ocid": "traditions.category_filters",
                      children: TYPE_FILTERS.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `traditions.filter.${key}`,
                          onClick: () => setActiveType(key),
                          className: `px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border
                      ${activeType === key ? "bg-[oklch(0.62_0.2_25)] text-[oklch(0.97_0.005_240)] border-transparent shadow-sm" : "glass-coral border-[oklch(0.62_0.2_25/0.3)] text-[oklch(0.62_0.2_25)] hover:bg-[oklch(0.62_0.2_25/0.08)]"}`,
                          children: label
                        },
                        key
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex gap-2 flex-wrap",
                      "data-ocid": "traditions.region_filters",
                      children: REGIONS.map((region) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `traditions.region.${region.toLowerCase().replace(/\s+/g, "_")}`,
                          onClick: () => setActiveRegion(region),
                          className: `px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 border
                      ${activeRegion === region ? "bg-[oklch(0.68_0.22_86)] text-[oklch(0.1_0.05_260)] border-transparent" : "border-border/50 text-muted-foreground hover:border-[oklch(0.68_0.22_86/0.4)] hover:text-foreground"}`,
                          children: region
                        },
                        region
                      ))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: activeType === "all" && activeRegion === "All" ? "All Traditions" : activeRegion !== "All" ? `${activeRegion} Traditions` : `${CATEGORY_LABELS[activeType]} Traditions` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    filtered.length,
                    " found"
                  ] })
                ] }),
                isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": "traditions.loading_state",
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
                    children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" }, i))
                  }
                ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "traditions.empty_state",
                    className: "flex flex-col items-center gap-4 py-16 text-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-12 h-12 text-[oklch(0.62_0.2_25)] opacity-30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No traditions found for this filter" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try a different category or region" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "outline",
                          "data-ocid": "traditions.clear_filter_button",
                          onClick: () => {
                            setActiveType("all");
                            setActiveRegion("All");
                          },
                          className: "border-[oklch(0.62_0.2_25/0.4)] text-[oklch(0.62_0.2_25)] hover:bg-[oklch(0.62_0.2_25/0.08)]",
                          children: "Show All Traditions"
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TraditionCard,
                  {
                    tradition: t,
                    index: i,
                    isSaved: isSaved(t.id),
                    isLoggedIn: isAuthenticated,
                    onSave: toggleSave,
                    onExplore: setSelectedTradition
                  },
                  String(t.id)
                )) })
              ]
            },
            "discover"
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PrefsModal,
          {
            open: showPrefsModal,
            onClose: () => setShowPrefsModal(false),
            onSave: handleSavePrefs,
            isSaving: setPrefs.isPending
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailModal,
          {
            tradition: selectedTradition,
            isSaved: selectedTradition ? isSaved(selectedTradition.id) : false,
            isLoggedIn: isAuthenticated,
            onClose: () => setSelectedTradition(null),
            onSave: toggleSave,
            related: selectedTradition ? getRelated(selectedTradition) : [],
            onExplore: (t) => setSelectedTradition(t)
          }
        )
      ]
    }
  );
}
export {
  TraditionsPage as default
};
