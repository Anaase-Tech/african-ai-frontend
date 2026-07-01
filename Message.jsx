/**
 * Message.jsx — African AI v5.0
 * Single chat message bubble.
 * User messages right-aligned gold, assistant messages left-aligned dark.
 */

import React from "react";

export function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display:       "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom:  "12px",
        padding:       "0 12px",
      }}
    >
      <div
        style={{
          maxWidth:     "88%",
          padding:      "14px 18px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background:   isUser
            ? "rgba(140, 90, 0, 0.60)"
            : "#161616",
          border:       isUser
            ? "1px solid rgba(255, 200, 0, 0.30)"
            : "1px solid rgba(255, 255, 255, 0.07)",
          color:        "#f5f5f5",
          fontSize:     "1rem",
          lineHeight:   "1.75",
          whiteSpace:   "pre-wrap",
          wordBreak:    "break-word",
        }}
      >
        {content || (
          // Typing indicator dots while streaming
          <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width:            "6px",
                  height:           "6px",
                  borderRadius:     "50%",
                  background:       "#D4A017",
                  display:          "inline-block",
                  animation:        `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
