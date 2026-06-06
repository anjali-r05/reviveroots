import SKTypes "../types/storykeeper";
import Common "../types/common";
import SKLib "../lib/storykeeper";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

mixin (
  storyItems : List.List<SKTypes.StoryItem>,
  storyTimelines : Map.Map<Common.UserId, SKTypes.FamilyTimeline>,
  storyCounter : { var val : Nat },
) {

  public shared ({ caller }) func addStoryItem(
    title : Text,
    description : Text,
    mediaType : SKTypes.MediaType,
    fileId : Text,
    tags : [Text],
    peopleTagged : [Text],
    yearApprox : ?Nat,
    narration : Text,
  ) : async SKTypes.StoryItem {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    SKLib.addStoryItem(storyItems, storyCounter, caller, title, description, mediaType, fileId, tags, peopleTagged, yearApprox, narration);
  };

  public shared query ({ caller }) func getMyStoryItems() : async [SKTypes.StoryItem] {
    if (caller.isAnonymous()) return [];
    SKLib.getUserItems(storyItems, caller);
  };

  public shared query ({ caller }) func getStoryItem(id : Common.ItemId) : async ?SKTypes.StoryItem {
    if (caller.isAnonymous()) return null;
    SKLib.getItem(storyItems, caller, id);
  };

  public shared ({ caller }) func updateStoryItem(
    id : Common.ItemId,
    title : Text,
    description : Text,
    tags : [Text],
    narration : Text,
  ) : async ?SKTypes.StoryItem {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    SKLib.updateItem(storyItems, caller, id, title, description, tags, narration);
  };

  public shared ({ caller }) func deleteStoryItem(id : Common.ItemId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    SKLib.deleteItem(storyItems, caller, id);
  };

  public shared ({ caller }) func upsertFamilyTimeline(
    title : Text,
    description : Text,
    itemIds : [Common.ItemId],
  ) : async SKTypes.FamilyTimeline {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    SKLib.upsertTimeline(storyTimelines, caller, title, description, itemIds);
  };

  public shared query ({ caller }) func getMyFamilyTimeline() : async ?SKTypes.FamilyTimeline {
    if (caller.isAnonymous()) return null;
    SKLib.getTimeline(storyTimelines, caller);
  };

  // Generates a narrative text from story item metadata
  public shared ({ caller }) func generateNarrative(itemId : Common.ItemId) : async ?Text {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    SKLib.generateNarrative(storyItems, caller, itemId);
  };
};
