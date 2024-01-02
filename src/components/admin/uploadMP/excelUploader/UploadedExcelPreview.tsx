import React from "react";
import { MPDataType } from "../types";
import { excelDataKeys } from "../resources";

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
      <div className="relative h-[32rem] whitespace-nowrap overflow-x-auto overflow-scroll shadow-md">
        <table className="w-full text-gray-500 text-[14px] text-left">
          <thead className="sticky top-0 z-20 bg-gray-50 text-[12px] text-gray-700 shadow-[0px_3px_15px_-4px_rgba(0,0,0,.15)]">
            <tr>
              <th
                scope="col"
                className="sticky left-0 bg-white px-[24px] py-[12px] whitespace-nowrap"
              >
                이름
              </th>
              <th
                scope="col"
                className="sticky left-0 bg-white px-[24px] py-[12px] whitespace-nowrap"
              >
                지역구
              </th>
              {excelDataKeys.slice(5).map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="sticky left-0 bg-white px-[24px] py-[12px] whitespace-nowrap"
                >
                  {key}
                </th>
              ))}
              <th
                scope="col"
                className="sticky right-0 z-10 px-[24px] py-[12px] bg-white whitespace-nowrap"
              ></th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((data, index) => {
              const profile = data["프로필"];
              const name = data["이름"];
              const region = data["행정구역"];
              const district = data["지역구"];
              const section = data["분구"];
              return (
                <tr key={index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="flex items-center sticky left-0 z-10 px-[24px] py-[12px] bg-white text-gray-900 whitespace-nowrap shadow-[5px_0px_8px_-4px_rgba(0,0,0,.15)]"
                  >
                    <div
                      style={{ backgroundImage: `url(${profile})` }}
                      className={`w-[40px] h-[40px] border border-gray-200 rounded-full bg-cover bg-top`}
                    />
                    <div className="pl-[12px]">
                      <div className="text-[14px] font-semibold">{name}</div>
                    </div>
                  </th>
                  <td className="px-[24px] py-[12px] text-[12px] whitespace-nowrap">
                    {region} {district} {section}
                  </td>
                  {excelDataKeys.slice(5).map((key) => (
                    <td
                      key={key}
                      className="px-[24px] py-[12px] text-[12px] whitespace-nowrap"
                    >
                      {data[key]}
                    </td>
                  ))}
                  <td className="sticky right-0 z-10 px-[24px] py-[12px] bg-white whitespace-nowrap">
                    <button
                      className="py-[4px] px-[8px] border border-red-400 rounded bg-stone-100 text-[12px] text-red-500"
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
      <div className="flex justify-between items-center py-[28px] pb-[16px] bg-white">
        <button
          type="button"
          className="flex justify-center items-center px-[12px] py-[6px] border border-gray-300 rounded-lg bg-white text-[13px] text-gray-500 font-medium hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={handleClickResetButton}
        >
          초기화
        </button>
        <button
          type="button"
          className="flex justify-center items-center w-[80px] px-[12px] py-[6px] rounded-lg bg-purple-400 text-[13px] text-white font-medium focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-200"
          onClick={handleClickUploadButton}
        >
          업로드
        </button>
      </div>
    </>
  );
};

export default UploadedExcelPreview;
