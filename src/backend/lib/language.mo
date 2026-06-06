import LangTypes "../types/language";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func upsertProgress(
    store : Map.Map<Common.UserId, LangTypes.LanguageProgress>,
    caller : Common.UserId,
    languageChosen : Text,
  ) : LangTypes.LanguageProgress {
    let now = Time.now();
    switch (store.get(caller)) {
      case (?existing) {
        let updated = { existing with languageChosen; lastActiveAt = now };
        store.add(caller, updated);
        updated;
      };
      case null {
        let fresh : LangTypes.LanguageProgress = {
          userId = caller;
          languageChosen;
          currentLesson = 0;
          streakDays = 0;
          wordsLearned = 0;
          pronunciationScore = 0;
          conversationLevel = "Beginner";
          scriptsLearned = [];
          totalLessonsCompleted = 0;
          lastActiveAt = now;
          startedAt = now;
        };
        store.add(caller, fresh);
        fresh;
      };
    };
  };

  public func updateProgress(
    store : Map.Map<Common.UserId, LangTypes.LanguageProgress>,
    caller : Common.UserId,
    currentLesson : Nat,
    streakDays : Nat,
    wordsLearned : Nat,
    pronunciationScore : Nat,
    conversationLevel : Text,
    scriptsLearned : [Text],
  ) : ?LangTypes.LanguageProgress {
    let now = Time.now();
    switch (store.get(caller)) {
      case (?existing) {
        let updated = {
          existing with
          currentLesson;
          streakDays;
          wordsLearned;
          pronunciationScore;
          conversationLevel;
          scriptsLearned;
          lastActiveAt = now;
        };
        store.add(caller, updated);
        ?updated;
      };
      case null { null };
    };
  };

  public func getProgress(
    store : Map.Map<Common.UserId, LangTypes.LanguageProgress>,
    caller : Common.UserId,
  ) : ?LangTypes.LanguageProgress {
    store.get(caller);
  };

  public func addLesson(
    lessons : List.List<LangTypes.DailyLesson>,
    counter : { var val : Nat },
    language : Text,
    title : Text,
    content : Text,
    audioUrl : Text,
    practiceWords : [Text],
  ) : LangTypes.DailyLesson {
    let id = counter.val;
    counter.val += 1;
    let lesson : LangTypes.DailyLesson = {
      id;
      language;
      lessonNumber = id;
      title;
      content;
      audioUrl;
      practiceWords;
      createdAt = Time.now();
    };
    lessons.add(lesson);
    lesson;
  };

  public func getLessonsByLanguage(
    lessons : List.List<LangTypes.DailyLesson>,
    language : Text,
  ) : [LangTypes.DailyLesson] {
    lessons.filter(func(l) { l.language == language }).toArray();
  };

  public func getLesson(
    lessons : List.List<LangTypes.DailyLesson>,
    id : Common.ItemId,
  ) : ?LangTypes.DailyLesson {
    lessons.find(func(l) { l.id == id });
  };

  // Marks a lesson as completed, updates streak and word count
  public func completeLesson(
    store : Map.Map<Common.UserId, LangTypes.LanguageProgress>,
    lessons : List.List<LangTypes.DailyLesson>,
    caller : Common.UserId,
    lessonId : Common.ItemId,
    score : Nat,
  ) : ?LangTypes.LanguageProgress {
    let now = Time.now();
    switch (store.get(caller)) {
      case null { null };
      case (?existing) {
        switch (lessons.find(func(l) { l.id == lessonId })) {
          case null { null };
          case (?lesson) {
            let newWordsLearned = existing.wordsLearned + lesson.practiceWords.size();
            let newTotalCompleted = existing.totalLessonsCompleted + 1;
            let newCurrentLesson = existing.currentLesson + 1;
            let newLevel = if (newTotalCompleted >= 30) {
              "Advanced"
            } else if (newTotalCompleted >= 15) {
              "Intermediate"
            } else {
              "Beginner"
            };
            let updated : LangTypes.LanguageProgress = {
              existing with
              currentLesson = newCurrentLesson;
              totalLessonsCompleted = newTotalCompleted;
              wordsLearned = newWordsLearned;
              pronunciationScore = score;
              conversationLevel = newLevel;
              lastActiveAt = now;
            };
            store.add(caller, updated);
            ?updated;
          };
        };
      };
    };
  };
};
