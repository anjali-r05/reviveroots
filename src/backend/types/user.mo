import Common "common";

module {
  public type UserProfile = {
    principalId : Common.UserId;
    fullName : Text;
    email : Text;
    heritageRegion : Text;
    languageInterests : [Text];
    createdAt : Common.Timestamp;
    lastLoginAt : Common.Timestamp;
  };

  public type UserProfileInput = {
    fullName : Text;
    email : Text;
    heritageRegion : Text;
    languageInterests : [Text];
  };

  public type UserActivitySummary = {
    heritageScans : Nat;
    languageLessons : Nat;
    storiesSaved : Nat;
    arCaptures : Nat;
    coursesEnrolled : Nat;
    ordersPlaced : Nat;
    festivalPlans : Nat;
  };
};
