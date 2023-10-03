import React from "react";
import { UseFormRegister } from "react-hook-form";
import { InputTypes } from "./formUploaderResource";
import { twMerge } from "tailwind-merge";

interface TableInputProps {
  registerName: string;
  register: UseFormRegister<InputTypes>;
  className?: string;
  type?: string;
  required?: boolean;
}

const TableInput: React.FC<TableInputProps> = ({
  registerName,
  register,
  className,
  type = "string",
  required,
}) => {
  const handleSetValue = (value: string, type: string) => {
    //Nan리턴 방지를 위해 공백 체크 후 number로 parsing
    if (type === "number" && value !== "") {
      return parseFloat(value);
    }
    return value;
  };

  return (
    <input
      type={type}
      className={twMerge("w-full text-center outline-none", className)}
      {...register(registerName as keyof InputTypes, {
        required: required,
        setValueAs: (value) => handleSetValue(value, type),
      })}
    />
  );
};

export default TableInput;
