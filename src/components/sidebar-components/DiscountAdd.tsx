import FoodSelectDiscount from "@/Dashboard/components/FoodSelectDiscount";
import SidebarFooter from "../sidebar/SidebarFooter";
import { RiPercentFill } from "react-icons/ri";

export default function DiscountAdd() {
  return (
    // @ts-ignore

    <form className="h-[92%] p-3">
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
          />
          <span className="absolute right-2 top-3 text-foreground/70">
            <RiPercentFill />
          </span>
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="category"
          >
            Discount Items
          </label>
          <FoodSelectDiscount />
        </div>

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
          />
        </div>
      </div>
      <SidebarFooter successBtnText="Add" />
    </form>
  );
}
