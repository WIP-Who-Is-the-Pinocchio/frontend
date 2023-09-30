import React from "react";
import tooltipIcon from "@assets/icon/exclamation mark.svg";

interface InputTitleProps {
  children: React.ReactNode;
  isOptional?: boolean | false;
  tooltip?: string;
}

const InputTitle: React.FC<InputTitleProps> = ({ isOptional, children, tooltip }) => {
  return (
    <h3 className="flex items-center gap-[3px] mb-[8px] text-[14px] font-medium text-gray-900 ">
      {children}
      {isOptional && (
        <span className=" text-blue-400 h-full align-middle font-normal text-[12px]">
          (선택)
        </span>
      )}
      {tooltip && (
        <button className="group relative ml-[3px]">
          <img src={tooltipIcon} alt="도움말" className="w-[12px]" />
          <span className="pointer-events-none p-[10px] text-[11px] text-left text-slate-500 group-hover:opacity-100 transition-opacity w-[290px] border bg-white absolute opacity-0 z-10">
            의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
            의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도 의회운영위원이
            되는 경우를 제외하고는 다른 상임위원회의 의원이 되는 일은 있을 수 없다. 다만
            상임위원은 그 수에 제한없이 특별위원회의 위원을 겸직할 수 있다.
            <br />
            -의회용어사전
          </span>
        </button>
      )}
    </h3>
  );
};

export default InputTitle;
