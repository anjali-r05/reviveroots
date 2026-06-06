import Debug "mo:core/Debug";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import UTypes "../types/user";
import HTypes "../types/heritage";
import LangTypes "../types/language";
import SKTypes "../types/storykeeper";
import ARTypes "../types/ar";
import GTypes "../types/gurukul";
import MktTypes "../types/marketplace";
import FestTypes "../types/festival";
import UserLib "../lib/user";

mixin (
  userProfiles : Map.Map<Common.UserId, UTypes.UserProfile>,
  heritageProfiles : Map.Map<Common.UserId, HTypes.HeritageProfile>,
  langProgress : Map.Map<Common.UserId, LangTypes.LanguageProgress>,
  storyItems : List.List<SKTypes.StoryItem>,
  arCaptures : List.List<ARTypes.ARCapture>,
  enrollments : List.List<GTypes.Enrollment>,
  orders : List.List<MktTypes.Order>,
  festivalPlans : List.List<FestTypes.FestivalPlan>,
) {

  public shared ({ caller }) func saveUserProfile(
    input : UTypes.UserProfileInput
  ) : async { #ok; #err : Text } {
    Debug.todo();
  };

  public shared query ({ caller }) func getUserProfile() : async { #ok : UTypes.UserProfile; #err : Text } {
    Debug.todo();
  };

  public shared ({ caller }) func updateLastLogin() : async { #ok; #err : Text } {
    Debug.todo();
  };

  public shared query ({ caller }) func getUserActivitySummary() : async { #ok : UTypes.UserActivitySummary; #err : Text } {
    Debug.todo();
  };
};
