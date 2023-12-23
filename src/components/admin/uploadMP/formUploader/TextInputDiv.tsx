import React from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegisterReturn } from "react-hook-form";
import Title from "./Title";

interface TextInputProps {
  title: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  caption?: string;
  onRegister: UseFormRegisterReturn;
  ErrorMessage: JSX.Element | undefined;
}

const TextInputDiv: React.FC<TextInputProps> = ({
  title,
  type = "string",
  placeholder,
  required,
  tooltip,
  caption,
  onRegister,
  ErrorMessage,
}) => {
  return (
    <div className="">
      <Title isOptional={!required} tooltip={tooltip}>
        {title}
      </Title>
      <input
        type={type}
        className={twMerge(
          "block w-full h-[44px] p-[10px] border border-gray-300 rounded-lg text-[12px] text-gray-900 outline-none",
          ErrorMessage && "border-red-400",
        )}
        placeholder={placeholder}
        {...onRegister}
      />
      {caption && (
        <p className="mt-[4px] text-[11px] font-normal text-gray-500">*{caption}</p>
      )}
      {ErrorMessage}
    </div>
  );
};

export default TextInputDiv;
