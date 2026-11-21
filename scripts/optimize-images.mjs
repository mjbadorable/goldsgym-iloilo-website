// Builds web-sized images in public/images from the untouched Framer originals
// in assets/framer-originals. Re-run with: npm run images
//
// Provenance: every source file was downloaded from framerusercontent.com
// (goldsgymiloilo.framer.website) on 2026-11-21 and keeps its original file name.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { statSync } from "node:fs";

const SRC = "assets/framer-originals";
const OUT = "public/images";

/** @type {Array<{src:string,out:string,width?:number,height?:number,fit?:"cover"|"inside",position?:string,extract?:{left:number,top:number,width:number,height:number},format:"jpeg"|"png",quality?:number}>} */
const jobs = [
  // Brand mark: kept as PNG (has alpha). 4610px original is far larger than any use.
  { src: "hLsPsBg5BFF1IXD5xDZkqRWeg.png", out: "gold-logo.png", width: 640, format: "png" },

  // Home
  { src: "fJGhSlfz15TVzlux2Ntq1zfWM7E.jpg", out: "hero-athlete.jpg", format: "jpeg", quality: 86 },
  { src: "kWyzBUwWXuG4YyfPhft7HzgEc.png", out: "training-floor.jpg", format: "jpeg", quality: 88 },

  // About: training zones
  { src: "p3WPM0Gj2k9eqBwW9KqP6rybgik.png", out: "zone-free-weights.jpg", format: "jpeg", quality: 88 },
  { src: "6B1Eoxk3Sp9qwh7xHHT2JwhT8.png", out: "zone-gym80.jpg", format: "jpeg", quality: 88 },
  { src: "WWsIHkQC3vDoqhhO4DRQbIeKEg.png", out: "zone-cardio.jpg", format: "jpeg", quality: 88 },

  // Coaches: 4672x7008 originals (about 5.8MB each) resized to 1400px wide. No cropping here;
  // framing is handled in CSS with a top-weighted object-position.
  { src: "kdScBpWX9kvGS3Uuo49VNpymh1Y.jpg", out: "coach-andrew-miano.jpg", width: 1400, format: "jpeg", quality: 82 },
  { src: "trb4D0cl6JeFE3axsGOYFo0Pg48.jpg", out: "coach-vincent-loui-dorde.jpg", width: 1400, format: "jpeg", quality: 82 },
  { src: "7j9EZ9hxHMPnmU2D7aPTHt5B2M.jpg", out: "coach-jerry-perje.jpg", width: 1400, format: "jpeg", quality: 82 },

  // About > The Gym Experience: real crops (no new imagery) so each card gets its own picture.
  // Coordinates are in the 1080x1350 source space.
  {
    src: "kWyzBUwWXuG4YyfPhft7HzgEc.png",
    out: "experience-facilities.jpg",
    extract: { left: 280, top: 90, width: 700, height: 560 },
    format: "jpeg",
    quality: 88,
  },
  {
    src: "6B1Eoxk3Sp9qwh7xHHT2JwhT8.png",
    out: "experience-access.jpg",
    extract: { left: 380, top: 40, width: 700, height: 560 },
    format: "jpeg",
    quality: 88,
  },
  {
    src: "kWyzBUwWXuG4YyfPhft7HzgEc.png",
    out: "experience-equipment.jpg",
    extract: { left: 0, top: 700, width: 700, height: 560 },
    format: "jpeg",
    quality: 88,
  },

  // Social share card: crop of the training floor photo.
  {
    src: "kWyzBUwWXuG4YyfPhft7HzgEc.png",
    out: "og-share.jpg",
    width: 1200,
    height: 630,
    fit: "cover",
    position: "attention",
    format: "jpeg",
    quality: 84,
  },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  let img = sharp(`${SRC}/${job.src}`).rotate();
  if (job.extract) img = img.extract(job.extract);
  if (job.width || job.height) {
    img = img.resize({
      width: job.width,
      height: job.height,
      fit: job.fit ?? "inside",
      position: job.position,
      withoutEnlargement: true,
    });
  }
  img =
    job.format === "png"
      ? img.png({ compressionLevel: 9, palette: false })
      : img.jpeg({ quality: job.quality ?? 85, mozjpeg: true });
  const info = await img.toFile(`${OUT}/${job.out}`);
  const kb = Math.round(statSync(`${OUT}/${job.out}`).size / 1024);
  console.log(`${job.out.padEnd(32)} ${info.width}x${info.height}  ${kb} KB`);
}
