import { PlusCircle } from "lucide-react";

export function EmptyComp() {
  return (
    <div className="bg-gray-900 rounded-lg p-8 min-h-[400px] flex flex-col items-center justify-center text-gray-400">
      <p className="mb-4">No Food Items are Added</p>
      <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
        <PlusCircle size={20} />
        <span>Add New Item</span>
      </button>
    </div>
  );
}
