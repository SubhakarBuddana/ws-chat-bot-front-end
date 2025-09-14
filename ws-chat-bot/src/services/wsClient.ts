import type { Message } from "../types/message";

type Handlers = {
  onOpen?: (ws: WebSocket) => void;
  onMessage?: (msg: Message) => void;
  onClose?: (ev: CloseEvent) => void;
  onError?: (ev: Event) => void;
};

export function createWsClient({ url, onOpen, onMessage, onClose, onError }: { url: string } & Handlers) {
  const ws = new WebSocket(url);

  ws.onopen = () => onOpen?.(ws);
  ws.onmessage = (ev: MessageEvent<string>) => {
    try {
      const payload = JSON.parse(ev.data) as Message;
      onMessage?.(payload);
    } catch (e) {
      console.error("Bad WS message:", e);
    }
  };
  ws.onclose = (e) => onClose?.(e);
  ws.onerror  = (e) => onError?.(e);

  const sendJson = (obj: unknown) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(obj));
    }
  };

  return { ws, sendJson };
}
