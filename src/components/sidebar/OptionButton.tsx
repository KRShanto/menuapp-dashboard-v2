"use client";

import { useSidebar } from "../ui/sidebar";
import { SidebarType } from "@/types/sidebar";

export default function OptionButton({
  children,
  sidebar,
  onClick,
}: {
  sidebar?: SidebarType;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { setOpen } = useSidebar();

  return (
    <button
      onClick={() => (sidebar ? setOpen(true, sidebar) : onClick && onClick())}
      className="rounded-md bg-button p-2 font-cairo text-white"
    >
      {children}
    </button>
  );
}
