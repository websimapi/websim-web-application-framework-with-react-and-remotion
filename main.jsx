import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { BingoCardClip } from "./composition.jsx";
const exampleCard = [
  ["1", "18", "31", "48", "63"],
  ["2", "16", "30", "52", "66"],
  ["5", "20", "FREE", "57", "72"],
  ["12", "21", "39", "51", "68"],
  ["7", "24", "34", "46", "70"]
];
function HeaderSmall() {
  const letters = ["B", "I", "N", "G", "O"];
  return (
    // Render the letters in a matching grid so they align with the 5x5 numbers
    /* @__PURE__ */ jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 92px)", gap: 8, justifyContent: "center", marginBottom: 12 }, children: letters.map((L) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          width: 92,
          height: 92,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
          border: `4px solid #2b2b2b`,
          // header thicker outline to match composition
          fontSize: 48,
          fontWeight: 900,
          // bolder letters
          color: "#1b1b1b",
          fontFamily: "Arial, Helvetica, sans-serif"
        },
        children: L
      },
      L,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 9
      },
      this
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 5
    }, this)
  );
}
function InteractiveApp() {
  const [actions, setActions] = useState([]);
  const [playerKey, setPlayerKey] = useState(0);
  const [isReplayMode, setIsReplayMode] = useState(false);
  const handleCellTap = (r, c) => {
    const t = Date.now();
    const next = [...actions, { r, c, t }];
    setActions(next);
  };
  const clearActions = () => {
    setActions([]);
    setIsReplayMode(false);
    setPlayerKey((k) => k + 1);
  };
  const matchForPlayer = useMemo(() => {
    if (!isReplayMode) return { card: exampleCard, highlights: [], durationInFrames: 150 };
    if (actions.length === 0) return { card: exampleCard, highlights: [], durationInFrames: 150 };
    const sorted = [...actions].sort((a, b) => a.t - b.t);
    const t0 = sorted[0].t;
    const actionsWithFrame = sorted.map((a, idx) => {
      const msOffset = a.t - t0;
      const frameFromTime = Math.round(msOffset / 1e3 * 30);
      const frame = Math.max(0, frameFromTime + idx * 6);
      return { r: a.r + 1, c: a.c, frame };
    });
    const maxFrame = actionsWithFrame.reduce((m, a) => Math.max(m, a.frame), 0);
    const durationInFrames = Math.max(150, maxFrame + 30);
    const lettersRow = ["B", "I", "N", "G", "O"];
    const cardWithHeader = [lettersRow, ...exampleCard];
    return { card: cardWithHeader, replayActions: actionsWithFrame, durationInFrames };
  }, [isReplayMode, actions]);
  return /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", height: "100%", gap: 12, alignItems: "center", padding: 12, boxSizing: "border-box", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: { width: 360, boxSizing: "border-box", background: "#fff", borderRadius: 12, padding: 12 }, children: /* @__PURE__ */ jsxDEV("div", { style: {
      width: "100%",
      height: 640,
      marginTop: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fafafa",
      borderRadius: 12,
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      overflow: "hidden"
    }, children: /* @__PURE__ */ jsxDEV("div", { style: {
      width: 620,
      padding: 28,
      borderRadius: 20,
      background: "#fff",
      /* scale preview down so it matches composition render size inside the 360px panel */
      transform: "scale(0.55)",
      transformOrigin: "center center",
      // changed from "top center" to center the scaled board
      /* ensure the scaled content stays centered in its container */
      /* removed marginLeft/marginRight:auto to let flex centering handle alignment */
      boxSizing: "content-box"
    }, children: [
      /* @__PURE__ */ jsxDEV(HeaderSmall, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 92px)", gap: 8, justifyContent: "center", marginTop: 6 }, children: exampleCard.map(
        (row, rIdx) => row.map((cell, cIdx) => {
          const isFree = typeof cell === "string" && cell.toLowerCase().includes("free");
          const tapped = actions.some((a) => a.r === rIdx && a.c === cIdx);
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCellTap(rIdx, cIdx),
              style: {
                width: 92,
                height: 92,
                borderRadius: 12,
                border: "3px solid #2b2b2b",
                // match composition thicker outline for cells
                background: isFree ? "#efefef" : "#fff",
                fontWeight: 700,
                fontSize: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                color: "#111",
                fontFamily: "Arial, Helvetica, sans-serif"
              },
              children: [
                tapped && /* @__PURE__ */ jsxDEV("div", { style: {
                  position: "absolute",
                  width: 74,
                  height: 74,
                  borderRadius: 999,
                  background: "#ff6b6b",
                  opacity: 0.95,
                  zIndex: 0
                } }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 149,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { style: { zIndex: 1, fontSize: 20 }, children: isFree ? "FREE" : cell }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 159,
                  columnNumber: 23
                }, this)
              ]
            },
            `${rIdx}-${cIdx}`,
            true,
            {
              fileName: "<stdin>",
              lineNumber: 127,
              columnNumber: 21
            },
            this
          );
        })
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 120,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 106,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 94,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 92,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { width: 360, height: 640, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", boxSizing: "border-box", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 36px rgba(0,0,0,0.12)" }, children: /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: BingoCardClip,
        durationInFrames: matchForPlayer.durationInFrames || 150,
        fps: 30,
        compositionWidth: 1080,
        compositionHeight: 1920,
        loop: true,
        controls: true,
        inputProps: { match: matchForPlayer },
        autoplay: true,
        style: { width: "100%", height: "100%" }
      },
      playerKey + (isReplayMode ? "-replay" : ""),
      false,
      {
        fileName: "<stdin>",
        lineNumber: 174,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 173,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 172,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { width: 360, boxSizing: "border-box", padding: 12, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setIsReplayMode(true);
              setPlayerKey((k) => k + 1);
            },
            style: { padding: "8px 12px", borderRadius: 8, background: "#1b9fff", color: "#fff", border: "none", fontSize: 14 },
            children: "Render Replay"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 193,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: clearActions,
            style: { padding: "8px 12px", borderRadius: 8, background: "#eee", border: "none", fontSize: 14 },
            children: "Clear"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 199,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 192,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", fontSize: 12 }, children: [
        /* @__PURE__ */ jsxDEV("div", { style: { fontWeight: 700, marginBottom: 6 }, children: "Recorded actions JSON" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 208,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { style: { whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#f7f7f7", padding: 8, borderRadius: 6, maxHeight: 420, overflow: "auto" }, children: JSON.stringify(actions, null, 2) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 209,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 207,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 191,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 90,
    columnNumber: 5
  }, this);
}
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(InteractiveApp, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 218,
  columnNumber: 51
}));
