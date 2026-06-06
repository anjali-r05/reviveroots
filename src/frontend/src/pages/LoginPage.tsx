import { createActor } from "@/backend";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { ArrowLeft, Eye, EyeOff, Leaf, Lock, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Floating background orbs
// ---------------------------------------------------------------------------
const ORB_CONFIG = [
  {
    id: "orb-gold-tl",
    size: 380,
    top: "-18%",
    left: "-14%",
    color: "oklch(0.68 0.22 86 / 0.12)",
    delay: 0,
  },
  {
    id: "orb-terra-br",
    size: 280,
    bottom: "-18%",
    right: "-10%",
    color: "oklch(0.6 0.16 40 / 0.10)",
    delay: 0.6,
  },
  {
    id: "orb-gold-mid",
    size: 200,
    top: "45%",
    left: "60%",
    color: "oklch(0.68 0.22 86 / 0.07)",
    delay: 1.0,
  },
  {
    id: "orb-purple-tr",
    size: 150,
    top: "20%",
    right: "14%",
    color: "oklch(0.55 0.18 295 / 0.06)",
    delay: 1.4,
  },
];

interface OrbProps {
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
}: OrbProps) {
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
      animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 8 + delay * 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Google logo SVG
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
// Props
// ---------------------------------------------------------------------------
interface LoginPageProps {
  onNavigateHome: () => void;
  onNavigateSignup: () => void;
  onNavigateForgotPassword: () => void;
  onNavigateDashboard: () => void;
}

export function LoginPage({
  onNavigateHome,
  onNavigateSignup,
  onNavigateForgotPassword,
  onNavigateDashboard,
}: LoginPageProps) {
  const { login, isAuthenticated, isLoggingIn, isInitializing } = useAuth();
  const { actor } = useActor(createActor);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  // After Internet Identity login, call updateLastLogin and go to dashboard
  useEffect(() => {
    if (!isAuthenticated || !actor) return;
    (async () => {
      try {
        await actor.updateLastLogin();
      } catch {
        // non-fatal
      }
      onNavigateDashboard();
    })();
  }, [isAuthenticated, actor, onNavigateDashboard]);

  // Handle "Sign In" button — triggers Internet Identity
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      login();
    } catch {
      setError("Authentication failed. Please try again.");
      setSubmitting(false);
    }
  }

  const busy = isLoggingIn || submitting || isInitializing;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.1 0.05 260)" }}
      data-ocid="login.page"
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
              "linear-gradient(oklch(0.68 0.22 86 / 0.035) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.22 86 / 0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Back button */}
      <motion.button
        type="button"
        data-ocid="login.back_home_link"
        onClick={onNavigateHome}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium z-20 group focus:outline-none focus-visible:ring-2 rounded-lg px-1"
        style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
        whileHover={{ color: "oklch(0.68 0.22 86)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
        Back to ReviveRoots
      </motion.button>

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-[420px] mx-auto px-4 sm:px-0"
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                  boxShadow: "0 0 24px oklch(0.68 0.22 86 / 0.35)",
                }}
                whileHover={{ scale: 1.06, rotate: 6 }}
                transition={{ type: "spring", stiffness: 320 }}
              >
                <Leaf
                  className="w-7 h-7"
                  style={{ color: "oklch(0.12 0.08 260)" }}
                />
              </motion.div>

              <h1
                className="font-display text-3xl sm:text-[2rem] mb-0.5 leading-tight"
                style={{ color: "oklch(0.99 0.005 240)" }}
              >
                Welcome Back
              </h1>
              <p
                className="text-sm font-semibold tracking-widest uppercase"
                style={{ color: "oklch(0.68 0.22 86)" }}
              >
                To Your Roots
              </p>
            </div>

            <div
              className="h-px w-full mb-6"
              style={{ background: "oklch(0.68 0.22 86 / 0.1)" }}
            />

            <AnimatePresence mode="wait">
              {isInitializing ? (
                <motion.div
                  key="init"
                  data-ocid="login.loading_state"
                  className="flex items-center justify-center py-6 gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Spinner />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                  >
                    Initializing…
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Google button */}
                  <motion.button
                    type="button"
                    data-ocid="login.google_button"
                    onClick={login}
                    disabled={busy}
                    className="w-full h-12 rounded-full flex items-center justify-center gap-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed mb-5"
                    style={{
                      background: "oklch(0.99 0.005 240)",
                      color: "oklch(0.2 0.02 260)",
                      boxShadow:
                        "0 2px 8px oklch(0 0 0 / 0.2), 0 0 0 1px oklch(0 0 0 / 0.08)",
                    }}
                    whileHover={{
                      scale: 1.015,
                      boxShadow: "0 4px 20px oklch(0 0 0 / 0.28)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoggingIn ? (
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
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="flex-1 h-px"
                      style={{ background: "oklch(0.68 0.22 86 / 0.14)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.99 0.005 240 / 0.3)" }}
                    >
                      or sign in with email
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: "oklch(0.68 0.22 86 / 0.14)" }}
                    />
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSignIn}
                    noValidate
                    className="flex flex-col gap-4"
                  >
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="login-email"
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
                          ref={emailRef}
                          id="login-email"
                          data-ocid="login.email_input"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          disabled={busy}
                          className="form-input w-full pl-10 pr-4 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="login-password"
                          className="text-xs font-semibold tracking-wide uppercase"
                          style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          data-ocid="login.forgot_password_link"
                          onClick={onNavigateForgotPassword}
                          className="text-xs transition-colors duration-200 focus:outline-none focus-visible:ring-1 rounded"
                          style={{ color: "oklch(0.68 0.22 86 / 0.7)" }}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                          style={{ color: "oklch(0.68 0.22 86 / 0.5)" }}
                        />
                        <input
                          id="login-password"
                          data-ocid="login.password_input"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                          }}
                          disabled={busy}
                          className="form-input w-full pl-10 pr-11 disabled:opacity-50"
                        />
                        <button
                          type="button"
                          data-ocid="login.toggle_password_button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
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
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          data-ocid="login.error_state"
                          className="error-message flex items-center gap-2 rounded-lg px-3 py-2"
                          style={{
                            background: "oklch(0.55 0.22 25 / 0.1)",
                            border: "1px solid oklch(0.55 0.22 25 / 0.25)",
                          }}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      data-ocid="login.submit_button"
                      disabled={busy}
                      className="btn-auth-primary flex items-center justify-center gap-2 mt-1 btn-ripple"
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
                          <span>Signing in…</span>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </motion.button>
                  </form>

                  {/* Guest link */}
                  <motion.button
                    type="button"
                    data-ocid="login.guest_browse_link"
                    onClick={onNavigateHome}
                    className="w-full h-10 mt-3 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2"
                    style={{ color: "oklch(0.99 0.005 240 / 0.35)" }}
                    whileHover={{ color: "oklch(0.99 0.005 240 / 0.65)" }}
                  >
                    Continue as Guest
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sign up link */}
            <p
              className="mt-5 text-center text-xs"
              style={{ color: "oklch(0.99 0.005 240 / 0.38)" }}
            >
              Don&apos;t have an account?{" "}
              <button
                type="button"
                data-ocid="login.signup_link"
                onClick={onNavigateSignup}
                className="font-semibold underline underline-offset-2 transition-colors duration-200 focus:outline-none focus-visible:ring-1 rounded"
                style={{ color: "oklch(0.68 0.22 86 / 0.9)" }}
              >
                Sign up
              </button>
            </p>

            {/* Trust bar */}
            <div className="mt-5 flex items-center justify-center gap-4 flex-wrap">
              {["No passwords", "Fully private", "Decentralized"].map(
                (label) => (
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
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
