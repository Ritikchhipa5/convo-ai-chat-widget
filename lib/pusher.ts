import PusherServer from "pusher";
import PusherClient from "pusher-js";

/* -------------------------------------------------------
   GLOBAL TYPES (prevents duplicate instances in dev)
-------------------------------------------------------- */
declare global {
  // eslint-disable-next-line no-var
  var pusherClient: PusherClient | undefined;
  // eslint-disable-next-line no-var
  var pusherServer: PusherServer | undefined;
}

/* -------------------------------------------------------
   CLIENT (Browser only)
-------------------------------------------------------- */
export const pusherClient =
  typeof window !== "undefined"
    ? globalThis.pusherClient ??
      new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
      })
    : null;

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  globalThis.pusherClient = pusherClient!;
}

/* -------------------------------------------------------
   SERVER (Node.js only)
-------------------------------------------------------- */
export const pusherServer =
  typeof window === "undefined"
    ? globalThis.pusherServer ??
      new PusherServer({
        appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
        secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET as string,
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
        useTLS: true,
      })
    : null;

if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  globalThis.pusherServer = pusherServer!;
}
