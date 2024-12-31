import { useSidebar } from "@/components/ui/sidebar";
import { DiscountCategory } from "@/types/discountType";
import { Checkbox } from "antd";
import { CiEdit } from "react-icons/ci";

interface TableRowProps {
  index: number;
  discount: DiscountCategory;
  onDelete?: (id: string) => void;
  handleSelect: (id: string) => void;
  selectedDiscount: string[];
  isDeleteClicked: boolean;
}

export function DiscountTableRow({
  index,
  discount,
  onDelete,
  handleSelect,
  selectedDiscount,
  isDeleteClicked,
}: TableRowProps) {
  const { setOpen } = useSidebar();
  return (
    <tr className="border-b border-gray-500 ">
      <td className="px-6 py-4 text-sm flex gap-2">
        {isDeleteClicked && (
          <Checkbox
            onChange={() => handleSelect(discount.id)}
            checked={selectedDiscount.includes(discount.id)}
            className=" absolute left-4"
          />
        )}

        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{discount.name}</span>
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex flex-wrap gap-2">{discount.itemName}</div>
      </td>
      <td className="px-6 py-4 text-sm">{discount.rate}%</td>
      <td className="px-6 py-4 text-sm">{discount.startDate}</td>
      <td className="px-6 py-4 text-sm">{discount.endDate}</td>
      <td className="px-6 py-4 text-sm">
        <button
          onClick={() => onDelete && onDelete(discount.id)}
          className="p-1 hover:bg-gray-600 rounded-full transition-colors"
          aria-label="Delete discount"
        >
          <CiEdit
            size={18}
            className="text-gray-300"
            onClick={() => setOpen(true, "DISCOUNT_EDIT", discount)}
          />
        </button>
      </td>
    </tr>
  );
}
