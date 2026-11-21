import { test } from "node:test";
import assert from "node:assert/strict";
import { ZONE_TAGS } from "./zone-tags.ts";
import { ZONES } from "./zones.ts";

test("every zone has tags and every tag comes from that zone's own copy", () => {
  for (const zone of ZONES) {
    const tags = ZONE_TAGS[zone.id];
    assert.ok(tags && tags.length >= 3, `${zone.id} needs at least 3 tags`);
    const copy = `${zone.name} ${zone.description}`.toLowerCase();
    for (const tag of tags) {
      assert.ok(copy.includes(tag.toLowerCase()), `"${tag}" is not in the ${zone.id} copy`);
    }
  }
});

test("no tags exist for zones that do not exist", () => {
  assert.deepEqual(Object.keys(ZONE_TAGS).sort(), ZONES.map((z) => z.id).sort());
});
