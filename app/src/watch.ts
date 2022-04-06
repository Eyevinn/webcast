import { WebRTCPlayer } from "@eyevinn/webrtc-player";

function base64decode(b64: string) {
  const buf = Buffer.from(b64, "base64");
  return buf.toString();
}

let iceServers: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }];

if (process.env.BC_ICE_SERVERS) {
  iceServers = [];
  process.env.BC_ICE_SERVERS.split(",").forEach(server => {
    // turn:<username>:<password>@turn.eyevinn.technology:3478
    const m = server.match(/^turn:(\S+):(\S+)@(\S+):(\d+)/);
    if (m) {
      const [ _, username, credential, host, port ] = m;
      iceServers.push({ urls: "turn:" + host + ":" + port, username: username, credential: credential });
    }
  });
}

export async function watch(channelUrl, video) {
  if (channelUrl) {
    const player = new WebRTCPlayer({ video: video, type: "se.eyevinn.webrtc", iceServers: iceServers });
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