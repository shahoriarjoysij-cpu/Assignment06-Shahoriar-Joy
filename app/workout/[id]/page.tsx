"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  Flame,
  Star,
  Dumbbell,
  Target,
  BarChart3,
} from "lucide-react";

import type { Workout } from "@/lib/api";
import { usePlan } from "@/components/PlanProvider";
import Toast from "@/components/Toast";

export default function WorkoutDetails() {
  const params = useParams();
  const router = useRouter();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [toast, setToast] = useState("");

  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = usePlan();

  useEffect(() => {
    async function loadWorkout() {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${params.id}`
        );

        if (!response.ok) {
          setNotFound(true);
          return;
        }

        const data: Workout = await response.json();
        setWorkout(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadWorkout();
    }
  }, [params.id]);

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function handleAddToPlan() {
    if (!workout) return;

    if (isInPlan(workout.id)) {
      showToast("Already in today's plan");
      return;
    }

    const added = addToPlan(workout);

    if (added) {
      showToast("Added to today's plan");
    } else {
      showToast("Today's plan is full");
    }
  }

  function handleSave() {
    if (!workout) return;

    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }

    const saved = saveWorkout(workout);

    if (saved) {
      showToast("Saved for later");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#ccff00]" />

          <p className="mt-5 text-sm font-semibold text-gray-400">
            Loading workout...
          </p>
        </div>
      </main>
    );
  }

  if (notFound || !workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-5 text-white">
        <div className="text-center">
          <h1 className="oswald text-5xl font-bold uppercase">
            Workout Not Found
          </h1>

          <p className="mt-3 text-gray-400">
            The workout you are looking for does not exist.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-7 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-extrabold text-black"
          >
            BACK TO LIBRARY
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">

        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={18} />
          BACK TO LIBRARY
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">

          <div className="overflow-hidden rounded-[2rem] border border-[#292929] bg-[#141414]">
            <img
              src={workout.image}
              alt={workout.name}
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-[4/5]"
            />
          </div>

          <div>

            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-extrabold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="oswald text-5xl font-bold uppercase leading-[0.95] md:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400">
              {workout.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Clock3 size={20} className="text-[#ccff00]" />

                <p className="mt-3 text-xs uppercase text-gray-500">
                  Duration
                </p>

                <p className="mt-1 font-bold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Flame size={20} className="text-[#ccff00]" />

                <p className="mt-3 text-xs uppercase text-gray-500">
                  Calories
                </p>

                <p className="mt-1 font-bold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Target size={20} className="text-[#ccff00]" />

                <p className="mt-3 text-xs uppercase text-gray-500">
                  Sets
                </p>

                <p className="mt-1 font-bold">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Star
                  size={20}
                  fill="currentColor"
                  className="text-[#ccff00]"
                />

                <p className="mt-3 text-xs uppercase text-gray-500">
                  Rating
                </p>

                <p className="mt-1 font-bold">
                  {workout.rating}
                </p>
              </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="flex items-center gap-3 rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <Dumbbell
                  size={20}
                  className="text-[#ccff00]"
                />

                <div>
                  <p className="text-xs uppercase text-gray-500">
                    Equipment
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {workout.equipment}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#292929] bg-[#141414] p-4">
                <BarChart3
                  size={20}
                  className="text-[#ccff00]"
                />

                <div>
                  <p className="text-xs uppercase text-gray-500">
                    Difficulty
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {workout.difficulty}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-10">
              <h2 className="oswald text-3xl font-bold uppercase">
                Instructions
              </h2>

              <div className="mt-5 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl border border-[#292929] bg-[#141414] p-5"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-extrabold text-black">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-gray-300">
                        {instruction}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              <button
                onClick={handleAddToPlan}
                disabled={isInPlan(workout.id)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-4 text-sm font-extrabold text-black transition hover:bg-[#d8ff4d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Dumbbell size={18} />

                {isInPlan(workout.id)
                  ? "ALREADY IN PLAN"
                  : "ADD TO TODAY'S PLAN"}
              </button>

              <button
                onClick={handleSave}
                disabled={isSaved(workout.id)}
                className="flex items-center justify-center gap-2 rounded-full border border-[#555] px-5 py-4 text-sm font-extrabold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Star size={18} />

                {isSaved(workout.id)
                  ? "SAVED"
                  : "SAVE FOR LATER"}
              </button>

            </div>

          </div>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </main>
  );
}