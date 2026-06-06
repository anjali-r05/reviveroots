import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ARCapture {
    id: string;
    title: string;
    imageData: string;
    userId: UserId;
    description: string;
    timestamp: Timestamp;
    sceneId: string;
}
export interface MentorBooking {
    id: ItemId;
    status: string;
    userId: UserId;
    createdAt: Timestamp;
    instructorId: UserId;
    durationMinutes: bigint;
    notes: string;
    scheduledAt: Timestamp;
}
export type Timestamp = bigint;
export interface HeritageProfile {
    region: string;
    foods: Array<string>;
    familyBackground: string;
    userId: UserId;
    createdAt: Timestamp;
    migrationStory: string;
    surname: string;
    festivals: Array<string>;
    ancestryInsights: string;
    language: string;
    updatedAt: Timestamp;
    grandparentsOrigin: string;
    traditionalOccupations: Array<string>;
    forgottenCustoms: Array<string>;
}
export interface Enrollment {
    id: ItemId;
    completedAt?: Timestamp;
    userId: UserId;
    enrolledAt: Timestamp;
    certified: boolean;
    courseId: ItemId;
    progressPct: bigint;
}
export interface UserActivitySummary {
    storiesSaved: bigint;
    arCaptures: bigint;
    languageLessons: bigint;
    coursesEnrolled: bigint;
    ordersPlaced: bigint;
    festivalPlans: bigint;
    heritageScans: bigint;
}
export interface Course {
    id: ItemId;
    title: string;
    createdAt: Timestamp;
    description: string;
    isLive: boolean;
    instructorId: UserId;
    imageUrl: string;
    durationMinutes: bigint;
    category: CourseCategory;
    maxParticipants: bigint;
    price: bigint;
    instructorName: string;
    scheduledAt?: Timestamp;
}
export interface StoryItem {
    id: ItemId;
    title: string;
    yearApprox?: bigint;
    userId: UserId;
    createdAt: Timestamp;
    tags: Array<string>;
    description: string;
    peopleTagged: Array<string>;
    updatedAt: Timestamp;
    fileId: string;
    narration: string;
    mediaType: MediaType;
}
export type ItemId = bigint;
export interface LanguageProgress {
    wordsLearned: bigint;
    startedAt: Timestamp;
    userId: UserId;
    lastActiveAt: Timestamp;
    totalLessonsCompleted: bigint;
    conversationLevel: string;
    streakDays: bigint;
    currentLesson: bigint;
    scriptsLearned: Array<string>;
    languageChosen: string;
    pronunciationScore: bigint;
}
export interface UserTraditionPrefs {
    heritageLanguages: Array<string>;
    savedItemIds: Array<ItemId>;
    userId: UserId;
    heritageRegions: Array<string>;
    updatedAt: Timestamp;
}
export interface TraditionItem {
    id: ItemId;
    region: string;
    title: string;
    createdAt: Timestamp;
    tags: Array<string>;
    languages: Array<string>;
    description: string;
    steps: Array<string>;
    imageUrl: string;
    category: TraditionCategory;
}
export interface FestivalPlan {
    id: ItemId;
    reminderAt?: Timestamp;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    festivalId: ItemId;
    notes: string;
    familyParticipants: Array<string>;
}
export interface SellerStats {
    totalOrders: bigint;
    totalListings: bigint;
    sellerId: UserId;
    rating: bigint;
    totalRevenue: bigint;
}
export interface Listing {
    id: ItemId;
    region: string;
    title: string;
    imageUrls: Array<string>;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    updatedAt: Timestamp;
    stock: bigint;
    category: ProductCategory;
    sellerId: UserId;
    price: bigint;
}
export interface FamilyTreeNode {
    era: string;
    region: string;
    relation: string;
    name: string;
}
export interface Festival {
    id: ItemId;
    region: string;
    celebrationGuide: string;
    recipes: Array<string>;
    meaning: string;
    date: string;
    name: string;
    createdAt: Timestamp;
    languages: Array<string>;
    description: string;
    imageUrl: string;
    clothingSuggestions: Array<string>;
    rituals: Array<string>;
}
export interface FamilyTimeline {
    title: string;
    userId: UserId;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    itemIds: Array<ItemId>;
}
export interface Order {
    id: ItemId;
    status: OrderStatus;
    listingId: ItemId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    buyerId: UserId;
    quantity: bigint;
    shippingAddress: string;
    sellerId: UserId;
    stripeSessionId: string;
    totalPrice: bigint;
}
export interface AncestryInsights {
    foods: Array<string>;
    migrationStory: string;
    festivals: Array<string>;
    familyTreeNodes: Array<FamilyTreeNode>;
    traditionalOccupations: Array<string>;
    forgottenCustoms: Array<string>;
}
export type UserId = Principal;
export interface UserProfileInput {
    fullName: string;
    languageInterests: Array<string>;
    heritageRegion: string;
    email: string;
}
export interface UserProfile {
    lastLoginAt: Timestamp;
    createdAt: Timestamp;
    fullName: string;
    languageInterests: Array<string>;
    heritageRegion: string;
    email: string;
    principalId: UserId;
}
export interface DailyLesson {
    id: ItemId;
    title: string;
    content: string;
    lessonNumber: bigint;
    createdAt: Timestamp;
    audioUrl: string;
    language: string;
    practiceWords: Array<string>;
}
export enum CourseCategory {
    music = "music",
    yoga = "yoga",
    cooking = "cooking",
    pottery = "pottery",
    martialArts = "martialArts",
    regionalArts = "regionalArts",
    dance = "dance",
    weaving = "weaving",
    calligraphy = "calligraphy"
}
export enum MediaType {
    voiceNote = "voiceNote",
    video = "video",
    letter = "letter",
    handwrittenNote = "handwrittenNote",
    photo = "photo"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    delivered = "delivered"
}
export enum ProductCategory {
    art = "art",
    artisanProduct = "artisanProduct",
    book = "book",
    instrument = "instrument",
    craft = "craft",
    jewelry = "jewelry",
    textile = "textile"
}
export enum TraditionCategory {
    clothing = "clothing",
    custom = "custom",
    ritual = "ritual",
    spiritualPractice = "spiritualPractice",
    folkSong = "folkSong",
    dance = "dance",
    celebration = "celebration",
    recipe = "recipe"
}
export interface backendInterface {
    addCourse(title: string, description: string, category: CourseCategory, instructorName: string, price: bigint, durationMinutes: bigint, isLive: boolean, scheduledAt: Timestamp | null, maxParticipants: bigint, imageUrl: string): Promise<Course>;
    addFamilyMember(planId: ItemId, member: string): Promise<boolean>;
    addFestival(name: string, description: string, meaning: string, rituals: Array<string>, celebrationGuide: string, recipes: Array<string>, clothingSuggestions: Array<string>, date: string, region: string, languages: Array<string>, imageUrl: string): Promise<Festival>;
    addLesson(language: string, title: string, content: string, audioUrl: string, practiceWords: Array<string>): Promise<DailyLesson>;
    addListing(title: string, description: string, price: bigint, category: ProductCategory, imageUrls: Array<string>, stock: bigint, region: string): Promise<Listing>;
    addStoryItem(title: string, description: string, mediaType: MediaType, fileId: string, tags: Array<string>, peopleTagged: Array<string>, yearApprox: bigint | null, narration: string): Promise<StoryItem>;
    addTradition(title: string, description: string, category: TraditionCategory, region: string, languages: Array<string>, imageUrl: string, steps: Array<string>, tags: Array<string>): Promise<TraditionItem>;
    bookMentor(instructorId: UserId, scheduledAt: Timestamp, durationMinutes: bigint, notes: string): Promise<MentorBooking>;
    cancelMentorBooking(bookingId: ItemId): Promise<boolean>;
    completeCourse(enrollmentId: ItemId): Promise<Enrollment | null>;
    completeLesson(lessonId: ItemId, score: bigint): Promise<LanguageProgress | null>;
    createFestivalPlan(festivalId: ItemId, reminderAt: Timestamp | null, familyParticipants: Array<string>, notes: string): Promise<FestivalPlan>;
    createOrder(listingId: ItemId, sellerId: UserId, quantity: bigint, totalPrice: bigint, stripeSessionId: string, shippingAddress: string): Promise<Order>;
    deleteARCapture(id: string): Promise<boolean>;
    deleteFestivalPlan(planId: ItemId): Promise<boolean>;
    deleteHeritageProfile(): Promise<boolean>;
    deleteListing(id: ItemId): Promise<boolean>;
    deleteStoryItem(id: ItemId): Promise<boolean>;
    enrollInCourse(courseId: ItemId): Promise<Enrollment>;
    filterFestivalsByRegion(region: string): Promise<Array<Festival>>;
    filterTraditionsByRegion(region: string): Promise<Array<TraditionItem>>;
    filterTraditionsByType(traditionType: string): Promise<Array<TraditionItem>>;
    generateAncestryInsights(surname: string, region: string, language: string, familyBackground: string, grandparentsOrigin: string): Promise<AncestryInsights>;
    generateNarrative(itemId: ItemId): Promise<string | null>;
    getARCaptures(): Promise<Array<ARCapture>>;
    getCourse(id: ItemId): Promise<Course | null>;
    getFestival(id: ItemId): Promise<Festival | null>;
    getHeritageProfile(): Promise<HeritageProfile | null>;
    getLanguageProgress(): Promise<LanguageProgress | null>;
    getLesson(id: ItemId): Promise<DailyLesson | null>;
    getLessonsByLanguage(language: string): Promise<Array<DailyLesson>>;
    getListing(id: ItemId): Promise<Listing | null>;
    getMyBuyerOrders(): Promise<Array<Order>>;
    getMyEnrollments(): Promise<Array<Enrollment>>;
    getMyFamilyTimeline(): Promise<FamilyTimeline | null>;
    getMyFestivalPlans(): Promise<Array<FestivalPlan>>;
    getMyListings(): Promise<Array<Listing>>;
    getMyMentorBookings(): Promise<Array<MentorBooking>>;
    getMySellerOrders(): Promise<Array<Order>>;
    getMySellerStats(): Promise<SellerStats>;
    getMyStoryItems(): Promise<Array<StoryItem>>;
    getMyTraditionPrefs(): Promise<UserTraditionPrefs | null>;
    getPersonalizedFestivals(regions: Array<string>, languages: Array<string>): Promise<Array<Festival>>;
    getRecommendedTraditions(): Promise<Array<TraditionItem>>;
    getStoryItem(id: ItemId): Promise<StoryItem | null>;
    getTradition(id: ItemId): Promise<TraditionItem | null>;
    getUserActivitySummary(): Promise<{
        __kind__: "ok";
        ok: UserActivitySummary;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getUserProfile(): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listActiveListings(): Promise<Array<Listing>>;
    listCourses(): Promise<Array<Course>>;
    listCoursesByCategory(category: string): Promise<Array<Course>>;
    listFestivals(): Promise<Array<Festival>>;
    listTraditions(): Promise<Array<TraditionItem>>;
    listingsByCategory(category: string): Promise<Array<Listing>>;
    removeFamilyMember(planId: ItemId, member: string): Promise<boolean>;
    saveARCapture(sceneId: string, imageData: string, title: string): Promise<ARCapture>;
    saveHeritageProfile(surname: string, region: string, language: string, familyBackground: string, grandparentsOrigin: string, ancestryInsights: string, migrationStory: string, forgottenCustoms: Array<string>, traditionalOccupations: Array<string>, festivals: Array<string>, foods: Array<string>): Promise<HeritageProfile>;
    saveTraditionItem(itemId: ItemId): Promise<boolean>;
    saveUserProfile(input: UserProfileInput): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setTraditionPrefs(heritageRegions: Array<string>, heritageLanguages: Array<string>): Promise<UserTraditionPrefs>;
    startLanguage(languageChosen: string): Promise<LanguageProgress>;
    unsaveTraditionItem(itemId: ItemId): Promise<boolean>;
    updateCourseProgress(enrollmentId: ItemId, progressPct: bigint): Promise<Enrollment | null>;
    updateFestivalPlan(planId: ItemId, reminderAt: Timestamp | null, familyParticipants: Array<string>, notes: string): Promise<FestivalPlan | null>;
    updateLanguageProgress(currentLesson: bigint, streakDays: bigint, wordsLearned: bigint, pronunciationScore: bigint, conversationLevel: string, scriptsLearned: Array<string>): Promise<LanguageProgress | null>;
    updateLastLogin(): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateListing(id: ItemId, title: string, description: string, price: bigint, stock: bigint, isActive: boolean): Promise<Listing | null>;
    updateOrderStatus(orderId: ItemId, status: OrderStatus): Promise<Order | null>;
    updateStoryItem(id: ItemId, title: string, description: string, tags: Array<string>, narration: string): Promise<StoryItem | null>;
    upsertFamilyTimeline(title: string, description: string, itemIds: Array<ItemId>): Promise<FamilyTimeline>;
}
