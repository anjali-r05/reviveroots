import ARTypes "../types/ar";
import ARLib "../lib/ar";
import Common "../types/common";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  arCaptures : List.List<ARTypes.ARCapture>,
  arCounter : { var val : Nat },
) {

  public shared ({ caller }) func saveARCapture(
    sceneId : Text,
    imageData : Text,
    title : Text,
  ) : async ARTypes.ARCapture {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    ARLib.save(arCaptures, arCounter, caller, sceneId, imageData, title);
  };

  public shared query ({ caller }) func getARCaptures() : async [ARTypes.ARCapture] {
    if (caller.isAnonymous()) return [];
    ARLib.listForCaller(arCaptures, caller);
  };

  public shared ({ caller }) func deleteARCapture(id : Text) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    ARLib.remove(arCaptures, caller, id);
  };
};
