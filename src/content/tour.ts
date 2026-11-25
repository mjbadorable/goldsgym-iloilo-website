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
    id: "storefront",
    src: "/images/storefront-sign.jpg",
    label: "The entrance",
    alt: "The glowing Gold's Gym sign above the glass entrance",
    position: "45% 30%",
  },
  {
    id: "heritage-lounge",
    src: "/images/heritage-lounge.jpg",
    label: "The heritage lounge",
    alt: "A leather sofa and chairs by a brick wall, beside a timeline wall of Gold's Gym history",
    position: "50% 50%",
  },
  {
    id: "training-floor",
    src: "/images/training-floor.jpg",
    label: "The training floor",
    alt: "Hexagon ceiling lights over dumbbell racks, power racks and benches on the training floor",
    position: "50% 32%",
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
    id: "parking",
    src: "/images/parking-lot-bay.jpg",
    label: "Covered parking",
    alt: "Covered parking bay with car and motorcycle slots at Gold's Gym Iloilo",
    position: "50% 62%",
  },
  {
    id: "showers",
    src: "/images/shower-suites.jpg",
    label: "Private shower suites",
    alt: "Row of three marble-tiled private frosted-glass rain shower suites at Gold's Gym Iloilo",
    position: "50% 50%",
  },
];

// The gym's promotional video: a portrait (9:16) file hosted on the owner's Google Drive.
// `previewUrl` is the embeddable player (it is only mounted while the Watch dialog is open, so
// Google is not contacted on page load). `shareUrl` is the plain Drive page, used as a fallback link.
export const PROMO_VIDEO = {
  title: "Gold's Gym Iloilo Promotional Video",
  previewUrl: "https://drive.google.com/file/d/1ODQmIN1EYtLAtDI8moIGlnFPxrCacpXQ/preview",
  shareUrl: "https://drive.google.com/file/d/1ODQmIN1EYtLAtDI8moIGlnFPxrCacpXQ/view?usp=sharing",
} as const;
