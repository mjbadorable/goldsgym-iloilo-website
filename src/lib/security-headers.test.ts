import { test } from "node:test";
import assert from "node:assert/strict";
import { VIDEO_ORIGIN, contentSecurityPolicy, securityHeaders } from "./security-headers.ts";

const get = (isDev: boolean, key: string) => securityHeaders(isDev).find((h) => h.key === key)?.value;

test("every baseline security header is present", () => {
  for (const key of [
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Content-Security-Policy-Report-Only",
  ]) {
    assert.ok(get(false, key), `${key} missing`);
  }
  assert.equal(get(false, "X-Content-Type-Options"), "nosniff");
  assert.equal(get(false, "X-Frame-Options"), "DENY");
});

test("the CSP lets the Drive promo video frame load and nothing else frame", () => {
  const csp = contentSecurityPolicy(false);
  assert.ok(csp.includes(`frame-src ${VIDEO_ORIGIN}`));
  assert.ok(csp.includes("frame-ancestors 'none'"));
  assert.ok(csp.includes("object-src 'none'"));
});

test("production CSP has no unsafe-eval or websocket sources; dev does", () => {
  assert.ok(!contentSecurityPolicy(false).includes("'unsafe-eval'"));
  assert.ok(!contentSecurityPolicy(false).includes("ws:"));
  assert.ok(contentSecurityPolicy(true).includes("'unsafe-eval'"));
});

test("Permissions-Policy does not block what the video iframe needs", () => {
  const policy = get(false, "Permissions-Policy") ?? "";
  for (const feature of ["autoplay", "fullscreen", "picture-in-picture"]) {
    assert.ok(!policy.includes(feature), `${feature} must stay delegable to the iframe`);
  }
  assert.ok(policy.includes("camera=()"));
});
