import { Check } from "lucide-react";
import { VscEye } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { useSidebar } from "@/components/ui/sidebar";
interface Request {
  id: string;
  itemName: string;
  category: string;
  requestType: "Edit" | "Add";
  changes: string;
  managerName: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

const requests: Request[] = [
  {
    id: "01",
    itemName: "Chicken Soup",
    category: "Soups",
    requestType: "Edit",
    changes: "Price",
    managerName: "John Doe",
    date: "01/12/24",
    status: "Pending",
  },
  {
    id: "02",
    itemName: "Chicken Corn",
    category: "Soups",
    requestType: "Add",
    changes: "N/A",
    managerName: "Anupam",
    date: "01/12/24",
    status: "Approved",
  },
  {
    id: "03",
    itemName: "Chicken Tandoori",
    category: "Main Dish",
    requestType: "Add",
    changes: "N/A",
    managerName: "Anupam",
    date: "01/12/24",
    status: "Rejected",
  },
];

const MenuApproval = () => {
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Pending":
  //       return "bg-yellow-500/10 text-yellow-500";
  //     case "Approved":
  //       return "bg-green-500/10 text-green-500";
  //     case "Rejected":
  //       return "bg-red-500/10 text-red-500";
  //     default:
  //       return "bg-gray-500/10 text-gray-500";
  //   }
  // };
  const { setOpen, open } = useSidebar();

  return (
    <div className="min-h-screen  p-6">
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 -z-1"></div>
      )}
      <h2 className="text-2xl font-semibold text-white mb-6">Menu Approval</h2>
      <div className="mb-8 flex items-center space-x-4 text-primary-color font-semibold">
        <div className="">
          <label
            htmlFor="all"
            className="text-sm  bg-primary-color px-8 rounded-full py-1.5 text-black"
          >
            All
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="pending"
            className="text-sm rounded-full bg-navbgprimary px-8 py-1.5"
          >
            Pending
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="approved"
            className="text-sm font-medium rounded-full bg-navbgprimary px-8 py-1.5"
          >
            Approved
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="rejected"
            className="text-sm font-medium rounded-full bg-navbgprimary px-8 py-1.5"
          >
            Rejected
          </label>
        </div>
      </div>

      <div className="rounded-lg  overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#7A766E] text-left ">
              <th className="px-3 py-4 font-medium text-sm">Item Name</th>
              <th className="px-3 py-4 font-medium text-sm ">Category</th>
              <th className="px-3 py-4 font-medium text-sm ">Request Type</th>
              <th className="px-3 py-4 font-medium">Changes</th>
              <th className="px-3 py-4 font-medium">Manager Name</th>
              <th className="px-3 py-4 font-medium">Date</th>
              <th className="px-3 py-4 font-medium">Status</th>
              <th className="px-3 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-navbgprimary transition-colors hover:rounded-lg"
              >
                <td className="px-3 py-4 flex items-center gap-4">
                  <span>{item.id}</span>
                  <span>{item.itemName}</span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">{item.category}</div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">
                    {item.requestType}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">{item.changes}</div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">
                    {item.managerName}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">{item.date}</div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center justify-center gap-2 bg-yellow-800 rounded-xl px-2 text-yellow-500">
                    <span>{item.status}</span>
                  </div>
                </td>
                <td className="px-3 py-4 flex items-center gap-2">
                  {/* icon of edit */}
                  <button>
                    <Check
                      className="h-6 w-6 bg-green-500 rounded-full"
                      color="white"
                    />
                  </button>
                  <button>
                    <RxCross2
                      className="h-6 w-6 bg-[#DC3545] rounded-full"
                      color="white"
                      size={8}
                    />
                  </button>
                  <button onClick={() => setOpen(true, "APPROVAL_EDIT")}>
                    <VscEye
                      className="h-6 w-6 bg-primary-color rounded-full"
                      color="black"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuApproval;
