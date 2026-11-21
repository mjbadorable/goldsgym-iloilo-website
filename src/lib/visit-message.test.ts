import { test } from "node:test";
import assert from "node:assert/strict";
import { MAX_NAME_LENGTH, buildVisitMessage, mailtoHref, smsHref } from "./visit-message.ts";

const SITE_NAME = "Gold's Gym Iloilo";
const date = { year: 2026, month: 10, day: 23 };

test("message with no name and no date is just the greeting", () => {
  assert.equal(
    buildVisitMessage({ siteName: SITE_NAME, name: "", date: null }),
    "Hi Gold's Gym Iloilo, I'd like to claim a free day pass.",
  );
});

test("message includes the name and date on their own lines", () => {
  assert.equal(
    buildVisitMessage({ siteName: SITE_NAME, name: "  Juan dela Cruz ", date }),
    "Hi Gold's Gym Iloilo, I'd like to claim a free day pass.\nName: Juan dela Cruz\nPreferred date: Mon, Nov 23, 2026",
  );
});

test("a whitespace-only name is left out", () => {
  const msg = buildVisitMessage({ siteName: SITE_NAME, name: "   ", date });
  assert.ok(!msg.includes("Name:"));
  assert.ok(msg.includes("Preferred date: Mon, Nov 23, 2026"));
});

test("a very long name is capped", () => {
  const msg = buildVisitMessage({ siteName: SITE_NAME, name: "A".repeat(200), date: null });
  assert.equal(msg.split("\n")[1], `Name: ${"A".repeat(MAX_NAME_LENGTH)}`);
});

test("sms link keeps the ?&body= form and round-trips awkward characters", () => {
  const message = buildVisitMessage({ siteName: SITE_NAME, name: 'Ann & Bob #1 100% "pro"?', date });
  const href = smsHref("+639173275902", message);
  assert.ok(href.startsWith("sms:+639173275902?&body="));
  // Nothing that would end the query early or break the URI is left raw.
  const body = href.slice("sms:+639173275902?&body=".length);
  assert.ok(!/[&#?" \n]/.test(body));
  assert.equal(decodeURIComponent(body), message);
});

test("mailto link encodes subject and body separately", () => {
  const message = buildVisitMessage({ siteName: SITE_NAME, name: "Ann & Bob", date });
  const href = mailtoHref("team@example.com", "Free day pass request", message);
  assert.ok(href.startsWith("mailto:team@example.com?subject=Free%20day%20pass%20request&body="));
  const url = new URL(href);
  assert.equal(url.searchParams.get("subject"), "Free day pass request");
  assert.equal(url.searchParams.get("body"), message);
});
