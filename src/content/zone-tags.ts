// Short movement keywords shown at the foot of each training-zone card. Every tag is a word or phrase
// that already appears in that zone's own description in zones.ts (checked by zone-tags.test.ts), so
// nothing here is a new claim. Plain data with no imports so it can be unit-tested.

export const ZONE_TAGS: Record<string, readonly string[]> = {
  "free-weights": ["Presses", "Pulls", "Squats", "Rows"],
  "gym80-strength": ["Gym80", "Machines", "Resistance training"],
  "cardio-bay": ["Treadmills", "Bikes", "Cardio stations"],
  "functional-training": ["Sled work", "Kettlebells", "Carries"],
};
