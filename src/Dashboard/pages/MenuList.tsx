import { useState } from "react";
import ShowAllItem from "../components/ShowAllItem";
import OptionOpener from "@/components/sidebar/OptionOpener";
import OptionButton from "@/components/sidebar/OptionButton";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
export default function MenuList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [testShow, setTestShow] = useState(false);
  return (
    <div className="h-full">
      <h1 className="text-primary-color text-3xl">All Menu Items</h1>
      <OptionOpener>
        <OptionButton>
          {" "}
          <span className="inline-flex items-center justify-between w-[95px]">
            Delete Item
            <RiDeleteBin7Line />
          </span>
        </OptionButton>
        <OptionButton sidebar="MENU_ADD">
          <span className="inline-flex items-center justify-between w-[95px]">
            Add Item <IoAddOutline size={20} />
          </span>
        </OptionButton>
      </OptionOpener>

      {/* center text of the page */}
      {testShow ? (
        <div className="flex items-center justify-center h-[100%] text-secondary-text-color">
          <div>No Food Items are Added</div>
        </div>
      ) : (
        <ShowAllItem />
      )}
    </div>
  );
}
