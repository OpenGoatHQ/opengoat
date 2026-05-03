import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const REQUIRED_PROFILE = ["name", "handle", "specialties", "anti_specialties", "booking_url", "accepting_bookings"];
const REQUIRED_PLAYBOOK = ["title", "slug", "author", "tags"];

export async function verify(target: string) {
  const errors: string[] = [];

  function readFm(path: string): Record<string, any> {
    const src = readFileSync(path, "utf8");
    if (!src.startsWith("---")) return {};
    const end = src.indexOf("\n---", 3);
    if (end === -1) return {};
    const raw = src.slice(3, end).trim();
    const fm: Record<string, any> = {};
    let key: string | null = null;
    let list: string[] | null = null;
    for (const line of raw.split("\n")) {
      if (line.startsWith("  - ") && list) {
        list.push(line.slice(4).trim());
        continue;
      }
      const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
      if (!m) continue;
      key = m[1];
      const val = m[2];
      if (val === "") {
        list = [];
        fm[key] = list;
      } else {
        fm[key] = val;
        list = null;
      }
    }
    return fm;
  }

  function checkProfile(path: string, label: string) {
    if (!existsSync(path)) {
      errors.push(`${label}: missing profile.md`);
      return;
    }
    const fm = readFm(path);
    for (const f of REQUIRED_PROFILE) {
      if (!(f in fm)) errors.push(`${label}: missing field '${f}'`);
    }
  }

  function checkPlaybook(path: string, label: string) {
    const fm = readFm(path);
    for (const f of REQUIRED_PLAYBOOK) {
      if (!(f in fm)) errors.push(`${label}: missing field '${f}'`);
    }
  }

  if (statSync(target).isDirectory()) {
    const humansDir = existsSync(join(target, "humans")) ? join(target, "humans") : target;
    if (!existsSync(humansDir)) {
      console.error(`No humans/ directory at ${target}`);
      process.exit(1);
    }
    for (const cat of readdirSync(humansDir)) {
      if (cat.startsWith("_") || cat.startsWith(".")) continue;
      const catDir = join(humansDir, cat);
      if (!statSync(catDir).isDirectory()) continue;
      const catReadme = join(catDir, "README.md");
      if (existsSync(catReadme)) {
        for (const handle of readdirSync(catDir)) {
          if (handle === "README.md" || handle.startsWith(".")) continue;
          const handleDir = join(catDir, handle);
          if (!statSync(handleDir).isDirectory()) continue;
          checkProfile(join(handleDir, "profile.md"), `humans/${cat}/${handle}/profile.md`);
          const pbDir = join(handleDir, "playbooks");
          if (existsSync(pbDir)) {
            for (const file of readdirSync(pbDir)) {
              if (!file.endsWith(".md") || file.startsWith("_")) continue;
              checkPlaybook(join(pbDir, file), `humans/${cat}/${handle}/playbooks/${file}`);
            }
          }
        }
      }
    }
  } else {
    if (target.endsWith("profile.md")) checkProfile(target, target);
    else checkPlaybook(target, target);
  }

  if (errors.length) {
    console.error("Verification failed:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log("All profiles and playbooks valid.");
}
