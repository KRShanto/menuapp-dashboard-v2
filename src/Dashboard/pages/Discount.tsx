import OptionButton from "@/components/sidebar/OptionButton";
import OptionOpener from "@/components/sidebar/OptionOpener";
import useDiscountStore from "@/store/discountStore";
import { DiscountCategory } from "@/types/discountType";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DiscountTable } from "../components/DIscountTable";
import SelectComponent from "../components/SelectComponent";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, DISCOUNT_COLLECTION } from "@/lib/firebase";

export default function Discount() {
  const [discounts, setDiscounts] = useState<DiscountCategory[]>([]);
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

  useEffect(() => {
    const fetchDiscounts = () => {
      const discountCollection = collection(db, DISCOUNT_COLLECTION);
      const q = query(discountCollection, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const menuList = snapshot.docs.map(async (doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        Promise.all(menuList).then((items) => {
          setDiscounts(items as DiscountCategory[]);
        });
      });
      return unsub;
    };
    const unsub = fetchDiscounts();
    return () => unsub();
  }, []);

  async function onDelete(id: string) {
    try {
      await deleteDoc(doc(db, DISCOUNT_COLLECTION, id));
    } catch (error) {
      console.error("Error deleting discount: ", error);
      alert("Failed to delete discount");
    }
  }

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
          onDelete={onDelete}
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
