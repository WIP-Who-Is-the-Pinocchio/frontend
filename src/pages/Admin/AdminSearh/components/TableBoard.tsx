import { FC } from "react";

import { MPDataType } from "../../../../types/MPData.type";

interface TableRowsProps {
  data: MPDataType[];
  MPDataKeys: Record<string, string>;
  renderDataValue: (data: MPDataType, key: string) => React.ReactNode;
}

export const TableRows: FC<TableRowsProps> = ({ data, MPDataKeys, renderDataValue }) => {
  return (
    <>
      {data.map((dataItem, index) => (
        <tr key={index} className="bg-white border-b">
          <th
            scope="row"
            className="flex items-center sticky left-0 z-10 px-[24px] py-[12px] bg-white text-gray-900 whitespace-nowrap shadow-[5px_0px_8px_-4px_rgba(0,0,0,.15)]"
          >
            <div
              style={{ backgroundImage: `url(${dataItem.profile_url})` }}
              className={`w-[40px] h-[40px] border border-gray-200 rounded-full bg-cover bg-top`}
            />
            <div className="pl-[12px]">
              <div className="text-[14px] font-semibold">{dataItem.name}</div>
            </div>
          </th>
          {Object.keys(MPDataKeys).map((key) => (
            <td key={key} className="px-[24px] py-[12px] text-[12px] whitespace-nowrap">
              {renderDataValue(dataItem, key)}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
