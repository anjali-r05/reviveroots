
import HTypes "types/heritage";
import LangTypes "types/language";
import SKTypes "types/storykeeper";
import TradTypes "types/tradition";
import GTypes "types/gurukul";
import MktTypes "types/marketplace";
import FestTypes "types/festival";
import ARTypes "types/ar";
import Common "types/common";
import UTypes "types/user";

import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

import HeritageMixin "mixins/heritage-api";
import LanguageMixin "mixins/language-api";
import StorykeeperMixin "mixins/storykeeper-api";
import TraditionMixin "mixins/tradition-api";
import GurukulMixin "mixins/gurukul-api";
import MarketplaceMixin "mixins/marketplace-api";
import FestivalMixin "mixins/festival-api";
import ARMixin "mixins/ar-api";
import UserMixin "mixins/user-api";


actor {
  // User Profiles
  let userProfiles = Map.empty<Common.UserId, UTypes.UserProfile>();

  // Heritage Identity Scanner
  let heritageProfiles = Map.empty<Common.UserId, HTypes.HeritageProfile>();

  // Lost Language Revival Engine
  let langProgress = Map.empty<Common.UserId, LangTypes.LanguageProgress>();
  let langLessons = List.empty<LangTypes.DailyLesson>();
  let lessonCounter = { var val : Nat = 0 };

  // AI Storykeeper
  let storyItems = List.empty<SKTypes.StoryItem>();
  let storyTimelines = Map.empty<Common.UserId, SKTypes.FamilyTimeline>();
  let storyCounter = { var val : Nat = 0 };

  // Tradition Recommendation Engine
  let traditions = List.empty<TradTypes.TraditionItem>();
  let traditionPrefs = Map.empty<Common.UserId, TradTypes.UserTraditionPrefs>();
  let traditionCounter = { var val : Nat = 0 };

  // Digital Gurukul
  let courses = List.empty<GTypes.Course>();
  let enrollments = List.empty<GTypes.Enrollment>();
  let mentorBookings = List.empty<GTypes.MentorBooking>();
  let courseCounter = { var val : Nat = 0 };
  let enrollmentCounter = { var val : Nat = 0 };
  let bookingCounter = { var val : Nat = 0 };

  // Heritage Marketplace
  let listings = List.empty<MktTypes.Listing>();
  let orders = List.empty<MktTypes.Order>();
  let listingCounter = { var val : Nat = 0 };
  let orderCounter = { var val : Nat = 0 };

  // Festival Planner AI
  let festivals = List.empty<FestTypes.Festival>();
  let festivalPlans = List.empty<FestTypes.FestivalPlan>();
  let festivalCounter = { var val : Nat = 0 };
  let planCounter = { var val : Nat = 0 };

  // AR Time Travel
  let arCaptures = List.empty<ARTypes.ARCapture>();
  let arCounter = { var val : Nat = 0 };

  // ─── Seed helper: only runs if empty ──────────────────────────────────────

  func seedAll() {
    seedLanguageLessons();
    seedTraditions();
    seedCourses();
    seedListings();
    seedFestivals();
  };

  func seedLanguageLessons() {
    if (langLessons.size() > 0) { return };
    let now = Time.now();
    // Sanskrit lessons
    let s1 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Sanskrit"; lessonNumber = lessonCounter.val; title = "Greetings & Introductions"; content = "Sanskrit, the mother of many Indo-European languages, uses the Devanagari script. Begin with basic greetings: Namaste (नमस्ते) means 'I bow to the divine in you'. The word 'Aham' (अहम्) means 'I', and 'tvam' (त्वम्) means 'you'. Sanskrit sentences follow Subject-Object-Verb order."; audioUrl = ""; practiceWords = ["Namaste", "Aham", "Tvam", "Dhanyavadam", "Shubham", "Priya", "Mitra", "Guru"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(s1);
    let s2 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Sanskrit"; lessonNumber = lessonCounter.val; title = "Numbers & Colors"; content = "Sanskrit numbers follow a logical pattern. Eka (1), Dvi (2), Tri (3), Chatur (4), Pancha (5), Shat (6), Sapta (7), Ashta (8), Nava (9), Dasha (10). Colors: Rakta (red), Nila (blue), Pita (yellow), Shveta (white), Krishna (black). These roots appear in many modern Indian languages."; audioUrl = ""; practiceWords = ["Eka", "Dvi", "Tri", "Pancha", "Dasha", "Rakta", "Nila", "Pita", "Shveta", "Shubhratri"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(s2);
    let s3 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Sanskrit"; lessonNumber = lessonCounter.val; title = "Sacred Mantras & Chants"; content = "Mantras are sacred sound formulas with vibrations believed to carry spiritual energy. 'Om' (ॐ) is the primordial sound of the universe. The Gayatri Mantra is a prayer to the Sun God: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.' Practice chanting each syllable deliberately."; audioUrl = ""; practiceWords = ["Om", "Shanti", "Ahimsa", "Dharma", "Karma", "Yoga", "Moksha", "Atman", "Brahman", "Prana"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(s3);
    // Pali lessons
    let p1 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Pali"; lessonNumber = lessonCounter.val; title = "The Language of the Buddha"; content = "Pali is the liturgical language of Theravada Buddhism. The Buddha taught in Pali-derived dialects. 'Namo Tassa Bhagavato Arahato Samma Sambuddhassa' means 'Homage to the Blessed One, the Worthy One, the Perfectly Enlightened One'. 'Sabbe satta sukhi hontu' means 'May all beings be happy'."; audioUrl = ""; practiceWords = ["Dhamma", "Sangha", "Buddha", "Sila", "Samadhi", "Panna", "Karuna", "Metta", "Anicca", "Dukkha"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(p1);
    let p2 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Pali"; lessonNumber = lessonCounter.val; title = "Basic Meditation Terms"; content = "Pali is rich in mindfulness vocabulary. 'Sati' means mindfulness or awareness. 'Samatha' is calm abiding meditation. 'Vipassana' means insight meditation. 'Anapanasati' is mindfulness of breathing. These terms are used globally in meditation retreats and Buddhist centers."; audioUrl = ""; practiceWords = ["Sati", "Samatha", "Vipassana", "Anapana", "Vedana", "Citta", "Cetana", "Lobha", "Dosa", "Moha"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(p2);
    let p3 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Pali"; lessonNumber = lessonCounter.val; title = "The Four Noble Truths in Pali"; content = "The Cattari Ariya Saccani (Four Noble Truths): 1. Dukkha (suffering/unsatisfactoriness exists), 2. Samudaya (there is a cause of suffering - tanha/craving), 3. Nirodha (cessation of suffering is possible), 4. Magga (there is a path to cessation - the Eightfold Path). These form the foundation of Buddhist teaching."; audioUrl = ""; practiceWords = ["Dukkha", "Tanha", "Nirodha", "Magga", "Nibbana", "Kamma", "Punabbhava", "Sacca", "Ariya", "Magga"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(p3);
    // Aramaic lessons
    let a1 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Aramaic"; lessonNumber = lessonCounter.val; title = "The Language of Jesus"; content = "Aramaic was the spoken language of Jesus Christ and the common tongue of ancient Mesopotamia for over 1000 years. The Lord's Prayer begins in Aramaic as 'Abwun d'bwashmaya' meaning 'Our Father in heaven'. Aramaic uses a right-to-left Syriac script. The word 'Abba' meaning Father is still used in many languages today."; audioUrl = ""; practiceWords = ["Abba", "Shalom", "Maran", "Atha", "Alaha", "Rukha", "Malkuta", "Hayye", "Shmaya", "Araa"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(a1);
    let a2 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Aramaic"; lessonNumber = lessonCounter.val; title = "Sacred Texts & Blessings"; content = "Aramaic appears in portions of the Hebrew Bible (Daniel and Ezra) and the Talmud. The Kaddish prayer, still recited in Jewish services, is primarily in Aramaic: 'Yitgadal v'yitkadash sh'mei raba' - 'May God's great name be exalted and sanctified.' Eastern Christian churches still conduct liturgy in Aramaic dialects."; audioUrl = ""; practiceWords = ["Qaddish", "Shma", "Barakh", "Malka", "Nura", "Mayya", "Lekhma", "Khoba", "Bisha", "Tuba"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(a2);
    let a3 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Aramaic"; lessonNumber = lessonCounter.val; title = "Everyday Phrases & Greetings"; content = "Modern Neo-Aramaic is still spoken by Assyrian and Syriac Christian communities. 'Shlama' means peace/hello. 'Brikh Allaha' means 'God bless you'. 'Tauda' means thank you. The alphabet has 22 consonants and reads right-to-left. Many Aramaic words influenced Arabic, Hebrew, and even English through religious texts."; audioUrl = ""; practiceWords = ["Shlama", "Tauda", "La", "En", "Khaye", "Nasheet", "Bkhaye", "Shlimta", "Brikhta", "Qanta"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(a3);
    // Nahuatl lessons
    let n1 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Nahuatl"; lessonNumber = lessonCounter.val; title = "The Aztec Language"; content = "Nahuatl was the language of the Aztec Empire and is still spoken by 1.7 million people in Mexico. Many English words come from Nahuatl: chocolate (xocolatl), tomato (tomatl), avocado (ahuacatl), chili (chilli). The language uses suffixes to modify meaning: '-tl' makes nouns, '-hua' means 'to have', '-qui' indicates a person doing something."; audioUrl = ""; practiceWords = ["Niltze", "Tlazohcamati", "Cemanahuatl", "Tonatiuh", "Metztli", "Atl", "Tetl", "Calli", "Tlalli", "Xochitl"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(n1);
    let n2 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Nahuatl"; lessonNumber = lessonCounter.val; title = "Aztec Cosmology Vocabulary"; content = "The Aztec worldview was expressed richly in Nahuatl. 'Tlaltecuhtli' is the Earth deity. 'Huitzilopochtli' is the Sun God. 'Quetzalcoatl' means feathered serpent - a deity of wind and wisdom. The calendar system used 'Tonalpohualli' (260-day ritual calendar). 'Cempoallapohualli' is the 365-day solar calendar."; audioUrl = ""; practiceWords = ["Quetzalcoatl", "Tlaloc", "Coatl", "Cuauhtli", "Ocelotl", "Mazatl", "Tochtli", "Atl", "Ehecatl", "Ollin"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(n2);
    let n3 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Nahuatl"; lessonNumber = lessonCounter.val; title = "Food & Daily Life"; content = "Nahuatl vocabulary for daily life is rich and practical. 'Tlaxcalli' is the word for tortilla. 'Tamalli' (tamale) means wrapped food. 'Cacahuatl' is the word for peanut, and 'ahuacatl' for avocado. 'Metl' is agave plant. 'Milpa' refers to the traditional corn-bean-squash polyculture farming system still practiced today."; audioUrl = ""; practiceWords = ["Tlaxcalli", "Tamalli", "Cacahuatl", "Ahuacatl", "Metl", "Ixachi", "Chicoli", "Chilli", "Tomatl", "Xocolatl"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(n3);
    // Quechua lessons
    let q1 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Quechua"; lessonNumber = lessonCounter.val; title = "The Language of the Inca"; content = "Quechua was the official language of the Inca Empire and is still spoken by 10 million people across South America. 'Allillanchu' means 'How are you?', 'Allillanmi' means 'I am fine'. 'Yuspagrasunki' means 'thank you'. Quechua has no written form traditionally - knowledge was preserved through knotted cord devices called 'quipus'."; audioUrl = ""; practiceWords = ["Allillanchu", "Allillanmi", "Rimaykullayki", "Yuspagrasunki", "Inti", "Mama", "Tata", "Wasi", "Rumi", "Yaku"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(q1);
    let q2 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Quechua"; lessonNumber = lessonCounter.val; title = "Nature & The Inca Worldview"; content = "The Inca worldview, called 'Pachamama', centers on Mother Earth. 'Pachamama' means Earth Mother and is still venerated. 'Inti' is the Sun God. 'Mama Quilla' is the Moon Goddess. The Andes landscape is woven into the language: 'Orqo' (mountain), 'Mayu' (river), 'Pampa' (plain), 'Puyu' (cloud). This environmental vocabulary reflects the Inca's deep ecological wisdom."; audioUrl = ""; practiceWords = ["Pachamama", "Inti", "Quilla", "Orqo", "Mayu", "Pampa", "Sapa", "Wira", "Saywa", "Wayna"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(q2);
    let q3 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Quechua"; lessonNumber = lessonCounter.val; title = "Inca Social Structure & Values"; content = "Quechua moral philosophy centers on three principles: 'Ama Sua' (do not steal), 'Ama Llulla' (do not lie), 'Ama Quella' (do not be idle). 'Ayni' means reciprocity and mutual aid - the foundation of Andean community life. 'Minka' is communal work for the community good. 'Llaqta' is the community or town. These values shape Andean societies to this day."; audioUrl = ""; practiceWords = ["Ama", "Ayni", "Minka", "Llaqta", "Ayllu", "Kamayoq", "Hatun", "Uchuy", "Sumaq", "Kusikuy"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(q3);
    // Coptic lessons
    let c1 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Coptic"; lessonNumber = lessonCounter.val; title = "The Last Ancient Egyptian Language"; content = "Coptic is the final stage of the ancient Egyptian language, written using a Greek-derived alphabet with additional characters. It was the daily language of Christian Egypt from the 1st to 17th century and remains the liturgical language of the Coptic Orthodox Church. 'Nai nan' means 'have mercy on us'. 'Khristos aftonf' means 'Christ is risen'."; audioUrl = ""; practiceWords = ["Nai", "Khristos", "Eiooab", "Ekhristos", "Pnouti", "Pikhristos", "Nai nan", "Mariam", "Ioannis", "Pavlos"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(c1);
    let c2 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Coptic"; lessonNumber = lessonCounter.val; title = "Sacred Liturgy & Hymns"; content = "Coptic liturgy preserves melodies unchanged for over 1600 years. The Tasbeha (midnight praise) is sung in Coptic. 'Agios o Theos' (Holy God) is chanted antiphonally. The Coptic alphabet has 32 letters. Ancient Egyptian words like 'Osiris' became 'Ousire' in Coptic, preserving the memory of pharaonic religion within Christian practice."; audioUrl = ""; practiceWords = ["Agios", "Kyrie", "Alleluia", "Amen", "Pistis", "Elpis", "Agape", "Oikonomia", "Liturgia", "Eukharia"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(c2);
    let c3 : LangTypes.DailyLesson = { id = lessonCounter.val; language = "Coptic"; lessonNumber = lessonCounter.val; title = "Everyday Coptic Phrases"; content = "While Coptic is no longer spoken daily, Coptic revival movements teach conversational phrases. 'Khere' means hello (from Greek 'chairete'). 'Akishen' means 'I love you'. 'Oujai' means health/wellness. Connecting with Coptic means connecting with 5000 years of unbroken civilization along the Nile, from hieroglyphics to the present-day Coptic Church."; audioUrl = ""; practiceWords = ["Khere", "Oujai", "Nekhtet", "Nai nan", "Khristos", "Pikhristos", "Ekhristos", "Nai", "Eiooab", "Agios"]; createdAt = now };
    lessonCounter.val += 1;
    langLessons.add(c3);
  };

  func seedTraditions() {
    if (traditions.size() > 0) { return };
    let now = Time.now();
    let items : [(Text, Text, TradTypes.TraditionCategory, Text, [Text], [Text], [Text])] = [
      ("Kolam — Sacred Threshold Art", "Kolam is a traditional South Indian art form drawn with rice flour at the threshold of homes each dawn. It invites Goddess Lakshmi and wards off evil, while also feeding ants and small creatures — a daily ecological act of generosity.", #ritual, "South India", ["Tamil", "Telugu", "Kannada"], ["Wake before sunrise", "Wash the threshold with water", "Draw geometric patterns starting from center", "Use rice flour to allow birds and ants to eat it", "Recite a prayer to Goddess Lakshmi as you complete it"], ["rice flour", "chalk powder", "natural colors"]),
      ("Mehndi — The Art of Henna", "Mehndi (henna) application is an ancient tradition across South Asia, the Middle East, and North Africa. Applied during weddings and festivals, the intricate patterns carry wishes for prosperity, love, and protection. The bride's henna ceremony is believed to deepen the bond between married couples.", #ritual, "South Asia", ["Hindi", "Urdu", "Arabic", "Bengali"], ["Prepare fresh henna paste with lemon juice and eucalyptus oil", "Let it age overnight for deeper color", "Apply using a cone, starting from the fingertips", "Allow to dry completely before peeling", "Apply lemon-sugar mixture to deepen the stain"], ["henna powder", "lemon juice", "eucalyptus oil", "sugar"]),
      ("Bharatanatyam — Temple Dance", "Bharatanatyam is one of the oldest classical dance forms of India, originating in Tamil Nadu temples as a spiritual offering to deities. The dance combines precise footwork (nritta), expressive storytelling (abhinaya), and devotional surrender (bhakti). Each mudra (hand gesture) communicates a precise meaning.", #dance, "Tamil Nadu, India", ["Tamil", "Sanskrit"], ["Learn the basic stance: feet turned out, knees bent (aramandi)", "Master the 28 Asamyuta mudras (single-hand gestures)", "Practice alarippu - the opening invocation", "Study the nine emotions (navarasas)", "Learn to synchronize rhythm with the mridangam drum"], []),
      ("Biryani — The Royal Rice Ceremony", "Biryani is not merely food but a royal culinary tradition born in Mughal courts and Persian caravanserais. Each regional variant — Hyderabadi, Lucknawi, Kolkata, Malabar — carries the cultural fingerprint of its people. The dum cooking technique (slow sealing) was invented to preserve aromas and create a meditative cooking experience.", #recipe, "North India", ["Hindi", "Urdu", "Persian"], ["Marinate meat in yogurt, spices, and saffron for 4+ hours", "Parboil long-grain basmati rice with whole spices", "Layer marinated meat and rice in a heavy pot", "Seal the pot with dough (dum) and cook on low heat", "Garnish with fried onions, saffron milk, and rose water before serving"], ["basmati rice", "saffron", "yogurt", "whole spices", "caramelized onions", "rose water", "ghee"]),
      ("Rangoli — Festival of Colors", "Rangoli is a vibrant floor art tradition created during Diwali, Pongal, and other festivals across India. Each color carries meaning: red for prosperity, yellow for knowledge, white for purity. The patterns geometrically encode sacred mandalas that invite positive cosmic energy into the home.", #celebration, "India", ["Hindi", "Marathi", "Gujarati"], ["Clean and dry the floor area", "Sketch the outer boundary with chalk", "Fill in with colored powder working from center outward", "Add floral motifs around the border", "Light diyas (clay lamps) at the edges after dark"], ["colored powder", "chalk", "flower petals", "diyas"]),
      ("Kathak — The Storytelling Dance", "Kathak is a North Indian classical dance form that evolved in Hindu temples, then flourished in the Mughal courts. The name comes from 'Katha' (story). It uniquely merges Hindu and Muslim artistic traditions, featuring intricate footwork, spinning pirouettes (chakkar), and expressive facial storytelling (abhinaya).", #dance, "North India", ["Hindi", "Urdu", "Brajbhasha"], ["Learn the basic standing position (sam)", "Practice 'tatkaar' (rhythmic footwork) in 3, 5, 7, and 9 beats", "Master the basic hand gestures from Hastas", "Learn the chakkar (spin) while maintaining a fixed spot", "Study thumri compositions for expressive storytelling"], []),
      ("Diwali — The Festival of Lights", "Diwali celebrates the triumph of light over darkness and knowledge over ignorance. It commemorates Lord Rama's return to Ayodhya after 14 years of exile. Families clean homes, draw rangoli, light diyas, exchange sweets, and burst fireworks. Lakshmi Puja is performed at night to invite the Goddess of Prosperity.", #celebration, "India", ["Hindi", "Sanskrit", "Marathi", "Gujarati"], ["Deep clean the home days before Diwali", "Purchase or make clay diyas", "Prepare sweets and savory snacks", "Draw rangoli at threshold and courtyard", "Perform Lakshmi Puja at sunset with incense, flowers, and sweets"], ["diyas", "oil", "rangoli colors", "incense", "sweets", "firecrackers"]),
      ("Eid al-Fitr Feast — Breaking the Fast", "Eid al-Fitr marks the end of Ramadan, the Islamic month of fasting. The tradition begins with Eid prayer at dawn, followed by the exchange of Eid greetings ('Eid Mubarak'), giving Zakat-al-Fitr charity to the poor, and a communal feast. The feast symbolizes gratitude, generosity, and community bonds.", #celebration, "Middle East, South Asia", ["Arabic", "Urdu", "Hindi", "Persian"], ["Give Fitrana (obligatory charity) before Eid prayer", "Wear new or best clothes for the morning prayer", "Greet everyone with 'Eid Mubarak'", "Visit relatives and share special foods", "Give gifts and sweets (particularly sheer khurma or sevai) to children"], ["dates", "sheer khurma (vermicelli milk pudding)", "biryani", "haleem", "shami kebab"]),
      ("Día de los Muertos — Day of the Dead", "Día de los Muertos is a Mexican tradition blending Aztec death rituals with Catholic All Saints Day. Families build ofrendas (altars) with marigold flowers, photographs, favorite foods, candles, and mementos of deceased relatives. It is a joyful celebration — the dead are welcomed home, not mourned.", #celebration, "Mexico", ["Spanish", "Nahuatl"], ["Build an ofrenda (altar) with multiple levels", "Place photos of deceased ancestors prominently", "Offer their favorite foods, drinks, and objects", "String marigold flowers (cempasúchil) to guide spirits home", "Visit cemeteries to clean and decorate graves with flowers and candles"], ["marigold flowers", "candles", "incense (copal)", "pan de muerto", "sugar skulls", "photos"]),
      ("Chinese Tea Ceremony", "The Chinese Gongfu tea ceremony is a meditative practice of preparing and serving tea with focused attention and respect. It developed during the Tang Dynasty (618-907 CE). The ceremony uses a Yixing clay teapot, tea tray, and small cups. Each gesture — warming the pot, pouring precisely, serving elders first — is an expression of mindfulness and hospitality.", #ritual, "China", ["Mandarin", "Cantonese"], ["Heat water to the right temperature for the tea type", "Warm the teapot and cups with hot water", "Add tea leaves (1 teaspoon per cup)", "Pour water in a circular motion", "Serve elders first, holding the cup with both hands"], ["Oolong tea", "Yixing clay teapot", "tea tray", "small tea cups", "tea towel"]),
      ("Japanese Ikebana — Living Flower Arrangement", "Ikebana is the Japanese art of flower arrangement dating to the 6th century. Unlike Western floral arrangement that focuses on beauty, Ikebana seeks to express the connection between human, nature, and heaven through asymmetric compositions. The three main elements represent Heaven (shin), Earth (hikae), and Humanity (soe).", #custom, "Japan", ["Japanese"], ["Choose seasonal materials: branches, leaves, flowers", "Cut stems diagonally for better water absorption", "Establish the Shin (tallest element) at the center-back", "Place Soe (second element) at a 45-degree angle to the left", "Add Hikae (lowest element) forward and slightly right"], ["seasonal flowers", "branches", "kenzan (pin frog)", "ikebana vase", "water"]),
      ("Whirling Dervishes — Sufi Sacred Rotation", "The Sema ceremony of Sufi whirling dervishes originated with the 13th-century Persian poet Rumi in Konya, Turkey. The dervishes (Semazens) whirl counterclockwise, right hand raised to receive divine blessings, left hand lowered to transmit them to earth. The spinning represents the soul's journey toward divine union and cosmic truth.", #spiritualPractice, "Turkey, Egypt", ["Arabic", "Persian", "Turkish"], ["Wear the traditional white tennure (skirt) and sikkeh (tall felt hat)", "Begin with a prayer and bowing", "Start the rotation slowly, gradually increasing speed", "Right hand raised toward heaven, left hand toward earth", "Continue for 15-20 minutes in meditative state"], []),
    ];
    for ((title, description, category, region, languages, steps, tags) in items.vals()) {
      let id = traditionCounter.val;
      traditionCounter.val += 1;
      let item : TradTypes.TraditionItem = { id; title; description; category; region; languages; imageUrl = ""; steps; tags; createdAt = now };
      traditions.add(item);
    };
  };

  func seedCourses() {
    if (courses.size() > 0) { return };
    let now = Time.now();
    let systemId = Principal.fromText("2vxsx-fae");
    let courseData : [(Text, Text, GTypes.CourseCategory, Text, Nat, Nat, Bool)] = [
      ("Classical Bharatanatyam", "Learn the ancient temple dance of South India from a certified Natya Shastra scholar. This course covers alarippu, jatiswaram, sabdam, varnam, padam, and tillana — the complete margam sequence.", #dance, "Padma Subramaniam", 2500, 1200, true),
      ("Tabla Drumming — Beginner to Intermediate", "Master the sacred rhythm instrument of North Indian classical music. Learn theka patterns for Teentaal, Ektaal, and Rupak taal. Understand the philosophy of sound (nada) as spiritual practice.", #music, "Ustad Zakir Ali", 1800, 960, false),
      ("Sanskrit Calligraphy & Script", "Learn the Devanagari script from its geometric foundations. This course teaches proper letterform construction, spacing, and proportion using traditional reed pens. Students will write Sanskrit shlokas and sacred mantras.", #calligraphy, "Dr. Ananda Sharma", 1200, 600, false),
      ("Pottery & Terracotta Craft", "Discover the 5000-year-old craft tradition of hand-thrown pottery. Learn coiling, pinching, wheel throwing, and low-temperature firing techniques. Create ceremonial vessels, diyas, and decorative items.", #pottery, "Suresh Prajapati", 900, 720, true),
      ("Yoga & Pranayama Immersion", "A deep dive into classical Hatha and Ashtanga Yoga from the Krishnamacharya lineage. Learn asana sequences, breathing techniques (pranayama), mudras, bandhas, and yoga philosophy from Patanjali's Yoga Sutras.", #yoga, "Swami Govindananda", 3000, 2400, true),
      ("Batik & Natural Dyeing", "Explore the ancient wax-resist dyeing tradition found across India, Indonesia, and Africa. Learn to prepare natural dyes from turmeric, indigo, pomegranate, and madder. Create batik patterns on silk and cotton using traditional tjanting tools.", #weaving, "Maya Krishnaswamy", 1500, 840, false),
      ("Kalaripayattu Martial Arts", "Learn the world's oldest martial art from Kerala, India. Kalaripayattu ('kalarippayattu') predates kung fu by centuries. This course covers body conditioning, 18-weapon training, and the healing marma point system.", #martialArts, "Gurukkal Rajeev Nair", 2000, 1080, true),
      ("Madhubani Painting Workshop", "Master the ancient Bihar folk art tradition passed through generations of women in the Mithila region. Learn geometric patterns, natural color preparation from plants and minerals, and storytelling through the distinctive Madhubani visual language.", #regionalArts, "Sita Devi Apprentice", 800, 540, false),
    ];
    for ((title, description, category, instructorName, price, durationMinutes, isLive) in courseData.vals()) {
      let id = courseCounter.val;
      courseCounter.val += 1;
      let course : GTypes.Course = { id; title; description; category; instructorId = systemId; instructorName; price; durationMinutes; isLive; scheduledAt = null; maxParticipants = 30; imageUrl = ""; createdAt = now };
      courses.add(course);
    };
  };

  func seedListings() {
    if (listings.size() > 0) { return };
    let now = Time.now();
    let systemId = Principal.fromText("2vxsx-fae");
    let listingData : [(Text, Text, Nat, MktTypes.ProductCategory, Text)] = [
      ("Handwoven Pashmina Shawl", "Ultra-fine 100% pure Pashmina wool from Ladakhi mountain goats. Hand-spun and woven by master weavers in Kashmir using traditional frame looms. Each shawl takes 72 hours to complete. Intricate Paisley embroidery in gold thread.", 85, #textile, "Kashmir, India"),
      ("Brass Dhokra Figurine — Dancing Goddess", "Lost-wax cast brass sculpture using the ancient Dhokra technique of tribal artisans from Chhattisgarh and West Bengal. This 2500-year-old casting method creates unique, non-reproducible pieces. Depicts a tribal dancing goddess with ceremonial jewelry.", 45, #craft, "Chhattisgarh, India"),
      ("Madhubani Painting — Tree of Life", "Original hand-painted Madhubani artwork on handmade paper by a certified Mithila artist. Uses natural colors extracted from plants, minerals, and cow dung. The Tree of Life motif symbolizes ancestral connection across generations.", 120, #art, "Bihar, India"),
      ("Hand-Painted Blue Pottery Vase", "Traditional Jaipur Blue Pottery using quartz stone powder, glass, multani mitti, and Katira gum. Glazed in signature cobalt blue with Persian floral motifs. No clay used — a 300-year-old Mughal craft tradition.", 35, #craft, "Rajasthan, India"),
      ("Banarasi Silk Saree — Zari Brocade", "Handwoven on traditional Jacquard looms in Varanasi by master weavers. Pure Katan silk with real silver and gold zari (metallic thread) creating intricate Mughal-era floral brocade. Takes 15-30 days to weave one saree.", 250, #textile, "Varanasi, India"),
      ("Khadi Cotton Kurta — Hand-spun", "Made from hand-spun, hand-woven Khadi cotton on traditional charkha spinning wheels. A fabric with spiritual and political heritage — Gandhi's symbol of Indian self-reliance. Natural vegetable dyed in earthy indigo and turmeric tones.", 28, #textile, "Gujarat, India"),
      ("Tribal Dokra Necklace — Sun Goddess", "Handmade statement necklace using Dokra (lost-wax) casting by Kondh tribal artisans of Odisha. Features the Sun Goddess motif with geometric tribal patterns. No two pieces are identical. Ethically sourced brass, handfinished.", 55, #jewelry, "Odisha, India"),
      ("Handmade Bamboo Bansuri Flute", "Concert-grade bamboo flute (bansuri) crafted from aged bamboo by master craftsmen in Vrindavan — the sacred city of Lord Krishna. G-scale, 6 holes, tuned to precise Indian classical frequencies. Used in Hindustani classical music performances.", 40, #instrument, "Uttar Pradesh, India"),
      ("Rajasthani Leather Mojari Shoes", "Traditional hand-stitched leather footwear from Jodhpur, with pointed curled toe and embroidered upper using thread, mirrors, and beadwork. Technique unchanged for 500 years. Worn by Rajput royalty and now by heritage fashion enthusiasts globally.", 30, #artisanProduct, "Rajasthan, India"),
      ("Sandalwood Hand-Carved Box", "Intricately carved sandalwood jewelry box from Mysore, a center of sandalwood craft for 400 years. The fragrance naturally lasts for decades. Features floral and elephant motifs hand-carved by artisans trained in traditional Karnataka craft schools.", 65, #craft, "Karnataka, India"),
    ];
    for ((title, description, price, category, region) in listingData.vals()) {
      let id = listingCounter.val;
      listingCounter.val += 1;
      let listing : MktTypes.Listing = { id; sellerId = systemId; title; description; price; category; imageUrls = []; stock = 10; region; isActive = true; createdAt = now; updatedAt = now };
      listings.add(listing);
    };
  };

  func seedFestivals() {
    if (festivals.size() > 0) { return };
    let now = Time.now();
    let festData : [(Text, Text, Text, Text, [Text], Text, [Text], [Text], Text, [Text])] = [
      ("Diwali", "South Asia", "The Festival of Lights celebrating the triumph of light over darkness and Lord Rama's return to Ayodhya after 14 years of exile. One of the largest and most joyous festivals in the world, celebrated by over 1 billion people.", "Victory of good over evil, homecoming of dharma, and welcoming Goddess Lakshmi of prosperity", ["Light diyas and candles in every room", "Draw rangoli designs at the threshold", "Perform Lakshmi Puja at sunset", "Exchange sweets and gifts with family and neighbors", "Burst safe fireworks or watch community displays", "Donate to the poor (daan)"], "Clean the home thoroughly. Create a rangoli design at your entrance. Light 108 diyas at dusk. Perform puja with incense, flowers, and sweets. Share homemade sweets with neighbors. Watch or participate in community fireworks.", ["Kaju Katli (cashew fudge)", "Gulab Jamun", "Besan Ladoo", "Jalebi", "Kheer"], ["Men: Kurta Pajama or Dhoti Kurta in gold and maroon", "Women: Silk saree or lehenga in jewel tones — red, green, gold", "Children: Traditional Indian wear with diyas and sparklers motifs"], "October/November — Amavasya (new moon) of Kartik month", ["Hindi", "Marathi", "Gujarati", "Tamil", "Telugu"]),
      ("Holi", "North India", "The Festival of Colors celebrating spring, love, and the victory of devotee Prahlada over his demoness aunt Holika. Also associated with the playful love of Krishna and Radha. Communities gather to drench each other in colored powder and water.", "Arrival of spring, victory of devotion over evil, and the boundless play (leela) of divine love", ["Holika Dahan bonfire the night before", "Apply gulal (dry color) to loved ones", "Drench friends with water guns and water balloons", "Sing and dance to Holi songs (Hori)", "Share thandai (milk drink) and sweets", "Visit temples decorated with spring flowers"], "Gather with family and friends outdoors. Start with dry gulal, then water colors. Sing Hori songs. End with a feast of gujiya, thandai, and puran poli. Take a purifying bath and wear new clothes for the evening prayers.", ["Gujiya (sweet dumplings)", "Thandai (spiced milk)", "Puran Poli", "Malpua", "Dahi Vada"], ["Wear white clothes to best show the colors", "Comfortable clothes you don't mind staining", "Traditional Indian kurta and churidar"], "March — Purnima (full moon) of Phalguna month", ["Hindi", "Brajbhasha", "Sanskrit"]),
      ("Eid al-Fitr", "Middle East, South Asia", "The 'Festival of Breaking the Fast' marks the end of Ramadan, the Islamic holy month of fasting. Muslims worldwide celebrate with Eid prayer, charitable giving (Zakat), new clothes, feasting, and family gatherings. 'Eid Mubarak' (Blessed Festival) is exchanged as a greeting.", "Gratitude for completing Ramadan, community unity, and the joy of divine mercy", ["Give Zakat al-Fitr (charity) before Eid prayer", "Perform Eid prayer in congregation at dawn", "Greet everyone with 'Eid Mubarak'", "Wear new or best clothes", "Visit relatives and exchange gifts", "Share a festive meal with family"], "Wake before dawn for Suhoor if in Ramadan, then prepare for Eid. Dress in your finest. Attend Eid prayer in the community. Embrace loved ones and share the greeting 'Eid Mubarak'. Distribute sweets to neighbors and give gifts to children.", ["Sheer Khurma (vermicelli milk pudding)", "Biryani", "Haleem", "Semai", "Mutton Kebabs", "Baklava"], ["Men: White or light-colored kurta, sherwani, or thobe", "Women: Embroidered salwar kameez, abaya with lace, or festive hijab", "Children: New clothes in bright, festive colors"], "End of Ramadan — Shawwal 1 (Islamic calendar)", ["Arabic", "Urdu", "Hindi", "Persian", "Malay"]),
      ("Pongal", "Tamil Nadu, India", "A four-day harvest festival thanking the Sun God (Surya), cattle, and nature for a bountiful harvest. Pongal means 'overflow' — sweet rice is cooked in new clay pots until it boils over, symbolizing abundance and prosperity. One of Tamil Nadu's oldest and most important festivals.", "Gratitude for harvest, reverence for cattle and nature, welcoming of the sun's northward journey", ["Prepare the traditional Pongal dish outdoors", "Decorate the entrance with fresh kolam", "Adorning cattle with garlands and painting their horns (Mattu Pongal)", "Burn old items to release the past", "Exchange sweets and visit relatives"], "Draw fresh kolam at dawn with rice flour. Cook the Pongal dish in a clay pot, letting it overflow as you chant 'Pongalo Pongal!'. Offer it first to the Sun. Decorate and honor cattle. Visit relatives and exchange traditional sweets.", ["Sweet Pongal (chakkarai pongal)", "Ven Pongal (savory pongal)", "Sugarcane pieces", "Banana", "Coconut", "Jaggery sweets"], ["Traditional silk saree for women in yellow or orange", "Dhoti and veshti for men", "Fresh jasmine flowers in hair for women"], "January 14-17 (Makara Sankranti period)", ["Tamil", "Sanskrit"]),
      ("Onam", "Kerala, India", "A 10-day harvest festival celebrating the return of the mythical King Mahabali from the underworld to visit his beloved people. Celebrated with flower carpets (pookalam), boat races (Vallam Kali), the Onam Sadya (feast of 26+ dishes on banana leaf), and Kathakali performances.", "The just and golden rule of King Mahabali, harvest gratitude, and the return of prosperity", ["Create the Pookalam flower carpet at entrance", "Prepare or attend the Onam Sadya (26-course feast)", "Watch or participate in Vallamkali (snake boat races)", "Wear Kasavu saree (Kerala traditional white and gold)", "Perform Thiruvathira Kali (group dance)"], "Begin with the pookalam — arrange concentric rings of flowers each morning for 10 days. On Thiruvonam (main day), seat all family on the floor in rows and serve the grand Onam Sadya on banana leaves. Wear traditional Kerala white and gold.", ["Avial", "Thorans", "Olan", "Pulissery", "Payasam (3 types)", "Ada pradhaman", "Kaalan", "Pachadi"], ["Traditional Kerala Kasavu saree (white with gold zari border) for women", "White dhoti with kasavu border for men"], "August/September — Thiruvonam asterism", ["Malayalam", "Sanskrit"]),
      ("Navratri", "Gujarat, India", "Nine nights of worship dedicated to the nine forms of Goddess Durga. In Gujarat, celebrated with the spectacular Garba and Dandiya Raas dances. Fasting, prayer, and community dance create a joyful, spiritually charged atmosphere. Culminates in Dussehra, the victory of Rama over Ravana.", "Worship of the Divine Feminine in nine forms, inner transformation, and victory of virtue", ["Fast or eat sattvic (pure) food during the nine days", "Set up a Navratri altar with Goddess idols and marigolds", "Play Garba in the evening — circular dance honoring the Goddess", "On Ashtami: Perform kanya puja (worship of young girls as Goddess)", "Break fast on Vijaya Dashami (Dussehra)"], "Set up a Mata ni Chowk (Goddess altar) with flowers and lamps. Each evening, perform aarti (lamp ceremony). Join community Garba events wearing traditional chania choli. Fast or eat vrat food. On Ashtami, feed and honor nine young girls as manifestations of Goddess.", ["Sabudana Khichdi (tapioca pilaf)", "Kuttu Puri (buckwheat bread)", "Samak Rice", "Singhare Halwa", "Fruit prasad"], ["Women: Chania Choli (lehenga) in vibrant colors with mirror-work", "Men: Kediyu (gathered top) and Dhoti with colorful turbans", "Both: Bangles, payals (ankle bells), and traditional jewelry"], "September/October — Ashwin Navratri", ["Gujarati", "Sanskrit", "Hindi"]),
      ("Dussehra", "India", "Dussehra (Vijayadashami) marks the victory of Lord Rama over the ten-headed demon king Ravana — symbolizing the victory of virtue over evil. Huge effigies of Ravana, Kumbhakarna, and Meghanada are burned. In Mysore, a royal procession with a gold-adorned elephant marks this festival as a state celebration.", "Victory of righteousness over the ten vices represented by Ravana's ten heads", ["Watch or participate in Ramleela (dramatic enactment of Ramayana)", "Attend the Ravana effigy burning ceremony at dusk", "Perform Ayudha Puja (worship of tools and weapons)", "Exchange gifts of leaves (shami, apta) as gold symbols", "In Mysore, witness the grand royal procession"], "Visit the Ramleela grounds or watch it on television with family. As dusk falls, gather at the burning grounds. Watch the effigies burn in the night sky while chanting 'Jai Sri Ram'. Exchange shami leaves as symbols of golden fortune with neighbors and relatives.", ["Jalebi", "Kheer", "Puri Sabzi", "Shankharpali", "Besan Ladoo"], ["Traditional Indian wear in saffron, red, and gold", "Kurta Pajama for men", "Salwar Kameez or saree for women"], "October — Vijaya Dashami", ["Hindi", "Sanskrit", "Kannada"]),
      ("Makar Sankranti", "India", "A harvest festival celebrating the sun's transition into Capricorn (Makara), marking the end of winter and beginning of longer days. Celebrated with kite flying, bathing in sacred rivers, Til-Gul (sesame-jaggery) exchange, and bonfires. Called Pongal in Tamil Nadu, Lohri in Punjab, Uttarayan in Gujarat.", "Solar transition, harvest gratitude, end of inauspicious period, and community renewal", ["Bathe in a sacred river (or simply at dawn)", "Fly kites with family and friends (in Gujarat)", "Prepare and share Til-Gul (sesame-jaggery sweets)", "Light a bonfire and sing folk songs (in Punjab)", "Donate sesame seeds and blankets to the poor"], "Wake at dawn and take a purifying bath. Prepare Til-Gul sweets and exchange them with the saying 'Til-Gul ghya, god god bola' (Take sesame-jaggery and speak sweetly). Fly kites from the terrace. In the evening, gather around a bonfire and sing harvest songs.", ["Til-Gul (sesame-jaggery balls)", "Khichdi", "Puran Poli", "Chikki (peanut brittle)", "Lohri Rewri (sesame candy)"], ["Warm traditional wear — wool shawls, warm kurtas", "Women: Colorful Punjab suits with phulkari embroidery", "Men: Warm dhoti-kurta or traditional regional attire"], "January 14", ["Hindi", "Gujarati", "Marathi", "Punjabi", "Sanskrit"]),
      ("Baisakhi", "Punjab, India", "Baisakhi marks the Sikh New Year and the harvest festival of the Punjab region. It commemorates the founding of the Khalsa Panth by Guru Gobind Singh Ji in 1699. Celebrated with Bhangra and Gidda folk dances, langar (community feast), and processions led by the Guru Granth Sahib.", "Sikh New Year, founding of the Khalsa brotherhood, harvest celebration, and community service (seva)", ["Visit the Gurdwara for morning prayers and Ardas", "Participate in community langar (free kitchen for all)", "Watch or perform Bhangra and Gidda folk dances", "Join the Nagar Kirtan (religious procession)", "Wear the five Ks (Panj Kakars) if Khalsa Sikh"], "Attend the morning Gurdwara service and listen to Gurbani kirtan. Participate in langar — serve food or eat together with all communities. In the evening, attend the Bhangra and Gidda performances. Wear traditional Punjabi attire in bright colors.", ["Karah Prasad (semolina halwa)", "Dal Makhani", "Sarson Da Saag", "Makki Di Roti", "Lassi", "Langar Khichdi"], ["Men: Kurta, churidar, colorful turban (dastar) and traditional Punjabi mojaris", "Women: Phulkari embroidered salwar kameez in bright colors", "Traditional Bhangra/Gidda costume for performers"], "April 13-14", ["Punjabi", "Gurmukhi", "Hindi"]),
      ("Vesak — Buddha Purnima", "South and Southeast Asia", "Vesak (Buddha Purnima) commemorates the birth, enlightenment, and passing (parinirvana) of Gautama Buddha — all three believed to have occurred on the full moon of the Vesak month. Celebrated in India, Sri Lanka, Thailand, Myanmar, Nepal, and across Southeast Asia with lamp offerings, prayer, and meditation.", "The three jewels: the Buddha (teacher), Dhamma (teaching), and Sangha (community); and the path to liberation from suffering", ["Visit Buddhist temples and monasteries", "Offer flowers, incense, and lamps at shrines", "Listen to Dhamma talks and meditation teachings", "Participate in candlelight processions", "Practice dana (generosity) by feeding the poor", "Observe the Five Precepts strictly on this day"], "Begin with a temple visit and offering of flowers, incense, and a lit lamp at the Buddha image. Listen to a Dhamma talk. Participate in the evening candlelight procession around the temple. Practice meditation, observe noble silence for a period, and practice dana by donating food to monks and the poor.", ["Kheer (sweet rice pudding)", "Modak", "Fruit offerings", "Vegetarian feast", "Lotus flowers (symbolic)"], ["Pure white or light-colored clothing symbolizing purity", "Monks: Saffron robes", "Laypeople: Simple, modest, white or cream traditional dress"], "May — Vesak Purnima (Full Moon)", ["Pali", "Sanskrit", "Sinhala", "Burmese", "Thai"]),
    ];
    for ((name, region, description, meaning, rituals, guide, recipes, clothingSuggestions, date, languages) in festData.vals()) {
      let id = festivalCounter.val;
      festivalCounter.val += 1;
      let fest : FestTypes.Festival = { id; name; description; meaning; rituals; celebrationGuide = guide; recipes; clothingSuggestions; date; region; languages; imageUrl = ""; createdAt = now };
      festivals.add(fest);
    };
  };

  // Seed on first initialization
  do {
    seedAll();
  };

  include HeritageMixin(heritageProfiles);
  include LanguageMixin(langProgress, langLessons, lessonCounter);
  include StorykeeperMixin(storyItems, storyTimelines, storyCounter);
  include TraditionMixin(traditions, traditionPrefs, traditionCounter);
  include GurukulMixin(courses, enrollments, mentorBookings, courseCounter, enrollmentCounter, bookingCounter);
  include MarketplaceMixin(listings, orders, listingCounter, orderCounter);
  include FestivalMixin(festivals, festivalPlans, festivalCounter, planCounter);
  include ARMixin(arCaptures, arCounter);
  include UserMixin(userProfiles, heritageProfiles, langProgress, storyItems, arCaptures, enrollments, orders, festivalPlans);
};
