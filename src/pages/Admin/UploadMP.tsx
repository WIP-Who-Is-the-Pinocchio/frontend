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
    <div className="w-full h-full min-h-screen p-[40px] bg-purple-50">
      <div className="w-full h-full p-[40px] bg-white rounded-lg">
        <div className="pb-[20px] text-[24px] font-semibold text-stone-800">
          국회의원 신규 업로드
        </div>
        <nav className="border-b border-gray-200 text-[16px] font-medium text-gray-500 text-center">
          <ul className="flex flex-wrap -mb-px">
            <li
              className={twMerge(
                "px-[16px] py-[12px] cursor-pointer",
                focusedTab === TabType.EXCEL
                  ? "border-b-[2px] border-purple-200 text-purple-500"
                  : "hover:border-gray-300 hover:text-gray-600",
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
                  : "hover:border-gray-300 hover:text-gray-600",
              )}
              onClick={() => handleClickTab(TabType.FORM)}
            >
              직접 입력
            </li>
          </ul>
        </nav>
        <div className="pt-[20px] max-w-[1024px] mx-auto">
          <SelectedTab focusedTab={focusedTab} />
        </div>
      </div>
    </div>
  );
};

export default UploadMP;
