import React from "react";
import Title from "./Title";

interface TextInputProps {
  title: string;
  id: string;
  placeholder?: string;
  isOptional?: boolean | false;
  tooltip?: string;
  caption?: string;
}
const TextInputDiv: React.FC<TextInputProps> = ({
  title,
  id,
  placeholder,
  isOptional,
  tooltip,
  caption,
}) => {
  return (
    <div className="flex-1 ">
      <Title isOptional={isOptional} tooltip={tooltip}>
        {title}
      </Title>
      <input
        id={id}
        className=" h-[44px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        placeholder={placeholder}
        required
      />
      {caption && (
        <p className="mt-[4px] text-[11px] font-normal text-gray-500">*{caption}</p>
      )}
    </div>
  );
};

export default TextInputDiv;
