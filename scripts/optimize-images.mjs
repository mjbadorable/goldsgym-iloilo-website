// Builds web-sized images in public/images from the Framer originals (assets/framer-originals)
// and the owner-supplied photos (assets/supplied). Sources are never modified.
// Re-run with: npm run images
//
// Provenance: framer-originals were downloaded from framerusercontent.com
// (goldsgymiloilo.framer.website) on 2026-11-21 and keep their original file names.
// assets/supplied holds photos the owner provided later.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { statSync } from "node:fs";

const SRC = "assets/framer-originals";
const SUPPLIED = "assets/supplied";
const OUT = "public/images";

/** @type {Array<{dir?:string,src:string,out:string,width?:number,height?:number,fit?:"cover"|"inside"|"contain",position?:string,background?:string,extract?:{left:number,top:number,width:number,height:number},enhance?:boolean,hd?:boolean,allowUpscale?:boolean,format:"jpeg"|"png",quality?:number}>} */
const jobs = [
  // Brand mark: kept as PNG (has alpha). 4610px original is far larger than any use.
  { src: "hLsPsBg5BFF1IXD5xDZkqRWeg.png", out: "gold-logo.png", width: 640, format: "png" },

  // Home
  { src: "fJGhSlfz15TVzlux2Ntq1zfWM7E.jpg", out: "hero-athlete.jpg", format: "jpeg", quality: 86 },
  { src: "kWyzBUwWXuG4YyfPhft7HzgEc.png", out: "training-floor.jpg", format: "jpeg", quality: 88 },

  // About: training zones
  { src: "6B1Eoxk3Sp9qwh7xHHT2JwhT8.png", out: "zone-gym80.jpg", format: "jpeg", quality: 88 },
  { src: "WWsIHkQC3vDoqhhO4DRQbIeKEg.png", out: "zone-cardio.jpg", format: "jpeg", quality: 88 },

  // Coaches: 4672x7008 originals (about 5.8MB each) resized to 1400px wide. No cropping here;
  // framing is handled in CSS with a top-weighted object-position.
  { src: "kdScBpWX9kvGS3Uuo49VNpymh1Y.jpg", out: "coach-andrew-miano.jpg", width: 1400, format: "jpeg", quality: 82 },
  { src: "trb4D0cl6JeFE3axsGOYFo0Pg48.jpg", out: "coach-vincent-loui-dorde.jpg", width: 1400, format: "jpeg", quality: 82 },
  { src: "7j9EZ9hxHMPnmU2D7aPTHt5B2M.jpg", out: "coach-jerry-perje.jpg", width: 1400, format: "jpeg", quality: 82 },

  // Supplied by the owner (assets/supplied). Sources are 819px wide, so they are only
  // re-encoded (mozjpeg), never upscaled.
  ...[
    "storefront-sign.jpg",
    "free-weights-rack.jpg",
    "heritage-lounge.jpg",
    "incline-press-bw.jpg",
    "yellow-plate-floor.jpg",
    "dumbbell-rack-dark.jpg",
    "golds-mesh-emblem.jpg",
    "parking-lot.jpg",
    "parking-lot-bay.jpg",
    "shower-suites.jpg",
  ].map((file) => ({ dir: SUPPLIED, src: file, out: file, format: "jpeg", quality: 84 })),

  // Coach Andrew featured stage photo: crisp HD upscale + balanced clarity.
  {
    dir: SUPPLIED,
    src: "coach-andrew-stage-featured.jpg",
    out: "coach-andrew-stage-featured.jpg",
    width: 1000,
    allowUpscale: true,
    hd: true,
    format: "jpeg",
    quality: 88,
  },

  // Coach Andrew competition stage photos: subtle editorial clarity, deeper stage blacks,
  // and balanced warm contrast (untouched originals remain in assets/supplied/).
  ...[
    "coach-andrew-ifbb-2025.jpg",
    "coach-andrew-iloilo-stage.jpg",
    "coach-andrew-iloilo-award-1.jpg",
    "coach-andrew-iloilo-award-2.jpg",
  ].map((file) => ({ dir: SUPPLIED, src: file, out: file, enhance: true, format: "jpeg", quality: 86 })),

  // Coach Vincent pro stage photos (already crisp; mozjpeg optimize only).
  ...[
    "coach-vincent-agp-2026-1.jpg",
    "coach-vincent-agp-2026-2.jpg",
  ].map((file) => ({ dir: SUPPLIED, src: file, out: file, format: "jpeg", quality: 86 })),

  // Coach Jerry KG Classic champion photo: HD upscale + crisp detail sharpening (never cropped).
  {
    dir: SUPPLIED,
    src: "coach-jerry-kg-classic-2023.jpg",
    out: "coach-jerry-kg-classic-2023.jpg",
    width: 1600,
    allowUpscale: true,
    hd: true,
    format: "jpeg",
    quality: 90,
  },

  // Coach Jerry competition stage photos: balanced contrast and subtle clarity for stage haze.
  ...[
    "coach-jerry-agp-2026-1.jpg",
    "coach-jerry-agp-2026-2.jpg",
  ].map((file) => ({ dir: SUPPLIED, src: file, out: file, enhance: true, format: "jpeg", quality: 86 })),

  // Owner-supplied 1376x768 atmospheric photo for the /coaches header. It sits behind a scrim at 50%
  // opacity, so a lower JPEG quality is invisible; the original was 712 KB.
  { dir: SUPPLIED, src: "coaches-backdrop.jpg", out: "coaches-backdrop.jpg", format: "jpeg", quality: 74 },

  // Social share card: owner-supplied hero banner fitted cleanly into 1200x630 with zero text crop.
  {
    dir: SUPPLIED,
    src: "og-share-hero.jpg",
    out: "og-share.jpg",
    width: 1200,
    height: 630,
    fit: "contain",
    background: "#070708",
    allowUpscale: true,
    format: "jpeg",
    quality: 90,
  },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  let img = sharp(`${job.dir ?? SRC}/${job.src}`).rotate();
  if (job.extract) img = img.extract(job.extract);
  if (job.width || job.height) {
    img = img.resize({
      width: job.width,
      height: job.height,
      fit: job.fit ?? "inside",
      position: job.position,
      background: job.background,
      kernel: "lanczos3",
      withoutEnlargement: !job.allowUpscale,
    });
  }
  if (job.enhance) {
    img = img
      .linear(1.06, -8)
      .modulate({ brightness: 1.0, saturation: 1.08 })
      .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.9 });
  }
  if (job.hd) {
    img = img
      .linear(1.04, -4)
      .modulate({ brightness: 1.01, saturation: 1.04 })
      .sharpen({ sigma: 1.0, m1: 0.6, m2: 1.35 });
  }
  img =
    job.format === "png"
      ? img.png({ compressionLevel: 9, palette: false })
      : img.jpeg({ quality: job.quality ?? 85, mozjpeg: true });
  const info = await img.toFile(`${OUT}/${job.out}`);
  const kb = Math.round(statSync(`${OUT}/${job.out}`).size / 1024);
  console.log(`${job.out.padEnd(32)} ${info.width}x${info.height}  ${kb} KB`);
}
