import Common "common";

module {
  public type LanguageProgress = {
    userId : Common.UserId;
    languageChosen : Text;
    currentLesson : Nat;
    streakDays : Nat;
    wordsLearned : Nat;
    pronunciationScore : Nat;
    conversationLevel : Text;
    scriptsLearned : [Text];
    totalLessonsCompleted : Nat;
    lastActiveAt : Common.Timestamp;
    startedAt : Common.Timestamp;
  };

  public type DailyLesson = {
    id : Common.ItemId;
    language : Text;
    lessonNumber : Nat;
    title : Text;
    content : Text;
    audioUrl : Text;
    practiceWords : [Text];
    createdAt : Common.Timestamp;
  };
};
