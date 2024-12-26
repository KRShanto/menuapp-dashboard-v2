import { AlertDialogConfirm } from "./AlertDialogConfirm";
interface SelectionProps {
  selectAll?: () => void;
  selectedItems?: number[];
  cancelSelection?: () => void;
  titleText?: string;
}
export default function SelectComponent({
  selectAll,
  selectedItems,
  cancelSelection,
  titleText,
}: SelectionProps) {
  return (
    <div className="flex items-center justify-between bg-navbgprimary p-2 text-primary-color rounded-lg">
      <button onClick={selectAll}>Select All ({selectedItems})</button>
      <div className="space-x-2">
        <button
          onClick={cancelSelection}
          disabled={selectedItems?.length === 0}
          className="felx  border border-[#DC3545] rounded-lg px-4 py-2 "
        >
          <span className="relative -top-0.5">Cancel</span>
        </button>
        <AlertDialogConfirm title={titleText} />
      </div>
    </div>
  );
}
