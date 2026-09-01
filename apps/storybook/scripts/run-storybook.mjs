import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import process from "node:process";
import { createRequire } from "node:module";

const storybookHome = resolve(".storybook-home");
await mkdir(storybookHome, { recursive: true });

const require = createRequire(import.meta.url);
const storybookBin = require.resolve("storybook/bin/index.cjs");

const child = spawn(process.execPath, [storybookBin, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: {
    ...process.env,
    HOME: storybookHome,
    USERPROFILE: storybookHome,
    STORYBOOK_DISABLE_TELEMETRY: "1",
    STORYBOOK_ENABLE_CRASH_REPORTS: "0",
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
