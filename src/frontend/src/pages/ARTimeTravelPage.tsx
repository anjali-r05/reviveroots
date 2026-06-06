import { ModuleLayout } from "@/components/ModuleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  useARCaptures,
  useDeleteARCapture,
  useSaveARCapture,
} from "@/hooks/useBackend";
import type { ARCapture } from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Fullscreen,
  Info,
  MapPin,
  Play,
  RefreshCw,
  Scan,
  Trash2,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
}

interface ARScene {
  id: number;
  title: string;
  location: string;
  era: string;
  year: string;
  type: string;
  icon: string;
  image: string;
  gradient: string;
  description: string;
  historicalContext: string;
  keyFacts: string[];
  culturalSignificance: string;
  fullNarrative: string;
  hotspots: ARHotspot[];
  civilization: string;
  period: string;
}

interface ARHotspot {
  id: number;
  x: number;
  y: number;
  label: string;
  fact: string;
  icon: string;
}

type CameraError = "permission_denied" | "not_found" | "stream_error" | null;

const arScenes: ARScene[] = [
  {
    id: 1,
    title: "Angkor Wat at Peak Glory",
    location: "Siem Reap, Cambodia",
    era: "12th Century",
    year: "~900 AD",
    type: "Monument",
    civilization: "Khmer Empire",
    period: "Medieval Asia",
    icon: "🏛️",
    image: "/assets/generated/ar-angkor-wat.dim_800x500.jpg",
    gradient:
      "from-[oklch(0.3_0.12_50)] via-[oklch(0.15_0.08_40)] to-[oklch(0.08_0.05_260)]",
    description:
      "See the temple complex restored to its original polychrome splendor with thousands of devotees performing the Devaraja ritual.",
    historicalContext:
      "Angkor Wat was built by King Suryavarman II in the early 12th century as his state temple and eventual mausoleum. At its height, it was the world's largest religious monument, covering over 400 acres.",
    keyFacts: [
      "Over 5,000 apsara (celestial dancer) carvings adorn its walls",
      "The temple was originally dedicated to the Hindu god Vishnu",
      "Construction required an estimated 300,000 workers and artisans",
    ],
    culturalSignificance:
      "Angkor Wat represents the pinnacle of Khmer architecture and serves as a symbol of national pride — appearing on Cambodia's flag. It embodies the cosmic order, with its towers symbolizing Mount Meru, home of the gods.",
    fullNarrative:
      "In the 12th century, Angkor Wat gleamed with gold and red paint, its towers visible for miles across the Cambodian plain. Thousands of brahmin priests, dancers, and officials filled its galleries with color and music. The western moat reflected its towers in sacred waters as pilgrims arrived by boat and royal processional.",
    hotspots: [
      {
        id: 1,
        x: 50,
        y: 35,
        label: "Central Sanctuary",
        fact: "The central tower rises 65 meters, representing Mount Meru — the mythical home of the gods in Hindu cosmology.",
        icon: "🏔️",
      },
      {
        id: 2,
        x: 25,
        y: 60,
        label: "Gallery of Bas-Reliefs",
        fact: "The 800-meter-long gallery of bas-reliefs depicts the Hindu epic Mahabharata and scenes of heaven and hell.",
        icon: "🎨",
      },
      {
        id: 3,
        x: 75,
        y: 55,
        label: "Causeway & Moat",
        fact: "The 5km-long moat is fed by a complex hydraulic system and was used for ritual purification before entering the temple.",
        icon: "💧",
      },
    ],
  },
  {
    id: 2,
    title: "Silk Road Marketplace",
    location: "Samarkand, Uzbekistan",
    era: "9th Century",
    year: "~700 AD",
    type: "Village",
    civilization: "Abbasid Caliphate",
    period: "Islamic Golden Age",
    icon: "🏪",
    image: "/assets/generated/ar-silk-road.dim_800x500.jpg",
    gradient:
      "from-[oklch(0.35_0.14_65)] via-[oklch(0.18_0.10_55)] to-[oklch(0.08_0.05_260)]",
    description:
      "Walk through bustling camel caravans, spice merchants, and silk traders at the height of trans-continental commerce.",
    historicalContext:
      "Samarkand was the jewel of the Silk Road, a hub where East met West. Persian, Chinese, Indian, and Arab merchants gathered in its legendary bazaars, exchanging silk, spices, glassware, and ideas.",
    keyFacts: [
      "Samarkand was home to over 400,000 people at its peak — larger than medieval Paris",
      "Paper-making technology traveled from China to the West through Samarkand in 751 AD",
      "The city was visited by Marco Polo, who called it 'a very large and splendid city'",
    ],
    culturalSignificance:
      "The Silk Road was not just a trade route but the world's first information superhighway — transmitting religions, languages, technologies, and art across continents for over a thousand years.",
    fullNarrative:
      "At the crossroads of civilizations, Samarkand's legendary Registan plaza buzzed with the languages of a dozen nations. Persian astronomers shared star maps with Chinese mathematicians. Indian spice traders haggled beside Byzantine craftsmen.",
    hotspots: [
      {
        id: 1,
        x: 45,
        y: 40,
        label: "Spice Bazaar",
        fact: "Spices were more valuable than gold — a pound of saffron cost as much as a horse in medieval markets.",
        icon: "🌶️",
      },
      {
        id: 2,
        x: 70,
        y: 30,
        label: "Caravanserai",
        fact: "Caravanserais were rest-stops spaced exactly one day's camel walk apart — creating the world's first logistics network.",
        icon: "🐪",
      },
      {
        id: 3,
        x: 20,
        y: 65,
        label: "Merchant Quarters",
        fact: "Each ethnic group had its own quarter: the Chinese, Persian, Indian, and Arab merchants each maintained cultural enclaves.",
        icon: "🏘️",
      },
    ],
  },
  {
    id: 3,
    title: "Library of Alexandria",
    location: "Alexandria, Egypt",
    era: "3rd Century BCE",
    year: "~300 BC",
    type: "Artifact",
    civilization: "Ptolemaic Egypt",
    period: "Hellenistic Period",
    icon: "📜",
    image: "/assets/generated/ar-alexandria.dim_800x500.jpg",
    gradient:
      "from-[oklch(0.38_0.10_80)] via-[oklch(0.20_0.08_70)] to-[oklch(0.08_0.04_260)]",
    description:
      "Witness scholars from across the known world studying in the greatest repository of human knowledge ever assembled.",
    historicalContext:
      "Founded around 300 BC by Ptolemy I, the Library of Alexandria aimed to collect all the world's knowledge. At its height, it held over 700,000 scrolls — representing the sum of human learning in science, philosophy, literature, and medicine.",
    keyFacts: [
      "Ships entering Alexandria's harbor were required by law to hand over any scrolls for copying",
      "Eratosthenes calculated the circumference of the Earth here with remarkable accuracy",
      "The library housed works by Archimedes, Euclid, Homer, and over 1,000 other scholars",
    ],
    culturalSignificance:
      "The Library of Alexandria symbolizes humanity's eternal quest for knowledge and the fragility of accumulated wisdom. Its eventual destruction became one of history's great tragedies.",
    fullNarrative:
      "In the brilliant Mediterranean sunlight, Alexandria's white marble colonnades echoed with the debates of scholars in Greek, Egyptian, Hebrew, and Persian. Here, Archimedes contemplated water displacement, Euclid formalized geometry, and Hypatia taught astronomy and mathematics.",
    hotspots: [
      {
        id: 1,
        x: 50,
        y: 45,
        label: "The Great Hall",
        fact: "The main reading hall could seat 500 scholars simultaneously and was open to any educated person who could travel to Alexandria.",
        icon: "📚",
      },
      {
        id: 2,
        x: 30,
        y: 30,
        label: "Scroll Repository",
        fact: "Scrolls were categorized using the world's first library catalogue — the Pinakes — compiled by the poet Callimachus.",
        icon: "📜",
      },
      {
        id: 3,
        x: 72,
        y: 62,
        label: "Lecture Gardens",
        fact: "Outdoor gardens were used for philosophical debates — the Peripatetic school of philosophy was named for these walking discussions.",
        icon: "🌿",
      },
    ],
  },
  {
    id: 4,
    title: "Indus Valley City",
    location: "Mohenjo-daro, Pakistan",
    era: "Bronze Age",
    year: "~2500 BC",
    type: "Ancient City",
    civilization: "Indus Valley Civilization",
    period: "Bronze Age",
    icon: "🏘️",
    image: "/assets/generated/ar-indus-valley.dim_800x500.jpg",
    gradient:
      "from-[oklch(0.30_0.10_45)] via-[oklch(0.16_0.08_35)] to-[oklch(0.08_0.05_260)]",
    description:
      "Explore the world's first planned urban grid with advanced water systems and mysterious seal script inscriptions.",
    historicalContext:
      "Mohenjo-daro flourished around 2500 BC as one of the largest cities of the ancient Indus Valley Civilization. With a population of 40,000, it featured advanced urban planning that wouldn't be matched for another 2,000 years.",
    keyFacts: [
      "Every home had indoor plumbing connected to a citywide sewage system",
      "The city had no palaces or temples — suggesting a remarkably egalitarian society",
      "The Indus script carved on thousands of seals remains undeciphered to this day",
    ],
    culturalSignificance:
      "Mohenjo-daro challenges the idea that civilization requires war and hierarchy. Its egalitarian layout, standardized weights and measures, and sophisticated infrastructure represent a path not taken.",
    fullNarrative:
      "In 2500 BC, Mohenjo-daro was a marvel of urban planning. Its streets ran in precise grids, each equipped with covered drains. Every home had a bathroom connected to the city's sewage system — a level of sanitation not achieved again until 19th century Europe.",
    hotspots: [
      {
        id: 1,
        x: 48,
        y: 38,
        label: "The Great Bath",
        fact: "The 12m x 7m Great Bath was waterproofed with bitumen and likely used for ritual purification — one of the world's earliest public pools.",
        icon: "🏊",
      },
      {
        id: 2,
        x: 25,
        y: 55,
        label: "Residential District",
        fact: "Homes were two stories tall with flat roofs, brick-paved bathrooms, and ventilated courtyards.",
        icon: "🏠",
      },
      {
        id: 3,
        x: 72,
        y: 50,
        label: "Merchant Quarter",
        fact: "Thousands of carved seals with undeciphered Indus script were found here — possibly used as identity stamps for trade.",
        icon: "🔏",
      },
    ],
  },
  {
    id: 5,
    title: "Aztec Sun Festival",
    location: "Tenochtitlan, Mexico",
    era: "15th Century",
    year: "~1400 AD",
    type: "Festival",
    civilization: "Aztec Empire",
    period: "Pre-Columbian Americas",
    icon: "☀️",
    image: "/assets/generated/ar-aztec-festival.dim_800x500.jpg",
    gradient:
      "from-[oklch(0.35_0.18_35)] via-[oklch(0.20_0.12_20)] to-[oklch(0.08_0.05_260)]",
    description:
      "Experience the New Fire Ceremony with thousands of drums, torchlight processions, and sky-watching priests.",
    historicalContext:
      "Every 52 years, the Aztecs feared the world might end as two sacred calendars aligned. The New Fire Ceremony was a civilization-wide ritual involving all 200,000+ residents of Tenochtitlan.",
    keyFacts: [
      "All fires in the empire were extinguished for 5 days — plunging an entire civilization into darkness",
      "Tenochtitlan's population of 200,000 was larger than any European city at the time",
      "The Aztec calendar was more accurate than the Julian calendar used in contemporary Europe",
    ],
    culturalSignificance:
      "The New Fire Ceremony represents humanity's oldest and deepest fear — that the cosmos might end — transformed into collective ritual action.",
    fullNarrative:
      "As the night of the New Fire Ceremony fell on Tenochtitlan, 200,000 people extinguished every flame in the city. Priests climbed the Hill of the Star to watch the Pleiades cross the zenith — the sign that the world would continue.",
    hotspots: [
      {
        id: 1,
        x: 50,
        y: 30,
        label: "Templo Mayor",
        fact: "The twin pyramid rose 60 meters over the city's center, visible from every corner of Tenochtitlan during the New Fire ceremonies.",
        icon: "🏛️",
      },
      {
        id: 2,
        x: 28,
        y: 58,
        label: "Sacred Processional",
        fact: "100,000 people filled the processional way, holding extinguished torches, waiting in total darkness for the new fire to be born.",
        icon: "🔥",
      },
      {
        id: 3,
        x: 72,
        y: 45,
        label: "Floating Gardens",
        fact: "Tenochtitlan was built on a lake, with chinampas (floating gardens) feeding 200,000 people through ingenious water agriculture.",
        icon: "🌿",
      },
    ],
  },
  {
    id: 6,
    title: "Tang Dynasty Chang'an",
    location: "Xi'an, China",
    era: "7th Century",
    year: "~700 AD",
    type: "Ancient City",
    civilization: "Tang Dynasty China",
    period: "Golden Age of China",
    icon: "🏯",
    image: "/assets/generated/ar-tang-dynasty.dim_800x500.jpg",
    gradient:
      "from-[oklch(0.30_0.12_30)] via-[oklch(0.18_0.08_20)] to-[oklch(0.08_0.05_260)]",
    description:
      "Stroll through the most cosmopolitan city on Earth with Persian merchants, Japanese scholars, and Indian dancers.",
    historicalContext:
      "At its peak in the 7th–8th centuries, Tang Dynasty Chang'an was the world's largest city with over 1 million inhabitants. It was a dazzling cosmopolitan hub where Silk Road merchants, Buddhist pilgrims, and foreign diplomats mingled in its 110 planned wards.",
    keyFacts: [
      "Chang'an hosted over 25 foreign nations' diplomatic missions simultaneously",
      "The city's night market was the world's first — pioneering nighttime commerce",
      "Tang Dynasty poems from this period number over 50,000",
    ],
    culturalSignificance:
      "Chang'an under the Tang Dynasty represents a golden age of Chinese civilization — a model of cultural openness and cosmopolitan exchange.",
    fullNarrative:
      "Chang'an in the Tang Dynasty was a city unlike any other in the world. Its planned grid of 110 wards housed over a million people from across the known world — Persian Zoroastrians, Nestorian Christians, Buddhist monks, Confucian scholars, and Sogdian merchants.",
    hotspots: [
      {
        id: 1,
        x: 50,
        y: 35,
        label: "Imperial Palace",
        fact: "The Daming Palace complex covered 3.2 km², over four times the size of the Forbidden City built centuries later.",
        icon: "👑",
      },
      {
        id: 2,
        x: 30,
        y: 55,
        label: "West Market",
        fact: "The West Market was the world's largest international bazaar, with 220 rows of shops organized by trade category.",
        icon: "🛍️",
      },
      {
        id: 3,
        x: 72,
        y: 60,
        label: "Da Ci'en Temple",
        fact: "The Giant Wild Goose Pagoda was built to house Buddhist scriptures brought from India by the monk Xuanzang.",
        icon: "🕌",
      },
    ],
  },
];

type ViewMode = "gallery" | "viewer";
type ARTab = "viewer" | "gallery";

function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<CameraError>(null);

  const start = useCallback(async () => {
    setError(null);
    setIsStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
    } catch (err) {
      const e = err as { name?: string };
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        setError("permission_denied");
      } else if (
        e.name === "NotFoundError" ||
        e.name === "DevicesNotFoundError"
      ) {
        setError("not_found");
      } else {
        setError("stream_error");
      }
      setIsActive(false);
    } finally {
      setIsStarting(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsActive(false);
    setError(null);
  }, []);

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isActive) return null;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  }, [isActive]);

  useEffect(
    () => () => {
      stop();
    },
    [stop],
  );

  return {
    videoRef,
    canvasRef,
    isActive,
    isStarting,
    error,
    start,
    stop,
    captureFrame,
  };
}

export default function ARTimeTravelPage({
  onNavigateHome,
  onNavigate,
}: Props) {
  const { isAuthenticated } = useAuth();
  const [selectedScene, setSelectedScene] = useState<ARScene | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [activeTab, setActiveTab] = useState<ARTab>("viewer");
  const [timeSlider, setTimeSlider] = useState(80);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [captureFlash, setCaptureFlash] = useState(false);
  const [capturingNow, setCapturingNow] = useState(false);
  const [capturePreview, setCapturePreview] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splitMode, setSplitMode] = useState(false);

  const camera = useCamera();
  const saveARCapture = useSaveARCapture();
  const deleteARCapture = useDeleteARCapture();
  const { data: arCaptures = [], isLoading: capturesLoading } = useARCaptures();

  const overlayOpacity = timeSlider / 100;

  const getEraLabel = (val: number) => {
    if (val >= 90) return "Ancient Era";
    if (val >= 70) return "Classical Age";
    if (val >= 50) return "Medieval Period";
    if (val >= 30) return "Renaissance";
    if (val >= 15) return "Industrial Age";
    return "Present Day";
  };

  const activateCamera = useCallback(async () => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setIsScanning(true);
    await camera.start();
    // 3-second dramatic scanning animation
    setTimeout(() => setIsScanning(false), 3000);
  }, [isAuthenticated, onNavigate, camera]);

  const deactivateCamera = useCallback(() => {
    camera.stop();
    setIsScanning(false);
    setSplitMode(false);
  }, [camera]);

  const captureSnapshot = useCallback(async () => {
    if (!selectedScene) return;
    const imageData = camera.captureFrame();
    if (!imageData) return;

    setCapturingNow(true);
    setCaptureFlash(true);
    setTimeout(() => setCaptureFlash(false), 400);

    try {
      await saveARCapture.mutateAsync({
        sceneId: String(selectedScene.id),
        imageData,
        title: `${selectedScene.title} — ${new Date().toLocaleDateString()}`,
      });
      setCapturePreview(imageData);
      setTimeout(() => setCapturePreview(null), 4000);
    } catch {
      // silently fail
    } finally {
      setCapturingNow(false);
    }
  }, [selectedScene, camera, saveARCapture]);

  const openViewer = (scene: ARScene) => {
    setSelectedScene(scene);
    setViewMode("viewer");
    setActiveTab("viewer");
    setActiveHotspot(null);
    setInfoPanelOpen(false);
    setInfoExpanded(false);
    deactivateCamera();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeViewer = () => {
    deactivateCamera();
    setViewMode("gallery");
    setSelectedScene(null);
    setSplitMode(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch {
        setIsFullscreen(false);
      }
    } else {
      if (document.fullscreenElement) await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const heroContent = (
    <div className="flex flex-col gap-2.5">
      {[
        { emoji: "📸", label: "Scan Monuments" },
        { emoji: "🏛️", label: "View Restorations" },
        { emoji: "✋", label: "Interact with History" },
      ].map((item) => (
        <div
          key={item.label}
          className="glass-cyan border border-[oklch(0.65_0.15_200/0.3)] rounded-lg px-4 py-2 text-sm text-[oklch(0.80_0.10_200)]"
        >
          {item.emoji} {item.label}
        </div>
      ))}
    </div>
  );

  // ─── AR Viewer Mode ───────────────────────────────────────────────────────
  if (viewMode === "viewer" && selectedScene) {
    return (
      <div
        className="min-h-screen bg-[oklch(0.06_0.04_260)] font-body overflow-x-hidden"
        data-ocid="ar.viewer_page"
      >
        {/* Tab bar */}
        <div className="flex items-center justify-center gap-2 px-4 pt-3 z-40 relative">
          {(["viewer", "gallery"] as ARTab[]).map((t) => (
            <button
              key={t}
              type="button"
              data-ocid={`ar.${t}_tab`}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeTab === t ? "bg-[oklch(0.68_0.22_86)] text-[oklch(0.10_0.06_80)]" : "glass-dark border border-[oklch(0.65_0.15_200/0.25)] text-[oklch(0.75_0.03_240)] hover:border-[oklch(0.65_0.15_200/0.5)]"}`}
            >
              {t === "viewer"
                ? "🔭 AR Viewer"
                : `📷 My Captures${arCaptures.length > 0 ? ` (${arCaptures.length})` : ""}`}
            </button>
          ))}
        </div>

        {activeTab === "viewer" ? (
          /* ── AR VIEWER TAB ── */
          <div
            className="relative w-full"
            style={{ minHeight: "calc(100dvh - 52px)" }}
          >
            {/* ── Main visual area ── */}
            <div
              className={`${splitMode && camera.isActive ? "grid grid-cols-2 gap-0" : "relative"} w-full overflow-hidden`}
              style={{
                height: splitMode && camera.isActive ? "55vw" : undefined,
                maxHeight: splitMode && camera.isActive ? "65vh" : undefined,
              }}
            >
              {/* Historical scene / camera */}
              <div
                className={`relative overflow-hidden ${splitMode && camera.isActive ? "h-full" : "absolute inset-0"}`}
                style={!splitMode ? { minHeight: "100dvh" } : {}}
              >
                {/* Camera video (full or split) */}
                {camera.isActive && !splitMode && (
                  <video
                    ref={camera.videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {camera.isActive && splitMode && (
                  <div className="relative h-full">
                    <video
                      ref={camera.videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {/* AR frame corners */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[oklch(0.65_0.15_200)] rounded-tl" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[oklch(0.65_0.15_200)] rounded-tr" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[oklch(0.65_0.15_200)] rounded-bl" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[oklch(0.65_0.15_200)] rounded-br" />
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[oklch(0.65_0.15_200/0.85)] text-[oklch(0.06_0.04_260)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      LIVE CAMERA
                    </div>
                  </div>
                )}

                {/* Historical scene image (full or overlay) */}
                {(!camera.isActive || splitMode) &&
                  (splitMode ? (
                    /* Historical side in split mode */
                    <div className="relative h-full">
                      <img
                        src={selectedScene.image}
                        alt={selectedScene.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.04_260/0.5)] via-transparent to-transparent" />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[oklch(0.68_0.22_86/0.9)] text-[oklch(0.10_0.06_80)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {selectedScene.year} RECONSTRUCTION
                      </div>
                    </div>
                  ) : (
                    /* Full historical scene */
                    <img
                      src={selectedScene.image}
                      alt={selectedScene.title}
                      className="w-full h-full object-cover"
                    />
                  ))}

                {/* Overlays for full-screen mode */}
                {!splitMode && (
                  <>
                    {/* Scanlines */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.06 0.04 260 / 0.12) 2px, oklch(0.06 0.04 260 / 0.12) 4px)",
                        opacity: overlayOpacity * 0.6 + 0.15,
                      }}
                    />
                    {/* Historical overlay tint */}
                    {camera.isActive && (
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                        style={{
                          backgroundImage: `url(${selectedScene.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: overlayOpacity * 0.55,
                          mixBlendMode: "screen",
                        }}
                      />
                    )}
                    {/* Color grade */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                      style={{
                        background: `linear-gradient(135deg, oklch(0.12 0.08 260 / ${overlayOpacity * 0.45}), oklch(0.18 0.10 50 / ${overlayOpacity * 0.3}))`,
                      }}
                    />
                    {/* Ghost building outlines */}
                    {overlayOpacity > 0.3 && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ opacity: overlayOpacity * 0.6 }}
                      >
                        {(
                          [
                            "alpha",
                            "beta",
                            "gamma",
                            "delta",
                            "epsilon",
                          ] as const
                        ).map((name, i) => (
                          <motion.div
                            key={`ghost-${name}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.25, 0.05, 0.3, 0] }}
                            transition={{
                              duration: 4 + i * 0.8,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.9,
                            }}
                            className="absolute border border-[oklch(0.90_0.05_60/0.4)]"
                            style={{
                              left: `${10 + i * 16}%`,
                              bottom: `${20 + (i % 3) * 8}%`,
                              width: `${8 + i * 3}%`,
                              height: `${15 + i * 8}%`,
                              borderRadius: "2px",
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {/* AR frame corners */}
                    {camera.isActive && (
                      <>
                        <div className="absolute top-16 left-5 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.65_0.15_200)] rounded-tl pointer-events-none" />
                        <div className="absolute top-16 right-5 w-8 h-8 border-t-2 border-r-2 border-[oklch(0.65_0.15_200)] rounded-tr pointer-events-none" />
                        <div className="absolute bottom-40 left-5 w-8 h-8 border-b-2 border-l-2 border-[oklch(0.65_0.15_200)] rounded-bl pointer-events-none" />
                        <div className="absolute bottom-40 right-5 w-8 h-8 border-b-2 border-r-2 border-[oklch(0.65_0.15_200)] rounded-br pointer-events-none" />
                      </>
                    )}
                    {/* Dust mote particles */}
                    {[11, 22, 33, 44, 55, 66, 77, 88].map((pos, i) => (
                      <motion.div
                        key={`mote-${pos}`}
                        className="absolute w-1 h-1 rounded-full bg-[oklch(0.68_0.22_86/0.4)] pointer-events-none"
                        initial={{ x: `${pos}vw`, y: "100%", opacity: 0 }}
                        animate={{
                          y: "-20%",
                          opacity: [0, 0.6, 0.6, 0],
                          x: `${pos + (i % 2 === 0 ? 2 : -2)}vw`,
                        }}
                        transition={{
                          duration: 6 + i * 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.7,
                          ease: "linear",
                        }}
                      />
                    ))}
                    {/* Capture flash */}
                    {captureFlash && (
                      <div className="absolute inset-0 bg-[oklch(0.99_0.005_240/0.85)] pointer-events-none z-50 transition-opacity duration-300" />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Split mode label strip */}
            {splitMode && camera.isActive && (
              <div className="flex border-t border-[oklch(0.65_0.15_200/0.2)] text-[10px] text-center font-semibold">
                <div className="flex-1 py-1.5 text-[oklch(0.65_0.15_200)] bg-[oklch(0.06_0.04_260/0.8)]">
                  📡 LIVE CAMERA
                </div>
                <div className="w-px bg-[oklch(0.65_0.15_200/0.3)]" />
                <div className="flex-1 py-1.5 text-[oklch(0.68_0.22_86)] bg-[oklch(0.06_0.04_260/0.8)]">
                  🏛️ {selectedScene.year} RECONSTRUCTION
                </div>
              </div>
            )}

            {/* ── Scanning animation overlay ── */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[oklch(0.06_0.04_260/0.9)] pointer-events-none"
                >
                  <motion.div
                    animate={{ scaleY: [0, 1, 0], y: ["0%", "100%"] }}
                    transition={{ duration: 1.5, repeat: 1, ease: "linear" }}
                    className="w-full h-0.5 bg-[oklch(0.65_0.15_200/0.8)] shadow-[0_0_12px_oklch(0.65_0.15_200)]"
                    style={{ position: "absolute", top: 0 }}
                  />
                  <div className="w-24 h-24 border-2 border-[oklch(0.65_0.15_200/0.7)] rounded-2xl relative mb-6">
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[oklch(0.65_0.15_200)]" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[oklch(0.65_0.15_200)]" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[oklch(0.65_0.15_200)]" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[oklch(0.65_0.15_200)]" />
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="absolute inset-0 flex items-center justify-center text-3xl"
                    >
                      📡
                    </motion.div>
                  </div>
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 0.9,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-[oklch(0.65_0.15_200)] font-semibold tracking-widest text-sm uppercase"
                  >
                    AR SCANNING…
                  </motion.p>
                  <p className="text-[oklch(0.65_0.02_240/0.6)] text-xs mt-2">
                    Initializing time portal
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Capture preview toast ── */}
            <AnimatePresence>
              {capturePreview && (
                <motion.div
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  className="absolute top-20 right-4 z-50 glass-dark border border-[oklch(0.68_0.22_86/0.5)] rounded-xl p-2 shadow-glow w-40"
                  data-ocid="ar.capture_success_toast"
                >
                  <img
                    src={capturePreview}
                    alt="Captured"
                    className="w-full h-24 object-cover rounded-lg mb-1.5"
                  />
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-[oklch(0.55_0.22_145/0.8)] flex items-center justify-center text-[8px]">
                      ✓
                    </div>
                    <p className="text-[10px] text-[oklch(0.80_0.05_240)] font-semibold">
                      Saved to captures!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Error state ── */}
            <AnimatePresence>
              {camera.error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-16 left-4 right-4 z-40 glass-dark border border-[oklch(0.55_0.22_25/0.5)] rounded-xl p-4"
                  data-ocid="ar.camera_error_state"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">
                      {camera.error === "permission_denied"
                        ? "🔒"
                        : camera.error === "not_found"
                          ? "📷"
                          : "⚠️"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[oklch(0.85_0.10_25)] mb-1">
                        {camera.error === "permission_denied" &&
                          "Camera Access Denied"}
                        {camera.error === "not_found" && "No Camera Found"}
                        {camera.error === "stream_error" && "Camera Error"}
                      </p>
                      <p className="text-xs text-[oklch(0.75_0.03_240)] leading-relaxed">
                        {camera.error === "permission_denied" &&
                          "Please allow camera access in your browser settings, then try again."}
                        {camera.error === "not_found" &&
                          "No camera detected on this device. Try on a smartphone for the full AR experience."}
                        {camera.error === "stream_error" &&
                          "Could not start camera stream. Please check your device and try again."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => camera.stop()}
                      className="text-[oklch(0.65_0.02_240)] hover:text-[oklch(0.95_0.02_240)] min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Top Controls Bar ── */}
            <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between gap-2 p-3 sm:p-4 bg-gradient-to-b from-[oklch(0.06_0.04_260/0.92)] to-transparent">
              <button
                type="button"
                data-ocid="ar.viewer_back_button"
                onClick={closeViewer}
                className="flex items-center gap-1.5 text-sm text-[oklch(0.90_0.05_240)] hover:text-[oklch(0.99_0.005_240)] transition-colors duration-200 min-h-[44px] px-2"
              >
                <X className="w-5 h-5" />
                <span className="hidden sm:inline">Exit AR</span>
              </button>
              <div className="flex-1 text-center min-w-0 px-2">
                <p className="text-xs text-[oklch(0.65_0.15_200)] font-semibold uppercase tracking-widest">
                  AR Time Travel
                </p>
                <p className="text-sm font-display text-[oklch(0.95_0.02_240)] truncate">
                  {selectedScene.title}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {camera.isActive && (
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 1.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-[oklch(0.65_0.15_200)] bg-[oklch(0.65_0.15_200/0.12)] border border-[oklch(0.65_0.15_200/0.3)] rounded-full px-2.5 py-1"
                    data-ocid="ar.active_badge"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.15_200)] animate-pulse" />
                    AR ACTIVE
                  </motion.div>
                )}
                <Badge className="bg-[oklch(0.65_0.15_200/0.12)] text-[oklch(0.72_0.12_200)] border-[oklch(0.65_0.15_200/0.25)] text-xs hidden sm:flex">
                  {selectedScene.era}
                </Badge>
              </div>
            </div>

            {/* ── Year Badge ── */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark border border-[oklch(0.68_0.22_86/0.4)] rounded-full px-4 py-1.5 text-xs font-semibold text-[oklch(0.68_0.22_86)] tracking-wider shadow-glow flex items-center gap-2"
              >
                <Clock className="w-3 h-3" />
                {selectedScene.year} · {selectedScene.location}
              </motion.div>
            </div>

            {/* ── Floating AR metadata tags (camera active) ── */}
            {camera.isActive && !splitMode && (
              <div className="absolute top-28 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                {[
                  { label: "Era", value: selectedScene.era },
                  { label: "Civilization", value: selectedScene.civilization },
                  { label: "Period", value: selectedScene.period },
                ].map((tag) => (
                  <motion.div
                    key={tag.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-dark border border-[oklch(0.65_0.15_200/0.3)] rounded-lg px-3 py-1.5 text-[10px] leading-tight"
                  >
                    <span className="text-[oklch(0.65_0.15_200)] font-semibold block">
                      {tag.label}
                    </span>
                    <span className="text-[oklch(0.90_0.02_240)]">
                      {tag.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ── Hotspot Markers ── */}
            {!splitMode &&
              selectedScene.hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  type="button"
                  data-ocid={`ar.hotspot.${hotspot.id}`}
                  onClick={() =>
                    setActiveHotspot(
                      activeHotspot === hotspot.id ? null : hotspot.id,
                    )
                  }
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-[oklch(0.68_0.22_86/0.6)] animate-ping" />
                    <div className="w-8 h-8 rounded-full bg-[oklch(0.68_0.22_86/0.85)] border-2 border-[oklch(0.68_0.22_86)] flex items-center justify-center shadow-glow text-base hover:scale-125 transition-transform duration-200">
                      {hotspot.icon}
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeHotspot === hotspot.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 sm:w-64 glass-dark border border-[oklch(0.68_0.22_86/0.3)] rounded-xl p-3 text-left pointer-events-none"
                      >
                        <p className="text-xs font-semibold text-[oklch(0.68_0.22_86)] mb-1">
                          {hotspot.label}
                        </p>
                        <p className="text-xs text-[oklch(0.85_0.03_240)] leading-relaxed">
                          {hotspot.fact}
                        </p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[oklch(0.68_0.22_86/0.3)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}

            {/* ── Time Slider (left side) ── */}
            {!splitMode && (
              <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
                <div className="glass-dark border border-[oklch(0.65_0.15_200/0.3)] rounded-2xl p-3 flex flex-col items-center gap-3">
                  <span
                    className="text-xs text-[oklch(0.65_0.15_200)] font-semibold uppercase tracking-wider"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Time
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={timeSlider}
                    onChange={(e) => setTimeSlider(Number(e.target.value))}
                    data-ocid="ar.time_slider"
                    className="appearance-none cursor-pointer"
                    style={{
                      writingMode: "vertical-lr",
                      direction: "rtl",
                      width: "4px",
                      height: "120px",
                      background: `linear-gradient(to bottom, oklch(0.65 0.15 200), oklch(0.68 0.22 86 / ${overlayOpacity}))`,
                      borderRadius: "4px",
                      outline: "none",
                    }}
                  />
                  <span
                    className="text-xs text-[oklch(0.68_0.22_86)] font-semibold"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Now
                  </span>
                </div>
                <div className="glass-dark border border-[oklch(0.65_0.15_200/0.2)] rounded-lg px-2 py-1 text-center">
                  <p className="text-[10px] text-[oklch(0.65_0.15_200)] font-semibold">
                    {getEraLabel(timeSlider)}
                  </p>
                </div>
              </div>
            )}

            {/* ── Right controls ── */}
            <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
              <button
                type="button"
                data-ocid="ar.info_button"
                onClick={() => setInfoPanelOpen(!infoPanelOpen)}
                className="w-10 h-10 glass-dark border border-[oklch(0.65_0.15_200/0.3)] rounded-xl flex items-center justify-center text-[oklch(0.65_0.15_200)] hover:bg-[oklch(0.65_0.15_200/0.15)] transition-colors duration-200"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                type="button"
                data-ocid="ar.split_mode_button"
                onClick={() => setSplitMode(!splitMode)}
                title="Historical Comparison Mode"
                className={`w-10 h-10 glass-dark border rounded-xl flex items-center justify-center transition-colors duration-200 text-sm ${splitMode ? "border-[oklch(0.68_0.22_86/0.6)] bg-[oklch(0.68_0.22_86/0.15)] text-[oklch(0.68_0.22_86)]" : "border-[oklch(0.65_0.15_200/0.3)] text-[oklch(0.65_0.15_200)] hover:bg-[oklch(0.65_0.15_200/0.15)]"}`}
              >
                ⊞
              </button>
              <button
                type="button"
                data-ocid="ar.zoom_button"
                className="w-10 h-10 glass-dark border border-[oklch(0.65_0.15_200/0.3)] rounded-xl flex items-center justify-center text-[oklch(0.65_0.15_200)] hover:bg-[oklch(0.65_0.15_200/0.15)] transition-colors duration-200"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                data-ocid="ar.fullscreen_button"
                onClick={toggleFullscreen}
                className={`w-10 h-10 glass-dark border rounded-xl flex items-center justify-center transition-colors duration-200 ${isFullscreen ? "border-[oklch(0.68_0.22_86/0.6)] text-[oklch(0.68_0.22_86)]" : "border-[oklch(0.65_0.15_200/0.3)] text-[oklch(0.65_0.15_200)] hover:bg-[oklch(0.65_0.15_200/0.15)]"}`}
              >
                <Fullscreen className="w-4 h-4" />
              </button>
            </div>

            {/* ── Bottom Controls ── */}
            <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-[oklch(0.06_0.04_260/0.97)] to-transparent pb-4 pt-12 px-3 sm:px-5">
              {/* Camera toggle row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                {/* Camera toggle with glow when active */}
                <motion.div
                  animate={
                    camera.isActive
                      ? {
                          boxShadow: [
                            "0 0 0px oklch(0.68 0.22 86 / 0)",
                            "0 0 20px oklch(0.68 0.22 86 / 0.6)",
                            "0 0 0px oklch(0.68 0.22 86 / 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="rounded-lg"
                >
                  <Button
                    data-ocid="ar.camera_toggle_button"
                    onClick={
                      camera.isActive ? deactivateCamera : activateCamera
                    }
                    disabled={camera.isStarting}
                    size="sm"
                    className={`gap-2 text-xs ${
                      camera.isActive
                        ? "bg-[oklch(0.55_0.22_25/0.8)] hover:bg-[oklch(0.55_0.22_25)] border border-[oklch(0.55_0.22_25/0.5)] text-[oklch(0.95_0.02_240)]"
                        : "bg-[oklch(0.68_0.22_86/0.15)] hover:bg-[oklch(0.68_0.22_86/0.3)] border border-[oklch(0.68_0.22_86/0.5)] text-[oklch(0.80_0.15_86)]"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    {camera.isStarting
                      ? "Starting…"
                      : camera.isActive
                        ? "Stop Camera"
                        : "Activate Camera"}
                  </Button>
                </motion.div>

                {/* Capture button (shutter) */}
                {camera.isActive && (
                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      data-ocid="ar.capture_button"
                      onClick={captureSnapshot}
                      disabled={capturingNow}
                      className="w-16 h-16 rounded-full border-4 border-[oklch(0.99_0.005_240/0.85)] bg-[oklch(0.99_0.005_240/0.15)] hover:bg-[oklch(0.99_0.005_240/0.3)] transition-all duration-200 flex items-center justify-center flex-shrink-0 disabled:opacity-50"
                      aria-label="Capture moment"
                    >
                      {capturingNow ? (
                        <div className="w-9 h-9 rounded-full border-3 border-[oklch(0.99_0.005_240/0.4)] border-t-[oklch(0.99_0.005_240)] animate-spin" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[oklch(0.99_0.005_240/0.9)]" />
                      )}
                    </button>
                    {/* Sound wave animation on capture */}
                    <AnimatePresence>
                      {captureFlash && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-0.5"
                        >
                          {[
                            { h: 3, id: "bar-xs-1" },
                            { h: 5, id: "bar-sm" },
                            { h: 7, id: "bar-lg" },
                            { h: 5, id: "bar-sm-2" },
                            { h: 3, id: "bar-xs-2" },
                          ].map(({ h, id }, i) => (
                            <motion.div
                              key={id}
                              className="w-0.5 rounded-full bg-[oklch(0.68_0.22_86)]"
                              animate={{ scaleY: [1, 2, 1] }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              style={{ height: `${h}px` }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <Button
                  data-ocid="ar.scene_switch_button"
                  onClick={closeViewer}
                  size="sm"
                  variant="outline"
                  className="gap-2 border-[oklch(0.65_0.15_200/0.4)] text-[oklch(0.80_0.10_200)] hover:bg-[oklch(0.65_0.15_200/0.1)] text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Change Scene
                </Button>
              </div>

              {/* Info panel */}
              <AnimatePresence>
                {infoPanelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                    data-ocid="ar.info_panel"
                    className="glass-dark border border-[oklch(0.65_0.15_200/0.3)] rounded-2xl p-4 mb-2"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-base text-[oklch(0.95_0.02_240)]">
                          {selectedScene.title}
                        </h3>
                        <p className="text-xs text-[oklch(0.65_0.15_200)]">
                          {selectedScene.location} · {selectedScene.year}
                        </p>
                      </div>
                      <button
                        type="button"
                        data-ocid="ar.info_panel_close_button"
                        onClick={() => setInfoPanelOpen(false)}
                        className="text-[oklch(0.65_0.02_240)] hover:text-[oklch(0.95_0.02_240)] min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[oklch(0.80_0.03_240)] leading-relaxed mb-3">
                      {selectedScene.historicalContext}
                    </p>
                    <div className="space-y-1.5 mb-3">
                      {selectedScene.keyFacts.map((fact) => (
                        <div
                          key={fact.slice(0, 20)}
                          className="flex items-start gap-2 text-xs text-[oklch(0.75_0.05_240)]"
                        >
                          <span className="text-[oklch(0.68_0.22_86)] mt-0.5 flex-shrink-0">
                            ✦
                          </span>
                          {fact}
                        </div>
                      ))}
                    </div>
                    <AnimatePresence>
                      {infoExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-[oklch(0.80_0.03_240)] leading-relaxed mb-3 italic border-l-2 border-[oklch(0.68_0.22_86/0.5)] pl-3">
                            {selectedScene.fullNarrative}
                          </p>
                          <p className="text-xs text-[oklch(0.75_0.08_86)] leading-relaxed">
                            <span className="font-semibold text-[oklch(0.68_0.22_86)]">
                              Cultural Significance:{" "}
                            </span>
                            {selectedScene.culturalSignificance}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      data-ocid="ar.info_expand_button"
                      onClick={() => setInfoExpanded(!infoExpanded)}
                      className="flex items-center gap-1.5 text-xs text-[oklch(0.68_0.22_86)] hover:text-[oklch(0.80_0.18_86)] transition-colors mt-1 min-h-[44px]"
                    >
                      {infoExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                      {infoExpanded ? "Show less" : "Read full narrative"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hotspot tabs */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                {selectedScene.hotspots.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    data-ocid={`ar.hotspot_tab.${h.id}`}
                    onClick={() =>
                      setActiveHotspot(activeHotspot === h.id ? null : h.id)
                    }
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all duration-200 min-h-[36px] ${activeHotspot === h.id ? "bg-[oklch(0.68_0.22_86/0.25)] border-[oklch(0.68_0.22_86/0.6)] text-[oklch(0.68_0.22_86)]" : "glass-dark border-[oklch(0.65_0.15_200/0.25)] text-[oklch(0.75_0.03_240)]"}`}
                  >
                    <span>{h.icon}</span>
                    <span>{h.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hidden canvas for frame capture */}
            <canvas ref={camera.canvasRef} style={{ display: "none" }} />
          </div>
        ) : (
          /* ── MY CAPTURES TAB ── */
          <div
            className="px-4 py-6 max-w-2xl mx-auto"
            data-ocid="ar.captures_gallery"
          >
            <div className="flex items-center justify-between mb-6 gap-3">
              <div>
                <h2 className="font-display text-xl text-[oklch(0.95_0.02_240)]">
                  My AR Captures
                </h2>
                <p className="text-xs text-[oklch(0.65_0.02_240/0.7)] mt-0.5">
                  {arCaptures.length} moment{arCaptures.length !== 1 ? "s" : ""}{" "}
                  preserved through time
                </p>
              </div>
              <button
                type="button"
                data-ocid="ar.back_to_viewer_button"
                onClick={closeViewer}
                className="flex items-center gap-1.5 text-xs glass-dark border border-[oklch(0.65_0.15_200/0.3)] text-[oklch(0.65_0.15_200)] px-3 py-2 rounded-lg hover:bg-[oklch(0.65_0.15_200/0.1)] transition-colors min-h-[36px]"
              >
                <X className="w-3.5 h-3.5" />
                Exit
              </button>
            </div>

            {capturesLoading ? (
              <div
                className="grid grid-cols-2 gap-4"
                data-ocid="ar.captures_loading_state"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="glass-dark border border-[oklch(0.65_0.15_200/0.15)] rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="h-36 bg-[oklch(0.15_0.04_260)]" />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-[oklch(0.20_0.04_260)] rounded w-3/4" />
                      <div className="h-2 bg-[oklch(0.20_0.04_260)] rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : arCaptures.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
                data-ocid="ar.captures_empty_state"
              >
                <div className="w-20 h-20 glass-dark border border-[oklch(0.65_0.15_200/0.25)] rounded-2xl flex items-center justify-center text-4xl mb-5">
                  📸
                </div>
                <h3 className="font-display text-lg text-[oklch(0.75_0.03_240)] mb-2">
                  No captures yet
                </h3>
                <p className="text-sm text-[oklch(0.55_0.02_260/0.7)] mb-6 max-w-xs">
                  Activate AR and press the capture button to preserve your time
                  travel moments.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("viewer")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[oklch(0.65_0.15_200/0.15)] border border-[oklch(0.65_0.15_200/0.4)] text-[oklch(0.65_0.15_200)] text-sm font-semibold hover:bg-[oklch(0.65_0.15_200/0.25)] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  Activate AR to Begin
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {arCaptures.map((capture: ARCapture, i: number) => (
                  <motion.div
                    key={capture.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    data-ocid={`ar.capture_card.${i + 1}`}
                    className="glass-dark border border-[oklch(0.65_0.15_200/0.2)] rounded-xl overflow-hidden group hover:border-[oklch(0.68_0.22_86/0.5)] transition-all duration-300"
                  >
                    <div className="relative h-36 bg-[oklch(0.10_0.04_260)] overflow-hidden">
                      {capture.imageData ? (
                        <img
                          src={capture.imageData}
                          alt={capture.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          📷
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.04_260/0.7)] via-transparent to-transparent" />
                      {/* Actions overlay */}
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {capture.imageData && (
                          <a
                            href={capture.imageData}
                            download={`ar-capture-${capture.id}.png`}
                            data-ocid={`ar.capture_download.${i + 1}`}
                            className="w-7 h-7 rounded-lg bg-[oklch(0.10_0.04_260/0.8)] flex items-center justify-center text-[oklch(0.80_0.05_240)] hover:bg-[oklch(0.68_0.22_86/0.8)] transition-colors"
                          >
                            <Download className="w-3 h-3" />
                          </a>
                        )}
                        <button
                          type="button"
                          data-ocid={`ar.capture_delete.${i + 1}`}
                          onClick={() => deleteARCapture.mutate(capture.id)}
                          disabled={deleteARCapture.isPending}
                          className="w-7 h-7 rounded-lg bg-[oklch(0.10_0.04_260/0.8)] flex items-center justify-center text-[oklch(0.65_0.02_240)] hover:bg-[oklch(0.55_0.22_25/0.8)] hover:text-[oklch(0.99_0.01_240)] transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-[oklch(0.85_0.05_240)] truncate mb-1">
                        {capture.title}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[oklch(0.55_0.02_260/0.7)]">
                          {(() => {
                            try {
                              return new Date(
                                Number(capture.timestamp) / 1_000_000,
                              ).toLocaleDateString();
                            } catch {
                              return "";
                            }
                          })()}
                        </span>
                        {capture.sceneId && (
                          <span className="text-[10px] text-[oklch(0.65_0.15_200)] bg-[oklch(0.65_0.15_200/0.1)] rounded px-1.5 py-0.5 truncate">
                            Scene {capture.sceneId}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── Gallery View ─────────────────────────────────────────────────────────
  return (
    <ModuleLayout
      title="AR Time Travel Mode"
      subtitle="Point your phone camera at monuments, villages, or artifacts to see restored ancient architecture and interactive history overlays."
      icon={Camera}
      accent="cyan"
      badge="Augmented Reality"
      onNavigateHome={onNavigateHome}
      onNavigate={onNavigate}
      heroContent={heroContent}
    >
      {/* Activate Camera CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-cyan border border-[oklch(0.65_0.15_200/0.3)] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-5 shadow-glow-cyan mb-10"
        data-ocid="ar.activate_section"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full glass-cyan border-2 border-[oklch(0.65_0.15_200/0.5)] flex items-center justify-center relative">
          <Camera className="w-9 h-9 sm:w-10 sm:h-10 text-cyan" />
          <div className="absolute inset-0 rounded-full border-2 border-[oklch(0.65_0.15_200/0.3)] animate-ping" />
        </div>
        <div>
          <h2 className="font-display text-2xl md:text-3xl gradient-text-cyan mb-2">
            Activate AR Time Travel
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Select a historical scene below and grant camera access to overlay
            ancient architecture and history onto your real-world view.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            data-ocid="ar.activate_camera_button"
            onClick={() => {
              if (!isAuthenticated) {
                onNavigate("signup");
              } else if (selectedScene) {
                setViewMode("viewer");
              } else {
                const el = document.getElementById("ar-scenes");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="gap-2 bg-[oklch(0.65_0.15_200)] hover:bg-[oklch(0.70_0.13_200)] text-[oklch(0.10_0.06_200)] font-semibold border-0"
          >
            <Scan className="w-4 h-4" />
            {isAuthenticated ? "Choose a Scene Below" : "Sign In to Activate"}
          </Button>
          <Button
            data-ocid="ar.demo_button"
            variant="outline"
            onClick={() => {
              if (arScenes[0]) openViewer(arScenes[0]);
            }}
            className="gap-2 border-[oklch(0.65_0.15_200/0.4)] text-cyan hover:bg-[oklch(0.65_0.15_200/0.08)]"
          >
            <Play className="w-4 h-4" />
            Try Demo Scene
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 justify-center text-xs text-muted-foreground">
          <span>✓ Works on any modern smartphone</span>
          <span>✓ 6 historic reconstructions</span>
          <span>✓ Save captures to backend</span>
        </div>
      </motion.div>

      {/* My AR Captures quick preview */}
      {arCaptures.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 glass border border-[oklch(0.65_0.15_200/0.2)] rounded-2xl p-5"
          data-ocid="ar.gallery_preview_section"
        >
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">📸</span>
              <h3 className="font-display text-base text-foreground">
                Your Time Captures
              </h3>
              <Badge className="bg-[oklch(0.65_0.15_200/0.12)] text-[oklch(0.72_0.12_200)] border-[oklch(0.65_0.15_200/0.3)] text-xs">
                {arCaptures.length}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {arCaptures.slice(0, 6).map((capture: ARCapture, i: number) => (
              <div
                key={capture.id}
                className="flex-shrink-0 w-28 rounded-xl overflow-hidden border border-[oklch(0.65_0.15_200/0.2)]"
                data-ocid={`ar.gallery_preview.${i + 1}`}
              >
                {capture.imageData ? (
                  <img
                    src={capture.imageData}
                    alt={capture.title}
                    className="w-full h-20 object-cover"
                  />
                ) : (
                  <div className="w-full h-20 bg-[oklch(0.10_0.04_260)] flex items-center justify-center text-2xl">
                    📷
                  </div>
                )}
                <div className="p-1.5 bg-[oklch(0.08_0.03_260)]">
                  <p className="text-[9px] text-[oklch(0.70_0.05_240)] truncate">
                    {capture.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scene Selection Gallery */}
      <div id="ar-scenes">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="font-display text-2xl gradient-text-cyan mb-1">
              Choose Your Time Portal
            </h2>
            <p className="text-muted-foreground text-sm">
              6 historically reconstructed scenes — tap to enter
            </p>
          </div>
          <Badge className="bg-[oklch(0.65_0.15_200/0.12)] text-[oklch(0.72_0.12_200)] border-[oklch(0.65_0.15_200/0.3)] text-xs hidden sm:flex flex-shrink-0">
            {arScenes.length} Scenes
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {arScenes.map((scene, i) => (
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              data-ocid={`ar.scene.${i + 1}`}
              className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedScene?.id === scene.id ? "border-[oklch(0.68_0.22_86/0.8)] shadow-glow" : "border-border/30 hover:border-[oklch(0.65_0.15_200/0.5)]"} card-hover`}
              onClick={() => openViewer(scene)}
            >
              <div
                className={`relative h-44 overflow-hidden bg-gradient-to-br ${scene.gradient}`}
              >
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.04_260/0.7)] via-transparent to-transparent" />
                {/* AR scan corners */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[oklch(0.65_0.15_200/0.8)] rounded-tl" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[oklch(0.65_0.15_200/0.8)] rounded-tr" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[oklch(0.65_0.15_200/0.8)] rounded-bl" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[oklch(0.65_0.15_200/0.8)] rounded-br" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2">
                  <Badge className="bg-[oklch(0.65_0.15_200/0.2)] backdrop-blur-sm text-[oklch(0.85_0.10_200)] border-[oklch(0.65_0.15_200/0.3)] text-xs">
                    {scene.type}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-[oklch(0.68_0.22_86/0.85)] backdrop-blur-sm text-[oklch(0.10_0.06_80)] text-xs font-semibold px-2 py-0.5 rounded-full">
                  {scene.year}
                </div>
                <div className="absolute bottom-3 left-3 text-3xl">
                  {scene.icon}
                </div>
              </div>

              <div className="glass border-0 p-4">
                <h3 className="font-display text-base text-foreground group-hover:text-cyan transition-colors duration-200 mb-1 leading-tight">
                  {scene.title}
                </h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3 text-cyan flex-shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">
                    {scene.location}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                  {scene.description}
                </p>
                <button
                  type="button"
                  data-ocid={`ar.scene_enter_button.${i + 1}`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[oklch(0.65_0.15_200/0.1)] hover:bg-[oklch(0.65_0.15_200/0.2)] border border-[oklch(0.65_0.15_200/0.3)] text-xs font-semibold text-cyan transition-all duration-200"
                >
                  <Scan className="w-3.5 h-3.5" />
                  Time Travel Here
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-16 glass border border-border/40 rounded-2xl p-6 sm:p-8"
        data-ocid="ar.how_it_works_section"
      >
        <h2 className="font-display text-2xl gradient-text-cyan mb-6 text-center">
          How AR Time Travel Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: "📍",
              title: "Select Your Era",
              desc: "Choose from 6 meticulously researched historical civilizations and locations.",
            },
            {
              step: "02",
              icon: "📸",
              title: "Activate Camera",
              desc: "Grant camera access and point your phone at any physical space — wall, monument, or open area.",
            },
            {
              step: "03",
              icon: "🏛️",
              title: "Step Through Time",
              desc: "Watch as historical architecture materializes as a transparent overlay. Tap glowing hotspots to reveal hidden facts.",
            },
          ].map(({ step, icon, title, desc }) => (
            <div
              key={step}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 glass-cyan border border-[oklch(0.65_0.15_200/0.4)] rounded-2xl flex items-center justify-center text-2xl shadow-glow-cyan">
                {icon}
              </div>
              <div>
                <p className="text-xs text-cyan font-semibold mb-1">{step}</p>
                <p className="font-semibold text-foreground mb-1">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </ModuleLayout>
  );
}
