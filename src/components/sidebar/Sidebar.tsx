import { useSidebar } from "../ui/sidebar";

export default function SidebarFooterComponent({
  successBtnText,
  submitHandler,
}: {
  successBtnText: string;
  submitHandler: (formData: FormData) => void;
}) {
  const { setOpen } = useSidebar();

  async function handle(formData: FormData) {
    submitHandler(formData);
    setOpen(false, undefined);
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex w-full">
        <button
          className="w-full rounded-md border border-foreground p-2 text-foreground"
          type="button"
          onClick={() => setOpen(false, undefined)}
        >
          Cancel
        </button>
        <button
          className="w-full rounded-md bg-foreground/50 p-2 text-black"
          type="button"
          onClick={() => handle(new FormData())}
        >
          {successBtnText}
        </button>
      </div>
    </div>
  );
}
