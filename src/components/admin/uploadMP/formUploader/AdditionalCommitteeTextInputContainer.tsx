import React from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InputTypes } from "../types";
import Title from "./Title";

interface AdditionalCommitteeTextInputContainerProps {
  id: keyof InputTypes;
  title: string;
  index: number;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  caption?: string;
  errors: FieldErrors<InputTypes>;
  onChangeValue: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickDelete: (index: number) => void;
}

const AdditionalCommitteeTextInputContainer: React.FC<
  AdditionalCommitteeTextInputContainerProps
> = ({
  id,
  title,
  index,
  value,
  type = "string",
  placeholder,
  required,
  tooltip,
  caption,
  errors,
  onChangeValue,
  onClickDelete,
}) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Title isOptional={!required} tooltip={tooltip}>
          {title}
        </Title>
        <p
          onClick={() => onClickDelete(index)}
          className="mb-[8px] mr-[8px] text-gray-500 cursor-pointer"
        >
          &times;
        </p>
      </div>
      <input
        type={type}
        className={twMerge(
          "block w-full h-[44px] p-[10px] border border-gray-300 rounded-lg text-[12px] text-gray-900 outline-none",
          errors[id] && "border-red-400",
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeValue(index, e)}
      />
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

export default AdditionalCommitteeTextInputContainer;
