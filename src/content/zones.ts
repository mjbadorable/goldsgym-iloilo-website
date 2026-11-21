// Copy is verbatim from the Framer site. Tags are the movements/equipment named in that copy.
// `image` is optional: Functional Training has no photo on hand yet. Add one to
// public/images and set `image` and the layout picks it up with no other change.

export type Zone = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image?: { src: string; alt: string; position?: string };
};

export const ZONES: Zone[] = [
  {
    id: "free-weights",
    name: "Free Weights",
    description:
      "Train with a dedicated free-weight setup built for the fundamentals: presses, pulls, squats, rows, and everything in between.",
    tags: ["Presses", "Pulls", "Squats", "Rows"],
    image: {
      src: "/images/zone-free-weights.jpg",
      alt: "Dumbbell rack in the foreground with colour-coded bumper plates stacked on power racks behind it",
    },
  },
  {
    id: "gym80-strength",
    name: "Gym80 Strength",
    description:
      "Iloilo’s Gold’s Gym floor features Gym80 strength equipment, giving you machines designed for controlled, focused resistance training.",
    tags: ["Gym80", "Machines", "Controlled resistance"],
    image: {
      src: "/images/zone-gym80.jpg",
      alt: "Two hands gripping a 45 lb Gym80 plate in front of strength machines and the gym's glass front",
    },
  },
  {
    id: "cardio-bay",
    name: "Cardio Bay",
    description:
      "Treadmills, bikes, and cardio stations give you room to build conditioning, whether it’s a warm-up, steady-state work, or pushing your limits.",
    tags: ["Treadmills", "Bikes", "Cardio stations"],
    image: {
      src: "/images/zone-cardio.jpg",
      alt: "Two members running on treadmills in the Cardio Bay",
    },
  },
  {
    id: "functional-training",
    name: "Functional Training",
    description:
      "Open training space for sled work, kettlebells, carries, conditioning drills, and movements that take your training beyond the machines.",
    tags: ["Sled work", "Kettlebells", "Carries", "Conditioning drills"],
  },
];

export type Experience = {
  id: string;
  title: string;
  description: string;
  image: { src: string; alt: string; position?: string };
};

export const EXPERIENCES: Experience[] = [
  {
    id: "facilities",
    title: "Clean & Modern Facilities",
    description:
      "Clean, well-maintained facilities designed to make every visit comfortable from warm-up to cooldown.",
    image: {
      src: "/images/experience-facilities.jpg",
      alt: "Hexagon LED ceiling lights over the main training floor",
    },
  },
  {
    id: "access",
    title: "Parking & Easy Access",
    description:
      "Convenient parking and easy access make it simple to get in, train, and get back on your day.",
    image: {
      src: "/images/experience-access.jpg",
      alt: "The glass front of the gym looking out to the street and trees at Iloilo Business Park",
    },
  },
  {
    id: "equipment",
    title: "Quality Equipment",
    description:
      "From strength equipment to recovery essentials, everything is set up to support your training.",
    image: {
      src: "/images/experience-equipment.jpg",
      alt: "Rows of dumbbells on racks beside an adjustable bench",
    },
  },
];
