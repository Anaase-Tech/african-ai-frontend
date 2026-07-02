/**
 * App.jsx — African AI v5.0
 * Root component. Pan-African dark theme, mobile-first.
 * Built by Anaase-Tech Ltd | CEO: Eddy B3rima
 */

import React, { useCallback } from "react";
import { ChatWindow } from "./components/ChatWindow";
import { InputBar }   from "./components/InputBar";
import { useChat }    from "./hooks/useChat";

const LOGO_URL =
  "https://raw.githubusercontent.com/Anaase-Tech/African-AI/main/logo.png";

export default function App() {
  const { messages, isStreaming, sendMessage, clearHistory } = useChat();

  const handleSend = useCallback((text) => {
    sendMessage(text);
  }, [sendMessage]);

  return (
    <div style={{
      background:     "#060606",
      minHeight:      "100dvh",
      display:        "flex",
      flexDirection:  "column",
      fontFamily:     "'Inter', sans-serif",
      color:          "#f0f0f0",
      maxWidth:       "100vw",
      overflow:       "hidden",
    }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <header style={{
        background:   "linear-gradient(135deg, #1a1610 0%, #0a0a0a 50%, #0a1410 100%)",
        borderBottom: "1px solid rgba(255,200,50,0.20)",
        padding:      "20px 16px 16px",
        textAlign:    "center",
        flexShrink:   0,
        position:     "relative",
        overflow:     "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position:       "absolute",
          inset:          0,
          background:     `
            radial-gradient(circle at 15% 20%, rgba(255,190,0,0.10), transparent 35%),
            radial-gradient(circle at 85% 80%, rgba(0,220,90,0.09), transparent 35%)
          `,
          pointerEvents:  "none",
        }} />

        {/* Logo */}
        <img
          src={LOGO_URL}
          alt="African AI"
          onError={(e) => {
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/8/80/Africa_icon.svg";
          }}
          style={{
            width:        "60px",
            height:       "60px",
            borderRadius: "50%",
            border:       "1.5px solid rgba(255,200,0,0.30)",
            marginBottom: "10px",
            objectFit:    "contain",
          }}
        />

        {/* Title */}
        <h1 style={{
          fontSize:        "1.8rem",
          fontWeight:      900,
          letterSpacing:   "5px",
          margin:          "0 0 6px",
          background:      "linear-gradient(90deg, #FFD54A 0%, #F6C343 35%, #59D66F 65%, #FFD54A 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:  "transparent",
          backgroundClip:  "text",
        }}>
          AFRICAN AI
        </h1>

        <p style={{
          color:      "#e8e8e8",
          fontSize:   "0.82rem",
          lineHeight: 1.6,
          margin:     "0 0 12px",
        }}>
          Built by Africans · Powered by African Knowledge 🌍
        </p>

        {/* Pills */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "6px" }}>
          {["🌍 African Knowledge", "🗂 14 Categories", "🌐 African Languages", "🇬🇭 Anaase-Tech", "⚡ RAG v5.0"].map((pill) => (
            <span key={pill} style={{
              padding:      "4px 11px",
              borderRadius: "999px",
              background:   "rgba(255,200,0,0.10)",
              border:       "1px solid rgba(255,200,0,0.35)",
              color:        "#ffd966",
              fontSize:     "0.72rem",
              fontWeight:   700,
            }}>
              {pill}
            </span>
          ))}
        </div>
      </header>

      {/* ── Chat window ──────────────────────────────── */}
      <ChatWindow
        messages={messages}
        isStreaming={isStreaming}
        onExampleClick={handleSend}
      />

      {/* ── Input bar ────────────────────────────────── */}
      <InputBar onSend={handleSend} isStreaming={isStreaming} />

      {/* ── Clear + footer ───────────────────────────── */}
      <div style={{
        padding:    "0 12px 20px",
        background: "#080808",
        flexShrink: 0,
      }}>
        <button
          onClick={clearHistory}
          style={{
            width:        "100%",
            padding:      "10px",
            background:   "transparent",
            border:       "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            color:        "#555",
            fontSize:     "0.82rem",
            cursor:       "pointer",
            marginBottom: "12px",
          }}
        >
          Clear chat
        </button>

        {/* Community contribution */}
        <div style={{
          background:   "linear-gradient(135deg, #0d0d00, #001a0a)",
          border:       "1px solid rgba(255,200,0,0.20)",
          borderRadius: "16px",
          padding:      "16px",
          textAlign:    "center",
          marginBottom: "12px",
        }}>
          <div style={{ fontWeight: 700, color: "#FFD54A", marginBottom: "6px" }}>
            🌍 Help Build African AI
          </div>
          <div style={{ fontSize: "0.8rem", color: "#aaa", marginBottom: "10px", lineHeight: 1.5 }}>
            Share a word, proverb, or cultural knowledge from your language.
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSedb5p6UaqOFYjnpNV1k2e4p8_WQoEEZB94imexe72MjKJUQg/viewform"
            target="_blank"
            rel="noreferrer"
            style={{
              display:      "inline-block",
              background:   "linear-gradient(90deg, #C8960F, #F0C030)",
              color:        "#000",
              fontWeight:   800,
              fontSize:     "0.85rem",
              padding:      "9px 22px",
              borderRadius: "999px",
              textDecoration: "none",
            }}
          >
            ✍️ Submit Knowledge
          </a>
        </div>

        <p style={{ color: "#333", fontSize: "0.68rem", textAlign: "center", margin: 0 }}>
          African AI v5.0 · Built in Ghana 🇬🇭 by Anaase-Tech
        </p>
      </div>

    </div>
  );
}

