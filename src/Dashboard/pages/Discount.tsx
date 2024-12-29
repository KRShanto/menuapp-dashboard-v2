import OptionButton from "@/components/sidebar/OptionButton";
import OptionOpener from "@/components/sidebar/OptionOpener";
import useDiscountStore from "@/store/discountStore";
import { DiscountCategory } from "@/types/discountType";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DiscountTable } from "../components/DIscountTable";
import SelectComponent from "../components/SelectComponent";
import { useState } from "react";

const discounts: DiscountCategory[] = [
  {
    id: "1",
    name: "Indian Specials",
    items: [
      {
        id: 1,
        name: "Tandoori Chicken",
        image:
          "https://plus.unsplash.com/premium_photo-1669831178095-005ed789250a?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Chicken Soup",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
      {
        id: 3,
        name: "Butter Chicken",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
      {
        id: 4,
        name: "Biryani",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
    ],
    rate: 10,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
  {
    id: "2",
    name: "Veg Specials",
    items: [
      {
        id: 5,
        name: "Naan",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
      {
        id: 6,
        name: "Dal Makhani",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
      {
        id: 7,
        name: "Paneer Tikka",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
      {
        id: 8,
        name: "Veg Korma",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
      {
        id: 9,
        name: "Mango Lassi",
        image: "https://i.ibb.co/0jLh4Xv/tandoori-chicken.png",
      },
    ],
    rate: 15,
    startDate: "2023-06-01",
    endDate: "2023-12-31",
  },
];
export default function Discount() {
  const { clickedAdd } = useDiscountStore();
  const confirmationTitle = "Are You Sure to Delete Selected Discounts?";
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedDiscounts.length === discounts.length) {
      setSelectedDiscounts([]);
    } else {
      setSelectedDiscounts(discounts.map((discount) => discount.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedDiscounts((prev) =>
      prev.includes(id)
        ? prev.filter((discountId) => discountId !== id)
        : [...prev, id]
    );
  };
  return (
    <div className="h-full">
      <h1 className="text-3xl font-semibold">Discount</h1>
      {deleteClicked && (
        <SelectComponent
          titleText={confirmationTitle}
          selectAll={handleSelectAll}
          selectedItems={selectedDiscounts}
          cancelSelection={() => setSelectedDiscounts([])}
          isSelected={selectedDiscounts.length === discounts.length}
        />
      )}
      <OptionOpener>
        <OptionButton onClick={() => setDeleteClicked(true)}>
          {" "}
          <span className="inline-flex items-center justify-between w-[150px]">
            Delete Discount
            <RiDeleteBin7Line />
          </span>
        </OptionButton>
        <OptionButton sidebar="DISCOUNT_ADD">
          <span className="inline-flex items-center justify-between w-[150px]">
            Add New Discount <IoAddOutline size={20} />
          </span>
        </OptionButton>
      </OptionOpener>

      {clickedAdd ? (
        <div className="flex items-center justify-center h-[100%] text-secondary-text-color">
          <div>No Discounts are going on!</div>
        </div>
      ) : (
        <DiscountTable
          discounts={discounts}
          handleSelect={handleSelect}
          selectedDiscount={selectedDiscounts}
          isDeleteClicked={deleteClicked}
        />
      )}
    </div>
  );
}
