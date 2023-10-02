import React from "react";
import Title from "./Title";
import { UseFormRegister } from "react-hook-form";
import { valueTypes } from "./formUploaderResource";

interface CustomSelectProps {
  id: keyof valueTypes;
  optionList: string[];
  required?: boolean | false;
  tooltip?: string;
  caption?: string;
  register: UseFormRegister<valueTypes>;
}

const SelectDiv: React.FC<CustomSelectProps> = ({
  required,
  tooltip,
  id,
  optionList,
  caption,
  register,
}) => {
  return (
    <div className="flex-1">
      <Title isOptional={!required} tooltip={tooltip}>
        {id}
      </Title>
      <div className="border border-gray-300 rounded-lg bg-gray-50">
        <select
          id={id}
          {...register(id, { required: required })}
          className="block w-full h-[43px] p-[10px] border-r-[16px] border-transparent rounded-lg text-[12px] text-gray-900"
        >
          <option value={""}>선택해주세요.</option>
          {optionList.map((optionItem) => (
            <option key={optionItem} value={optionItem}>
              {optionItem}
            </option>
          ))}
        </select>
      </div>
      {caption && (
        <p className="mt-[4px] text-[11px] font-normal text-gray-500">*{caption}</p>
      )}
    </div>
  );
};

export default SelectDiv;
