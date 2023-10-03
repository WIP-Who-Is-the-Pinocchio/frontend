import React from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InputTypes } from "./formUploaderResource";
import Title from "./Title";

interface TextInputProps {
  id: keyof InputTypes;
  type?: string;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  caption?: string;
  register: UseFormRegister<InputTypes>;
  errors: FieldErrors<InputTypes>;
  validationRule?: RegExp;
}

const TextInputDiv: React.FC<TextInputProps> = ({
  id,
  type = "string",
  placeholder,
  required,
  tooltip,
  caption,
  register,
  errors,
  validationRule,
}) => {
  const handleSetValue = (value: string, type: string) => {
    if (type === "number") {
      return parseFloat(value);
    }

    return value;
  };

  return (
    <div className="flex-1">
      <Title isOptional={!required} tooltip={tooltip}>
        {id}
      </Title>
      <input
        id={id}
        type={type}
        className={twMerge(
          "block w-full h-[44px] p-[10px] border border-gray-300 rounded-lg bg-gray-50 text-[12px] text-gray-900 outline-none",
          errors[id] && "border-red-400",
        )}
        placeholder={placeholder}
        {...register(id, {
          required: required && "필수 입력란을 작성해주세요.",
          pattern: {
            value: validationRule || /.*/,
            message: "입력 형식이 올바르지 않습니다.",
          },
          setValueAs: (value) => handleSetValue(value, type),
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
