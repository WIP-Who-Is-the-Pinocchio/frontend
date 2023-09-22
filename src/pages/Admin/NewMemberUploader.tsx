import { useState } from "react";
import FormUploader from "@components/admin/FormUploader";
import ExcelUploader from "@components/admin/ExcelUploader";

enum TabType {
  Form = "form",
  Excel = "excel",
}

function NewMemberUploader() {
  const [focusedTab, setFocuseTab] = useState<string>(TabType.Form);

  const tabChangeHandler = (tab: string) => {
    setFocuseTab(tab);
  };

  return (
    <div className="bg-violet-50 w-screen h-screen p-10">
      <div className="bg-white w-full h-full rounded-lg p-10">
        <div className="text-2xl text-slate-950 font-bold pb-5">국회의원 신규 업로드</div>
        <nav className="text-base font-medium text-center text-gray-500 border-b border-gray-200 ">
          <ul className="flex flex-wrap -mb-px">
            <li
              className={`px-4 py-3 ${
                focusedTab === TabType.Form
                  ? "border-b-2 border-violet-200 text-violet-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => tabChangeHandler(TabType.Form)}
            >
              직접 입력
            </li>
            <li
              className={`px-4 py-3  ${
                focusedTab === TabType.Excel
                  ? "border-b-2 border-violet-200 text-violet-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => tabChangeHandler(TabType.Excel)}
            >
              업로드
            </li>
          </ul>
        </nav>
        <div>
          <UploadTab focusedTab={focusedTab} />
        </div>
      </div>
    </div>
  );
}

export default NewMemberUploader;

const UploadTab = ({ focusedTab }: { focusedTab: string }) => {
  if (focusedTab === TabType.Form) {
    return <FormUploader />;
  } else if (focusedTab === TabType.Excel) {
    return <ExcelUploader />;
  }
  return null;
};
