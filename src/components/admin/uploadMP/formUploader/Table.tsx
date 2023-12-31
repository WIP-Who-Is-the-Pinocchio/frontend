import React from "react";
import { UseFormRegister, FormState } from "react-hook-form";
import { InputTypes, TableType } from "../types";
import TableInput from "./TableInput";

interface TableProps {
  tableResource: TableType;
  register: UseFormRegister<InputTypes>;
  formState: FormState<InputTypes>;
}

const Table: React.FC<TableProps> = ({ tableResource, register }) => {
  const { title, subtitle, theadList, tbody, unit, registerName, required } =
    tableResource;

  return (
    <div>
      <table className="w-full border text-[12px] text-gray-500">
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
              <th key={thItem} scope="col" className="px-[24px] py-[12px] border">
                {thItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              {tbody}
              {required && <span className="text-red-500 pl-[3px]">*</span>}
            </th>
            {registerName.map((name) => {
              const doubleInput = tbody === "완료 / 전체";
              return (
                <td key={name} className="px-[15px] py-[16px] border">
                  <div className="flex">
                    {doubleInput ? (
                      <div className="flex">
                        <TableInput
                          register={register}
                          registerName={`promise_count_detail.completed_${name}`}
                          className="number-spinner-hide"
                        />
                        <span className="px-[5px]">/</span>
                        <TableInput
                          register={register}
                          registerName={`promise_count_detail.total_${name}`}
                          className="number-spinner-hide"
                        />
                      </div>
                    ) : (
                      <TableInput register={register} registerName={`${name}`} />
                    )}
                    {unit && <span>{unit}</span>}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
