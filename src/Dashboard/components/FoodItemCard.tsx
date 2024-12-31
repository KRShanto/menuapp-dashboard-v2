import { ArrowRight } from "lucide-react";
import { Checkbox } from "antd";
import { useSidebar } from "@/components/ui/sidebar";

interface FoodCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  calories: number;
  isSelected: boolean;
  onSelect: () => void;
  isDeleteClicked?: boolean;
}
const FoodItemCard = ({
  id,
  image,
  name,
  description,
  price,
  category,
  calories,
  onSelect,
  isSelected,
  isDeleteClicked,
}: FoodCardProps) => {
  const { setOpen } = useSidebar();
  return (
    <div className="relative">
      {isDeleteClicked && (
        <Checkbox
          onChange={onSelect}
          checked={isSelected}
          className="absolute z-30 top-4 left-4"
        />
      )}
      <div className="group w-full h-72 max-w-md rounded-lg bg-navbgprimary  p-1.5 space-y-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="h-[70%] w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="space-y-1 relative -top-14">
          <h3 className="font-semibold text-lg text-primary-color">{name}</h3>
          <p className="text-sm  text-primary-color">{description}</p>
          <div className="flex flex-col  ">
            <div className="flex items-center justify-between ">
              <span className="text-primary-color">SR {price}</span>
              <span className="bg-[#2E211D] text-[#F37554] px-2 rounded-full ">
                {calories} Calories
              </span>
            </div>
            <button
              className="w-full flex text-black bg-primary-color px-2 py-2 rounded-lg items-center justify-center mt-2"
              onClick={() =>
                setOpen(true, "MENU_EDIT", {
                  id,
                  name,
                  description,
                  price,
                  calories,
                  imageURL: image,
                  category,
                })
              }
            >
              <span className="mr-2">See Details</span>
              <ArrowRight className="h-4 w-4 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodItemCard;
