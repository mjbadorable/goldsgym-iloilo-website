import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { OG_IMAGE, pageMetadata } from "./page-metadata.ts";

test("a sub-page gets its own title, description and URL in the share card", () => {
  const m = pageMetadata({ title: "Coaches", description: "Meet the coaches.", path: "/coaches" });
  assert.equal(m.title, "Coaches");
  assert.equal(m.alternates?.canonical, "/coaches");
  const og = m.openGraph as { title: string; description: string; url: string; images: unknown[] };
  assert.equal(og.title, "Coaches | Gold's Gym Iloilo");
  assert.equal(og.description, "Meet the coaches.");
  assert.equal(og.url, "/coaches");
  assert.equal(og.images.length, 1);
  assert.equal((m.twitter as { title: string }).title, og.title);
});

test("the home page keeps the layout's default title but still gets og:url", () => {
  const m = pageMetadata({ description: "Home.", path: "/" });
  assert.equal("title" in m, false);
  assert.equal((m.openGraph as { url: string }).url, "/");
});

test("the share image exists on disk", () => {
  assert.ok(existsSync(`public${OG_IMAGE.url}`));
});
