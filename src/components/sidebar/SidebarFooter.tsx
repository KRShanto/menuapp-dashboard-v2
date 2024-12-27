import React from "react";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export default function SidebarFooterComponent({
  successBtnText,
  submitHandler,
  disabled,
}: {
  successBtnText: string;
  submitHandler: (formData: FormData) => void;
  disabled?: boolean;
}) {
  const { setOpen } = useSidebar();

  async function handle(formData: FormData) {
    submitHandler(formData);
    setOpen(false, undefined);
  }

  return (
    <div className="flex w-full justify-center gap-3">
      <button
        className="w-full rounded-md border border-foreground p-2 text-foreground"
        type="button"
        onClick={() => setOpen(false, undefined)}
      >
        Cancel
      </button>
      <button
        className={cn(
          "w-full rounded-md bg-foreground p-2 text-black",
          disabled && "cursor-not-allowed opacity-50",
        )}
        onClick={() => handle(new FormData())}
      >
        {successBtnText}
      </button>
    </div>
  );
}
