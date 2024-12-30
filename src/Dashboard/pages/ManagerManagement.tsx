import { CiEdit } from "react-icons/ci";
import SelectComponent from "../components/SelectComponent";
import OptionOpener from "@/components/sidebar/OptionOpener";
import OptionButton from "@/components/sidebar/OptionButton";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { useSidebar } from "@/components/ui/sidebar";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {
  db,
  MANAGER_COLLECTION,
  MANAGER_DEFAULT_IMAGE,
  storage,
} from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";

interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageURL: string;
}

const ManagerList = () => {
  const { setOpen, open } = useSidebar();
  const [managers, setManagers] = useState<Manager[]>([]);
  const consfirmationTitle = "Are You Sure to Delete Selected Managers?";
  const [deleteCLicked, setDeleteClicked] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);

  useEffect(() => {
    const fetchMenu = () => {
      const managerCollection = collection(db, MANAGER_COLLECTION);
      const unsub = onSnapshot(managerCollection, (snapshot) => {
        const menuList = snapshot.docs.map(async (doc) => {
          const src = doc.data().imageURL
            ? await getDownloadURL(ref(storage, doc.data().imageURL))
            : MANAGER_DEFAULT_IMAGE;
          return {
            ...doc.data(),
            id: doc.id,
            imageURL: src,
          };
        });
        Promise.all(menuList).then((items) => {
          setManagers(items as Manager[]);
        });
        // console.log("menuList", menuList);
      });
      return unsub;
    };
    const unsub = fetchMenu();
    return () => unsub();
  }, []);

  const handleSelectAll = () => {
    if (selectedManagers.length === managers.length) {
      setSelectedManagers([]);
    } else {
      setSelectedManagers(managers.map((manager) => manager.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedManagers((prev) =>
      prev.includes(id)
        ? prev.filter((managerId) => managerId !== id)
        : [...prev, id]
    );
  };

  async function handleDelete(id: string) {
    try {
      // TODO: delete the user first
      await deleteDoc(doc(db, MANAGER_COLLECTION, id));
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  }

  return (
    <div>
      {deleteCLicked && (
        <SelectComponent
          titleText={consfirmationTitle}
          selectAll={handleSelectAll}
          selectedItems={selectedManagers.map(String)}
          cancelSelection={() => setSelectedManagers([])}
          isSelected={selectedManagers.length === managers.length}
          onDelete={handleDelete}
        />
      )}
      <div className="w-full max-w-6xl mx-auto p-6 text-primary-color">
        <h1 className="text-3xl font-semibold mb-8">Manager Management</h1>
        <div className="rounded-lg  overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#7A766E] text-left">
                <th className="px-6 py-4 font-medium text-sm">Manager Name</th>
                <th className="px-6 py-4 font-medium text-sm ">
                  Email Address
                </th>
                <th className="px-6 py-4 font-medium text-sm ">Phone Number</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager, index) => (
                <tr
                  key={manager.id}
                  className="border-b border-[#7A766E] hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {deleteCLicked && (
                        <Checkbox
                          onChange={() => handleSelect(manager.id)}
                          checked={selectedManagers.includes(manager.id)}
                        />
                      )}
                      <span className="">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <img
                        src={manager.imageURL}
                        alt={manager.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{manager.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {manager.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {manager.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* icon of edit */}
                    <button
                      onClick={() => setOpen(true, "MANAGER_EDIT", manager)}
                    >
                      <CiEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OptionOpener>
        <OptionButton onClick={() => setDeleteClicked(true)}>
          {" "}
          <span className="inline-flex items-center justify-between w-[150px]">
            Delete Manager
            <RiDeleteBin7Line />
          </span>
        </OptionButton>
        <OptionButton sidebar="MANAGER_ADD">
          <span className="inline-flex items-center justify-between w-[150px]">
            Add New Manager <IoAddOutline size={20} />
          </span>
        </OptionButton>
      </OptionOpener>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 -z-1"></div>
      )}
    </div>
  );
};
export default ManagerList;
