import React from "react";
interface TextInputProps {
  id?: string;
  placeholder?: string;
}
const TextInput: React.FC<TextInputProps> = ({ id, placeholder }) => {
  return (
    <input
      id={id}
      className=" h-[43px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
      placeholder={placeholder}
      required
    />
  );
};

export default TextInput;
