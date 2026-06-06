import { createActor } from "@/backend";
import type { MediaType, OrderStatus, ProductCategory } from "@/types/index";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Import backend types
import type {
  AncestryInsights,
  Course,
  DailyLesson,
  Enrollment,
  FamilyTimeline,
  FamilyTreeNode,
  Festival,
  FestivalPlan,
  HeritageProfile,
  ItemId,
  LanguageProgress,
  Listing,
  MentorBooking,
  Order,
  SellerStats,
  StoryItem,
  Timestamp,
  TraditionItem,
  UserActivitySummary,
  UserId,
  UserProfile,
  UserProfileInput,
  UserTraditionPrefs,
} from "@/backend.d.ts";

export function useBackend() {
  const { actor } = useActor(createActor);
  return actor;
}

// ─── Heritage Scanner ─────────────────────────────────────────────────────────

export function useGenerateAncestryInsights() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (params: {
      surname: string;
      region: string;
      language: string;
      familyBackground: string;
      grandparentsOrigin: string;
    }): Promise<AncestryInsights> => {
      if (!actor) throw new Error("Not connected");
      return actor.generateAncestryInsights(
        params.surname,
        params.region,
        params.language,
        params.familyBackground,
        params.grandparentsOrigin,
      );
    },
  });
}

export function useHeritageProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HeritageProfile | null>({
    queryKey: ["heritageProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHeritageProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveHeritageProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
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
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveHeritageProfile(
        params.surname,
        params.region,
        params.language,
        params.familyBackground,
        params.grandparentsOrigin,
        params.ancestryInsights,
        params.migrationStory,
        params.forgottenCustoms,
        params.traditionalOccupations,
        params.festivals,
        params.foods,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["heritageProfile"] }),
  });
}

export function useDeleteHeritageProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteHeritageProfile();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["heritageProfile"] }),
  });
}

// ─── Language Revival ─────────────────────────────────────────────────────────

export function useLanguageProgress() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LanguageProgress | null>({
    queryKey: ["languageProgress"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLanguageProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLessonsByLanguage(language: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DailyLesson[]>({
    queryKey: ["lessons", language],
    queryFn: async () => {
      if (!actor || !language) return [];
      return actor.getLessonsByLanguage(language);
    },
    enabled: !!actor && !isFetching && !!language,
  });
}

export function useLesson(id: ItemId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DailyLesson | null>({
    queryKey: ["lesson", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getLesson(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useStartLanguage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (languageChosen: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.startLanguage(languageChosen);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["languageProgress"] }),
  });
}

export function useUpdateLanguageProgress() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      currentLesson: bigint;
      streakDays: bigint;
      wordsLearned: bigint;
      pronunciationScore: bigint;
      conversationLevel: string;
      scriptsLearned: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateLanguageProgress(
        params.currentLesson,
        params.streakDays,
        params.wordsLearned,
        params.pronunciationScore,
        params.conversationLevel,
        params.scriptsLearned,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["languageProgress"] }),
  });
}

export function useCompleteLesson() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { lessonId: ItemId; score: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.completeLesson(params.lessonId, params.score);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["languageProgress"] });
    },
  });
}

export function useAddLesson() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      language: string;
      title: string;
      content: string;
      audioUrl: string;
      practiceWords: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addLesson(
        params.language,
        params.title,
        params.content,
        params.audioUrl,
        params.practiceWords,
      );
    },
    onSuccess: (_data, vars) =>
      qc.invalidateQueries({ queryKey: ["lessons", vars.language] }),
  });
}

// ─── Storykeeper ──────────────────────────────────────────────────────────────

export function useMyStoryItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StoryItem[]>({
    queryKey: ["storyItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyStoryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStoryItem(id: ItemId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StoryItem | null>({
    queryKey: ["storyItem", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getStoryItem(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useMyFamilyTimeline() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FamilyTimeline | null>({
    queryKey: ["familyTimeline"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyFamilyTimeline();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddStoryItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      mediaType: MediaType;
      fileId: string;
      tags: string[];
      peopleTagged: string[];
      yearApprox: bigint | null;
      narration: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addStoryItem(
        params.title,
        params.description,
        params.mediaType as import("@/backend.d.ts").MediaType,
        params.fileId,
        params.tags,
        params.peopleTagged,
        params.yearApprox,
        params.narration,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["storyItems"] }),
  });
}

export function useUpdateStoryItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: ItemId;
      title: string;
      description: string;
      tags: string[];
      narration: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateStoryItem(
        params.id,
        params.title,
        params.description,
        params.tags,
        params.narration,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["storyItems"] }),
  });
}

export function useDeleteStoryItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteStoryItem(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["storyItems"] }),
  });
}

export function useUpsertFamilyTimeline() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      itemIds: ItemId[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.upsertFamilyTimeline(
        params.title,
        params.description,
        params.itemIds,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["familyTimeline"] }),
  });
}

// ─── Traditions ───────────────────────────────────────────────────────────────

export function useListTraditions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TraditionItem[]>({
    queryKey: ["traditions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTraditions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTraditionsByRegion(region: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TraditionItem[]>({
    queryKey: ["traditions", "region", region],
    queryFn: async () => {
      if (!actor || !region) return [];
      return actor.filterTraditionsByRegion(region);
    },
    enabled: !!actor && !isFetching && !!region,
  });
}

export function useTraditionsByType(type: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TraditionItem[]>({
    queryKey: ["traditions", "type", type],
    queryFn: async () => {
      if (!actor || !type) return [];
      return actor.filterTraditionsByType(type);
    },
    enabled: !!actor && !isFetching && !!type,
  });
}

export function useRecommendedTraditions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TraditionItem[]>({
    queryKey: ["traditions", "recommended"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecommendedTraditions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyTraditionPrefs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserTraditionPrefs | null>({
    queryKey: ["traditionPrefs"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyTraditionPrefs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetTraditionPrefs() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      heritageRegions: string[];
      heritageLanguages: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.setTraditionPrefs(
        params.heritageRegions,
        params.heritageLanguages,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["traditionPrefs"] }),
  });
}

export function useSaveTraditionItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveTraditionItem(itemId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["traditionPrefs"] }),
  });
}

export function useUnsaveTraditionItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.unsaveTraditionItem(itemId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["traditionPrefs"] }),
  });
}

// ─── Gurukul ──────────────────────────────────────────────────────────────────

export function useListCourses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCourse(id: ItemId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Course | null>({
    queryKey: ["course", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCourse(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useMyEnrollments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Enrollment[]>({
    queryKey: ["enrollments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyEnrollments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyMentorBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MentorBooking[]>({
    queryKey: ["mentorBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyMentorBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEnrollInCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (courseId: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.enrollInCourse(courseId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enrollments"] }),
  });
}

export function useUpdateCourseProgress() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      enrollmentId: ItemId;
      progressPct: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateCourseProgress(
        params.enrollmentId,
        params.progressPct,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enrollments"] }),
  });
}

export function useBookMentor() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      instructorId: UserId;
      scheduledAt: Timestamp;
      durationMinutes: bigint;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookMentor(
        params.instructorId,
        params.scheduledAt,
        params.durationMinutes,
        params.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mentorBookings"] }),
  });
}

export function useCancelMentorBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelMentorBooking(bookingId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mentorBookings"] }),
  });
}

export function useCompleteCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (enrollmentId: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.completeCourse(enrollmentId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enrollments"] }),
  });
}

export function useListCoursesByCategory(category: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Course[]>({
    queryKey: ["courses", "category", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.listCoursesByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

// ─── Marketplace ──────────────────────────────────────────────────────────────

export function useActiveListings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Listing[]>({
    queryKey: ["listings", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listActiveListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyListings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Listing[]>({
    queryKey: ["listings", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListing(id: ItemId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Listing | null>({
    queryKey: ["listing", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getListing(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useMyBuyerOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders", "buyer"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyBuyerOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMySellerOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders", "seller"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySellerOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMySellerStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SellerStats | null>({
    queryKey: ["sellerStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMySellerStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddListing() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      price: bigint;
      category: ProductCategory;
      imageUrls: string[];
      stock: bigint;
      region: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addListing(
        params.title,
        params.description,
        params.price,
        params.category as import("@/backend.d.ts").ProductCategory,
        params.imageUrls,
        params.stock,
        params.region,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useUpdateListing() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: ItemId;
      title: string;
      description: string;
      price: bigint;
      stock: bigint;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateListing(
        params.id,
        params.title,
        params.description,
        params.price,
        params.stock,
        params.isActive,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useDeleteListing() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteListing(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      listingId: ItemId;
      sellerId: UserId;
      quantity: bigint;
      totalPrice: bigint;
      stripeSessionId: string;
      shippingAddress: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createOrder(
        params.listingId,
        params.sellerId,
        params.quantity,
        params.totalPrice,
        params.stripeSessionId,
        params.shippingAddress,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { orderId: ItemId; status: OrderStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(
        params.orderId,
        params.status as import("@/backend.d.ts").OrderStatus,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

// ─── Festival Planner ─────────────────────────────────────────────────────────

export function useListFestivals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Festival[]>({
    queryKey: ["festivals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFestivals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFestivalsByRegion(region: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Festival[]>({
    queryKey: ["festivals", "region", region],
    queryFn: async () => {
      if (!actor || !region) return [];
      return actor.filterFestivalsByRegion(region);
    },
    enabled: !!actor && !isFetching && !!region,
  });
}

export function useFestival(id: ItemId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Festival | null>({
    queryKey: ["festival", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getFestival(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function usePersonalizedFestivals(
  regions: string[],
  languages: string[],
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Festival[]>({
    queryKey: ["festivals", "personalized", regions, languages],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPersonalizedFestivals(regions, languages);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyFestivalPlans() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FestivalPlan[]>({
    queryKey: ["festivalPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyFestivalPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateFestivalPlan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      festivalId: ItemId;
      reminderAt: Timestamp | null;
      familyParticipants: string[];
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createFestivalPlan(
        params.festivalId,
        params.reminderAt,
        params.familyParticipants,
        params.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivalPlans"] }),
  });
}

export function useUpdateFestivalPlan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      planId: ItemId;
      reminderAt: Timestamp | null;
      familyParticipants: string[];
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFestivalPlan(
        params.planId,
        params.reminderAt,
        params.familyParticipants,
        params.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivalPlans"] }),
  });
}

export function useDeleteFestivalPlan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (planId: ItemId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFestivalPlan(planId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivalPlans"] }),
  });
}

export function useAddFamilyMember() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { planId: ItemId; member: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFamilyMember(params.planId, params.member);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivalPlans"] }),
  });
}

export function useRemoveFamilyMember() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { planId: ItemId; member: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeFamilyMember(params.planId, params.member);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivalPlans"] }),
  });
}

export function useGenerateNarrative() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (itemId: ItemId): Promise<string> => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.generateNarrative(itemId);
      return result ?? "";
    },
  });
}

// ─── AR Time Travel ───────────────────────────────────────────────────────────

export function useARCaptures() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<import("@/backend.d.ts").ARCapture[]>({
    queryKey: ["arCaptures"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getARCaptures();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveARCapture() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      sceneId: string;
      imageData: string;
      title: string;
    }): Promise<import("@/backend.d.ts").ARCapture> => {
      if (!actor) throw new Error("Not connected");
      return actor.saveARCapture(
        params.sceneId,
        params.imageData,
        params.title,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["arCaptures"] }),
  });
}

export function useDeleteARCapture() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteARCapture(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["arCaptures"] }),
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserProfile();
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UserProfileInput) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveUserProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

export function useUpdateLastLogin() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateLastLogin();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
  });
}

export function useGetUserActivitySummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserActivitySummary | null>({
    queryKey: ["userActivitySummary"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserActivitySummary();
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Type re-exports for page consumers ──────────────────────────────────────
export type {
  ARCapture,
  AncestryInsights,
  Course,
  DailyLesson,
  Enrollment,
  FamilyTimeline,
  FamilyTreeNode,
  Festival,
  FestivalPlan,
  HeritageProfile,
  ItemId,
  LanguageProgress,
  Listing,
  MentorBooking,
  Order,
  SellerStats,
  StoryItem,
  Timestamp,
  TraditionItem,
  UserActivitySummary,
  UserProfile,
  UserProfileInput,
  UserTraditionPrefs,
  UserId,
} from "@/backend.d.ts";
