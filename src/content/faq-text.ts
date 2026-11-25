// Plain-text FAQ: questions and answers as strings, with no JSX and no component imports. It feeds the
// FAQPage structured data and /llms.txt, and it can be unit-tested. `faq.tsx` pairs each id with the
// rich (linked) version of the same answer, so the wording lives here once.
import { ADDRESS, CONTACT } from "../lib/site.ts";

export type FaqText = {
  id: string;
  question: string;
  /** Plain-text version of the answer for FAQPage structured data and /llms.txt. */
  plainAnswer: string;
};

export const FAQ_TEXT = [
  {
    id: "book",
    question: "Do I need to book?",
    plainAnswer: `You can contact us on our website, send us a quick message, and the team will confirm your visit. If you would rather talk first, call or text ${CONTACT.phoneDisplay} and we will find a time that suits your schedule.`,
  },
  {
    id: "bring",
    question: "What should I bring?",
    plainAnswer:
      "Wear what you normally train in: comfortable workout clothes and training shoes. Bring water, and a towel if you like having your own. If you are unsure about anything else, message us before you come and we will sort it out.",
  },
  {
    id: "look-around",
    question: "Can I just look around?",
    plainAnswer:
      "That is a fair thing to want before you commit. You are welcome to visit and see the floor for yourself: Free Weights, Gym80 Strength, Cardio Bay and Functional Training. If you want a quick look first, message us and we will tell you the best time to drop by.",
  },
  {
    id: "parking",
    question: "Is there parking?",
    plainAnswer: `Yes. Convenient parking and easy access are part of the visit. We are at ${ADDRESS.oneLine}. Message us if you have a specific parking question.`,
  },
  {
    id: "after-pass",
    question: "What happens after my first visit?",
    plainAnswer: `After your visit you can ask the team about membership options that fit your schedule and goals. We do not publish prices online, so message us at ${CONTACT.email} or call ${CONTACT.phoneDisplay} for current rates.`,
  },
] as const satisfies readonly FaqText[];

export type FaqId = (typeof FAQ_TEXT)[number]["id"];
