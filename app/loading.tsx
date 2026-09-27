import { Dumbbell } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] text-white">
      <div className="flex flex-col items-center">

        <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#ccff00] text-black">
          <Dumbbell size={28} />
        </div>

        <h1 className="oswald mt-6 text-3xl font-bold uppercase">
          FITLOG
        </h1>

        <div className="mt-5 h-1 w-32 overflow-hidden rounded-full bg-[#292929]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#ccff00]" />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Loading your workouts...
        </p>

      </div>
    </main>
  );
}