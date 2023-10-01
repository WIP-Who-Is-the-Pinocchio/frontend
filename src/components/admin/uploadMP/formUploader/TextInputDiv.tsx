import React from "react";
import Title from "./Title";
import { UseFormRegister } from "react-hook-form";
import { Inputs, InputKeys } from "./formUploaderResource";

interface TextInputProps {
  title: string;
  id: InputKeys;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  caption?: string;
  register: UseFormRegister<Inputs>;
}
const TextInputDiv: React.FC<TextInputProps> = ({
  title,
  id,
  placeholder,
  required,
  tooltip,
  caption,
  register,
}) => {
  return (
    <div className="flex-1">
      <Title isOptional={!required} tooltip={tooltip}>
        {title}
      </Title>
      <input
        id={id}
        className="block w-full h-[44px] p-[10px] border border-gray-300 rounded-lg bg-gray-50 text-[12px] text-gray-900"
        placeholder={placeholder}
        {...register(id, { required: required })}
      />
      {caption && (
        <p className="mt-[4px] text-[11px] font-normal text-gray-500">*{caption}</p>
      )}
    </div>
  );
};

export default TextInputDiv;
