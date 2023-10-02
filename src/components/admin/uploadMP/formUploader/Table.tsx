import React, { ChangeEventHandler, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { InputTypes, TableType } from "./formUploaderResource";

interface TableProps {
  tableResource: TableType;
  register: UseFormRegister<InputTypes>;
}
const Table: React.FC<TableProps> = ({ tableResource, register }) => {
  const [tableErrorMessage, setTableErrorMessage] = useState("");
  const { title, subtitle, theadList, tbody, unit, registerName } = tableResource;

  //테이블 input error를 하나의 state로 관리하는 핸들러입니다.
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
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              {tbody}
            </th>
            {registerName.map((name) => {
              const doubleInput = tbody === "완료 / 전체";
              return (
                <td key={name} className="px-[15px] py-[16px] border">
                  <div className="flex">
                    {doubleInput ? (
                      <div className="flex">
                        <input
                          type="text"
                          className="w-full text-center outline-none"
                          {...register(`${name}.done` as keyof InputTypes, {
                            required: true,
                            pattern: {
                              value: /^[0-9.]*$/,
                              message: "입력 형식이 올바르지 않습니다.",
                            },
                            onChange: (e) => handleCheckError(e),
                          })}
                        />
                        <span className="px-[5px]">/</span>
                        <input
                          type="text"
                          className="w-full text-center outline-none"
                          {...register(`${name}.total` as keyof InputTypes, {
                            required: true,
                            pattern: {
                              value: /^[0-9.]*$/,
                              message: "입력 형식이 올바르지 않습니다.",
                            },
                            onChange: (e) => handleCheckError(e),
                          })}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="w-full outline-none"
                        {...register(`${name}.value` as keyof InputTypes, {
                          required: true,
                          pattern: {
                            value: /^[0-9.]*$/,
                            message: "입력 형식이 올바르지 않습니다.",
                          },
                          onChange: (e) => handleCheckError(e),
                        })}
                      />
                    )}
                    {unit && <span>{unit}</span>}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              비고
            </th>
            {registerName.map((name) => (
              <td key={name} className="px-[15px] py-[16px] border">
                <input
                  type="text"
                  className="w-full outline-none"
                  {...register(`${name}.notes` as keyof InputTypes)}
                />
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
