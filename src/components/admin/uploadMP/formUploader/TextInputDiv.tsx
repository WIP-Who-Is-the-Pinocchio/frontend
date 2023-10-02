import React from "react";
import Title from "./Title";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { valueTypes } from "./formUploaderResource";
interface TextInputProps {
  id: keyof valueTypes;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  caption?: string;
  register: UseFormRegister<valueTypes>;
  errors: FieldErrors<valueTypes>;
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
