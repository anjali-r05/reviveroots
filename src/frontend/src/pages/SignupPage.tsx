import { createActor } from "@/backend";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Fingerprint,
  Info,
  Leaf,
  Lock,
  Mail,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Background orbs
// ---------------------------------------------------------------------------
const ORB_CONFIG = [
  {
    id: "orb-gold-tl",
    size: 320,
    top: "-14%",
    left: "-12%",
    color: "oklch(0.68 0.22 86 / 0.13)",
    delay: 0,
  },
  {
    id: "orb-terra-br",
    size: 260,
    bottom: "-16%",
    right: "-10%",
    color: "oklch(0.6 0.16 40 / 0.11)",
    delay: 0.5,
  },
  {
    id: "orb-gold-mid",
    size: 180,
    top: "50%",
    left: "55%",
    color: "oklch(0.68 0.22 86 / 0.07)",
    delay: 0.9,
  },
  {
    id: "orb-terra-tr",
    size: 140,
    top: "18%",
    right: "12%",
    color: "oklch(0.6 0.16 40 / 0.08)",
    delay: 1.3,
  },
  {
    id: "orb-amber-bl",
    size: 100,
    top: "70%",
    left: "8%",
    color: "oklch(0.72 0.18 50 / 0.06)",
    delay: 0.3,
  },
];

interface OrbCfg {
  id: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color: string;
  delay: number;
}

function FloatingOrb({
  id: _id,
  size,
  top,
  bottom,
  left,
  right,
  color,
  delay,
}: OrbCfg) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        background: color,
        borderRadius: "50%",
        filter: "blur(72px)",
        ...(top && { top }),
        ...(bottom && { bottom }),
        ...(left && { left }),
        ...(right && { right }),
      }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.65, 1, 0.65] }}
      transition={{
        duration: 7 + delay * 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Cultural floating motifs
// ---------------------------------------------------------------------------
const MOTIFS = ["✦", "◈", "❋", "⟡", "◉"];

function CulturalMotif({
  symbol,
  x,
  y,
  delay,
}: { symbol: string; x: string; y: string; delay: number }) {
  return (
    <motion.span
      className="absolute select-none pointer-events-none font-display text-xl"
      style={{ left: x, top: y, color: "oklch(0.68 0.22 86 / 0.18)" }}
      animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{
        duration: 5 + delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {symbol}
    </motion.span>
  );
}

// ---------------------------------------------------------------------------
// Avatar stack
// ---------------------------------------------------------------------------
const AVATARS = [
  { color: "oklch(0.68 0.22 86)", initial: "A" },
  { color: "oklch(0.6 0.16 40)", initial: "K" },
  { color: "oklch(0.55 0.2 260)", initial: "P" },
  { color: "oklch(0.65 0.18 160)", initial: "S" },
  { color: "oklch(0.7 0.15 30)", initial: "M" },
];

function AvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {AVATARS.map((av, i) => (
          <div
            key={av.initial}
            className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
            style={{
              background: av.color,
              borderColor: "oklch(0.12 0.08 260)",
              color: "oklch(0.12 0.08 260)",
              zIndex: AVATARS.length - i,
            }}
          >
            {av.initial}
          </div>
        ))}
      </div>
      <div className="text-left">
        <p
          className="text-xs font-semibold"
          style={{ color: "oklch(0.99 0.005 240 / 0.85)" }}
        >
          Join 50,000+ explorers
        </p>
        <p className="text-xs" style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}>
          worldwide
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Google logo
// ---------------------------------------------------------------------------
function GoogleLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35Z"
        fill="#4285F4"
      />
      <path
        d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.604 0-4.809-1.759-5.596-4.123H1.064v2.591A9.996 9.996 0 0 0 10 20Z"
        fill="#34A853"
      />
      <path
        d="M4.404 11.9A6.01 6.01 0 0 1 4.09 10c0-.66.114-1.3.314-1.9V5.509H1.064A9.996 9.996 0 0 0 0 10c0 1.614.386 3.14 1.064 4.491L4.404 11.9Z"
        fill="#FBBC04"
      />
      <path
        d="M10 3.977c1.468 0 2.786.505 3.822 1.496l2.868-2.868C14.959.99 12.695 0 10 0A9.996 9.996 0 0 0 1.064 5.509L4.404 8.1C5.19 5.736 7.396 3.977 10 3.977Z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------
function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label="More information"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full ml-1 focus:outline-none focus-visible:ring-2"
        style={{ color: "oklch(0.68 0.22 86 / 0.6)" }}
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 text-center text-xs rounded-xl px-3 py-2 z-50 pointer-events-none"
            style={{
              background: "oklch(0.18 0.04 260)",
              border: "1px solid oklch(0.68 0.22 86 / 0.25)",
              color: "oklch(0.99 0.005 240 / 0.75)",
              boxShadow: "0 8px 32px oklch(0 0 0 / 0.4)",
            }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Password strength
// ---------------------------------------------------------------------------
function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2)
    return { score: 1, label: "Weak", color: "oklch(0.55 0.22 25)" };
  if (score <= 3)
    return { score: 2, label: "Fair", color: "oklch(0.72 0.2 80)" };
  if (score <= 4)
    return { score: 3, label: "Strong", color: "oklch(0.68 0.18 160)" };
  return { score: 4, label: "Very Strong", color: "oklch(0.65 0.15 160)" };
}

function PasswordStrengthBar({ password }: { password: string }) {
  const { score, label, color } = getPasswordStrength(password);
  if (!password) return null;
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: s <= score ? color : "oklch(0.68 0.22 86 / 0.15)",
            }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color }}>
        {label}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------
function Spinner({ size = 16 }: { size?: number }) {
  return (
    <div
      className="rounded-full border-2 animate-spin shrink-0"
      style={{
        width: size,
        height: size,
        borderColor: "oklch(0.68 0.22 86 / 0.3)",
        borderTopColor: "oklch(0.68 0.22 86)",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  const errors: Record<string, string> = {};
  if (fullName.trim().length < 2)
    errors.fullName = "Full name must be at least 2 characters.";
  if (!EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";
  if (password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  else if (!/[A-Z]/.test(password))
    errors.password = "Password must contain an uppercase letter.";
  else if (!/[a-z]/.test(password))
    errors.password = "Password must contain a lowercase letter.";
  else if (!/[0-9]/.test(password))
    errors.password = "Password must contain a number.";
  if (confirmPassword !== password)
    errors.confirmPassword = "Passwords do not match.";
  return errors;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface SignupPageProps {
  onNavigateHome: () => void;
  onNavigateLogin?: () => void;
  onNavigateDashboard?: () => void;
}

export function SignupPage({
  onNavigateHome,
  onNavigateLogin,
  onNavigateDashboard,
}: SignupPageProps) {
  const { login, isAuthenticated, isLoggingIn, isInitializing } = useAuth();
  const { actor } = useActor(createActor);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState<"google" | "email">("google");

  // After Internet Identity auth, save profile and navigate
  useEffect(() => {
    if (!isAuthenticated || !actor) return;
    (async () => {
      try {
        await actor.saveUserProfile({
          fullName: fullName || "Heritage Explorer",
          email: email || "",
          heritageRegion: "",
          languageInterests: [],
        });
      } catch {
        // non-fatal
      }
      if (onNavigateDashboard) onNavigateDashboard();
      else onNavigateHome();
    })();
  }, [
    isAuthenticated,
    actor,
    fullName,
    email,
    onNavigateDashboard,
    onNavigateHome,
  ]);

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const errors = validateForm(fullName, email, password, confirmPassword);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSubmitting(true);
    try {
      login();
    } catch {
      setSubmitError("Authentication failed. Please try again.");
      setSubmitting(false);
    }
  }

  const busy = isLoggingIn || submitting || isInitializing;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-10"
      style={{ background: "oklch(0.1 0.05 260)" }}
      data-ocid="signup.page"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ORB_CONFIG.map((cfg) => (
          <FloatingOrb key={cfg.id} {...cfg} />
        ))}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.22 86 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.22 86 / 0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {MOTIFS.map((symbol, i) => (
          <CulturalMotif
            key={symbol}
            symbol={symbol}
            x={`${10 + i * 18}%`}
            y={`${15 + (i % 3) * 28}%`}
            delay={i * 0.8}
          />
        ))}
      </div>

      {/* Back button */}
      <motion.button
        type="button"
        data-ocid="signup.back_home_link"
        onClick={onNavigateHome}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium z-20 group focus:outline-none focus-visible:ring-2 rounded-lg px-1"
        style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
        whileHover={{ color: "oklch(0.68 0.22 86)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" />
        Back to ReviveRoots
      </motion.button>

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-[440px] mx-auto px-4 sm:px-0"
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.14 0.06 260 / 0.88)",
            border: "1px solid oklch(0.68 0.22 86 / 0.18)",
            backdropFilter: "blur(24px)",
            boxShadow:
              "0 32px 80px oklch(0 0 0 / 0.55), 0 0 0 1px oklch(0.68 0.22 86 / 0.06) inset",
          }}
        >
          {/* Gold accent bar */}
          <div
            className="h-[3px] w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.68 0.22 86), oklch(0.72 0.2 80), oklch(0.6 0.16 40))",
            }}
          />

          <div className="px-5 py-8 sm:px-8 sm:py-10">
            {/* Brand */}
            <div className="flex flex-col items-center text-center mb-7">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                  boxShadow: "0 0 24px oklch(0.68 0.22 86 / 0.35)",
                }}
                whileHover={{ scale: 1.06, rotate: 6 }}
                transition={{ type: "spring", stiffness: 320 }}
              >
                <Leaf
                  className="w-8 h-8"
                  style={{ color: "oklch(0.12 0.08 260)" }}
                />
              </motion.div>

              <h1
                className="font-display text-3xl sm:text-4xl mb-1 leading-tight"
                style={{ color: "oklch(0.99 0.005 240)" }}
              >
                ReviveRoots
              </h1>
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.68 0.22 86)" }}
              >
                Begin Your Heritage Journey
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <AvatarStack />
              </div>
            </div>

            <div
              className="h-px w-full mb-6"
              style={{ background: "oklch(0.68 0.22 86 / 0.12)" }}
            />

            <AnimatePresence mode="wait">
              {isInitializing ? (
                <motion.div
                  key="loading"
                  data-ocid="signup.loading_state"
                  className="flex items-center justify-center py-6 gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className="w-5 h-5 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "oklch(0.68 0.22 86 / 0.3)",
                      borderTopColor: "oklch(0.68 0.22 86)",
                    }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                  >
                    Initializing…
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="cta"
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Google button */}
                  <motion.button
                    type="button"
                    data-ocid="signup.google_button"
                    onClick={login}
                    disabled={busy}
                    className="w-full h-12 rounded-full flex items-center justify-center gap-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "oklch(0.99 0.005 240)",
                      color: "oklch(0.2 0.02 260)",
                      boxShadow:
                        "0 2px 8px oklch(0 0 0 / 0.2), 0 0 0 1px oklch(0 0 0 / 0.08)",
                    }}
                    whileHover={{
                      scale: 1.015,
                      boxShadow: "0 4px 20px oklch(0 0 0 / 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoggingIn && mode === "google" ? (
                      <>
                        <div
                          className="w-4 h-4 border-2 rounded-full animate-spin"
                          style={{
                            borderColor: "oklch(0.4 0.04 260 / 0.3)",
                            borderTopColor: "oklch(0.4 0.04 260)",
                          }}
                        />
                        <span>Connecting…</span>
                      </>
                    ) : (
                      <>
                        <GoogleLogo />
                        <span>Continue with Google</span>
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-1">
                    <div
                      className="flex-1 h-px"
                      style={{ background: "oklch(0.68 0.22 86 / 0.12)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.99 0.005 240 / 0.3)" }}
                    >
                      or sign up with email
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: "oklch(0.68 0.22 86 / 0.12)" }}
                    />
                  </div>

                  {/* Toggle email form */}
                  {mode === "google" ? (
                    <motion.button
                      type="button"
                      data-ocid="signup.email_signup_toggle"
                      onClick={() => setMode("email")}
                      className="w-full h-12 rounded-full flex items-center justify-center gap-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.22 86 / 0.15), oklch(0.6 0.16 40 / 0.1))",
                        border: "1px solid oklch(0.68 0.22 86 / 0.35)",
                        color: "oklch(0.78 0.18 86)",
                      }}
                      whileHover={{
                        scale: 1.015,
                        background: "oklch(0.68 0.22 86 / 0.2)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Mail className="w-4 h-4" />
                      Sign up with Email
                    </motion.button>
                  ) : (
                    <AnimatePresence>
                      <motion.form
                        key="email-form"
                        onSubmit={handleCreateAccount}
                        noValidate
                        className="flex flex-col gap-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Full Name */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="signup-fullname"
                            className="text-xs font-semibold tracking-wide uppercase"
                            style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                          >
                            Full Name
                          </label>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                              style={{ color: "oklch(0.68 0.22 86 / 0.5)" }}
                            />
                            <input
                              id="signup-fullname"
                              data-ocid="signup.fullname_input"
                              type="text"
                              autoComplete="name"
                              placeholder="Your full name"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                setFieldErrors((p) => ({ ...p, fullName: "" }));
                              }}
                              disabled={busy}
                              className="form-input w-full pl-10 pr-4 disabled:opacity-50"
                            />
                          </div>
                          {fieldErrors.fullName && (
                            <p
                              data-ocid="signup.fullname_field_error"
                              className="error-message"
                            >
                              {fieldErrors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="signup-email"
                            className="text-xs font-semibold tracking-wide uppercase"
                            style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                          >
                            Email
                          </label>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                              style={{ color: "oklch(0.68 0.22 86 / 0.5)" }}
                            />
                            <input
                              id="signup-email"
                              data-ocid="signup.email_input"
                              type="email"
                              autoComplete="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setFieldErrors((p) => ({ ...p, email: "" }));
                              }}
                              disabled={busy}
                              className="form-input w-full pl-10 pr-4 disabled:opacity-50"
                            />
                          </div>
                          {fieldErrors.email && (
                            <p
                              data-ocid="signup.email_field_error"
                              className="error-message"
                            >
                              {fieldErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="signup-password"
                            className="text-xs font-semibold tracking-wide uppercase"
                            style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                          >
                            Password
                          </label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                              style={{ color: "oklch(0.68 0.22 86 / 0.5)" }}
                            />
                            <input
                              id="signup-password"
                              data-ocid="signup.password_input"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              placeholder="Min 8 characters"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setFieldErrors((p) => ({ ...p, password: "" }));
                              }}
                              disabled={busy}
                              className="form-input w-full pl-10 pr-11 disabled:opacity-50"
                            />
                            <button
                              type="button"
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                              data-ocid="signup.toggle_password_button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 rounded"
                              style={{ color: "oklch(0.68 0.22 86 / 0.5)" }}
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <PasswordStrengthBar password={password} />
                          {fieldErrors.password && (
                            <p
                              data-ocid="signup.password_field_error"
                              className="error-message"
                            >
                              {fieldErrors.password}
                            </p>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="signup-confirm"
                            className="text-xs font-semibold tracking-wide uppercase"
                            style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                          >
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                              style={{ color: "oklch(0.68 0.22 86 / 0.5)" }}
                            />
                            <input
                              id="signup-confirm"
                              data-ocid="signup.confirm_password_input"
                              type={showConfirm ? "text" : "password"}
                              autoComplete="new-password"
                              placeholder="Repeat your password"
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setFieldErrors((p) => ({
                                  ...p,
                                  confirmPassword: "",
                                }));
                              }}
                              disabled={busy}
                              className="form-input w-full pl-10 pr-11 disabled:opacity-50"
                            />
                            <button
                              type="button"
                              aria-label={
                                showConfirm
                                  ? "Hide confirm password"
                                  : "Show confirm password"
                              }
                              data-ocid="signup.toggle_confirm_button"
                              onClick={() => setShowConfirm((v) => !v)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 rounded"
                              style={{ color: "oklch(0.68 0.22 86 / 0.5)" }}
                            >
                              {showConfirm ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {fieldErrors.confirmPassword && (
                            <p
                              data-ocid="signup.confirm_password_field_error"
                              className="error-message"
                            >
                              {fieldErrors.confirmPassword}
                            </p>
                          )}
                        </div>

                        {/* Submit error */}
                        {submitError && (
                          <p
                            data-ocid="signup.error_state"
                            className="error-message rounded-lg px-3 py-2"
                            style={{
                              background: "oklch(0.55 0.22 25 / 0.1)",
                              border: "1px solid oklch(0.55 0.22 25 / 0.25)",
                            }}
                          >
                            {submitError}
                          </p>
                        )}

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          data-ocid="signup.submit_button"
                          disabled={busy}
                          className="btn-auth-primary flex items-center justify-center gap-2 btn-ripple"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.72 0.2 80))",
                          }}
                          whileHover={busy ? {} : { scale: 1.015 }}
                          whileTap={busy ? {} : { scale: 0.98 }}
                        >
                          {busy ? (
                            <>
                              <Spinner size={15} />
                              <span>Creating account…</span>
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </motion.button>

                        <button
                          type="button"
                          onClick={() => {
                            setMode("google");
                            setFieldErrors({});
                            setSubmitError("");
                          }}
                          className="text-xs text-center mt-1 focus:outline-none"
                          style={{ color: "oklch(0.99 0.005 240 / 0.3)" }}
                        >
                          ← Back to sign up options
                        </button>
                      </motion.form>
                    </AnimatePresence>
                  )}

                  {/* Passkey button (only in google mode) */}
                  {mode === "google" && (
                    <motion.button
                      type="button"
                      data-ocid="signup.passkey_button"
                      onClick={() => {
                        setMode("google");
                        login();
                      }}
                      disabled={busy}
                      className="w-full h-12 rounded-full flex items-center justify-center gap-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.22 86 / 0.08), oklch(0.6 0.16 40 / 0.06))",
                        border: "1px solid oklch(0.68 0.22 86 / 0.2)",
                        color: "oklch(0.68 0.22 86 / 0.7)",
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Fingerprint className="w-4 h-4" />
                      Sign in with Passkey / Biometrics
                    </motion.button>
                  )}

                  {/* Guest */}
                  <motion.button
                    type="button"
                    data-ocid="signup.browse_guest_link"
                    onClick={onNavigateHome}
                    className="w-full h-10 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2"
                    style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
                    whileHover={{ color: "oklch(0.99 0.005 240 / 0.7)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore as Guest
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info note */}
            <div
              className="mt-6 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs leading-relaxed"
              style={{
                background: "oklch(0.68 0.22 86 / 0.07)",
                border: "1px solid oklch(0.68 0.22 86 / 0.14)",
                color: "oklch(0.99 0.005 240 / 0.5)",
              }}
            >
              <Info
                className="w-3.5 h-3.5 mt-0.5 shrink-0"
                style={{ color: "oklch(0.68 0.22 86 / 0.7)" }}
              />
              <span>
                We use{" "}
                <span style={{ color: "oklch(0.68 0.22 86)" }}>
                  Internet Identity
                </span>{" "}
                — a secure, password-free login system that works across all
                your devices.
                <InfoTooltip text="Internet Identity uses cryptographic keys stored on your device. No passwords, no data leaks — safer than Google OAuth." />
              </span>
            </div>

            {/* Login link */}
            <p
              className="mt-5 text-center text-xs"
              style={{ color: "oklch(0.99 0.005 240 / 0.38)" }}
            >
              Already have an account?{" "}
              <button
                type="button"
                data-ocid="signup.login_link"
                onClick={onNavigateLogin ?? onNavigateHome}
                className="font-semibold underline underline-offset-2 transition-colors duration-200 focus:outline-none focus-visible:ring-1 rounded"
                style={{ color: "oklch(0.68 0.22 86 / 0.85)" }}
              >
                Sign in
              </button>
            </p>

            {/* Trust bar */}
            <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
              {(
                ["No passwords", "Fully private", "Decentralized"] as const
              ).map((label) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "oklch(0.68 0.22 86 / 0.6)" }}
                  />
                  <span
                    className="text-[10px] tracking-wide uppercase font-medium"
                    style={{ color: "oklch(0.99 0.005 240 / 0.3)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <Users
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.68 0.22 86 / 0.4)" }}
          />
          <p
            className="text-center text-xs"
            style={{ color: "oklch(0.99 0.005 240 / 0.22)" }}
          >
            Your identity is controlled entirely by you. ReviveRoots never
            stores passwords or personal data.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
