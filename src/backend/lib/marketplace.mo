import MktTypes "../types/marketplace";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func addListing(
    listings : List.List<MktTypes.Listing>,
    counter : { var val : Nat },
    caller : Common.UserId,
    title : Text,
    description : Text,
    price : Nat,
    category : MktTypes.ProductCategory,
    imageUrls : [Text],
    stock : Nat,
    region : Text,
  ) : MktTypes.Listing {
    let id = counter.val;
    counter.val += 1;
    let now = Time.now();
    let listing : MktTypes.Listing = {
      id;
      sellerId = caller;
      title;
      description;
      price;
      category;
      imageUrls;
      stock;
      region;
      isActive = true;
      createdAt = now;
      updatedAt = now;
    };
    listings.add(listing);
    listing;
  };

  public func updateListing(
    listings : List.List<MktTypes.Listing>,
    caller : Common.UserId,
    id : Common.ItemId,
    title : Text,
    description : Text,
    price : Nat,
    stock : Nat,
    isActive : Bool,
  ) : ?MktTypes.Listing {
    var result : ?MktTypes.Listing = null;
    listings.mapInPlace(func(l) {
      if (l.id == id and l.sellerId == caller) {
        let updated = { l with title; description; price; stock; isActive; updatedAt = Time.now() };
        result := ?updated;
        updated;
      } else { l };
    });
    result;
  };

  public func deleteListing(
    listings : List.List<MktTypes.Listing>,
    caller : Common.UserId,
    id : Common.ItemId,
  ) : Bool {
    let sizeBefore = listings.size();
    let filtered = listings.filter(func(l) { not (l.id == id and l.sellerId == caller) });
    listings.clear();
    listings.append(filtered);
    listings.size() < sizeBefore;
  };

  public func listActiveListings(
    listings : List.List<MktTypes.Listing>,
  ) : [MktTypes.Listing] {
    listings.filter(func(l) { l.isActive }).toArray();
  };

  // Filter active listings by category variant tag text
  public func listByCategory(
    listings : List.List<MktTypes.Listing>,
    category : Text,
  ) : [MktTypes.Listing] {
    listings.filter(func(l) {
      if (not l.isActive) { return false };
      switch (l.category) {
        case (#craft) { category == "craft" };
        case (#textile) { category == "textile" };
        case (#art) { category == "art" };
        case (#jewelry) { category == "jewelry" };
        case (#instrument) { category == "instrument" };
        case (#book) { category == "book" };
        case (#artisanProduct) { category == "artisanProduct" };
      }
    }).toArray();
  };

  public func getSellerListings(
    listings : List.List<MktTypes.Listing>,
    seller : Common.UserId,
  ) : [MktTypes.Listing] {
    listings.filter(func(l) { l.sellerId == seller }).toArray();
  };

  public func getListing(
    listings : List.List<MktTypes.Listing>,
    id : Common.ItemId,
  ) : ?MktTypes.Listing {
    listings.find(func(l) { l.id == id });
  };

  public func createOrder(
    orders : List.List<MktTypes.Order>,
    counter : { var val : Nat },
    caller : Common.UserId,
    listingId : Common.ItemId,
    sellerId : Common.UserId,
    quantity : Nat,
    totalPrice : Nat,
    stripeSessionId : Text,
    shippingAddress : Text,
  ) : MktTypes.Order {
    let id = counter.val;
    counter.val += 1;
    let now = Time.now();
    let order : MktTypes.Order = {
      id;
      buyerId = caller;
      sellerId;
      listingId;
      quantity;
      totalPrice;
      status = #pending;
      stripeSessionId;
      shippingAddress;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(order);
    order;
  };

  public func updateOrderStatus(
    orders : List.List<MktTypes.Order>,
    caller : Common.UserId,
    orderId : Common.ItemId,
    status : MktTypes.OrderStatus,
  ) : ?MktTypes.Order {
    var result : ?MktTypes.Order = null;
    orders.mapInPlace(func(o) {
      if (o.id == orderId and (o.sellerId == caller or o.buyerId == caller)) {
        let updated = { o with status; updatedAt = Time.now() };
        result := ?updated;
        updated;
      } else { o };
    });
    result;
  };

  public func getBuyerOrders(
    orders : List.List<MktTypes.Order>,
    caller : Common.UserId,
  ) : [MktTypes.Order] {
    orders.filter(func(o) { o.buyerId == caller }).toArray();
  };

  public func getSellerOrders(
    orders : List.List<MktTypes.Order>,
    caller : Common.UserId,
  ) : [MktTypes.Order] {
    orders.filter(func(o) { o.sellerId == caller }).toArray();
  };

  public func computeSellerStats(
    listings : List.List<MktTypes.Listing>,
    orders : List.List<MktTypes.Order>,
    seller : Common.UserId,
  ) : MktTypes.SellerStats {
    let sellerListings = listings.filter(func(l) { l.sellerId == seller });
    let sellerOrders = orders.filter(func(o) { o.sellerId == seller });
    let totalRevenue = sellerOrders.foldLeft(0, func(acc, o) {
      if (o.status == #paid or o.status == #shipped or o.status == #delivered) {
        acc + o.totalPrice;
      } else { acc };
    });
    {
      sellerId = seller;
      totalListings = sellerListings.size();
      totalOrders = sellerOrders.size();
      totalRevenue;
      rating = 0;
    };
  };
};
