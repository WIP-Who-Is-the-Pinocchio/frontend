import React from "react";
import tooltipIcon from "@assets/icon/exclamation mark.svg";

interface InputTitleProps {
  children: React.ReactNode;
  isOptional?: boolean | false;
  tooltip?: string;
}

const Title: React.FC<InputTitleProps> = ({ isOptional, children, tooltip }) => {
  return (
    <h3 className="flex items-center gap-[3px] mb-[8px] text-[14px] font-medium text-gray-900 ">
      {children}
      {isOptional ? (
        <span className=" text-blue-400 h-full align-middle font-normal text-[12px]">
          (선택)
        </span>
      ) : (
        <span className="text-red-500 ">*</span>
      )}
      {tooltip && (
        <button className="group relative ml-[3px]">
          <img src={tooltipIcon} alt="도움말" className="w-[12px]" />
          <span className="pointer-events-none p-[10px] text-[11px] text-left text-slate-500 group-hover:opacity-100 transition-opacity w-[290px] border bg-white absolute opacity-0 z-10">
            {tooltip}
          </span>
        </button>
      )}
    </h3>
  );
};

export default Title;
