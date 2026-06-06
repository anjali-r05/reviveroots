import Common "common";

module {
  public type HeritageInput = {
    surname : Text;
    region : Text;
    language : Text;
    familyBackground : Text;
    grandparentsOrigin : Text;
  };

  public type FamilyTreeNode = {
    name : Text;
    relation : Text;
    region : Text;
    era : Text;
  };

  public type AncestryInsights = {
    migrationStory : Text;
    forgottenCustoms : [Text];
    traditionalOccupations : [Text];
    festivals : [Text];
    foods : [Text];
    familyTreeNodes : [FamilyTreeNode];
  };

  public type HeritageProfile = {
    userId : Common.UserId;
    surname : Text;
    region : Text;
    language : Text;
    familyBackground : Text;
    grandparentsOrigin : Text;
    ancestryInsights : Text;
    migrationStory : Text;
    forgottenCustoms : [Text];
    traditionalOccupations : [Text];
    festivals : [Text];
    foods : [Text];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
