import TradTypes "../types/tradition";
import Common "../types/common";
import TradLib "../lib/tradition";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

mixin (
  traditions : List.List<TradTypes.TraditionItem>,
  traditionPrefs : Map.Map<Common.UserId, TradTypes.UserTraditionPrefs>,
  traditionCounter : { var val : Nat },
) {

  public shared ({ caller }) func addTradition(
    title : Text,
    description : Text,
    category : TradTypes.TraditionCategory,
    region : Text,
    languages : [Text],
    imageUrl : Text,
    steps : [Text],
    tags : [Text],
  ) : async TradTypes.TraditionItem {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    TradLib.addTradition(traditions, traditionCounter, title, description, category, region, languages, imageUrl, steps, tags);
  };

  public query func listTraditions() : async [TradTypes.TraditionItem] {
    TradLib.listTraditions(traditions);
  };

  public query func filterTraditionsByRegion(region : Text) : async [TradTypes.TraditionItem] {
    TradLib.filterByRegion(traditions, region);
  };

  public query func getTradition(id : Common.ItemId) : async ?TradTypes.TraditionItem {
    TradLib.getTradition(traditions, id);
  };

  // Filter traditions by category type string (e.g. "recipe", "dance")
  public query func filterTraditionsByType(traditionType : Text) : async [TradTypes.TraditionItem] {
    TradLib.filterByType(traditions, traditionType);
  };

  public shared ({ caller }) func setTraditionPrefs(
    heritageRegions : [Text],
    heritageLanguages : [Text],
  ) : async TradTypes.UserTraditionPrefs {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    TradLib.upsertPrefs(traditionPrefs, caller, heritageRegions, heritageLanguages);
  };

  public shared ({ caller }) func saveTraditionItem(itemId : Common.ItemId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    TradLib.saveItem(traditionPrefs, caller, itemId);
    true;
  };

  public shared ({ caller }) func unsaveTraditionItem(itemId : Common.ItemId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    TradLib.unsaveItem(traditionPrefs, caller, itemId);
    true;
  };

  public shared query ({ caller }) func getMyTraditionPrefs() : async ?TradTypes.UserTraditionPrefs {
    if (caller.isAnonymous()) return null;
    TradLib.getPrefs(traditionPrefs, caller);
  };

  public shared query ({ caller }) func getRecommendedTraditions() : async [TradTypes.TraditionItem] {
    TradLib.getRecommendations(traditions, traditionPrefs, caller);
  };
};
