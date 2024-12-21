import { FloatButton } from "antd";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
export default function MenuList() {
  return (
    <div className="h-full">
      <h1 className="text-primary-color text-3xl">All Menu Items</h1>
      {/* center text of the page */}
      <div className="flex items-center justify-center h-[100%] text-secondary-text-color">
        <div>No Food Items are Added</div>
      </div>
      <FloatButton.Group
        trigger="click"
        type="default"
        style={{ insetInlineEnd: 94 }}
        icon={<TbEdit color="orange"/>}
      >
        <FloatButton
          icon={<RiDeleteBin7Line />}
          style={{ backgroundColor: "orange" }}
        />
        <FloatButton icon={<IoMdAdd />} style={{ backgroundColor: "orange" }} />
      </FloatButton.Group>
    </div>
  );
}
