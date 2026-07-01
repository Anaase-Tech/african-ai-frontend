/**
 * MicButton.jsx — African AI v5.0
 * Voice input button. Tap to start, tap again to stop and transcribe.
 *
 * States:
 *   idle        — gold circle with mic icon, "Tap to record" label
 *   recording   — red pulsing circle with stop icon, "Recording..." label
 *   transcribing — gold circle with spinner, "Transcribing..." label
 *   error       — brief red flash, error message shown below input row
 */

import React from "react";

export function MicButton({ isRecording, isTranscribing, error, onToggle }) {
  const getIcon = () => {
    if (isTranscribing) return "⏳";
    if (isRecording)    return "⏹";
    return "🎤";
  };

  const getLabel = () => {
    if (isTranscribing) return "Sending...";
    if (isRecording)    return "Tap to stop";
    return "Voice";
  };

  const isActive   = isRecording || isTranscribing;
  const isDisabled = isTranscribing;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <button
        onClick={onToggle}
        disabled={isDisabled}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        style={{
          width:        "44px",
          height:       "44px",
          borderRadius: "50%",
          border:       "none",
          cursor:       isDisabled ? "not-allowed" : "pointer",
          fontSize:     "1.1rem",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          flexShrink:   0,
          transition:   "transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease",
          background:   isRecording
            ? "linear-gradient(90deg, #e63946, #ff6b6b)"
            : "linear-gradient(90deg, #C8960F, #F0C030)",
          boxShadow:    isRecording
            ? "0 0 0 4px rgba(230, 57, 70, 0.3)"
            : "none",
          animation:    isRecording ? "micPulse 1s ease-in-out infinite" : "none",
          opacity:      isDisabled ? 0.7 : 1,
        }}
      >
        {getIcon()}
      </button>

      <span
        style={{
          color:     isRecording ? "#ff6b6b" : "#888",
          fontSize:  "0.6rem",
          textAlign: "center",
          lineHeight: 1.2,
          minWidth:  "44px",
        }}
      >
        {getLabel()}
      </span>

      <style>{`
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(230, 57, 70, 0.3); }
          50%       { box-shadow: 0 0 0 8px rgba(230, 57, 70, 0.1); }
        }
      `}</style>
    </div>
  );
}
