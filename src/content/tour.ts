// Content for the "Watch the gym" dialog. Plain data with no imports so it can be unit-tested.

export type TourPhoto = {
  id: string;
  src: string;
  /** Short name shown as the caption and on the thumbnail's accessible label. */
  label: string;
  alt: string;
  /** CSS object-position for the 16:10 stage. */
  position: string;
};

export const TOUR_PHOTOS: TourPhoto[] = [
  {
    id: "training-floor",
    src: "/images/training-floor.jpg",
    label: "The training floor",
    alt: "Hexagon ceiling lights over dumbbell racks, power racks and benches on the training floor",
    position: "50% 32%",
  },
  {
    id: "heritage-lounge",
    src: "/images/heritage-lounge.jpg",
    label: "The heritage lounge",
    alt: "A leather sofa and chairs by a brick wall, beside a timeline wall of Gold's Gym history",
    position: "50% 50%",
  },
  {
    id: "free-weights",
    src: "/images/free-weights-rack.jpg",
    label: "Free weights",
    alt: "Dumbbell rack in the foreground with colour-coded bumper plates stacked on power racks behind it",
    position: "50% 38%",
  },
  {
    id: "gym80",
    src: "/images/zone-gym80.jpg",
    label: "Gym80 strength",
    alt: "Two hands gripping a 45 lb Gym80 plate in front of strength machines",
    position: "50% 62%",
  },
  {
    id: "cardio",
    src: "/images/zone-cardio.jpg",
    label: "Cardio Bay",
    alt: "Two members running on treadmills in the Cardio Bay",
    position: "50% 55%",
  },
  {
    id: "storefront",
    src: "/images/storefront-sign.jpg",
    label: "The storefront",
    alt: "The glowing Gold's Gym sign above the glass entrance",
    position: "45% 30%",
  },
];

export type Reel = { id: string; url: string };

// Facebook Reels supplied by the gym. Titles are not known (Facebook does not expose them to us),
// so the cards are numbered rather than given invented descriptions.
export const REELS: Reel[] = [
  { id: "reel-1", url: "https://www.facebook.com/reel/1295719865403361" },
  { id: "reel-2", url: "https://www.facebook.com/reel/1030726489032321" },
  { id: "reel-3", url: "https://www.facebook.com/reel/1280569820783478" },
];
