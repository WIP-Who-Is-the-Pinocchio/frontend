import React from "react";
import Title from "./Title";

interface CustomSelectProps {
  title: string;
  optionList: string[];
  required?: boolean | false;
  tooltip?: string;
  caption?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

const SelectRegion: React.FC<CustomSelectProps> = ({
  title,
  optionList,
  required,
  tooltip,
  onChange,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Title isOptional={!required} tooltip={tooltip}>
          {title}
        </Title>
        <p className="mb-[8px] mr-[8px] text-gray-500 cursor-pointer">&times;</p>
      </div>
      <div className={"border border-gray-300 rounded-lg bg-gray-50"}>
        <select
          className="block w-full h-[43px] p-[10px] border-r-[16px] border-transparent rounded-lg text-[12px] text-gray-900 outline-none"
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
    </div>
  );
};

export default SelectRegion;
