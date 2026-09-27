"use client";

import { useState } from "react";
import { Dumbbell, Star } from "lucide-react";
import type { Workout } from "@/lib/api";
import { usePlan } from "./PlanProvider";
import Toast from "./Toast";

type DetailActionsProps = {
  workout: Workout;
};

export default function DetailActions({
  workout,
}: DetailActionsProps) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = usePlan();

  const [toast, setToast] = useState("");

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function handleAddToPlan() {
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
    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }

    const saved = saveWorkout(workout);

    if (saved) {
      showToast("Saved for later");
    }
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
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

      {toast && <Toast message={toast} />}
    </>
  );
}