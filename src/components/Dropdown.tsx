import { useState, Dispatch, SetStateAction } from "react";

interface DropdownProps {
  items: string[];
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({ items, selectedItem, setSelectedItem }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-300 text-black rounded px-4 py-2"
        >
          {selectedItem || "Toggle Dropdown"}
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white z-10">
          <div className="rounded-md ring-1 ring-black ring-opacity-5">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className="text-black block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
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
