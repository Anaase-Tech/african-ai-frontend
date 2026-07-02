/**
 * useMic.js — African AI v5.0
 * Custom hook for voice recording via browser MediaRecorder API.
 *
 * Gives you:
 *   startRecording()  — requests mic permission and starts recording
 *   stopRecording()   — stops, encodes to base64, calls /transcribe
 *   isRecording       — boolean state
 *   isTranscribing    — boolean state (waiting for API response)
 *   error             — string or null
 */

import { useState, useRef, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:7860";

export function useMic({ onTranscribed }) {
  const [isRecording, setIsRecording]       = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError]                   = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef   = useRef([]);
  const streamRef        = useRef(null);

  const startRecording = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current   = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        // Stop all mic tracks — releases the browser's mic indicator
        stream.getTracks().forEach((t) => t.stop());

        const blob     = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader   = new FileReader();

        reader.onloadend = async () => {
          setIsTranscribing(true);
          try {
            const res = await fetch(`${API_BASE}/transcribe`, {
              method:  "POST",
              headers: { "Content-Type": "application/json" },
              body:    JSON.stringify({ audio_base64: reader.result }),
            });

            if (!res.ok) throw new Error(`Transcribe API returned ${res.status}`);
            const data = await res.json();
            if (data.text) onTranscribed(data.text);
          } catch (err) {
            console.error("[useMic] Transcription failed:", err);
            setError("Transcription failed — please try again.");
          } finally {
            setIsTranscribing(false);
          }
        };

        reader.readAsDataURL(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("[useMic] getUserMedia failed:", err);
      setError("Microphone permission denied — please allow mic access.");
    }
  }, [onTranscribed]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const toggle = useCallback(() => {
    if (isRecording) stopRecording();
    else startRecording();
  }, [isRecording, startRecording, stopRecording]);

  return { toggle, isRecording, isTranscribing, error };
}
