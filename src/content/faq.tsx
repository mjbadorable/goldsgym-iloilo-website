import { DayPassTextButton } from "@/components/day-pass/day-pass-button";
import { ADDRESS, CONTACT } from "@/lib/site";

// REVIEW WITH THE OWNER BEFORE LAUNCH.
// The Framer site shipped these five questions with no answers. The answers below are drafted
// conservatively: they use only facts the site already states (hours, address, phone, email,
// "convenient parking") and send visitors to the team for anything policy-specific. Nothing here
// states a price, a booking rule, a locker/ID policy or a membership term. Replace with real policy.

export type FaqItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
  /** Plain-text version of the answer for FAQPage structured data. */
  plainAnswer: string;
};

export const FAQ: FaqItem[] = [
  {
    id: "book",
    question: "Do I need to book?",
    answer: (
      <>
        You can <DayPassTextButton>contact us here</DayPassTextButton>, send us a quick message, and the team
        will confirm your visit. If you would rather talk first, call or text{" "}
        <a className="link-underline text-gold" href={`tel:${CONTACT.phoneE164}`}>
          {CONTACT.phoneDisplay}
        </a>{" "}
        and we will find a time that suits your schedule.
      </>
    ),
    plainAnswer: `You can contact us on our website, send us a quick message, and the team will confirm your visit. If you would rather talk first, call or text ${CONTACT.phoneDisplay} and we will find a time that suits your schedule.`,
  },
  {
    id: "bring",
    question: "What should I bring?",
    answer: (
      <>
        Wear what you normally train in: comfortable workout clothes and training shoes. Bring water, and a
        towel if you like having your own. If you are unsure about anything else, message us before you come
        and we will sort it out.
      </>
    ),
    plainAnswer:
      "Wear what you normally train in: comfortable workout clothes and training shoes. Bring water, and a towel if you like having your own. If you are unsure about anything else, message us before you come and we will sort it out.",
  },
  {
    id: "look-around",
    question: "Can I just look around?",
    answer: (
      <>
        That is a fair thing to want before you commit. You are welcome to visit and see the floor for
        yourself: Free Weights, Gym80 Strength, Cardio Bay and Functional Training. If you want a quick look
        first, message us and we will tell you the best time to drop by.
      </>
    ),
    plainAnswer:
      "That is a fair thing to want before you commit. You are welcome to visit and see the floor for yourself: Free Weights, Gym80 Strength, Cardio Bay and Functional Training. If you want a quick look first, message us and we will tell you the best time to drop by.",
  },
  {
    id: "parking",
    question: "Is there parking?",
    answer: (
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
    plainAnswer: `Yes. Convenient parking and easy access are part of the visit. We are at ${ADDRESS.oneLine}. Message us if you have a specific parking question.`,
  },
  {
    id: "after-pass",
    question: "What happens after my first visit?",
    answer: (
      <>
        After your visit you can ask the team about membership options that fit your schedule and goals. We
        do not publish prices online, so message us at{" "}
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
    plainAnswer: `After your visit you can ask the team about membership options that fit your schedule and goals. We do not publish prices online, so message us at ${CONTACT.email} or call ${CONTACT.phoneDisplay} for current rates.`,
  },
];
