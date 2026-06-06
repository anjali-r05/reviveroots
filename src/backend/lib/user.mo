import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import UTypes "../types/user";

module {

  public func saveProfile(
    profiles : Map.Map<Common.UserId, UTypes.UserProfile>,
    caller : Principal,
    input : UTypes.UserProfileInput,
  ) : UTypes.UserProfile {
    Debug.todo();
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, UTypes.UserProfile>,
    caller : Principal,
  ) : ?UTypes.UserProfile {
    Debug.todo();
  };

  public func updateLastLogin(
    profiles : Map.Map<Common.UserId, UTypes.UserProfile>,
    caller : Principal,
  ) {
    Debug.todo();
  };

  public func isNewUser(
    profiles : Map.Map<Common.UserId, UTypes.UserProfile>,
    caller : Principal,
  ) : Bool {
    Debug.todo();
  };

  public func buildActivitySummary(
    caller : Principal,
    heritageScans : Nat,
    languageLessons : Nat,
    storiesSaved : Nat,
    arCaptures : Nat,
    coursesEnrolled : Nat,
    ordersPlaced : Nat,
    festivalPlans : Nat,
  ) : UTypes.UserActivitySummary {
    Debug.todo();
  };
};
