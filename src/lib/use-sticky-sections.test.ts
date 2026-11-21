import { test } from "node:test";
import assert from "node:assert/strict";
import { pickActiveSection } from "./use-sticky-sections.ts";

const sections = [
  { id: "a", top: 100, bottom: 600 },
  { id: "b", top: 600, bottom: 1100 },
];

test("nothing is pinned while the first section is still below the threshold", () => {
  assert.equal(pickActiveSection(sections, 73), null);
});

test("the first section is pinned once its top reaches the threshold", () => {
  assert.equal(pickActiveSection([{ id: "a", top: 73, bottom: 573 }, { id: "b", top: 573, bottom: 1073 }], 73), "a");
});

test("the next section takes over as it reaches the threshold (the last one wins)", () => {
  const scrolled = [
    { id: "a", top: -400, bottom: 72 },
    { id: "b", top: 72, bottom: 572 },
  ];
  assert.equal(pickActiveSection(scrolled, 73), "b");
});

test("a section that has fully scrolled past is not pinned", () => {
  assert.equal(pickActiveSection([{ id: "a", top: -900, bottom: 20 }], 73), null);
});

test("works with a drawer threshold of 0", () => {
  assert.equal(pickActiveSection([{ id: "gallery", top: -10, bottom: 500 }, { id: "video", top: 500, bottom: 1200 }], 1), "gallery");
  assert.equal(pickActiveSection([{ id: "gallery", top: -600, bottom: 0 }, { id: "video", top: 0, bottom: 700 }], 1), "video");
});

test("at the end of the scroller the last visible section counts, even if it never reached the threshold", () => {
  const short = [
    { id: "gallery", top: -400, bottom: 400 },
    { id: "video", top: 400, bottom: 1000 },
  ];
  assert.equal(pickActiveSection(short, 1), "gallery");
  assert.equal(pickActiveSection(short, 1, true), "video");
});

test("at the end, a section that already scrolled out of view is not picked", () => {
  assert.equal(pickActiveSection([{ id: "a", top: -900, bottom: -100 }], 73, true), null);
});

test("no sections means nothing is pinned", () => {
  assert.equal(pickActiveSection([], 73), null);
});
