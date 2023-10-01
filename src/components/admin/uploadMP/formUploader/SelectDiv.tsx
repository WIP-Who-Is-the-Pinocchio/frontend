import React from "react";
import Title from "./Title";

interface CustomSelectProps {
  title: string;
  id: string;
  optionList: string[];
  isOptional?: boolean | false;
  tooltip?: string;
  caption?: string;
}

const SelectDiv: React.FC<CustomSelectProps> = ({
  title,
  isOptional,
  tooltip,
  id,
  optionList,
  caption,
}) => {
  return (
    <div className="flex-1 ">
      <Title isOptional={isOptional} tooltip={tooltip}>
        {title}
      </Title>
      <div className="border border-gray-300 rounded-lg bg-gray-50">
        <select
          id={id}
          className="border-r-[16px] border-transparent h-[43px] rounded-lg text-gray-900 text-sm block w-full p-2.5"
        >
          <option selected>선택해주세요.</option>
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
    </div>
  );
};

export default SelectDiv;
