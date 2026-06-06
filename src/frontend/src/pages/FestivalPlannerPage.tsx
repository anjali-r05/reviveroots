import { ModuleLayout } from "@/components/ModuleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreateFestivalPlan,
  useDeleteFestivalPlan,
  useFestivalsByRegion,
  useListFestivals,
  useMyFestivalPlans,
  useUpdateFestivalPlan,
} from "@/hooks/useBackend";
import type { Festival, FestivalPlan, ItemId } from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import {
  Bell,
  BookOpen,
  Calendar,
  ChefHat,
  ChevronRight,
  Flame,
  MapPin,
  PartyPopper,
  Plus,
  Printer,
  RefreshCw,
  Shirt,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
}

// ─── Color theme per festival name ───────────────────────────────────────────

function getFestivalGradient(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("diwali"))
    return "from-[oklch(0.72_0.2_80/0.25)] to-[oklch(0.62_0.2_25/0.15)]";
  if (n.includes("holi"))
    return "from-[oklch(0.65_0.25_330/0.25)] to-[oklch(0.60_0.22_280/0.15)]";
  if (n.includes("eid") || n.includes("eid"))
    return "from-[oklch(0.55_0.18_160/0.25)] to-[oklch(0.68_0.22_86/0.15)]";
  if (n.includes("pongal") || n.includes("sankranti"))
    return "from-[oklch(0.72_0.2_80/0.25)] to-[oklch(0.65_0.18_65/0.15)]";
  if (n.includes("onam"))
    return "from-[oklch(0.55_0.18_160/0.25)] to-[oklch(0.65_0.15_200/0.15)]";
  if (n.includes("nowruz") || n.includes("losar"))
    return "from-[oklch(0.55_0.18_160/0.25)] to-[oklch(0.68_0.22_86/0.15)]";
  if (n.includes("christmas"))
    return "from-[oklch(0.55_0.2_25/0.25)] to-[oklch(0.55_0.18_160/0.15)]";
  if (n.includes("vesak") || n.includes("buddha"))
    return "from-[oklch(0.68_0.22_86/0.25)] to-[oklch(0.72_0.2_80/0.15)]";
  // cycle through palette
  const idx = name.charCodeAt(0) % 5;
  const gradients = [
    "from-[oklch(0.5_0.28_330/0.25)] to-[oklch(0.60_0.22_325/0.15)]",
    "from-[oklch(0.40_0.20_275/0.25)] to-[oklch(0.50_0.18_265/0.15)]",
    "from-[oklch(0.65_0.15_200/0.25)] to-[oklch(0.55_0.18_195/0.15)]",
    "from-[oklch(0.52_0.18_35/0.25)] to-[oklch(0.60_0.16_40/0.15)]",
    "from-[oklch(0.75_0.18_65/0.25)] to-[oklch(0.68_0.20_60/0.15)]",
  ];
  return gradients[idx];
}

// ─── Confetti Burst ───────────────────────────────────────────────────────────

function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = Array.from({ length: 18 });
  const colors = [
    "oklch(0.68_0.22_86)",
    "oklch(0.5_0.28_330)",
    "oklch(0.55_0.18_160)",
    "oklch(0.62_0.2_25)",
    "oklch(0.40_0.20_275)",
  ];
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-[200]">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * 360;
        const dist = 80 + Math.random() * 120;
        const size = 6 + Math.random() * 8;
        const color = colors[i % colors.length];
        const x = Math.cos((angle * Math.PI) / 180) * dist;
        const y = Math.sin((angle * Math.PI) / 180) * dist;
        return (
          <motion.div
            key={`confetti-${angle}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Festival Card ─────────────────────────────────────────────────────────────

interface FestivalCardProps {
  festival: Festival;
  index: number;
  isPlanned: boolean;
  onPlan: (f: Festival) => void;
  onExplore: (f: Festival) => void;
}

function FestivalCard({
  festival,
  index,
  isPlanned,
  onPlan,
  onExplore,
}: FestivalCardProps) {
  const grad = getFestivalGradient(festival.name);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      data-ocid={`festival.item.${index + 1}`}
      className={`relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br ${grad} bg-card backdrop-blur-sm card-hover group`}
    >
      {/* Date chip */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/80 backdrop-blur-sm rounded-full px-2.5 py-1 border border-border/40">
        <Calendar className="w-3 h-3 text-magenta" />
        <span className="text-[10px] font-semibold text-foreground">
          {festival.date}
        </span>
      </div>

      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg text-foreground group-hover:text-magenta transition-colors leading-tight truncate">
              {festival.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <MapPin className="w-3 h-3 text-magenta flex-shrink-0" />
              <span className="text-xs text-muted-foreground">
                {festival.region}
              </span>
              {(festival.languages ?? []).slice(0, 2).map((l) => (
                <Badge
                  key={l}
                  className="text-[9px] px-1.5 py-0 bg-[oklch(0.50_0.28_330/0.12)] text-[oklch(0.78_0.10_330)] border-0"
                >
                  {l}
                </Badge>
              ))}
            </div>
          </div>
          {isPlanned && (
            <Badge className="flex-shrink-0 bg-[oklch(0.50_0.28_330/0.15)] text-[oklch(0.78_0.12_330)] border-0 text-[10px]">
              ✓ Planned
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {festival.description}
        </p>
      </div>

      {/* Meaning */}
      <div className="px-5 py-3 border-t border-border/20">
        <div className="flex items-center gap-1 text-xs font-semibold text-magenta mb-1.5">
          <Flame className="w-3.5 h-3.5" /> Meaning
        </div>
        <p className="text-xs text-muted-foreground italic line-clamp-2">
          {festival.meaning}
        </p>
      </div>

      {/* Rituals */}
      <div className="px-5 py-3 border-t border-border/20">
        <div className="flex items-center gap-1 text-xs font-semibold text-magenta mb-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Key Rituals
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(festival.rituals ?? []).slice(0, 3).map((r) => (
            <Badge
              key={r}
              className="text-[10px] bg-[oklch(0.50_0.28_330/0.08)] text-[oklch(0.72_0.10_330)] border border-[oklch(0.50_0.28_330/0.25)]"
            >
              {r}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-3 flex items-center gap-2 border-t border-border/20">
        <Button
          size="sm"
          data-ocid={`festival.plan_button.${index + 1}`}
          onClick={() => onPlan(festival)}
          disabled={isPlanned}
          className={`flex-1 text-xs gap-1.5 ${
            isPlanned
              ? "bg-[oklch(0.50_0.28_330/0.12)] text-magenta hover:bg-[oklch(0.50_0.28_330/0.18)]"
              : "bg-[oklch(0.50_0.28_330)] hover:bg-[oklch(0.55_0.25_330)] text-[oklch(0.97_0.005_240)]"
          } border-0`}
        >
          {isPlanned ? (
            "✓ In Your Calendar"
          ) : (
            <>
              <Plus className="w-3 h-3" /> Plan This
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="outline"
          data-ocid={`festival.explore_button.${index + 1}`}
          onClick={() => onExplore(festival)}
          className="text-xs border-[oklch(0.50_0.28_330/0.3)] text-magenta hover:bg-[oklch(0.50_0.28_330/0.08)]"
        >
          Explore <ChevronRight className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Festival Detail Modal ────────────────────────────────────────────────────

interface DetailModalProps {
  festival: Festival | null;
  open: boolean;
  onClose: () => void;
  onStartPlan: (f: Festival) => void;
  isPlanned: boolean;
}

function FestivalDetailModal({
  festival,
  open,
  onClose,
  onStartPlan,
  isPlanned,
}: DetailModalProps) {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!open) setShowGuide(false);
  }, [open]);

  if (!festival) return null;

  const guide = `To celebrate ${festival.name}, start by ${festival.rituals?.[0] ?? "gathering your family"}. ${
    festival.recipes?.length
      ? `Prepare ${festival.recipes.slice(0, 2).join(" and ")} for the feast.`
      : ""
  } ${
    festival.clothingSuggestions?.length
      ? `Dress in ${festival.clothingSuggestions[0]}.`
      : ""
  } Invite your loved ones and honour the tradition: ${festival.meaning}.`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        data-ocid="festival.dialog"
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-[oklch(0.50_0.28_330/0.3)] p-0"
      >
        {/* Gradient header */}
        <div
          className={`bg-gradient-to-br ${getFestivalGradient(festival.name)} bg-card px-6 pt-6 pb-4 border-b border-border/30`}
        >
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="font-display text-2xl gradient-text-magenta leading-tight">
                  {festival.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-magenta" />{" "}
                    {festival.region}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-magenta" />{" "}
                    {festival.date}
                  </span>
                </div>
              </div>
              <button
                type="button"
                data-ocid="festival.close_button"
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {festival.description}
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Meaning */}
          <div>
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-magenta" /> Meaning
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {festival.meaning}
            </p>
          </div>

          {/* Rituals */}
          {(festival.rituals ?? []).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-magenta" /> Rituals
              </h4>
              <ol className="space-y-1.5">
                {festival.rituals.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-[oklch(0.50_0.28_330/0.15)] text-magenta text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      {festival.rituals.indexOf(r) + 1}
                    </span>
                    {r}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Recipes */}
          {(festival.recipes ?? []).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <ChefHat className="w-4 h-4 text-magenta" /> Traditional Recipes
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {festival.recipes.map((r) => (
                  <div
                    key={r}
                    className="glass-magenta rounded-lg p-2.5 text-xs text-muted-foreground font-medium"
                  >
                    🍽 {r}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clothing */}
          {(festival.clothingSuggestions ?? []).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <Shirt className="w-4 h-4 text-magenta" /> Clothing Suggestions
              </h4>
              <div className="space-y-1.5">
                {festival.clothingSuggestions.map((c) => (
                  <div
                    key={c}
                    className="glass-magenta rounded-lg p-2.5 text-xs text-muted-foreground"
                  >
                    👘 {c}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Guide toggle */}
          <div className="border-t border-border/30 pt-4">
            <Button
              variant="outline"
              size="sm"
              data-ocid="festival.generate_guide_button"
              onClick={() => setShowGuide(!showGuide)}
              className="w-full gap-2 border-[oklch(0.50_0.28_330/0.3)] text-magenta hover:bg-[oklch(0.50_0.28_330/0.08)]"
            >
              <Sparkles className="w-4 h-4" />
              {showGuide ? "Hide" : "Generate"} AI Celebration Guide
            </Button>
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="glass-magenta rounded-xl p-4 mt-3 text-sm text-muted-foreground leading-relaxed">
                    <p>{guide}</p>
                    {festival.celebrationGuide && (
                      <p className="mt-2 text-foreground/70">
                        {festival.celebrationGuide}
                      </p>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      data-ocid="festival.print_guide_button"
                      onClick={() => window.print()}
                      className="mt-3 gap-1.5 text-xs text-magenta hover:bg-[oklch(0.50_0.28_330/0.08)]"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print Guide
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <Button
            data-ocid="festival.detail_plan_button"
            onClick={() => {
              onStartPlan(festival);
              onClose();
            }}
            disabled={isPlanned}
            className="w-full gap-2 bg-[oklch(0.50_0.28_330)] hover:bg-[oklch(0.55_0.25_330)] text-[oklch(0.97_0.005_240)] border-0"
          >
            {isPlanned ? (
              "✓ Already Planned"
            ) : (
              <>
                <PartyPopper className="w-4 h-4" /> Create Celebration Plan
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Planning Modal ────────────────────────────────────────────────────────────

const REMINDER_OPTIONS = [
  { label: "7 days before", days: 7 },
  { label: "3 days before", days: 3 },
  { label: "1 day before", days: 1 },
  { label: "Day of", days: 0 },
];

interface PlanFormState {
  celebrationDate: string;
  familyMembers: string[];
  newMember: string;
  reminderDays: number[];
  notes: string;
}

interface PlanModalProps {
  festival: Festival | null;
  open: boolean;
  onClose: () => void;
  existingPlan?: FestivalPlan;
}

function PlanningModal({
  festival,
  open,
  onClose,
  existingPlan,
}: PlanModalProps) {
  const createPlan = useCreateFestivalPlan();
  const updatePlan = useUpdateFestivalPlan();
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [form, setForm] = useState<PlanFormState>({
    celebrationDate: "",
    familyMembers: existingPlan?.familyParticipants ?? [],
    newMember: "",
    reminderDays: [7, 1],
    notes: existingPlan?.notes ?? "",
  });

  useEffect(() => {
    if (open) {
      setStep(1);
      setForm({
        celebrationDate: "",
        familyMembers: existingPlan?.familyParticipants ?? [],
        newMember: "",
        reminderDays: [7, 1],
        notes: existingPlan?.notes ?? "",
      });
    }
  }, [open, existingPlan]);

  const addMember = () => {
    const name = form.newMember.trim();
    if (!name || form.familyMembers.includes(name)) return;
    setForm((f) => ({
      ...f,
      familyMembers: [...f.familyMembers, name],
      newMember: "",
    }));
  };

  const removeMember = (m: string) => {
    setForm((f) => ({
      ...f,
      familyMembers: f.familyMembers.filter((x) => x !== m),
    }));
  };

  const toggleReminder = (days: number) => {
    setForm((f) => ({
      ...f,
      reminderDays: f.reminderDays.includes(days)
        ? f.reminderDays.filter((d) => d !== days)
        : [...f.reminderDays, days],
    }));
  };

  const handleSubmit = async () => {
    if (!festival) return;
    const reminderAt =
      form.reminderDays.length > 0 && form.celebrationDate
        ? BigInt(
            new Date(form.celebrationDate).getTime() -
              Math.max(...form.reminderDays) * 86400000,
          ) * 1_000_000n
        : null;

    try {
      if (existingPlan) {
        await updatePlan.mutateAsync({
          planId: existingPlan.id,
          reminderAt,
          familyParticipants: form.familyMembers,
          notes: form.notes,
        });
        toast.success("Festival plan updated!");
      } else {
        await createPlan.mutateAsync({
          festivalId: festival.id,
          reminderAt,
          familyParticipants: form.familyMembers,
          notes: form.notes,
        });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
        toast.success(
          `${festival.name} added to your celebration calendar! 🎉`,
        );
      }
      onClose();
    } catch {
      toast.error("Failed to save plan. Please try again.");
    }
  };

  if (!festival) return null;
  const isEditing = !!existingPlan;
  const isPending = createPlan.isPending || updatePlan.isPending;

  return (
    <>
      <ConfettiBurst active={showConfetti} />
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          data-ocid="festival.planning_dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-[oklch(0.50_0.28_330/0.3)]"
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="font-display text-xl gradient-text-magenta">
                {isEditing ? "Edit Plan" : "Plan This Festival"}
              </DialogTitle>
              <button
                type="button"
                data-ocid="festival.planning_close_button"
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            {/* Festival name chip */}
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-[oklch(0.50_0.28_330/0.15)] text-[oklch(0.78_0.12_330)] border-0">
                {festival.name}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {festival.date}
              </span>
            </div>
            {/* Step indicator */}
            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? "bg-[oklch(0.50_0.28_330)]" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            {/* Step 1: Date */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <div>
                  <Label className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-magenta" /> When will you
                    celebrate?
                  </Label>
                  <Input
                    type="date"
                    data-ocid="festival.celebration_date_input"
                    value={form.celebrationDate}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        celebrationDate: e.target.value,
                      }))
                    }
                    className="border-border/40 focus:border-[oklch(0.50_0.28_330/0.5)]"
                  />
                </div>
                <p className="text-xs text-muted-foreground glass-magenta rounded-lg p-3">
                  Festival date:{" "}
                  <span className="text-foreground font-medium">
                    {festival.date}
                  </span>
                  . Set your personal celebration date above.
                </p>
              </motion.div>
            )}

            {/* Step 2: Family Members */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-magenta" /> Who's celebrating
                  with you?
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add family member name..."
                    data-ocid="festival.member_name_input"
                    value={form.newMember}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, newMember: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && addMember()}
                    className="border-border/40 focus:border-[oklch(0.50_0.28_330/0.5)]"
                  />
                  <Button
                    size="icon"
                    data-ocid="festival.add_member_button"
                    onClick={addMember}
                    className="bg-[oklch(0.50_0.28_330)] hover:bg-[oklch(0.55_0.25_330)] text-[oklch(0.97_0.005_240)] border-0 flex-shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {form.familyMembers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {form.familyMembers.map((m, i) => (
                      <div
                        key={m}
                        data-ocid={`festival.member_chip.${i + 1}`}
                        className="flex items-center gap-1.5 bg-[oklch(0.50_0.28_330/0.12)] text-[oklch(0.72_0.10_330)] rounded-full pl-1 pr-2 py-1"
                      >
                        <div className="w-6 h-6 rounded-full bg-[oklch(0.50_0.28_330/0.25)] flex items-center justify-center text-xs font-bold text-[oklch(0.50_0.28_330)]">
                          {m[0].toUpperCase()}
                        </div>
                        <span className="text-xs">{m}</span>
                        <button
                          type="button"
                          data-ocid={`festival.remove_member_button.${i + 1}`}
                          onClick={() => removeMember(m)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-3 glass rounded-lg">
                    No members added yet — celebrate solo or add your family!
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 3: Reminders */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-magenta" /> Set reminders
                </Label>
                <div className="space-y-2">
                  {REMINDER_OPTIONS.map(({ label, days }) => (
                    <button
                      key={days}
                      type="button"
                      className="flex items-center gap-3 glass rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors w-full text-left"
                      onClick={() => toggleReminder(days)}
                    >
                      <Checkbox
                        data-ocid={`festival.reminder_checkbox.${days}`}
                        checked={form.reminderDays.includes(days)}
                        onCheckedChange={() => toggleReminder(days)}
                        className="border-[oklch(0.50_0.28_330/0.4)] data-[state=checked]:bg-[oklch(0.50_0.28_330)] data-[state=checked]:border-[oklch(0.50_0.28_330)]"
                      />
                      <span className="text-sm text-foreground">{label}</span>
                      {form.reminderDays.includes(days) && (
                        <Badge className="ml-auto bg-[oklch(0.50_0.28_330/0.12)] text-[oklch(0.78_0.10_330)] border-0 text-[10px]">
                          Active
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Notes */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-magenta" /> Celebration
                  notes
                </Label>
                <Textarea
                  placeholder="Any special thoughts, family traditions to include, or items to prepare..."
                  data-ocid="festival.notes_textarea"
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  rows={4}
                  className="border-border/40 focus:border-[oklch(0.50_0.28_330/0.5)] resize-none"
                />
                {/* Summary */}
                <div className="glass-magenta rounded-xl p-3 space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Festival</span>
                    <span className="text-foreground font-medium">
                      {festival.name}
                    </span>
                  </div>
                  {form.celebrationDate && (
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span className="text-foreground font-medium">
                        {new Date(form.celebrationDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Participants</span>
                    <span className="text-foreground font-medium">
                      {form.familyMembers.length > 0
                        ? form.familyMembers.join(", ")
                        : "Solo"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reminders</span>
                    <span className="text-foreground font-medium">
                      {form.reminderDays.length} set
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex gap-2 pt-2">
              {step > 1 && (
                <Button
                  variant="outline"
                  data-ocid="festival.plan_back_button"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 border-border/40"
                >
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  data-ocid="festival.plan_next_button"
                  onClick={() => setStep((s) => s + 1)}
                  className="flex-1 bg-[oklch(0.50_0.28_330)] hover:bg-[oklch(0.55_0.25_330)] text-[oklch(0.97_0.005_240)] border-0"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  data-ocid="festival.plan_submit_button"
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="flex-1 bg-[oklch(0.50_0.28_330)] hover:bg-[oklch(0.55_0.25_330)] text-[oklch(0.97_0.005_240)] border-0 gap-2"
                >
                  {isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Saving…
                    </>
                  ) : (
                    <>
                      <PartyPopper className="w-4 h-4" />{" "}
                      {isEditing ? "Update Plan" : "Create Plan"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── My Plans Tab ─────────────────────────────────────────────────────────────

interface MyPlansTabProps {
  plans: FestivalPlan[];
  festivals: Festival[];
  onEdit: (plan: FestivalPlan, festival: Festival) => void;
}

function MyPlansTab({ plans, festivals, onEdit }: MyPlansTabProps) {
  const deletePlan = useDeleteFestivalPlan();
  const [confirmId, setConfirmId] = useState<ItemId | null>(null);

  const getFestival = (id: ItemId) => festivals.find((f) => f.id === id);

  const handleDelete = async (planId: ItemId) => {
    try {
      await deletePlan.mutateAsync(planId);
      toast.success("Plan removed from your calendar.");
    } catch {
      toast.error("Failed to delete plan.");
    } finally {
      setConfirmId(null);
    }
  };

  if (plans.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-ocid="festival.my_plans_empty_state"
        className="flex flex-col items-center gap-4 py-20 text-center"
      >
        <div className="w-16 h-16 rounded-full glass-magenta flex items-center justify-center">
          <Calendar className="w-8 h-8 text-magenta" />
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">No plans yet</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Browse the Upcoming or All Festivals tabs and plan your first
            celebration.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plans.map((plan, i) => {
        const festival = getFestival(plan.festivalId);
        const grad = festival
          ? getFestivalGradient(festival.name)
          : "from-muted to-muted/50";
        const nextReminder = plan.reminderAt
          ? new Date(Number(plan.reminderAt) / 1_000_000).toLocaleDateString()
          : null;

        return (
          <motion.div
            key={String(plan.id)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            data-ocid={`festival.plan_item.${i + 1}`}
            className={`relative rounded-2xl border border-border/40 bg-gradient-to-br ${grad} bg-card overflow-hidden`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base text-foreground truncate">
                    {festival?.name ?? `Festival #${String(plan.festivalId)}`}
                  </h3>
                  {festival && (
                    <span className="text-xs text-muted-foreground">
                      {festival.date} · {festival.region}
                    </span>
                  )}
                </div>
                <Badge className="bg-[oklch(0.50_0.28_330/0.15)] text-[oklch(0.78_0.12_330)] border-0 text-[10px] flex-shrink-0">
                  Planned
                </Badge>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-magenta" />
                  {plan.familyParticipants.length > 0
                    ? `${plan.familyParticipants.length} member${plan.familyParticipants.length > 1 ? "s" : ""}`
                    : "Solo"}
                </span>
                {nextReminder && (
                  <span className="flex items-center gap-1">
                    <Bell className="w-3.5 h-3.5 text-magenta" /> Reminder{" "}
                    {nextReminder}
                  </span>
                )}
              </div>

              {/* Family chips */}
              {plan.familyParticipants.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {plan.familyParticipants.slice(0, 4).map((m) => (
                    <div
                      key={m}
                      className="flex items-center gap-1 bg-[oklch(0.50_0.28_330/0.1)] text-[oklch(0.72_0.10_330)] rounded-full px-2 py-0.5 text-[10px]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[oklch(0.50_0.28_330/0.2)] flex items-center justify-center text-[9px] font-bold">
                        {m[0].toUpperCase()}
                      </div>
                      {m}
                    </div>
                  ))}
                  {plan.familyParticipants.length > 4 && (
                    <div className="bg-[oklch(0.50_0.28_330/0.1)] text-[oklch(0.72_0.10_330)] rounded-full px-2 py-0.5 text-[10px]">
                      +{plan.familyParticipants.length - 4}
                    </div>
                  )}
                </div>
              )}

              {plan.notes && (
                <p className="text-xs text-muted-foreground italic line-clamp-2 mb-3">
                  "{plan.notes}"
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-border/20">
                {festival && (
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`festival.edit_plan_button.${i + 1}`}
                    onClick={() => onEdit(plan, festival)}
                    className="flex-1 text-xs border-[oklch(0.50_0.28_330/0.3)] text-magenta hover:bg-[oklch(0.50_0.28_330/0.08)]"
                  >
                    Edit Plan
                  </Button>
                )}
                {confirmId === plan.id ? (
                  <div className="flex gap-1 flex-1">
                    <Button
                      size="sm"
                      data-ocid={`festival.confirm_delete_button.${i + 1}`}
                      onClick={() => handleDelete(plan.id)}
                      disabled={deletePlan.isPending}
                      className="flex-1 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground border-0"
                    >
                      {deletePlan.isPending ? "..." : "Confirm"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      data-ocid={`festival.cancel_delete_button.${i + 1}`}
                      onClick={() => setConfirmId(null)}
                      className="text-xs border-border/40"
                    >
                      No
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    data-ocid={`festival.delete_plan_button.${i + 1}`}
                    onClick={() => setConfirmId(plan.id)}
                    className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function FestivalPlannerPage({
  onNavigateHome,
  onNavigate,
}: Props) {
  const { isAuthenticated } = useAuth();
  const [regionFilter, setRegionFilter] = useState("");
  const [tab, setTab] = useState("upcoming");

  const { data: allFestivals = [], isLoading: isLoadingAll } =
    useListFestivals();
  const { data: filteredByRegion = [], isLoading: isLoadingFiltered } =
    useFestivalsByRegion(regionFilter);
  const { data: myPlans = [] } = useMyFestivalPlans();

  const [detailFestival, setDetailFestival] = useState<Festival | null>(null);
  const [planFestival, setPlanFestival] = useState<Festival | null>(null);
  const [editingPlan, setEditingPlan] = useState<FestivalPlan | undefined>(
    undefined,
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);

  const isLoading = isLoadingAll || (!!regionFilter && isLoadingFiltered);
  const displayFestivals = regionFilter ? filteredByRegion : allFestivals;

  // For stats
  const now = new Date();
  const thisMonth = displayFestivals.filter((f) => {
    const parts = f.date.split(" ");
    return parts.some((p) =>
      now
        .toLocaleString("en", { month: "long" })
        .toLowerCase()
        .startsWith(p.toLowerCase().slice(0, 3)),
    );
  });

  const plannedIds = new Set(myPlans.map((p) => String(p.festivalId)));

  const openDetail = (f: Festival) => {
    setDetailFestival(f);
    setDetailOpen(true);
  };
  const openPlan = (f: Festival) => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setPlanFestival(f);
    setEditingPlan(undefined);
    setPlanOpen(true);
  };
  const openEditPlan = (plan: FestivalPlan, festival: Festival) => {
    setPlanFestival(festival);
    setEditingPlan(plan);
    setPlanOpen(true);
  };

  const REGIONS = [
    "Pan-India",
    "South India",
    "Kerala",
    "Iran",
    "Global",
    "Tibet",
    "Tamil Nadu",
  ];

  const heroContent = (
    <div className="flex flex-row md:flex-col gap-3">
      <div className="glass-magenta border border-[oklch(0.50_0.28_330/0.3)] rounded-xl p-4 text-center min-w-[110px]">
        <div className="text-3xl font-display font-bold gradient-text-magenta">
          {displayFestivals.length}
        </div>
        <div className="text-xs text-[oklch(0.78_0.10_330)] mt-0.5">
          Festivals
        </div>
      </div>
      <div className="glass-magenta border border-[oklch(0.50_0.28_330/0.3)] rounded-xl p-4 text-center min-w-[110px]">
        <div className="text-3xl font-display font-bold gradient-text-magenta">
          {myPlans.length}
        </div>
        <div className="text-xs text-[oklch(0.78_0.10_330)] mt-0.5">
          My Plans
        </div>
      </div>
      <div className="glass-magenta border border-[oklch(0.50_0.28_330/0.3)] rounded-xl p-4 text-center min-w-[110px]">
        <div className="text-3xl font-display font-bold gradient-text-magenta">
          {thisMonth.length}
        </div>
        <div className="text-xs text-[oklch(0.78_0.10_330)] mt-0.5">
          This Month
        </div>
      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Festival Planner AI"
      subtitle="Discover personalized upcoming festivals, their meanings, rituals, recipes, clothing guides, and family celebration planning tools."
      icon={Calendar}
      accent="magenta"
      badge="Personalized AI"
      onNavigateHome={onNavigateHome}
      onNavigate={onNavigate}
      heroContent={heroContent}
    >
      {/* Heritage filter bar */}
      <div className="glass-magenta border border-[oklch(0.50_0.28_330/0.25)] rounded-2xl p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground flex-shrink-0">
            <Sparkles className="w-4 h-4 text-magenta" /> Filter by Region
          </div>
          <div className="flex flex-wrap gap-2 flex-1">
            <button
              type="button"
              data-ocid="festival.region_filter.all"
              onClick={() => setRegionFilter("")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                !regionFilter
                  ? "bg-[oklch(0.50_0.28_330)] text-[oklch(0.97_0.005_240)]"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                data-ocid={`festival.region_filter.${r.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => setRegionFilter(r === regionFilter ? "" : r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  regionFilter === r
                    ? "bg-[oklch(0.50_0.28_330)] text-[oklch(0.97_0.005_240)]"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} data-ocid="festival.tabs">
        <TabsList className="glass border border-border/40 mb-6 w-full sm:w-auto flex overflow-x-auto scrollbar-hide">
          <TabsTrigger
            value="upcoming"
            data-ocid="festival.tab.upcoming"
            className="flex-1 sm:flex-none text-xs sm:text-sm"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="this-month"
            data-ocid="festival.tab.this-month"
            className="flex-1 sm:flex-none text-xs sm:text-sm"
          >
            This Month
          </TabsTrigger>
          <TabsTrigger
            value="all"
            data-ocid="festival.tab.all"
            className="flex-1 sm:flex-none text-xs sm:text-sm"
          >
            All Festivals
          </TabsTrigger>
          <TabsTrigger
            value="my-plans"
            data-ocid="festival.tab.my-plans"
            className="flex-1 sm:flex-none text-xs sm:text-sm"
          >
            My Plans
            {myPlans.length > 0 && (
              <Badge className="ml-1.5 bg-[oklch(0.50_0.28_330/0.2)] text-[oklch(0.78_0.10_330)] border-0 text-[10px] px-1.5 py-0">
                {myPlans.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Upcoming */}
        <TabsContent value="upcoming">
          <FestivalsGrid
            festivals={displayFestivals.slice(0, 6)}
            isLoading={isLoading}
            plannedIds={plannedIds}
            onPlan={openPlan}
            onExplore={openDetail}
          />
        </TabsContent>

        {/* This Month */}
        <TabsContent value="this-month">
          <FestivalsGrid
            festivals={thisMonth}
            isLoading={isLoading}
            plannedIds={plannedIds}
            onPlan={openPlan}
            onExplore={openDetail}
            emptyMessage="No festivals found for this month. Try the All Festivals tab to explore."
          />
        </TabsContent>

        {/* All */}
        <TabsContent value="all">
          <FestivalsGrid
            festivals={displayFestivals}
            isLoading={isLoading}
            plannedIds={plannedIds}
            onPlan={openPlan}
            onExplore={openDetail}
          />
        </TabsContent>

        {/* My Plans */}
        <TabsContent value="my-plans">
          {!isAuthenticated ? (
            <div
              data-ocid="festival.auth_prompt"
              className="flex flex-col items-center gap-4 py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full glass-magenta flex items-center justify-center">
                <Bell className="w-8 h-8 text-magenta" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Sign in to manage your plans
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Create a free account to save festival plans, set reminders,
                  and invite family.
                </p>
              </div>
              <Button
                data-ocid="festival.signin_button"
                onClick={() => onNavigate("signup")}
                className="gap-2 bg-[oklch(0.50_0.28_330)] hover:bg-[oklch(0.55_0.25_330)] text-[oklch(0.97_0.005_240)] border-0"
              >
                <Sparkles className="w-4 h-4" /> Sign In
              </Button>
            </div>
          ) : (
            <MyPlansTab
              plans={myPlans}
              festivals={displayFestivals}
              onEdit={openEditPlan}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Detail modal */}
      <FestivalDetailModal
        festival={detailFestival}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onStartPlan={openPlan}
        isPlanned={
          detailFestival ? plannedIds.has(String(detailFestival.id)) : false
        }
      />

      {/* Planning modal */}
      <PlanningModal
        festival={planFestival}
        open={planOpen}
        onClose={() => setPlanOpen(false)}
        existingPlan={editingPlan}
      />
    </ModuleLayout>
  );
}

// ─── Festival Grid helper ─────────────────────────────────────────────────────

interface FestivalsGridProps {
  festivals: Festival[];
  isLoading: boolean;
  plannedIds: Set<string>;
  onPlan: (f: Festival) => void;
  onExplore: (f: Festival) => void;
  emptyMessage?: string;
}

function FestivalsGrid({
  festivals,
  isLoading,
  plannedIds,
  onPlan,
  onExplore,
  emptyMessage,
}: FestivalsGridProps) {
  if (isLoading) {
    return (
      <div
        data-ocid="festival.loading_state"
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (festivals.length === 0) {
    return (
      <div
        data-ocid="festival.empty_state"
        className="flex flex-col items-center gap-4 py-20 text-center"
      >
        <Calendar className="w-12 h-12 text-magenta opacity-40" />
        <p className="text-muted-foreground max-w-xs">
          {emptyMessage ??
            "No festivals found. Try adjusting the region filter."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {festivals.map((festival, i) => (
        <FestivalCard
          key={String(festival.id)}
          festival={festival}
          index={i}
          isPlanned={plannedIds.has(String(festival.id))}
          onPlan={onPlan}
          onExplore={onExplore}
        />
      ))}
    </div>
  );
}
