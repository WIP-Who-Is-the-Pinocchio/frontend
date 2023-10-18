import React from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegisterReturn } from "react-hook-form";
import Title from "./Title";

interface CustomSelectProps {
  title: string;
  optionList: string[];
  required?: boolean | false;
  tooltip?: string;
  caption?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  onRegister: UseFormRegisterReturn;
  ErrorMessage: JSX.Element | undefined;
}

const SelectDiv: React.FC<CustomSelectProps> = ({
  title,
  optionList,
  required,
  tooltip,
  caption,
  onChange,
  onRegister,
  ErrorMessage,
}) => {
  return (
    <div>
      <Title isOptional={!required} tooltip={tooltip}>
        {title}
      </Title>
      <div
        className={twMerge(
          "border border-gray-300 rounded-lg bg-gray-50",
          ErrorMessage && "border-red-400",
        )}
      >
        <select
          className="block w-full h-[43px] p-[10px] border-r-[16px] border-transparent rounded-lg text-[12px] text-gray-900 outline-none"
          {...onRegister}
          onChange={onChange}
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
      {ErrorMessage}
    </div>
  );
};

export default SelectDiv;
