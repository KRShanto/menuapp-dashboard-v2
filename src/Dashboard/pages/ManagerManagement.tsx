import { CiEdit } from "react-icons/ci";
import SelectComponent from "../components/SelectComponent";
interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
}
const managers: Manager[] = [
  {
    id: 1,
    name: "Fahim Ahmed",
    email: "abc@gmail.com",
    phone: "0966 234 567 543",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mashoor faisal",
    email: "abc@gmail.com",
    phone: "0966 234 567 543",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
  },
];
const ManagerList = () => {
  const consfirmationTitle = "Are You Sure to Delete Selected Managers?";
  return (
    <div>
      <SelectComponent titleText={consfirmationTitle} />
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
              {managers.map((manager) => (
                <tr
                  key={manager.id}
                  className="border-b border-[#7A766E] hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="">
                        {String(manager.id).padStart(2, "0")}
                      </span>
                      <img
                        src={manager.image}
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
                    <CiEdit />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ManagerList;
