import React from "react";
import { MPDataKeys } from "./ExcelUploader";
import { MPDataType } from "./ExcelUploader";

interface UploadedExcelPreviewProps {
  excelData: MPDataType[] | null;
  setExcelData: React.Dispatch<React.SetStateAction<MPDataType[] | null>>;
}
const UploadedExcelPreview: React.FC<UploadedExcelPreviewProps> = ({
  excelData,
  setExcelData,
}) => {
  const handleClickDeleteButton = (index: number) => {
    if (!excelData) return;

    const isConfirmed = confirm(
      `${excelData[index]["이름"]} 의원 정보를 삭제하시겠습니까?`,
    );
    if (!isConfirmed) return;

    setExcelData((prev) => {
      const newList = prev?.slice(0, index).concat(prev.slice(index + 1));
      if (newList === undefined) return null;
      return newList;
    });
  };

  const handleClickResetButton = () => {
    setExcelData(null);
  };

  const handleClickUploadButton = () => {
    alert("작업 예정 😉");
  };

  return (
    <>
      <div className="relative overflow-x-auto h-[32rem] overflow-scroll whitespace-nowrap shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 bg-gray-50 sticky top-0 z-20 shadow-[0px_3px_15px_-4px_rgba(0,0,0,.15)]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap bg-white sticky left-0"
              >
                {MPDataKeys[1]}
              </th>
              {MPDataKeys.slice(2).map((key) => (
                <th scope="col" className="px-6 py-3 whitespace-nowrap" key={key}>
                  {key}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap bg-white sticky right-0 z-10"
              ></th>
            </tr>
          </thead>
          <tbody>
            {excelData && (
              <>
                {excelData.map((data, index) => (
                  <tr key={data["이름"]} className="bg-white border-b">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap bg-white sticky left-0 z-10 shadow-[5px_0px_8px_-4px_rgba(0,0,0,.15)]"
                    >
                      <div
                        style={{ backgroundImage: `url(${data[MPDataKeys[0]]})` }}
                        className={`w-10 h-10 border border-gray-200 rounded-full  bg-cover bg-top`}
                      />
                      <div className="pl-3">
                        <div className="text-[14px] font-semibold">
                          {data[MPDataKeys[1]]}
                        </div>
                      </div>
                    </th>
                    {MPDataKeys.slice(2).map((key) => (
                      <td key={key} className="text-[12px] px-6 py-4 whitespace-nowrap">
                        {data[key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 bg-white whitespace-nowrap sticky right-0 z-10">
                      <button
                        className="bg-stone-100 border border-red-400 text-[12px] text-red-500 rounded py-1 px-2"
                        onClick={() => handleClickDeleteButton(index)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between pb-4 bg-white py-7">
        <button
          className="flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-[13px] px-3 py-1.5 "
          type="button"
          onClick={handleClickResetButton}
        >
          초기화
        </button>
        <button
          onClick={handleClickUploadButton}
          className="flex items-center justify-center w-20 text-white bg-purple-300 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg text-[13px] px-3 py-1.5 "
          type="button"
        >
          업로드
        </button>
      </div>
    </>
  );
};

export default UploadedExcelPreview;
