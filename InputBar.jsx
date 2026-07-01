/**
 * InputBar.jsx — African AI v5.0
 * Bottom input row: text field + mic button + send button.
 */

import React, { useState, useCallback } from "react";
import { MicButton } from "./MicButton";
import { useMic }    from "../hooks/useMic";

export function InputBar({ onSend, isStreaming }) {
  const [text, setText] = useState("");

  const handleTranscribed = useCallback((transcribedText) => {
    setText(transcribedText);
  }, []);

  const { toggle: micToggle, isRecording, isTranscribing, error: micError } =
    useMic({ onTranscribed: handleTranscribed });

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    onSend(trimmed);
    setText("");
  }, [text, isStreaming, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ padding: "8px 12px 16px", background: "#080808" }}>
      {/* Mic error message */}
      {micError && (
        <div style={{
          color: "#ff6b6b", fontSize: "0.72rem",
          textAlign: "center", marginBottom: "6px",
        }}>
          {micError}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        {/* Text input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about African history, culture, proverbs, music, leaders..."
          rows={1}
          style={{
            flex:        1,
            background:  "#111",
            color:       "#fff",
            border:      "1px solid rgba(255,200,0,0.25)",
            borderRadius: "16px",
            padding:     "12px 16px",
            fontSize:    "1rem",
            lineHeight:  "1.5",
            resize:      "none",
            outline:     "none",
            fontFamily:  "inherit",
            minHeight:   "44px",
            maxHeight:   "120px",
            overflowY:   "auto",
            transition:  "border-color 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(255,200,0,0.55)";
            e.target.style.boxShadow   = "0 0 12px rgba(255,180,0,0.18)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,200,0,0.25)";
            e.target.style.boxShadow   = "none";
          }}
        />

        {/* Mic button */}
        <MicButton
          isRecording={isRecording}
          isTranscribing={isTranscribing}
          error={micError}
          onToggle={micToggle}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!text.trim() || isStreaming}
          style={{
            height:       "44px",
            padding:      "0 20px",
            borderRadius: "14px",
            border:       "none",
            background:   (!text.trim() || isStreaming)
              ? "rgba(200,150,15,0.4)"
              : "linear-gradient(90deg, #C8960F, #F0C030)",
            color:        "#000",
            fontWeight:   "800",
            fontSize:     "0.95rem",
            cursor:       (!text.trim() || isStreaming) ? "not-allowed" : "pointer",
            flexShrink:   0,
            transition:   "background 0.2s ease",
            whiteSpace:   "nowrap",
          }}
        >
          Ask →
        </button>
      </div>
    </div>
  );
}
