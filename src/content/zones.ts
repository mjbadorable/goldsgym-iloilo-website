// Copy is verbatim from the Framer site. Every zone has a real photo.
// `icon` names a glyph in components/ui/zone-icons.tsx (kept out of this file so it stays plain data).

export type IconName = "dumbbell" | "plate" | "pulse" | "kettlebell" | "sparkle" | "car" | "users" | "shield";

export type Zone = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  image: { src: string; alt: string; position: string };
};

export const ZONES: Zone[] = [
  {
    id: "free-weights",
    name: "Free Weights",
    description:
      "Train with a dedicated free-weight setup built for the fundamentals: presses, pulls, squats, rows, and everything in between.",
    icon: "dumbbell",
    image: {
      src: "/images/free-weights-rack.jpg",
      alt: "Dumbbell rack in the foreground with colour-coded bumper plates stacked on power racks behind it",
      position: "50% 35%",
    },
  },
  {
    id: "gym80-strength",
    name: "Gym80 Strength",
    description:
      "Iloilo\u2019s Gold\u2019s Gym floor features Gym80 strength equipment, giving you machines designed for controlled, focused resistance training.",
    icon: "plate",
    image: {
      src: "/images/zone-gym80.jpg",
      alt: "Two hands gripping a 45 lb Gym80 plate in front of strength machines and the gym's glass front",
      position: "50% 62%",
    },
  },
  {
    id: "cardio-bay",
    name: "Cardio Bay",
    description:
      "Treadmills, bikes, and cardio stations give you room to build conditioning, whether it\u2019s a warm-up, steady-state work, or pushing your limits.",
    icon: "pulse",
    image: {
      src: "/images/zone-cardio.jpg",
      alt: "Two members running on treadmills in the Cardio Bay",
      position: "50% 55%",
    },
  },
  {
    id: "functional-training",
    name: "Functional Training",
    description:
      "Open training space for sled work, kettlebells, carries, conditioning drills, and movements that take your training beyond the machines.",
    icon: "kettlebell",
    image: {
      src: "/images/yellow-plate-floor.jpg",
      alt: "A yellow 35 lb Gym80 bumper plate lying on the black rubber floor",
      position: "50% 48%",
    },
  },
];

export type Experience = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  image: { src: string; alt: string; position: string };
};

export const EXPERIENCES: Experience[] = [
  {
    id: "facilities",
    title: "Clean & Modern Facilities",
    description:
      "Clean, well-maintained facilities designed to make every visit comfortable from warm-up to cooldown.",
    icon: "sparkle",
    image: {
      src: "/images/heritage-lounge.jpg",
      alt: "The heritage lounge: a leather sofa and chairs by a brick wall and a timeline wall of Gold's Gym history",
      position: "50% 50%",
    },
  },
  {
    id: "access",
    title: "Parking & Easy Access",
    description:
      "Convenient parking and easy access make it simple to get in, train, and get back on your day.",
    icon: "car",
    image: {
      src: "/images/storefront-sign.jpg",
      alt: "The glowing Gold's Gym sign above the glass entrance",
      position: "45% 28%",
    },
  },
  {
    id: "equipment",
    title: "Quality Equipment",
    description:
      "From strength equipment to recovery essentials, everything is set up to support your training.",
    icon: "dumbbell",
    image: {
      src: "/images/dumbbell-rack-dark.jpg",
      alt: "Gym80 dumbbells racked beside a brick wall",
      position: "50% 40%",
    },
  },
];
