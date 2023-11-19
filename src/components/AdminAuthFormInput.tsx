import React, { forwardRef, Ref } from "react";
import { Path } from "react-hook-form";
import { AdminAuthFormInputs } from "@utils/Types/adminAuthTypes";
import { twMerge } from "tailwind-merge";
interface LoginFormInput {
  label: string;
  type: string;
  id: Path<AdminAuthFormInputs>;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const AdminAuthFormInput: React.FC<LoginFormInput> = forwardRef(
  (
    { label, type = "text", id, placeholder, onChange, className },
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <div className="flex flex-col m-[10px] ">
        <label className="text-[10px] font-normal text-slate-400 my-1" htmlFor={id}>
          {label}
        </label>
        <input
          className={twMerge(
            "p-[5px] h-[25px] placeholder:text-[10px] rounded focus:outline-none text-[10px]",
            className,
          )}
          type={type}
          id={id}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  },
);

export default AdminAuthFormInput;
