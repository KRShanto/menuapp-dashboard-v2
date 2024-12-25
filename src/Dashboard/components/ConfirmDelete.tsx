import React from "react";
import { Popconfirm } from "antd";

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onConfirm,
  onCancel,
  disabled,
}) => {
  return (
    <Popconfirm
      title="Delete the selected items"
      description="Are you sure to delete the selected items?"
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      <button disabled={disabled} className="bg-[#DC3545] rounded-lg px-4 py-2">
        <span className="relative -top-0.5">Delete</span>
      </button>
    </Popconfirm>
  );
};

export default ConfirmDelete;
