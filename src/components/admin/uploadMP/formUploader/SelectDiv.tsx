import React from "react";
import { UseFormRegister } from "react-hook-form";
import { InputTypes } from "./formUploaderResource";
import Title from "./Title";

interface CustomSelectProps {
  id: keyof InputTypes;
  optionList: string[];
  required?: boolean | false;
  tooltip?: string;
  caption?: string;
  register: UseFormRegister<InputTypes>;
}

const SelectDiv: React.FC<CustomSelectProps> = ({
  id,
  optionList,
  required,
  tooltip,
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
          className="block w-full h-[43px] p-[10px] border-r-[16px] border-transparent rounded-lg text-[12px] text-gray-900"
          {...register(id, { required: required })}
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
