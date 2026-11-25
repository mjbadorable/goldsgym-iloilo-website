import { test } from "node:test";
import assert from "node:assert/strict";
import { SITE } from "../lib/site.ts";
import { COACHES } from "./coaches.ts";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, PAGE_SEO } from "./seo.ts";

const pages = Object.entries(PAGE_SEO);

test("sub-page titles fit once the brand template is added, with no double pipe or repeated brand", () => {
  for (const [key, page] of pages) {
    const full = `${page.title} | ${SITE.name}`;
    assert.ok(full.length <= MAX_TITLE_LENGTH, `${key}: "${full}" is ${full.length} characters`);
    assert.ok(!page.title.includes("|"), `${key}: title must not contain a pipe`);
    assert.ok(!/gold/i.test(page.title), `${key}: the template already adds the brand`);
  }
});

test("sub-page descriptions stay within the display limit", () => {
  for (const [key, page] of pages) {
    assert.ok(
      page.description.length <= MAX_DESCRIPTION_LENGTH,
      `${key}: description is ${page.description.length} characters`,
    );
  }
});

test("the home description (also the schema.org description) fits too", () => {
  assert.ok(SITE.description.length <= MAX_DESCRIPTION_LENGTH);
});

test("the coaches description names the real coaches and nobody else", () => {
  for (const coach of COACHES) assert.ok(PAGE_SEO.coaches.description.includes(coach.name));
});

test("paths are distinct and absolute", () => {
  const paths = pages.map(([, p]) => p.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const p of paths) assert.ok(p.startsWith("/"));
});
