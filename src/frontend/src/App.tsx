import { Suspense, lazy, useCallback, useState } from "react";
import { toast } from "sonner";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { AIAssistantSection } from "./sections/AIAssistantSection";
import { CTASection } from "./sections/CTASection";
import { ExploreSection } from "./sections/ExploreSection";
import { HeroSection } from "./sections/HeroSection";
import { LeaderboardSection } from "./sections/LeaderboardSection";
import { MarketplaceSection } from "./sections/MarketplaceSection";
import { StatsSection } from "./sections/StatsSection";
import { StoryVaultSection } from "./sections/StoryVaultSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import type { AppRoute } from "./types/index";

const HeritageScannerPage = lazy(() => import("./pages/HeritageScannerPage"));
const LanguageRevivalPage = lazy(() => import("./pages/LanguageRevivalPage"));
const ARTimeTravelPage = lazy(() => import("./pages/ARTimeTravelPage"));
const StorykeeperPage = lazy(() => import("./pages/StorykeeperPage"));
const TraditionsPage = lazy(() => import("./pages/TraditionsPage"));
const GurukulPage = lazy(() => import("./pages/GurukulPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const FestivalPlannerPage = lazy(() => import("./pages/FestivalPlannerPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));

function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.1 0.05 260)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-4 animate-spin"
          style={{
            borderColor: "oklch(0.68 0.22 86 / 0.2)",
            borderTopColor: "oklch(0.68 0.22 86)",
          }}
        />
        <p
          className="text-sm font-body"
          style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
        >
          Loading module…
        </p>
      </div>
    </div>
  );
}

// Protected module routes — show auth prompt if unauthenticated
const MODULE_ROUTES = [
  "heritage-scanner",
  "language-revival",
  "ar-time-travel",
  "storykeeper",
  "traditions",
  "gurukul",
  "marketplace",
  "festival-planner",
] as const;

type ModuleRoute = (typeof MODULE_ROUTES)[number];

function isModuleRoute(r: AppRoute): r is ModuleRoute {
  return (MODULE_ROUTES as readonly string[]).includes(r);
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>("home");
  const { isAuthenticated } = useAuth();

  const navigate = useCallback((r: AppRoute) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateHome = useCallback(() => navigate("home"), [navigate]);
  const navigateSignup = useCallback(() => navigate("signup"), [navigate]);
  const navigateLogin = useCallback(() => navigate("login"), [navigate]);
  const navigateForgotPassword = useCallback(
    () => navigate("forgot-password"),
    [navigate],
  );
  const navigateDashboard = useCallback(
    () => navigate("dashboard"),
    [navigate],
  );

  // Redirect away from auth pages if already authenticated
  const handleAuthRedirect = useCallback(() => {
    if (isAuthenticated) {
      navigate("dashboard");
    } else {
      navigate("login");
      toast.error("Please sign in to access this feature");
    }
  }, [isAuthenticated, navigate]);

  // Login / Signup / Forgot-password pages (redirect to dashboard if already logged in)
  if (route === "login" || route === "signup" || route === "forgot-password") {
    if (isAuthenticated) {
      // defer state update to avoid render cycle
      setTimeout(() => navigate("dashboard"), 0);
      return <PageLoader />;
    }
    if (route === "login") {
      return (
        <LoginPage
          onNavigateHome={navigateHome}
          onNavigateSignup={navigateSignup}
          onNavigateForgotPassword={navigateForgotPassword}
          onNavigateDashboard={navigateDashboard}
        />
      );
    }
    if (route === "forgot-password") {
      return <ForgotPasswordPage onNavigateLogin={navigateLogin} />;
    }
    return (
      <SignupPage
        onNavigateHome={navigateHome}
        onNavigateLogin={navigateLogin}
        onNavigateDashboard={navigateDashboard}
      />
    );
  }

  // Dashboard — protected
  if (route === "dashboard") {
    return (
      <ProtectedRoute onRedirect={handleAuthRedirect}>
        <Suspense fallback={<PageLoader />}>
          <DashboardPage onNavigate={navigate} onNavigateHome={navigateHome} />
        </Suspense>
      </ProtectedRoute>
    );
  }

  // Profile — protected
  if (route === "profile") {
    return (
      <ProtectedRoute onRedirect={handleAuthRedirect}>
        <Suspense fallback={<PageLoader />}>
          <UserProfilePage onNavigate={navigate} />
        </Suspense>
      </ProtectedRoute>
    );
  }

  // Module routes — protected
  if (isModuleRoute(route)) {
    const moduleElement = (() => {
      switch (route) {
        case "heritage-scanner":
          return (
            <HeritageScannerPage
              onNavigateHome={navigateHome}
              onNavigate={navigate}
            />
          );
        case "language-revival":
          return (
            <LanguageRevivalPage
              onNavigateHome={navigateHome}
              onNavigate={navigate}
            />
          );
        case "ar-time-travel":
          return (
            <ARTimeTravelPage
              onNavigateHome={navigateHome}
              onNavigate={navigate}
            />
          );
        case "storykeeper":
          return (
            <StorykeeperPage
              onNavigateHome={navigateHome}
              onNavigate={navigate}
            />
          );
        case "traditions":
          return (
            <TraditionsPage
              onNavigateHome={navigateHome}
              onNavigate={navigate}
            />
          );
        case "gurukul":
          return (
            <GurukulPage onNavigateHome={navigateHome} onNavigate={navigate} />
          );
        case "marketplace":
          return (
            <MarketplacePage
              onNavigateHome={navigateHome}
              onNavigate={navigate}
            />
          );
        case "festival-planner":
          return (
            <FestivalPlannerPage
              onNavigateHome={navigateHome}
              onNavigate={navigate}
            />
          );
      }
    })();

    return (
      <ProtectedRoute onRedirect={handleAuthRedirect}>
        <Suspense fallback={<PageLoader />}>{moduleElement}</Suspense>
      </ProtectedRoute>
    );
  }

  // Home page
  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <Navbar
        onNavigateSignup={navigateSignup}
        onNavigateHome={navigateHome}
        onNavigate={navigate}
        onNavigateLogin={navigateLogin}
      />
      <main>
        <HeroSection onNavigateSignup={navigateSignup} />
        <StatsSection />
        <ExploreSection />
        <AIAssistantSection />
        <StoryVaultSection onNavigateSignup={navigateSignup} />
        <MarketplaceSection />
        <LeaderboardSection />
        <TestimonialsSection />
        <CTASection onNavigateSignup={navigateSignup} />
      </main>
      <Footer />
    </div>
  );
}
