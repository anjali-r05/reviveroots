import FestTypes "../types/festival";
import Common "../types/common";
import FestLib "../lib/festival";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

mixin (
  festivals : List.List<FestTypes.Festival>,
  festivalPlans : List.List<FestTypes.FestivalPlan>,
  festivalCounter : { var val : Nat },
  planCounter : { var val : Nat },
) {

  public shared ({ caller }) func addFestival(
    name : Text,
    description : Text,
    meaning : Text,
    rituals : [Text],
    celebrationGuide : Text,
    recipes : [Text],
    clothingSuggestions : [Text],
    date : Text,
    region : Text,
    languages : [Text],
    imageUrl : Text,
  ) : async FestTypes.Festival {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    FestLib.addFestival(festivals, festivalCounter, name, description, meaning, rituals, celebrationGuide, recipes, clothingSuggestions, date, region, languages, imageUrl);
  };

  public query func listFestivals() : async [FestTypes.Festival] {
    FestLib.listFestivals(festivals);
  };

  public query func filterFestivalsByRegion(region : Text) : async [FestTypes.Festival] {
    FestLib.filterByRegion(festivals, region);
  };

  public query func getFestival(id : Common.ItemId) : async ?FestTypes.Festival {
    FestLib.getFestival(festivals, id);
  };

  public query func getPersonalizedFestivals(
    regions : [Text],
    languages : [Text],
  ) : async [FestTypes.Festival] {
    FestLib.getPersonalizedFestivals(festivals, regions, languages);
  };

  public shared ({ caller }) func createFestivalPlan(
    festivalId : Common.ItemId,
    reminderAt : ?Common.Timestamp,
    familyParticipants : [Text],
    notes : Text,
  ) : async FestTypes.FestivalPlan {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    FestLib.createPlan(festivalPlans, planCounter, caller, festivalId, reminderAt, familyParticipants, notes);
  };

  public shared ({ caller }) func updateFestivalPlan(
    planId : Common.ItemId,
    reminderAt : ?Common.Timestamp,
    familyParticipants : [Text],
    notes : Text,
  ) : async ?FestTypes.FestivalPlan {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    FestLib.updatePlan(festivalPlans, caller, planId, reminderAt, familyParticipants, notes);
  };

  public shared ({ caller }) func deleteFestivalPlan(planId : Common.ItemId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    FestLib.deletePlan(festivalPlans, caller, planId);
  };

  public shared query ({ caller }) func getMyFestivalPlans() : async [FestTypes.FestivalPlan] {
    if (caller.isAnonymous()) return [];
    FestLib.getUserPlans(festivalPlans, caller);
  };

  // Add a family member name to an existing plan
  public shared ({ caller }) func addFamilyMember(planId : Common.ItemId, member : Text) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    FestLib.addFamilyMember(festivalPlans, caller, planId, member);
  };

  // Remove a family member name from an existing plan
  public shared ({ caller }) func removeFamilyMember(planId : Common.ItemId, member : Text) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    FestLib.removeFamilyMember(festivalPlans, caller, planId, member);
  };
};
