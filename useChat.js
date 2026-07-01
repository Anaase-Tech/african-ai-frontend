/**
 * useChat.js — African AI v5.0
 * Custom hook for streaming chat with the FastAPI backend.
 *
 * Gives you:
 *   sendMessage(text)  — sends a message, streams the response
 *   messages           — array of { role, content } objects
 *   isStreaming        — boolean: true while response is arriving
 *   clearHistory()     — wipe the conversation
 */

import { useState, useCallback, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:7860";

export function useChat() {
  const [messages, setMessages]     = useState([]);
  const [isStreaming, setStreaming]  = useState(false);
  const abortRef                    = useRef(null);

  const sendMessage = useCallback(async (text) => {
    const userMsg = { role: "user", content: text };
    const history = [...messages, userMsg];

    // Optimistically add user message + empty assistant placeholder
    setMessages([...history, { role: "assistant", content: "" }]);
    setStreaming(true);

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller   = new AbortController();
    abortRef.current   = controller;

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: text, history }),
        signal:  controller.signal,
      });

      if (!res.ok) throw new Error(`Chat API returned ${res.status}`);
      if (!res.body) throw new Error("No response body — streaming not supported");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        // Update the assistant message in-place as tokens arrive
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role:    "assistant",
            content: accumulated,
          };
          return updated;
        });
      }
    } catch (err) {
      if (err.name === "AbortError") return;  // user navigated away — ignore
      console.error("[useChat] Stream error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role:    "assistant",
          content: "African AI is reconnecting — please try again.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }, [messages]);

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isStreaming, sendMessage, clearHistory };
}
