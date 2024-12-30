import { Checkbox } from "antd";
import { AlertDialogConfirm } from "./AlertDialogConfirm";
interface SelectionProps {
  selectAll?: () => void;
  selectedItems?: string[];
  cancelSelection?: () => void;
  titleText?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: (id: string) => void;
}
export default function SelectComponent({
  selectAll,
  selectedItems,
  cancelSelection,
  titleText,
  isSelected,
  onSelect,
  onDelete,
}: SelectionProps) {
  return (
    <div className="flex items-center justify-between bg-navbgprimary p-2 text-primary-color rounded-lg">
      <button onClick={selectAll} className="flex gap-3">
        Select All
        <Checkbox
          onChange={onSelect}
          checked={isSelected}
          className="z-30 top-4 left-4"
        />
      </button>
      <div className="space-x-2">
        <button
          onClick={cancelSelection}
          disabled={selectedItems?.length === 0}
          className="felx  border border-[#DC3545] rounded-lg px-4 py-2 "
        >
          <span className="relative -top-0.5">Cancel</span>
        </button>
        <AlertDialogConfirm
          title={titleText}
          selectedItems={selectedItems || []}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
