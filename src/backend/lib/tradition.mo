import TradTypes "../types/tradition";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func addTradition(
    traditions : List.List<TradTypes.TraditionItem>,
    counter : { var val : Nat },
    title : Text,
    description : Text,
    category : TradTypes.TraditionCategory,
    region : Text,
    languages : [Text],
    imageUrl : Text,
    steps : [Text],
    tags : [Text],
  ) : TradTypes.TraditionItem {
    let id = counter.val;
    counter.val += 1;
    let item : TradTypes.TraditionItem = {
      id;
      title;
      description;
      category;
      region;
      languages;
      imageUrl;
      steps;
      tags;
      createdAt = Time.now();
    };
    traditions.add(item);
    item;
  };

  public func listTraditions(
    traditions : List.List<TradTypes.TraditionItem>,
  ) : [TradTypes.TraditionItem] {
    traditions.toArray();
  };

  public func filterByRegion(
    traditions : List.List<TradTypes.TraditionItem>,
    region : Text,
  ) : [TradTypes.TraditionItem] {
    traditions.filter(func(t) { t.region == region }).toArray();
  };

  public func getTradition(
    traditions : List.List<TradTypes.TraditionItem>,
    id : Common.ItemId,
  ) : ?TradTypes.TraditionItem {
    traditions.find(func(t) { t.id == id });
  };

  // Filter traditions by category variant tag (e.g. "recipe", "ritual", etc.)
  public func filterByType(
    traditions : List.List<TradTypes.TraditionItem>,
    traditionType : Text,
  ) : [TradTypes.TraditionItem] {
    traditions.filter(func(t) {
      switch (t.category) {
        case (#recipe) { traditionType == "recipe" };
        case (#ritual) { traditionType == "ritual" };
        case (#custom) { traditionType == "custom" };
        case (#folkSong) { traditionType == "folkSong" };
        case (#dance) { traditionType == "dance" };
        case (#clothing) { traditionType == "clothing" };
        case (#celebration) { traditionType == "celebration" };
        case (#spiritualPractice) { traditionType == "spiritualPractice" };
      }
    }).toArray();
  };

  public func upsertPrefs(
    prefs : Map.Map<Common.UserId, TradTypes.UserTraditionPrefs>,
    caller : Common.UserId,
    heritageRegions : [Text],
    heritageLanguages : [Text],
  ) : TradTypes.UserTraditionPrefs {
    let now = Time.now();
    switch (prefs.get(caller)) {
      case (?existing) {
        let updated = { existing with heritageRegions; heritageLanguages; updatedAt = now };
        prefs.add(caller, updated);
        updated;
      };
      case null {
        let fresh : TradTypes.UserTraditionPrefs = {
          userId = caller;
          heritageRegions;
          heritageLanguages;
          savedItemIds = [];
          updatedAt = now;
        };
        prefs.add(caller, fresh);
        fresh;
      };
    };
  };

  public func saveItem(
    prefs : Map.Map<Common.UserId, TradTypes.UserTraditionPrefs>,
    caller : Common.UserId,
    itemId : Common.ItemId,
  ) {
    switch (prefs.get(caller)) {
      case (?existing) {
        let already = existing.savedItemIds;
        let found = already.find(func(x) { x == itemId });
        switch (found) {
          case (?_) { };
          case null {
            let updated = already.concat([itemId]);
            prefs.add(caller, { existing with savedItemIds = updated; updatedAt = Time.now() });
          };
        };
      };
      case null {
        prefs.add(caller, {
          userId = caller;
          heritageRegions = [];
          heritageLanguages = [];
          savedItemIds = [itemId];
          updatedAt = Time.now();
        });
      };
    };
  };

  public func unsaveItem(
    prefs : Map.Map<Common.UserId, TradTypes.UserTraditionPrefs>,
    caller : Common.UserId,
    itemId : Common.ItemId,
  ) {
    switch (prefs.get(caller)) {
      case (?existing) {
        let updated = existing.savedItemIds.filter(func(x) { x != itemId });
        prefs.add(caller, { existing with savedItemIds = updated; updatedAt = Time.now() });
      };
      case null { };
    };
  };

  public func getPrefs(
    prefs : Map.Map<Common.UserId, TradTypes.UserTraditionPrefs>,
    caller : Common.UserId,
  ) : ?TradTypes.UserTraditionPrefs {
    prefs.get(caller);
  };

  public func getRecommendations(
    traditions : List.List<TradTypes.TraditionItem>,
    prefs : Map.Map<Common.UserId, TradTypes.UserTraditionPrefs>,
    caller : Common.UserId,
  ) : [TradTypes.TraditionItem] {
    switch (prefs.get(caller)) {
      case null { traditions.toArray() };
      case (?p) {
        traditions.filter(func(t) {
          p.heritageRegions.find(func(r) { r == t.region }) != null or
          t.languages.find(func(l) { p.heritageLanguages.find(func(hl) { hl == l }) != null }) != null
        }).toArray();
      };
    };
  };
};
