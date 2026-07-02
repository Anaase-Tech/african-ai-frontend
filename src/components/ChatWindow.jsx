/**
 * ChatWindow.jsx — African AI v5.0
 * Scrollable message list. Auto-scrolls to bottom as new tokens arrive.
 */

import React, { useEffect, useRef } from "react";
import { Message } from "./Message";

const EXAMPLES = [
  "Tell me about the Mali Empire",
  "What does Ubuntu mean?",
  "What is akwaaba in Twi?",
  "History of Afrobeats music",
  "Who was Thomas Sankara?",
  "Who was Yaa Asantewaa?",
  "Share an African proverb",
  "Tell me about the Ashanti Empire",
];

export function ChatWindow({ messages, isStreaming, onExampleClick }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isEmpty = messages.length === 0;

  return (
    <div
      style={{
        flex:       1,
        overflowY:  "auto",
        padding:    "12px 0",
        display:    "flex",
        flexDirection: "column",
      }}
    >
      {isEmpty ? (
        // Empty state — show example questions
        <div style={{ padding: "0 12px", flex: 1 }}>
          <p style={{
            color:      "#555",
            fontSize:   "0.78rem",
            textAlign:  "center",
            margin:     "24px 0 16px",
            letterSpacing: "0.5px",
          }}>
            — Try asking —
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => onExampleClick(ex)}
                style={{
                  background:   "rgba(255,255,255,0.03)",
                  border:       "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding:      "12px 16px",
                  color:        "#bbb",
                  fontSize:     "0.9rem",
                  cursor:       "pointer",
                  textAlign:    "left",
                  transition:   "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,200,0,0.4)";
                  e.currentTarget.style.color       = "#FFD54A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color       = "#bbb";
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Message list
        <div style={{ flex: 1 }}>
          {messages.map((msg, i) => (
            <Message key={i} role={msg.role} content={msg.content} />
          ))}
        </div>
      )}

      {/* Invisible anchor for auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
}
