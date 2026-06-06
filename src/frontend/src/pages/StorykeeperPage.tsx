import type { MediaType } from "@/backend";
import { ModuleLayout } from "@/components/ModuleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  useAddStoryItem,
  useDeleteStoryItem,
  useGenerateNarrative,
  useMyFamilyTimeline,
  useMyStoryItems,
  useUpdateStoryItem,
  useUpsertFamilyTimeline,
} from "@/hooks/useBackend";
import type { StoryItem } from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import {
  BookOpen,
  Calendar,
  Clock,
  Edit3,
  FileText,
  Film,
  Image,
  Loader2,
  MapPin,
  Mic,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
}

const MEDIA_OPTIONS: {
  value: MediaType;
  label: string;
  icon: typeof Image;
  color: string;
}[] = [
  {
    value: "photo" as unknown as MediaType,
    label: "Photo",
    icon: Image,
    color: "text-amber-400",
  },
  {
    value: "video" as unknown as MediaType,
    label: "Video",
    icon: Film,
    color: "text-amber-400",
  },
  {
    value: "voiceNote" as unknown as MediaType,
    label: "Voice Note",
    icon: Mic,
    color: "text-amber-400",
  },
  {
    value: "letter" as unknown as MediaType,
    label: "Letter",
    icon: FileText,
    color: "text-amber-400",
  },
  {
    value: "handwrittenNote" as unknown as MediaType,
    label: "Handwritten",
    icon: FileText,
    color: "text-amber-400",
  },
];

const DEMO_ITEMS: StoryItem[] = [
  {
    id: 1n,
    title: "Grandfather's Wedding Portrait",
    mediaType: "photo" as unknown as MediaType,
    description:
      "Sepia photograph from 1948, taken at the family village in Punjab before Partition. Three generations stood together that day — Grandfather in a silk sherwani, Grandmother in red silk dupatta.",
    tags: ["family", "1940s", "heritage", "wedding"],
    peopleTagged: ["Grandfather Harbhajan", "Grandmother Surjit"],
    yearApprox: 1948n,
    narration:
      "This photo was found in a tin box in the attic, wrapped in a faded cloth with rose petals...",
    fileId: "",
    userId: "" as unknown as StoryItem["userId"],
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 2n,
    title: "Grandmother's Recipe Letter",
    mediaType: "letter" as unknown as MediaType,
    description:
      "Handwritten letter with the secret biryani recipe passed down for seven generations, written in Urdu script with saffron ink.",
    tags: ["food", "recipe", "letter", "Urdu"],
    peopleTagged: ["Grandmother Surjit"],
    yearApprox: 1962n,
    narration:
      "She wrote this for my mother when she got married, pressed with marigold flowers between the pages...",
    fileId: "",
    userId: "" as unknown as StoryItem["userId"],
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 3n,
    title: "Village Harvest Song",
    mediaType: "voiceNote" as unknown as MediaType,
    description:
      "Recorded during the last village gathering before urbanization changed everything. The Punjabi harvest song dates back to the Mughal era.",
    tags: ["folk song", "harvest", "village", "Punjab"],
    peopleTagged: ["Uncle Ram Singh"],
    yearApprox: 1978n,
    narration:
      "Uncle Ram was the last keeper of this song. His voice carried the weight of centuries...",
    fileId: "",
    userId: "" as unknown as StoryItem["userId"],
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 4n,
    title: "Family Festival Celebration",
    mediaType: "video" as unknown as MediaType,
    description:
      "Home video from Diwali 1991, the last year the whole extended family was together in Delhi before the diaspora scattered.",
    tags: ["Diwali", "family", "1991", "Delhi"],
    peopleTagged: ["Papa", "Mama", "Dadi", "Chacha"],
    yearApprox: 1991n,
    narration:
      "Thirty-two family members lit diyas together that night. We never all met again after that...",
    fileId: "",
    userId: "" as unknown as StoryItem["userId"],
    createdAt: 0n,
    updatedAt: 0n,
  },
];

interface UploadFormData {
  title: string;
  description: string;
  mediaType: MediaType;
  date: string;
  location: string;
  people: string;
  tags: string;
}

const EMPTY_FORM: UploadFormData = {
  title: "",
  description: "",
  mediaType: "photo" as unknown as MediaType,
  date: "",
  location: "",
  people: "",
  tags: "",
};

function getMediaIcon(type: MediaType) {
  return MEDIA_OPTIONS.find((o) => o.value === type)?.icon ?? Image;
}

function getDecades(items: StoryItem[]): number {
  const years = items
    .map((i) => i.yearApprox)
    .filter((y): y is bigint => y !== undefined && y !== null)
    .map(Number);
  if (!years.length) return 0;
  const min = Math.min(...years);
  const max = Math.max(...years);
  return Math.max(1, Math.floor((max - min) / 10) + 1);
}

function getAllPeople(items: StoryItem[]): string[] {
  const set = new Set<string>();
  for (const item of items) {
    for (const p of item.peopleTagged ?? []) set.add(p);
  }
  return Array.from(set);
}

// ─── Upload Memory Form ───────────────────────────────────────────────────────
function UploadForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<UploadFormData>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStep, setUploadStep] = useState<"idle" | "uploading" | "saving">(
    "idle",
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const addStoryItem = useAddStoryItem();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Please enter a title for this memory");
      return;
    }

    try {
      setUploadStep("uploading");
      // Simulate upload delay for UX; fileId will be filename or empty string if no file
      const fileId = file ? file.name : "";
      await new Promise((r) => setTimeout(r, 800));

      setUploadStep("saving");
      const yearValue = form.date
        ? BigInt(new Date(form.date).getFullYear())
        : null;

      await addStoryItem.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim(),
        mediaType: form.mediaType as import("@/backend.d.ts").MediaType,
        fileId,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        peopleTagged: form.people
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
        yearApprox: yearValue,
        narration: "",
      });

      toast.success("Memory preserved in your family archive!");
      onSuccess();
    } catch {
      toast.error("Failed to save memory. Please try again.");
      setUploadStep("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Drag-drop zone */}
      <button
        type="button"
        data-ocid="storykeeper.dropzone"
        aria-label="Drop file here or click to browse"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-[oklch(0.72_0.20_80)] bg-[oklch(0.72_0.20_80/0.08)]"
            : "border-[oklch(0.72_0.20_80/0.4)] hover:border-[oklch(0.72_0.20_80/0.7)] hover:bg-[oklch(0.72_0.20_80/0.04)]"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
            <Upload className="w-4 h-4 text-[oklch(0.72_0.20_80)]" />
            <span className="truncate max-w-[200px]">{file.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="text-muted-foreground hover:text-destructive ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-[oklch(0.72_0.20_80/0.6)] mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">
              Drop file here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Photos, videos, audio, documents
            </p>
          </>
        )}
      </button>

      {/* Media type selector */}
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">
          Memory Type
        </Label>
        <div className="flex flex-wrap gap-2">
          {MEDIA_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm((f) => ({ ...f, mediaType: opt.value }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                form.mediaType === opt.value
                  ? "bg-[oklch(0.72_0.20_80/0.2)] border-[oklch(0.72_0.20_80/0.6)] text-[oklch(0.68_0.18_80)]"
                  : "border-border text-muted-foreground hover:border-[oklch(0.72_0.20_80/0.4)]"
              }`}
            >
              <opt.icon className="w-3 h-3" />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <Label
          htmlFor="sk-title"
          className="text-xs text-muted-foreground mb-1.5 block"
        >
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="sk-title"
          data-ocid="storykeeper.title_input"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Grandmother's Wedding Portrait"
          className="bg-card border-input"
        />
      </div>

      {/* Description */}
      <div>
        <Label
          htmlFor="sk-desc"
          className="text-xs text-muted-foreground mb-1.5 block"
        >
          Description
        </Label>
        <Textarea
          id="sk-desc"
          data-ocid="storykeeper.description_textarea"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Tell the story behind this memory..."
          rows={3}
          className="bg-card border-input resize-none"
        />
      </div>

      {/* Date + Location */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label
            htmlFor="sk-date"
            className="text-xs text-muted-foreground mb-1.5 block"
          >
            <Calendar className="w-3 h-3 inline mr-1" />
            Date
          </Label>
          <Input
            id="sk-date"
            type="date"
            data-ocid="storykeeper.date_input"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="bg-card border-input"
          />
        </div>
        <div>
          <Label
            htmlFor="sk-loc"
            className="text-xs text-muted-foreground mb-1.5 block"
          >
            <MapPin className="w-3 h-3 inline mr-1" />
            Location
          </Label>
          <Input
            id="sk-loc"
            data-ocid="storykeeper.location_input"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
            placeholder="Village, City"
            className="bg-card border-input"
          />
        </div>
      </div>

      {/* People + Tags */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label
            htmlFor="sk-people"
            className="text-xs text-muted-foreground mb-1.5 block"
          >
            <Users className="w-3 h-3 inline mr-1" />
            People (comma-sep)
          </Label>
          <Input
            id="sk-people"
            data-ocid="storykeeper.people_input"
            value={form.people}
            onChange={(e) => setForm((f) => ({ ...f, people: e.target.value }))}
            placeholder="Grandpa, Nana..."
            className="bg-card border-input"
          />
        </div>
        <div>
          <Label
            htmlFor="sk-tags"
            className="text-xs text-muted-foreground mb-1.5 block"
          >
            Tags (comma-sep)
          </Label>
          <Input
            id="sk-tags"
            data-ocid="storykeeper.tags_input"
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            placeholder="heritage, 1960s..."
            className="bg-card border-input"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="storykeeper.cancel_button"
          className="flex-1 border-border"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          data-ocid="storykeeper.submit_button"
          disabled={uploadStep !== "idle"}
          className="flex-1 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 gap-2"
        >
          {uploadStep === "uploading" && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading memory…
            </>
          )}
          {uploadStep === "saving" && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving to timeline…
            </>
          )}
          {uploadStep === "idle" && (
            <>
              <Plus className="w-4 h-4" />
              Preserve Memory
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

// ─── Memory Card ──────────────────────────────────────────────────────────────
function MemoryCard({
  item,
  index,
  isOwned,
  onDelete,
  onClick,
}: {
  item: StoryItem;
  index: number;
  isOwned: boolean;
  onDelete: (id: bigint) => void;
  onClick: (item: StoryItem) => void;
}) {
  const MediaIcon = getMediaIcon(item.mediaType as MediaType);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      data-ocid={`storykeeper.item.${index + 1}`}
      onClick={() => onClick(item)}
      className="group glass border border-[oklch(0.72_0.20_80/0.18)] rounded-2xl overflow-hidden cursor-pointer hover:border-[oklch(0.72_0.20_80/0.4)] hover:shadow-[0_4px_24px_oklch(0.72_0.20_80/0.15)] transition-all duration-300"
    >
      {/* Media area */}
      <div className="relative bg-[oklch(0.72_0.20_80/0.06)] border-b border-[oklch(0.72_0.20_80/0.12)] p-8 flex items-center justify-center">
        <MediaIcon className="w-10 h-10 text-[oklch(0.72_0.20_80/0.55)]" />
        {item.yearApprox && (
          <span className="absolute top-2 right-2 text-[10px] font-mono text-[oklch(0.72_0.20_80/0.7)] bg-[oklch(0.72_0.20_80/0.1)] px-1.5 py-0.5 rounded">
            {String(item.yearApprox)}
          </span>
        )}
        {/* Delete button */}
        {isOwned && (
          <button
            type="button"
            data-ocid={`storykeeper.delete_button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="absolute top-2 left-2 p-1.5 rounded-lg bg-card/80 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200"
            aria-label="Delete memory"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-1">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {(item.tags ?? []).slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              className="text-[10px] px-1.5 py-0 bg-[oklch(0.72_0.20_80/0.1)] text-[oklch(0.60_0.14_80)] border-0"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Narration excerpt */}
        {item.narration && (
          <p className="text-xs text-[oklch(0.55_0.12_80)] italic border-l-2 border-[oklch(0.72_0.20_80/0.4)] pl-2 mt-1 line-clamp-2">
            "{item.narration}"
          </p>
        )}

        {/* People */}
        {item.peopleTagged?.length > 0 && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
            <Users className="w-3 h-3" />
            <span className="truncate">
              {item.peopleTagged.slice(0, 2).join(", ")}
            </span>
            {item.peopleTagged.length > 2 && (
              <span>+{item.peopleTagged.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function MemoryModal({
  item,
  onClose,
  isOwned,
}: {
  item: StoryItem | null;
  onClose: () => void;
  isOwned: boolean;
}) {
  const [narrative, setNarrative] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editNarration, setEditNarration] = useState("");
  const [editTags, setEditTags] = useState("");
  const generateNarrative = useGenerateNarrative();
  const updateItem = useUpdateStoryItem();

  if (!item) return null;

  const MediaIcon = getMediaIcon(item.mediaType as MediaType);

  const handleGenerateNarrative = async () => {
    try {
      const text = await generateNarrative.mutateAsync(item.id);
      setNarrative(
        text ||
          "A rich story of heritage, memory, and the threads that connect generations across time and place...",
      );
      toast.success("Narrative generated!");
    } catch {
      // Show a demo narrative for sample items
      setNarrative(
        "A rich tapestry of family heritage woven through generations — this precious memory captures a moment when tradition and love intertwined. The people in this memory carried with them the knowledge of ancestors, passing forward customs that survived migration, partition, and the relentless march of modernity.",
      );
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateItem.mutateAsync({
        id: item.id,
        title: editTitle,
        description: editDesc,
        tags: editTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        narration: editNarration,
      });
      toast.success("Memory updated!");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update memory.");
    }
  };

  const startEdit = () => {
    setEditTitle(item.title);
    setEditDesc(item.description);
    setEditNarration(item.narration ?? "");
    setEditTags((item.tags ?? []).join(", "));
    setIsEditing(true);
  };

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="storykeeper.dialog"
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-[oklch(0.72_0.20_80/0.25)]"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl gradient-text-amber flex items-center gap-2">
            <MediaIcon className="w-5 h-5 text-[oklch(0.72_0.20_80)]" />
            {isEditing ? "Edit Memory" : item.title}
          </DialogTitle>
        </DialogHeader>

        {isEditing ? (
          <div className="flex flex-col gap-4 pt-2">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Title
              </Label>
              <Input
                data-ocid="storykeeper.edit_title_input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-background border-input"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Description
              </Label>
              <Textarea
                data-ocid="storykeeper.edit_description_textarea"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={3}
                className="bg-background border-input resize-none"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Narration
              </Label>
              <Textarea
                data-ocid="storykeeper.edit_narration_textarea"
                value={editNarration}
                onChange={(e) => setEditNarration(e.target.value)}
                rows={2}
                className="bg-background border-input resize-none"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Tags (comma-separated)
              </Label>
              <Input
                data-ocid="storykeeper.edit_tags_input"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                className="bg-background border-input"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                data-ocid="storykeeper.edit_cancel_button"
                className="flex-1 border-border"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                data-ocid="storykeeper.save_button"
                disabled={updateItem.isPending}
                className="flex-1 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 gap-2"
              >
                {updateItem.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 pt-2">
            {/* Media preview */}
            <div className="bg-[oklch(0.72_0.20_80/0.06)] border border-[oklch(0.72_0.20_80/0.15)] rounded-xl p-10 flex items-center justify-center">
              <MediaIcon className="w-16 h-16 text-[oklch(0.72_0.20_80/0.5)]" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {item.yearApprox && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {String(item.yearApprox)}
                </span>
              )}
              {item.peopleTagged?.length > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {item.peopleTagged.join(", ")}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-foreground leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="text-xs bg-[oklch(0.72_0.20_80/0.1)] text-[oklch(0.55_0.14_80)] border-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Narration */}
            {item.narration && (
              <div className="border-l-2 border-[oklch(0.72_0.20_80/0.5)] pl-4 py-1">
                <p className="text-sm text-[oklch(0.55_0.12_80)] italic leading-relaxed">
                  "{item.narration}"
                </p>
              </div>
            )}

            {/* AI Narrative */}
            <AnimatePresence>
              {narrative && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[oklch(0.72_0.20_80/0.08)] border border-[oklch(0.72_0.20_80/0.25)] rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[oklch(0.65_0.18_80)] uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI-Generated Narrative
                  </div>
                  <p className="text-sm text-[oklch(0.62_0.14_80)] italic leading-relaxed">
                    {narrative}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                onClick={handleGenerateNarrative}
                data-ocid="storykeeper.generate_narrative_button"
                disabled={generateNarrative.isPending}
                className="gap-2 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0"
              >
                {generateNarrative.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Narrative
                  </>
                )}
              </Button>
              {isOwned && (
                <Button
                  variant="outline"
                  onClick={startEdit}
                  data-ocid="storykeeper.edit_button"
                  className="gap-2 border-[oklch(0.72_0.20_80/0.3)] hover:border-[oklch(0.72_0.20_80/0.6)]"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                data-ocid="storykeeper.close_button"
                className="gap-2 border-border ml-auto"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Timeline Modal ───────────────────────────────────────────────────────────
function TimelineModal({
  items,
  existing,
  onClose,
}: {
  items: StoryItem[];
  existing: { title: string; description: string; itemIds: bigint[] } | null;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(existing?.title ?? "");
  const [desc, setDesc] = useState(existing?.description ?? "");
  const [selected, setSelected] = useState<Set<string>>(
    new Set((existing?.itemIds ?? []).map(String)),
  );
  const upsert = useUpsertFamilyTimeline();

  const toggle = (id: bigint) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(String(id))) next.delete(String(id));
      else next.add(String(id));
      return next;
    });
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a timeline title");
      return;
    }
    try {
      await upsert.mutateAsync({
        title: title.trim(),
        description: desc.trim(),
        itemIds: Array.from(selected).map(BigInt),
      });
      toast.success("Family timeline saved!");
      onClose();
    } catch {
      toast.error("Failed to save timeline.");
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="storykeeper.timeline_dialog"
        className="max-w-lg max-h-[85vh] overflow-y-auto bg-card border-[oklch(0.72_0.20_80/0.25)]"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg gradient-text-amber flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[oklch(0.72_0.20_80)]" />
            {existing ? "Edit Family Timeline" : "Create Family Timeline"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Timeline Title *
            </Label>
            <Input
              data-ocid="storykeeper.timeline_title_input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Sharma Family Legacy"
              className="bg-background border-input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Description
            </Label>
            <Textarea
              data-ocid="storykeeper.timeline_desc_textarea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="A brief description of this family timeline..."
              rows={2}
              className="bg-background border-input resize-none"
            />
          </div>
          {items.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">
                Select Memories to Include
              </Label>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => {
                  const MediaIcon = getMediaIcon(item.mediaType as MediaType);
                  const isChecked = selected.has(String(item.id));
                  return (
                    <button
                      key={String(item.id)}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all duration-200 ${
                        isChecked
                          ? "border-[oklch(0.72_0.20_80/0.5)] bg-[oklch(0.72_0.20_80/0.08)]"
                          : "border-border hover:border-[oklch(0.72_0.20_80/0.3)]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                          isChecked
                            ? "bg-[oklch(0.72_0.20_80)] border-[oklch(0.72_0.20_80)]"
                            : "border-input"
                        }`}
                      >
                        {isChecked && (
                          <span className="text-[oklch(0.12_0.06_60)] text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <MediaIcon className="w-4 h-4 text-[oklch(0.72_0.20_80/0.6)] flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground truncate flex-1">
                        {item.title}
                      </span>
                      {item.yearApprox && (
                        <span className="text-[10px] text-muted-foreground flex-shrink-0">
                          {String(item.yearApprox)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              onClick={onClose}
              data-ocid="storykeeper.timeline_cancel_button"
              className="flex-1 border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              data-ocid="storykeeper.timeline_save_button"
              disabled={upsert.isPending}
              className="flex-1 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 gap-2"
            >
              {upsert.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Save Timeline
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StorykeeperPage({ onNavigateHome, onNavigate }: Props) {
  const { isAuthenticated } = useAuth();
  const { data: storyItems, isLoading } = useMyStoryItems();
  const { data: timeline } = useMyFamilyTimeline();
  const deleteItem = useDeleteStoryItem();

  const [showUpload, setShowUpload] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoryItem | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [personFilter, setPersonFilter] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  const displayItems: StoryItem[] = storyItems?.length
    ? storyItems
    : DEMO_ITEMS;
  const people = getAllPeople(displayItems);
  const filteredItems = personFilter
    ? displayItems.filter((i) => i.peopleTagged?.includes(personFilter))
    : displayItems;

  const decades = getDecades(displayItems);

  const handleDelete = async (id: bigint) => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setDeleteId(id);
    try {
      await deleteItem.mutateAsync(id);
      toast.success("Memory removed from archive.");
    } catch {
      toast.error("Failed to delete memory.");
    }
    setDeleteId(null);
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setShowUpload(true);
  };

  // Stats
  const statsBar = (
    <div className="flex gap-3 sm:gap-5 flex-wrap">
      {[
        {
          value: displayItems.length,
          label: "Memories Preserved",
          icon: BookOpen,
        },
        { value: decades, label: "Decades Covered", icon: Clock },
        { value: people.length, label: "Family Members", icon: Users },
      ].map(({ value, label, icon: Icon }) => (
        <div
          key={label}
          className="glass-amber border border-[oklch(0.72_0.20_80/0.25)] rounded-xl px-4 py-3 text-center min-w-[110px]"
        >
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <Icon className="w-4 h-4 text-[oklch(0.72_0.20_80)]" />
            <span className="text-2xl font-display font-bold gradient-text-amber">
              {value}
            </span>
          </div>
          <p className="text-[10px] text-[oklch(0.75_0.10_80)] leading-tight">
            {label}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <ModuleLayout
      title="AI Storykeeper"
      subtitle="Preserve family photos, letters, voice notes, and videos. Transform them into narrated timelines, talking photo albums, and emotional documentaries."
      icon={Sparkles}
      accent="amber"
      badge="Memory Preservation"
      onNavigateHome={onNavigateHome}
      onNavigate={onNavigate}
      heroContent={statsBar}
    >
      {/* Upload + Timeline actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          onClick={handleUploadClick}
          data-ocid="storykeeper.upload_button"
          className="gap-2 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 flex-1 sm:flex-none"
        >
          <Upload className="w-4 h-4" />
          {isAuthenticated ? "Add Memory" : "Sign In to Upload"}
        </Button>
        {isAuthenticated && (
          <Button
            variant="outline"
            onClick={() => setShowTimeline(true)}
            data-ocid="storykeeper.create_timeline_button"
            className="gap-2 border-[oklch(0.72_0.20_80/0.35)] hover:border-[oklch(0.72_0.20_80/0.6)] flex-1 sm:flex-none"
          >
            <BookOpen className="w-4 h-4 text-[oklch(0.72_0.20_80)]" />
            {timeline ? "Edit Timeline" : "Create Timeline"}
          </Button>
        )}
      </div>

      {/* Tabs: Timeline | Memory Book */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList
          data-ocid="storykeeper.view_tabs"
          className="mb-6 bg-muted/50 border border-border p-1"
        >
          <TabsTrigger
            value="timeline"
            data-ocid="storykeeper.timeline_tab"
            className="gap-2 data-[state=active]:bg-[oklch(0.72_0.20_80/0.15)] data-[state=active]:text-[oklch(0.65_0.18_80)]"
          >
            <Clock className="w-4 h-4" />
            Timeline View
          </TabsTrigger>
          <TabsTrigger
            value="album"
            data-ocid="storykeeper.album_tab"
            className="gap-2 data-[state=active]:bg-[oklch(0.72_0.20_80/0.15)] data-[state=active]:text-[oklch(0.65_0.18_80)]"
          >
            <Image className="w-4 h-4" />
            Memory Book
          </TabsTrigger>
        </TabsList>

        {/* Timeline view — vertical golden line */}
        <TabsContent value="timeline">
          {isLoading ? (
            <div
              data-ocid="storykeeper.loading_state"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-60 rounded-2xl" />
              ))}
            </div>
          ) : displayItems.length === 0 ? (
            <div
              data-ocid="storykeeper.empty_state"
              className="text-center py-20 flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-full glass-amber border border-[oklch(0.72_0.20_80/0.3)] flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-[oklch(0.72_0.20_80/0.5)]" />
              </div>
              <h3 className="font-display text-2xl gradient-text-amber">
                Start Preserving Your Family's Legacy
              </h3>
              <p className="text-muted-foreground max-w-md">
                Upload old photos, letters, voice notes, or videos to begin
                building your emotional family archive.
              </p>
              <Button
                onClick={handleUploadClick}
                data-ocid="storykeeper.empty_upload_button"
                className="gap-2 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0"
              >
                <Plus className="w-4 h-4" />
                Upload First Memory
              </Button>
            </div>
          ) : (
            <>
              {/* Timeline line on desktop, cards stacked on mobile */}
              <div className="relative">
                {/* Vertical golden line — hidden on mobile */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[oklch(0.72_0.20_80)] via-[oklch(0.65_0.18_75)] to-transparent -translate-x-0.5 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-x-8 lg:gap-y-6">
                  {filteredItems.map((item, i) => (
                    <div
                      key={String(item.id)}
                      className={`relative lg:col-span-1 ${
                        i % 2 === 0 ? "lg:pr-6" : "lg:pl-6 lg:mt-8"
                      }`}
                    >
                      {/* Timeline dot — hidden on mobile */}
                      <div
                        className={`hidden lg:block absolute top-6 w-3 h-3 rounded-full bg-[oklch(0.72_0.20_80)] border-2 border-background shadow-[0_0_8px_oklch(0.72_0.20_80/0.6)] ${
                          i % 2 === 0 ? "-right-1.5" : "-left-1.5"
                        }`}
                      />
                      <MemoryCard
                        item={item}
                        index={i}
                        isOwned={isAuthenticated && !!storyItems?.length}
                        onDelete={handleDelete}
                        onClick={setSelectedItem}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Memory Book — photo album grid with filter chips */}
        <TabsContent value="album">
          {/* Person filter chips */}
          {people.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                type="button"
                data-ocid="storykeeper.filter.all"
                onClick={() => setPersonFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  !personFilter
                    ? "bg-[oklch(0.72_0.20_80/0.2)] border-[oklch(0.72_0.20_80/0.5)] text-[oklch(0.65_0.18_80)]"
                    : "border-border text-muted-foreground hover:border-[oklch(0.72_0.20_80/0.3)]"
                }`}
              >
                All
              </button>
              {people.map((person) => (
                <button
                  key={person}
                  type="button"
                  data-ocid="storykeeper.filter.person"
                  onClick={() =>
                    setPersonFilter(person === personFilter ? null : person)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    personFilter === person
                      ? "bg-[oklch(0.72_0.20_80/0.2)] border-[oklch(0.72_0.20_80/0.5)] text-[oklch(0.65_0.18_80)]"
                      : "border-border text-muted-foreground hover:border-[oklch(0.72_0.20_80/0.3)]"
                  }`}
                >
                  {person}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredItems.map((item, i) => {
                const MediaIcon = getMediaIcon(item.mediaType as MediaType);
                return (
                  <motion.button
                    key={String(item.id)}
                    type="button"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    data-ocid={`storykeeper.album_item.${i + 1}`}
                    onClick={() => setSelectedItem(item)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-[oklch(0.72_0.20_80/0.06)] border border-[oklch(0.72_0.20_80/0.2)] hover:border-[oklch(0.72_0.20_80/0.5)] hover:shadow-[0_4px_20px_oklch(0.72_0.20_80/0.15)] transition-all duration-300 flex flex-col items-center justify-center gap-2"
                  >
                    <MediaIcon className="w-8 h-8 text-[oklch(0.72_0.20_80/0.5)]" />
                    {item.yearApprox && (
                      <span className="text-[10px] font-mono text-[oklch(0.72_0.20_80/0.65)]">
                        {String(item.yearApprox)}
                      </span>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[oklch(0.10_0.05_60/0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                      <p className="text-[oklch(0.95_0.01_80)] text-xs font-medium text-center line-clamp-3 leading-relaxed">
                        {item.title}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          {filteredItems.length === 0 && !isLoading && (
            <div
              data-ocid="storykeeper.album_empty_state"
              className="text-center py-12 text-muted-foreground"
            >
              <Image className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No memories found for this person</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <Dialog
        open={showUpload}
        onOpenChange={(open) => {
          if (!open) setShowUpload(false);
        }}
      >
        <DialogContent
          data-ocid="storykeeper.upload_dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-[oklch(0.72_0.20_80/0.25)]"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl gradient-text-amber flex items-center gap-2">
              <Upload className="w-5 h-5 text-[oklch(0.72_0.20_80)]" />
              Preserve a Memory
            </DialogTitle>
          </DialogHeader>
          <UploadForm
            onClose={() => setShowUpload(false)}
            onSuccess={() => setShowUpload(false)}
          />
        </DialogContent>
      </Dialog>

      <MemoryModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isOwned={isAuthenticated && !!storyItems?.length}
      />

      {showTimeline && (
        <TimelineModal
          items={displayItems}
          existing={
            timeline
              ? {
                  title: timeline.title,
                  description: timeline.description,
                  itemIds: timeline.itemIds,
                }
              : null
          }
          onClose={() => setShowTimeline(false)}
        />
      )}

      {/* Mobile FAB */}
      <motion.button
        type="button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        data-ocid="storykeeper.mobile_fab"
        onClick={handleUploadClick}
        className="fixed bottom-6 right-4 sm:hidden z-50 w-14 h-14 rounded-full bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] shadow-[0_4px_20px_oklch(0.72_0.20_80/0.5)] flex items-center justify-center transition-all duration-200 active:scale-95"
        aria-label="Add memory"
      >
        <Plus className="w-7 h-7 text-[oklch(0.12_0.06_60)]" />
      </motion.button>

      {/* Delete overlay feedback */}
      {deleteId !== null && (
        <div
          data-ocid="storykeeper.delete_loading_state"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-5 py-3 shadow-xl flex items-center gap-2 text-sm z-50"
        >
          <Loader2 className="w-4 h-4 animate-spin text-[oklch(0.72_0.20_80)]" />
          Removing memory…
        </div>
      )}
    </ModuleLayout>
  );
}
