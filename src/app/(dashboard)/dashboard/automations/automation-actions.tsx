"use client";

import { useTransition } from "react";
import { toggleAutomation, deleteAutomation } from "./actions";

export function AutomationActions({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const [togglePending, startToggle] = useTransition();
  const [deletePending, startDelete] = useTransition();

  function handleToggle() {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("is_active", String(isActive));
    startToggle(async () => { await toggleAutomation(fd); });
  }

  function handleDelete() {
    if (!confirm("Delete this automation?")) return;
    const fd = new FormData();
    fd.set("id", id);
    startDelete(async () => { await deleteAutomation(fd); });
  }

  return (
    <div className="flex flex-col items-end gap-2 flex-shrink-0">
      <button
        type="button"
        onClick={handleToggle}
        disabled={togglePending}
        className={`relative w-10 h-5 rounded-full transition-colors disabled:opacity-60 ${
          isActive ? "bg-[#8B5CF6]" : "bg-[#27272A]"
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            isActive ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deletePending}
        className="text-[#52525B] hover:text-[#EF4444] text-xs transition-colors disabled:opacity-40"
      >
        {deletePending ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}
