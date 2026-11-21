// Verified 5-star Google reviews, quoted exactly as shown on the Framer site (trailing space trimmed).

export type Review = {
  id: string;
  author: string;
  quote: string;
  source: "Google Review";
};

export const REVIEWS: Review[] = [
  {
    id: "penny-soliguen",
    author: "Penny Soliguen",
    quote: "It’s like my 2nd home already.",
    source: "Google Review",
  },
  {
    id: "adrian-zakrzewski",
    author: "Adrian Zakrzewski",
    quote: "Everything is top notch here. Quality and well-maintained equipment.",
    source: "Google Review",
  },
  {
    id: "earl-sicad",
    author: "Earl Sicad",
    quote: "This gym is undeniably one of the cleanest and best fitness facilities I have seen in Iloilo.",
    source: "Google Review",
  },
];
