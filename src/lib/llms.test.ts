import { test } from "node:test";
import assert from "node:assert/strict";
import { COACHES } from "../content/coaches.ts";
import { FAQ_TEXT } from "../content/faq-text.ts";
import { TOUR_PHOTOS } from "../content/tour.ts";
import { ZONES } from "../content/zones.ts";
import { buildLlmsTxt } from "./llms.ts";
import { HOURS, formatMinutes } from "./hours.ts";
import { ADDRESS, CONTACT } from "./site.ts";

const ORIGIN = "https://www.example.com";
const txt = buildLlmsTxt(ORIGIN);

/** The lines of the "### Coach" block. */
function coachBlock(name: string): string[] {
  const lines = txt.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`### ${name} (`));
  assert.ok(start >= 0, `no section for ${name}`);
  const end = lines.findIndex((l, i) => i > start && (l.startsWith("### ") || l.startsWith("## ")));
  return lines.slice(start, end === -1 ? undefined : end);
}

/** The "  - item" lines listed under a "- Heading:" line of a coach block. */
function listUnder(block: string[], heading: string): string[] | null {
  const i = block.indexOf(`- ${heading}:`);
  if (i === -1) return null;
  const items: string[] = [];
  for (const line of block.slice(i + 1)) {
    if (!line.startsWith("  - ")) break;
    items.push(line.slice(4));
  }
  return items;
}

test("the contact details, address and hours are the site's own", () => {
  assert.ok(txt.includes(ADDRESS.oneLine));
  assert.ok(txt.includes(ADDRESS.mapsUrl));
  assert.ok(txt.includes(CONTACT.phoneDisplay));
  assert.ok(txt.includes(CONTACT.phoneE164));
  assert.ok(txt.includes(CONTACT.email));
  for (const r of HOURS) {
    assert.ok(txt.includes(`${r.label}: ${formatMinutes(r.open)} – ${formatMinutes(r.close)}`));
  }
});

test("the origin comes from the caller, without a doubled slash", () => {
  assert.ok(txt.includes(`${ORIGIN}/`));
  assert.ok(txt.includes(`[Coaches](${ORIGIN}/coaches)`));
  assert.ok(buildLlmsTxt(`${ORIGIN}/`).includes(`[Coaches](${ORIGIN}/coaches)`));
  assert.ok(!txt.includes(`${ORIGIN}//`));
});

test("every coach appears with exactly the competitions and certifications the site states", () => {
  for (const coach of COACHES) {
    const block = coachBlock(coach.name);
    assert.ok(block[0].includes(coach.role));
    assert.ok(block.includes(`- ${coach.experience}`));
    assert.ok(block.includes(`- Specializations: ${coach.coachingFocus.join("; ")}`));
    assert.deepEqual(listUnder(block, "Competitions & awards"), coach.competitions ?? null);
    assert.deepEqual(listUnder(block, "Certifications"), coach.certifications ?? null);
  }
});

test("a coach with no certifications gets no Certifications heading", () => {
  const withoutCerts = COACHES.filter((c) => !c.certifications?.length);
  assert.ok(withoutCerts.length > 0, "fixture: at least one coach has no certifications");
  for (const coach of withoutCerts) assert.equal(listUnder(coachBlock(coach.name), "Certifications"), null);
});

test("no coach claims are invented: every line in the Coaches section comes from the content file", () => {
  const known = new Set<string>();
  for (const c of COACHES) {
    known.add(`### ${c.name} (${c.role})`);
    known.add(`- ${c.experience}`);
    known.add(`- Specializations: ${c.coachingFocus.join("; ")}`);
    known.add("- Competitions & awards:");
    known.add("- Certifications:");
    for (const item of [...(c.competitions ?? []), ...(c.certifications ?? [])]) known.add(`  - ${item}`);
  }
  const start = txt.indexOf("## Coaches");
  const end = txt.indexOf("## Frequently Asked Questions");
  const section = txt.slice(start, end).split("\n").slice(1);
  for (const line of section.filter((l) => l.trim() !== "")) {
    assert.ok(known.has(line), `unverified line in /llms.txt: ${line}`);
  }
});

test("claims the site never made are absent (these were once in the hand-written file)", () => {
  for (const phrase of [
    "Body Transformation",
    "Muscle Hypertrophy",
    "Classic Physique",
    "German",
    "Class B",
    "Class C",
  ]) {
    assert.ok(!txt.includes(phrase), `"${phrase}" is not stated anywhere on the site`);
  }
});

test("training zones and every amenity photo are listed with the site's own wording", () => {
  for (const zone of ZONES) assert.ok(txt.includes(`- **${zone.name}:** ${zone.description}`));
  const amenities = TOUR_PHOTOS.filter((p) => p.group === "amenities");
  assert.ok(amenities.length >= 6);
  for (const photo of amenities) assert.ok(txt.includes(`- **${photo.label}:** ${photo.alt}`));
  // The facilities the owner wants showcased.
  for (const id of ["parking", "showers", "restrooms-lockers", "comfort-room", "vanity-mirrors"]) {
    assert.ok(TOUR_PHOTOS.find((p) => p.id === id)?.group === "amenities", `${id} should be an amenity`);
  }
  const summary = txt.split("\n").find((l) => l.startsWith("> ")) ?? "";
  for (const phrase of [
    "covered parking",
    "private shower suites",
    "restrooms and lockers",
    "smart comfort rooms",
  ]) {
    assert.ok(summary.includes(phrase), `summary should mention ${phrase}`);
  }
  assert.match(txt, /Covered parking/);
  assert.match(txt, /Private shower suites/);
  assert.match(txt, /Restrooms & lockers/);
  assert.match(txt, /Smart comfort room/);
});

test("training-floor photos are not presented as amenities", () => {
  for (const photo of TOUR_PHOTOS.filter((p) => p.group === "gym")) {
    assert.ok(!txt.includes(`- **${photo.label}:** ${photo.alt}`));
  }
});

test("the FAQ is the page's own questions and answers", () => {
  for (const item of FAQ_TEXT) assert.ok(txt.includes(`- **${item.question}** ${item.plainAnswer}`));
});

test("every gallery photo has a group and the file is plain text with a trailing newline", () => {
  for (const photo of TOUR_PHOTOS) assert.ok(photo.group === "gym" || photo.group === "amenities");
  assert.ok(txt.startsWith("# Gold's Gym Iloilo\n"));
  assert.ok(txt.endsWith("\n") && !txt.endsWith("\n\n"));
  assert.doesNotMatch(txt, /<[a-z]/i);
});
