"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { usePlan } from "./PlanProvider";

export default function Navbar() {
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-[#292929] bg-[#0b0b0b]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ccff00] text-black">
            <Dumbbell
              size={19}
              strokeWidth={2.5}
            />
          </div>

          <span className="text-xl font-extrabold tracking-tight">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="rounded-full bg-[#ccff00] px-5 py-2.5 text-sm font-bold text-black"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-400 transition hover:bg-[#181818] hover:text-white"
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black"
          >
            <span>Plan</span>
            <span>{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#555] px-3 py-2 text-xs font-bold text-white"
          >
            <span>Saved</span>
            <span>{saved.length}</span>
          </Link>
        </div>

      </div>
    </header>
  );
}