import { CourseCategory } from "@/backend";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useBookMentor,
  useCancelMentorBooking,
  useCompleteCourse,
  useEnrollInCourse,
  useListCourses,
  useMyEnrollments,
  useMyMentorBookings,
  useUpdateCourseProgress,
} from "@/hooks/useBackend";
import type { Course, Enrollment, MentorBooking } from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import type { Principal } from "@icp-sdk/core/principal";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Medal,
  Music,
  Play,
  Star,
  User,
  Users,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const categoryEmojis: Record<CourseCategory, string> = {
  dance: "💃",
  music: "🎵",
  pottery: "🏺",
  weaving: "🧵",
  yoga: "🧘",
  calligraphy: "✒️",
  cooking: "🍳",
  martialArts: "🥋",
  regionalArts: "🎨",
};

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Dance & Music", value: "dance-music" },
  { label: "Crafts & Art", value: "crafts-art" },
  { label: "Yoga & Wellness", value: "yoga-wellness" },
  { label: "Martial Arts", value: "martial-arts" },
  { label: "Culinary Arts", value: "culinary-arts" },
  { label: "Literature", value: "literature" },
];

const CATEGORY_FILTER_MAP: Record<string, string[]> = {
  "dance-music": ["dance", "music"],
  "crafts-art": ["pottery", "weaving", "calligraphy", "regionalArts"],
  "yoga-wellness": ["yoga"],
  "martial-arts": ["martialArts"],
  "culinary-arts": ["cooking"],
};

const MOCK_MENTORS = [
  {
    id: "mentor-1",
    name: "Guru Meenakshi Devi",
    specialty: "Bharatanatyam & Classical Dance",
    rating: 4.9,
    sessions: 340,
    avatar: "🧘",
    slots: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
  },
  {
    id: "mentor-2",
    name: "Pandit Raghunath Sharma",
    specialty: "Hindustani Classical Music",
    rating: 5.0,
    sessions: 210,
    avatar: "🎶",
    slots: ["10:00 AM", "12:00 PM", "4:00 PM", "6:00 PM"],
  },
  {
    id: "mentor-3",
    name: "Master Vasu Gurukkal",
    specialty: "Kalaripayattu Martial Arts",
    rating: 4.8,
    sessions: 175,
    avatar: "🥋",
    slots: ["7:00 AM", "9:00 AM", "5:00 PM", "7:00 PM"],
  },
  {
    id: "mentor-4",
    name: "Kamla Devi",
    specialty: "Madhubani Painting & Folk Arts",
    rating: 4.9,
    sessions: 290,
    avatar: "🎨",
    slots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
  },
];

const MOCK_REVIEWS = [
  {
    name: "Aditya Sharma",
    rating: 5,
    text: "Truly transformative — I reconnected with my culture in ways I never expected. The instructor was phenomenal.",
  },
  {
    name: "Priya Nair",
    rating: 5,
    text: "The live sessions feel like sitting in a real gurukul. Ancient wisdom delivered beautifully for modern learners.",
  },
];

const MOCK_CURRICULUM = [
  { module: 1, title: "Foundations & History", lessons: 5 },
  { module: 2, title: "Core Techniques", lessons: 8 },
  { module: 3, title: "Advanced Practice & Certification", lessons: 6 },
];

const SAMPLE_COURSES: Course[] = [
  {
    id: 1n,
    title: "Bharatanatyam for Beginners",
    category: CourseCategory.dance,
    instructorName: "Guru Meenakshi Devi",
    instructorId: "" as unknown as Principal,
    price: 2999n,
    durationMinutes: 60n,
    isLive: true,
    maxParticipants: 20n,
    imageUrl: "",
    description:
      "Learn the foundational mudras and adavus of this sacred temple dance form practiced for over 2000 years.",
    createdAt: 0n,
  },
  {
    id: 2n,
    title: "Raga Music Immersion",
    category: CourseCategory.music,
    instructorName: "Pandit Raghunath Sharma",
    instructorId: "" as unknown as Principal,
    price: 3499n,
    durationMinutes: 90n,
    isLive: false,
    maxParticipants: 30n,
    imageUrl: "",
    description:
      "Journey through the 72 melakarta ragas and their seasonal meanings with a lineage master.",
    createdAt: 0n,
  },
  {
    id: 3n,
    title: "Madhubani Painting Mastery",
    category: CourseCategory.regionalArts,
    instructorName: "Kamla Devi",
    instructorId: "" as unknown as Principal,
    price: 1999n,
    durationMinutes: 45n,
    isLive: false,
    maxParticipants: 15n,
    imageUrl: "",
    description:
      "Traditional Bihar folk art with natural dyes and symbolic imagery — from basic motifs to wall murals.",
    createdAt: 0n,
  },
  {
    id: 4n,
    title: "Kalaripayattu: Ancient Martial Art",
    category: CourseCategory.martialArts,
    instructorName: "Master Vasu Gurukkal",
    instructorId: "" as unknown as Principal,
    price: 4999n,
    durationMinutes: 75n,
    isLive: true,
    maxParticipants: 10n,
    imageUrl: "",
    description:
      "Kerala's 3,000-year-old mother of all martial arts — unifying body, breath, and spirit.",
    createdAt: 0n,
  },
  {
    id: 5n,
    title: "Traditional Pottery with Clay",
    category: CourseCategory.pottery,
    instructorName: "Aziz Khan",
    instructorId: "" as unknown as Principal,
    price: 2499n,
    durationMinutes: 60n,
    isLive: false,
    maxParticipants: 8n,
    imageUrl: "",
    description:
      "Wheel-throwing and hand-building from Multan's ancient ceramic traditions, passed down 12 generations.",
    createdAt: 0n,
  },
  {
    id: 6n,
    title: "Kashmiri Pashmina Weaving",
    category: CourseCategory.weaving,
    instructorName: "Gulshan Qadri",
    instructorId: "" as unknown as Principal,
    price: 5999n,
    durationMinutes: 120n,
    isLive: true,
    maxParticipants: 6n,
    imageUrl: "",
    description:
      "The 500-year-old art of creating the world's finest wool textile — warp, weft, and soul.",
    createdAt: 0n,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-[oklch(0.75_0.18_65)] text-[oklch(0.75_0.18_65)]" : "text-muted-foreground"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

function CourseGradient({ category }: { category: string }) {
  const gradients: Record<string, string> = {
    dance: "from-[oklch(0.45_0.25_295/0.4)] to-[oklch(0.55_0.18_280/0.2)]",
    music: "from-[oklch(0.40_0.20_275/0.4)] to-[oklch(0.50_0.20_270/0.2)]",
    pottery: "from-[oklch(0.60_0.16_40/0.4)] to-[oklch(0.72_0.18_50/0.2)]",
    weaving: "from-[oklch(0.65_0.15_200/0.4)] to-[oklch(0.55_0.18_195/0.2)]",
    yoga: "from-[oklch(0.62_0.20_25/0.4)] to-[oklch(0.55_0.18_20/0.2)]",
    calligraphy: "from-[oklch(0.72_0.20_80/0.4)] to-[oklch(0.65_0.18_75/0.2)]",
    cooking: "from-[oklch(0.52_0.18_35/0.4)] to-[oklch(0.60_0.16_40/0.2)]",
    martialArts:
      "from-[oklch(0.50_0.28_330/0.4)] to-[oklch(0.60_0.22_325/0.2)]",
    regionalArts: "from-[oklch(0.75_0.18_65/0.4)] to-[oklch(0.68_0.20_60/0.2)]",
  };
  return (
    <div
      className={`w-full h-36 rounded-t-xl bg-gradient-to-br ${gradients[category] ?? gradients.dance} flex items-center justify-center`}
    >
      <span className="text-5xl">
        {categoryEmojis[category as CourseCategory] ?? "🎓"}
      </span>
    </div>
  );
}

// ─── Course Detail Modal ──────────────────────────────────────────────────────

function CourseDetailModal({
  course,
  isEnrolled,
  onClose,
  onEnroll,
  enrolling,
}: {
  course: Course;
  isEnrolled: boolean;
  onClose: () => void;
  onEnroll: () => void;
  enrolling: boolean;
}) {
  const price = Number(course.price);
  const displayPrice =
    price === 0 ? "Free" : `₹${(price / 100).toLocaleString()}`;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        data-ocid="gurukul.course_detail.dialog"
        className="max-w-2xl max-h-[90vh] overflow-y-auto glass border border-[oklch(0.75_0.18_65/0.25)] bg-card"
      >
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              {course.isLive && (
                <Badge className="mb-2 text-[10px] bg-[oklch(0.62_0.20_25/0.2)] text-[oklch(0.80_0.14_25)] border-0 animate-pulse">
                  🔴 LIVE CLASS
                </Badge>
              )}
              <DialogTitle className="font-display text-xl gradient-text-saffron">
                {course.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                by {course.instructorName}
              </p>
            </div>
            <button
              type="button"
              data-ocid="gurukul.course_detail.close_button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </DialogHeader>

        <CourseGradient category={String(course.category)} />

        <div className="flex flex-wrap gap-2 items-center mt-3">
          <Badge className="bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.88_0.10_65)] border-0 text-xs capitalize">
            {categoryEmojis[course.category as unknown as CourseCategory]}{" "}
            {String(course.category)}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" /> {Number(course.durationMinutes)} min
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" /> {Number(course.maxParticipants)} seats
          </span>
          <StarRating rating={4.8} />
        </div>

        {/* Description */}
        <div className="glass-saffron border border-[oklch(0.75_0.18_65/0.2)] rounded-xl p-4">
          <h4 className="font-semibold text-sm mb-2 text-foreground">
            About this Course
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor Bio */}
        <div className="glass border border-border/30 rounded-xl p-4">
          <h4 className="font-semibold text-sm mb-2 text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-[oklch(0.75_0.18_65)]" /> Instructor
          </h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[oklch(0.75_0.18_65/0.2)] flex items-center justify-center text-lg flex-shrink-0">
              {categoryEmojis[course.category as unknown as CourseCategory] ??
                "🎓"}
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                {course.instructorName}
              </p>
              <p className="text-xs text-muted-foreground">
                Verified Master · 20+ years of practice
              </p>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[oklch(0.75_0.18_65)]" />{" "}
            Curriculum
          </h4>
          <div className="space-y-2">
            {MOCK_CURRICULUM.map((m) => (
              <div
                key={m.module}
                className="flex items-center justify-between glass border border-border/20 rounded-lg px-4 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] text-xs flex items-center justify-center font-bold flex-shrink-0">
                    {m.module}
                  </span>
                  <span className="text-sm text-foreground">{m.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {m.lessons} lessons
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground flex items-center gap-2">
            <Star className="w-4 h-4 text-[oklch(0.75_0.18_65)]" /> Student
            Reviews
          </h4>
          <div className="space-y-3">
            {MOCK_REVIEWS.map((r) => (
              <div
                key={r.name}
                className="glass border border-border/20 rounded-xl p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-[oklch(0.75_0.18_65/0.2)] flex items-center justify-center text-xs font-bold text-[oklch(0.75_0.18_65)]">
                    {r.name[0]}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {r.name}
                  </span>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-9">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div>
            <span className="font-display text-2xl gradient-text-saffron">
              {displayPrice}
            </span>
            {price > 0 && (
              <p className="text-xs text-muted-foreground">per month</p>
            )}
          </div>
          <Button
            data-ocid="gurukul.course_detail.enroll_button"
            onClick={onEnroll}
            disabled={isEnrolled || enrolling}
            className="bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-2"
          >
            {isEnrolled ? (
              <>
                <CheckCircle className="w-4 h-4" /> Enrolled
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Enroll Now
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Certificate Animation ────────────────────────────────────────────────────

function CertificateModal({
  courseName,
  onClose,
}: {
  courseName: string;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        data-ocid="gurukul.certificate.dialog"
        className="max-w-md glass border border-[oklch(0.75_0.18_65/0.4)] bg-card text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex flex-col items-center gap-5 py-4"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)] flex items-center justify-center shadow-glow"
          >
            <Medal className="w-12 h-12 text-[oklch(0.12_0.06_60)]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-display text-2xl gradient-text-saffron mb-2">
              Course Complete!
            </h2>
            <p className="text-muted-foreground text-sm mb-1">
              Congratulations! You've earned a certificate for
            </p>
            <p className="font-semibold text-foreground">{courseName}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="glass-saffron border border-[oklch(0.75_0.18_65/0.3)] rounded-xl px-6 py-4 w-full"
          >
            <div className="flex items-center gap-2 justify-center text-[oklch(0.75_0.18_65)]">
              <Award className="w-5 h-5" />
              <span className="font-semibold text-sm">
                Heritage Arts Certificate
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Issued on{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </motion.div>
          <Button
            data-ocid="gurukul.certificate.close_button"
            onClick={onClose}
            className="w-full bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0"
          >
            Download Certificate
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Lesson Player Modal ──────────────────────────────────────────────────────

function LessonPlayerModal({
  course,
  enrollment,
  onClose,
  onMarkComplete,
  onCompleteCourse,
  updating,
  completing,
}: {
  course: Course;
  enrollment: Enrollment;
  onClose: () => void;
  onMarkComplete: () => void;
  onCompleteCourse: () => void;
  updating: boolean;
  completing: boolean;
}) {
  const progress = Number(enrollment.progressPct);
  const isCompleted = progress >= 100;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        data-ocid="gurukul.lesson_player.dialog"
        className="max-w-2xl max-h-[90vh] overflow-y-auto glass border border-[oklch(0.75_0.18_65/0.25)] bg-card"
      >
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="font-display text-xl gradient-text-saffron">
              {course.title}
            </DialogTitle>
            <button
              type="button"
              data-ocid="gurukul.lesson_player.close_button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Video Placeholder */}
        <div className="w-full h-48 rounded-xl bg-gradient-to-br from-[oklch(0.10_0.05_60)] to-[oklch(0.15_0.08_265)] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-[oklch(0.12_0.08_260/0.5)]" />
          <Video className="w-12 h-12 text-[oklch(0.75_0.18_65/0.6)] relative z-10" />
          <p className="text-xs text-[oklch(0.99_0.005_240/0.5)] relative z-10">
            Live Lesson Stream
          </p>
          {course.isLive && (
            <span className="absolute top-3 right-3 flex items-center gap-1 bg-[oklch(0.62_0.20_25/0.8)] px-2 py-0.5 rounded-full text-[10px] font-bold text-[oklch(0.99_0.005_240)]">
              <span className="w-1.5 h-1.5 bg-[oklch(0.80_0.14_25)] rounded-full animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              Progress
            </span>
            <span className="text-sm font-bold text-[oklch(0.75_0.18_65)]">
              {progress}%
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)]"
            />
          </div>
        </div>

        {/* Lesson Content */}
        <div className="glass-saffron border border-[oklch(0.75_0.18_65/0.2)] rounded-xl p-4">
          <h4 className="font-semibold text-sm mb-2 text-foreground">
            Current Module: Core Techniques
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In this session, you will explore the intermediate techniques passed
            down through generations. Focus on precision, breath control, and
            authentic expression. Practice each element slowly before building
            speed and flow.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Technique", "Practice", "History"].map((tag) => (
              <Badge
                key={tag}
                className="bg-[oklch(0.75_0.18_65/0.1)] text-[oklch(0.75_0.18_65)] border-0 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-border/30">
          {isCompleted ? (
            <Button
              data-ocid="gurukul.lesson_player.complete_course_button"
              onClick={onCompleteCourse}
              disabled={completing || !!enrollment.completedAt}
              className="flex-1 bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)] text-[oklch(0.12_0.06_60)] border-0 gap-2"
            >
              <Award className="w-4 h-4" />
              {enrollment.completedAt ? "Certified ✓" : "Claim Certificate"}
            </Button>
          ) : (
            <Button
              data-ocid="gurukul.lesson_player.mark_complete_button"
              onClick={onMarkComplete}
              disabled={updating}
              className="flex-1 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {updating ? "Saving…" : "Mark Lesson Complete (+25%)"}
            </Button>
          )}
          <Button
            data-ocid="gurukul.lesson_player.close_button"
            variant="outline"
            onClick={onClose}
            className="border-border/40"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Mentor Booking Modal ─────────────────────────────────────────────────────

function MentorBookingModal({
  mentor,
  onClose,
  onBook,
  booking,
}: {
  mentor: (typeof MOCK_MENTORS)[0];
  onClose: () => void;
  onBook: (date: string, slot: string, topic: string) => void;
  booking: boolean;
}) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot || !topic.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    onBook(date, slot, topic);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        data-ocid="gurukul.booking.dialog"
        className="max-w-md glass border border-[oklch(0.75_0.18_65/0.25)] bg-card"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl gradient-text-saffron">
            Book a Session
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 glass-saffron border border-[oklch(0.75_0.18_65/0.2)] rounded-xl p-3">
          <div className="w-12 h-12 rounded-xl bg-[oklch(0.75_0.18_65/0.2)] flex items-center justify-center text-2xl flex-shrink-0">
            {mentor.avatar}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">
              {mentor.name}
            </p>
            <p className="text-xs text-muted-foreground">{mentor.specialty}</p>
            <StarRating rating={mentor.rating} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="booking-date"
              className="text-sm text-foreground mb-1.5"
            >
              Select Date
            </Label>
            <Input
              id="booking-date"
              data-ocid="gurukul.booking.date_input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="bg-background/50 border-border/40"
            />
          </div>

          <div>
            <Label className="text-sm text-foreground mb-1.5">
              Select Time Slot
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {mentor.slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  data-ocid="gurukul.booking.time_slot"
                  onClick={() => setSlot(s)}
                  className={`px-3 py-2 rounded-lg text-sm border transition-all duration-200 ${
                    slot === s
                      ? "bg-[oklch(0.75_0.18_65)] text-[oklch(0.12_0.06_60)] border-[oklch(0.75_0.18_65)]"
                      : "bg-background/50 border-border/40 text-foreground hover:border-[oklch(0.75_0.18_65/0.4)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label
              htmlFor="booking-topic"
              className="text-sm text-foreground mb-1.5"
            >
              Topic / Goals
            </Label>
            <Textarea
              id="booking-topic"
              data-ocid="gurukul.booking.topic_input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What would you like to learn in this session?"
              rows={3}
              className="bg-background/50 border-border/40 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              data-ocid="gurukul.booking.submit_button"
              disabled={booking}
              className="flex-1 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0"
            >
              {booking ? "Booking…" : "Confirm Booking"}
            </Button>
            <Button
              type="button"
              data-ocid="gurukul.booking.cancel_button"
              variant="outline"
              onClick={onClose}
              className="border-border/40"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GurukulPage({ onNavigateHome, onNavigate }: Props) {
  const { isAuthenticated } = useAuth();
  const { data: courses, isLoading } = useListCourses();
  const { data: enrollments } = useMyEnrollments();
  const { data: mentorBookings } = useMyMentorBookings();

  const enrollMutation = useEnrollInCourse();
  const updateProgressMutation = useUpdateCourseProgress();
  const completeCourseMutation = useCompleteCourse();
  const bookMentorMutation = useBookMentor();
  const cancelBookingMutation = useCancelMentorBooking();

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [lessonCourse, setLessonCourse] = useState<Course | null>(null);
  const [certCourse, setCertCourse] = useState<string | null>(null);
  const [bookingMentor, setBookingMentor] = useState<
    (typeof MOCK_MENTORS)[0] | null
  >(null);

  const displayCourses = courses?.length ? courses : SAMPLE_COURSES;
  const enrolledMap = new Map(
    (enrollments ?? []).map((e) => [String(e.courseId), e]),
  );

  const filteredCourses = displayCourses.filter((c) => {
    if (activeFilter === "all") return true;
    const cats = CATEGORY_FILTER_MAP[activeFilter] ?? [];
    return cats.includes(String(c.category) as CourseCategory);
  });

  const requireAuth = () => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return false;
    }
    return true;
  };

  const handleEnroll = async (courseId: bigint) => {
    if (!requireAuth()) return;
    try {
      await enrollMutation.mutateAsync(courseId);
      toast.success("Enrolled successfully!");
    } catch {
      toast.error("Enrollment failed. Try again.");
    }
  };

  const handleMarkComplete = async (enrollmentId: bigint, current: number) => {
    const next = Math.min(100, current + 25);
    try {
      await updateProgressMutation.mutateAsync({
        enrollmentId,
        progressPct: BigInt(next),
      });
      toast.success(`Progress updated to ${next}%`);
    } catch {
      toast.error("Failed to update progress.");
    }
  };

  const handleCompleteCourse = async (
    enrollmentId: bigint,
    courseName: string,
  ) => {
    try {
      await completeCourseMutation.mutateAsync(enrollmentId);
      setLessonCourse(null);
      setCertCourse(courseName);
    } catch {
      toast.error("Failed to complete course.");
    }
  };

  const handleBookMentor = async (
    mentor: (typeof MOCK_MENTORS)[0],
    date: string,
    slot: string,
    topic: string,
  ) => {
    if (!requireAuth()) return;
    const scheduledMs = new Date(`${date} ${slot}`).getTime();
    try {
      await bookMentorMutation.mutateAsync({
        instructorId: mentor.id as unknown as Principal,
        scheduledAt: BigInt(scheduledMs * 1_000_000),
        durationMinutes: 60n,
        notes: topic,
      });
      setBookingMentor(null);
      toast.success("Session booked successfully!");
    } catch {
      toast.error("Booking failed. Try again.");
    }
  };

  const handleCancelBooking = async (bookingId: bigint) => {
    try {
      await cancelBookingMutation.mutateAsync(bookingId);
      toast.success("Booking cancelled.");
    } catch {
      toast.error("Failed to cancel booking.");
    }
  };

  const heroContent = (
    <div className="grid grid-cols-2 gap-3">
      {[
        { value: "50+", label: "Courses" },
        { value: "30+", label: "Masters" },
        { value: "500+", label: "Students" },
        { value: "10+", label: "Certifications" },
      ].map((stat) => (
        <div
          key={stat.label}
          className="glass-saffron border border-[oklch(0.75_0.18_65/0.3)] rounded-xl px-4 py-3 text-center"
        >
          <p className="font-display text-xl gradient-text-saffron">
            {stat.value}
          </p>
          <p className="text-xs text-[oklch(0.88_0.10_65)]">{stat.label}</p>
        </div>
      ))}
    </div>
  );

  return (
    <ModuleLayout
      title="Digital Gurukul"
      subtitle="Learn from verified cultural masters through live classes, certifications, and mentor bookings in dance, music, martial arts, and more."
      icon={Music}
      accent="saffron"
      badge="Verified Masters"
      onNavigateHome={onNavigateHome}
      onNavigate={onNavigate}
      heroContent={heroContent}
    >
      <Tabs defaultValue="courses" className="space-y-8">
        <TabsList
          data-ocid="gurukul.main_tabs"
          className="glass border border-border/30 h-auto p-1 gap-1 flex-wrap"
        >
          <TabsTrigger
            data-ocid="gurukul.courses_tab"
            value="courses"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]"
          >
            <BookOpen className="w-4 h-4 mr-1.5" /> Courses
          </TabsTrigger>
          <TabsTrigger
            data-ocid="gurukul.my_learning_tab"
            value="my-learning"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]"
          >
            <Play className="w-4 h-4 mr-1.5" /> My Learning
            {(enrollments?.length ?? 0) > 0 && (
              <Badge className="ml-1.5 bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] border-0 text-[10px]">
                {enrollments?.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            data-ocid="gurukul.mentors_tab"
            value="mentors"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]"
          >
            <User className="w-4 h-4 mr-1.5" /> Mentors
          </TabsTrigger>
          <TabsTrigger
            data-ocid="gurukul.my_bookings_tab"
            value="my-bookings"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]"
          >
            <Calendar className="w-4 h-4 mr-1.5" /> My Bookings
            {(mentorBookings?.length ?? 0) > 0 && (
              <Badge className="ml-1.5 bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] border-0 text-[10px]">
                {mentorBookings?.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── COURSES TAB ── */}
        <TabsContent value="courses" className="space-y-6">
          {/* Category Filter */}
          <ScrollArea className="w-full">
            <div
              data-ocid="gurukul.category_filter"
              className="flex gap-2 pb-2"
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  data-ocid={`gurukul.filter.${tab.value}`}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 border ${
                    activeFilter === tab.value
                      ? "bg-[oklch(0.75_0.18_65)] text-[oklch(0.12_0.06_60)] border-[oklch(0.75_0.18_65)]"
                      : "glass border-border/30 text-muted-foreground hover:text-foreground hover:border-[oklch(0.75_0.18_65/0.3)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Course Grid */}
          {isLoading ? (
            <div
              data-ocid="gurukul.loading_state"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div
              data-ocid="gurukul.empty_state"
              className="flex flex-col items-center gap-4 py-16 text-center"
            >
              <BookOpen className="w-12 h-12 text-[oklch(0.75_0.18_65)] opacity-40" />
              <p className="text-muted-foreground">
                No courses in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course, i) => {
                const enrollment = enrolledMap.get(String(course.id));
                const isEnrolled = !!enrollment;
                const price = Number(course.price);
                const displayPrice =
                  price === 0 ? "Free" : `₹${(price / 100).toLocaleString()}`;
                const mockRating = 4.5 + (Number(course.id) % 6) * 0.1;

                return (
                  <motion.div
                    key={String(course.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    data-ocid={`gurukul.course.${i + 1}`}
                    className="glass border border-border/40 rounded-2xl overflow-hidden card-hover group flex flex-col cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <CourseGradient category={String(course.category)} />

                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {course.isLive && (
                              <Badge className="text-[10px] bg-[oklch(0.62_0.20_25/0.2)] text-[oklch(0.80_0.14_25)] border-0 animate-pulse flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[oklch(0.80_0.14_25)] rounded-full animate-pulse" />
                                LIVE
                              </Badge>
                            )}
                            <Badge className="text-[10px] bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.88_0.10_65)] border-0 capitalize">
                              {String(course.category)}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-sm text-foreground leading-tight group-hover:text-[oklch(0.75_0.18_65)] transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            by {course.instructorName}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {course.description}
                      </p>

                      <StarRating rating={Number(mockRating.toFixed(1))} />

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{" "}
                          {Number(course.durationMinutes)} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />{" "}
                          {Number(course.maxParticipants)} seats
                        </span>
                      </div>

                      {isEnrolled && enrollment && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="text-[oklch(0.75_0.18_65)] font-semibold">
                              {Number(enrollment.progressPct)}%
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)]"
                              style={{
                                width: `${Number(enrollment.progressPct)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <div
                        className="flex items-center justify-between mt-auto pt-2 border-t border-border/30"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        role="presentation"
                      >
                        <span className="font-bold text-foreground text-sm">
                          {displayPrice}
                        </span>
                        {isEnrolled && enrollment ? (
                          <Button
                            size="sm"
                            data-ocid={`gurukul.continue_button.${i + 1}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLessonCourse(course);
                            }}
                            className="text-xs gap-1.5 bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.88_0.10_65)] hover:bg-[oklch(0.75_0.18_65/0.25)] border-0"
                          >
                            <Play className="w-3 h-3" /> Continue
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            data-ocid={`gurukul.enroll_button.${i + 1}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEnroll(course.id);
                            }}
                            disabled={enrollMutation.isPending}
                            className="text-xs gap-1.5 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0"
                          >
                            <Play className="w-3 h-3" /> Enroll Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── MY LEARNING TAB ── */}
        <TabsContent value="my-learning" className="space-y-5">
          {!isAuthenticated ? (
            <div
              data-ocid="gurukul.my_learning.empty_state"
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              <BookOpen className="w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" />
              <div>
                <p className="font-display text-xl gradient-text-saffron mb-2">
                  Sign in to access your courses
                </p>
                <p className="text-muted-foreground text-sm">
                  Track your progress and continue your cultural mastery journey
                </p>
              </div>
              <Button
                data-ocid="gurukul.my_learning.signin_button"
                onClick={() => onNavigate("signup")}
                className="bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0"
              >
                Sign In to Continue
              </Button>
            </div>
          ) : (enrollments ?? []).length === 0 ? (
            <div
              data-ocid="gurukul.enrollments.empty_state"
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              <BookOpen className="w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" />
              <div>
                <p className="font-display text-xl gradient-text-saffron mb-2">
                  No enrolled courses yet
                </p>
                <p className="text-muted-foreground text-sm">
                  Browse the catalog and enroll to start your journey
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(enrollments ?? []).map((enrollment, i) => {
                const course = displayCourses.find(
                  (c) => String(c.id) === String(enrollment.courseId),
                );
                const progress = Number(enrollment.progressPct);
                const name =
                  course?.title ?? `Course #${String(enrollment.courseId)}`;

                return (
                  <motion.div
                    key={String(enrollment.id)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    data-ocid={`gurukul.enrollment.${i + 1}`}
                    className="glass border border-border/40 rounded-2xl p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.75_0.18_65/0.15)] flex items-center justify-center text-2xl flex-shrink-0">
                        {categoryEmojis[
                          (course?.category as unknown as CourseCategory) ??
                            "dance"
                        ] ?? "🎓"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground truncate">
                          {name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {course?.instructorName ?? "Master Instructor"}
                        </p>
                        {enrollment.certified && (
                          <Badge className="mt-1 text-[10px] bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] border-0">
                            <Award className="w-2.5 h-2.5 mr-1" /> Certified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-bold text-[oklch(0.75_0.18_65)]">
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        data-ocid={`gurukul.continue_learning_button.${i + 1}`}
                        onClick={() => course && setLessonCourse(course)}
                        disabled={!course}
                        className="flex-1 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-1.5 text-xs"
                      >
                        <Play className="w-3 h-3" /> Continue Learning
                      </Button>
                      {progress >= 100 && !enrollment.certified && (
                        <Button
                          size="sm"
                          data-ocid={`gurukul.claim_cert_button.${i + 1}`}
                          onClick={() =>
                            handleCompleteCourse(enrollment.id, name)
                          }
                          disabled={completeCourseMutation.isPending}
                          className="gap-1.5 text-xs bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)] text-[oklch(0.12_0.06_60)] border-0"
                        >
                          <Award className="w-3 h-3" /> Certify
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── MENTORS TAB ── */}
        <TabsContent value="mentors" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_MENTORS.map((mentor, i) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`gurukul.mentor.${i + 1}`}
                className="glass border border-border/40 rounded-2xl p-5 flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[oklch(0.75_0.18_65/0.15)] flex items-center justify-center text-3xl flex-shrink-0">
                    {mentor.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {mentor.specialty}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <StarRating rating={mentor.rating} />
                      <span className="text-xs text-muted-foreground">
                        {mentor.sessions} sessions
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Available slots:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.slots.map((slot) => (
                      <span
                        key={slot}
                        className="px-2.5 py-1 rounded-lg text-xs bg-[oklch(0.75_0.18_65/0.1)] text-[oklch(0.75_0.18_65)] border border-[oklch(0.75_0.18_65/0.2)]"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  data-ocid={`gurukul.book_session_button.${i + 1}`}
                  onClick={() => {
                    if (!requireAuth()) return;
                    setBookingMentor(mentor);
                  }}
                  className="w-full bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book a Session
                </Button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* ── MY BOOKINGS TAB ── */}
        <TabsContent value="my-bookings" className="space-y-5">
          {!isAuthenticated ? (
            <div
              data-ocid="gurukul.bookings.empty_state"
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              <Calendar className="w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" />
              <div>
                <p className="font-display text-xl gradient-text-saffron mb-2">
                  Sign in to view your bookings
                </p>
                <p className="text-muted-foreground text-sm">
                  Manage your mentor sessions in one place
                </p>
              </div>
              <Button
                data-ocid="gurukul.bookings.signin_button"
                onClick={() => onNavigate("signup")}
                className="bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0"
              >
                Sign In
              </Button>
            </div>
          ) : (mentorBookings ?? []).length === 0 ? (
            <div
              data-ocid="gurukul.bookings.empty_state"
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              <Calendar className="w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" />
              <div>
                <p className="font-display text-xl gradient-text-saffron mb-2">
                  No bookings yet
                </p>
                <p className="text-muted-foreground text-sm">
                  Book a session with one of our verified masters
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {(mentorBookings ?? []).map((booking: MentorBooking, i) => {
                const scheduledDate = new Date(
                  Number(booking.scheduledAt) / 1_000_000,
                );
                const isCancelled = booking.status === "cancelled";
                return (
                  <motion.div
                    key={String(booking.id)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    data-ocid={`gurukul.booking.${i + 1}`}
                    className={`glass border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${isCancelled ? "border-border/20 opacity-60" : "border-border/40"}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge
                          className={`text-[10px] border-0 ${
                            booking.status === "confirmed"
                              ? "bg-[oklch(0.62_0.20_150/0.2)] text-[oklch(0.70_0.16_150)]"
                              : booking.status === "cancelled"
                                ? "bg-muted text-muted-foreground"
                                : "bg-[oklch(0.72_0.20_80/0.2)] text-[oklch(0.80_0.14_80)]"
                          }`}
                        >
                          {booking.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {Number(booking.durationMinutes)} min session
                        </span>
                      </div>
                      <p className="font-semibold text-sm text-foreground">
                        {scheduledDate.toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {scheduledDate.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {booking.notes && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          Topic: {booking.notes}
                        </p>
                      )}
                    </div>
                    {!isCancelled && (
                      <Button
                        size="sm"
                        variant="outline"
                        data-ocid={`gurukul.cancel_booking_button.${i + 1}`}
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancelBookingMutation.isPending}
                        className="border-[oklch(0.62_0.20_25/0.3)] text-[oklch(0.62_0.20_25)] hover:bg-[oklch(0.62_0.20_25/0.1)] flex-shrink-0 text-xs"
                      >
                        Cancel
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailModal
            course={selectedCourse}
            isEnrolled={enrolledMap.has(String(selectedCourse.id))}
            onClose={() => setSelectedCourse(null)}
            onEnroll={() => {
              handleEnroll(selectedCourse.id);
              setSelectedCourse(null);
            }}
            enrolling={enrollMutation.isPending}
          />
        )}

        {lessonCourse &&
          (() => {
            const enrollment = enrolledMap.get(String(lessonCourse.id));
            if (!enrollment) return null;
            return (
              <LessonPlayerModal
                course={lessonCourse}
                enrollment={enrollment}
                onClose={() => setLessonCourse(null)}
                onMarkComplete={() =>
                  handleMarkComplete(
                    enrollment.id,
                    Number(enrollment.progressPct),
                  )
                }
                onCompleteCourse={() =>
                  handleCompleteCourse(enrollment.id, lessonCourse.title)
                }
                updating={updateProgressMutation.isPending}
                completing={completeCourseMutation.isPending}
              />
            );
          })()}

        {certCourse && (
          <CertificateModal
            courseName={certCourse}
            onClose={() => setCertCourse(null)}
          />
        )}

        {bookingMentor && (
          <MentorBookingModal
            mentor={bookingMentor}
            onClose={() => setBookingMentor(null)}
            onBook={(date, slot, topic) =>
              handleBookMentor(bookingMentor, date, slot, topic)
            }
            booking={bookMentorMutation.isPending}
          />
        )}
      </AnimatePresence>
    </ModuleLayout>
  );
}
