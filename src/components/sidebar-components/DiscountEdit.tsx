import FoodSelectDiscount from "@/Dashboard/components/FoodSelectDiscount";
import SidebarFooter from "../sidebar/SidebarFooter";
import { RiPercentFill } from "react-icons/ri";
import { useSidebar } from "../ui/sidebar";
import { ItemsType } from "@/types/Item";
import { useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db, DISCOUNT_COLLECTION } from "@/lib/firebase";

export default function DiscountEdit() {
  const { setOpen, sidebarData } = useSidebar();
  const [selectedItem, setSelectedItem] = useState<ItemsType | null>(null);

  useEffect(() => {
    console.log("Sidebar Data", sidebarData);
    setSelectedItem({
      id: sidebarData.itemId,
      name: sidebarData?.itemName,
    } as any);
  }, [sidebarData]);

  console.log("Selected Item", selectedItem);

  async function handleSubmit(data: FormData) {
    const name = data.get("name") as string;
    const rate = data.get("rate") as string;
    const startDate = data.get("startDate") as string;
    const endDate = data.get("endDate") as string;

    if (!selectedItem) {
      alert("Please select an item");
      return;
    }

    try {
      const discountRef = doc(db, DISCOUNT_COLLECTION, sidebarData.id);
      await updateDoc(discountRef, {
        name,
        rate: parseFloat(rate),
        startDate,
        endDate,
        itemName: selectedItem.name,
        itemId: selectedItem.id,
        updatedAt: new Date(),
      });
      setOpen(false, undefined);
    } catch (error) {
      console.error("Error updating discount: ", error);
      alert("Failed to update discount");
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
            defaultValue={sidebarData?.name}
            name="name"
            id="name"
          />
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="category"
          >
            Discount Rate
          </label>

          <input
            type="number"
            placeholder="Enter discount rate"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            defaultValue={sidebarData?.rate}
            name="rate"
            id="rate"
          />
          <span className="absolute right-2 top-3 text-foreground/70">
            <RiPercentFill />
          </span>
        </div>
        <FoodSelectDiscount
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="category"
          >
            Start Date
          </label>
          <input
            type="date"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            defaultValue={sidebarData?.startDate}
            name="startDate"
            id="startDate"
          />
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="category"
          >
            End Date
          </label>
          <input
            type="date"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none text-primary-color"
            name="endDate"
            id="endDate"
            defaultValue={sidebarData?.endDate}
          />
        </div>
      </div>
      <SidebarFooter successBtnText="Save" />
    </form>
  );
}
