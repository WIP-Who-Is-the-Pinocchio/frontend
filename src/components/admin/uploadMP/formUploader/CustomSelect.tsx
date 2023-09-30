import React from "react";

interface CustomSelectProps {
  id: string;
  optionList: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ optionList }) => {
  return (
    <div className="border border-gray-300 rounded-lg bg-gray-50">
      <select
        id="id"
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
  );
};

export default CustomSelect;
