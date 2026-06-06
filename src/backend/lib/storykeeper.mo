import SKTypes "../types/storykeeper";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func addStoryItem(
    store : List.List<SKTypes.StoryItem>,
    counter : { var val : Nat },
    caller : Common.UserId,
    title : Text,
    description : Text,
    mediaType : SKTypes.MediaType,
    fileId : Text,
    tags : [Text],
    peopleTagged : [Text],
    yearApprox : ?Nat,
    narration : Text,
  ) : SKTypes.StoryItem {
    let id = counter.val;
    counter.val += 1;
    let now = Time.now();
    let item : SKTypes.StoryItem = {
      id;
      userId = caller;
      title;
      description;
      mediaType;
      fileId;
      tags;
      peopleTagged;
      yearApprox;
      narration;
      createdAt = now;
      updatedAt = now;
    };
    store.add(item);
    item;
  };

  public func getUserItems(
    store : List.List<SKTypes.StoryItem>,
    caller : Common.UserId,
  ) : [SKTypes.StoryItem] {
    store.filter(func(i) { i.userId == caller }).toArray();
  };

  public func getItem(
    store : List.List<SKTypes.StoryItem>,
    caller : Common.UserId,
    id : Common.ItemId,
  ) : ?SKTypes.StoryItem {
    store.find(func(i) { i.id == id and i.userId == caller });
  };

  public func updateItem(
    store : List.List<SKTypes.StoryItem>,
    caller : Common.UserId,
    id : Common.ItemId,
    title : Text,
    description : Text,
    tags : [Text],
    narration : Text,
  ) : ?SKTypes.StoryItem {
    var updated : ?SKTypes.StoryItem = null;
    store.mapInPlace(func(i) {
      if (i.id == id and i.userId == caller) {
        let u = { i with title; description; tags; narration; updatedAt = Time.now() };
        updated := ?u;
        u;
      } else { i };
    });
    updated;
  };

  public func deleteItem(
    store : List.List<SKTypes.StoryItem>,
    caller : Common.UserId,
    id : Common.ItemId,
  ) : Bool {
    let sizeBefore = store.size();
    let filtered = store.filter(func(i) { not (i.id == id and i.userId == caller) });
    store.clear();
    store.append(filtered);
    store.size() < sizeBefore;
  };

  public func upsertTimeline(
    timelines : Map.Map<Common.UserId, SKTypes.FamilyTimeline>,
    caller : Common.UserId,
    title : Text,
    description : Text,
    itemIds : [Common.ItemId],
  ) : SKTypes.FamilyTimeline {
    let now = Time.now();
    switch (timelines.get(caller)) {
      case (?existing) {
        let updated = { existing with title; description; itemIds; updatedAt = now };
        timelines.add(caller, updated);
        updated;
      };
      case null {
        let fresh : SKTypes.FamilyTimeline = {
          userId = caller;
          title;
          description;
          itemIds;
          createdAt = now;
          updatedAt = now;
        };
        timelines.add(caller, fresh);
        fresh;
      };
    };
  };

  public func getTimeline(
    timelines : Map.Map<Common.UserId, SKTypes.FamilyTimeline>,
    caller : Common.UserId,
  ) : ?SKTypes.FamilyTimeline {
    timelines.get(caller);
  };

  // Generates a narrative description based on story item metadata
  public func generateNarrative(
    store : List.List<SKTypes.StoryItem>,
    caller : Common.UserId,
    itemId : Common.ItemId,
  ) : ?Text {
    switch (store.find(func(i) { i.id == itemId and i.userId == caller })) {
      case null { null };
      case (?item) {
        let mediaLabel = switch (item.mediaType) {
          case (#photo) { "photograph" };
          case (#letter) { "handwritten letter" };
          case (#handwrittenNote) { "handwritten note" };
          case (#voiceNote) { "voice recording" };
          case (#video) { "video memory" };
        };
        let yearText = switch (item.yearApprox) {
          case null { "an undated time" };
          case (?y) { "approximately " # y.toText() };
        };
        let tagText = if (item.tags.size() == 0) {
          "cherished memories"
        } else {
          item.tags.foldLeft("", func(acc, t) {
            if (acc == "") { t } else { acc # ", " # t }
          })
        };
        let peopleText = if (item.peopleTagged.size() == 0) {
          "the family"
        } else {
          item.peopleTagged.foldLeft("", func(acc, p) {
            if (acc == "") { p } else { acc # " and " # p }
          })
        };
        let narrative = "This " # mediaLabel # " titled '" # item.title # "' was captured in " # yearText # ". " #
          item.description # " " #
          "This precious memory connects " # peopleText # " across generations through themes of " # tagText # ". " #
          "It stands as a testament to the living heritage passed down through your family's story.";
        ?narrative;
      };
    };
  };
};
