import Link from "next/link";
import { ArrowDown, Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#292929]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">

        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#333] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ccff00]" />

            <span className="text-xs font-bold tracking-[0.2em] text-gray-300">
              WORKOUT LIBRARY
            </span>
          </div>

          <h1 className="oswald max-w-3xl text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            Train With Intent.
            <br />
            <span className="text-[#ccff00]">
              Log Every Set.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-4 text-sm font-extrabold text-black transition hover:bg-[#d8ff4d]"
          >
            <Dumbbell size={19} />
            BROWSE WORKOUTS
            <ArrowDown size={18} />
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-[#292929] bg-[#141414]">
            <img
              src="/banner.png"
              alt="FitLog workout"
              className="h-[430px] w-full object-cover sm:h-[520px] lg:h-[600px]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}