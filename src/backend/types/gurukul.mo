import Common "common";

module {
  public type CourseCategory = {
    #dance;
    #music;
    #pottery;
    #weaving;
    #yoga;
    #calligraphy;
    #cooking;
    #martialArts;
    #regionalArts;
  };

  public type Course = {
    id : Common.ItemId;
    title : Text;
    description : Text;
    category : CourseCategory;
    instructorId : Common.UserId;
    instructorName : Text;
    price : Nat;
    durationMinutes : Nat;
    isLive : Bool;
    scheduledAt : ?Common.Timestamp;
    maxParticipants : Nat;
    imageUrl : Text;
    createdAt : Common.Timestamp;
  };

  public type Enrollment = {
    id : Common.ItemId;
    userId : Common.UserId;
    courseId : Common.ItemId;
    enrolledAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    certified : Bool;
    progressPct : Nat;
  };

  public type MentorBooking = {
    id : Common.ItemId;
    userId : Common.UserId;
    instructorId : Common.UserId;
    scheduledAt : Common.Timestamp;
    durationMinutes : Nat;
    notes : Text;
    status : Text;
    createdAt : Common.Timestamp;
  };
};
