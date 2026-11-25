// Search-result copy for the sub-pages. Plain data so a test can hold it to Google's display limits:
// the layout template appends " | Gold's Gym Iloilo" to every title, so a title here must not repeat the
// brand or add a second pipe, and a description must stay short enough not to be cut off.

export const PAGE_SEO = {
  about: {
    path: "/why-gold-s-gym",
    title: "Training Zones & Equipment in Iloilo",
    description:
      "Four dedicated training zones at Iloilo Business Park: Free Weights, Gym80 Strength, Cardio Bay and Functional Training, plus clean facilities and parking.",
  },
  coaches: {
    path: "/coaches",
    title: "Personal Trainers in Iloilo",
    description:
      "Train with fitness coaches Andrew Miano, Vincent Loui Dorde and Jerry Perje: strength, conditioning, weight loss, nutrition planning and competition prep.",
  },
  reviews: {
    path: "/reviews-faq",
    title: "Gym Reviews & FAQ in Iloilo",
    description:
      "Read five-star Google reviews of Gold's Gym Iloilo and get first-visit answers: scheduling a visit, parking at Iloilo Business Park and what to bring.",
  },
} as const;

/** Google shows roughly 60 characters of a title and 155 of a description. */
export const MAX_TITLE_LENGTH = 60;
export const MAX_DESCRIPTION_LENGTH = 155;
