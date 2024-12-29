export function DiscountTableHeader() {
  return (
    <thead className=" text-white">
      <tr className=" border-b border-gray-500 text-left">
        <th className="px-6 py-3 text-left text-sm ">Discount Name</th>
        <th className="px-6 py-3 text-left text-sm font-semibold">
          Discount Items
        </th>
        <th className="px-6 py-3 text-left text-sm ">Rate</th>
        <th className="px-6 py-3 text-left text-sm ">Start Date</th>
        <th className="px-6 py-3 text-left text-sm ">End Date</th>
      </tr>
    </thead>
  );
}
