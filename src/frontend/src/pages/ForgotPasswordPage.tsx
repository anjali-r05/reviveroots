import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, ExternalLink, KeyRound, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// Floating background orbs
// ---------------------------------------------------------------------------
const ORB_CONFIG = [
  {
    id: "orb-gold",
    size: 340,
    top: "-16%",
    left: "-12%",
    color: "oklch(0.68 0.22 86 / 0.10)",
    delay: 0,
  },
  {
    id: "orb-terra",
    size: 240,
    bottom: "-16%",
    right: "-8%",
    color: "oklch(0.6 0.16 40 / 0.09)",
    delay: 0.7,
  },
  {
    id: "orb-sm",
    size: 160,
    top: "55%",
    left: "65%",
    color: "oklch(0.55 0.18 295 / 0.06)",
    delay: 1.2,
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
      animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
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
// Props
// ---------------------------------------------------------------------------
interface ForgotPasswordPageProps {
  onNavigateLogin: () => void;
}

export function ForgotPasswordPage({
  onNavigateLogin,
}: ForgotPasswordPageProps) {
  const { login, isLoggingIn } = useAuth();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.1 0.05 260)" }}
      data-ocid="forgot_password.page"
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
              "linear-gradient(oklch(0.68 0.22 86 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.22 86 / 0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Back button */}
      <motion.button
        type="button"
        data-ocid="forgot_password.back_login_link"
        onClick={onNavigateLogin}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium z-20 group focus:outline-none focus-visible:ring-2 rounded-lg px-1"
        style={{ color: "oklch(0.99 0.005 240 / 0.5)" }}
        whileHover={{ color: "oklch(0.68 0.22 86)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
        Back to Login
      </motion.button>

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-[420px] mx-auto px-4 sm:px-0"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
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
              "0 32px 80px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.68 0.22 86 / 0.06) inset",
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

          <div className="px-5 py-10 sm:px-8 sm:py-12">
            {/* Icon */}
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.22 86 / 0.15), oklch(0.6 0.16 40 / 0.1))",
                  border: "1px solid oklch(0.68 0.22 86 / 0.3)",
                  boxShadow: "0 0 32px oklch(0.68 0.22 86 / 0.15)",
                }}
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <KeyRound
                  className="w-8 h-8"
                  style={{ color: "oklch(0.68 0.22 86)" }}
                />
              </motion.div>

              <h1
                className="font-display text-2xl sm:text-3xl mb-2 leading-tight"
                style={{ color: "oklch(0.99 0.005 240)" }}
              >
                Account Recovery
              </h1>
              <p
                className="text-sm font-semibold tracking-widest uppercase"
                style={{ color: "oklch(0.68 0.22 86)" }}
              >
                ReviveRoots
              </p>
            </div>

            {/* Notice card */}
            <div
              className="rounded-xl px-5 py-4 mb-6"
              data-ocid="forgot_password.notice_panel"
              style={{
                background: "oklch(0.68 0.22 86 / 0.06)",
                border: "1px solid oklch(0.68 0.22 86 / 0.18)",
              }}
            >
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.68 0.22 86)" }}
                />
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "oklch(0.99 0.005 240 / 0.9)" }}
                  >
                    Email password reset is currently unavailable.
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.99 0.005 240 / 0.55)" }}
                  >
                    ReviveRoots uses{" "}
                    <span style={{ color: "oklch(0.68 0.22 86)" }}>
                      Internet Identity
                    </span>{" "}
                    for secure authentication — a passwordless, biometric system
                    that doesn&apos;t require email verification or password
                    recovery.
                  </p>
                </div>
              </div>
            </div>

            {/* What to do */}
            <div className="flex flex-col gap-3 mb-6">
              <p
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
              >
                What you can do instead
              </p>

              {/* Try Internet Identity */}
              <motion.button
                type="button"
                data-ocid="forgot_password.try_identity_button"
                onClick={login}
                disabled={isLoggingIn}
                className="w-full h-12 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed btn-ripple"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.72 0.2 80))",
                  color: "oklch(0.12 0.08 260)",
                }}
                whileHover={
                  isLoggingIn
                    ? {}
                    : {
                        scale: 1.015,
                        boxShadow: "0 0 24px oklch(0.68 0.22 86 / 0.3)",
                      }
                }
                whileTap={isLoggingIn ? {} : { scale: 0.98 }}
              >
                {isLoggingIn ? (
                  <>
                    <div
                      className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: "oklch(0.12 0.08 260 / 0.3)",
                        borderTopColor: "oklch(0.12 0.08 260)",
                      }}
                    />
                    <span>Opening Internet Identity…</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Try Internet Identity</span>
                  </>
                )}
              </motion.button>

              {/* Contact support */}
              <motion.a
                href="https://caffeine.ai?utm_source=reviveroots&utm_medium=forgot-password&utm_content=support"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="forgot_password.contact_support_button"
                className="w-full h-12 rounded-xl flex items-center justify-center gap-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2"
                style={{
                  background: "transparent",
                  border: "1px solid oklch(0.68 0.22 86 / 0.3)",
                  color: "oklch(0.78 0.18 86)",
                }}
                whileHover={{
                  scale: 1.01,
                  background: "oklch(0.68 0.22 86 / 0.08)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
                Contact Caffeine Support
              </motion.a>
            </div>

            {/* Info note */}
            <div
              className="rounded-xl px-4 py-3 text-xs leading-relaxed mb-2"
              style={{
                background: "oklch(0.55 0.18 295 / 0.06)",
                border: "1px solid oklch(0.55 0.18 295 / 0.18)",
                color: "oklch(0.99 0.005 240 / 0.45)",
              }}
            >
              <strong style={{ color: "oklch(0.99 0.005 240 / 0.65)" }}>
                How Internet Identity works:
              </strong>{" "}
              Your account is secured by cryptographic keys stored on your
              device (fingerprint, Face ID, or security key). There&apos;s no
              master password to recover — access is always via your
              device&apos;s built-in biometrics.
            </div>

            {/* Back to login */}
            <p
              className="mt-4 text-center text-xs"
              style={{ color: "oklch(0.99 0.005 240 / 0.35)" }}
            >
              <button
                type="button"
                data-ocid="forgot_password.back_login_link"
                onClick={onNavigateLogin}
                className="font-semibold underline underline-offset-2 transition-colors duration-200 focus:outline-none focus-visible:ring-1 rounded"
                style={{ color: "oklch(0.68 0.22 86 / 0.8)" }}
              >
                ← Back to Login
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
