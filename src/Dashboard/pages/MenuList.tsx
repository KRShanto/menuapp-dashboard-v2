import { useState } from "react";
import FloatAddEdit from "../components/FloatAddEdit";
import ShowAllItem from "../components/ShowAllItem";

export default function MenuList() {
  const [testShow, setTestShow] = useState(false);
  return (
    <div className="h-full">
      <h1 className="text-primary-color text-3xl">All Menu Items</h1>
      {/* center text of the page */}
      {testShow ? (
        <>
          <div className="flex items-center justify-center h-[100%] text-secondary-text-color">
            <div>No Food Items are Added</div>
          </div>
          <FloatAddEdit />
        </>
      ) : (
        <ShowAllItem />
      )}
    </div>
  );
}
