import { WHIPClient, WHIPClientOptions } from "@eyevinn/whip-web-client";

const { NODE_ENV } = process.env;

let EndpointUrl = "http://localhost:8000/api/v1/whip/broadcaster";

if (NODE_ENV !== "development") {
  EndpointUrl = process.env.WHIP_ENDPOINT_URL;
}

function isClipboardAvailable() {
  return !!navigator.clipboard;
}

function base64encode(input: string) {
  const buf = Buffer.from(input);
  return buf.toString("base64");
}

async function getChannelUrl(client: WHIPClient) {
  let channelUrl: string;
  (await client.getResourceExtensions()).forEach(link => {
    if (link.match(/rel=urn:ietf:params:whip:eyevinn-wrtc-channel/) || link.match(/rel=urn:ietf:params:whip:whpp/)) {
      const m = link.match(/<?([^>]*)>/);
      channelUrl = m[1];
    }
  });
  return channelUrl;

}

function updateViewerCount(count) {
  const viewercount = document.querySelector<HTMLSpanElement>("#viewercount");
  viewercount.textContent = count;
  viewercount.parentElement?.classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", async () => {
  const opts: WHIPClientOptions = {};
  const client = new WHIPClient({
    endpoint: EndpointUrl,
    opts: {
      authkey: process.env.API_KEY,
      debug: !!process.env.DEBUG,
    }
  });
  await client.setIceServersFromEndpoint();
  client.setupBackChannel();
  client.on("message", (message) => {
    const json = JSON.parse(message);
    if (!json.message && !json.message.event) {
      return;
    }
    switch (json.message.event) {
      case "viewerschange":
        const viewers = json.message.viewercount;
        updateViewerCount(viewers);
        break;
    }  
  });

  const startButton = document.querySelector<HTMLButtonElement>("#start");
  const stopButton = document.querySelector<HTMLButtonElement>("#stop");
  const shareSection = document.querySelector<HTMLTableSectionElement>("#section-share");

  startButton.addEventListener("click", async () => {
    const videoElement = document.querySelector<HTMLVideoElement>("#webcast");    
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoElement.srcObject = mediaStream;

    await client.ingest(mediaStream);

    const channelUrl = await getChannelUrl(client);

    if (channelUrl) {
      const inputElement = document.querySelector<HTMLInputElement>("#share-link");
      const watchHostUrl = new URL(window.location.href);
      watchHostUrl.pathname = "/watch.html";
      watchHostUrl.searchParams.set("locator", base64encode(channelUrl));
      inputElement.value = watchHostUrl.href;
    }
    shareSection.classList.toggle("hidden");
    startButton.classList.toggle("hidden");
    stopButton.classList.toggle("hidden");
  });

  stopButton.addEventListener("click", () => {
    client.destroy();
    shareSection.classList.toggle("hidden");
    startButton.classList.toggle("hidden");
    stopButton.classList.toggle("hidden");
    const viewercount = document.querySelector<HTMLSpanElement>("#viewercount");
    viewercount.parentElement?.classList.add("hidden");
  
  });

  document.querySelector<HTMLButtonElement>("#share").addEventListener("click", async () => {
    const watchUrl = document.querySelector<HTMLInputElement>("#share-link").value;
    try {
      await navigator.share({ url: watchUrl });
    } catch (err) {
      // share not supported, copy to clipboard instead
      if (isClipboardAvailable()) {
        await navigator.clipboard.writeText(watchUrl);
        document.querySelector<HTMLParagraphElement>("#message").innerHTML = "URL copied to clipboard";
      }
    }
  });
});