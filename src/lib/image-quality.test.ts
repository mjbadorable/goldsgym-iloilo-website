import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Next 16 only honours the qualities listed in next.config.ts (`images.qualities`); any other value is
// silently coerced. This keeps the code and the config from drifting apart again.
const configSource = readFileSync("next.config.ts", "utf8");
const allowed = (/qualities:\s*\[([^\]]+)\]/.exec(configSource)?.[1] ?? "").split(",").map((n) => Number(n.trim()));

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.tsx$/.test(name) ? [full] : [];
  });
}

test("images.qualities is parsed from next.config.ts", () => {
  assert.ok(allowed.length > 0 && allowed.every((n) => Number.isInteger(n)));
});

test("every <Image quality={n}> uses a value listed in next.config.ts", () => {
  const offenders: string[] = [];
  for (const file of sourceFiles("src")) {
    for (const m of readFileSync(file, "utf8").matchAll(/quality=\{(\d+)\}/g)) {
      if (!allowed.includes(Number(m[1]))) offenders.push(`${file}: quality={${m[1]}}`);
    }
  }
  assert.deepEqual(offenders, [], `allowed qualities: ${allowed.join(", ")}`);
});
