import { u as useAuth, aH as useGetUserProfile, aM as useSaveUserProfile, r as reactExports, j as jsxRuntimeExports, m as motion, g as Leaf, aG as ArrowLeft, X, q as ue } from "./index-CITPV5fo.js";
import { P as Plus } from "./plus-DXNHFuqS.js";
import { L as LoaderCircle } from "./loader-circle-EhLWIom1.js";
function UserProfilePage({ onNavigate }) {
  const { shortPrincipal } = useAuth();
  const { data: profile, isLoading } = useGetUserProfile();
  const saveProfile = useSaveUserProfile();
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [heritageRegion, setHeritageRegion] = reactExports.useState("");
  const [languageInterests, setLanguageInterests] = reactExports.useState([]);
  const [langInput, setLangInput] = reactExports.useState("");
  reactExports.useEffect(() => {
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
  const removeLanguage = (lang) => {
    setLanguageInterests((prev) => prev.filter((l) => l !== lang));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await saveProfile.mutateAsync({
        fullName: fullName.trim(),
        email: email.trim(),
        heritageRegion: heritageRegion.trim(),
        languageInterests
      });
      ue.success("Profile updated!", {
        description: "Your heritage profile has been saved."
      });
    } catch {
      ue.error("Failed to save profile", {
        description: "Please try again."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen relative overflow-x-hidden flex flex-col",
      style: { background: "oklch(0.1 0.05 260)" },
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed inset-0 overflow-hidden pointer-events-none",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute rounded-full",
                  style: {
                    width: 420,
                    height: 420,
                    top: "-15%",
                    left: "-10%",
                    background: "oklch(0.68 0.22 86 / 0.07)",
                    filter: "blur(90px)"
                  },
                  animate: { scale: [1, 1.1, 1] },
                  transition: {
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute rounded-full",
                  style: {
                    width: 320,
                    height: 320,
                    bottom: "-10%",
                    right: "-8%",
                    background: "oklch(0.6 0.16 40 / 0.06)",
                    filter: "blur(80px)"
                  },
                  animate: { scale: [1, 1.08, 1] },
                  transition: {
                    duration: 14,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            className: "sticky top-0 z-40",
            style: {
              backdropFilter: "blur(16px)",
              background: "oklch(0.12 0.06 260 / 0.85)",
              borderBottom: "1px solid oklch(0.68 0.22 86 / 0.12)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Leaf,
                    {
                      className: "w-4 h-4",
                      style: { color: "oklch(0.12 0.08 260)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display text-base font-semibold",
                  style: { color: "oklch(0.99 0.005 240)" },
                  children: "ReviveRoots"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              "data-ocid": "profile.back_button",
              onClick: () => onNavigate("dashboard"),
              className: "flex items-center gap-2 text-sm font-medium mb-7 group min-h-[44px] transition-smooth",
              style: { color: "oklch(0.99 0.005 240 / 0.45)" },
              whileHover: { color: "oklch(0.68 0.22 86)" },
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.35 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" }),
                "Back to Dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              className: "rounded-3xl overflow-hidden",
              style: {
                background: "oklch(0.13 0.06 260 / 0.88)",
                border: "1px solid oklch(0.68 0.22 86 / 0.18)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 72px oklch(0 0 0 / 0.35)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-[2px] w-full",
                    style: {
                      background: "linear-gradient(90deg, oklch(0.68 0.22 86), oklch(0.72 0.2 80), oklch(0.6 0.16 40))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-7 sm:px-8 sm:py-9", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "font-display text-2xl sm:text-3xl mb-1",
                      style: { color: "oklch(0.99 0.005 240)" },
                      children: "Your Profile"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm mb-7",
                      style: { color: "oklch(0.99 0.005 240 / 0.4)" },
                      children: "Personalize your heritage journey"
                    }
                  ),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 py-4", "data-ocid": "profile.loading_state", children: Array.from({ length: 4 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-3 w-24 rounded mb-2 animate-pulse",
                          style: { background: "oklch(0.2 0.06 260)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-11 rounded-xl animate-pulse",
                          style: { background: "oklch(0.18 0.06 260)" }
                        }
                      )
                    ] }, i)
                  )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleSave,
                      className: "space-y-5",
                      "data-ocid": "profile.form",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "fullName",
                              className: "block text-sm font-medium mb-2",
                              style: { color: "oklch(0.99 0.005 240 / 0.7)" },
                              children: "Full Name"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "fullName",
                              type: "text",
                              className: "form-input w-full text-sm",
                              placeholder: "Enter your full name",
                              value: fullName,
                              onChange: (e) => setFullName(e.target.value),
                              "data-ocid": "profile.full_name_input",
                              autoComplete: "name"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: "email",
                              className: "block text-sm font-medium mb-2",
                              style: { color: "oklch(0.99 0.005 240 / 0.7)" },
                              children: [
                                "Email",
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "ml-2 text-xs font-normal",
                                    style: { color: "oklch(0.99 0.005 240 / 0.3)" },
                                    children: "(optional, not used for login)"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "email",
                              type: "email",
                              className: "form-input w-full text-sm",
                              placeholder: "your@email.com",
                              value: email,
                              onChange: (e) => setEmail(e.target.value),
                              "data-ocid": "profile.email_input",
                              autoComplete: "email"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "heritageRegion",
                              className: "block text-sm font-medium mb-2",
                              style: { color: "oklch(0.99 0.005 240 / 0.7)" },
                              children: "Heritage Region"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "heritageRegion",
                              type: "text",
                              className: "form-input w-full text-sm",
                              placeholder: "e.g. South India, West Africa, East Asia",
                              value: heritageRegion,
                              onChange: (e) => setHeritageRegion(e.target.value),
                              "data-ocid": "profile.heritage_region_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "langInput",
                              className: "block text-sm font-medium mb-2",
                              style: { color: "oklch(0.99 0.005 240 / 0.7)" },
                              children: "Language Interests"
                            }
                          ),
                          languageInterests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: languageInterests.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                              style: {
                                background: "oklch(0.68 0.22 86 / 0.12)",
                                border: "1px solid oklch(0.68 0.22 86 / 0.3)",
                                color: "oklch(0.78 0.18 86)"
                              },
                              "data-ocid": "profile.language_tag",
                              children: [
                                lang,
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    "aria-label": `Remove ${lang}`,
                                    onClick: () => removeLanguage(lang),
                                    className: "hover:opacity-70 transition-opacity",
                                    "data-ocid": "profile.language_remove_button",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                                  }
                                )
                              ]
                            },
                            lang
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "langInput",
                                type: "text",
                                className: "form-input flex-1 text-sm",
                                placeholder: "e.g. Tamil, Swahili, Welsh",
                                value: langInput,
                                onChange: (e) => setLangInput(e.target.value),
                                onKeyDown: (e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addLanguage();
                                  }
                                },
                                "data-ocid": "profile.language_input"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: addLanguage,
                                disabled: !langInput.trim(),
                                "data-ocid": "profile.add_language_button",
                                className: "px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1 transition-smooth disabled:opacity-40",
                                style: {
                                  background: "oklch(0.68 0.22 86 / 0.15)",
                                  border: "1px solid oklch(0.68 0.22 86 / 0.3)",
                                  color: "oklch(0.78 0.18 86)"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                                  "Add"
                                ]
                              }
                            )
                          ] })
                        ] }),
                        shortPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "rounded-xl px-4 py-3 flex items-center gap-3",
                            style: {
                              background: "oklch(0.68 0.22 86 / 0.06)",
                              border: "1px solid oklch(0.68 0.22 86 / 0.12)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs",
                                  style: { color: "oklch(0.99 0.005 240 / 0.4)" },
                                  children: "Identity ID:"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs font-mono",
                                  style: { color: "oklch(0.68 0.22 86 / 0.7)" },
                                  children: shortPrincipal
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "submit",
                            disabled: saveProfile.isPending,
                            "data-ocid": "profile.save_button",
                            className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold min-h-[48px] transition-smooth disabled:opacity-60",
                            style: {
                              background: "linear-gradient(135deg, oklch(0.68 0.22 86), oklch(0.6 0.16 40))",
                              color: "oklch(0.12 0.08 260)",
                              boxShadow: saveProfile.isPending ? "none" : "0 4px 20px oklch(0.68 0.22 86 / 0.25)"
                            },
                            children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                              "Saving…"
                            ] }) : "Save Profile"
                          }
                        ) })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  UserProfilePage as default
};
