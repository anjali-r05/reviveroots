import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, u as useAuth, l as useLanguageProgress, n as useStartLanguage, o as useCompleteLesson, p as useLessonsByLanguage, q as ue, h as BookOpen, s as Star, m as motion, t as Award, P as Play, A as AnimatePresence, f as Badge, i as ChevronRight, B as Button, S as Sparkles, T as Trophy } from "./index-CITPV5fo.js";
import { M as ModuleLayout } from "./ModuleLayout-7elIkKUZ.js";
import { P as Primitive } from "./index-Bhn06kaP.js";
import { S as Skeleton } from "./skeleton-LfVS1a4w.js";
import { F as Flame } from "./flame-Beyg7maF.js";
import { P as PenLine } from "./pen-line-DfGMLJx5.js";
import { C as Check } from "./check-DMQNbgkc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$1);
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
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const availableLanguages = [
  {
    code: "Sanskrit",
    name: "Sanskrit",
    script: "संस्कृतम्",
    nativeScript: "देवनागरी",
    region: "South Asia",
    speakers: "14,000+ scholars",
    color: "amber",
    emoji: "🕉️",
    bgClass: "bg-[oklch(0.72_0.20_80/0.08)]",
    borderClass: "border-[oklch(0.72_0.20_80/0.3)]",
    textClass: "text-[oklch(0.72_0.20_80)]",
    hoverBg: "hover:bg-[oklch(0.72_0.20_80/0.15)]",
    sampleWords: [
      "नमस्ते (Namaste) — Hello",
      "धन्यवाद (Dhanyavad) — Thank you",
      "आचार्य (Acharya) — Teacher"
    ]
  },
  {
    code: "Pali",
    name: "Pali",
    script: "𑀧𑀸𑀮𑀺",
    nativeScript: "Brahmi Script",
    region: "Buddhist World",
    speakers: "5,000+ monks",
    color: "cyan",
    emoji: "🪷",
    bgClass: "bg-[oklch(0.65_0.15_200/0.08)]",
    borderClass: "border-[oklch(0.65_0.15_200/0.3)]",
    textClass: "text-[oklch(0.65_0.15_200)]",
    hoverBg: "hover:bg-[oklch(0.65_0.15_200/0.15)]",
    sampleWords: ["Namo — Homage", "Dhamma — Teachings", "Sangha — Community"]
  },
  {
    code: "Aramaic",
    name: "Aramaic",
    script: "ܐܪܡܝܐ",
    nativeScript: "Syriac Script",
    region: "Middle East",
    speakers: "600,000 native",
    color: "saffron",
    emoji: "🏺",
    bgClass: "bg-[oklch(0.75_0.18_65/0.08)]",
    borderClass: "border-[oklch(0.75_0.18_65/0.3)]",
    textClass: "text-[oklch(0.75_0.18_65)]",
    hoverBg: "hover:bg-[oklch(0.75_0.18_65/0.15)]",
    sampleWords: [
      "ܫܠܡܐ (Shlomo) — Peace",
      "ܡܪܝ (Mari) — My Lord",
      "ܐܒܐ (Aba) — Father"
    ]
  },
  {
    code: "Coptic",
    name: "Coptic",
    script: "ⲕⲱⲡⲧⲓⲕⲟⲛ",
    nativeScript: "Coptic Script",
    region: "North Africa",
    speakers: "300 fluent speakers",
    color: "coral",
    emoji: "☥",
    bgClass: "bg-[oklch(0.62_0.20_25/0.08)]",
    borderClass: "border-[oklch(0.62_0.20_25/0.3)]",
    textClass: "text-[oklch(0.62_0.20_25)]",
    hoverBg: "hover:bg-[oklch(0.62_0.20_25/0.15)]",
    sampleWords: [
      "Ⲛⲟⲩⲧⲉ (Noute) — God",
      "ϩⲙⲟⲧ (Hmot) — Grace",
      "ⲁⲅⲁⲡⲏ (Agapi) — Love"
    ]
  },
  {
    code: "Nahuatl",
    name: "Nahuatl",
    script: "Nāhuatlahtōlli",
    nativeScript: "Latin / Pictographic",
    region: "Central Mexico",
    speakers: "1.7 million",
    color: "purple",
    emoji: "🌺",
    bgClass: "bg-[oklch(0.45_0.25_295/0.08)]",
    borderClass: "border-[oklch(0.45_0.25_295/0.3)]",
    textClass: "text-[oklch(0.65_0.15_295)]",
    hoverBg: "hover:bg-[oklch(0.45_0.25_295/0.15)]",
    sampleWords: [
      "Niltze — Hello",
      "Tlazohcamati — Thank you",
      "Teōtl — Divine force"
    ]
  },
  {
    code: "Quechua",
    name: "Quechua",
    script: "Runasimi",
    nativeScript: "Quechua Script",
    region: "Andes",
    speakers: "8–10 million",
    color: "magenta",
    emoji: "🏔️",
    bgClass: "bg-[oklch(0.50_0.28_330/0.08)]",
    borderClass: "border-[oklch(0.50_0.28_330/0.3)]",
    textClass: "text-[oklch(0.65_0.18_330)]",
    hoverBg: "hover:bg-[oklch(0.50_0.28_330/0.15)]",
    sampleWords: [
      "Rimaykullayki — Hello",
      "Añay — Thank you",
      "Pachamama — Mother Earth"
    ]
  }
];
const conversationPairs = {
  Sanskrit: [
    {
      q: "भवान् कः अस्ति? (Who are you?)",
      a: "अहम् छात्रः अस्मि (I am a student)",
      hint: "Type about yourself"
    },
    {
      q: "किम् वदसि? (What do you say?)",
      a: "सत्यम् वदामि (I speak truth)",
      hint: "Type your response"
    },
    {
      q: "कथम् अस्ति? (How are you?)",
      a: "अहम् सुष्ठु अस्मि (I am well)",
      hint: "Respond in any form"
    },
    {
      q: "कुत्र गच्छसि? (Where are you going?)",
      a: "विद्यालयम् गच्छामि (I go to school)",
      hint: "Describe a destination"
    },
    {
      q: "किम् अभिलषसि? (What do you desire?)",
      a: "ज्ञानम् इच्छामि (I desire knowledge)",
      hint: "Express a wish"
    }
  ],
  default: [
    {
      q: "Greet me in your target language",
      a: "Hello / Peace be upon you",
      hint: "Type a greeting"
    },
    { q: "Say your name", a: "My name is...", hint: "Introduce yourself" },
    { q: "Count to three", a: "One, Two, Three", hint: "Try counting" },
    {
      q: "Express gratitude",
      a: "Thank you very much",
      hint: "Show appreciation"
    },
    {
      q: "Say farewell",
      a: "Goodbye / Until we meet again",
      hint: "End the conversation"
    }
  ]
};
const scriptData = {
  Sanskrit: [
    {
      char: "अ",
      name: "A",
      meaning: "First vowel, imperishable",
      stroke: "Start top-right, curve left"
    },
    {
      char: "ॐ",
      name: "Om",
      meaning: "Sacred syllable, cosmic sound",
      stroke: "Circular base, then hook above"
    },
    {
      char: "क",
      name: "Ka",
      meaning: "First consonant, brilliance",
      stroke: "Vertical line, then two strokes right"
    },
    {
      char: "ह",
      name: "Ha",
      meaning: "Last consonant, life breath",
      stroke: "Two vertical lines connected"
    },
    {
      char: "र",
      name: "Ra",
      meaning: "Sun, energy, radiance",
      stroke: "Curve then diagonal tick"
    },
    {
      char: "म",
      name: "Ma",
      meaning: "Moon, mind, mother",
      stroke: "Three arches connected at base"
    }
  ],
  default: [
    {
      char: "α",
      name: "Alpha",
      meaning: "Beginning",
      stroke: "Circle with a tail"
    },
    {
      char: "β",
      name: "Beta",
      meaning: "Life",
      stroke: "Vertical with two loops"
    },
    { char: "γ", name: "Gamma", meaning: "Energy", stroke: "Inverted Y shape" },
    {
      char: "δ",
      name: "Delta",
      meaning: "Change",
      stroke: "Triangle then circle"
    },
    {
      char: "ε",
      name: "Epsilon",
      meaning: "Simplicity",
      stroke: "Open C shape"
    },
    { char: "ζ", name: "Zeta", meaning: "Wisdom", stroke: "Z then underline" }
  ]
};
function getConversationFeedback(input, expected) {
  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const hasKeyword = expected.toLowerCase().split(/\s+/).some((w) => input.toLowerCase().includes(w.substring(0, 3)));
  if (words === 0)
    return {
      score: 0,
      feedback: "Please type a response to continue.",
      color: "text-muted-foreground"
    };
  if (words >= 5 && hasKeyword)
    return {
      score: 95,
      feedback: "Excellent! Your response shows deep understanding. 🌟",
      color: "text-[oklch(0.65_0.18_140)]"
    };
  if (words >= 3)
    return {
      score: 78,
      feedback: "Good effort! Try using more vocabulary from the lesson. 👏",
      color: "text-[oklch(0.72_0.20_80)]"
    };
  return {
    score: 55,
    feedback: "Keep practicing! Longer responses earn higher scores. 💪",
    color: "text-[oklch(0.75_0.18_65)]"
  };
}
function LanguageRevivalPage({
  onNavigateHome,
  onNavigate
}) {
  const { isAuthenticated } = useAuth();
  const { data: progress, isLoading } = useLanguageProgress();
  const startLanguage = useStartLanguage();
  const completeLesson = useCompleteLesson();
  const [selectedLang, setSelectedLang] = reactExports.useState(
    (progress == null ? void 0 : progress.languageChosen) ?? ""
  );
  const { data: lessons, isLoading: lessonsLoading } = useLessonsByLanguage(selectedLang);
  const [activeTab, setActiveTab] = reactExports.useState("lessons");
  const [expandedLesson, setExpandedLesson] = reactExports.useState(null);
  const [completedLessons, setCompletedLessons] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [convIndex, setConvIndex] = reactExports.useState(0);
  const [convInput, setConvInput] = reactExports.useState("");
  const [convFeedback, setConvFeedback] = reactExports.useState(null);
  const [revealedScripts, setRevealedScripts] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [celebrateId, setCelebrateId] = reactExports.useState(null);
  const handleStart = async (code) => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setSelectedLang(code);
    try {
      await startLanguage.mutateAsync(code);
      ue.success(`Started learning ${code}! Your journey begins.`);
    } catch {
      ue.error("Failed to start language. Please try again.");
    }
  };
  const handleCompleteLesson = reactExports.useCallback(
    async (lesson) => {
      const key = lesson.id.toString();
      if (completedLessons.has(key)) return;
      const score = BigInt(Math.floor(Math.random() * 41) + 60);
      try {
        await completeLesson.mutateAsync({ lessonId: lesson.id, score });
        setCompletedLessons((prev) => /* @__PURE__ */ new Set([...prev, key]));
        setCelebrateId(key);
        setTimeout(() => setCelebrateId(null), 2e3);
        ue.success(`Lesson complete! Score: ${score}/100 🎉`);
      } catch {
        ue.error("Failed to save progress. Please try again.");
      }
    },
    [completedLessons, completeLesson]
  );
  const handleConvSubmit = () => {
    const pairs = conversationPairs[selectedLang] ?? conversationPairs.default;
    const pair = pairs[convIndex];
    const fb = getConversationFeedback(convInput, pair.a);
    setConvFeedback(fb);
  };
  const handleConvNext = () => {
    const pairs = conversationPairs[selectedLang] ?? conversationPairs.default;
    setConvIndex((i) => (i + 1) % pairs.length);
    setConvInput("");
    setConvFeedback(null);
  };
  const toggleScript = (idx) => {
    setRevealedScripts((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };
  const streakDays = Number((progress == null ? void 0 : progress.streakDays) ?? 0);
  const wordsLearned = Number((progress == null ? void 0 : progress.wordsLearned) ?? 0);
  const currentLesson = Number((progress == null ? void 0 : progress.currentLesson) ?? 0);
  const pronunciationScore = Number((progress == null ? void 0 : progress.pronunciationScore) ?? 0);
  const totalLessonsCompleted = Number((progress == null ? void 0 : progress.totalLessonsCompleted) ?? 0);
  const totalLessons = (lessons == null ? void 0 : lessons.length) ?? 5;
  const progressPct = totalLessons > 0 ? Math.round(totalLessonsCompleted / totalLessons * 100) : 0;
  const selectedLangData = availableLanguages.find(
    (l) => l.code === selectedLang
  );
  const convPairs = conversationPairs[selectedLang] ?? conversationPairs.default;
  const scripts = scriptData[selectedLang] ?? scriptData.default;
  const heroContent = progress ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-indigo border border-[oklch(0.40_0.20_275/0.3)] rounded-xl p-4 min-w-[180px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[oklch(0.72_0.10_275)] mb-2 font-medium", children: "Your Progress" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-[oklch(0.72_0.20_80)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-[oklch(0.70_0.12_275)]", children: streakDays }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[oklch(0.72_0.10_275)]", children: "day streak" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[oklch(0.60_0.08_275)]", children: [
      wordsLearned,
      " words · ",
      progress.conversationLevel || "Beginner"
    ] })
  ] }) }) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModuleLayout,
    {
      title: "Lost Language Revival Engine",
      subtitle: "Master endangered languages with AI voice tutoring, daily lessons, pronunciation coaching, and immersive conversation simulators.",
      icon: BookOpen,
      accent: "indigo",
      badge: "AI Voice Tutor",
      onNavigateHome,
      onNavigate,
      heroContent,
      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "language.loading_state",
          className: "grid grid-cols-1 md:grid-cols-3 gap-4",
          children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-2xl" }, i))
        }
      ) : progress ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4", children: [
          {
            label: "Streak",
            value: `${streakDays}d`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-[oklch(0.72_0.20_80)]" })
          },
          {
            label: "Words",
            value: wordsLearned.toString(),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-[oklch(0.65_0.15_200)]" })
          },
          {
            label: "Score",
            value: `${pronunciationScore}%`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5 text-[oklch(0.75_0.18_65)]" })
          },
          {
            label: "Level",
            value: progress.conversationLevel || "Beginner",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-[oklch(0.70_0.12_275)]" })
          }
        ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.06 },
            "data-ocid": `language.stat.${i + 1}`,
            className: "glass-indigo border border-[oklch(0.40_0.20_275/0.3)] rounded-xl p-3 sm:p-4 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-1.5", children: stat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground text-base sm:text-lg leading-tight truncate", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
            ]
          },
          stat.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border/40 rounded-xl p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-[oklch(0.70_0.12_275)]" }),
              progress.languageChosen,
              " Progress"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-[oklch(0.70_0.12_275)]", children: [
              progressPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: progressPct,
              className: "h-2.5 bg-[oklch(0.40_0.20_275/0.15)]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              totalLessonsCompleted,
              " completed"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              totalLessons,
              " total lessons"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 glass border border-border/40 p-1 rounded-xl w-full sm:w-auto sm:inline-flex",
            "data-ocid": "language.tabs",
            children: ["lessons", "conversation", "scripts"].map(
              (tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `language.tab.${tab}`,
                  onClick: () => setActiveTab(tab),
                  className: `flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 min-h-[40px] ${activeTab === tab ? "bg-[oklch(0.40_0.20_275)] text-[oklch(0.97_0.005_240)] shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`,
                  children: [
                    tab === "lessons" && /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
                    tab === "conversation" && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                    tab === "scripts" && /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize hidden sm:inline", children: tab }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize sm:hidden", children: tab.charAt(0).toUpperCase() + tab.slice(1, 4) })
                  ]
                },
                tab
              )
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          activeTab === "lessons" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              className: "flex flex-col gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl sm:text-2xl gradient-text-indigo mb-1", children: [
                  progress.languageChosen,
                  " Lessons"
                ] }),
                lessonsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: ((lessons == null ? void 0 : lessons.length) ? lessons : generateSampleLessons(progress.languageChosen)).map((lesson, i) => {
                  const key = "id" in lesson ? lesson.id.toString() : `sample-${i}`;
                  const isExpanded = expandedLesson === key;
                  const isDone = completedLessons.has(key) || Number(currentLesson) > i;
                  const isCelebrating = celebrateId === key;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      layout: true,
                      "data-ocid": `language.lesson.${i + 1}`,
                      className: `border rounded-xl overflow-hidden transition-all duration-300 ${isDone ? "border-[oklch(0.65_0.18_140/0.4)] bg-[oklch(0.65_0.18_140/0.05)]" : "glass border-border/40"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setExpandedLesson(isExpanded ? null : key),
                            className: "w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: `w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300 ${isDone ? "bg-[oklch(0.65_0.18_140/0.2)] text-[oklch(0.55_0.18_140)]" : "glass-indigo border border-[oklch(0.40_0.20_275/0.3)] text-[oklch(0.70_0.12_275)]"}`,
                                  children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : i + 1
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground text-sm sm:text-base truncate", children: "title" in lesson ? lesson.title : `Lesson ${i + 1}: Basics` }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5 flex-wrap", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-[oklch(0.40_0.20_275/0.12)] text-[oklch(0.65_0.10_275)] border-0 px-1.5 py-0", children: "lessonNumber" in lesson ? `#${Number(lesson.lessonNumber)}` : `#${i + 1}` }),
                                  "practiceWords" in lesson && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                                    lesson.practiceWords.length,
                                    " words"
                                  ] }),
                                  isDone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[oklch(0.55_0.18_140)] font-medium", children: "✓ Complete" })
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ChevronRight,
                                {
                                  className: `w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { height: 0, opacity: 0 },
                            animate: { height: "auto", opacity: 1 },
                            exit: { height: 0, opacity: 0 },
                            transition: { duration: 0.25 },
                            className: "overflow-hidden",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 sm:px-4 pb-4 pt-0 border-t border-border/30 space-y-4", children: [
                              "content" in lesson && lesson.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed pt-3", children: lesson.content }),
                              "practiceWords" in lesson && lesson.practiceWords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-[oklch(0.70_0.12_275)] uppercase tracking-wide mb-2 flex items-center gap-1.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3.5 h-3.5" }),
                                  " ",
                                  "Practice Words"
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: lesson.practiceWords.map((word) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "px-2.5 py-1 rounded-lg bg-[oklch(0.40_0.20_275/0.1)] border border-[oklch(0.40_0.20_275/0.2)] text-xs text-[oklch(0.70_0.12_275)] font-medium",
                                    children: word
                                  },
                                  word
                                )) })
                              ] }),
                              "practiceWords" in lesson && !lesson.practiceWords.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: getSampleWords(
                                progress.languageChosen,
                                i
                              ).map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "px-2.5 py-1 rounded-lg bg-[oklch(0.40_0.20_275/0.1)] border border-[oklch(0.40_0.20_275/0.2)] text-xs text-[oklch(0.70_0.12_275)] font-medium",
                                  children: w
                                },
                                w
                              )) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 pt-1", children: !isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  size: "sm",
                                  "data-ocid": `language.complete_button.${i + 1}`,
                                  onClick: () => "id" in lesson && handleCompleteLesson(
                                    lesson
                                  ),
                                  disabled: completeLesson.isPending || !("id" in lesson),
                                  className: "gap-1.5 bg-[oklch(0.40_0.20_275)] hover:bg-[oklch(0.45_0.18_275)] text-[oklch(0.97_0.005_240)] border-0 text-xs min-h-[36px]",
                                  children: completeLesson.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                                    " ",
                                    "Saving..."
                                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                                    " ",
                                    "Mark Complete"
                                  ] })
                                }
                              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: `flex items-center gap-1.5 text-xs font-medium text-[oklch(0.55_0.18_140)] transition-all duration-500 ${isCelebrating ? "scale-110" : ""}`,
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                                    "Lesson Mastered!"
                                  ]
                                }
                              ) })
                            ] })
                          }
                        ) })
                      ]
                    },
                    key
                  );
                }) })
              ]
            },
            "lessons"
          ),
          activeTab === "conversation" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              className: "flex flex-col gap-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl sm:text-2xl gradient-text-indigo", children: "Conversation Simulator" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[oklch(0.40_0.20_275/0.15)] text-[oklch(0.65_0.10_275)] border-0", children: [
                    convIndex + 1,
                    " / ",
                    convPairs.length
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border/40 rounded-2xl p-4 sm:p-6 flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full glass-indigo border border-[oklch(0.40_0.20_275/0.3)] flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-[oklch(0.70_0.12_275)]" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-indigo border border-[oklch(0.40_0.20_275/0.2)] rounded-2xl rounded-tl-none px-4 py-3 max-w-xs sm:max-w-md", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: convPairs[convIndex].q }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 italic", children: [
                        "Hint: ",
                        convPairs[convIndex].hint
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-row-reverse", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-[oklch(0.40_0.20_275/0.3)] border border-[oklch(0.40_0.20_275/0.4)] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[oklch(0.70_0.12_275)]", children: "You" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-xs sm:max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        "data-ocid": "language.conversation.input",
                        value: convInput,
                        onChange: (e) => setConvInput(e.target.value),
                        placeholder: `Respond in ${selectedLang} or English...`,
                        rows: 2,
                        className: "w-full bg-[oklch(0.40_0.20_275/0.08)] border border-[oklch(0.40_0.20_275/0.25)] rounded-2xl rounded-tr-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-[oklch(0.40_0.20_275/0.5)] transition-colors"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: convFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0 },
                      className: "flex items-center gap-3 p-3 rounded-xl bg-[oklch(0.40_0.20_275/0.08)] border border-[oklch(0.40_0.20_275/0.2)]",
                      "data-ocid": "language.conversation.feedback",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[oklch(0.70_0.12_275)]", children: convFeedback.score }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-[oklch(0.70_0.12_275)]", children: "AI Feedback" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs mt-0.5 ${convFeedback.color}`, children: convFeedback.feedback })
                        ] })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        "data-ocid": "language.conversation.submit_button",
                        onClick: handleConvSubmit,
                        disabled: !convInput.trim(),
                        className: "gap-1.5 bg-[oklch(0.40_0.20_275)] hover:bg-[oklch(0.45_0.18_275)] text-[oklch(0.97_0.005_240)] border-0 min-h-[36px]",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                          " Get Feedback"
                        ]
                      }
                    ),
                    convFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        "data-ocid": "language.conversation.next_button",
                        onClick: handleConvNext,
                        className: "gap-1.5 min-h-[36px] border-[oklch(0.40_0.20_275/0.3)] text-[oklch(0.70_0.12_275)]",
                        children: [
                          "Next Question ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border/40 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Suggested Response" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: convPairs[convIndex].a })
                ] })
              ]
            },
            "conversation"
          ),
          activeTab === "scripts" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              className: "flex flex-col gap-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl sm:text-2xl gradient-text-indigo mb-1", children: "Script Practice" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tap each character to reveal stroke order hints. Practice writing each symbol." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4", children: scripts.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    "data-ocid": `language.script.${idx + 1}`,
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: idx * 0.07 },
                    onClick: () => toggleScript(idx),
                    className: `glass border rounded-2xl p-4 sm:p-5 text-left flex flex-col gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${revealedScripts.has(idx) ? "border-[oklch(0.40_0.20_275/0.5)] bg-[oklch(0.40_0.20_275/0.08)]" : "border-border/40 hover:border-[oklch(0.40_0.20_275/0.3)]"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl sm:text-4xl font-display text-center", children: s.char }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: s.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.meaning })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: revealedScripts.has(idx) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, height: 0 },
                          animate: { opacity: 1, height: "auto" },
                          exit: { opacity: 0, height: 0 },
                          className: "border-t border-[oklch(0.40_0.20_275/0.2)] pt-2 mt-1",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[oklch(0.70_0.12_275)] flex items-start gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3 h-3 mt-0.5 flex-shrink-0" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.stroke })
                          ] })
                        }
                      ) }),
                      !revealedScripts.has(idx) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-xs text-muted-foreground mt-auto opacity-60", children: "Tap to reveal →" })
                    ]
                  },
                  s.char
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border/40 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-[oklch(0.70_0.12_275)] uppercase tracking-wide mb-3 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                    " Core Vocabulary"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ((selectedLangData == null ? void 0 : selectedLangData.sampleWords) ?? availableLanguages[0].sampleWords).map((word) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[oklch(0.40_0.20_275)] flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: word })
                      ]
                    },
                    word
                  )) })
                ] })
              ]
            },
            "scripts"
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "language.switch_language_button",
            onClick: () => {
              setSelectedLang("");
              setExpandedLesson(null);
              setActiveTab("lessons");
            },
            className: "gap-1.5 border-[oklch(0.40_0.20_275/0.3)] text-[oklch(0.70_0.12_275)] hover:bg-[oklch(0.40_0.20_275/0.1)] min-h-[40px]",
            children: "Switch Language"
          }
        ) })
      ] }) : (
        /* ── Language Selection Screen ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl gradient-text-indigo mb-2", children: "Choose Your Heritage Language" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xl", children: "Select one of the world's most endangered languages. Your practice helps preserve it for future generations." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: availableLanguages.map((lang, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.08 },
                "data-ocid": `language.lang.${i + 1}`,
                className: `${lang.bgClass} border ${lang.borderClass} rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`,
                onClick: () => handleStart(lang.code),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: lang.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-xs border-0 bg-transparent ${lang.textClass} font-medium`,
                        children: lang.speakers
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `text-2xl font-display leading-snug ${lang.textClass} mb-0.5`,
                        children: lang.script
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: lang.nativeScript })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base group-hover:text-[oklch(0.70_0.12_275)] transition-colors", children: lang.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📍" }),
                      lang.region
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1.5", children: "Sample words:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/70 leading-relaxed", children: lang.sampleWords[0] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      "data-ocid": `language.start_button.${i + 1}`,
                      disabled: startLanguage.isPending,
                      onClick: (e) => {
                        e.stopPropagation();
                        handleStart(lang.code);
                      },
                      className: `w-full gap-1.5 border text-xs transition-all duration-200 min-h-[38px] ${lang.bgClass} ${lang.borderClass} ${lang.textClass} hover:opacity-80`,
                      children: startLanguage.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" }),
                        " ",
                        "Starting…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Begin Journey ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                      ] })
                    }
                  )
                ]
              },
              lang.code
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 },
              "data-ocid": "language.community_card",
              className: "glass border border-border/40 rounded-2xl p-6 sm:p-8 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-10 h-10 sm:w-12 sm:h-12 text-[oklch(0.72_0.20_80)] mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg sm:text-xl text-foreground mb-1", children: "Join 12,000+ Language Revivalists" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-md mx-auto", children: "Every lesson you complete helps preserve a piece of humanity's linguistic heritage. Your voice matters." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-6 mt-4 flex-wrap", children: [
                  { value: "6", label: "Languages" },
                  { value: "12K+", label: "Learners" },
                  { value: "94%", label: "Retention" }
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-[oklch(0.72_0.20_80)]", children: s.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
                ] }, s.label)) })
              ]
            }
          )
        ] })
      )
    }
  );
}
function generateSampleLessons(language) {
  const titles = [
    "Greetings & Introductions",
    "Sacred Numbers & Counting",
    "Nature & Elements",
    "Devotional Phrases",
    "Ancient Stories & Myths"
  ];
  return titles.map((title, i) => ({
    id: BigInt(i + 1),
    title,
    content: `Explore the foundational ${language} ${title.toLowerCase()} used by scholars and practitioners for millennia.`,
    language,
    lessonNumber: BigInt(i + 1),
    practiceWords: getSampleWords(language, i),
    audioUrl: "",
    createdAt: BigInt(0)
  }));
}
function getSampleWords(language, lessonIndex) {
  const banks = {
    Sanskrit: [
      ["नमस्ते", "आयुष्मान्", "स्वागतम्"],
      ["एक", "द्वि", "त्रि", "चतुर्"],
      ["जल", "वायु", "अग्नि", "पृथ्वी"],
      ["ॐ नमः", "श्रद्धा", "भक्ति"],
      ["रामायण", "महाभारत", "वेद"]
    ],
    Aramaic: [
      ["ܫܠܡܐ", "ܒܪܟܬܐ", "ܐܚܝ"],
      ["ܚܕ", "ܬܪܝܢ", "ܬܠܬܐ"],
      ["ܡܝܐ", "ܢܘܪܐ", "ܐܪܥܐ"],
      ["ܡܪܢ", "ܨܠܘܬܐ", "ܩܕܝܫܐ"],
      ["ܒܪܐ", "ܐܒܐ", "ܪܘܚܐ"]
    ]
  };
  const wordBank = banks[language] ?? [
    ["Hello", "Peace", "Welcome"],
    ["One", "Two", "Three", "Four"],
    ["Water", "Fire", "Earth", "Air"],
    ["Prayer", "Faith", "Blessing"],
    ["Story", "Myth", "Legend"]
  ];
  return wordBank[lessonIndex % wordBank.length] ?? [];
}
export {
  LanguageRevivalPage as default
};
