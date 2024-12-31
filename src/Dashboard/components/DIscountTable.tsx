import { DiscountCategory } from "@/types/discountType";
import { DiscountTableRow } from "./DiscountTableRow";
import { DiscountTableHeader } from "./DiscountTableHeader";
import { useSidebar } from "@/components/ui/sidebar";

interface DiscountTableProps {
  discounts: DiscountCategory[];
  onDeleteDiscount?: (id: string) => void;
  handleSelect: (id: string) => void;
  selectedDiscount: string[];
  isDeleteClicked: boolean;
}

export function DiscountTable({
  discounts,
  onDeleteDiscount,
  handleSelect,
  selectedDiscount,
  isDeleteClicked,
}: DiscountTableProps) {
  const { open } = useSidebar();
  return (
    <div className="overflow-x-auto rounded-lg border-b border-gray-700">
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 -z-1"></div>
      )}
      <table className="min-w-full text-primary-color">
        <DiscountTableHeader />
        <tbody>
          {discounts.map((discount, index) => (
            <DiscountTableRow
              key={discount.id}
              index={index}
              discount={discount}
              onDelete={onDeleteDiscount}
              handleSelect={handleSelect}
              selectedDiscount={selectedDiscount}
              isDeleteClicked={isDeleteClicked}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
