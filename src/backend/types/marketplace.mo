import Common "common";

module {
  public type ProductCategory = {
    #craft;
    #textile;
    #art;
    #jewelry;
    #instrument;
    #book;
    #artisanProduct;
  };

  public type Listing = {
    id : Common.ItemId;
    sellerId : Common.UserId;
    title : Text;
    description : Text;
    price : Nat;
    category : ProductCategory;
    imageUrls : [Text];
    stock : Nat;
    region : Text;
    isActive : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type OrderStatus = {
    #pending;
    #paid;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type Order = {
    id : Common.ItemId;
    buyerId : Common.UserId;
    sellerId : Common.UserId;
    listingId : Common.ItemId;
    quantity : Nat;
    totalPrice : Nat;
    status : OrderStatus;
    stripeSessionId : Text;
    shippingAddress : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type SellerStats = {
    sellerId : Common.UserId;
    totalListings : Nat;
    totalOrders : Nat;
    totalRevenue : Nat;
    rating : Nat;
  };
};
