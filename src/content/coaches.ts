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

export type CoachGalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  position?: string;
};

export type Coach = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  image: { src: string; alt: string };
  /** True once the owner/coach has supplied real bio, awards and certifications. */
  verified?: boolean;
  /** About & coaching approach. */
  bio: string;
  /** Experience summary. */
  experience: string;
  /** Specializations & what this coach works on with members. */
  coachingFocus: string[];
  /** Verified competition placements and appearances. */
  competitions?: string[];
  /** Verified certifications. */
  certifications?: string[];
  /** Competition or coaching photos shown in the modal photo switcher. */
  gallery?: CoachGalleryPhoto[];
  /** Fallback highlights for coaches whose full credentials are still pending. */
  achievements: string[];
};

export const COACHES: Coach[] = [
  {
    id: "andrew-miano",
    name: "Andrew Miano",
    role: "Fitness Coach",
    specialties: ["Strength & Conditioning", "Competition Prep", "Weight Loss / Toning", "Boxing & Circuit"],
    verified: true,
    image: {
      src: "/images/coach-andrew-miano.jpg",
      alt: "Coach Andrew Miano, wearing glasses and a Gold's Gym shirt, arms crossed on the training floor",
    },
    bio: "Andrew is a competitive Men’s Physique athlete and certified fitness coach at Gold’s Gym Iloilo. He combines structured strength training, conditioning, and stage-tested discipline to build personalized programs—whether your goal is fat loss and toning, boxing and circuit conditioning, or stepping onto a competition stage.",
    experience:
      "Competitive Men’s Physique athlete and 1-on-1 Fitness Coach at Gold’s Gym Iloilo specializing in personalized workout programming, physique conditioning, and supplement guidance.",
    coachingFocus: [
      "Strength Training",
      "Conditioning",
      "Competition Prep",
      "Weight Loss / Toning",
      "Supplement Guide",
      "1-on-1 Training",
      "Boxing & Circuit",
      "Personalized Workout Program",
    ],
    competitions: [
      "1st — Novice Category, Mr. Iloilo Men’s Physique 2023",
      "2nd — Open Category, Mr. Iloilo Men’s Physique 2023",
      "IFBB Philippines Bodybuilding Open Category — Men’s Physique 2025",
    ],
    certifications: [
      "Red Cross First Aider Certificate",
      "Batang Hipe Certificate",
      "IFA Academy Certificate",
    ],
    gallery: [
      {
        src: "/images/coach-andrew-ifbb-2025.jpg",
        alt: "Coach Andrew Miano posing on stage at IFBB Philippines Boracay Men's Physique Open 2025",
        caption: "IFBB Philippines 2025 · Men’s Physique Open",
        position: "50% 25%",
      },
      {
        src: "/images/coach-andrew-iloilo-stage.jpg",
        alt: "Coach Andrew Miano posing on stage at Mr. Iloilo Men's Physique 2023",
        caption: "Mr. Iloilo 2023 · Stage Presentation",
        position: "48% 28%",
      },
      {
        src: "/images/coach-andrew-iloilo-award-2.jpg",
        alt: "Coach Andrew Miano receiving his certificate on stage at Mr. Iloilo 2023",
        caption: "Mr. Iloilo 2023 · Men’s Physique Award",
        position: "50% 22%",
      },
      {
        src: "/images/coach-andrew-iloilo-award-1.jpg",
        alt: "Coach Andrew Miano awarded medal and certificate at Mr. Iloilo 2023",
        caption: "Mr. Iloilo 2023 · Podium Ceremony",
        position: "50% 22%",
      },
    ],
    achievements: [
      "1st — Novice Category, Mr. Iloilo Men’s Physique 2023",
      "2nd — Open Category, Mr. Iloilo Men’s Physique 2023",
      "IFBB Philippines Bodybuilding Open Category — Men’s Physique 2025",
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
