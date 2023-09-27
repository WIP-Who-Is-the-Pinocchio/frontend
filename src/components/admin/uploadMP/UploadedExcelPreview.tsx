import React from "react";
import { MPDataType, MPDataKeys } from "./types";

interface UploadedExcelPreviewProps {
  excelData: MPDataType[];
  onUpdateExcelData: (excel: MPDataType[]) => void;
}
const UploadedExcelPreview: React.FC<UploadedExcelPreviewProps> = ({
  excelData,
  onUpdateExcelData,
}) => {
  const handleClickDeleteButton = (index: number) => {
    const isConfirmed = confirm(
      `${excelData[index]["이름"]} 의원 정보를 삭제하시겠습니까?`,
    );
    if (!isConfirmed) return;

    onUpdateExcelData([...excelData.slice(0, index), ...excelData.slice(index + 1)]);
  };

  const handleClickResetButton = () => {
    onUpdateExcelData([]);
  };

  const handleClickUploadButton = () => {
    alert("작업 예정 😉");
  };

  return (
    <>
      <div className="relative overflow-x-auto h-[32rem] overflow-scroll whitespace-nowrap shadow-md">
        <table className="w-full text-[14px] text-left text-gray-500 ">
          <thead className="text-[12px] text-gray-700 bg-gray-50 sticky top-0 z-20 shadow-[0px_3px_15px_-4px_rgba(0,0,0,.15)]">
            <tr>
              <th
                scope="col"
                className="px-[24px] py-[12px] whitespace-nowrap bg-white sticky left-0"
              >
                {MPDataKeys[1]}
              </th>
              {MPDataKeys.slice(2).map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-[24px] py-[12px] whitespace-nowrap"
                >
                  {key}
                </th>
              ))}
              <th
                scope="col"
                className="px-[24px] py-[12px] whitespace-nowrap bg-white sticky right-0 z-10"
              ></th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((data, index) => {
              const profile = data[MPDataKeys[0]];
              const name = data[MPDataKeys[1]];
              return (
                <tr key={name + index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="flex items-center px-[24px] py-[12px] text-gray-900 whitespace-nowrap bg-white sticky left-0 z-10 shadow-[5px_0px_8px_-4px_rgba(0,0,0,.15)]"
                  >
                    <div
                      style={{ backgroundImage: `url(${profile})` }}
                      className={`w-[40px] h-[40px] border border-gray-200 rounded-full  bg-cover bg-top`}
                    />
                    <div className="pl-[12px]">
                      <div className="text-[14px] font-semibold">{name}</div>
                    </div>
                  </th>
                  {MPDataKeys.slice(2).map((key) => (
                    <td
                      key={key}
                      className="text-[12px] px-[24px] py-[12px] whitespace-nowrap"
                    >
                      {data[key]}
                    </td>
                  ))}
                  <td className="px-[24px] py-[12px] bg-white whitespace-nowrap sticky right-0 z-10">
                    <button
                      className="bg-stone-100 border border-red-400 text-[12px] text-red-500 rounded py-[4px] px-[8px]"
                      onClick={() => handleClickDeleteButton(index)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between pb-[16px] bg-white py-[28px]">
        <button
          type="button"
          className="flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-[13px] px-[12px] py-[6px]"
          onClick={handleClickResetButton}
        >
          초기화
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-20 text-white bg-purple-300 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg text-[13px] px-[12px] py-[6px]"
          onClick={handleClickUploadButton}
        >
          업로드
        </button>
      </div>
    </>
  );
};

export default UploadedExcelPreview;
