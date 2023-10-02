import React, { ChangeEventHandler, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { valueTypes, ResourceType } from "./formUploaderResource";

interface TableProps {
  tableResource: ResourceType;
  register: UseFormRegister<valueTypes>;
}
const Table: React.FC<TableProps> = ({ tableResource, register }) => {
  const [tableErrorMessage, setTableErrorMessage] = useState("");
  const { title, subtitle, theadList, tbodyList, unit, registerField } = tableResource;

  const handleCheckError: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      setTableErrorMessage("숫자만 입력 가능합니다.");
      return;
    }
    setTableErrorMessage("");
  };

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
          {tbodyList.map((thItem) => (
            <tr key={thItem} className="bg-white border-b">
              <th
                scope="row"
                className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
              >
                {thItem}
              </th>
              {registerField.map((fieldName) => {
                return (
                  <td key={fieldName} className="px-[15px] py-[16px] border">
                    <div className="flex">
                      {title === "성격내용별완료현황" ? (
                        <div className="flex">
                          <input
                            {...register(`${fieldName}.완료` as keyof valueTypes, {
                              required: true,
                              pattern: {
                                value: /^[0-9.]*$/,
                                message: "입력 형식이 올바르지 않습니다.",
                              },
                              onChange: (e) => handleCheckError(e),
                            })}
                            type="text"
                            className="w-full pr-[5px] outline-none"
                          />
                          <span>/</span>
                          <input
                            {...register(`${fieldName}.전체` as keyof valueTypes, {
                              required: true,
                              pattern: {
                                value: /^[0-9.]*$/,
                                message: "입력 형식이 올바르지 않습니다.",
                              },
                              onChange: (e) => handleCheckError(e),
                            })}
                            type="text"
                            className="w-full pl-[5px] outline-none"
                          />
                        </div>
                      ) : (
                        <input
                          {...register(fieldName, {
                            required: true,
                            pattern: {
                              value: /^[0-9.]*$/,
                              message: "입력 형식이 올바르지 않습니다.",
                            },
                            onChange: (e) => handleCheckError(e),
                          })}
                          type="text"
                          className="w-full outline-none"
                        />
                      )}
                      {unit && <span>{unit}</span>}
                    </div>
                  </td>
                );
              })}
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
              <td key={"td" + index} className="px-[15px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="pt-[10px] text-[11px] font-normal text-red-500 text-center">
        {tableErrorMessage}
      </p>
    </div>
  );
};

export default Table;
