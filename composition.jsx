import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate
} from "remotion";
const COLORS = {
  bg: "#fffef8",
  gridStroke: "#2b2b2b",
  headerText: "#1b1b1b",
  numberText: "#111",
  freeBg: "#efefef",
  highlight: "#ffd54f",
  circleFill: "#ff6b6b"
};
const Header = () => {
  const letters = ["B", "I", "N", "G", "O"];
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12
      },
      children: letters.map((L) => /* @__PURE__ */ jsxDEV(
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
            border: `3px solid ${COLORS.gridStroke}`,
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.headerText,
            fontFamily: "Arial, Helvetica, sans-serif"
          },
          children: L
        },
        L,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 38,
          columnNumber: 9
        }
      ))
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 28,
      columnNumber: 5
    }
  );
};
const Cell = ({ value, highlighted, circleProgress, isHeader }) => {
  const isFree = typeof value === "string" && value.toLowerCase().includes("free");
  const borderWidth = isHeader ? 4 : 3;
  const fontSize = isHeader ? 48 : 28;
  const fontWeight = isHeader ? 900 : 700;
  const borderRadius = isHeader ? 12 : 12;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        width: 92,
        height: 92,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `${borderWidth}px solid ${COLORS.gridStroke}`,
        background: isHeader ? "#ffffff" : isFree ? COLORS.freeBg : "#fff",
        fontSize,
        fontWeight,
        color: isHeader ? COLORS.headerText : COLORS.numberText,
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
        borderRadius,
        boxShadow: isHeader ? "0 4px 10px rgba(0,0,0,0.06)" : "none"
      },
      children: [
        typeof circleProgress === "number" && circleProgress > 0 && !isHeader && /* @__PURE__ */ jsxDEV(
          "div",
          {
            style: {
              position: "absolute",
              width: 74,
              height: 74,
              borderRadius: 999,
              background: COLORS.circleFill,
              opacity: 0.95,
              transform: `scale(${circleProgress})`,
              transition: "none",
              zIndex: 0
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 96,
            columnNumber: 9
          }
        ),
        highlighted && !isFree && !isHeader && /* @__PURE__ */ jsxDEV(
          "div",
          {
            style: {
              position: "absolute",
              inset: 6,
              borderRadius: 8,
              background: COLORS.highlight,
              opacity: 0.9,
              zIndex: 0
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 112,
            columnNumber: 9
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { style: { zIndex: 1 }, children: isFree ? "FREE" : value }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 123,
          columnNumber: 7
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 75,
      columnNumber: 5
    }
  );
};
const BingoCardClip = ({ match = {} }) => {
  const frame = useCurrentFrame();
  const card = match.card && (match.card.length === 6 || match.card.length === 5) ? match.card : defaultCard();
  const highlights = match.highlights || [];
  const replayActions = Array.isArray(match.replayActions) ? match.replayActions : [];
  const cellProgress = {};
  const needsRowShift = card.length === 5;
  replayActions.forEach((a) => {
    const r = needsRowShift ? a.r + 1 : a.r;
    const key = `${r}-${a.c}`;
    const start = a.frame;
    const end = a.frame + 14;
    const p = interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    cellProgress[key] = p;
  });
  const scale = interpolate(frame, [0, 12, 30], [0.86, 1.03, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const lettersRow = ["B", "I", "N", "G", "O"];
  const gridRows = card.length === 5 ? [lettersRow, ...card] : card;
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { background: COLORS.bg, justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        width: 620,
        padding: 28,
        borderRadius: 20,
        background: "#ffffff",
        boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
        transform: `scale(${scale})`,
        opacity
      },
      children: /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 92px)", gap: 8 }, children: gridRows.map(
          (row, rIdx) => row.map((cell, cIdx) => {
            const highlighted = Array.isArray(highlights) && highlights[rIdx] && highlights[rIdx][cIdx];
            const progress = cellProgress[`${rIdx}-${cIdx}`] ?? 0;
            const isHeader = rIdx === 0 && Array.isArray(gridRows[0]) && String(gridRows[0][0]).length === 1 && gridRows[0].length === 5;
            return /* @__PURE__ */ jsxDEV(
              Cell,
              {
                value: cell,
                highlighted,
                circleProgress: progress,
                isHeader
              },
              `${rIdx}-${cIdx}`,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 201,
                columnNumber: 19
              }
            );
          })
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 187,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { marginTop: 18, color: "#666", fontSize: 14 }, children: "Bingo card" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 214,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 185,
        columnNumber: 9
      })
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 174,
      columnNumber: 7
    }
  ) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 173,
    columnNumber: 5
  });
};
function defaultCard() {
  return [
    ["3", "18", "31", "47", "61"],
    ["9", "16", "29", "52", "66"],
    ["2", "20", "FREE", "57", "71"],
    ["12", "24", "39", "50", "69"],
    ["7", "23", "33", "48", "75"]
  ];
}
export {
  BingoCardClip
};
