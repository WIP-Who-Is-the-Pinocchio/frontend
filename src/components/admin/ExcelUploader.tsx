import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type Politician = {
  [key: string]: string;
};

function ExcelUploader() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [excelData, setExcelData] = useState<Politician[] | null>(null);
  let keyArr: string[] = [];
  if (excelData) keyArr = Object.keys(excelData[0]);

  useEffect(() => {
    if (excelData) {
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }
  }, [excelData]);

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

  const resetHandler = () => {
    setExcelData(null);
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
  } else
    return (
      <>
        <div className="relative overflow-x-auto h-[32rem] overflow-scroll whitespace-nowrap shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 border-b border-gray-200 bg-gray-50 sticky top-0 z-20">
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap bg-white sticky left-0 z-10"
              >
                {keyArr[1]}
              </th>
              {keyArr.slice(2).map((key) => (
                <th scope="col" className="px-6 py-3 whitespace-nowrap" key={key}>
                  {key}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                삭제
              </th>
            </thead>
            <tbody>
              {excelData && (
                <>
                  {excelData.map((data, index) => (
                    <tr key={data["이름"]} className="bg-white border-b">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap bg-white sticky left-0 z-10 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.25)] "
                      >
                        <div
                          style={{ backgroundImage: `url(${data[keyArr[0]]})` }}
                          className={`w-10 h-10 border border-gray-200 rounded-full  bg-cover bg-top`}
                        />
                        <div className="pl-3">
                          <div className="text-[14px] font-semibold">
                            {data[keyArr[1]]}
                          </div>
                        </div>
                      </th>
                      {keyArr.slice(2).map((key) => (
                        <td key={key} className="text-[12px] px-6 py-4 whitespace-nowrap">
                          {data[key]}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-[14px] text-violet-600  hover:underline cursor-pointer">
                          삭제
                        </p>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between pb-4 bg-white py-7">
          <div>
            <button
              className="flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-[13px] px-3 py-1.5 "
              type="button"
              onClick={resetHandler}
            >
              초기화
            </button>
          </div>
        </div>
      </>
    );
}

export default ExcelUploader;
