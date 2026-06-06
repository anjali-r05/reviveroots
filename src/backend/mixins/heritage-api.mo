import HTypes "../types/heritage";
import Common "../types/common";
import HeritageLib "../lib/heritage";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

mixin (heritageProfiles : Map.Map<Common.UserId, HTypes.HeritageProfile>) {

  public shared ({ caller }) func saveHeritageProfile(
    surname : Text,
    region : Text,
    language : Text,
    familyBackground : Text,
    grandparentsOrigin : Text,
    ancestryInsights : Text,
    migrationStory : Text,
    forgottenCustoms : [Text],
    traditionalOccupations : [Text],
    festivals : [Text],
    foods : [Text],
  ) : async HTypes.HeritageProfile {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    HeritageLib.upsert(
      heritageProfiles, caller, surname, region, language,
      familyBackground, grandparentsOrigin, ancestryInsights,
      migrationStory, forgottenCustoms, traditionalOccupations,
      festivals, foods,
    );
  };

  public shared query ({ caller }) func getHeritageProfile() : async ?HTypes.HeritageProfile {
    if (caller.isAnonymous()) return null;
    HeritageLib.get(heritageProfiles, caller);
  };

  public shared ({ caller }) func deleteHeritageProfile() : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    HeritageLib.delete(heritageProfiles, caller);
    true;
  };

  // Generates ancestry insights deterministically from heritage input
  public shared ({ caller }) func generateAncestryInsights(
    surname : Text,
    region : Text,
    language : Text,
    familyBackground : Text,
    grandparentsOrigin : Text,
  ) : async HTypes.AncestryInsights {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    let input : HTypes.HeritageInput = { surname; region; language; familyBackground; grandparentsOrigin };
    HeritageLib.generateInsights(input);
  };
};
