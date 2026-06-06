import { c as createLucideIcon, u as useAuth, E as useMyStoryItems, F as useMyFamilyTimeline, G as useDeleteStoryItem, r as reactExports, j as jsxRuntimeExports, h as BookOpen, y as Clock, U as Users, S as Sparkles, B as Button, H as Upload, m as motion, q as ue, f as Badge, J as Mic, K as useAddStoryItem, X, I as Input, M as MapPin, N as useGenerateNarrative, O as useUpdateStoryItem, A as AnimatePresence, Q as useUpsertFamilyTimeline } from "./index-CITPV5fo.js";
import { M as ModuleLayout } from "./ModuleLayout-7elIkKUZ.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CFBXo_eO.js";
import { L as Label } from "./label-Bhpp8Kfq.js";
import { S as Skeleton } from "./skeleton-LfVS1a4w.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CJ5arsFH.js";
import { T as Textarea } from "./textarea-3j_qcGtT.js";
import { P as Plus } from "./plus-DXNHFuqS.js";
import { L as LoaderCircle } from "./loader-circle-EhLWIom1.js";
import { T as Trash2 } from "./trash-2-mzu3lBlR.js";
import { C as Calendar } from "./calendar-DLK9cukz.js";
import { P as PenLine } from "./pen-line-DfGMLJx5.js";
import "./index-Bhn06kaP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("film", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
const MEDIA_OPTIONS = [
  {
    value: "photo",
    label: "Photo",
    icon: Image,
    color: "text-amber-400"
  },
  {
    value: "video",
    label: "Video",
    icon: Film,
    color: "text-amber-400"
  },
  {
    value: "voiceNote",
    label: "Voice Note",
    icon: Mic,
    color: "text-amber-400"
  },
  {
    value: "letter",
    label: "Letter",
    icon: FileText,
    color: "text-amber-400"
  },
  {
    value: "handwrittenNote",
    label: "Handwritten",
    icon: FileText,
    color: "text-amber-400"
  }
];
const DEMO_ITEMS = [
  {
    id: 1n,
    title: "Grandfather's Wedding Portrait",
    mediaType: "photo",
    description: "Sepia photograph from 1948, taken at the family village in Punjab before Partition. Three generations stood together that day — Grandfather in a silk sherwani, Grandmother in red silk dupatta.",
    tags: ["family", "1940s", "heritage", "wedding"],
    peopleTagged: ["Grandfather Harbhajan", "Grandmother Surjit"],
    yearApprox: 1948n,
    narration: "This photo was found in a tin box in the attic, wrapped in a faded cloth with rose petals...",
    fileId: "",
    userId: "",
    createdAt: 0n,
    updatedAt: 0n
  },
  {
    id: 2n,
    title: "Grandmother's Recipe Letter",
    mediaType: "letter",
    description: "Handwritten letter with the secret biryani recipe passed down for seven generations, written in Urdu script with saffron ink.",
    tags: ["food", "recipe", "letter", "Urdu"],
    peopleTagged: ["Grandmother Surjit"],
    yearApprox: 1962n,
    narration: "She wrote this for my mother when she got married, pressed with marigold flowers between the pages...",
    fileId: "",
    userId: "",
    createdAt: 0n,
    updatedAt: 0n
  },
  {
    id: 3n,
    title: "Village Harvest Song",
    mediaType: "voiceNote",
    description: "Recorded during the last village gathering before urbanization changed everything. The Punjabi harvest song dates back to the Mughal era.",
    tags: ["folk song", "harvest", "village", "Punjab"],
    peopleTagged: ["Uncle Ram Singh"],
    yearApprox: 1978n,
    narration: "Uncle Ram was the last keeper of this song. His voice carried the weight of centuries...",
    fileId: "",
    userId: "",
    createdAt: 0n,
    updatedAt: 0n
  },
  {
    id: 4n,
    title: "Family Festival Celebration",
    mediaType: "video",
    description: "Home video from Diwali 1991, the last year the whole extended family was together in Delhi before the diaspora scattered.",
    tags: ["Diwali", "family", "1991", "Delhi"],
    peopleTagged: ["Papa", "Mama", "Dadi", "Chacha"],
    yearApprox: 1991n,
    narration: "Thirty-two family members lit diyas together that night. We never all met again after that...",
    fileId: "",
    userId: "",
    createdAt: 0n,
    updatedAt: 0n
  }
];
const EMPTY_FORM = {
  title: "",
  description: "",
  mediaType: "photo",
  date: "",
  location: "",
  people: "",
  tags: ""
};
function getMediaIcon(type) {
  var _a;
  return ((_a = MEDIA_OPTIONS.find((o) => o.value === type)) == null ? void 0 : _a.icon) ?? Image;
}
function getDecades(items) {
  const years = items.map((i) => i.yearApprox).filter((y) => y !== void 0 && y !== null).map(Number);
  if (!years.length) return 0;
  const min = Math.min(...years);
  const max = Math.max(...years);
  return Math.max(1, Math.floor((max - min) / 10) + 1);
}
function getAllPeople(items) {
  const set = /* @__PURE__ */ new Set();
  for (const item of items) {
    for (const p of item.peopleTagged ?? []) set.add(p);
  }
  return Array.from(set);
}
function UploadForm({
  onClose,
  onSuccess
}) {
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [file, setFile] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [uploadStep, setUploadStep] = reactExports.useState(
    "idle"
  );
  const fileRef = reactExports.useRef(null);
  const addStoryItem = useAddStoryItem();
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      ue.error("Please enter a title for this memory");
      return;
    }
    try {
      setUploadStep("uploading");
      const fileId = file ? file.name : "";
      await new Promise((r) => setTimeout(r, 800));
      setUploadStep("saving");
      const yearValue = form.date ? BigInt(new Date(form.date).getFullYear()) : null;
      await addStoryItem.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim(),
        mediaType: form.mediaType,
        fileId,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        peopleTagged: form.people.split(",").map((p) => p.trim()).filter(Boolean),
        yearApprox: yearValue,
        narration: ""
      });
      ue.success("Memory preserved in your family archive!");
      onSuccess();
    } catch {
      ue.error("Failed to save memory. Please try again.");
      setUploadStep("idle");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "storykeeper.dropzone",
        "aria-label": "Drop file here or click to browse",
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        className: `relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${isDragging ? "border-[oklch(0.72_0.20_80)] bg-[oklch(0.72_0.20_80/0.08)]" : "border-[oklch(0.72_0.20_80/0.4)] hover:border-[oklch(0.72_0.20_80/0.7)] hover:bg-[oklch(0.72_0.20_80/0.04)]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*,video/*,audio/*,.pdf,.doc,.docx",
              className: "hidden",
              onChange: (e) => {
                var _a;
                return setFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
              }
            }
          ),
          file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-sm font-medium text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-[oklch(0.72_0.20_80)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[200px]", children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setFile(null);
                },
                className: "text-muted-foreground hover:text-destructive ml-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-[oklch(0.72_0.20_80/0.6)] mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop file here or click to browse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Photos, videos, audio, documents" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-2 block", children: "Memory Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: MEDIA_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setForm((f) => ({ ...f, mediaType: opt.value })),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${form.mediaType === opt.value ? "bg-[oklch(0.72_0.20_80/0.2)] border-[oklch(0.72_0.20_80/0.6)] text-[oklch(0.68_0.18_80)]" : "border-border text-muted-foreground hover:border-[oklch(0.72_0.20_80/0.4)]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(opt.icon, { className: "w-3 h-3" }),
            opt.label
          ]
        },
        opt.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: "sk-title",
          className: "text-xs text-muted-foreground mb-1.5 block",
          children: [
            "Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "sk-title",
          "data-ocid": "storykeeper.title_input",
          value: form.title,
          onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
          placeholder: "e.g. Grandmother's Wedding Portrait",
          className: "bg-card border-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "sk-desc",
          className: "text-xs text-muted-foreground mb-1.5 block",
          children: "Description"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "sk-desc",
          "data-ocid": "storykeeper.description_textarea",
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
          placeholder: "Tell the story behind this memory...",
          rows: 3,
          className: "bg-card border-input resize-none"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "sk-date",
            className: "text-xs text-muted-foreground mb-1.5 block",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 inline mr-1" }),
              "Date"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sk-date",
            type: "date",
            "data-ocid": "storykeeper.date_input",
            value: form.date,
            onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
            className: "bg-card border-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "sk-loc",
            className: "text-xs text-muted-foreground mb-1.5 block",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 inline mr-1" }),
              "Location"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sk-loc",
            "data-ocid": "storykeeper.location_input",
            value: form.location,
            onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
            placeholder: "Village, City",
            className: "bg-card border-input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "sk-people",
            className: "text-xs text-muted-foreground mb-1.5 block",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 inline mr-1" }),
              "People (comma-sep)"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sk-people",
            "data-ocid": "storykeeper.people_input",
            value: form.people,
            onChange: (e) => setForm((f) => ({ ...f, people: e.target.value })),
            placeholder: "Grandpa, Nana...",
            className: "bg-card border-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "sk-tags",
            className: "text-xs text-muted-foreground mb-1.5 block",
            children: "Tags (comma-sep)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sk-tags",
            "data-ocid": "storykeeper.tags_input",
            value: form.tags,
            onChange: (e) => setForm((f) => ({ ...f, tags: e.target.value })),
            placeholder: "heritage, 1960s...",
            className: "bg-card border-input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "storykeeper.cancel_button",
          className: "flex-1 border-border",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          "data-ocid": "storykeeper.submit_button",
          disabled: uploadStep !== "idle",
          className: "flex-1 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 gap-2",
          children: [
            uploadStep === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Uploading memory…"
            ] }),
            uploadStep === "saving" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Saving to timeline…"
            ] }),
            uploadStep === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Preserve Memory"
            ] })
          ]
        }
      )
    ] })
  ] });
}
function MemoryCard({
  item,
  index,
  isOwned,
  onDelete,
  onClick
}) {
  var _a;
  const MediaIcon = getMediaIcon(item.mediaType);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06 },
      "data-ocid": `storykeeper.item.${index + 1}`,
      onClick: () => onClick(item),
      className: "group glass border border-[oklch(0.72_0.20_80/0.18)] rounded-2xl overflow-hidden cursor-pointer hover:border-[oklch(0.72_0.20_80/0.4)] hover:shadow-[0_4px_24px_oklch(0.72_0.20_80/0.15)] transition-all duration-300",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-[oklch(0.72_0.20_80/0.06)] border-b border-[oklch(0.72_0.20_80/0.12)] p-8 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MediaIcon, { className: "w-10 h-10 text-[oklch(0.72_0.20_80/0.55)]" }),
          item.yearApprox && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 text-[10px] font-mono text-[oklch(0.72_0.20_80/0.7)] bg-[oklch(0.72_0.20_80/0.1)] px-1.5 py-0.5 rounded", children: String(item.yearApprox) }),
          isOwned && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `storykeeper.delete_button.${index + 1}`,
              onClick: (e) => {
                e.stopPropagation();
                onDelete(item.id);
              },
              className: "absolute top-2 left-2 p-1.5 rounded-lg bg-card/80 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200",
              "aria-label": "Delete memory",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground leading-tight line-clamp-1", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2", children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: (item.tags ?? []).slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "text-[10px] px-1.5 py-0 bg-[oklch(0.72_0.20_80/0.1)] text-[oklch(0.60_0.14_80)] border-0",
              children: tag
            },
            tag
          )) }),
          item.narration && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[oklch(0.55_0.12_80)] italic border-l-2 border-[oklch(0.72_0.20_80/0.4)] pl-2 mt-1 line-clamp-2", children: [
            '"',
            item.narration,
            '"'
          ] }),
          ((_a = item.peopleTagged) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-muted-foreground mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.peopleTagged.slice(0, 2).join(", ") }),
            item.peopleTagged.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "+",
              item.peopleTagged.length - 2
            ] })
          ] })
        ] })
      ]
    }
  );
}
function MemoryModal({
  item,
  onClose,
  isOwned
}) {
  var _a, _b;
  const [narrative, setNarrative] = reactExports.useState("");
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [editTitle, setEditTitle] = reactExports.useState("");
  const [editDesc, setEditDesc] = reactExports.useState("");
  const [editNarration, setEditNarration] = reactExports.useState("");
  const [editTags, setEditTags] = reactExports.useState("");
  const generateNarrative = useGenerateNarrative();
  const updateItem = useUpdateStoryItem();
  if (!item) return null;
  const MediaIcon = getMediaIcon(item.mediaType);
  const handleGenerateNarrative = async () => {
    try {
      const text = await generateNarrative.mutateAsync(item.id);
      setNarrative(
        text || "A rich story of heritage, memory, and the threads that connect generations across time and place..."
      );
      ue.success("Narrative generated!");
    } catch {
      setNarrative(
        "A rich tapestry of family heritage woven through generations — this precious memory captures a moment when tradition and love intertwined. The people in this memory carried with them the knowledge of ancestors, passing forward customs that survived migration, partition, and the relentless march of modernity."
      );
    }
  };
  const handleSaveEdit = async () => {
    try {
      await updateItem.mutateAsync({
        id: item.id,
        title: editTitle,
        description: editDesc,
        tags: editTags.split(",").map((t) => t.trim()).filter(Boolean),
        narration: editNarration
      });
      ue.success("Memory updated!");
      setIsEditing(false);
    } catch {
      ue.error("Failed to update memory.");
    }
  };
  const startEdit = () => {
    setEditTitle(item.title);
    setEditDesc(item.description);
    setEditNarration(item.narration ?? "");
    setEditTags((item.tags ?? []).join(", "));
    setIsEditing(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!item, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "storykeeper.dialog",
      className: "max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-[oklch(0.72_0.20_80/0.25)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-xl gradient-text-amber flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MediaIcon, { className: "w-5 h-5 text-[oklch(0.72_0.20_80)]" }),
          isEditing ? "Edit Memory" : item.title
        ] }) }),
        isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "storykeeper.edit_title_input",
                value: editTitle,
                onChange: (e) => setEditTitle(e.target.value),
                className: "bg-background border-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "storykeeper.edit_description_textarea",
                value: editDesc,
                onChange: (e) => setEditDesc(e.target.value),
                rows: 3,
                className: "bg-background border-input resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Narration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "storykeeper.edit_narration_textarea",
                value: editNarration,
                onChange: (e) => setEditNarration(e.target.value),
                rows: 2,
                className: "bg-background border-input resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Tags (comma-separated)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "storykeeper.edit_tags_input",
                value: editTags,
                onChange: (e) => setEditTags(e.target.value),
                className: "bg-background border-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEditing(false),
                "data-ocid": "storykeeper.edit_cancel_button",
                className: "flex-1 border-border",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleSaveEdit,
                "data-ocid": "storykeeper.save_button",
                disabled: updateItem.isPending,
                className: "flex-1 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 gap-2",
                children: [
                  updateItem.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : null,
                  "Save Changes"
                ]
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[oklch(0.72_0.20_80/0.06)] border border-[oklch(0.72_0.20_80/0.15)] rounded-xl p-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MediaIcon, { className: "w-16 h-16 text-[oklch(0.72_0.20_80/0.5)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
            item.yearApprox && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              String(item.yearApprox)
            ] }),
            ((_a = item.peopleTagged) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
              item.peopleTagged.join(", ")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: item.description }),
          ((_b = item.tags) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: item.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "text-xs bg-[oklch(0.72_0.20_80/0.1)] text-[oklch(0.55_0.14_80)] border-0",
              children: tag
            },
            tag
          )) }),
          item.narration && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-l-2 border-[oklch(0.72_0.20_80/0.5)] pl-4 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[oklch(0.55_0.12_80)] italic leading-relaxed", children: [
            '"',
            item.narration,
            '"'
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: narrative && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: "bg-[oklch(0.72_0.20_80/0.08)] border border-[oklch(0.72_0.20_80/0.25)] rounded-xl p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-xs font-semibold text-[oklch(0.65_0.18_80)] uppercase tracking-wide", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                  "AI-Generated Narrative"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[oklch(0.62_0.14_80)] italic leading-relaxed", children: narrative })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleGenerateNarrative,
                "data-ocid": "storykeeper.generate_narrative_button",
                disabled: generateNarrative.isPending,
                className: "gap-2 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0",
                children: generateNarrative.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Generating…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                  "Generate Narrative"
                ] })
              }
            ),
            isOwned && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                onClick: startEdit,
                "data-ocid": "storykeeper.edit_button",
                className: "gap-2 border-[oklch(0.72_0.20_80/0.3)] hover:border-[oklch(0.72_0.20_80/0.6)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
                  "Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                onClick: onClose,
                "data-ocid": "storykeeper.close_button",
                className: "gap-2 border-border ml-auto",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                  "Close"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function TimelineModal({
  items,
  existing,
  onClose
}) {
  const [title, setTitle] = reactExports.useState((existing == null ? void 0 : existing.title) ?? "");
  const [desc, setDesc] = reactExports.useState((existing == null ? void 0 : existing.description) ?? "");
  const [selected, setSelected] = reactExports.useState(
    new Set(((existing == null ? void 0 : existing.itemIds) ?? []).map(String))
  );
  const upsert = useUpsertFamilyTimeline();
  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(String(id))) next.delete(String(id));
      else next.add(String(id));
      return next;
    });
  };
  const handleSave = async () => {
    if (!title.trim()) {
      ue.error("Please enter a timeline title");
      return;
    }
    try {
      await upsert.mutateAsync({
        title: title.trim(),
        description: desc.trim(),
        itemIds: Array.from(selected).map(BigInt)
      });
      ue.success("Family timeline saved!");
      onClose();
    } catch {
      ue.error("Failed to save timeline.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "storykeeper.timeline_dialog",
      className: "max-w-lg max-h-[85vh] overflow-y-auto bg-card border-[oklch(0.72_0.20_80/0.25)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-lg gradient-text-amber flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-[oklch(0.72_0.20_80)]" }),
          existing ? "Edit Family Timeline" : "Create Family Timeline"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Timeline Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "storykeeper.timeline_title_input",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "e.g. The Sharma Family Legacy",
                className: "bg-background border-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "storykeeper.timeline_desc_textarea",
                value: desc,
                onChange: (e) => setDesc(e.target.value),
                placeholder: "A brief description of this family timeline...",
                rows: 2,
                className: "bg-background border-input resize-none"
              }
            )
          ] }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-2 block", children: "Select Memories to Include" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 max-h-48 overflow-y-auto pr-1", children: items.map((item) => {
              const MediaIcon = getMediaIcon(item.mediaType);
              const isChecked = selected.has(String(item.id));
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle(item.id),
                  className: `flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all duration-200 ${isChecked ? "border-[oklch(0.72_0.20_80/0.5)] bg-[oklch(0.72_0.20_80/0.08)]" : "border-border hover:border-[oklch(0.72_0.20_80/0.3)]"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${isChecked ? "bg-[oklch(0.72_0.20_80)] border-[oklch(0.72_0.20_80)]" : "border-input"}`,
                        children: isChecked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.12_0.06_60)] text-[10px] font-bold", children: "✓" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaIcon, { className: "w-4 h-4 text-[oklch(0.72_0.20_80/0.6)] flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground truncate flex-1", children: item.title }),
                    item.yearApprox && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground flex-shrink-0", children: String(item.yearApprox) })
                  ]
                },
                String(item.id)
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: onClose,
                "data-ocid": "storykeeper.timeline_cancel_button",
                className: "flex-1 border-border",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleSave,
                "data-ocid": "storykeeper.timeline_save_button",
                disabled: upsert.isPending,
                className: "flex-1 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 gap-2",
                children: [
                  upsert.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : null,
                  "Save Timeline"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function StorykeeperPage({ onNavigateHome, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { data: storyItems, isLoading } = useMyStoryItems();
  const { data: timeline } = useMyFamilyTimeline();
  const deleteItem = useDeleteStoryItem();
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const [selectedItem, setSelectedItem] = reactExports.useState(null);
  const [showTimeline, setShowTimeline] = reactExports.useState(false);
  const [personFilter, setPersonFilter] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const displayItems = (storyItems == null ? void 0 : storyItems.length) ? storyItems : DEMO_ITEMS;
  const people = getAllPeople(displayItems);
  const filteredItems = personFilter ? displayItems.filter((i) => {
    var _a;
    return (_a = i.peopleTagged) == null ? void 0 : _a.includes(personFilter);
  }) : displayItems;
  const decades = getDecades(displayItems);
  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setDeleteId(id);
    try {
      await deleteItem.mutateAsync(id);
      ue.success("Memory removed from archive.");
    } catch {
      ue.error("Failed to delete memory.");
    }
    setDeleteId(null);
    if ((selectedItem == null ? void 0 : selectedItem.id) === id) setSelectedItem(null);
  };
  const handleUploadClick = () => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return;
    }
    setShowUpload(true);
  };
  const statsBar = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 sm:gap-5 flex-wrap", children: [
    {
      value: displayItems.length,
      label: "Memories Preserved",
      icon: BookOpen
    },
    { value: decades, label: "Decades Covered", icon: Clock },
    { value: people.length, label: "Family Members", icon: Users }
  ].map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-amber border border-[oklch(0.72_0.20_80/0.25)] rounded-xl px-4 py-3 text-center min-w-[110px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-[oklch(0.72_0.20_80)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold gradient-text-amber", children: value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[oklch(0.75_0.10_80)] leading-tight", children: label })
      ]
    },
    label
  )) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ModuleLayout,
    {
      title: "AI Storykeeper",
      subtitle: "Preserve family photos, letters, voice notes, and videos. Transform them into narrated timelines, talking photo albums, and emotional documentaries.",
      icon: Sparkles,
      accent: "amber",
      badge: "Memory Preservation",
      onNavigateHome,
      onNavigate,
      heroContent: statsBar,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleUploadClick,
              "data-ocid": "storykeeper.upload_button",
              className: "gap-2 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0 flex-1 sm:flex-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                isAuthenticated ? "Add Memory" : "Sign In to Upload"
              ]
            }
          ),
          isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowTimeline(true),
              "data-ocid": "storykeeper.create_timeline_button",
              className: "gap-2 border-[oklch(0.72_0.20_80/0.35)] hover:border-[oklch(0.72_0.20_80/0.6)] flex-1 sm:flex-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-[oklch(0.72_0.20_80)]" }),
                timeline ? "Edit Timeline" : "Create Timeline"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "timeline", className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsList,
            {
              "data-ocid": "storykeeper.view_tabs",
              className: "mb-6 bg-muted/50 border border-border p-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "timeline",
                    "data-ocid": "storykeeper.timeline_tab",
                    className: "gap-2 data-[state=active]:bg-[oklch(0.72_0.20_80/0.15)] data-[state=active]:text-[oklch(0.65_0.18_80)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                      "Timeline View"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "album",
                    "data-ocid": "storykeeper.album_tab",
                    className: "gap-2 data-[state=active]:bg-[oklch(0.72_0.20_80/0.15)] data-[state=active]:text-[oklch(0.65_0.18_80)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" }),
                      "Memory Book"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "storykeeper.loading_state",
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
              children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-60 rounded-2xl" }, i))
            }
          ) : displayItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "storykeeper.empty_state",
              className: "text-center py-20 flex flex-col items-center gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-amber border border-[oklch(0.72_0.20_80/0.3)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-[oklch(0.72_0.20_80/0.5)]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl gradient-text-amber", children: "Start Preserving Your Family's Legacy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md", children: "Upload old photos, letters, voice notes, or videos to begin building your emotional family archive." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: handleUploadClick,
                    "data-ocid": "storykeeper.empty_upload_button",
                    className: "gap-2 bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] text-[oklch(0.12_0.06_60)] font-semibold border-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      "Upload First Memory"
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[oklch(0.72_0.20_80)] via-[oklch(0.65_0.18_75)] to-transparent -translate-x-0.5 pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-x-8 lg:gap-y-6", children: filteredItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `relative lg:col-span-1 ${i % 2 === 0 ? "lg:pr-6" : "lg:pl-6 lg:mt-8"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `hidden lg:block absolute top-6 w-3 h-3 rounded-full bg-[oklch(0.72_0.20_80)] border-2 border-background shadow-[0_0_8px_oklch(0.72_0.20_80/0.6)] ${i % 2 === 0 ? "-right-1.5" : "-left-1.5"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MemoryCard,
                    {
                      item,
                      index: i,
                      isOwned: isAuthenticated && !!(storyItems == null ? void 0 : storyItems.length),
                      onDelete: handleDelete,
                      onClick: setSelectedItem
                    }
                  )
                ]
              },
              String(item.id)
            )) })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "album", children: [
            people.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "storykeeper.filter.all",
                  onClick: () => setPersonFilter(null),
                  className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${!personFilter ? "bg-[oklch(0.72_0.20_80/0.2)] border-[oklch(0.72_0.20_80/0.5)] text-[oklch(0.65_0.18_80)]" : "border-border text-muted-foreground hover:border-[oklch(0.72_0.20_80/0.3)]"}`,
                  children: "All"
                }
              ),
              people.map((person) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "storykeeper.filter.person",
                  onClick: () => setPersonFilter(person === personFilter ? null : person),
                  className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${personFilter === person ? "bg-[oklch(0.72_0.20_80/0.2)] border-[oklch(0.72_0.20_80/0.5)] text-[oklch(0.65_0.18_80)]" : "border-border text-muted-foreground hover:border-[oklch(0.72_0.20_80/0.3)]"}`,
                  children: person
                },
                person
              ))
            ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: filteredItems.map((item, i) => {
              const MediaIcon = getMediaIcon(item.mediaType);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: i * 0.05 },
                  "data-ocid": `storykeeper.album_item.${i + 1}`,
                  onClick: () => setSelectedItem(item),
                  className: "group relative aspect-square rounded-xl overflow-hidden bg-[oklch(0.72_0.20_80/0.06)] border border-[oklch(0.72_0.20_80/0.2)] hover:border-[oklch(0.72_0.20_80/0.5)] hover:shadow-[0_4px_20px_oklch(0.72_0.20_80/0.15)] transition-all duration-300 flex flex-col items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaIcon, { className: "w-8 h-8 text-[oklch(0.72_0.20_80/0.5)]" }),
                    item.yearApprox && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-[oklch(0.72_0.20_80/0.65)]", children: String(item.yearApprox) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[oklch(0.10_0.05_60/0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.95_0.01_80)] text-xs font-medium text-center line-clamp-3 leading-relaxed", children: item.title }) })
                  ]
                },
                String(item.id)
              );
            }) }),
            filteredItems.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "storykeeper.album_empty_state",
                className: "text-center py-12 text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No memories found for this person" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: showUpload,
            onOpenChange: (open) => {
              if (!open) setShowUpload(false);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                "data-ocid": "storykeeper.upload_dialog",
                className: "max-w-lg max-h-[90vh] overflow-y-auto bg-card border-[oklch(0.72_0.20_80/0.25)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-xl gradient-text-amber flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-[oklch(0.72_0.20_80)]" }),
                    "Preserve a Memory"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UploadForm,
                    {
                      onClose: () => setShowUpload(false),
                      onSuccess: () => setShowUpload(false)
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MemoryModal,
          {
            item: selectedItem,
            onClose: () => setSelectedItem(null),
            isOwned: isAuthenticated && !!(storyItems == null ? void 0 : storyItems.length)
          }
        ),
        showTimeline && /* @__PURE__ */ jsxRuntimeExports.jsx(
          TimelineModal,
          {
            items: displayItems,
            existing: timeline ? {
              title: timeline.title,
              description: timeline.description,
              itemIds: timeline.itemIds
            } : null,
            onClose: () => setShowTimeline(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { delay: 0.5, type: "spring" },
            "data-ocid": "storykeeper.mobile_fab",
            onClick: handleUploadClick,
            className: "fixed bottom-6 right-4 sm:hidden z-50 w-14 h-14 rounded-full bg-[oklch(0.72_0.20_80)] hover:bg-[oklch(0.68_0.22_80)] shadow-[0_4px_20px_oklch(0.72_0.20_80/0.5)] flex items-center justify-center transition-all duration-200 active:scale-95",
            "aria-label": "Add memory",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-7 h-7 text-[oklch(0.12_0.06_60)]" })
          }
        ),
        deleteId !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "storykeeper.delete_loading_state",
            className: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-5 py-3 shadow-xl flex items-center gap-2 text-sm z-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-[oklch(0.72_0.20_80)]" }),
              "Removing memory…"
            ]
          }
        )
      ]
    }
  );
}
export {
  StorykeeperPage as default
};
