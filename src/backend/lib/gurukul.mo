import GTypes "../types/gurukul";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func addCourse(
    courses : List.List<GTypes.Course>,
    counter : { var val : Nat },
    caller : Common.UserId,
    title : Text,
    description : Text,
    category : GTypes.CourseCategory,
    instructorName : Text,
    price : Nat,
    durationMinutes : Nat,
    isLive : Bool,
    scheduledAt : ?Common.Timestamp,
    maxParticipants : Nat,
    imageUrl : Text,
  ) : GTypes.Course {
    let id = counter.val;
    counter.val += 1;
    let course : GTypes.Course = {
      id;
      title;
      description;
      category;
      instructorId = caller;
      instructorName;
      price;
      durationMinutes;
      isLive;
      scheduledAt;
      maxParticipants;
      imageUrl;
      createdAt = Time.now();
    };
    courses.add(course);
    course;
  };

  public func listCourses(
    courses : List.List<GTypes.Course>,
  ) : [GTypes.Course] {
    courses.toArray();
  };

  public func getCourse(
    courses : List.List<GTypes.Course>,
    id : Common.ItemId,
  ) : ?GTypes.Course {
    courses.find(func(c) { c.id == id });
  };

  // Filter courses by category variant tag text
  public func listByCategory(
    courses : List.List<GTypes.Course>,
    category : Text,
  ) : [GTypes.Course] {
    courses.filter(func(c) {
      switch (c.category) {
        case (#dance) { category == "dance" };
        case (#music) { category == "music" };
        case (#pottery) { category == "pottery" };
        case (#weaving) { category == "weaving" };
        case (#yoga) { category == "yoga" };
        case (#calligraphy) { category == "calligraphy" };
        case (#cooking) { category == "cooking" };
        case (#martialArts) { category == "martialArts" };
        case (#regionalArts) { category == "regionalArts" };
      }
    }).toArray();
  };

  public func enroll(
    enrollments : List.List<GTypes.Enrollment>,
    counter : { var val : Nat },
    caller : Common.UserId,
    courseId : Common.ItemId,
  ) : GTypes.Enrollment {
    let id = counter.val;
    counter.val += 1;
    let enrollment : GTypes.Enrollment = {
      id;
      userId = caller;
      courseId;
      enrolledAt = Time.now();
      completedAt = null;
      certified = false;
      progressPct = 0;
    };
    enrollments.add(enrollment);
    enrollment;
  };

  public func updateEnrollmentProgress(
    enrollments : List.List<GTypes.Enrollment>,
    caller : Common.UserId,
    enrollmentId : Common.ItemId,
    progressPct : Nat,
  ) : ?GTypes.Enrollment {
    var result : ?GTypes.Enrollment = null;
    enrollments.mapInPlace(func(e) {
      if (e.id == enrollmentId and e.userId == caller) {
        let completedAt : ?Common.Timestamp = if (progressPct >= 100) { ?Time.now() } else { e.completedAt };
        let certified = progressPct >= 100;
        let updated = { e with progressPct; completedAt; certified };
        result := ?updated;
        updated;
      } else { e };
    });
    result;
  };

  // Mark enrollment as complete (100%) and issue certificate
  public func completeEnrollment(
    enrollments : List.List<GTypes.Enrollment>,
    caller : Common.UserId,
    enrollmentId : Common.ItemId,
  ) : ?GTypes.Enrollment {
    var result : ?GTypes.Enrollment = null;
    enrollments.mapInPlace(func(e) {
      if (e.id == enrollmentId and e.userId == caller) {
        let updated = { e with progressPct = 100; completedAt = ?Time.now(); certified = true };
        result := ?updated;
        updated;
      } else { e };
    });
    result;
  };

  public func getUserEnrollments(
    enrollments : List.List<GTypes.Enrollment>,
    caller : Common.UserId,
  ) : [GTypes.Enrollment] {
    enrollments.filter(func(e) { e.userId == caller }).toArray();
  };

  public func bookMentor(
    bookings : List.List<GTypes.MentorBooking>,
    counter : { var val : Nat },
    caller : Common.UserId,
    instructorId : Common.UserId,
    scheduledAt : Common.Timestamp,
    durationMinutes : Nat,
    notes : Text,
  ) : GTypes.MentorBooking {
    let id = counter.val;
    counter.val += 1;
    let booking : GTypes.MentorBooking = {
      id;
      userId = caller;
      instructorId;
      scheduledAt;
      durationMinutes;
      notes;
      status = "pending";
      createdAt = Time.now();
    };
    bookings.add(booking);
    booking;
  };

  public func getUserBookings(
    bookings : List.List<GTypes.MentorBooking>,
    caller : Common.UserId,
  ) : [GTypes.MentorBooking] {
    bookings.filter(func(b) { b.userId == caller }).toArray();
  };

  public func cancelBooking(
    bookings : List.List<GTypes.MentorBooking>,
    caller : Common.UserId,
    bookingId : Common.ItemId,
  ) : Bool {
    var found = false;
    bookings.mapInPlace(func(b) {
      if (b.id == bookingId and b.userId == caller) {
        found := true;
        { b with status = "cancelled" };
      } else { b };
    });
    found;
  };
};
