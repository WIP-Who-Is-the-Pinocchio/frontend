import { FC } from "react";

import { SortDownArrow, SortIcon } from "@assets/icon";
import { SortState } from "../types/sortState.type";

interface ArrowButtonProps {
  state: SortState;
  isActive: boolean;
}

const ArrowButton: FC<ArrowButtonProps> = ({ state, isActive }) => {
  if (state === SortState.NONE) {
    return <img src={SortIcon} alt="sortIcon" className="w-[14px] h-[14px]" />;
  }

  if (state === SortState.ASC && isActive) {
    return <img src={SortDownArrow} alt="sortDownArrow" className="w-[12px] h-[12px]" />;
  }

  if (state === SortState.DESC && isActive) {
    return (
      <img
        src={SortDownArrow}
        alt="sortUpArrow"
        className="w-[12px] h-[12px] transform rotate-180"
      />
    );
  }

  return <img src={SortIcon} alt="sortIcon" className="w-[14px] h-[14px]" />;
};

export default ArrowButton;
