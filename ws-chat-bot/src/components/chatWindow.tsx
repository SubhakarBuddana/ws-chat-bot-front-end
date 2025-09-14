import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./messageBubble";
import InputBar from "./inputBar";
import { colors, radii, shadow } from "../styles/theme";
import { makeKey, type Message } from "../types/message";

type Props = {
  messages: Message[];
  onSend: (text: string) => void;
  connected: boolean;
};

export default function ChatWindow({ messages, onSend, connected }: Props) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    onSend(draft);
    setDraft("");
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <header style={styles.header}>
          <span>💬 Chat Assistant (WS)</span>
          <span style={{ fontSize: 12, opacity: 0.8 }}>
            {connected ? "● Connected" : "○ Disconnected"}
          </span>
        </header>

        <div style={styles.messages}>
          {messages.map((m) => (
            <MessageBubble key={makeKey(m)} role={m.role} text={m.text} />
          ))}
          <div ref={endRef} />
        </div>

        <InputBar value={draft} onChange={setDraft} onSend={send} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100dvh",
    background: colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "min(900px, 100%)",
    background: colors.card,
    borderRadius: radii.lg,
    boxShadow: shadow,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    padding: "16px 20px",
    borderBottom: `1px solid ${colors.border}`,
    fontSize: 18,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messages: {
    padding: 16,
    height: "60vh",
    overflowY: "auto",
    background: "#fafafa",
  },
};
