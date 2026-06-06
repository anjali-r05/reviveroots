import { useAuth } from "@/hooks/useAuth";
import { Leaf } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  onRedirect: () => void;
}

function AuthLoadingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "oklch(0.1 0.05 260)" }}
      data-ocid="protected_route.loading_state"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            top: "-10%",
            left: "-8%",
            background: "oklch(0.68 0.22 86 / 0.1)",
            filter: "blur(72px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 260,
            height: 260,
            bottom: "-12%",
            right: "-8%",
            background: "oklch(0.6 0.16 40 / 0.1)",
            filter: "blur(72px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
            boxShadow: "0 0 32px oklch(0.68 0.22 86 / 0.4)",
          }}
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Leaf className="w-8 h-8" style={{ color: "oklch(0.12 0.08 260)" }} />
        </motion.div>

        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full border-4 animate-spin"
            style={{
              borderColor: "oklch(0.68 0.22 86 / 0.15)",
              borderTopColor: "oklch(0.68 0.22 86)",
            }}
          />
        </div>

        <div className="text-center">
          <p
            className="font-display text-xl mb-1"
            style={{ color: "oklch(0.68 0.22 86)" }}
          >
            Authenticating…
          </p>
          <p
            className="text-sm"
            style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
          >
            Verifying your identity
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function ProtectedRoute({ children, onRedirect }: ProtectedRouteProps) {
  const { isAuthenticated, isLoggingIn, isInitializing } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoggingIn && !isInitializing) {
      onRedirect();
    }
  }, [isAuthenticated, isLoggingIn, isInitializing, onRedirect]);

  if (isLoggingIn || isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
