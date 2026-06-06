import Types "../types/heritage";
import Common "../types/common";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  public func upsert(
    store : Map.Map<Common.UserId, Types.HeritageProfile>,
    caller : Common.UserId,
    surname : Text,
    region : Text,
    language : Text,
    familyBackground : Text,
    grandparentsOrigin : Text,
    ancestryInsights : Text,
    migrationStory : Text,
    forgottenCustoms : [Text],
    traditionalOccupations : [Text],
    festivals : [Text],
    foods : [Text],
  ) : Types.HeritageProfile {
    let now = Time.now();
    let profile = switch (store.get(caller)) {
      case (?existing) {
        let updated = {
          existing with
          surname;
          region;
          language;
          familyBackground;
          grandparentsOrigin;
          ancestryInsights;
          migrationStory;
          forgottenCustoms;
          traditionalOccupations;
          festivals;
          foods;
          updatedAt = now;
        };
        store.add(caller, updated);
        updated;
      };
      case null {
        let newProfile = {
          userId = caller;
          surname;
          region;
          language;
          familyBackground;
          grandparentsOrigin;
          ancestryInsights;
          migrationStory;
          forgottenCustoms;
          traditionalOccupations;
          festivals;
          foods;
          createdAt = now;
          updatedAt = now;
        };
        store.add(caller, newProfile);
        newProfile;
      };
    };
    profile;
  };

  public func get(
    store : Map.Map<Common.UserId, Types.HeritageProfile>,
    caller : Common.UserId,
  ) : ?Types.HeritageProfile {
    store.get(caller);
  };

  public func delete(
    store : Map.Map<Common.UserId, Types.HeritageProfile>,
    caller : Common.UserId,
  ) {
    store.remove(caller);
  };

  // Generates deterministic ancestry insights based on region/language/surname
  public func generateInsights(input : Types.HeritageInput) : Types.AncestryInsights {
    let regionLower = input.region.toLower();
    let langLower = input.language.toLower();
    let _surnameLower = input.surname.toLower();

    // Indian subcontinent
    if (
      regionLower.contains(#text "india") or
      regionLower.contains(#text "nepal") or
      regionLower.contains(#text "sri lanka") or
      regionLower.contains(#text "bangladesh") or
      langLower.contains(#text "sanskrit") or
      langLower.contains(#text "hindi") or
      langLower.contains(#text "tamil") or
      langLower.contains(#text "bengali") or
      langLower.contains(#text "telugu") or
      langLower.contains(#text "kannada") or
      langLower.contains(#text "malayalam") or
      langLower.contains(#text "marathi") or
      langLower.contains(#text "gujarati") or
      langLower.contains(#text "punjabi")
    ) {
      return {
        migrationStory = "Your ancestors were part of the ancient Indus Valley civilization, one of the world's earliest urban cultures. Around 1500 BCE, the Vedic migrations brought Sanskrit-speaking peoples southward. Over centuries, your family lineage expanded across the subcontinent — following trade routes along the Silk Road, river valleys, and coastal maritime paths. The surname '" # input.surname # "' reflects ancestral clan identity (gotra) tracing back to a revered sage or geographic homeland.";
        forgottenCustoms = [
          "Performing Navagraha puja (nine-planet worship) before major life events",
          "Drawing intricate kolam patterns at the doorstep each dawn as auspicious welcome",
          "The tradition of Annaprashan (first rice feeding) ceremony for infants",
          "Reciting ancestral gotra lineage during sacred ceremonies",
          "Applying sindoor paste to the threshold during festival seasons",
        ];
        traditionalOccupations = [
          "Vaidya (Ayurvedic physician) — healers using herbal preparations from ancient texts",
          "Shilpi (temple sculptor) — carving deities in sandstone and granite for sacred sites",
          "Vanik (merchant) — traveling along ancient spice and textile trade routes",
          "Jyotishi (astrologer) — calculating celestial charts for auspicious timings",
        ];
        festivals = [
          "Diwali — Festival of Lights celebrating Lord Rama's return; lamps lit to guide ancestral spirits",
          "Pongal/Makar Sankranti — Harvest gratitude to the Sun God with freshly cooked rice",
          "Navratri — Nine nights of Goddess worship with Garba dance and fasting",
          "Raksha Bandhan — Sacred sibling bond renewal with blessed thread",
        ];
        foods = [
          "Khichdi — ancient one-pot rice and lentil dish, mentioned in 4th-century texts",
          "Puri Bhaji — sacred offering food prepared for temple festivals",
          "Tamarind rice (Pulihora) — travel food of South Indian pilgrims",
          "Laddu — sweet spheres prepared during celestial auspicious days",
          "Saag with bajra roti — winter staple of North Indian agricultural communities",
        ];
        familyTreeNodes = [
          { name = input.surname # " Patriarch"; relation = "Great-great-grandfather"; region = input.grandparentsOrigin; era = "Early 1800s" },
          { name = "Devi " # input.surname; relation = "Great-great-grandmother"; region = input.grandparentsOrigin; era = "Early 1800s" },
          { name = input.surname # " Elder"; relation = "Great-grandfather"; region = input.region; era = "Mid 1800s" },
          { name = "Lakshmi " # input.surname; relation = "Great-grandmother"; region = input.region; era = "Late 1800s" },
          { name = input.surname # " Ancestor"; relation = "Grandfather"; region = input.region; era = "Early 1900s" },
        ];
      };
    };

    // Mesoamerican / Latin American
    if (
      regionLower.contains(#text "mexico") or
      regionLower.contains(#text "peru") or
      regionLower.contains(#text "guatemala") or
      regionLower.contains(#text "bolivia") or
      regionLower.contains(#text "colombia") or
      langLower.contains(#text "nahuatl") or
      langLower.contains(#text "quechua") or
      langLower.contains(#text "maya") or
      langLower.contains(#text "aztec")
    ) {
      return {
        migrationStory = "Your ancestors were descendants of the great Mesoamerican civilizations — possibly Aztec warriors of Tenochtitlán, Mayan astronomers of the Yucatán, or Incan builders of Machu Picchu. The surname '" # input.surname # "' likely carries Spanish colonial influence layered over a deeper indigenous identity. After the Spanish conquest in the 16th century, many families migrated to highland villages to preserve cultural traditions away from colonial centers.";
        forgottenCustoms = [
          "Ofrenda creation — building ancestral altars with marigold flowers and food offerings on Día de Muertos",
          "Temazcal sweat lodge ceremony for physical and spiritual purification",
          "Copal resin burning during prayer to carry messages to ancestral spirits",
          "The ritual planting of corn (milpa) with prayers to Tlaloc, the rain deity",
          "Weaving traditional huipil garments with clan symbols woven into the fabric",
        ];
        traditionalOccupations = [
          "Tlacuilo (codex painter) — recording history and cosmology in bark-paper manuscripts",
          "Pochteca (long-distance merchant) — trading cacao, jade, and quetzal feathers across civilizations",
          "Curandero (healer) — using plant medicine knowledge passed through generations",
          "Milpa farmer — cultivating the sacred corn-bean-squash trinity (Three Sisters)",
        ];
        festivals = [
          "Día de Muertos — honoring ancestors November 1-2 with marigold paths guiding spirits home",
          "Inti Raymi — Incan Festival of the Sun celebrating winter solstice with fire ceremonies",
          "Cinco de Mayo — commemorating cultural resilience and community identity",
          "Corn Harvest Festival — giving thanks to Tlaloc and Chicomecoatl, corn deities",
        ];
        foods = [
          "Tamales — ancient corn dough bundles filled with beans, chili, and meat; used in ceremonies",
          "Pozole — hominy stew with roots in pre-Columbian ritual feasts",
          "Cacao drink (xocolatl) — sacred bitter beverage of Aztec royalty and ceremonies",
          "Quinoa soup — sacred 'mother grain' of the Inca highlands",
          "Chili and bean stew — the everyday sustenance of Mesoamerican village life",
        ];
        familyTreeNodes = [
          { name = input.surname # " Elder"; relation = "Great-great-grandfather"; region = input.grandparentsOrigin; era = "Mid 1800s" },
          { name = "Maria " # input.surname; relation = "Great-great-grandmother"; region = input.grandparentsOrigin; era = "Mid 1800s" },
          { name = input.surname # " Warrior"; relation = "Great-grandfather"; region = input.region; era = "Late 1800s" },
          { name = "Rosa " # input.surname; relation = "Great-grandmother"; region = input.region; era = "Early 1900s" },
          { name = input.surname # " Ancestor"; relation = "Grandfather"; region = input.region; era = "Mid 1900s" },
        ];
      };
    };

    // Egyptian / North African / Middle Eastern
    if (
      regionLower.contains(#text "egypt") or
      regionLower.contains(#text "north africa") or
      regionLower.contains(#text "morocco") or
      regionLower.contains(#text "ethiopia") or
      regionLower.contains(#text "sudan") or
      langLower.contains(#text "coptic") or
      langLower.contains(#text "arabic") or
      langLower.contains(#text "aramaic") or
      langLower.contains(#text "amharic")
    ) {
      return {
        migrationStory = "Your lineage traces to the ancient Nile civilization — one of humanity's most enduring cultures. The surname '" # input.surname # "' may carry Coptic Christian, Islamic, or Pharaonic roots, reflecting Egypt's layered identities across 5000 years. Many families moved between the fertile Nile Delta and the Saharan trade routes, with merchant ancestors connecting Sub-Saharan Africa to Mediterranean markets.";
        forgottenCustoms = [
          "Sham el-Nessim spring picnic tradition — 4500-year-old celebration of renewal with salted fish and colored eggs",
          "Zār ritual healing ceremonies invoking protective spirits through music and dance",
          "Henna pattern ceremonies for brides featuring ancient Pharaonic symbols",
          "Reciting protective Quranic verses at newborn naming ceremonies",
          "Offering bread and salt to guests as sacred covenant of hospitality",
        ];
        traditionalOccupations = [
          "Papyrus craftsman — producing writing material that preserved civilization's knowledge",
          "Spice merchant — trading along the ancient Incense Route from Arabia to the Mediterranean",
          "Coptic textile weaver — creating intricate wool tapestries with Christian iconography",
          "Falconer and desert guide — navigating Saharan trade routes for caravans",
        ];
        festivals = [
          "Eid al-Fitr — celebration ending Ramadan fasting with family feasts and charity",
          "Sham el-Nessim — ancient spring festival predating Islam by 4500 years",
          "Coptic Christmas (January 7) — celebrated with special kahk cookies and church processions",
          "Moulid al-Nabi — Prophet's birthday celebrated with sweets and Sufi music",
        ];
        foods = [
          "Ful medames — fava bean stew eaten since Pharaonic times, still a breakfast staple",
          "Koshari — lentil and rice mix born from Egypt's multicultural food crossroads",
          "Mahshi (stuffed vegetables) — ancient technique of hollowing and filling vegetables with herbs and rice",
          "Om Ali bread pudding — named after a 13th-century Egyptian queen's celebratory dessert",
          "Basbousa semolina cake — soaked in rosewater syrup; a dessert with Ottoman and Egyptian roots",
        ];
        familyTreeNodes = [
          { name = input.surname # " Patriarch"; relation = "Great-great-grandfather"; region = input.grandparentsOrigin; era = "Mid 1800s" },
          { name = "Fatima " # input.surname; relation = "Great-great-grandmother"; region = input.grandparentsOrigin; era = "Mid 1800s" },
          { name = input.surname # " Elder"; relation = "Great-grandfather"; region = input.region; era = "Late 1800s" },
          { name = "Maryam " # input.surname; relation = "Great-grandmother"; region = input.region; era = "Early 1900s" },
          { name = input.surname # " Ancestor"; relation = "Grandfather"; region = input.region; era = "Mid 1900s" },
        ];
      };
    };

    // East Asian
    if (
      regionLower.contains(#text "china") or
      regionLower.contains(#text "japan") or
      regionLower.contains(#text "korea") or
      regionLower.contains(#text "vietnam") or
      regionLower.contains(#text "mongolia") or
      langLower.contains(#text "chinese") or
      langLower.contains(#text "japanese") or
      langLower.contains(#text "korean") or
      langLower.contains(#text "mandarin") or
      langLower.contains(#text "cantonese")
    ) {
      return {
        migrationStory = "Your ancestors are rooted in one of Asia's great civilizations. The surname '" # input.surname # "' is one of the oldest continuous family naming traditions in the world, with Chinese surnames dating back 4000 years. Families migrated along the Silk Road, across rice-growing river valleys, and through maritime trading routes that shaped Asia's diverse cultures. Many ancestors served as scholars, merchants, or craftspeople in imperial courts.";
        forgottenCustoms = [
          "Ancestor veneration altar maintenance — lighting incense and offering food to family spirits daily",
          "Qingming Festival grave sweeping — maintaining ancestral tomb sites with offerings each spring",
          "Tea ceremony honoring elders — serving tea with both hands as mark of filial respect",
          "Moon cake gifting during Mid-Autumn Festival to honor the lunar goddess Chang'e",
          "Wearing red during New Year to ward off the Nian beast and welcome good fortune",
        ];
        traditionalOccupations = [
          "Imperial scholar (Jinshi) — achieving top rank in the civil examination system",
          "Silk weaver — producing the luxury fabric that defined the ancient Silk Road trade",
          "Lacquerware artisan — creating ceremonial bowls and containers with resin techniques 3000 years old",
          "Rice farmer — cultivating the grain that fed Asia's great civilizations for millennia",
        ];
        festivals = [
          "Lunar New Year — 15-day celebration with dragon dances, fireworks, and red envelope gifts",
          "Mid-Autumn Festival — honoring the full moon with lanterns and moon cakes",
          "Qingming — grave-sweeping festival for honoring ancestors each spring",
          "Dragon Boat Festival — commemorating poet Qu Yuan with racing and rice dumplings",
        ];
        foods = [
          "Dumplings (jiaozi) — folded around New Year for their resemblance to ancient gold ingots",
          "Congee — ancient rice porridge serving as the comfort food of generations",
          "Noodles — symbolizing long life; pulled by hand using techniques unchanged for 4000 years",
          "Fermented soybean paste — preserved protein source tracing back to Han Dynasty",
          "Green tea — consumed in daily ritual with health and mindfulness traditions since Tang Dynasty",
        ];
        familyTreeNodes = [
          { name = input.surname # " Patriarch"; relation = "Great-great-grandfather"; region = input.grandparentsOrigin; era = "Mid 1800s" },
          { name = "Elder Lady " # input.surname; relation = "Great-great-grandmother"; region = input.grandparentsOrigin; era = "Mid 1800s" },
          { name = input.surname # " Scholar"; relation = "Great-grandfather"; region = input.region; era = "Late 1800s" },
          { name = "Mei " # input.surname; relation = "Great-grandmother"; region = input.region; era = "Early 1900s" },
          { name = input.surname # " Elder"; relation = "Grandfather"; region = input.region; era = "Mid 1900s" },
        ];
      };
    };

    // Generic rich fallback
    {
      migrationStory = "Your ancestors from " # input.grandparentsOrigin # " were part of an ancient lineage that carried wisdom, craft, and cultural memory across generations. The surname '" # input.surname # "' holds the story of a family that adapted to changing empires and landscapes while preserving identity through language, ritual, and tradition. Migration patterns suggest movement along historical trade and pilgrimage routes spanning centuries.";
      forgottenCustoms = [
        "Oral storytelling circles around evening fires preserving ancestral history",
        "Seasonal agricultural ceremonies marking planting and harvest with communal feasts",
        "Herbal remedy knowledge passed from elder to child through apprenticeship",
        "Coming-of-age rituals marking the transition from childhood to adult responsibility",
        "Crafting amulets and talismans for protection during travel and new ventures",
      ];
      traditionalOccupations = [
        "Artisan craftsperson — creating goods that blended utility with cultural symbolism",
        "Herbalist healer — maintaining community health through plant medicine knowledge",
        "Trader and merchant — connecting distant communities through the exchange of goods",
        "Elder storyteller — preserving oral histories, myths, and ancestral wisdom",
      ];
      festivals = [
        "Harvest Celebration — community gratitude feast at the end of the growing season",
        "Winter Solstice Festival — marking the return of light with fire ceremonies",
        "Ancestor Remembrance Day — honoring deceased family members with offerings and prayer",
        "Spring Renewal — welcoming new growth with communal planting rituals",
      ];
      foods = [
        "Slow-cooked grain porridge — the universal ancestral comfort food across cultures",
        "Fermented preserved vegetables — ancient food preservation for long winters",
        "Flatbread baked on hearthstones — unchanged recipe across thousands of years",
        "Wild herb soup — gathering seasonal greens as both food and medicine",
        "Fermented grain drink — ceremonial beverage used in ancestral offerings and celebrations",
      ];
      familyTreeNodes = [
        { name = input.surname # " Patriarch"; relation = "Great-great-grandfather"; region = input.grandparentsOrigin; era = "Early 1800s" },
        { name = "Elder Lady " # input.surname; relation = "Great-great-grandmother"; region = input.grandparentsOrigin; era = "Early 1800s" },
        { name = input.surname # " Elder"; relation = "Great-grandfather"; region = input.region; era = "Mid 1800s" },
        { name = "Matriarch " # input.surname; relation = "Great-grandmother"; region = input.region; era = "Late 1800s" },
        { name = input.surname # " Ancestor"; relation = "Grandfather"; region = input.region; era = "Early 1900s" },
      ];
    };
  };
};
