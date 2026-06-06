import Common "common";

module {
  public type Festival = {
    id : Common.ItemId;
    name : Text;
    description : Text;
    meaning : Text;
    rituals : [Text];
    celebrationGuide : Text;
    recipes : [Text];
    clothingSuggestions : [Text];
    date : Text;
    region : Text;
    languages : [Text];
    imageUrl : Text;
    createdAt : Common.Timestamp;
  };

  public type FestivalPlan = {
    id : Common.ItemId;
    userId : Common.UserId;
    festivalId : Common.ItemId;
    reminderAt : ?Common.Timestamp;
    familyParticipants : [Text];
    notes : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
