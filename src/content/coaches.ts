// Names, role, specialties and photos are verbatim from the Framer site.
// Photo-to-name pairing follows the order on the Framer page. (unconfirmed by face: owner to verify.)
//
// REVIEW WITH OWNER & COACHES BEFORE LAUNCH
// `bio`, `experience`, `coachingFocus` and `achievements` are DRAFTS. The gym has not supplied
// personal bios, years of experience, certifications or competition records, so every line below is
// written only from what is already public: each coach's role (Fitness Coach at Gold's Gym Iloilo)
// and their three listed specialties. Nothing here claims a number of years, a certification, a
// title or a competition result. When real details arrive, replace the text; keep the same shape.
// A test (content.test.ts) fails if a draft line starts to sound like an unverified credential.

export type Coach = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  image: { src: string; alt: string };
  /** About & coaching approach. REVIEW WITH OWNER & COACHES BEFORE LAUNCH. */
  bio: string;
  /** Experience summary, grounded in role only. REVIEW WITH OWNER & COACHES BEFORE LAUNCH. */
  experience: string;
  /** What this coach works on with members. REVIEW WITH OWNER & COACHES BEFORE LAUNCH. */
  coachingFocus: string[];
  /** Highlights. No awards or records are claimed until supplied. REVIEW WITH OWNER & COACHES BEFORE LAUNCH. */
  achievements: string[];
};

export const COACHES: Coach[] = [
  {
    id: "andrew-miano",
    name: "Andrew Miano",
    role: "Fitness Coach",
    specialties: ["Strength", "Technique", "Programming"],
    image: {
      src: "/images/coach-andrew-miano.jpg",
      alt: "Coach Andrew Miano, wearing glasses and a Gold's Gym shirt, arms crossed on the training floor",
    },
    // REVIEW WITH OWNER & COACHES BEFORE LAUNCH
    bio: "Andrew is one of the fitness coaches at Gold’s Gym Iloilo. His areas are strength, technique and programming: learning the lifts properly first, then building a plan around what you want to achieve.",
    experience: "Fitness Coach at Gold’s Gym Iloilo, coaching in strength, technique and programming.",
    coachingFocus: ["Strength fundamentals", "Lifting technique", "Programming around your goals"],
    achievements: [
      "Fitness Coach at Gold’s Gym Iloilo",
      "Specialties: strength, technique and programming",
    ],
  },
  {
    id: "vincent-loui-dorde",
    name: "Vincent Loui Dorde",
    role: "Fitness Coach",
    specialties: ["Strength", "Form", "Progression"],
    image: {
      src: "/images/coach-vincent-loui-dorde.jpg",
      alt: "Coach Vincent Loui Dorde in a Gold's Gym shirt, arms crossed, with the gym's hexagon lights overhead",
    },
    // REVIEW WITH OWNER & COACHES BEFORE LAUNCH
    bio: "Vincent is one of the fitness coaches at Gold’s Gym Iloilo. He works on strength, form and progression: getting each movement right, then adding load and difficulty at a pace that keeps you improving.",
    experience: "Fitness Coach at Gold’s Gym Iloilo, coaching in strength, form and progression.",
    coachingFocus: ["Strength building", "Movement form", "Steady progression"],
    achievements: [
      "Fitness Coach at Gold’s Gym Iloilo",
      "Specialties: strength, form and progression",
    ],
  },
  {
    id: "jerry-perje",
    name: "Jerry Perje",
    role: "Fitness Coach",
    specialties: ["Conditioning", "Movement", "Accountability"],
    image: {
      src: "/images/coach-jerry-perje.jpg",
      alt: "Coach Jerry Perje smiling, wearing glasses and a Gold's Gym coach shirt",
    },
    // REVIEW WITH OWNER & COACHES BEFORE LAUNCH
    bio: "Jerry is one of the fitness coaches at Gold’s Gym Iloilo. He works on conditioning, movement and accountability: building fitness that carries over, moving well, and having someone to keep you on track.",
    experience: "Fitness Coach at Gold’s Gym Iloilo, coaching in conditioning, movement and accountability.",
    coachingFocus: ["Conditioning", "Quality of movement", "Staying accountable"],
    achievements: [
      "Fitness Coach at Gold’s Gym Iloilo",
      "Specialties: conditioning, movement and accountability",
    ],
  },
];
