import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-5 text-white">
      <div className="text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ccff00] text-black">
          <Dumbbell size={28} />
        </div>

        <p className="mt-8 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
          FITLOG
        </p>

        <h1 className="oswald mt-3 text-7xl font-bold uppercase">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-bold">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          The page you are looking for doesn't exist or may have
          been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-extrabold text-black transition hover:bg-[#d8ff4d]"
        >
          <ArrowLeft size={17} />
          BACK TO HOME
        </Link>

      </div>
    </main>
  );
}