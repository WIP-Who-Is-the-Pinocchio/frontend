import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type MPDataType = {
  [key: string]: string;
};

const MPDataKeys = [
  "프로필",
  "이름",
  "지역구",
  "소속정당",
  "당선횟수",
  "상임위원회",
  "총공약수",
  "완료",
  "추진중",
  "보류",
  "폐기",
  "기타",
  "국정공약",
  "지역공약",
  "입법공약",
  "재정공약",
  "임기내",
  "임기후",
  "지속사업",
  "신규사업",
  "필요입법공약총수",
  "필요재정총액",
  "확보재정총액",
  "집행재정총액",
];

function ExcelUploader() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [excelData, setExcelData] = useState<MPDataType[] | null>(null);

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
      setExcelData(parsedData as MPDataType[]);
    };

    reader.readAsBinaryString(file);
  };

  const deleteItem = (index: number) => {
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

  const resetHandler = () => {
    setExcelData(null);
  };

  const downloadExampleFile = () => {
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

  const clickSubmitButtonHandler = () => {
    alert("작업 예정 😉");
  };

  if (!isUploaded) {
    return (
      <div className="max-w-3xl flex flex-col  m-auto">
        <div className=" w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
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
              <p className="mb-2 text-medium text-gray-500 font-semibold">
                클릭하여 업로드
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
        <div className=" w-full my-5 bg-violet-50 p-4 border border-purple-300 rounded text-gray-800">
          <h3 className="text-[15px] font-medium ">엑셀 업로드 유의사항</h3>
          <ul className="text-gray-700 list-disc list-inside text-[14px] my-2">
            <li>시트의 1행은 헤더(열 제목)로 구성되어있어야 합니다.</li>
            <li>시트가 2개 이상인 경우 첫번째 시트만 업로드됩니다.</li>
            <li className="max-w-2xl">
              필수 포함 항목:
              <p className="text-gray-500 ml-5">
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
              onClick={downloadExampleFile}
              className="underline decoration-1 cursor-pointer text-blue-500"
            >
              다운로드
            </span>
          </p>
        </div>
      </div>
    );
  } else
    return (
      <>
        <div className="relative overflow-x-auto h-[32rem] overflow-scroll whitespace-nowrap shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 bg-gray-50 sticky top-0 z-20 shadow-[0px_3px_15px_-4px_rgba(0,0,0,.15)]">
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
                          onClick={() => deleteItem(index)}
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
            onClick={resetHandler}
          >
            초기화
          </button>
          <button
            onClick={clickSubmitButtonHandler}
            className="flex items-center justify-center w-20 text-white bg-purple-300 focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg text-[13px] px-3 py-1.5 "
            type="button"
          >
            업로드
          </button>
        </div>
      </>
    );
}

export default ExcelUploader;
