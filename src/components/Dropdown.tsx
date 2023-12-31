import { useState, FC } from "react";

import { SearchConditionType } from "../types/searchCondition.type";

interface DropdownProps {
  items: SearchConditionType[];
  selectedItem: string;
  onSelectedItem: (selectItem: SearchConditionType) => void;
}

const Dropdown: FC<DropdownProps> = ({ items, selectedItem, onSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: SearchConditionType) => {
    onSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-36 h-8 mr-10 text-black border rounded"
        >
          {selectedItem}
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-36 rounded-md bg-white z-30">
          <div className="rounded-md text-center ring-1 ring-black ring-opacity-5">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className="text-black block px-4 py-2 hover:bg-purple-50 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
