import { io } from "socket.io-client";

export function createSocket() {
  return io(process.env.NEXT_PUBLIC_WS_URL!, {
    transports: ["websocket", "polling"]
  });
}
