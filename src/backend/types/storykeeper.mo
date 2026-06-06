import Common "common";

module {
  public type MediaType = {
    #photo;
    #letter;
    #handwrittenNote;
    #voiceNote;
    #video;
  };

  public type StoryItem = {
    id : Common.ItemId;
    userId : Common.UserId;
    title : Text;
    description : Text;
    mediaType : MediaType;
    fileId : Text;
    tags : [Text];
    peopleTagged : [Text];
    yearApprox : ?Nat;
    narration : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type FamilyTimeline = {
    userId : Common.UserId;
    title : Text;
    description : Text;
    itemIds : [Common.ItemId];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
