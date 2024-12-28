import { useFormStatus } from "react-dom";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export default function SidebarFooterComponent({
  successBtnText,
  disabled,
}: {
  successBtnText: string;
  disabled?: boolean;
}) {
  const { setOpen } = useSidebar();
  const { pending } = useFormStatus();

  console.log("pending", pending);

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
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {pending ? "Loading..." : successBtnText}
      </button>
    </div>
  );
}
