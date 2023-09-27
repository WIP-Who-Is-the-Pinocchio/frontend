import { useState } from "react";
import { twMerge } from "tailwind-merge";
import SelectedTab from "@components/admin/uploadMP/SelectedTab";
import { TabType } from "@components/admin/uploadMP/types";

interface UploadMPProps {}

const UploadMP: React.FC<UploadMPProps> = () => {
  const [focusedTab, setFocusedTab] = useState<TabType>(TabType.EXCEL);

  const handleClickTab = (tab: TabType) => {
    setFocusedTab(tab);
  };

  return (
    <div className="bg-purple-50 w-screen h-screen p-[40px]">
      <div className="bg-white w-full h-full rounded-lg p-[40px]">
        <div className="text-[24px] text-slate-950 font-semibold text-stone-800 pb-[20px]">
          국회의원 신규 업로드
        </div>
        <nav className="text-base font-medium text-center text-gray-500 border-b border-gray-200 ">
          <ul className="flex flex-wrap -mb-px">
            <li
              className={twMerge(
                "px-[16px] py-[12px] cursor-pointer",
                focusedTab === TabType.EXCEL
                  ? "border-b-[2px] border-purple-200 text-purple-500"
                  : "hover:text-gray-600 hover:border-gray-300",
              )}
              onClick={() => handleClickTab(TabType.EXCEL)}
            >
              업로드
            </li>
            <li
              className={twMerge(
                "px-[16px] py-[12px] cursor-pointer",
                focusedTab === TabType.FORM
                  ? "border-b-[2px] border-purple-200 text-purple-500"
                  : "hover:text-gray-600 hover:border-gray-300",
              )}
              onClick={() => handleClickTab(TabType.FORM)}
            >
              직접 입력
            </li>
          </ul>
        </nav>
        <div className="pt-[20px]">
          <SelectedTab focusedTab={focusedTab} />
        </div>
      </div>
    </div>
  );
};

export default UploadMP;
