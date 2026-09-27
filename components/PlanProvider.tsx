"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { Workout } from "@/lib/api";

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch {
      console.error("Failed to load FitLog data");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  function addToPlan(workout: Workout) {
    if (plan.some((item) => item.id === workout.id)) {
      return false;
    }

    if (plan.length >= 5) {
      return false;
    }

    setPlan((current) => [...current, workout]);

    return true;
  }

  function removeFromPlan(id: number) {
    setPlan((current) => current.filter((item) => item.id !== id));
  }

  function saveWorkout(workout: Workout) {
    if (saved.some((item) => item.id === workout.id)) {
      return false;
    }

    setSaved((current) => [...current, workout]);

    return true;
  }

  function removeSaved(id: number) {
    setSaved((current) => current.filter((item) => item.id !== id));
  }

  function isInPlan(id: number) {
    return plan.some((item) => item.id === id);
  }

  function isSaved(id: number) {
    return saved.some((item) => item.id === id);
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}