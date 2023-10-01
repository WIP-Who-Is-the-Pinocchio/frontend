import React from "react";
interface TableProps {
  title: string;
  subtitle?: string;
  theadList: string[];
  tbodyList: string[];
  unit?: string;
}
const Table: React.FC<TableProps> = ({ title, subtitle, theadList, tbodyList, unit }) => {
  return (
    <table className="w-full border text-[12px] text-gray-500 shadow-md">
      <caption className="p-[20px] bg-white text-[20px] font-semibold text-left text-gray-900">
        {title}
        <p className="mt-[4px] text-[11px] font-normal text-gray-500 whitespace-pre-line">
          *{subtitle}
        </p>
      </caption>
      <thead className="border bg-gray-100 text-[12px] text-gray-700">
        <tr className="border">
          <th className="border"></th>
          {theadList.map((thItem) => (
            <th scope="col" className="px-[24px] py-[12px] border">
              {thItem}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbodyList.map((thItem) => (
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              {thItem}
            </th>
            {Array.from({ length: theadList.length }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <div className="flex">
                  <input key={index} type="text" className="w-full outline-none" />
                  {unit && <span>{unit}</span>}
                </div>
              </td>
            ))}
          </tr>
        ))}
        <tr className="bg-white border-b">
          <th
            scope="row"
            className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
          >
            비고
          </th>
          {Array.from({ length: theadList.length }).map((_, index) => (
            <td className="px-[24px] py-[16px] border">
              <input key={index} type="text" className="w-full outline-none" />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
