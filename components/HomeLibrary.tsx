"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "@/lib/api";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

type SortOption = "duration" | "calories" | "rating";

export default function HomeLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();
        setWorkouts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const sorted = [...workouts];

    if (sortBy === "duration") {
      sorted.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      sorted.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28"
    >
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT COLLECTION
          </p>

          <h2 className="oswald text-5xl font-bold uppercase md:text-6xl">
            The Library
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative w-full md:w-52">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
            Sort By
          </label>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortOption)
              }
              className="w-full appearance-none rounded-xl border border-[#333] bg-[#141414] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex min-h-72 items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-gray-400">
            <LoaderCircle
              size={36}
              className="animate-spin text-[#ccff00]"
            />

            <p className="text-sm font-semibold">
              Loading workouts...
            </p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-red-900 bg-red-950/30 p-8 text-center">
          <h3 className="text-lg font-bold">
            Unable to load workouts
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Please refresh the page and try again.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}