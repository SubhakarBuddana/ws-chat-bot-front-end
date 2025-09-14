import React from "react";
import { colors } from "../styles/theme";
import { Role } from "../types/message";

type Props = { role: Role; text: string };

export default function MessageBubble({ role, text }: Props) {
  const isUser = role === Role.User;
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 10 }}>
      <div
        style={{
          maxWidth: "70%",
          padding: "10px 14px",
          borderRadius: 14,
          background: isUser ? colors.bubbleUser : colors.bubbleBot,
          color: isUser ? "#fff" : colors.text,
          whiteSpace: "pre-wrap",
          lineHeight: 1.4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {text}
      </div>
    </div>
  );
}
