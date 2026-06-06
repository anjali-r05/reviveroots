import type { DailyLesson } from "@/backend.d.ts";
import { ModuleLayout } from "@/components/ModuleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useCompleteLesson,
  useLanguageProgress,
  useLessonsByLanguage,
  useStartLanguage,
} from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  MessageSquare,
  PenLine,
  Play,
  Sparkles,
  Star,
  Target,
  Trophy,
  Volume2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface Props {
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
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
      "आचार्य (Acharya) — Teacher",
    ],
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
    sampleWords: ["Namo — Homage", "Dhamma — Teachings", "Sangha — Community"],
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
      "ܐܒܐ (Aba) — Father",
    ],
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
      "ⲁⲅⲁⲡⲏ (Agapi) — Love",
    ],
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
      "Teōtl — Divine force",
    ],
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
      "Pachamama — Mother Earth",
    ],
  },
];

const conversationPairs: Record<
  string,
  { q: string; a: string; hint: string }[]
> = {
  Sanskrit: [
    {
      q: "भवान् कः अस्ति? (Who are you?)",
      a: "अहम् छात्रः अस्मि (I am a student)",
      hint: "Type about yourself",
    },
    {
      q: "किम् वदसि? (What do you say?)",
      a: "सत्यम् वदामि (I speak truth)",
      hint: "Type your response",
    },
    {
      q: "कथम् अस्ति? (How are you?)",
      a: "अहम् सुष्ठु अस्मि (I am well)",
      hint: "Respond in any form",
    },
    {
      q: "कुत्र गच्छसि? (Where are you going?)",
      a: "विद्यालयम् गच्छामि (I go to school)",
      hint: "Describe a destination",
    },
    {
      q: "किम् अभिलषसि? (What do you desire?)",
      a: "ज्ञानम् इच्छामि (I desire knowledge)",
      hint: "Express a wish",
    },
  ],
  default: [
    {
      q: "Greet me in your target language",
      a: "Hello / Peace be upon you",
      hint: "Type a greeting",
    },
    { q: "Say your name", a: "My name is...", hint: "Introduce yourself" },
    { q: "Count to three", a: "One, Two, Three", hint: "Try counting" },
    {
      q: "Express gratitude",
      a: "Thank you very much",
      hint: "Show appreciation",
    },
    {
      q: "Say farewell",
      a: "Goodbye / Until we meet again",
      hint: "End the conversation",
    },
  ],
};

const scriptData: Record<
  string,
  { char: string; name: string; meaning: string; stroke: string }[]
> = {
  Sanskrit: [
    {
      char: "अ",
      name: "A",
      meaning: "First vowel, imperishable",
      stroke: "Start top-right, curve left",
    },
    {
      char: "ॐ",
      name: "Om",
      meaning: "Sacred syllable, cosmic sound",
      stroke: "Circular base, then hook above",
    },
    {
      char: "क",
      name: "Ka",
      meaning: "First consonant, brilliance",
      stroke: "Vertical line, then two strokes right",
    },
    {
      char: "ह",
      name: "Ha",
      meaning: "Last consonant, life breath",
      stroke: "Two vertical lines connected",
    },
    {
      char: "र",
      name: "Ra",
      meaning: "Sun, energy, radiance",
      stroke: "Curve then diagonal tick",
    },
    {
      char: "म",
      name: "Ma",
      meaning: "Moon, mind, mother",
      stroke: "Three arches connected at base",
    },
  ],
  default: [
    {
      char: "α",
      name: "Alpha",
      meaning: "Beginning",
      stroke: "Circle with a tail",
    },
    {
      char: "β",
      name: "Beta",
      meaning: "Life",
      stroke: "Vertical with two loops",
    },
    { char: "γ", name: "Gamma", meaning: "Energy", stroke: "Inverted Y shape" },
    {
      char: "δ",
      name: "Delta",
      meaning: "Change",
      stroke: "Triangle then circle",
    },
    {
      char: "ε",
      name: "Epsilon",
      meaning: "Simplicity",
      stroke: "Open C shape",
    },
    { char: "ζ", name: "Zeta", meaning: "Wisdom", stroke: "Z then underline" },
  ],
};

function getConversationFeedback(
  input: string,
  expected: string,
): { score: number; feedback: string; color: string } {
  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const hasKeyword = expected
    .toLowerCase()
    .split(/\s+/)
    .some((w) => input.toLowerCase().includes(w.substring(0, 3)));

  if (words === 0)
    return {
      score: 0,
      feedback: "Please type a response to continue.",
      color: "text-muted-foreground",
    };
  if (words >= 5 && hasKeyword)
    return {
      score: 95,
      feedback: "Excellent! Your response shows deep understanding. 🌟",
      color: "text-[oklch(0.65_0.18_140)]",
    };
  if (words >= 3)
    return {
      score: 78,
      feedback: "Good effort! Try using more vocabulary from the lesson. 👏",
      color: "text-[oklch(0.72_0.20_80)]",
    };
  return {
    score: 55,
    feedback: "Keep practicing! Longer responses earn higher scores. 💪",
    color: "text-[oklch(0.75_0.18_65)]",
  };
}

type ActiveTab = "lessons" | "conversation" | "scripts";

export default function LanguageRevivalPage({
  onNavigateHome,
  onNavigate,
}: Props) {
  const { isAuthenticated } = useAuth();
  const { data: progress, isLoading } = useLanguageProgress();
  const startLanguage = useStartLanguage();
  const completeLesson = useCompleteLesson();
  const [selectedLang, setSelectedLang] = useState(
    progress?.languageChosen ?? "",
  );
  const { data: lessons, isLoading: lessonsLoading } =
    useLessonsByLanguage(selectedLang);
  const [activeTab, setActiveTab] = useState<ActiveTab>("lessons");
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(),
  );
  const [convIndex, setConvIndex] = useState(0);
  const [convInput, setConvInput] = useState("");
  const [convFeedback, setConvFeedback] = useState<{
    score: number;
    feedback: string;
    color: string;
  } | null>(null);
  const [revealedScripts, setRevealedScripts] = useState<Set<number>>(
    new Set(),
  );
  const [celebrateId, setCelebrateId] = useState<string | null>(null);

  const handleStart = async (code: string) => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setSelectedLang(code);
    try {
      await startLanguage.mutateAsync(code);
      toast.success(`Started learning ${code}! Your journey begins.`);
    } catch {
      toast.error("Failed to start language. Please try again.");
    }
  };

  const handleCompleteLesson = useCallback(
    async (lesson: DailyLesson) => {
      const key = lesson.id.toString();
      if (completedLessons.has(key)) return;
      const score = BigInt(Math.floor(Math.random() * 41) + 60); // 60-100
      try {
        await completeLesson.mutateAsync({ lessonId: lesson.id, score });
        setCompletedLessons((prev) => new Set([...prev, key]));
        setCelebrateId(key);
        setTimeout(() => setCelebrateId(null), 2000);
        toast.success(`Lesson complete! Score: ${score}/100 🎉`);
      } catch {
        toast.error("Failed to save progress. Please try again.");
      }
    },
    [completedLessons, completeLesson],
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

  const toggleScript = (idx: number) => {
    setRevealedScripts((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const streakDays = Number(progress?.streakDays ?? 0);
  const wordsLearned = Number(progress?.wordsLearned ?? 0);
  const currentLesson = Number(progress?.currentLesson ?? 0);
  const pronunciationScore = Number(progress?.pronunciationScore ?? 0);
  const totalLessonsCompleted = Number(progress?.totalLessonsCompleted ?? 0);
  const totalLessons = lessons?.length ?? 5;
  const progressPct =
    totalLessons > 0
      ? Math.round((totalLessonsCompleted / totalLessons) * 100)
      : 0;

  const selectedLangData = availableLanguages.find(
    (l) => l.code === selectedLang,
  );
  const convPairs =
    conversationPairs[selectedLang] ?? conversationPairs.default;
  const scripts = scriptData[selectedLang] ?? scriptData.default;

  const heroContent = progress ? (
    <div className="flex flex-col gap-3">
      <div className="glass-indigo border border-[oklch(0.40_0.20_275/0.3)] rounded-xl p-4 min-w-[180px]">
        <div className="text-xs text-[oklch(0.72_0.10_275)] mb-2 font-medium">
          Your Progress
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-5 h-5 text-[oklch(0.72_0.20_80)]" />
          <span className="text-2xl font-display font-bold text-[oklch(0.70_0.12_275)]">
            {streakDays}
          </span>
          <span className="text-xs text-[oklch(0.72_0.10_275)]">
            day streak
          </span>
        </div>
        <div className="text-xs text-[oklch(0.60_0.08_275)]">
          {wordsLearned} words · {progress.conversationLevel || "Beginner"}
        </div>
      </div>
    </div>
  ) : undefined;

  return (
    <ModuleLayout
      title="Lost Language Revival Engine"
      subtitle="Master endangered languages with AI voice tutoring, daily lessons, pronunciation coaching, and immersive conversation simulators."
      icon={BookOpen}
      accent="indigo"
      badge="AI Voice Tutor"
      onNavigateHome={onNavigateHome}
      onNavigate={onNavigate}
      heroContent={heroContent}
    >
      {isLoading ? (
        <div
          data-ocid="language.loading_state"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : progress ? (
        <div className="flex flex-col gap-8">
          {/* Progress Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                label: "Streak",
                value: `${streakDays}d`,
                icon: <Flame className="w-5 h-5 text-[oklch(0.72_0.20_80)]" />,
              },
              {
                label: "Words",
                value: wordsLearned.toString(),
                icon: (
                  <BookOpen className="w-5 h-5 text-[oklch(0.65_0.15_200)]" />
                ),
              },
              {
                label: "Score",
                value: `${pronunciationScore}%`,
                icon: <Target className="w-5 h-5 text-[oklch(0.75_0.18_65)]" />,
              },
              {
                label: "Level",
                value: progress.conversationLevel || "Beginner",
                icon: <Star className="w-5 h-5 text-[oklch(0.70_0.12_275)]" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                data-ocid={`language.stat.${i + 1}`}
                className="glass-indigo border border-[oklch(0.40_0.20_275/0.3)] rounded-xl p-3 sm:p-4 text-center"
              >
                <div className="flex justify-center mb-1.5">{stat.icon}</div>
                <div className="font-bold text-foreground text-base sm:text-lg leading-tight truncate">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="glass border border-border/40 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[oklch(0.70_0.12_275)]" />
                {progress.languageChosen} Progress
              </span>
              <span className="text-sm font-bold text-[oklch(0.70_0.12_275)]">
                {progressPct}%
              </span>
            </div>
            <Progress
              value={progressPct}
              className="h-2.5 bg-[oklch(0.40_0.20_275/0.15)]"
            />
            <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
              <span>{totalLessonsCompleted} completed</span>
              <span>{totalLessons} total lessons</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className="flex gap-1 glass border border-border/40 p-1 rounded-xl w-full sm:w-auto sm:inline-flex"
            data-ocid="language.tabs"
          >
            {(["lessons", "conversation", "scripts"] as ActiveTab[]).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  data-ocid={`language.tab.${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 min-h-[40px] ${
                    activeTab === tab
                      ? "bg-[oklch(0.40_0.20_275)] text-[oklch(0.97_0.005_240)] shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {tab === "lessons" && <Play className="w-3.5 h-3.5" />}
                  {tab === "conversation" && (
                    <MessageSquare className="w-3.5 h-3.5" />
                  )}
                  {tab === "scripts" && <PenLine className="w-3.5 h-3.5" />}
                  <span className="capitalize hidden sm:inline">{tab}</span>
                  <span className="capitalize sm:hidden">
                    {tab.charAt(0).toUpperCase() + tab.slice(1, 4)}
                  </span>
                </button>
              ),
            )}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "lessons" && (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3"
              >
                <h2 className="font-display text-xl sm:text-2xl gradient-text-indigo mb-1">
                  {progress.languageChosen} Lessons
                </h2>
                {lessonsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {(lessons?.length
                      ? lessons
                      : generateSampleLessons(progress.languageChosen)
                    ).map((lesson, i) => {
                      const key =
                        "id" in lesson ? lesson.id.toString() : `sample-${i}`;
                      const isExpanded = expandedLesson === key;
                      const isDone =
                        completedLessons.has(key) || Number(currentLesson) > i;
                      const isCelebrating = celebrateId === key;
                      return (
                        <motion.div
                          key={key}
                          layout
                          data-ocid={`language.lesson.${i + 1}`}
                          className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                            isDone
                              ? "border-[oklch(0.65_0.18_140/0.4)] bg-[oklch(0.65_0.18_140/0.05)]"
                              : "glass border-border/40"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedLesson(isExpanded ? null : key)
                            }
                            className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left"
                          >
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300 ${
                                isDone
                                  ? "bg-[oklch(0.65_0.18_140/0.2)] text-[oklch(0.55_0.18_140)]"
                                  : "glass-indigo border border-[oklch(0.40_0.20_275/0.3)] text-[oklch(0.70_0.12_275)]"
                              }`}
                            >
                              {isDone ? <Check className="w-4 h-4" /> : i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm sm:text-base truncate">
                                {"title" in lesson
                                  ? lesson.title
                                  : `Lesson ${i + 1}: Basics`}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                <Badge className="text-xs bg-[oklch(0.40_0.20_275/0.12)] text-[oklch(0.65_0.10_275)] border-0 px-1.5 py-0">
                                  {"lessonNumber" in lesson
                                    ? `#${Number(lesson.lessonNumber)}`
                                    : `#${i + 1}`}
                                </Badge>
                                {"practiceWords" in lesson && (
                                  <span className="text-xs text-muted-foreground">
                                    {lesson.practiceWords.length} words
                                  </span>
                                )}
                                {isDone && (
                                  <span className="text-xs text-[oklch(0.55_0.18_140)] font-medium">
                                    ✓ Complete
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="px-3 sm:px-4 pb-4 pt-0 border-t border-border/30 space-y-4">
                                  {"content" in lesson && lesson.content && (
                                    <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                                      {lesson.content}
                                    </p>
                                  )}
                                  {"practiceWords" in lesson &&
                                    lesson.practiceWords.length > 0 && (
                                      <div>
                                        <div className="text-xs font-semibold text-[oklch(0.70_0.12_275)] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                          <Volume2 className="w-3.5 h-3.5" />{" "}
                                          Practice Words
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {lesson.practiceWords.map((word) => (
                                            <span
                                              key={word}
                                              className="px-2.5 py-1 rounded-lg bg-[oklch(0.40_0.20_275/0.1)] border border-[oklch(0.40_0.20_275/0.2)] text-xs text-[oklch(0.70_0.12_275)] font-medium"
                                            >
                                              {word}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  {"practiceWords" in lesson &&
                                    !lesson.practiceWords.length && (
                                      <div className="flex flex-wrap gap-2 pt-1">
                                        {getSampleWords(
                                          progress.languageChosen,
                                          i,
                                        ).map((w) => (
                                          <span
                                            key={w}
                                            className="px-2.5 py-1 rounded-lg bg-[oklch(0.40_0.20_275/0.1)] border border-[oklch(0.40_0.20_275/0.2)] text-xs text-[oklch(0.70_0.12_275)] font-medium"
                                          >
                                            {w}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  <div className="flex items-center gap-2 pt-1">
                                    {!isDone ? (
                                      <Button
                                        size="sm"
                                        data-ocid={`language.complete_button.${i + 1}`}
                                        onClick={() =>
                                          "id" in lesson &&
                                          handleCompleteLesson(
                                            lesson as DailyLesson,
                                          )
                                        }
                                        disabled={
                                          completeLesson.isPending ||
                                          !("id" in lesson)
                                        }
                                        className="gap-1.5 bg-[oklch(0.40_0.20_275)] hover:bg-[oklch(0.45_0.18_275)] text-[oklch(0.97_0.005_240)] border-0 text-xs min-h-[36px]"
                                      >
                                        {completeLesson.isPending ? (
                                          <span className="flex items-center gap-1">
                                            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                                            Saving...
                                          </span>
                                        ) : (
                                          <>
                                            <Check className="w-3.5 h-3.5" />{" "}
                                            Mark Complete
                                          </>
                                        )}
                                      </Button>
                                    ) : (
                                      <div
                                        className={`flex items-center gap-1.5 text-xs font-medium text-[oklch(0.55_0.18_140)] transition-all duration-500 ${isCelebrating ? "scale-110" : ""}`}
                                      >
                                        <Sparkles className="w-4 h-4" />
                                        Lesson Mastered!
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "conversation" && (
              <motion.div
                key="conversation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="font-display text-xl sm:text-2xl gradient-text-indigo">
                    Conversation Simulator
                  </h2>
                  <Badge className="bg-[oklch(0.40_0.20_275/0.15)] text-[oklch(0.65_0.10_275)] border-0">
                    {convIndex + 1} / {convPairs.length}
                  </Badge>
                </div>
                <div className="glass border border-border/40 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
                  {/* AI question bubble */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full glass-indigo border border-[oklch(0.40_0.20_275/0.3)] flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-[oklch(0.70_0.12_275)]" />
                    </div>
                    <div className="glass-indigo border border-[oklch(0.40_0.20_275/0.2)] rounded-2xl rounded-tl-none px-4 py-3 max-w-xs sm:max-w-md">
                      <p className="text-sm text-foreground leading-relaxed">
                        {convPairs[convIndex].q}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        Hint: {convPairs[convIndex].hint}
                      </p>
                    </div>
                  </div>

                  {/* User input */}
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-9 h-9 rounded-full bg-[oklch(0.40_0.20_275/0.3)] border border-[oklch(0.40_0.20_275/0.4)] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[oklch(0.70_0.12_275)]">
                      You
                    </div>
                    <div className="flex-1 max-w-xs sm:max-w-md">
                      <textarea
                        data-ocid="language.conversation.input"
                        value={convInput}
                        onChange={(e) => setConvInput(e.target.value)}
                        placeholder={`Respond in ${selectedLang} or English...`}
                        rows={2}
                        className="w-full bg-[oklch(0.40_0.20_275/0.08)] border border-[oklch(0.40_0.20_275/0.25)] rounded-2xl rounded-tr-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-[oklch(0.40_0.20_275/0.5)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* AI Feedback */}
                  <AnimatePresence>
                    {convFeedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[oklch(0.40_0.20_275/0.08)] border border-[oklch(0.40_0.20_275/0.2)]"
                        data-ocid="language.conversation.feedback"
                      >
                        <div className="text-2xl font-bold text-[oklch(0.70_0.12_275)]">
                          {convFeedback.score}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[oklch(0.70_0.12_275)]">
                            AI Feedback
                          </div>
                          <p className={`text-xs mt-0.5 ${convFeedback.color}`}>
                            {convFeedback.feedback}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      data-ocid="language.conversation.submit_button"
                      onClick={handleConvSubmit}
                      disabled={!convInput.trim()}
                      className="gap-1.5 bg-[oklch(0.40_0.20_275)] hover:bg-[oklch(0.45_0.18_275)] text-[oklch(0.97_0.005_240)] border-0 min-h-[36px]"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Get Feedback
                    </Button>
                    {convFeedback && (
                      <Button
                        size="sm"
                        variant="outline"
                        data-ocid="language.conversation.next_button"
                        onClick={handleConvNext}
                        className="gap-1.5 min-h-[36px] border-[oklch(0.40_0.20_275/0.3)] text-[oklch(0.70_0.12_275)]"
                      >
                        Next Question <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Suggested Response */}
                <div className="glass border border-border/40 rounded-xl p-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Suggested Response
                  </div>
                  <p className="text-sm text-foreground">
                    {convPairs[convIndex].a}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "scripts" && (
              <motion.div
                key="scripts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h2 className="font-display text-xl sm:text-2xl gradient-text-indigo mb-1">
                    Script Practice
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Tap each character to reveal stroke order hints. Practice
                    writing each symbol.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {scripts.map((s, idx) => (
                    <motion.button
                      key={s.char}
                      type="button"
                      data-ocid={`language.script.${idx + 1}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.07 }}
                      onClick={() => toggleScript(idx)}
                      className={`glass border rounded-2xl p-4 sm:p-5 text-left flex flex-col gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                        revealedScripts.has(idx)
                          ? "border-[oklch(0.40_0.20_275/0.5)] bg-[oklch(0.40_0.20_275/0.08)]"
                          : "border-border/40 hover:border-[oklch(0.40_0.20_275/0.3)]"
                      }`}
                    >
                      <div className="text-3xl sm:text-4xl font-display text-center">
                        {s.char}
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-foreground">
                          {s.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {s.meaning}
                        </div>
                      </div>
                      <AnimatePresence>
                        {revealedScripts.has(idx) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-[oklch(0.40_0.20_275/0.2)] pt-2 mt-1"
                          >
                            <div className="text-xs text-[oklch(0.70_0.12_275)] flex items-start gap-1.5">
                              <PenLine className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>{s.stroke}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {!revealedScripts.has(idx) && (
                        <div className="text-center text-xs text-muted-foreground mt-auto opacity-60">
                          Tap to reveal →
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Sample vocabulary from language */}
                <div className="glass border border-border/40 rounded-xl p-4">
                  <div className="text-xs font-semibold text-[oklch(0.70_0.12_275)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Core Vocabulary
                  </div>
                  <div className="space-y-2">
                    {(
                      selectedLangData?.sampleWords ??
                      availableLanguages[0].sampleWords
                    ).map((word) => (
                      <div
                        key={word}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.40_0.20_275)] flex-shrink-0" />
                        <span className="text-foreground">{word}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Switch Language */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              data-ocid="language.switch_language_button"
              onClick={() => {
                setSelectedLang("");
                setExpandedLesson(null);
                setActiveTab("lessons");
              }}
              className="gap-1.5 border-[oklch(0.40_0.20_275/0.3)] text-[oklch(0.70_0.12_275)] hover:bg-[oklch(0.40_0.20_275/0.1)] min-h-[40px]"
            >
              Switch Language
            </Button>
          </div>
        </div>
      ) : (
        /* ── Language Selection Screen ── */
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl gradient-text-indigo mb-2">
              Choose Your Heritage Language
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xl">
              Select one of the world's most endangered languages. Your practice
              helps preserve it for future generations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableLanguages.map((lang, i) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid={`language.lang.${i + 1}`}
                  className={`${lang.bgClass} border ${lang.borderClass} rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
                  onClick={() => handleStart(lang.code)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-3xl">{lang.emoji}</div>
                    <Badge
                      className={`text-xs border-0 bg-transparent ${lang.textClass} font-medium`}
                    >
                      {lang.speakers}
                    </Badge>
                  </div>
                  <div>
                    <div
                      className={`text-2xl font-display leading-snug ${lang.textClass} mb-0.5`}
                    >
                      {lang.script}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang.nativeScript}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base group-hover:text-[oklch(0.70_0.12_275)] transition-colors">
                      {lang.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <span>📍</span>
                      {lang.region}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="text-xs text-muted-foreground mb-1.5">
                      Sample words:
                    </div>
                    <div className="text-xs text-foreground/70 leading-relaxed">
                      {lang.sampleWords[0]}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    data-ocid={`language.start_button.${i + 1}`}
                    disabled={startLanguage.isPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStart(lang.code);
                    }}
                    className={`w-full gap-1.5 border text-xs transition-all duration-200 min-h-[38px] ${lang.bgClass} ${lang.borderClass} ${lang.textClass} hover:opacity-80`}
                  >
                    {startLanguage.isPending ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />{" "}
                        Starting…
                      </span>
                    ) : (
                      <>
                        Begin Journey <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Community CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            data-ocid="language.community_card"
            className="glass border border-border/40 rounded-2xl p-6 sm:p-8 text-center"
          >
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-[oklch(0.72_0.20_80)] mx-auto mb-3" />
            <h3 className="font-display text-lg sm:text-xl text-foreground mb-1">
              Join 12,000+ Language Revivalists
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Every lesson you complete helps preserve a piece of humanity's
              linguistic heritage. Your voice matters.
            </p>
            <div className="flex justify-center gap-6 mt-4 flex-wrap">
              {[
                { value: "6", label: "Languages" },
                { value: "12K+", label: "Learners" },
                { value: "94%", label: "Retention" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-xl font-bold text-[oklch(0.72_0.20_80)]">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </ModuleLayout>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateSampleLessons(language: string) {
  const titles = [
    "Greetings & Introductions",
    "Sacred Numbers & Counting",
    "Nature & Elements",
    "Devotional Phrases",
    "Ancient Stories & Myths",
  ];
  return titles.map((title, i) => ({
    id: BigInt(i + 1),
    title,
    content: `Explore the foundational ${language} ${title.toLowerCase()} used by scholars and practitioners for millennia.`,
    language,
    lessonNumber: BigInt(i + 1),
    practiceWords: getSampleWords(language, i),
    audioUrl: "",
    createdAt: BigInt(0),
  }));
}

function getSampleWords(language: string, lessonIndex: number): string[] {
  const banks: Record<string, string[][]> = {
    Sanskrit: [
      ["नमस्ते", "आयुष्मान्", "स्वागतम्"],
      ["एक", "द्वि", "त्रि", "चतुर्"],
      ["जल", "वायु", "अग्नि", "पृथ्वी"],
      ["ॐ नमः", "श्रद्धा", "भक्ति"],
      ["रामायण", "महाभारत", "वेद"],
    ],
    Aramaic: [
      ["ܫܠܡܐ", "ܒܪܟܬܐ", "ܐܚܝ"],
      ["ܚܕ", "ܬܪܝܢ", "ܬܠܬܐ"],
      ["ܡܝܐ", "ܢܘܪܐ", "ܐܪܥܐ"],
      ["ܡܪܢ", "ܨܠܘܬܐ", "ܩܕܝܫܐ"],
      ["ܒܪܐ", "ܐܒܐ", "ܪܘܚܐ"],
    ],
  };
  const wordBank = banks[language] ?? [
    ["Hello", "Peace", "Welcome"],
    ["One", "Two", "Three", "Four"],
    ["Water", "Fire", "Earth", "Air"],
    ["Prayer", "Faith", "Blessing"],
    ["Story", "Myth", "Legend"],
  ];
  return wordBank[lessonIndex % wordBank.length] ?? [];
}
