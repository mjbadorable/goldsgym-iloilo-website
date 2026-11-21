import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { ADDRESS, CONTACT } from "../lib/site.ts";
import { COACHES } from "./coaches.ts";
import { REVIEWS } from "./reviews.ts";
import { REELS, TOUR_PHOTOS } from "./tour.ts";
import { EXPERIENCES, ZONES } from "./zones.ts";

test("real address and contact details are unchanged", () => {
  assert.equal(
    ADDRESS.oneLine,
    "Saint Honore, G/F – Unit A-1A-5, Iloilo Business Park, Mandurriao, Iloilo",
  );
  assert.equal(CONTACT.phoneDisplay, "0917 327 5902");
  assert.equal(CONTACT.phoneE164, "+639173275902");
  assert.equal(CONTACT.email, "goldsgymiloilo.management@gmail.com");
});

test("no wrong-location copy anywhere in site data", () => {
  const everything = JSON.stringify({ ADDRESS, CONTACT, ZONES, EXPERIENCES, COACHES, REVIEWS, TOUR_PHOTOS });
  assert.doesNotMatch(everything, /SM City/i);
});

test("the three supplied Facebook Reels are present, in order, and safe to link", () => {
  assert.deepEqual(
    REELS.map((r) => r.url),
    [
      "https://www.facebook.com/reel/1295719865403361",
      "https://www.facebook.com/reel/1030726489032321",
      "https://www.facebook.com/reel/1280569820783478",
    ],
  );
  for (const reel of REELS) assert.match(reel.url, /^https:\/\/www\.facebook\.com\/reel\/\d+$/);
});

test("every image referenced by content exists in public/", () => {
  const refs = [
    ...ZONES.map((z) => z.image.src),
    ...EXPERIENCES.map((e) => e.image.src),
    ...COACHES.map((c) => c.image.src),
    ...TOUR_PHOTOS.map((p) => p.src),
  ];
  assert.ok(refs.length >= 16);
  for (const src of refs) assert.ok(existsSync(`public${src}`), `missing image: public${src}`);
});

test("all four zones and three experiences have a photo, an icon and alt text", () => {
  assert.deepEqual(
    ZONES.map((z) => z.name),
    ["Free Weights", "Gym80 Strength", "Cardio Bay", "Functional Training"],
  );
  assert.deepEqual(
    EXPERIENCES.map((e) => e.title),
    ["Clean & Modern Facilities", "Parking & Easy Access", "Quality Equipment"],
  );
  for (const item of [...ZONES, ...EXPERIENCES]) {
    assert.ok(item.icon, `${item.id} has no icon`);
    assert.ok(item.image.alt.length > 10, `${item.id} has weak alt text`);
  }
});

test("reviews are the three verified Google reviews", () => {
  assert.deepEqual(
    REVIEWS.map((r) => r.author),
    ["Adrian Zakrzewski", "Penny Soliguen", "Earl Sicad"],
  );
  assert.ok(REVIEWS.every((r) => r.source === "Google Review"));
});
