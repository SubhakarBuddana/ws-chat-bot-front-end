import { useEffect, useRef, useState } from "react";
import { createWsClient } from "../services/wsClient";
import { makeUserMessage, type Message } from "../types/message";

export function useWebSocketChat(wsUrl: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<ReturnType<typeof createWsClient> | null>(null);

  useEffect(() => {
    const client = createWsClient({
      url: wsUrl,
      onOpen: () => setConnected(true),
      onMessage: (msg) => setMessages((prev) => [...prev, msg]),
      onClose: () => setConnected(false),
      onError: () => setConnected(false),
    });
    clientRef.current = client;

    return () => {
      try { clientRef.current?.ws?.close(); } catch {}
      clientRef.current = null;
    };
  }, [wsUrl]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || !clientRef.current) return;
    const msg = makeUserMessage(t);
    setMessages((prev) => [...prev, msg]);  // optimistic
    clientRef.current.sendJson(msg);
  };

  return { messages, send, connected };
}
