import React from "react";
import { colors, radii } from "../styles/theme";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
};

export default function InputBar({ value, onChange, onSend }: Props) {
  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div style={styles.inputRow}>
      <textarea
        style={styles.input}
        placeholder="Type your message…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        rows={2}
      />
      <button style={styles.button} onClick={onSend}>Send</button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  inputRow: {
    display: "flex",
    gap: 8,
    padding: 12,
    borderTop: "1px solid #e5e7eb",
    background: "white",
  },
  input: {
    flex: 1,
    resize: "none",
    border: "1px solid #d1d5db",
    borderRadius: radii.sm,
    padding: 10,
    outline: "none",
  },
  button: {
    border: "none",
    borderRadius: radii.sm,
    padding: "0 16px",
    fontWeight: 600,
    cursor: "pointer",
    background: colors.btn,
    color: colors.btnText,
  },
};
