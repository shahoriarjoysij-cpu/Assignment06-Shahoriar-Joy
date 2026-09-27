"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock3,
  Flame,
  Trash2,
  Eye,
  Star,
} from "lucide-react";

import { usePlan } from "@/components/PlanProvider";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";

type Tab = "plan" | "saved";

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  const currentItems = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function handleComplete(id: number) {
    if (completed.includes(id)) {
      showToast("Workout already completed");
      return;
    }

    setCompleted((current) => [...current, id]);
    showToast("Workout marked as done");
  }

  function handleRemove(id: number) {
    if (activeTab === "plan") {
      removeFromPlan(id);
      showToast("Removed from today's plan");
    } else {
      removeSaved(id);
      showToast("Removed from saved");
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#0b0b0b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#ccff00]"
          >
            <ArrowLeft size={18} />
            BACK TO LIBRARY
          </Link>

          <div className="mb-10">
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#ccff00]">
              YOUR WORKOUTS
            </p>

            <h1 className="oswald text-5xl font-bold uppercase md:text-7xl">
              My Plan
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-[#292929] bg-[#141414] p-6 transition hover:border-[#444]">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Exercises
              </p>

              <p className="oswald mt-2 text-4xl font-bold">
                {plan.length}
              </p>
            </div>

            <div className="rounded-2xl border border-[#292929] bg-[#141414] p-6 transition hover:border-[#444]">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Minutes
              </p>

              <p className="oswald mt-2 text-4xl font-bold">
                {totalMinutes}
              </p>
            </div>

            <div className="rounded-2xl border border-[#292929] bg-[#141414] p-6 transition hover:border-[#444]">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Calories
              </p>

              <p className="oswald mt-2 text-4xl font-bold">
                {totalCalories}
              </p>
            </div>

          </div>

          <div className="mt-12 flex gap-2 border-b border-[#292929]">

            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-t-xl border-b-2 px-5 py-4 text-sm font-bold transition ${
                activeTab === "plan"
                  ? "border-[#ccff00] bg-[#141414] text-[#ccff00]"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              TODAY'S PLAN

              <span className="ml-2 rounded-full bg-[#292929] px-2 py-1 text-xs">
                {plan.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-t-xl border-b-2 px-5 py-4 text-sm font-bold transition ${
                activeTab === "saved"
                  ? "border-[#ccff00] bg-[#141414] text-[#ccff00]"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              SAVED

              <span className="ml-2 rounded-full bg-[#292929] px-2 py-1 text-xs">
                {saved.length}
              </span>
            </button>

          </div>

          <div className="mt-8">

            {currentItems.length === 0 ? (

              <div className="rounded-3xl border border-dashed border-[#333] bg-[#101010] px-6 py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1b1b1b]">
                  <Star
                    size={28}
                    className="text-[#ccff00]"
                  />
                </div>

                <h2 className="oswald mt-6 text-3xl font-bold uppercase">
                  NOTHING HERE YET
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                  {activeTab === "plan"
                    ? "Browse the library and add a lift to get today moving."
                    : "Save workouts from the library and they will appear here."}
                </p>

                <Link
                  href="/"
                  className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-extrabold text-black transition hover:bg-[#d8ff4d]"
                >
                  GO TO WORKOUTS
                </Link>

              </div>

            ) : (

              <div className="space-y-5">

                {currentItems.map((workout) => {
                  const isCompleted = completed.includes(workout.id);

                  return (
                    <div
                      key={workout.id}
                      className={`overflow-hidden rounded-2xl border bg-[#141414] transition hover:border-[#444] ${
                        isCompleted
                          ? "border-[#ccff00]/40"
                          : "border-[#292929]"
                      }`}
                    >

                      <div className="flex flex-col md:flex-row">

                        <div className="h-56 w-full shrink-0 overflow-hidden md:h-auto md:w-64">
                          <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-6">

                          <div>

                            <div className="flex flex-wrap gap-2">
                              {workout.muscleGroups
                                .slice(0, 2)
                                .map((group) => (
                                  <span
                                    key={group}
                                    className="rounded-full bg-[#222] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-300"
                                  >
                                    {group}
                                  </span>
                                ))}
                            </div>

                            <h2
                              className={`oswald mt-4 text-3xl font-bold uppercase ${
                                isCompleted
                                  ? "text-gray-500 line-through"
                                  : ""
                              }`}
                            >
                              {workout.name}
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-400">

                              <span className="flex items-center gap-2">
                                <Clock3 size={16} />
                                {workout.duration} min
                              </span>

                              <span className="flex items-center gap-2">
                                <Flame size={16} />
                                {workout.caloriesBurned} kcal
                              </span>

                              <span className="flex items-center gap-2 text-[#ccff00]">
                                <Star
                                  size={16}
                                  fill="currentColor"
                                />
                                {workout.rating}
                              </span>

                            </div>

                          </div>

                          <div className="mt-7 flex flex-wrap gap-3">

                            <Link
                              href={`/workout/${workout.id}`}
                              className="inline-flex items-center gap-2 rounded-full border border-[#444] px-5 py-3 text-xs font-bold transition hover:border-[#ccff00] hover:text-[#ccff00]"
                            >
                              <Eye size={16} />
                              VIEW DETAILS
                            </Link>

                            {activeTab === "plan" && (
                              <button
                                onClick={() =>
                                  handleComplete(workout.id)
                                }
                                disabled={isCompleted}
                                className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-extrabold text-black transition hover:bg-[#d8ff4d] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Check size={16} />

                                {isCompleted
                                  ? "DONE"
                                  : "MARK AS DONE"}
                              </button>
                            )}

                            <button
                              onClick={() =>
                                handleRemove(workout.id)
                              }
                              className="inline-flex items-center gap-2 rounded-full border border-[#444] px-5 py-3 text-xs font-bold text-gray-400 transition hover:border-red-500 hover:text-red-400"
                            >
                              <Trash2 size={16} />
                              REMOVE
                            </button>

                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>

            )}

          </div>

        </div>
      </main>

      <Footer />

      {toast && <Toast message={toast} />}
    </>
  );
}