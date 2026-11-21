import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

export function TrainingFloor() {
  return (
    <section aria-labelledby="floor-title" className="border-t border-line-subtle">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-line">
            <Image
              src="/images/training-floor.jpg"
              alt="The training floor at Gold's Gym Iloilo: hexagon ceiling lights over dumbbell racks, power racks and benches"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2
            id="floor-title"
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] uppercase"
          >
            Built for serious work.
          </h2>
          <p className="mt-6 max-w-[62ch] text-[1.125rem] text-muted">
            Gold&rsquo;s Gym Iloilo is more than a place to work out. It&rsquo;s a community built around
            strength, discipline, and progress. Whether you&rsquo;re starting your fitness journey or pushing
            toward your next personal best, our space is designed to help you become stronger every day.
          </p>
          <ButtonLink href="/why-gold-s-gym" variant="outline" className="mt-8">
            Explore the gym
            <ArrowRight className="size-[1.1em]" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
