import React from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InputTypes } from "../types";
import Title from "./Title";

interface CustomSelectProps {
  id: keyof InputTypes;
  title: string;
  optionList: string[];
  required?: boolean | false;
  tooltip?: string;
  caption?: string;
  errors: FieldErrors<InputTypes>;
  register: UseFormRegister<InputTypes>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

const SelectDiv: React.FC<CustomSelectProps> = ({
  id,
  title,
  optionList,
  required,
  tooltip,
  caption,
  errors,
  register,
  onChange,
}) => {
  return (
    <div>
      <Title isOptional={!required} tooltip={tooltip}>
        {title}
      </Title>
      <div
        className={twMerge(
          "border border-gray-300 rounded-lg bg-gray-50",
          errors[id] && "border-red-400",
        )}
      >
        <select
          className="block w-full h-[43px] p-[10px] border-r-[16px] border-transparent rounded-lg text-[12px] text-gray-900 outline-none"
          {...register(id, {
            required: required && "필수 입력란입니다. 항목을 선택해주세요.",
          })}
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
      {errors[id]?.message && (
        <p className="mt-[4px] text-[11px] font-normal text-red-500">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default SelectDiv;
