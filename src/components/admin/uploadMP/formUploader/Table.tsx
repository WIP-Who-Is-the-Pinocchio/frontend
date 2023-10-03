import React, { ChangeEventHandler, useEffect, useState } from "react";
import { UseFormRegister, FormState } from "react-hook-form";
import { InputTypes, TableType } from "./formUploaderResource";
import TableInput from "./TableInput";

interface TableProps {
  tableResource: TableType;
  register: UseFormRegister<InputTypes>;
  formState: FormState<InputTypes>;
}

const Table: React.FC<TableProps> = ({ tableResource, register, formState }) => {
  const [tableErrorMessage, setTableErrorMessage] = useState("");
  const { title, subtitle, theadList, tbody, unit, registerName, required } =
    tableResource;
  const { errors } = formState;

  //테이블 전체의 에러를 하나의 state로 관리
  useEffect(() => {
    for (let name of registerName) {
      const tableName = name.split(".")[0];
      const error = errors[tableName as keyof InputTypes];
      if (error) {
        setTableErrorMessage("필수 입력란을 작성해주세요.");
        break;
      }
      setTableErrorMessage("");
    }
  }, [formState]);

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
                          registerName={`${name}.done`}
                          className="number-spinner-hide"
                          required={required}
                          register={register}
                          type="number"
                        />
                        <span className="px-[5px]">/</span>
                        <TableInput
                          registerName={`${name}.total`}
                          className="number-spinner-hide"
                          required={required}
                          register={register}
                          type="number"
                        />
                      </div>
                    ) : (
                      <TableInput
                        registerName={`${name}.value`}
                        required={required}
                        register={register}
                        type="number"
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
                <TableInput registerName={`${name}.notes`} register={register} />
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
