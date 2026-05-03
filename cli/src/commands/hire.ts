import { spawn } from "node:child_process";
import { platform } from "node:os";
import { loadIndex } from "../lib/data.js";

type Opts = { print?: boolean; json?: boolean; noCache?: boolean; registry?: string };

export async function hire(handle: string, opts: Opts) {
  const idx = await loadIndex({ noCache: opts.noCache, registry: opts.registry });
  const h = idx.humans.find((x) => x.handle === handle);
  if (!h) {
    console.error(`No human with handle '${handle}'.`);
    process.exit(1);
  }
  const url = h.profile.booking_url as string | undefined;
  if (!url) {
    console.error(`${handle} has no booking_url set.`);
    process.exit(1);
  }
  if (opts.json) {
    process.stdout.write(JSON.stringify({ handle, booking_url: url }, null, 2) + "\n");
    return;
  }
  if (opts.print) {
    console.log(url);
    return;
  }
  const cmd = platform() === "darwin" ? "open" : platform() === "win32" ? "start" : "xdg-open";
  spawn(cmd, [url], { stdio: "ignore", detached: true }).unref();
  console.log(`Opening ${url}`);
}
