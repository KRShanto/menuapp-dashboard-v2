import FoodSelectDiscount from "@/Dashboard/components/FoodSelectDiscount";
import SidebarFooter from "../sidebar/SidebarFooter";
import { RiPercentFill } from "react-icons/ri";
import { useState } from "react";
import { ItemsType } from "@/types/Item";
import { db, DISCOUNT_COLLECTION } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSidebar } from "../ui/sidebar";

export default function DiscountAdd() {
  const [selectedItem, setSelectedItem] = useState<ItemsType | null>(null);
  const { setOpen } = useSidebar();

  async function handleSubmit(data: FormData) {
    const name = data.get("name") as string;
    const rate = data.get("rate") as string;
    const startDate = data.get("start_date") as string;
    const endDate = data.get("end_date") as string;

    if (!selectedItem) {
      alert("Please select an item");
      return;
    }

    try {
      await addDoc(collection(db, DISCOUNT_COLLECTION), {
        name,
        rate: parseFloat(rate),
        startDate,
        endDate,
        itemName: selectedItem.name,
        itemId: selectedItem.id,
        createdAt: new Date(),
      });
      setOpen(false, undefined);
    } catch (error) {
      console.error("Error adding discount: ", error);
      alert("Failed to add discount");
    }
  }

  return (
    // @ts-ignore

    <form className="h-[92%] p-3" action={handleSubmit}>
      <div className="h-[95%]">
        <div className="relative mt-4">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70 "
            htmlFor="name"
          >
            Discount Name
          </label>
          <input
            type="text"
            placeholder="Enter discount name"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            name="name"
            id="name"
            required
          />
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="rate"
          >
            Discount Rate
          </label>

          <input
            type="number"
            placeholder="Enter discount rate"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            name="rate"
            id="rate"
            required
          />
          <span className="absolute right-2 top-3 text-foreground/70">
            <RiPercentFill />
          </span>
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="item"
          >
            Discount Item
          </label>
          <FoodSelectDiscount
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="start_date"
          >
            Start Date
          </label>
          <input
            type="date"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            name="start_date"
            id="start_date"
            required
          />
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="end_date"
          >
            End Date
          </label>
          <input
            type="date"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none text-primary-color"
            name="end_date"
            id="end_date"
            required
          />
        </div>
      </div>
      <SidebarFooter successBtnText="Add" />
    </form>
  );
}
