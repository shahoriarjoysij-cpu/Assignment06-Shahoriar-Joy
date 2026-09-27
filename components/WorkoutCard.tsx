import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
  ArrowUpRight,
} from "lucide-react";

import type { Workout } from "@/lib/api";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#292929] bg-[#141414] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1b1b1b]">

        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups
            .slice(0, 2)
            .map((group) => (
              <span
                key={group}
                className="rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur"
              >
                {group}
              </span>
            ))}
        </div>

        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#ccff00] text-black opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="p-5">

        <h3 className="oswald text-2xl font-semibold uppercase leading-tight">
          {workout.name}
        </h3>

        <p className="mt-2 truncate text-sm text-gray-400">
          {workout.equipment}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-[#292929] pt-4 text-xs text-gray-400">

          <div className="flex items-center gap-1.5">
            <Clock3 size={15} />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame size={15} />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#ccff00]">
            <Star
              size={15}
              fill="currentColor"
            />
            <span>{workout.rating}</span>
          </div>

        </div>
      </div>
    </Link>
  );
}