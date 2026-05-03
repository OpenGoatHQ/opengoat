/**
 * Submit instructions. v0 stub: prints manual PR-based steps for any of the 3 entity types.
 */

type Opts = { json?: boolean };

export async function submit(type: string | undefined, opts: Opts) {
  const t = ["human", "agent", "skill"].includes(type || "") ? type : "any of human / agent / skill";

  const message = {
    status: "manual",
    target: t,
    next_steps: [
      "Fork https://github.com/OpenGoatHQ/opengoat",
      `Choose what you're publishing:`,
      `  human  → cp humans/_template humans/<category>/<your-handle>`,
      `  agent  → cp agents/_template agents/<category>/<your-handle>`,
      `  skill  → cp skills/_template skills/<your-skill-slug>`,
      `Fill the markdown files (profile.md, goat.md, skill.md as applicable)`,
      `Run 'goat verify .' locally`,
      `Open a PR. Reviewed within 7 days.`,
    ],
  };

  if (opts.json) {
    process.stdout.write(JSON.stringify(message, null, 2) + "\n");
    return;
  }

  console.log(`Submit a ${t}:\n`);
  for (let i = 0; i < message.next_steps.length; i++) {
    console.log(`  ${i + 1}. ${message.next_steps[i]}`);
  }
  console.log(`\nInteractive wizard ships in v0.3. For now, follow the steps above.`);
}
