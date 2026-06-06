import Common "common";

module {
  public type TraditionCategory = {
    #recipe;
    #ritual;
    #custom;
    #folkSong;
    #dance;
    #clothing;
    #celebration;
    #spiritualPractice;
  };

  public type TraditionItem = {
    id : Common.ItemId;
    title : Text;
    description : Text;
    category : TraditionCategory;
    region : Text;
    languages : [Text];
    imageUrl : Text;
    steps : [Text];
    tags : [Text];
    createdAt : Common.Timestamp;
  };

  public type UserTraditionPrefs = {
    userId : Common.UserId;
    heritageRegions : [Text];
    heritageLanguages : [Text];
    savedItemIds : [Common.ItemId];
    updatedAt : Common.Timestamp;
  };
};
