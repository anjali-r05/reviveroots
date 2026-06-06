import ARTypes "../types/ar";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  func makeId(userId : Common.UserId, counter : Nat) : Text {
    userId.toText() # "-" # counter.toText();
  };

  public func save(
    captures : List.List<ARTypes.ARCapture>,
    counter : { var val : Nat },
    caller : Common.UserId,
    sceneId : Text,
    imageData : Text,
    title : Text,
  ) : ARTypes.ARCapture {
    let id = makeId(caller, counter.val);
    counter.val += 1;
    let capture : ARTypes.ARCapture = {
      id;
      userId = caller;
      sceneId;
      imageData;
      title;
      description = "";
      timestamp = Time.now();
    };
    captures.add(capture);
    capture;
  };

  public func listForCaller(
    captures : List.List<ARTypes.ARCapture>,
    caller : Common.UserId,
  ) : [ARTypes.ARCapture] {
    captures.filter(func(c) { c.userId == caller }).toArray();
  };

  public func remove(
    captures : List.List<ARTypes.ARCapture>,
    caller : Common.UserId,
    id : Text,
  ) : Bool {
    let before = captures.size();
    let kept = captures.filter(func(c) { not (c.id == id and c.userId == caller) });
    captures.clear();
    captures.append(kept);
    captures.size() < before;
  };
};
