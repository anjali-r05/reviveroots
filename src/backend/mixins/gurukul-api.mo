import GTypes "../types/gurukul";
import Common "../types/common";
import GLib "../lib/gurukul";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

mixin (
  courses : List.List<GTypes.Course>,
  enrollments : List.List<GTypes.Enrollment>,
  mentorBookings : List.List<GTypes.MentorBooking>,
  courseCounter : { var val : Nat },
  enrollmentCounter : { var val : Nat },
  bookingCounter : { var val : Nat },
) {

  public shared ({ caller }) func addCourse(
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
  ) : async GTypes.Course {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    GLib.addCourse(courses, courseCounter, caller, title, description, category, instructorName, price, durationMinutes, isLive, scheduledAt, maxParticipants, imageUrl);
  };

  public query func listCourses() : async [GTypes.Course] {
    GLib.listCourses(courses);
  };

  public query func getCourse(id : Common.ItemId) : async ?GTypes.Course {
    GLib.getCourse(courses, id);
  };

  // List courses filtered by category string (e.g. "dance", "music")
  public query func listCoursesByCategory(category : Text) : async [GTypes.Course] {
    GLib.listByCategory(courses, category);
  };

  public shared ({ caller }) func enrollInCourse(courseId : Common.ItemId) : async GTypes.Enrollment {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    GLib.enroll(enrollments, enrollmentCounter, caller, courseId);
  };

  public shared ({ caller }) func updateCourseProgress(
    enrollmentId : Common.ItemId,
    progressPct : Nat,
  ) : async ?GTypes.Enrollment {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    GLib.updateEnrollmentProgress(enrollments, caller, enrollmentId, progressPct);
  };

  // Mark enrollment as complete and issue certificate
  public shared ({ caller }) func completeCourse(enrollmentId : Common.ItemId) : async ?GTypes.Enrollment {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    GLib.completeEnrollment(enrollments, caller, enrollmentId);
  };

  public shared query ({ caller }) func getMyEnrollments() : async [GTypes.Enrollment] {
    if (caller.isAnonymous()) return [];
    GLib.getUserEnrollments(enrollments, caller);
  };

  public shared ({ caller }) func bookMentor(
    instructorId : Common.UserId,
    scheduledAt : Common.Timestamp,
    durationMinutes : Nat,
    notes : Text,
  ) : async GTypes.MentorBooking {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    GLib.bookMentor(mentorBookings, bookingCounter, caller, instructorId, scheduledAt, durationMinutes, notes);
  };

  public shared query ({ caller }) func getMyMentorBookings() : async [GTypes.MentorBooking] {
    if (caller.isAnonymous()) return [];
    GLib.getUserBookings(mentorBookings, caller);
  };

  public shared ({ caller }) func cancelMentorBooking(bookingId : Common.ItemId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    GLib.cancelBooking(mentorBookings, caller, bookingId);
  };
};
