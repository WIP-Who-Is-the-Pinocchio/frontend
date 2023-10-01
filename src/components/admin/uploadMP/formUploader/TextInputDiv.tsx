import React from "react";
import Title from "./Title";
import { UseFormRegister } from "react-hook-form";
import { Inputs, InputKeys } from "./formUploaderResource";
import { FieldErrors } from "react-hook-form";
interface TextInputProps {
  id: InputKeys;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  caption?: string;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}
const TextInputDiv: React.FC<TextInputProps> = ({
  id,
  placeholder,
  required,
  tooltip,
  caption,
  register,
  errors,
}) => {
  return (
    <div className="flex-1">
      <Title isOptional={!required} tooltip={tooltip}>
        {id}
      </Title>
      <input
        id={id}
        className="block w-full h-[44px] p-[10px] border border-gray-300 rounded-lg bg-gray-50 text-[12px] text-gray-900"
        placeholder={placeholder}
        {...register(id, {
          required: required,
          pattern: {
            value: id === "당선횟수" ? /^\d+$/ : /^[ㄱ-ㅎㅏ-ㅣ가-힣\s]*$/,
            message: "입력 형식이 올바르지 않습니다.",
          },
        })}
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

export default TextInputDiv;
