import React from "react";
import Title from "./Title";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectDistrictProps {
  title: string;
  optionList: string[];
  selected: string;
  index: number;
  required?: boolean | false;
  tooltip?: string;
  caption?: string;
  onRegister: UseFormRegisterReturn;
  onSelectDistrict: (index: number, event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickDeleteCityComponent: (index: number) => void;
}

const SelectDistrict: React.FC<SelectDistrictProps> = ({
  title,
  optionList,
  selected,
  index,
  required,
  tooltip,
  onRegister,
  onSelectDistrict,
  onClickDeleteCityComponent,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Title isOptional={!required} tooltip={tooltip}>
          {title}
        </Title>
        <p
          onClick={() => onClickDeleteCityComponent(index)}
          className="mb-[8px] mr-[8px] text-gray-500 cursor-pointer"
        >
          &times;
        </p>
      </div>
      <div className={"border border-gray-300 rounded-lg bg-gray-50"}>
        <select
          className="block w-full h-[43px] p-[10px] border-r-[16px] border-transparent rounded-lg text-[12px] text-gray-900 outline-none"
          {...onRegister}
          onChange={(e) => onSelectDistrict(index, e)}
        >
          <option value={""}>선택해주세요.</option>
          {optionList.map((optionItem) => (
            <option
              key={optionItem}
              value={optionItem}
              // selected={optionItem === selected}
            >
              {optionItem}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectDistrict;
