// ─── Existing Types ──────────────────────────────────────────────────────────

export interface HeritageCategory {
  id: string;
  label: string;
  icon: string;
  count: number;
  description: string;
  color: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  location: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
  likes: number;
}

export interface Artist {
  id: string;
  name: string;
  craft: string;
  location: string;
  image: string;
  bio: string;
  speciality: string;
  products: ArtistProduct[];
  rating: number;
  sales: number;
}

export interface ArtistProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Champion {
  id: string;
  name: string;
  avatar: string;
  location: string;
  contributions: number;
  storiesAdded: number;
  badge: ChampionBadge;
  joinDate: string;
}

export type ChampionBadge =
  | "gold"
  | "silver"
  | "bronze"
  | "heritage-keeper"
  | "revival-master";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  quote: string;
  role: string;
  rating: number;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface AIVideo {
  title: string;
  youtubeId: string;
  description: string;
  duration: string;
}

export interface AIResponse {
  tradition: string;
  tags: string[];
  background: string;
  decline: string;
  revivalStrategy: string;
  tourismOpportunities: string;
  videos: AIVideo[];
}

// ─── Heritage Scanner Module ─────────────────────────────────────────────────

export interface HeritageScanInput {
  surname: string;
  region: string;
  language: string;
  familyBackground: string;
  grandparentsOrigin: string;
}

export interface HeritageScanResult {
  surname: string;
  region: string;
  language: string;
  familyBackground: string;
  grandparentsOrigin: string;
  ancestryInsights: string;
  migrationStory: string;
  forgottenCustoms: string[];
  traditionalOccupations: string[];
  festivals: string[];
  foods: string[];
}

// ─── Language Revival Module ──────────────────────────────────────────────────

export interface LanguageLesson {
  id: bigint;
  language: string;
  title: string;
  content: string;
  audioUrl: string;
  practiceWords: string[];
  lessonNumber: bigint;
  createdAt: bigint;
}

export interface LanguageProgress {
  languageChosen: string;
  currentLesson: bigint;
  streakDays: bigint;
  wordsLearned: bigint;
  pronunciationScore: bigint;
  conversationLevel: string;
  scriptsLearned: string[];
  startedAt: bigint;
  lastActiveAt: bigint;
}

// ─── Storykeeper Module ───────────────────────────────────────────────────────

export interface StoryItem {
  id: bigint;
  title: string;
  description: string;
  mediaType: MediaType;
  fileId: string;
  tags: string[];
  peopleTagged: string[];
  yearApprox?: bigint;
  narration: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export type MediaType =
  | "photo"
  | "video"
  | "letter"
  | "handwrittenNote"
  | "voiceNote";

export interface FamilyTimeline {
  title: string;
  description: string;
  itemIds: bigint[];
  createdAt: bigint;
  updatedAt: bigint;
}

// ─── Traditions Module ────────────────────────────────────────────────────────

export type TraditionCategory =
  | "recipe"
  | "ritual"
  | "folkSong"
  | "dance"
  | "celebration"
  | "clothing"
  | "custom"
  | "spiritualPractice";

export interface Tradition {
  id: bigint;
  title: string;
  description: string;
  category: TraditionCategory;
  region: string;
  languages: string[];
  imageUrl: string;
  steps: string[];
  tags: string[];
  createdAt: bigint;
}

export interface TraditionPrefs {
  heritageRegions: string[];
  heritageLanguages: string[];
  savedItemIds: bigint[];
  updatedAt: bigint;
}

// ─── Gurukul Module ───────────────────────────────────────────────────────────

export type CourseCategory =
  | "dance"
  | "music"
  | "pottery"
  | "weaving"
  | "yoga"
  | "calligraphy"
  | "cooking"
  | "martialArts"
  | "regionalArts";

export interface GurukulCourse {
  id: bigint;
  title: string;
  description: string;
  category: CourseCategory;
  instructorName: string;
  instructorId: string;
  price: bigint;
  durationMinutes: bigint;
  isLive: boolean;
  scheduledAt?: bigint;
  maxParticipants: bigint;
  imageUrl: string;
  createdAt: bigint;
}

export interface GurukulEnrollment {
  id: bigint;
  courseId: bigint;
  enrolledAt: bigint;
  progressPct: bigint;
  certified: boolean;
  completedAt?: bigint;
}

export interface MentorBooking {
  id: bigint;
  instructorId: string;
  scheduledAt: bigint;
  durationMinutes: bigint;
  notes: string;
  status: string;
  createdAt: bigint;
}

// ─── Marketplace Module ───────────────────────────────────────────────────────

export type ProductCategory =
  | "craft"
  | "textile"
  | "art"
  | "jewelry"
  | "instrument"
  | "book"
  | "artisanProduct";

export interface MarketplaceListing {
  id: bigint;
  title: string;
  description: string;
  price: bigint;
  category: ProductCategory;
  imageUrls: string[];
  stock: bigint;
  region: string;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface MarketplaceOrder {
  id: bigint;
  listingId: bigint;
  buyerId: string;
  sellerId: string;
  quantity: bigint;
  totalPrice: bigint;
  shippingAddress: string;
  status: OrderStatus;
  stripeSessionId: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface SellerStats {
  totalListings: bigint;
  totalOrders: bigint;
  totalRevenue: bigint;
  rating: bigint;
}

// ─── Festival Planner Module ──────────────────────────────────────────────────

export interface Festival {
  id: bigint;
  name: string;
  description: string;
  meaning: string;
  rituals: string[];
  celebrationGuide: string;
  recipes: string[];
  clothingSuggestions: string[];
  date: string;
  region: string;
  languages: string[];
  imageUrl: string;
  createdAt: bigint;
}

export interface FestivalPlan {
  id: bigint;
  festivalId: bigint;
  reminderAt?: bigint;
  familyParticipants: string[];
  notes: string;
  createdAt: bigint;
  updatedAt: bigint;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type AppRoute =
  | "home"
  | "signup"
  | "login"
  | "forgot-password"
  | "dashboard"
  | "profile"
  | "heritage-scanner"
  | "language-revival"
  | "ar-time-travel"
  | "storykeeper"
  | "traditions"
  | "gurukul"
  | "marketplace"
  | "festival-planner";
