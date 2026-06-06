import MktTypes "../types/marketplace";
import Common "../types/common";
import MktLib "../lib/marketplace";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

mixin (
  listings : List.List<MktTypes.Listing>,
  orders : List.List<MktTypes.Order>,
  listingCounter : { var val : Nat },
  orderCounter : { var val : Nat },
) {

  public shared ({ caller }) func addListing(
    title : Text,
    description : Text,
    price : Nat,
    category : MktTypes.ProductCategory,
    imageUrls : [Text],
    stock : Nat,
    region : Text,
  ) : async MktTypes.Listing {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    MktLib.addListing(listings, listingCounter, caller, title, description, price, category, imageUrls, stock, region);
  };

  public shared ({ caller }) func updateListing(
    id : Common.ItemId,
    title : Text,
    description : Text,
    price : Nat,
    stock : Nat,
    isActive : Bool,
  ) : async ?MktTypes.Listing {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    MktLib.updateListing(listings, caller, id, title, description, price, stock, isActive);
  };

  public shared ({ caller }) func deleteListing(id : Common.ItemId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    MktLib.deleteListing(listings, caller, id);
  };

  public query func listActiveListings() : async [MktTypes.Listing] {
    MktLib.listActiveListings(listings);
  };

  // Filter active listings by category string
  public query func listingsByCategory(category : Text) : async [MktTypes.Listing] {
    MktLib.listByCategory(listings, category);
  };

  public query func getListing(id : Common.ItemId) : async ?MktTypes.Listing {
    MktLib.getListing(listings, id);
  };

  public shared query ({ caller }) func getMyListings() : async [MktTypes.Listing] {
    if (caller.isAnonymous()) return [];
    MktLib.getSellerListings(listings, caller);
  };

  public shared ({ caller }) func createOrder(
    listingId : Common.ItemId,
    sellerId : Common.UserId,
    quantity : Nat,
    totalPrice : Nat,
    stripeSessionId : Text,
    shippingAddress : Text,
  ) : async MktTypes.Order {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    MktLib.createOrder(orders, orderCounter, caller, listingId, sellerId, quantity, totalPrice, stripeSessionId, shippingAddress);
  };

  public shared ({ caller }) func updateOrderStatus(
    orderId : Common.ItemId,
    status : MktTypes.OrderStatus,
  ) : async ?MktTypes.Order {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    MktLib.updateOrderStatus(orders, caller, orderId, status);
  };

  public shared query ({ caller }) func getMyBuyerOrders() : async [MktTypes.Order] {
    if (caller.isAnonymous()) return [];
    MktLib.getBuyerOrders(orders, caller);
  };

  public shared query ({ caller }) func getMySellerOrders() : async [MktTypes.Order] {
    if (caller.isAnonymous()) return [];
    MktLib.getSellerOrders(orders, caller);
  };

  public shared query ({ caller }) func getMySellerStats() : async MktTypes.SellerStats {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    MktLib.computeSellerStats(listings, orders, caller);
  };
};
