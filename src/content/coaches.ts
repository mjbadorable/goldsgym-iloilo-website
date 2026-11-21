// Names, role and specialties are verbatim from the Framer site.
// Photo-to-name pairing follows the order on the Framer page. (unconfirmed by face: owner to verify.)

export type Coach = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  image: { src: string; alt: string };
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
  },
];
