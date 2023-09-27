import React from "react";
import * as XLSX from "xlsx";
import { ChangeEventHandler } from "react";
import { MPDataType, MPDataKeys } from "./types";

interface ExcelUploadPreparationProps {
  onUpdateExcelData: (excel: MPDataType[]) => void;
}

const ExcelUploadPreparation: React.FC<ExcelUploadPreparationProps> = ({
  onUpdateExcelData,
}) => {
  const importFile = (file: File) => {
    //fileReader 객체 생성 (파일을 비동기적으로 읽을 수 있는 객체)
    const reader = new FileReader();

    //선택한 파일을 이진 문자열 형태로 읽음
    reader.readAsBinaryString(file);

    //파일 읽기 완료 후에 실행할 콜백함수
    reader.onload = (e) => {
      if (!e.target) return;
      //첨부된 파일 data
      const data = e.target.result;
      //data를 이진(binary)형식으로 읽고 워크북(엑셀 파일)로 변환
      const workbook = XLSX.read(data, { type: "binary" });
      //워크북(엑셀파일) 첫번째 시트 이름 읽어옴
      const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the one you want to read
      //워크북(엑셀파일) 첫번째 시트 읽어옴
      const worksheet = workbook.Sheets[sheetName];
      //선택한 첫번째 시트를 json 형식으로 변환 - 시트의 데이터를 객체의 배열로 변환함
      const parsedData: MPDataType[] = XLSX.utils.sheet_to_json(worksheet);

      if (validateFile(parsedData)) onUpdateExcelData(parsedData);
    };
  };

  const handleChangeExcelFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    importFile(file);
  };

  const validateFile = (excelData: MPDataType[]) => {
    if (excelData.length === 0) {
      alert("파일에 내용이 없습니다.");
      return false;
    }

    if (!MPDataKeys.every((key) => Object.keys(excelData[0]).includes(key))) {
      alert("필수 포함 항목이 누락되었습니다. 업로드 유의사항을 확인해주세요.");
      return false;
    }

    return true;
  };

  const handleClickDownloadExampleFile = () => {
    const excelFileName = "국회의원 신규 업로드 양식.xlsx";
    // 새로운 워크북(엑셀 파일) 생성
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // 데이터를 담을 시트(테이블) 생성
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([MPDataKeys]);
    // 시트를 워크북에 추가
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // 엑셀 파일 다운로드
    XLSX.writeFile(wb, excelFileName);
  };

  return (
    <div className="max-w-[768px] flex flex-col  m-auto">
      <div className=" w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-[256px] border-[2px] border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
        >
          <div className="flex flex-col items-center justify-center pt-[20px] pb-[24px]">
            <svg
              className="w-[32px] h-[32px] mb-[16px] text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-[8px] text-medium text-gray-500 font-semibold">
              클릭하여 업로드
            </p>
            <p className="text-[12px] text-gray-500 ">
              xlsx, xlsm, xls, numbers 등 Excel worksheet 포맷 파일
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleChangeExcelFile}
          />
        </label>
      </div>
      <div className=" w-full my-[20px] bg-violet-50 p-[16px] border border-purple-300 rounded text-gray-800">
        <h3 className="text-[15px] font-medium ">엑셀 업로드 유의사항</h3>
        <ul className="text-gray-700 list-disc list-inside text-[14px] my-[8px]">
          <li>시트의 1행은 헤더(열 제목)로 구성되어있어야 합니다.</li>
          <li>시트가 2개 이상인 경우 첫번째 시트만 업로드됩니다.</li>
          <li className="max-w-[672px]">
            필수 포함 항목:
            <p className="text-gray-500 ml-[20px]">
              프로필, 이름, 지역구, 소속정당, 당선횟수, 상임위원회, 총공약수, 완료,
              추진중, 보류, 폐기, 기타, 국정공약, 지역공약, 입법공약, 재정공약, 임기내,
              임기후, 지속사업, 신규사업, 필요입법공약총수, 필요재정총액, 확보재정총액,
              집행재정총액
            </p>
          </li>
        </ul>
        <p className="text-[14px] text-gray-700">
          국회의원 신규 업로드 양식 -&nbsp;
          <span
            className="underline decoration-[1px] cursor-pointer text-blue-500"
            onClick={handleClickDownloadExampleFile}
          >
            다운로드
          </span>
        </p>
      </div>
    </div>
  );
};

export default ExcelUploadPreparation;