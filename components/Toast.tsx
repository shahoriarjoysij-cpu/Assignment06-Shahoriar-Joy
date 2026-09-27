"use client";

import { CheckCircle2 } from "lucide-react";

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl border border-[#3b3b3b] bg-[#171717] px-5 py-4 shadow-2xl">
      <CheckCircle2
        size={20}
        className="text-[#ccff00]"
      />

      <span className="text-sm font-semibold text-white">
        {message}
      </span>
    </div>
  );
}