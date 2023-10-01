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
    <div className="flex-1">
      <Title isOptional={isOptional} tooltip={tooltip}>
        {title}
      </Title>
      <input
        id={id}
        className="block w-full h-[44px] p-[10px] border border-gray-300 rounded-lg bg-gray-50 text-[12px] text-gray-900"
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
