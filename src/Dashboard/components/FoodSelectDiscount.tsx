import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { FaChevronDown } from "react-icons/fa6";
import { DiscountCategory } from "@/types/discountType";

const FOOD_OPTIONS: DiscountCategory[] = [
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

export default function FoodSelectDiscount() {
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (item: { id: number; name: string }) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mt-5" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex justify-between p-2 px-3 w-full rounded-md border border-foreground/70 bg-transparent  placeholder-foreground/70 outline-none  text-left"
      >
        <span className="text-sm text-foreground/70">
          {selectedItem ? selectedItem.name : "Select Your Discount Items"}
        </span>
        <FaChevronDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className=" w-full
            relative 
            left-0 
            right-0 
            z-10 
            mt-2 
            rounded-md 
            border 
            border-primary-color 
            shadow-lg 
            max-h-44 
            overflow-y-auto
          "
        >
          {FOOD_OPTIONS.map((food) => {
            return (
              <div key={food.id}>
                <span className="px-3 py-2 text-lg">{food.name}</span>

                {food.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOptionClick(item)}
                    className={`
                     flex
                     cursor-pointer
                     items-center
                     px-3
                     py-2
                   `}
                  >
                    <img
                      src={item.image}
                      alt="food for discount ${food.name}"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
