import { useState } from "react";
import FormUploader from "@components/admin/uploadMP/FormUploader";
import ExcelUploader from "@components/admin/uploadMP/ExcelUploader";

enum TabType {
  Form = "form",
  Excel = "excel",
}

const SelectedTab = ({ focusedTab }: { focusedTab: string }) => {
  if (focusedTab === TabType.Form) {
    return <FormUploader />;
  } else if (focusedTab === TabType.Excel) {
    return <ExcelUploader />;
  }
  return null;
};

const UploadMP = () => {
  const [focusedTab, setFocuseTab] = useState<string>(TabType.Excel);

  const tabChangeHandler = (tab: string) => {
    setFocuseTab(tab);
  };

  return (
    <div className="bg-purple-50 w-screen h-screen p-10">
      <div className="bg-white w-full h-full rounded-lg p-10">
        <div className="text-2xl text-slate-950 font-semibold text-stone-800 pb-5">
          국회의원 신규 업로드
        </div>
        <nav className="text-base font-medium text-center text-gray-500 border-b border-gray-200 ">
          <ul className="flex flex-wrap -mb-px">
            <li
              className={`px-4 py-3 cursor-pointer ${
                focusedTab === TabType.Excel
                  ? "border-b-2 border-purple-200 text-purple-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => tabChangeHandler(TabType.Excel)}
            >
              업로드
            </li>
            <li
              className={`px-4 py-3 cursor-pointer ${
                focusedTab === TabType.Form
                  ? "border-b-2 border-purple-200 text-purple-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => tabChangeHandler(TabType.Form)}
            >
              직접 입력
            </li>
          </ul>
        </nav>
        <div className="pt-5">
          <SelectedTab focusedTab={focusedTab} />
        </div>
      </div>
    </div>
  );
};

export default UploadMP;
