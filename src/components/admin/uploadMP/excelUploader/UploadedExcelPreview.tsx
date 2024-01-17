import React from "react";
import { MPDataType } from "../types";
import { excelDataKeys } from "../resources";
import { post } from "@api/instance";

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

  const handleClickUploadButton = async () => {
    const parsedExcelData = parseExcelData(excelData);
    try {
      const res = await post("/politician/bulk", parsedExcelData);
      console.log(res);
      console.log(parsedExcelData);
    } catch (e) {
      alert("등록에 실패하였습니다.");
      console.log(e);
      console.log(parsedExcelData);
    }
  };

  const parseExcelData = (excelData: MPDataType[]) => {
    const parsedExcelData = excelData.map((data) => {
      const national_promise_count = checkPromiseCountDetail(data["국정공약"]);
      const local_promise_count = checkPromiseCountDetail(data["지역공약"]);
      const legislative_promise_count = checkPromiseCountDetail(data["입법공약"]);
      const financial_promise_count = checkPromiseCountDetail(data["재정공약"]);
      const in_term_promise_count = checkPromiseCountDetail(data["임기내"]);
      const after_term_promise_count = checkPromiseCountDetail(data["임기후"]);
      const ongoing_business_promise_count = checkPromiseCountDetail(data["지속사업"]);
      const new_business_promise_count = checkPromiseCountDetail(data["신규사업"]);
      const constituencies = data["지역구"]?.split(",").map((district) => {
        return {
          region: data["행정구역"],
          district: district,
          section: data["분구"],
        };
      }) || [
        {
          region: data["행정구역"],
          district: null,
          section: data["분구"],
        },
      ];
      const committees = data["상임위원회"]?.split(",").map((committee) => {
        return {
          is_main: true,
          name: committee,
        };
      });
      const specialCommittees =
        data["특별위원회"]?.split(",").map((committee) => {
          return {
            is_main: false,
            name: committee,
          };
        }) || [];
      const newdata = {
        base_info: {
          name: data["이름"],
          assembly_term: data["대수"],
          profile_url: data["프로필"],
          political_party: data["소속정당"],
          elected_count: data["당선횟수"],
          total_promise_count: data["총공약수"],
          completed_promise_count: data["완료"],
          in_progress_promise_count: data["추진중"],
          pending_promise_count: data["보류"],
          discarded_promise_count: data["폐기"],
          other_promise_count: data["기타"],
          resolve_required_promise_count: data["필요입법공약총수"],
          resolved_promise_count: data["입법의결완료공약총수"],
          total_required_funds: data["필요재정총액"],
          total_secured_funds: data["확보재정총액"],
          total_executed_funds: data["집행재정총액"],
        },
        promise_count_detail: {
          completed_national_promise_count: national_promise_count[0],
          total_national_promise_count: national_promise_count[1],
          completed_local_promise_count: local_promise_count[0],
          total_local_promise_count: local_promise_count[1],
          completed_legislative_promise_count: legislative_promise_count[0],
          total_legislative_promise_count: legislative_promise_count[1],
          completed_financial_promise_count: financial_promise_count[0],
          total_financial_promise_count: financial_promise_count[1],
          completed_in_term_promise_count: in_term_promise_count[0],
          total_in_term_promise_count: in_term_promise_count[1],
          completed_after_term_promise_count: after_term_promise_count[0],
          total_after_term_promise_count: after_term_promise_count[1],
          completed_ongoing_business_promise_count: ongoing_business_promise_count[0],
          total_ongoing_business_promise_count: ongoing_business_promise_count[1],
          completed_new_business_promise_count: new_business_promise_count[0],
          total_new_business_promise_count: new_business_promise_count[1],
        },
        constituency: [...constituencies],
        committee: [...committees, ...specialCommittees],
      };
      return newdata;
    });

    return parsedExcelData;
  };

  const checkPromiseCountDetail = (PromiseCount: string | number | null) => {
    if (PromiseCount === 0) {
      return [0, 0];
    }

    if (PromiseCount === null) {
      return [null, null];
    }

    const PromiseCountArr = String(PromiseCount)
      .split("/")
      .map((el) => {
        if (isNaN(Number(el))) {
          return null;
        }
        parseInt(el);
      });

    if (PromiseCountArr.length === 1) {
      return [PromiseCountArr[0], null];
    }

    if (String(PromiseCount)[0] === "/") {
      return [null, PromiseCountArr[1]];
    }

    return PromiseCountArr;
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
                      {data[key as keyof MPDataType]}
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
