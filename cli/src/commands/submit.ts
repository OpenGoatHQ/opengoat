/**
 * Submit wizard. v0 stub: prints instructions for a manual PR-based submission.
 * Full interactive flow (prompts, scaffold + auto PR) lands in v0.2.
 */

type Opts = { json?: boolean };

export async function submit(type: string | undefined, opts: Opts) {
  const target = type === "playbook" ? "playbook" : type === "profile" ? "profile" : "profile or playbook";
  const message = {
    status: "manual",
    next_steps: [
      "Fork https://github.com/OpenGoatHQ/opengoat",
      `Copy humans/_template/ to humans/<category>/<your-handle>/`,
      `Fill profile.md and at least one playbook.md (see _template files)`,
      `Run 'goat verify .' locally`,
      `Open a PR. Reviewed within 7 days.`,
    ],
    target,
  };
  if (opts.json) {
    process.stdout.write(JSON.stringify(message, null, 2) + "\n");
    return;
  }
  console.log(`Submit a ${target}:\n`);
  for (let i = 0; i < message.next_steps.length; i++) {
    console.log(`  ${i + 1}. ${message.next_steps[i]}`);
  }
  console.log(`\nInteractive wizard ships in v0.2. For now, follow the steps above.`);
}
