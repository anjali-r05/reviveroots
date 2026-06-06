import LangTypes "../types/language";
import Common "../types/common";
import LangLib "../lib/language";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

mixin (
  langProgress : Map.Map<Common.UserId, LangTypes.LanguageProgress>,
  langLessons : List.List<LangTypes.DailyLesson>,
  lessonCounter : { var val : Nat },
) {

  public shared ({ caller }) func startLanguage(languageChosen : Text) : async LangTypes.LanguageProgress {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    LangLib.upsertProgress(langProgress, caller, languageChosen);
  };

  public shared ({ caller }) func updateLanguageProgress(
    currentLesson : Nat,
    streakDays : Nat,
    wordsLearned : Nat,
    pronunciationScore : Nat,
    conversationLevel : Text,
    scriptsLearned : [Text],
  ) : async ?LangTypes.LanguageProgress {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    LangLib.updateProgress(langProgress, caller, currentLesson, streakDays, wordsLearned, pronunciationScore, conversationLevel, scriptsLearned);
  };

  public shared query ({ caller }) func getLanguageProgress() : async ?LangTypes.LanguageProgress {
    if (caller.isAnonymous()) return null;
    LangLib.getProgress(langProgress, caller);
  };

  public shared ({ caller }) func addLesson(
    language : Text,
    title : Text,
    content : Text,
    audioUrl : Text,
    practiceWords : [Text],
  ) : async LangTypes.DailyLesson {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    LangLib.addLesson(langLessons, lessonCounter, language, title, content, audioUrl, practiceWords);
  };

  public query func getLessonsByLanguage(language : Text) : async [LangTypes.DailyLesson] {
    LangLib.getLessonsByLanguage(langLessons, language);
  };

  public query func getLesson(id : Common.ItemId) : async ?LangTypes.DailyLesson {
    LangLib.getLesson(langLessons, id);
  };

  // Marks a lesson complete, updates streak and word count
  public shared ({ caller }) func completeLesson(
    lessonId : Common.ItemId,
    score : Nat,
  ) : async ?LangTypes.LanguageProgress {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    LangLib.completeLesson(langProgress, langLessons, caller, lessonId, score);
  };
};
