// Define role constants
export const Role = {
  User: "user",
  Bot: "bot",
} as const;

// Create a type from the constants
export type Role = typeof Role[keyof typeof Role];

export interface Message {
  id: string;
  role: Role;
  text: string;
  ts: number; // epoch millis
}

export function makeUserMessage(text: string): Message {
  return { id: cryptoId(), role: Role.User, text, ts: Date.now() };
}

export function makeKey(msg: Message): string {
  return `${msg.role}-${msg.id}-${msg.ts}`;
}

function cryptoId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
