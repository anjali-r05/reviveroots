import { c as createLucideIcon, r as reactExports, a4 as useComposedRefs, j as jsxRuntimeExports, a as cn, u as useAuth, a5 as useListCourses, a6 as useMyEnrollments, a7 as useMyMentorBookings, a8 as useEnrollInCourse, a9 as useUpdateCourseProgress, aa as useCompleteCourse, ab as useBookMentor, ac as useCancelMentorBooking, ad as CourseCategory, ae as Music, h as BookOpen, P as Play, f as Badge, af as User, m as motion, y as Clock, U as Users, B as Button, t as Award, A as AnimatePresence, q as ue, s as Star, X, ag as Medal, I as Input } from "./index-CITPV5fo.js";
import { M as ModuleLayout } from "./ModuleLayout-7elIkKUZ.js";
import { P as Primitive, d as Presence, e as createContextScope, f as composeEventHandlers, u as useCallbackRef, g as useLayoutEffect2, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CFBXo_eO.js";
import { L as Label } from "./label-Bhpp8Kfq.js";
import { u as useDirection, T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CJ5arsFH.js";
import { S as Skeleton } from "./skeleton-LfVS1a4w.js";
import { T as Textarea } from "./textarea-3j_qcGtT.js";
import { C as Calendar } from "./calendar-DLK9cukz.js";
import { C as CircleCheckBig } from "./circle-check-big-DGidxDLk.js";
import "./index-Bhn06kaP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
const categoryEmojis = {
  dance: "💃",
  music: "🎵",
  pottery: "🏺",
  weaving: "🧵",
  yoga: "🧘",
  calligraphy: "✒️",
  cooking: "🍳",
  martialArts: "🥋",
  regionalArts: "🎨"
};
const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Dance & Music", value: "dance-music" },
  { label: "Crafts & Art", value: "crafts-art" },
  { label: "Yoga & Wellness", value: "yoga-wellness" },
  { label: "Martial Arts", value: "martial-arts" },
  { label: "Culinary Arts", value: "culinary-arts" },
  { label: "Literature", value: "literature" }
];
const CATEGORY_FILTER_MAP = {
  "dance-music": ["dance", "music"],
  "crafts-art": ["pottery", "weaving", "calligraphy", "regionalArts"],
  "yoga-wellness": ["yoga"],
  "martial-arts": ["martialArts"],
  "culinary-arts": ["cooking"]
};
const MOCK_MENTORS = [
  {
    id: "mentor-1",
    name: "Guru Meenakshi Devi",
    specialty: "Bharatanatyam & Classical Dance",
    rating: 4.9,
    sessions: 340,
    avatar: "🧘",
    slots: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"]
  },
  {
    id: "mentor-2",
    name: "Pandit Raghunath Sharma",
    specialty: "Hindustani Classical Music",
    rating: 5,
    sessions: 210,
    avatar: "🎶",
    slots: ["10:00 AM", "12:00 PM", "4:00 PM", "6:00 PM"]
  },
  {
    id: "mentor-3",
    name: "Master Vasu Gurukkal",
    specialty: "Kalaripayattu Martial Arts",
    rating: 4.8,
    sessions: 175,
    avatar: "🥋",
    slots: ["7:00 AM", "9:00 AM", "5:00 PM", "7:00 PM"]
  },
  {
    id: "mentor-4",
    name: "Kamla Devi",
    specialty: "Madhubani Painting & Folk Arts",
    rating: 4.9,
    sessions: 290,
    avatar: "🎨",
    slots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"]
  }
];
const MOCK_REVIEWS = [
  {
    name: "Aditya Sharma",
    rating: 5,
    text: "Truly transformative — I reconnected with my culture in ways I never expected. The instructor was phenomenal."
  },
  {
    name: "Priya Nair",
    rating: 5,
    text: "The live sessions feel like sitting in a real gurukul. Ancient wisdom delivered beautifully for modern learners."
  }
];
const MOCK_CURRICULUM = [
  { module: 1, title: "Foundations & History", lessons: 5 },
  { module: 2, title: "Core Techniques", lessons: 8 },
  { module: 3, title: "Advanced Practice & Certification", lessons: 6 }
];
const SAMPLE_COURSES = [
  {
    id: 1n,
    title: "Bharatanatyam for Beginners",
    category: CourseCategory.dance,
    instructorName: "Guru Meenakshi Devi",
    instructorId: "",
    price: 2999n,
    durationMinutes: 60n,
    isLive: true,
    maxParticipants: 20n,
    imageUrl: "",
    description: "Learn the foundational mudras and adavus of this sacred temple dance form practiced for over 2000 years.",
    createdAt: 0n
  },
  {
    id: 2n,
    title: "Raga Music Immersion",
    category: CourseCategory.music,
    instructorName: "Pandit Raghunath Sharma",
    instructorId: "",
    price: 3499n,
    durationMinutes: 90n,
    isLive: false,
    maxParticipants: 30n,
    imageUrl: "",
    description: "Journey through the 72 melakarta ragas and their seasonal meanings with a lineage master.",
    createdAt: 0n
  },
  {
    id: 3n,
    title: "Madhubani Painting Mastery",
    category: CourseCategory.regionalArts,
    instructorName: "Kamla Devi",
    instructorId: "",
    price: 1999n,
    durationMinutes: 45n,
    isLive: false,
    maxParticipants: 15n,
    imageUrl: "",
    description: "Traditional Bihar folk art with natural dyes and symbolic imagery — from basic motifs to wall murals.",
    createdAt: 0n
  },
  {
    id: 4n,
    title: "Kalaripayattu: Ancient Martial Art",
    category: CourseCategory.martialArts,
    instructorName: "Master Vasu Gurukkal",
    instructorId: "",
    price: 4999n,
    durationMinutes: 75n,
    isLive: true,
    maxParticipants: 10n,
    imageUrl: "",
    description: "Kerala's 3,000-year-old mother of all martial arts — unifying body, breath, and spirit.",
    createdAt: 0n
  },
  {
    id: 5n,
    title: "Traditional Pottery with Clay",
    category: CourseCategory.pottery,
    instructorName: "Aziz Khan",
    instructorId: "",
    price: 2499n,
    durationMinutes: 60n,
    isLive: false,
    maxParticipants: 8n,
    imageUrl: "",
    description: "Wheel-throwing and hand-building from Multan's ancient ceramic traditions, passed down 12 generations.",
    createdAt: 0n
  },
  {
    id: 6n,
    title: "Kashmiri Pashmina Weaving",
    category: CourseCategory.weaving,
    instructorName: "Gulshan Qadri",
    instructorId: "",
    price: 5999n,
    durationMinutes: 120n,
    isLive: true,
    maxParticipants: 6n,
    imageUrl: "",
    description: "The 500-year-old art of creating the world's finest wool textile — warp, weft, and soul.",
    createdAt: 0n
  }
];
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
    [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        className: `w-3 h-3 ${s <= Math.round(rating) ? "fill-[oklch(0.75_0.18_65)] text-[oklch(0.75_0.18_65)]" : "text-muted-foreground"}`
      },
      s
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: rating })
  ] });
}
function CourseGradient({ category }) {
  const gradients = {
    dance: "from-[oklch(0.45_0.25_295/0.4)] to-[oklch(0.55_0.18_280/0.2)]",
    music: "from-[oklch(0.40_0.20_275/0.4)] to-[oklch(0.50_0.20_270/0.2)]",
    pottery: "from-[oklch(0.60_0.16_40/0.4)] to-[oklch(0.72_0.18_50/0.2)]",
    weaving: "from-[oklch(0.65_0.15_200/0.4)] to-[oklch(0.55_0.18_195/0.2)]",
    yoga: "from-[oklch(0.62_0.20_25/0.4)] to-[oklch(0.55_0.18_20/0.2)]",
    calligraphy: "from-[oklch(0.72_0.20_80/0.4)] to-[oklch(0.65_0.18_75/0.2)]",
    cooking: "from-[oklch(0.52_0.18_35/0.4)] to-[oklch(0.60_0.16_40/0.2)]",
    martialArts: "from-[oklch(0.50_0.28_330/0.4)] to-[oklch(0.60_0.22_325/0.2)]",
    regionalArts: "from-[oklch(0.75_0.18_65/0.4)] to-[oklch(0.68_0.20_60/0.2)]"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `w-full h-36 rounded-t-xl bg-gradient-to-br ${gradients[category] ?? gradients.dance} flex items-center justify-center`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: categoryEmojis[category] ?? "🎓" })
    }
  );
}
function CourseDetailModal({
  course,
  isEnrolled,
  onClose,
  onEnroll,
  enrolling
}) {
  const price = Number(course.price);
  const displayPrice = price === 0 ? "Free" : `₹${(price / 100).toLocaleString()}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "gurukul.course_detail.dialog",
      className: "max-w-2xl max-h-[90vh] overflow-y-auto glass border border-[oklch(0.75_0.18_65/0.25)] bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            course.isLive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-2 text-[10px] bg-[oklch(0.62_0.20_25/0.2)] text-[oklch(0.80_0.14_25)] border-0 animate-pulse", children: "🔴 LIVE CLASS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl gradient-text-saffron", children: course.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "by ",
              course.instructorName
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "gurukul.course_detail.close_button",
              onClick: onClose,
              className: "p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CourseGradient, { category: String(course.category) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.88_0.10_65)] border-0 text-xs capitalize", children: [
            categoryEmojis[course.category],
            " ",
            String(course.category)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            " ",
            Number(course.durationMinutes),
            " min"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
            " ",
            Number(course.maxParticipants),
            " seats"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: 4.8 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-saffron border border-[oklch(0.75_0.18_65/0.2)] rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2 text-foreground", children: "About this Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: course.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border/30 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm mb-2 text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-[oklch(0.75_0.18_65)]" }),
            " Instructor"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[oklch(0.75_0.18_65/0.2)] flex items-center justify-center text-lg flex-shrink-0", children: categoryEmojis[course.category] ?? "🎓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: course.instructorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Verified Master · 20+ years of practice" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm mb-3 text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-[oklch(0.75_0.18_65)]" }),
            " ",
            "Curriculum"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: MOCK_CURRICULUM.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between glass border border-border/20 rounded-lg px-4 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] text-xs flex items-center justify-center font-bold flex-shrink-0", children: m.module }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: m.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  m.lessons,
                  " lessons"
                ] })
              ]
            },
            m.module
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm mb-3 text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-[oklch(0.75_0.18_65)]" }),
            " Student Reviews"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: MOCK_REVIEWS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass border border-border/20 rounded-xl p-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-[oklch(0.75_0.18_65/0.2)] flex items-center justify-center text-xs font-bold text-[oklch(0.75_0.18_65)]", children: r.name[0] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: r.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: r.rating })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed pl-9", children: r.text })
              ]
            },
            r.name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl gradient-text-saffron", children: displayPrice }),
            price > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "per month" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "gurukul.course_detail.enroll_button",
              onClick: onEnroll,
              disabled: isEnrolled || enrolling,
              className: "bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-2",
              children: isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                " Enrolled"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                " Enroll Now"
              ] })
            }
          )
        ] })
      ]
    }
  ) });
}
function CertificateModal({
  courseName,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogContent,
    {
      "data-ocid": "gurukul.certificate.dialog",
      className: "max-w-md glass border border-[oklch(0.75_0.18_65/0.4)] bg-card text-center",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.5, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: "spring", duration: 0.6 },
          className: "flex flex-col items-center gap-5 py-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { rotate: [0, -10, 10, -5, 5, 0] },
                transition: { delay: 0.3, duration: 0.8 },
                className: "w-24 h-24 rounded-full bg-gradient-to-br from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)] flex items-center justify-center shadow-glow",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "w-12 h-12 text-[oklch(0.12_0.06_60)]" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl gradient-text-saffron mb-2", children: "Course Complete!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-1", children: "Congratulations! You've earned a certificate for" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: courseName })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.7 },
                className: "glass-saffron border border-[oklch(0.75_0.18_65/0.3)] rounded-xl px-6 py-4 w-full",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center text-[oklch(0.75_0.18_65)]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "Heritage Arts Certificate" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    "Issued on",
                    " ",
                    (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "gurukul.certificate.close_button",
                onClick: onClose,
                className: "w-full bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0",
                children: "Download Certificate"
              }
            )
          ]
        }
      )
    }
  ) });
}
function LessonPlayerModal({
  course,
  enrollment,
  onClose,
  onMarkComplete,
  onCompleteCourse,
  updating,
  completing
}) {
  const progress = Number(enrollment.progressPct);
  const isCompleted = progress >= 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "gurukul.lesson_player.dialog",
      className: "max-w-2xl max-h-[90vh] overflow-y-auto glass border border-[oklch(0.75_0.18_65/0.25)] bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl gradient-text-saffron", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "gurukul.lesson_player.close_button",
              onClick: onClose,
              className: "p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-48 rounded-xl bg-gradient-to-br from-[oklch(0.10_0.05_60)] to-[oklch(0.15_0.08_265)] flex flex-col items-center justify-center gap-3 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[oklch(0.12_0.08_260/0.5)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-12 h-12 text-[oklch(0.75_0.18_65/0.6)] relative z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[oklch(0.99_0.005_240/0.5)] relative z-10", children: "Live Lesson Stream" }),
          course.isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 right-3 flex items-center gap-1 bg-[oklch(0.62_0.20_25/0.8)] px-2 py-0.5 rounded-full text-[10px] font-bold text-[oklch(0.99_0.005_240)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-[oklch(0.80_0.14_25)] rounded-full animate-pulse" }),
            "LIVE"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-[oklch(0.75_0.18_65)]", children: [
              progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { width: 0 },
              animate: { width: `${progress}%` },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)]"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-saffron border border-[oklch(0.75_0.18_65/0.2)] rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2 text-foreground", children: "Current Module: Core Techniques" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "In this session, you will explore the intermediate techniques passed down through generations. Focus on precision, breath control, and authentic expression. Practice each element slowly before building speed and flow." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: ["Technique", "Practice", "History"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "bg-[oklch(0.75_0.18_65/0.1)] text-[oklch(0.75_0.18_65)] border-0 text-xs",
              children: tag
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2 border-t border-border/30", children: [
          isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "gurukul.lesson_player.complete_course_button",
              onClick: onCompleteCourse,
              disabled: completing || !!enrollment.completedAt,
              className: "flex-1 bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)] text-[oklch(0.12_0.06_60)] border-0 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4" }),
                enrollment.completedAt ? "Certified ✓" : "Claim Certificate"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "gurukul.lesson_player.mark_complete_button",
              onClick: onMarkComplete,
              disabled: updating,
              className: "flex-1 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                updating ? "Saving…" : "Mark Lesson Complete (+25%)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "gurukul.lesson_player.close_button",
              variant: "outline",
              onClick: onClose,
              className: "border-border/40",
              children: "Close"
            }
          )
        ] })
      ]
    }
  ) });
}
function MentorBookingModal({
  mentor,
  onClose,
  onBook,
  booking
}) {
  const [date, setDate] = reactExports.useState("");
  const [slot, setSlot] = reactExports.useState("");
  const [topic, setTopic] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !slot || !topic.trim()) {
      ue.error("Please fill all fields");
      return;
    }
    onBook(date, slot, topic);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "gurukul.booking.dialog",
      className: "max-w-md glass border border-[oklch(0.75_0.18_65/0.25)] bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl gradient-text-saffron", children: "Book a Session" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 glass-saffron border border-[oklch(0.75_0.18_65/0.2)] rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[oklch(0.75_0.18_65/0.2)] flex items-center justify-center text-2xl flex-shrink-0", children: mentor.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: mentor.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: mentor.specialty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: mentor.rating })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "booking-date",
                className: "text-sm text-foreground mb-1.5",
                children: "Select Date"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "booking-date",
                "data-ocid": "gurukul.booking.date_input",
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                className: "bg-background/50 border-border/40"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground mb-1.5", children: "Select Time Slot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: mentor.slots.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "gurukul.booking.time_slot",
                onClick: () => setSlot(s),
                className: `px-3 py-2 rounded-lg text-sm border transition-all duration-200 ${slot === s ? "bg-[oklch(0.75_0.18_65)] text-[oklch(0.12_0.06_60)] border-[oklch(0.75_0.18_65)]" : "bg-background/50 border-border/40 text-foreground hover:border-[oklch(0.75_0.18_65/0.4)]"}`,
                children: s
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "booking-topic",
                className: "text-sm text-foreground mb-1.5",
                children: "Topic / Goals"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "booking-topic",
                "data-ocid": "gurukul.booking.topic_input",
                value: topic,
                onChange: (e) => setTopic(e.target.value),
                placeholder: "What would you like to learn in this session?",
                rows: 3,
                className: "bg-background/50 border-border/40 resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                "data-ocid": "gurukul.booking.submit_button",
                disabled: booking,
                className: "flex-1 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0",
                children: booking ? "Booking…" : "Confirm Booking"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "gurukul.booking.cancel_button",
                variant: "outline",
                onClick: onClose,
                className: "border-border/40",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function GurukulPage({ onNavigateHome, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { data: courses, isLoading } = useListCourses();
  const { data: enrollments } = useMyEnrollments();
  const { data: mentorBookings } = useMyMentorBookings();
  const enrollMutation = useEnrollInCourse();
  const updateProgressMutation = useUpdateCourseProgress();
  const completeCourseMutation = useCompleteCourse();
  const bookMentorMutation = useBookMentor();
  const cancelBookingMutation = useCancelMentorBooking();
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [selectedCourse, setSelectedCourse] = reactExports.useState(null);
  const [lessonCourse, setLessonCourse] = reactExports.useState(null);
  const [certCourse, setCertCourse] = reactExports.useState(null);
  const [bookingMentor, setBookingMentor] = reactExports.useState(null);
  const displayCourses = (courses == null ? void 0 : courses.length) ? courses : SAMPLE_COURSES;
  const enrolledMap = new Map(
    (enrollments ?? []).map((e) => [String(e.courseId), e])
  );
  const filteredCourses = displayCourses.filter((c) => {
    if (activeFilter === "all") return true;
    const cats = CATEGORY_FILTER_MAP[activeFilter] ?? [];
    return cats.includes(String(c.category));
  });
  const requireAuth = () => {
    if (!isAuthenticated) {
      onNavigate("signup");
      return false;
    }
    return true;
  };
  const handleEnroll = async (courseId) => {
    if (!requireAuth()) return;
    try {
      await enrollMutation.mutateAsync(courseId);
      ue.success("Enrolled successfully!");
    } catch {
      ue.error("Enrollment failed. Try again.");
    }
  };
  const handleMarkComplete = async (enrollmentId, current) => {
    const next = Math.min(100, current + 25);
    try {
      await updateProgressMutation.mutateAsync({
        enrollmentId,
        progressPct: BigInt(next)
      });
      ue.success(`Progress updated to ${next}%`);
    } catch {
      ue.error("Failed to update progress.");
    }
  };
  const handleCompleteCourse = async (enrollmentId, courseName) => {
    try {
      await completeCourseMutation.mutateAsync(enrollmentId);
      setLessonCourse(null);
      setCertCourse(courseName);
    } catch {
      ue.error("Failed to complete course.");
    }
  };
  const handleBookMentor = async (mentor, date, slot, topic) => {
    if (!requireAuth()) return;
    const scheduledMs = (/* @__PURE__ */ new Date(`${date} ${slot}`)).getTime();
    try {
      await bookMentorMutation.mutateAsync({
        instructorId: mentor.id,
        scheduledAt: BigInt(scheduledMs * 1e6),
        durationMinutes: 60n,
        notes: topic
      });
      setBookingMentor(null);
      ue.success("Session booked successfully!");
    } catch {
      ue.error("Booking failed. Try again.");
    }
  };
  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBookingMutation.mutateAsync(bookingId);
      ue.success("Booking cancelled.");
    } catch {
      ue.error("Failed to cancel booking.");
    }
  };
  const heroContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
    { value: "50+", label: "Courses" },
    { value: "30+", label: "Masters" },
    { value: "500+", label: "Students" },
    { value: "10+", label: "Certifications" }
  ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-saffron border border-[oklch(0.75_0.18_65/0.3)] rounded-xl px-4 py-3 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl gradient-text-saffron", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[oklch(0.88_0.10_65)]", children: stat.label })
      ]
    },
    stat.label
  )) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ModuleLayout,
    {
      title: "Digital Gurukul",
      subtitle: "Learn from verified cultural masters through live classes, certifications, and mentor bookings in dance, music, martial arts, and more.",
      icon: Music,
      accent: "saffron",
      badge: "Verified Masters",
      onNavigateHome,
      onNavigate,
      heroContent,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "courses", className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsList,
            {
              "data-ocid": "gurukul.main_tabs",
              className: "glass border border-border/30 h-auto p-1 gap-1 flex-wrap",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    "data-ocid": "gurukul.courses_tab",
                    value: "courses",
                    className: "data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 mr-1.5" }),
                      " Courses"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    "data-ocid": "gurukul.my_learning_tab",
                    value: "my-learning",
                    className: "data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-1.5" }),
                      " My Learning",
                      ((enrollments == null ? void 0 : enrollments.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1.5 bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] border-0 text-[10px]", children: enrollments == null ? void 0 : enrollments.length })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    "data-ocid": "gurukul.mentors_tab",
                    value: "mentors",
                    className: "data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 mr-1.5" }),
                      " Mentors"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    "data-ocid": "gurukul.my_bookings_tab",
                    value: "my-bookings",
                    className: "data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-[oklch(0.12_0.06_60)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-1.5" }),
                      " My Bookings",
                      ((mentorBookings == null ? void 0 : mentorBookings.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1.5 bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] border-0 text-[10px]", children: mentorBookings == null ? void 0 : mentorBookings.length })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "courses", className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "gurukul.category_filter",
                className: "flex gap-2 pb-2",
                children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `gurukul.filter.${tab.value}`,
                    onClick: () => setActiveFilter(tab.value),
                    className: `px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 border ${activeFilter === tab.value ? "bg-[oklch(0.75_0.18_65)] text-[oklch(0.12_0.06_60)] border-[oklch(0.75_0.18_65)]" : "glass border-border/30 text-muted-foreground hover:text-foreground hover:border-[oklch(0.75_0.18_65/0.3)]"}`,
                    children: tab.label
                  },
                  tab.value
                ))
              }
            ) }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "gurukul.loading_state",
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
                children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-2xl" }, i))
              }
            ) : filteredCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "gurukul.empty_state",
                className: "flex flex-col items-center gap-4 py-16 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-[oklch(0.75_0.18_65)] opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No courses in this category yet." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: filteredCourses.map((course, i) => {
              const enrollment = enrolledMap.get(String(course.id));
              const isEnrolled = !!enrollment;
              const price = Number(course.price);
              const displayPrice = price === 0 ? "Free" : `₹${(price / 100).toLocaleString()}`;
              const mockRating = 4.5 + Number(course.id) % 6 * 0.1;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: i * 0.06 },
                  "data-ocid": `gurukul.course.${i + 1}`,
                  className: "glass border border-border/40 rounded-2xl overflow-hidden card-hover group flex flex-col cursor-pointer",
                  onClick: () => setSelectedCourse(course),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CourseGradient, { category: String(course.category) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                          course.isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] bg-[oklch(0.62_0.20_25/0.2)] text-[oklch(0.80_0.14_25)] border-0 animate-pulse flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-[oklch(0.80_0.14_25)] rounded-full animate-pulse" }),
                            "LIVE"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.88_0.10_65)] border-0 capitalize", children: String(course.category) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground leading-tight group-hover:text-[oklch(0.75_0.18_65)] transition-colors", children: course.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                          "by ",
                          course.instructorName
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2", children: course.description }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Number(mockRating.toFixed(1)) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                          " ",
                          Number(course.durationMinutes),
                          " min"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                          " ",
                          Number(course.maxParticipants),
                          " seats"
                        ] })
                      ] }),
                      isEnrolled && enrollment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.75_0.18_65)] font-semibold", children: [
                            Number(enrollment.progressPct),
                            "%"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)]",
                            style: {
                              width: `${Number(enrollment.progressPct)}%`
                            }
                          }
                        ) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between mt-auto pt-2 border-t border-border/30",
                          onClick: (e) => e.stopPropagation(),
                          onKeyDown: (e) => e.stopPropagation(),
                          role: "presentation",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-sm", children: displayPrice }),
                            isEnrolled && enrollment ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                size: "sm",
                                "data-ocid": `gurukul.continue_button.${i + 1}`,
                                onClick: (e) => {
                                  e.stopPropagation();
                                  setLessonCourse(course);
                                },
                                className: "text-xs gap-1.5 bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.88_0.10_65)] hover:bg-[oklch(0.75_0.18_65/0.25)] border-0",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }),
                                  " Continue"
                                ]
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                size: "sm",
                                "data-ocid": `gurukul.enroll_button.${i + 1}`,
                                onClick: (e) => {
                                  e.stopPropagation();
                                  handleEnroll(course.id);
                                },
                                disabled: enrollMutation.isPending,
                                className: "text-xs gap-1.5 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }),
                                  " Enroll Now"
                                ]
                              }
                            )
                          ]
                        }
                      )
                    ] })
                  ]
                },
                String(course.id)
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my-learning", className: "space-y-5", children: !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "gurukul.my_learning.empty_state",
              className: "flex flex-col items-center gap-5 py-16 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl gradient-text-saffron mb-2", children: "Sign in to access your courses" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Track your progress and continue your cultural mastery journey" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "gurukul.my_learning.signin_button",
                    onClick: () => onNavigate("signup"),
                    className: "bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0",
                    children: "Sign In to Continue"
                  }
                )
              ]
            }
          ) : (enrollments ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "gurukul.enrollments.empty_state",
              className: "flex flex-col items-center gap-5 py-16 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl gradient-text-saffron mb-2", children: "No enrolled courses yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Browse the catalog and enroll to start your journey" })
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: (enrollments ?? []).map((enrollment, i) => {
            const course = displayCourses.find(
              (c) => String(c.id) === String(enrollment.courseId)
            );
            const progress = Number(enrollment.progressPct);
            const name = (course == null ? void 0 : course.title) ?? `Course #${String(enrollment.courseId)}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.07 },
                "data-ocid": `gurukul.enrollment.${i + 1}`,
                className: "glass border border-border/40 rounded-2xl p-5 flex flex-col gap-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[oklch(0.75_0.18_65/0.15)] flex items-center justify-center text-2xl flex-shrink-0", children: categoryEmojis[(course == null ? void 0 : course.category) ?? "dance"] ?? "🎓" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground truncate", children: name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: (course == null ? void 0 : course.instructorName) ?? "Master Instructor" }),
                      enrollment.certified && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mt-1 text-[10px] bg-[oklch(0.75_0.18_65/0.2)] text-[oklch(0.75_0.18_65)] border-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-2.5 h-2.5 mr-1" }),
                        " Certified"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[oklch(0.75_0.18_65)]", children: [
                        progress,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${progress}%` },
                        transition: { duration: 0.8 },
                        className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)]"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        "data-ocid": `gurukul.continue_learning_button.${i + 1}`,
                        onClick: () => course && setLessonCourse(course),
                        disabled: !course,
                        className: "flex-1 bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }),
                          " Continue Learning"
                        ]
                      }
                    ),
                    progress >= 100 && !enrollment.certified && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        "data-ocid": `gurukul.claim_cert_button.${i + 1}`,
                        onClick: () => handleCompleteCourse(enrollment.id, name),
                        disabled: completeCourseMutation.isPending,
                        className: "gap-1.5 text-xs bg-gradient-to-r from-[oklch(0.75_0.18_65)] to-[oklch(0.68_0.22_86)] text-[oklch(0.12_0.06_60)] border-0",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3 h-3" }),
                          " Certify"
                        ]
                      }
                    )
                  ] })
                ]
              },
              String(enrollment.id)
            );
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "mentors", className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: MOCK_MENTORS.map((mentor, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.08 },
              "data-ocid": `gurukul.mentor.${i + 1}`,
              className: "glass border border-border/40 rounded-2xl p-5 flex flex-col gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-[oklch(0.75_0.18_65/0.15)] flex items-center justify-center text-3xl flex-shrink-0", children: mentor.avatar }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: mentor.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: mentor.specialty }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: mentor.rating }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        mentor.sessions,
                        " sessions"
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Available slots:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: mentor.slots.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "px-2.5 py-1 rounded-lg text-xs bg-[oklch(0.75_0.18_65/0.1)] text-[oklch(0.75_0.18_65)] border border-[oklch(0.75_0.18_65/0.2)]",
                      children: slot
                    },
                    slot
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": `gurukul.book_session_button.${i + 1}`,
                    onClick: () => {
                      if (!requireAuth()) return;
                      setBookingMentor(mentor);
                    },
                    className: "w-full bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0 gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                      " Book a Session"
                    ]
                  }
                )
              ]
            },
            mentor.id
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my-bookings", className: "space-y-5", children: !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "gurukul.bookings.empty_state",
              className: "flex flex-col items-center gap-5 py-16 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl gradient-text-saffron mb-2", children: "Sign in to view your bookings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Manage your mentor sessions in one place" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "gurukul.bookings.signin_button",
                    onClick: () => onNavigate("signup"),
                    className: "bg-[oklch(0.75_0.18_65)] hover:bg-[oklch(0.80_0.16_65)] text-[oklch(0.12_0.06_60)] border-0",
                    children: "Sign In"
                  }
                )
              ]
            }
          ) : (mentorBookings ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "gurukul.bookings.empty_state",
              className: "flex flex-col items-center gap-5 py-16 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-14 h-14 text-[oklch(0.75_0.18_65)] opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl gradient-text-saffron mb-2", children: "No bookings yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Book a session with one of our verified masters" })
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: (mentorBookings ?? []).map((booking, i) => {
            const scheduledDate = new Date(
              Number(booking.scheduledAt) / 1e6
            );
            const isCancelled = booking.status === "cancelled";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.06 },
                "data-ocid": `gurukul.booking.${i + 1}`,
                className: `glass border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${isCancelled ? "border-border/20 opacity-60" : "border-border/40"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-[10px] border-0 ${booking.status === "confirmed" ? "bg-[oklch(0.62_0.20_150/0.2)] text-[oklch(0.70_0.16_150)]" : booking.status === "cancelled" ? "bg-muted text-muted-foreground" : "bg-[oklch(0.72_0.20_80/0.2)] text-[oklch(0.80_0.14_80)]"}`,
                          children: booking.status
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        Number(booking.durationMinutes),
                        " min session"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground", children: [
                      scheduledDate.toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      }),
                      " ",
                      "at",
                      " ",
                      scheduledDate.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    ] }),
                    booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
                      "Topic: ",
                      booking.notes
                    ] })
                  ] }),
                  !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      "data-ocid": `gurukul.cancel_booking_button.${i + 1}`,
                      onClick: () => handleCancelBooking(booking.id),
                      disabled: cancelBookingMutation.isPending,
                      className: "border-[oklch(0.62_0.20_25/0.3)] text-[oklch(0.62_0.20_25)] hover:bg-[oklch(0.62_0.20_25/0.1)] flex-shrink-0 text-xs",
                      children: "Cancel"
                    }
                  )
                ]
              },
              String(booking.id)
            );
          }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
          selectedCourse && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CourseDetailModal,
            {
              course: selectedCourse,
              isEnrolled: enrolledMap.has(String(selectedCourse.id)),
              onClose: () => setSelectedCourse(null),
              onEnroll: () => {
                handleEnroll(selectedCourse.id);
                setSelectedCourse(null);
              },
              enrolling: enrollMutation.isPending
            }
          ),
          lessonCourse && (() => {
            const enrollment = enrolledMap.get(String(lessonCourse.id));
            if (!enrollment) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              LessonPlayerModal,
              {
                course: lessonCourse,
                enrollment,
                onClose: () => setLessonCourse(null),
                onMarkComplete: () => handleMarkComplete(
                  enrollment.id,
                  Number(enrollment.progressPct)
                ),
                onCompleteCourse: () => handleCompleteCourse(enrollment.id, lessonCourse.title),
                updating: updateProgressMutation.isPending,
                completing: completeCourseMutation.isPending
              }
            );
          })(),
          certCourse && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CertificateModal,
            {
              courseName: certCourse,
              onClose: () => setCertCourse(null)
            }
          ),
          bookingMentor && /* @__PURE__ */ jsxRuntimeExports.jsx(
            MentorBookingModal,
            {
              mentor: bookingMentor,
              onClose: () => setBookingMentor(null),
              onBook: (date, slot, topic) => handleBookMentor(bookingMentor, date, slot, topic),
              booking: bookMentorMutation.isPending
            }
          )
        ] })
      ]
    }
  );
}
export {
  GurukulPage as default
};
