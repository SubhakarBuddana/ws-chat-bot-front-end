import React from "react";
import ChatWindow from "./components/chatWindow";
import { useWebSocketChat } from "./hooks/useWebSocketChat";

export default function App() {
  const { messages, send, connected } = useWebSocketChat("ws://localhost:3001/ws");
  return <ChatWindow messages={messages} onSend={send} connected={connected} />;
}
