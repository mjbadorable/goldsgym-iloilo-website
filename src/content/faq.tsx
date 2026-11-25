import type { ReactNode } from "react";
import { DayPassTextButton } from "@/components/day-pass/day-pass-button";
import { ADDRESS, CONTACT } from "@/lib/site";
import { FAQ_TEXT, type FaqId, type FaqText } from "./faq-text";

// REVIEW WITH THE OWNER BEFORE LAUNCH.
// The Framer site shipped these five questions with no answers. The answers below are drafted
// conservatively: they use only facts the site already states (hours, address, phone, email,
// "convenient parking") and send visitors to the team for anything policy-specific. Nothing here
// states a price, a booking rule, a locker/ID policy or a membership term. Replace with real policy.
// The plain-text wording (structured data, /llms.txt) lives in faq-text.ts; this file adds the links.

export type FaqItem = FaqText & {
  answer: ReactNode;
};

const ANSWERS: Record<FaqId, ReactNode> = {
  book: (
    <>
      You can <DayPassTextButton>contact us here</DayPassTextButton>, send us a quick message, and the team
      will confirm your visit. If you would rather talk first, call or text{" "}
      <a className="link-underline text-gold" href={`tel:${CONTACT.phoneE164}`}>
        {CONTACT.phoneDisplay}
      </a>{" "}
      and we will find a time that suits your schedule.
    </>
  ),
  bring: (
    <>
      Wear what you normally train in: comfortable workout clothes and training shoes. Bring water, and a
      towel if you like having your own. If you are unsure about anything else, message us before you come and
      we will sort it out.
    </>
  ),
  "look-around": (
    <>
      That is a fair thing to want before you commit. You are welcome to visit and see the floor for yourself:
      Free Weights, Gym80 Strength, Cardio Bay and Functional Training. If you want a quick look first,
      message us and we will tell you the best time to drop by.
    </>
  ),
  parking: (
    <>
      Yes. Convenient parking and easy access are part of the visit. We are at {ADDRESS.oneLine}.{" "}
      <a
        className="link-underline text-gold"
        href={ADDRESS.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open directions
        <span className="sr-only"> (opens Google Maps in a new tab)</span>
      </a>{" "}
      or message us if you have a specific parking question.
    </>
  ),
  "after-pass": (
    <>
      After your visit you can ask the team about membership options that fit your schedule and goals. We do
      not publish prices online, so message us at{" "}
      <a className="link-underline text-gold" href={`mailto:${CONTACT.email}`}>
        {CONTACT.email}
      </a>{" "}
      or call{" "}
      <a className="link-underline text-gold" href={`tel:${CONTACT.phoneE164}`}>
        {CONTACT.phoneDisplay}
      </a>{" "}
      for current rates.
    </>
  ),
};

export const FAQ: FaqItem[] = FAQ_TEXT.map((item) => ({ ...item, answer: ANSWERS[item.id] }));
