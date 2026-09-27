"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  Flame,
  Dumbbell,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getWorkout, type Workout } from "@/lib/api";
import DetailActions from "@/components/DetailActions";

export default function WorkoutDetails() {
  const params = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      const data = await getWorkout(String(params.id));
      setWorkout(data);
      setLoading(false);
    }

    loadWorkout();
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] text-white">
        <div className="text-center">
          <Dumbbell
            size={40}
            className="mx-auto animate-pulse text-[#ccff00]"
          />
          <p className="mt-4 text-sm text-gray-400">
            Loading workout...
          </p>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-5 text-white">
        <div className="text-center">
          <h1 className="oswald text-5xl font-bold uppercase">
            Workout Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            The requested workout does not exist.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-extrabold text-black"
          >
            <ArrowLeft size={17} />
            BACK TO WORKOUTS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-5 py-10 text-white md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={17} />
          Back to Workout Library
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-3xl border border-[#292929] bg-[#141414]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-[350px] w-full object-cover sm:h-[500px] lg:h-full lg:min-h-[650px]"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#1d1d1d] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="oswald mt-5 text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
              {workout.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Clock3 size={18} className="text-[#ccff00]" />
                <p className="mt-3 text-xs text-gray-500">Duration</p>
                <p className="mt-1 font-bold">{workout.duration} min</p>
              </div>

              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Flame size={18} className="text-[#ccff00]" />
                <p className="mt-3 text-xs text-gray-500">Calories</p>
                <p className="mt-1 font-bold">{workout.caloriesBurned} kcal</p>
              </div>

              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Star size={18} className="text-[#ccff00]" fill="currentColor" />
                <p className="mt-3 text-xs text-gray-500">Rating</p>
                <p className="mt-1 font-bold">{workout.rating}</p>
              </div>

              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Dumbbell size={18} className="text-[#ccff00]" />
                <p className="mt-3 text-xs text-gray-500">Difficulty</p>
                <p className="mt-1 font-bold">{workout.difficulty}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#292929] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Equipment
                </p>
                <p className="mt-2 font-semibold">{workout.equipment}</p>
              </div>

              <div className="rounded-2xl border border-[#292929] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Sets & Reps
                </p>
                <p className="mt-2 font-semibold">
                  {workout.sets} sets × {workout.reps}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                How To Perform
              </p>

              <div className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <div
                    key={instruction}
                    className="flex gap-3 rounded-xl border border-[#292929] bg-[#111111] p-4"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-[#ccff00]"
                    />
                    <p className="text-sm leading-6 text-gray-300">
                      <span className="mr-2 font-bold text-white">
                        {index + 1}.
                      </span>
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <DetailActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}