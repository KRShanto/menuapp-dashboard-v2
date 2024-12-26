"use client";

import { FiEdit } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";

// A floating button that opens the options
export default function OptionOpener({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useSidebar();

  useEffect(() => {
    if (open) {
      setIsOpen(false);
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        className={cn(
          "fixed bottom-10 right-14 cursor-pointer rounded-full bg-button p-3 text-white z-50",
          open && "right-[30rem]"
        )}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen && !open ? <RxCross2 size={30} /> : <FiEdit size={30} />}
      </button>

      {isOpen && (
        <div className="z-40 fixed bottom-28 right-16 flex flex-col items-start gap-3">
          {children}
        </div>
      )}
    </div>
  );
}
