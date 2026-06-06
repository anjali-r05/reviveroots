import FestTypes "../types/festival";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func addFestival(
    festivals : List.List<FestTypes.Festival>,
    counter : { var val : Nat },
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
  ) : FestTypes.Festival {
    let id = counter.val;
    counter.val += 1;
    let festival : FestTypes.Festival = {
      id;
      name;
      description;
      meaning;
      rituals;
      celebrationGuide;
      recipes;
      clothingSuggestions;
      date;
      region;
      languages;
      imageUrl;
      createdAt = Time.now();
    };
    festivals.add(festival);
    festival;
  };

  public func listFestivals(
    festivals : List.List<FestTypes.Festival>,
  ) : [FestTypes.Festival] {
    festivals.toArray();
  };

  public func filterByRegion(
    festivals : List.List<FestTypes.Festival>,
    region : Text,
  ) : [FestTypes.Festival] {
    festivals.filter(func(f) { f.region == region }).toArray();
  };

  public func getFestival(
    festivals : List.List<FestTypes.Festival>,
    id : Common.ItemId,
  ) : ?FestTypes.Festival {
    festivals.find(func(f) { f.id == id });
  };

  public func createPlan(
    plans : List.List<FestTypes.FestivalPlan>,
    counter : { var val : Nat },
    caller : Common.UserId,
    festivalId : Common.ItemId,
    reminderAt : ?Common.Timestamp,
    familyParticipants : [Text],
    notes : Text,
  ) : FestTypes.FestivalPlan {
    let id = counter.val;
    counter.val += 1;
    let now = Time.now();
    let plan : FestTypes.FestivalPlan = {
      id;
      userId = caller;
      festivalId;
      reminderAt;
      familyParticipants;
      notes;
      createdAt = now;
      updatedAt = now;
    };
    plans.add(plan);
    plan;
  };

  public func updatePlan(
    plans : List.List<FestTypes.FestivalPlan>,
    caller : Common.UserId,
    planId : Common.ItemId,
    reminderAt : ?Common.Timestamp,
    familyParticipants : [Text],
    notes : Text,
  ) : ?FestTypes.FestivalPlan {
    var result : ?FestTypes.FestivalPlan = null;
    plans.mapInPlace(func(p) {
      if (p.id == planId and p.userId == caller) {
        let updated = { p with reminderAt; familyParticipants; notes; updatedAt = Time.now() };
        result := ?updated;
        updated;
      } else { p };
    });
    result;
  };

  public func deletePlan(
    plans : List.List<FestTypes.FestivalPlan>,
    caller : Common.UserId,
    planId : Common.ItemId,
  ) : Bool {
    let sizeBefore = plans.size();
    let filtered = plans.filter(func(p) { not (p.id == planId and p.userId == caller) });
    plans.clear();
    plans.append(filtered);
    plans.size() < sizeBefore;
  };

  public func getUserPlans(
    plans : List.List<FestTypes.FestivalPlan>,
    caller : Common.UserId,
  ) : [FestTypes.FestivalPlan] {
    plans.filter(func(p) { p.userId == caller }).toArray();
  };

  public func getPersonalizedFestivals(
    festivals : List.List<FestTypes.Festival>,
    regions : [Text],
    languages : [Text],
  ) : [FestTypes.Festival] {
    if (regions.size() == 0 and languages.size() == 0) {
      return festivals.toArray();
    };
    festivals.filter(func(f) {
      regions.find(func(r) { r == f.region }) != null or
      f.languages.find(func(l) { languages.find(func(ul) { ul == l }) != null }) != null
    }).toArray();
  };

  // Adds a family member name to an existing plan
  public func addFamilyMember(
    plans : List.List<FestTypes.FestivalPlan>,
    caller : Common.UserId,
    planId : Common.ItemId,
    member : Text,
  ) : Bool {
    var found = false;
    plans.mapInPlace(func(p) {
      if (p.id == planId and p.userId == caller) {
        found := true;
        let already = p.familyParticipants.find(func(m) { m == member });
        switch (already) {
          case (?_) { p };
          case null {
            { p with familyParticipants = p.familyParticipants.concat([member]); updatedAt = Time.now() };
          };
        };
      } else { p };
    });
    found;
  };

  // Removes a family member name from an existing plan
  public func removeFamilyMember(
    plans : List.List<FestTypes.FestivalPlan>,
    caller : Common.UserId,
    planId : Common.ItemId,
    member : Text,
  ) : Bool {
    var found = false;
    plans.mapInPlace(func(p) {
      if (p.id == planId and p.userId == caller) {
        found := true;
        { p with familyParticipants = p.familyParticipants.filter(func(m) { m != member }); updatedAt = Time.now() };
      } else { p };
    });
    found;
  };
};
