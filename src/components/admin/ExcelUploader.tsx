import { useState } from "react";
import * as XLSX from "xlsx";

type Politician = {
  [key: string]: string;
};

function ExcelUploader() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [excelData, setExcelData] = useState<Politician[]>();
  let keyArr: string[] = [];
  if (excelData) keyArr = Object.keys(excelData[0]);

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    importFile(file);
  };

  const importFile = async (file: File) => {
    /* get data as an ArrayBuffer */
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e?.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the one you want to read
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(parsedData as Politician[]);
    };

    reader.readAsBinaryString(file);
  };

  if (!isUploaded) {
    return (
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full max-w-2xl h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-medium text-gray-500 ">
              <span className="font-semibold">클릭하여 업로드</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 ">
              xlsx, xlsm, xls, numbers 등 Excel worksheet 포맷 파일
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => fileChangeHandler(e)}
          />
        </label>
      </div>
    );
  }
  return <div>ExcelUploader</div>;
}

export default ExcelUploader;
