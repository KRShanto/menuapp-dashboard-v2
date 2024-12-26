"use client";

import { useSidebar } from "../ui/sidebar";
import { SidebarType } from "@/types/sidebar";

export default function OptionButton({
  children,
  sidebar,
}: {
  sidebar: SidebarType;
  children: React.ReactNode;
}) {
  const { setOpen } = useSidebar();

  return (
    <button
      onClick={() => setOpen(true, sidebar)}
      className="rounded-md bg-button p-2 font-cairo text-white"
    >
      {children}
    </button>
  );
}
