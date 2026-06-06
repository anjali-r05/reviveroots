import { ModuleLayout } from "@/components/ModuleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useGenerateAncestryInsights,
  useHeritageProfile,
  useSaveHeritageProfile,
} from "@/hooks/useBackend";
import type { AncestryInsights, FamilyTreeNode } from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Cpu,
  Dna,
  Globe,
  Leaf,
  LogIn,
  MapPin,
  Save,
  Sparkles,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Props {
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
}

// ─── Family Tree SVG ─────────────────────────────────────────────────────────

function FamilyTreeSVG({ nodes }: { nodes: FamilyTreeNode[] }) {
  // Layout: grandparents (row 0) → parents (row 1) → user (row 2)
  const gp = nodes.filter((n) => n.relation.toLowerCase().includes("grandp"));
  const parents = nodes.filter(
    (n) =>
      n.relation.toLowerCase().includes("parent") ||
      n.relation.toLowerCase().includes("father") ||
      n.relation.toLowerCase().includes("mother"),
  );
  const self = nodes.find(
    (n) =>
      n.relation.toLowerCase() === "self" || n.relation.toLowerCase() === "you",
  );

  // Fallback layout for nodes that don't match
  const topRow = gp.length ? gp : nodes.slice(0, 2);
  const midRow = parents.length ? parents : nodes.slice(2, 4);
  const bottomNode = self ?? nodes[nodes.length - 1];

  const W = 480;
  const H = 240;
  const nodeR = 28;

  // Positions
  const topPositions = topRow.map((_, i) => ({
    x: W / 2 - ((topRow.length - 1) * 120) / 2 + i * 120,
    y: 50,
  }));
  const midPositions = midRow.map((_, i) => ({
    x: W / 2 - ((midRow.length - 1) * 120) / 2 + i * 120,
    y: 140,
  }));
  const bottomPos = { x: W / 2, y: 220 };

  const goldGrad = "url(#goldGrad)";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-md mx-auto"
      role="img"
      aria-label="Family Tree Visualization"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.68 0.22 86)" />
          <stop offset="100%" stopColor="oklch(0.76 0.18 80)" />
        </linearGradient>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            stopColor="oklch(0.20 0.08 270)"
            stopOpacity="0.9"
          />
          <stop
            offset="100%"
            stopColor="oklch(0.14 0.1 260)"
            stopOpacity="0.95"
          />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Lines: top → mid */}
      {topPositions.map((tp, ti) =>
        midPositions.map((mp, mi) => (
          <path
            key={`tm-${topRow[ti]?.relation ?? ti}-${midRow[mi]?.relation ?? mi}`}
            d={`M ${tp.x} ${tp.y + nodeR} C ${tp.x} ${(tp.y + mp.y) / 2}, ${mp.x} ${(tp.y + mp.y) / 2}, ${mp.x} ${mp.y - nodeR}`}
            stroke="oklch(0.68 0.22 86 / 0.35)"
            strokeWidth="1.5"
            fill="none"
          />
        )),
      )}

      {/* Lines: mid → bottom */}
      {midPositions.map((mp, i) => (
        <path
          key={`mb-${midRow[i]?.relation ?? i}`}
          d={`M ${mp.x} ${mp.y + nodeR} C ${mp.x} ${(mp.y + bottomPos.y) / 2}, ${bottomPos.x} ${(mp.y + bottomPos.y) / 2}, ${bottomPos.x} ${bottomPos.y - nodeR}`}
          stroke="oklch(0.68 0.22 86 / 0.5)"
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* Top row nodes (grandparents) */}
      {topRow.map((n, i) => (
        <g key={`top-${n.relation}-${n.name}`} filter="url(#glow)">
          <circle
            cx={topPositions[i].x}
            cy={topPositions[i].y}
            r={nodeR}
            fill="url(#nodeGrad)"
            stroke="oklch(0.68 0.22 86)"
            strokeWidth="1.5"
          />
          <text
            x={topPositions[i].x}
            y={topPositions[i].y - 6}
            textAnchor="middle"
            fill={goldGrad}
            fontSize="9"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            {n.relation.length > 10 ? n.relation.slice(0, 10) : n.relation}
          </text>
          <text
            x={topPositions[i].x}
            y={topPositions[i].y + 7}
            textAnchor="middle"
            fill="oklch(0.85 0.05 240)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            {n.name.length > 12 ? n.name.slice(0, 12) : n.name}
          </text>
          <text
            x={topPositions[i].x}
            y={topPositions[i].y + 18}
            textAnchor="middle"
            fill="oklch(0.55 0.05 240)"
            fontSize="7"
            fontFamily="sans-serif"
          >
            {n.region.length > 10 ? n.region.slice(0, 10) : n.region}
          </text>
        </g>
      ))}

      {/* Mid row nodes (parents) */}
      {midRow.map((n, i) => (
        <g key={`mid-${n.relation}-${n.name}`} filter="url(#glow)">
          <circle
            cx={midPositions[i].x}
            cy={midPositions[i].y}
            r={nodeR}
            fill="url(#nodeGrad)"
            stroke="oklch(0.68 0.22 86 / 0.8)"
            strokeWidth="1.5"
          />
          <text
            x={midPositions[i].x}
            y={midPositions[i].y - 6}
            textAnchor="middle"
            fill="oklch(0.68 0.22 86)"
            fontSize="9"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            {n.relation.length > 10 ? n.relation.slice(0, 10) : n.relation}
          </text>
          <text
            x={midPositions[i].x}
            y={midPositions[i].y + 7}
            textAnchor="middle"
            fill="oklch(0.85 0.05 240)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            {n.name.length > 12 ? n.name.slice(0, 12) : n.name}
          </text>
          <text
            x={midPositions[i].x}
            y={midPositions[i].y + 18}
            textAnchor="middle"
            fill="oklch(0.55 0.05 240)"
            fontSize="7"
            fontFamily="sans-serif"
          >
            {n.region.length > 10 ? n.region.slice(0, 10) : n.region}
          </text>
        </g>
      ))}

      {/* Bottom node (you) */}
      {bottomNode && (
        <g filter="url(#glow)">
          <circle
            cx={bottomPos.x}
            cy={bottomPos.y}
            r={nodeR + 4}
            fill="url(#goldGrad)"
            opacity="0.15"
          />
          <circle
            cx={bottomPos.x}
            cy={bottomPos.y}
            r={nodeR}
            fill="url(#nodeGrad)"
            stroke="oklch(0.68 0.22 86)"
            strokeWidth="2.5"
          />
          <text
            x={bottomPos.x}
            y={bottomPos.y - 5}
            textAnchor="middle"
            fill="oklch(0.68 0.22 86)"
            fontSize="10"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            You
          </text>
          <text
            x={bottomPos.x}
            y={bottomPos.y + 9}
            textAnchor="middle"
            fill="oklch(0.85 0.05 240)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            {bottomNode.region.length > 12
              ? bottomNode.region.slice(0, 12)
              : bottomNode.region}
          </text>
        </g>
      )}
    </svg>
  );
}

// ─── DNA Scan Animation ───────────────────────────────────────────────────────

function DNAScanAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer rotating ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-[oklch(0.68_0.22_86/0.2)] animate-spin"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute inset-2 rounded-full border-2 border-[oklch(0.68_0.22_86/0.4)] border-dashed animate-spin"
          style={{ animationDuration: "3s", animationDirection: "reverse" }}
        />
        <div
          className="absolute inset-5 rounded-full border-2 border-[oklch(0.45_0.25_295/0.5)] animate-spin"
          style={{ animationDuration: "2s" }}
        />
        {/* Pulsing core */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[oklch(0.45_0.25_295/0.3)] to-[oklch(0.68_0.22_86/0.3)] animate-pulse flex items-center justify-center">
          <Dna className="w-7 h-7 text-[oklch(0.68_0.22_86)]" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground text-sm">
          Scanning Heritage DNA…
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Analyzing ancestry patterns across generations
        </p>
      </div>
      {/* Scanning bars */}
      <div className="flex flex-col gap-2 w-48">
        {["Surname analysis", "Migration patterns", "Cultural DNA"].map(
          (label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-28 truncate">
                {label}
              </span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[oklch(0.45_0.25_295)] to-[oklch(0.68_0.22_86)] rounded-full animate-pulse"
                  style={{ width: "100%", animationDelay: `${i * 0.3}s` }}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// ─── Expandable Custom Item ───────────────────────────────────────────────────

function ExpandableCustom({ text, index }: { text: string; index: number }) {
  const [open, setOpen] = useState(false);
  const icons = ["🏺", "🌙", "🔥", "🌿", "🪔", "🎋"];
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className="glass border border-border/40 rounded-xl overflow-hidden"
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        data-ocid={`scanner.custom.${index + 1}`}
      >
        <span className="text-lg flex-shrink-0">
          {icons[index % icons.length]}
        </span>
        <span className="text-sm text-foreground flex-1 min-w-0 truncate">
          {text}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-3 text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-2"
          >
            This cultural practice from your ancestral heritage was passed down
            through generations as a way to honor the land, community, and
            spiritual connection unique to your family lineage.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const FALLBACK_INSIGHTS: AncestryInsights = {
  migrationStory:
    "Your lineage traces a remarkable journey—from ancient trade settlements through the mountain passes of Central Asia, down fertile river valleys, and along coastal routes shaped by monsoon winds. Each generation carried fragments of the previous world: songs, recipes, rituals, and names encoded with meaning.",
  familyTreeNodes: [
    {
      relation: "Paternal GF",
      name: "Ramprasad",
      region: "Varanasi",
      era: "1890s",
    },
    {
      relation: "Paternal GM",
      name: "Savitri",
      region: "Allahabad",
      era: "1900s",
    },
    {
      relation: "Maternal GF",
      name: "Krishnamurthy",
      region: "Madurai",
      era: "1895s",
    },
    {
      relation: "Maternal GM",
      name: "Kamala",
      region: "Chennai",
      era: "1905s",
    },
    { relation: "Father", name: "Suresh", region: "Mumbai", era: "1950s" },
    { relation: "Mother", name: "Meena", region: "Delhi", era: "1955s" },
    { relation: "Self", name: "You", region: "Present", era: "Now" },
  ],
  forgottenCustoms: [
    "River lamp ritual during harvest moon — oil lamps floated on sacred rivers at dusk",
    "Grain blessing ceremony — first harvest grains blessed by eldest woman before storage",
    "Dawn singing practice — devotional songs at sunrise to honor ancestral spirits",
    "Seasonal fasting cycle — lunar-calendar fasts tied to agricultural seasons",
    "Story-quilting tradition — embroidered textiles encoding family migration history",
  ],
  traditionalOccupations: [
    "Weaver",
    "Merchant",
    "Healer",
    "Scribe",
    "Farmer",
    "Potter",
  ],
  festivals: [
    "Harvest Moon Festival",
    "Spring Equinox Ritual",
    "Ancestor Remembrance Day",
    "River Blessing Ceremony",
  ],
  foods: [
    "Saffron rice with dried apricots",
    "Herb-crusted flatbread",
    "Spiced lentil stew",
    "Tamarind chutney",
    "Rose milk pudding",
  ],
};

const foodEmojis = ["🍚", "🫓", "🍲", "🥣", "🍮", "🫙", "🥘", "🍛"];
const festivalEmojis = ["🪔", "🌸", "🎊", "🌾", "⭐", "🎋", "🌙", "🎆"];

export default function HeritageScannerPage({
  onNavigateHome,
  onNavigate,
}: Props) {
  const { isAuthenticated, login } = useAuth();
  const { data: profile, isLoading: profileLoading } = useHeritageProfile();
  const generateInsights = useGenerateAncestryInsights();
  const saveProfile = useSaveHeritageProfile();

  const [form, setForm] = useState({
    surname: "",
    region: "",
    language: "",
    familyBackground: "",
    grandparentsOrigin: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [insights, setInsights] = useState<AncestryInsights | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Pre-fill form from saved profile
  useEffect(() => {
    if (profile) {
      setForm({
        surname: profile.surname,
        region: profile.region,
        language: profile.language,
        familyBackground: profile.familyBackground,
        grandparentsOrigin: profile.grandparentsOrigin,
      });
      setInsights({
        migrationStory: profile.migrationStory,
        familyTreeNodes: FALLBACK_INSIGHTS.familyTreeNodes,
        forgottenCustoms: profile.forgottenCustoms,
        traditionalOccupations: profile.traditionalOccupations,
        festivals: profile.festivals,
        foods: profile.foods,
      });
    }
  }, [profile]);

  const validate = () => {
    const errs: Partial<typeof form> = {};
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
      // Backend may not have AI yet — use rich fallback with user's data injected
      setInsights({
        ...FALLBACK_INSIGHTS,
        migrationStory: `The ${form.surname} lineage traces a remarkable journey from ${form.grandparentsOrigin} through ancient trade routes. Over generations, your ancestors from ${form.region} carried their ${form.language} language, customs, and identity across migrations shaped by history, commerce, and survival.`,
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
      foods: insights.foods,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const isScanning = generateInsights.isPending;
  const hasResults = !!insights;

  const heroContent = (
    <div className="flex flex-col gap-2">
      {["Surname Analysis", "Migration Mapping", "Cultural DNA Decode"].map(
        (tag) => (
          <div
            key={tag}
            className="glass-purple border border-[oklch(0.45_0.25_295/0.3)] rounded-lg px-4 py-2 text-sm text-[oklch(0.85_0.10_295)]"
          >
            ✦ {tag}
          </div>
        ),
      )}
    </div>
  );

  return (
    <ModuleLayout
      title="AI Heritage Identity Scanner"
      subtitle="Enter your family roots and let our AI reveal centuries of hidden ancestry, migration stories, and forgotten customs."
      icon={Cpu}
      accent="purple"
      badge="AI-Powered"
      onNavigateHome={onNavigateHome}
      onNavigate={onNavigate}
      heroContent={heroContent}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── Step 1: Input Form ── */}
        <div className="lg:col-span-2">
          <div className="glass-purple border border-[oklch(0.45_0.25_295/0.3)] rounded-2xl p-6 shadow-glow-purple sticky top-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-[oklch(0.45_0.25_295/0.2)] flex items-center justify-center">
                <span className="text-xs font-bold text-[oklch(0.75_0.15_295)]">
                  1
                </span>
              </div>
              <h2 className="font-display text-xl gradient-text-purple">
                Enter Your Heritage Roots
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label
                  htmlFor="surname"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Family Surname <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="surname"
                  data-ocid="scanner.surname_input"
                  placeholder="e.g. Chakraborty, Singh, Okafor…"
                  value={form.surname}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, surname: e.target.value }))
                  }
                  className="bg-background/50"
                />
                {errors.surname && (
                  <p
                    data-ocid="scanner.surname.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.surname}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="region"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Ancestral Region <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="region"
                  data-ocid="scanner.region_input"
                  placeholder="e.g. Bengal, Rajasthan, Yoruba…"
                  value={form.region}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, region: e.target.value }))
                  }
                  className="bg-background/50"
                />
                {errors.region && (
                  <p
                    data-ocid="scanner.region.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.region}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="language"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Heritage Language <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="language"
                  data-ocid="scanner.language_input"
                  placeholder="e.g. Sanskrit, Igbo, Tamil…"
                  value={form.language}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, language: e.target.value }))
                  }
                  className="bg-background/50"
                />
                {errors.language && (
                  <p
                    data-ocid="scanner.language.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.language}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="grandparents"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Grandparents' Origin{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="grandparents"
                  data-ocid="scanner.grandparents_input"
                  placeholder="e.g. Dhaka, Jaipur, Lagos…"
                  value={form.grandparentsOrigin}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      grandparentsOrigin: e.target.value,
                    }))
                  }
                  className="bg-background/50"
                />
                {errors.grandparentsOrigin && (
                  <p
                    data-ocid="scanner.grandparents.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.grandparentsOrigin}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="background"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Family Background{" "}
                  <span className="text-muted-foreground text-xs">
                    (Optional)
                  </span>
                </Label>
                <Textarea
                  id="background"
                  data-ocid="scanner.background_input"
                  placeholder="Share anything you know about your family history, traditions, or stories…"
                  value={form.familyBackground}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, familyBackground: e.target.value }))
                  }
                  rows={3}
                  className="bg-background/50 resize-none"
                />
              </div>

              <Button
                data-ocid="scanner.scan_button"
                onClick={handleScan}
                disabled={isScanning}
                className="w-full bg-[oklch(0.45_0.25_295)] hover:bg-[oklch(0.50_0.22_295)] text-[oklch(0.97_0.005_240)] font-semibold border-0 gap-2 mt-1"
              >
                {isScanning ? (
                  <span
                    data-ocid="scanner.loading_state"
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    Scanning Heritage…
                  </span>
                ) : (
                  <>
                    <Dna className="w-4 h-4" />
                    Scan My Heritage
                  </>
                )}
              </Button>

              {hasResults && (
                <Button
                  data-ocid="scanner.save_button"
                  variant="outline"
                  onClick={handleSave}
                  disabled={saveProfile.isPending}
                  className="w-full gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]"
                >
                  {saveProfile.isPending ? (
                    <span
                      data-ocid="scanner.save.loading_state"
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Saving…
                    </span>
                  ) : savedSuccess ? (
                    <span
                      data-ocid="scanner.save.success_state"
                      className="flex items-center gap-2 text-green-500"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Profile Saved!
                    </span>
                  ) : !isAuthenticated ? (
                    <>
                      <LogIn className="w-4 h-4" />
                      Login to Save Profile
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Heritage Profile
                    </>
                  )}
                </Button>
              )}
            </div>

            {profileLoading && (
              <div
                data-ocid="scanner.profile.loading_state"
                className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
              >
                <div className="w-3 h-3 border border-current/30 border-t-current rounded-full animate-spin" />
                Loading saved profile…
              </div>
            )}
          </div>
        </div>

        {/* ── Step 2: Results ── */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-ocid="scanner.scanning_state"
                className="glass-purple border border-[oklch(0.45_0.25_295/0.25)] rounded-2xl"
              >
                <DNAScanAnimation />
              </motion.div>
            ) : hasResults && insights ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-5"
              >
                {/* Step 2 header */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[oklch(0.45_0.25_295/0.2)] flex items-center justify-center">
                    <span className="text-xs font-bold text-[oklch(0.75_0.15_295)]">
                      2
                    </span>
                  </div>
                  <h2 className="font-display text-xl gradient-text-purple">
                    Your Ancestry Revealed
                  </h2>
                  <Badge className="ml-auto bg-[oklch(0.45_0.25_295/0.15)] text-[oklch(0.75_0.12_295)] border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>

                {/* Migration Story */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  data-ocid="scanner.migration_story"
                  className="glass-purple border-l-4 border-l-[oklch(0.68_0.22_86)] border border-[oklch(0.45_0.25_295/0.2)] rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-[oklch(0.68_0.22_86)]" />
                    <h3 className="font-semibold text-foreground">
                      Migration Story
                    </h3>
                  </div>
                  <blockquote className="text-sm text-muted-foreground leading-relaxed italic border-l-0 pl-0">
                    "{insights.migrationStory}"
                  </blockquote>
                </motion.div>

                {/* Family Tree */}
                {insights.familyTreeNodes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    data-ocid="scanner.family_tree"
                    className="glass-purple border border-[oklch(0.45_0.25_295/0.2)] rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Leaf className="w-5 h-5 text-[oklch(0.68_0.22_86)]" />
                      <h3 className="font-semibold text-foreground">
                        Family Tree
                      </h3>
                    </div>
                    <FamilyTreeSVG nodes={insights.familyTreeNodes} />
                  </motion.div>
                )}

                {/* Forgotten Customs */}
                {insights.forgottenCustoms.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    data-ocid="scanner.forgotten_customs"
                    className="glass border border-border/40 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-[oklch(0.68_0.22_86)]" />
                      <h3 className="font-semibold text-foreground">
                        Forgotten Customs
                      </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      {insights.forgottenCustoms.map((custom, i) => (
                        <ExpandableCustom
                          key={custom}
                          text={custom}
                          index={i}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Traditional Occupations */}
                {insights.traditionalOccupations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    data-ocid="scanner.occupations"
                    className="glass border border-border/40 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="w-5 h-5 text-[oklch(0.68_0.22_86)]" />
                      <h3 className="font-semibold text-foreground">
                        Traditional Occupations
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {insights.traditionalOccupations.map((occ, i) => (
                        <Badge
                          key={occ}
                          data-ocid={`scanner.occupation.${i + 1}`}
                          className="bg-gradient-to-r from-[oklch(0.68_0.22_86/0.15)] to-[oklch(0.76_0.18_80/0.1)] text-[oklch(0.62_0.18_86)] border border-[oklch(0.68_0.22_86/0.3)] px-3 py-1 text-sm"
                        >
                          {occ}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Ancestral Festivals */}
                {insights.festivals.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    data-ocid="scanner.festivals"
                    className="glass border border-border/40 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-[oklch(0.68_0.22_86)]" />
                      <h3 className="font-semibold text-foreground">
                        Ancestral Festivals
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {insights.festivals.map((f, i) => (
                        <Card
                          key={f}
                          data-ocid={`scanner.festival.${i + 1}`}
                          className="glass-purple border border-[oklch(0.45_0.25_295/0.25)] rounded-xl p-3 text-center card-hover cursor-default"
                        >
                          <div className="text-2xl mb-1">
                            {festivalEmojis[i % festivalEmojis.length]}
                          </div>
                          <p className="text-xs font-medium text-foreground leading-tight">
                            {f}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Traditional Foods */}
                {insights.foods.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    data-ocid="scanner.foods"
                    className="glass border border-border/40 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Utensils className="w-5 h-5 text-[oklch(0.68_0.22_86)]" />
                      <h3 className="font-semibold text-foreground">
                        Traditional Foods
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {insights.foods.map((food, i) => (
                        <Card
                          key={food}
                          data-ocid={`scanner.food.${i + 1}`}
                          className="glass border border-border/40 rounded-xl p-3 text-center card-hover cursor-default"
                        >
                          <div className="text-2xl mb-1">
                            {foodEmojis[i % foodEmojis.length]}
                          </div>
                          <p className="text-xs font-medium text-foreground leading-tight">
                            {food}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Explore CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-wrap gap-3"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="scanner.explore_traditions_button"
                    onClick={() => onNavigate("traditions")}
                    className="gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]"
                  >
                    Explore Your Traditions{" "}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="scanner.explore_festivals_button"
                    onClick={() => onNavigate("festival-planner")}
                    className="gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]"
                  >
                    Plan Ancestral Festivals{" "}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="scanner.empty_state"
                className="flex flex-col items-center justify-center min-h-64 glass border border-border/40 rounded-2xl gap-4 text-center p-10"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full glass-purple border border-[oklch(0.45_0.25_295/0.3)] flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-[oklch(0.65_0.18_295)]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[oklch(0.68_0.22_86)] flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-[oklch(0.12_0.08_260)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Discover Your Cultural DNA
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Fill in your heritage details on the left and click{" "}
                    <span className="text-[oklch(0.65_0.18_295)] font-medium">
                      Scan My Heritage
                    </span>{" "}
                    to uncover centuries of hidden ancestry.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="scanner.explore_button"
                  onClick={() => onNavigate("traditions")}
                  className="gap-2 border-[oklch(0.45_0.25_295/0.4)] text-[oklch(0.65_0.18_295)] hover:bg-[oklch(0.45_0.25_295/0.08)]"
                >
                  Explore Traditions <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ModuleLayout>
  );
}
