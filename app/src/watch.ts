import { WebRTCPlayer } from "@eyevinn/webrtc-player";

function base64decode(b64: string) {
  const buf = Buffer.from(b64, "base64");
  return buf.toString();
}

export async function watch(channelUrl, video) {
  if (channelUrl) {
    const player = new WebRTCPlayer({ video: video, type: "se.eyevinn.webrtc" });
    await player.load(new URL(channelUrl));
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const searchParams = new URL(window.location.href).searchParams;
  const locator = base64decode(searchParams.get("locator"));

  if (locator) {
    await watch(locator, document.querySelector<HTMLVideoElement>("video"))
  }
});