import React from "react";
import { UseFormRegister } from "react-hook-form";
import { InputTypes } from "../types";
import { twMerge } from "tailwind-merge";

interface TableInputProps {
  register: UseFormRegister<InputTypes>;
  registerName: string;
  className?: string;
}

const TableInput: React.FC<TableInputProps> = ({ register, registerName, className }) => {
  const handleSetValue = (value: string) => {
    //Nan리턴 방지를 위해 공백 체크 후 number로 parsing
    if (value !== "") {
      return parseFloat(value);
    }
    return null;
  };

  return (
    <input
      type="number"
      className={twMerge("w-full text-center outline-none", className)}
      {...register(registerName as keyof InputTypes, {
        setValueAs: (value) => handleSetValue(value),
      })}
    />
  );
};

export default TableInput;
