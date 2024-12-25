import { FloatButton } from "antd";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

export default function FloatAddEdit() {
  return (
    <div>
      <FloatButton.Group
        trigger="click"
        type="default"
        style={{ insetInlineEnd: 94 }}
        icon={<TbEdit color="orange" />}
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
