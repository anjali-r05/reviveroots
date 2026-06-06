import { useAuth } from "@/hooks/useAuth";
import { useGetUserProfile, useSaveUserProfile } from "@/hooks/useBackend";
import type { AppRoute } from "@/types/index";
import { ArrowLeft, Leaf, Loader2, Plus, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UserProfilePageProps {
  onNavigate: (route: AppRoute) => void;
}

export default function UserProfilePage({ onNavigate }: UserProfilePageProps) {
  const { shortPrincipal } = useAuth();
  const { data: profile, isLoading } = useGetUserProfile();
  const saveProfile = useSaveUserProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [heritageRegion, setHeritageRegion] = useState("");
  const [languageInterests, setLanguageInterests] = useState<string[]>([]);
  const [langInput, setLangInput] = useState("");

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName);
      setEmail(profile.email);
      setHeritageRegion(profile.heritageRegion);
      setLanguageInterests(profile.languageInterests);
    }
  }, [profile]);

  const addLanguage = () => {
    const trimmed = langInput.trim();
    if (trimmed && !languageInterests.includes(trimmed)) {
      setLanguageInterests((prev) => [...prev, trimmed]);
    }
    setLangInput("");
  };

  const removeLanguage = (lang: string) => {
    setLanguageInterests((prev) => prev.filter((l) => l !== lang));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveProfile.mutateAsync({
        fullName: fullName.trim(),
        email: email.trim(),
        heritageRegion: heritageRegion.trim(),
        languageInterests,
      });
      toast.success("Profile updated!", {
        description: "Your heritage profile has been saved.",
      });
    } catch {
      toast.error("Failed to save profile", {
        description: "Please try again.",
      });
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden flex flex-col"
      style={{ background: "oklch(0.1 0.05 260)" }}
      data-ocid="profile.page"
    >
      {/* Background orbs */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            top: "-15%",
            left: "-10%",
            background: "oklch(0.68 0.22 86 / 0.07)",
            filter: "blur(90px)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            bottom: "-10%",
            right: "-8%",
            background: "oklch(0.6 0.16 40 / 0.06)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Top bar */}
      <nav
        className="sticky top-0 z-40"
        style={{
          backdropFilter: "blur(16px)",
          background: "oklch(0.12 0.06 260 / 0.85)",
          borderBottom: "1px solid oklch(0.68 0.22 86 / 0.12)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
            }}
          >
            <Leaf
              className="w-4 h-4"
              style={{ color: "oklch(0.12 0.08 260)" }}
            />
          </div>
          <span
            className="font-display text-base font-semibold"
            style={{ color: "oklch(0.99 0.005 240)" }}
          >
            ReviveRoots
          </span>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10">
        {/* Back link */}
        <motion.button
          type="button"
          data-ocid="profile.back_button"
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-2 text-sm font-medium mb-7 group min-h-[44px] transition-smooth"
          style={{ color: "oklch(0.99 0.005 240 / 0.45)" }}
          whileHover={{ color: "oklch(0.68 0.22 86)" }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
          Back to Dashboard
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "oklch(0.13 0.06 260 / 0.88)",
            border: "1px solid oklch(0.68 0.22 86 / 0.18)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 72px oklch(0 0 0 / 0.35)",
          }}
        >
          {/* Gold accent top */}
          <div
            className="h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.68 0.22 86), oklch(0.72 0.2 80), oklch(0.6 0.16 40))",
            }}
          />

          <div className="px-6 py-7 sm:px-8 sm:py-9">
            <h1
              className="font-display text-2xl sm:text-3xl mb-1"
              style={{ color: "oklch(0.99 0.005 240)" }}
            >
              Your Profile
            </h1>
            <p
              className="text-sm mb-7"
              style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
            >
              Personalize your heritage journey
            </p>

            {isLoading ? (
              <div className="space-y-5 py-4" data-ocid="profile.loading_state">
                {Array.from({ length: 4 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                  <div key={i}>
                    <div
                      className="h-3 w-24 rounded mb-2 animate-pulse"
                      style={{ background: "oklch(0.2 0.06 260)" }}
                    />
                    <div
                      className="h-11 rounded-xl animate-pulse"
                      style={{ background: "oklch(0.18 0.06 260)" }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <form
                onSubmit={handleSave}
                className="space-y-5"
                data-ocid="profile.form"
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "oklch(0.99 0.005 240 / 0.7)" }}
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="form-input w-full text-sm"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    data-ocid="profile.full_name_input"
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "oklch(0.99 0.005 240 / 0.7)" }}
                  >
                    Email
                    <span
                      className="ml-2 text-xs font-normal"
                      style={{ color: "oklch(0.99 0.005 240 / 0.3)" }}
                    >
                      (optional, not used for login)
                    </span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-sm"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-ocid="profile.email_input"
                    autoComplete="email"
                  />
                </div>

                {/* Heritage Region */}
                <div>
                  <label
                    htmlFor="heritageRegion"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "oklch(0.99 0.005 240 / 0.7)" }}
                  >
                    Heritage Region
                  </label>
                  <input
                    id="heritageRegion"
                    type="text"
                    className="form-input w-full text-sm"
                    placeholder="e.g. South India, West Africa, East Asia"
                    value={heritageRegion}
                    onChange={(e) => setHeritageRegion(e.target.value)}
                    data-ocid="profile.heritage_region_input"
                  />
                </div>

                {/* Language Interests */}
                <div>
                  <label
                    htmlFor="langInput"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "oklch(0.99 0.005 240 / 0.7)" }}
                  >
                    Language Interests
                  </label>

                  {/* Tag chips */}
                  {languageInterests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {languageInterests.map((lang) => (
                        <span
                          key={lang}
                          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: "oklch(0.68 0.22 86 / 0.12)",
                            border: "1px solid oklch(0.68 0.22 86 / 0.3)",
                            color: "oklch(0.78 0.18 86)",
                          }}
                          data-ocid="profile.language_tag"
                        >
                          {lang}
                          <button
                            type="button"
                            aria-label={`Remove ${lang}`}
                            onClick={() => removeLanguage(lang)}
                            className="hover:opacity-70 transition-opacity"
                            data-ocid="profile.language_remove_button"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      id="langInput"
                      type="text"
                      className="form-input flex-1 text-sm"
                      placeholder="e.g. Tamil, Swahili, Welsh"
                      value={langInput}
                      onChange={(e) => setLangInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addLanguage();
                        }
                      }}
                      data-ocid="profile.language_input"
                    />
                    <button
                      type="button"
                      onClick={addLanguage}
                      disabled={!langInput.trim()}
                      data-ocid="profile.add_language_button"
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1 transition-smooth disabled:opacity-40"
                      style={{
                        background: "oklch(0.68 0.22 86 / 0.15)",
                        border: "1px solid oklch(0.68 0.22 86 / 0.3)",
                        color: "oklch(0.78 0.18 86)",
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Principal ID display */}
                {shortPrincipal && (
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-3"
                    style={{
                      background: "oklch(0.68 0.22 86 / 0.06)",
                      border: "1px solid oklch(0.68 0.22 86 / 0.12)",
                    }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.99 0.005 240 / 0.4)" }}
                    >
                      Identity ID:
                    </span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: "oklch(0.68 0.22 86 / 0.7)" }}
                    >
                      {shortPrincipal}
                    </span>
                  </div>
                )}

                {/* Save */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={saveProfile.isPending}
                    data-ocid="profile.save_button"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold min-h-[48px] transition-smooth disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                      color: "oklch(0.12 0.08 260)",
                      boxShadow: saveProfile.isPending
                        ? "none"
                        : "0 4px 20px oklch(0.68 0.22 86 / 0.25)",
                    }}
                  >
                    {saveProfile.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
