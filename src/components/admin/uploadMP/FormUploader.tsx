import { useForm, SubmitHandler } from "react-hook-form";
import tooltipIcon from "@assets/icon/exclamation mark.svg";
import React, { ChangeEventHandler, useState } from "react";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const 정당리스트 = [
  "더불어민주당",
  "국민의힘",
  "정의당",
  "진보당",
  "기본소득당",
  "시대전환",
  "한국의희망",
  "무소속",
];

const 상임위원회리스트 = [
  "국회운영위원회",
  "법제사법위원회",
  "정무위원회",
  "기획재정위원회",
  "교육위원회",
  "과학기술정보방송통신위원회",
  "외교통일위원회",
  "국방위원회",
  "행정안전위원회",
  "문화체육관광위원회",
  "농림축산식품해양수산위원회",
  "산업통상자원중소벤처기업위원회",
  "환경노동위원회",
  "국토교통위원회",
  "정보위원회",
  "여성가족위원회",
  "보건복지위원회",
];

const 지역구리스트 = [
  "서울특별시",
  "부산광역시",
  "인천광역시",
  "대구광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const 분구리스트 = ["갑", "을", "병", "정", "무"];

const 공약이행현황항목리스트 = ["총공약", "완료", "추진중", "보류", "폐기", "기타"];
const 성격내용별공약이행완료현황항목리스트 = [
  "국정공약",
  "지역공약",
  "입법공약",
  "재정공약",
  "임기내",
  "임기후",
  "지속사업",
  "신규사업",
];

const 재정현황항목리스트 = ["필요재정 총액", "확보재정 총액", "집행재정 총액"];

interface FormUploaderProps {}

const FormUploader: React.FC<FormUploaderProps> = () => {
  const [profileImage, setProfileImage] = useState<File>();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const handleSetProfile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("이미지를 선택해주세요.");
      return;
    }
    setProfileImage(file);
  };
  const handleDeleteProfile = () => {
    setProfileImage(undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
      <h1 className="px-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
        기본정보
      </h1>
      <div className="flex justify-center gap-[30px] mb-[24px]">
        <div className="flex flex-col">
          <h3 className="block mb-2 text-[14px] font-medium text-gray-90">프로필 </h3>
          <div className=" flex justify-center items-center w-[140px] h-full border bg-neutral-100">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                className=" object-cover w-full h-full"
              />
            ) : (
              <p className="text-[12px] text-gray-400">프로필 이미지</p>
            )}
          </div>
          <div className="flex justify-center gap-[5px]">
            <label
              htmlFor="profileInput"
              className=" py-1.5 px-3 mt-[10px] text-sm font-medium text-gray-900 focus:outline-none bg-neutral-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              등록
            </label>
            <input
              id="profileInput"
              type="file"
              onChange={handleSetProfile}
              accept="image/*"
              className="hidden"
            />
            <button
              className="py-1.5 px-3 mt-[10px] text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              onClick={handleDeleteProfile}
            >
              삭제
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-[24px] w-[300px]">
            <div>
              <h3 className=" mb-2 text-[14px] font-medium text-gray-90">이름</h3>
              <input
                id="name"
                className=" h-[43px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                placeholder="예) 홍길동"
                required
              />
            </div>
            <div>
              <h3 className=" mb-2 text-[14px] font-medium text-gray-900">소속정당</h3>
              <div className="border border-gray-300 rounded-lg bg-gray-50">
                <select
                  id="소속정당"
                  className="border-r-[16px] border-transparent h-[43px] rounded-lg text-gray-900 text-sm block w-full p-2.5"
                >
                  <option selected>선택해주세요.</option>
                  {정당리스트.map((정당) => (
                    <option key={정당} value={정당}>
                      {정당}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <h3 className="block mb-2 text-[14px] font-medium text-gray-900">
                당선횟수
              </h3>
              <input
                id="당선횟수"
                className=" h-[43px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                placeholder="예) 1"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex gap-[20px]">
            <div className="flex-1">
              <div className="flex items-center gap-[5px] mb-2">
                <h3 className=" text-[14px]  font-medium text-gray-900 ">상임위원회</h3>
                <button className="group relative">
                  <img src={tooltipIcon} alt="도움말" className="w-[12px]" />
                  <span className="pointer-events-none p-[10px] text-[11px] text-left text-slate-500 group-hover:opacity-100 transition-opacity w-[290px] border bg-white absolute opacity-0 z-10">
                    의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
                    의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도
                    의회운영위원이 되는 경우를 제외하고는 다른 상임위원회의 의원이 되는
                    일은 있을 수 없다. 다만 상임위원은 그 수에 제한없이 특별위원회의
                    위원을 겸직할 수 있다.
                    <br />
                    -의회용어사전
                  </span>
                </button>
              </div>
              <div className="border border-gray-300 rounded-lg bg-gray-50">
                <select
                  id="상임위원회"
                  className="border-r-[16px] border-transparent h-[43px] rounded-lg text-gray-900 text-sm block w-full p-2.5"
                >
                  <option selected>선택해주세요.</option>
                  {상임위원회리스트.map((상임위원회) => (
                    <option key={상임위원회} value={상임위원회}>
                      {상임위원회}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="flex items-center gap-[3px] text-[14px] mb-2 font-medium text-gray-900 ">
                위원회 추가입력
                <span className=" text-blue-400 h-full align-middle font-normal text-[12px]">
                  (선택)
                </span>
              </h3>
              <input
                id="위원회겸직"
                className="h-[43px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              />
              <p className="mt-[4px] text-[11px] font-normal text-gray-500">
                *겸직 위원의 경우에만 작성. 2개 이상은 띄어쓰기로 구분
              </p>
            </div>
          </div>
          <div className="flex gap-[20px]">
            <div className=" flex-1">
              <h3 className=" text-[14px] font-medium text-gray-900 ">지역구</h3>
              <div className="border border-gray-300 rounded-lg bg-gray-50">
                <select
                  id="지역구"
                  className="border-r-[16px] border-transparent h-[43px] rounded-lg text-gray-900 text-sm block w-full p-2.5"
                >
                  <option selected>선택해주세요.</option>
                  {지역구리스트.map((지역구) => (
                    <option key={지역구} value={지역구}>
                      {지역구}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1">
              <h3 className=" text-[14px] font-medium text-gray-900 ">세부지역구</h3>
              <input
                id="세부지역구"
                placeholder="예) 안양시 동안구"
                className="h-[43px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              />
            </div>
            <div className=" flex-1">
              <h3 className="flex items-center gap-[3px] text-[14px] font-medium text-gray-900 ">
                분구
                <span className=" text-blue-400 h-full align-middle font-normal text-[12px]">
                  (선택)
                </span>
              </h3>
              <div className="border border-gray-300 rounded-lg bg-gray-50">
                <select
                  id="분구"
                  className="border-r-[16px] border-transparent h-[43px] rounded-lg text-gray-900 text-sm block w-full p-2.5"
                >
                  <option selected>선택해주세요.</option>
                  {분구리스트.map((분구) => (
                    <option key={분구} value={분구}>
                      {분구}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-[4px] text-[11px] font-normal text-gray-500">
                *분구 지역인 경우에만 선택
              </p>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full text-[12px] text-gray-500 border shadow-md">
        <caption className="p-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
          공약 이행 현황
          <p className="mt-[4px] text-[11px] font-normal text-gray-500">
            *총 공약수 = 완료 + 추진 중 + 보류 + 폐기 + 기타 공약 수 (합계가 일치해야 함)
          </p>
        </caption>
        <thead className="text-[12px] text-gray-700 bg-gray-100 border">
          <tr className="border">
            <th className="border"></th>
            {공약이행현황항목리스트.map((항목명) => (
              <th scope="col" className="px-[24px] py-[12px] border">
                {항목명}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              공약 수
            </th>
            {Array.from({ length: 6 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              비고
            </th>
            {Array.from({ length: 6 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <table className="w-full text-[12px] text-gray-500 border shadow-md">
        <caption className="p-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
          성격·내용별 공약 이행 완료 현황
          <p className="mt-[4px] text-[11px] font-normal text-gray-500 ">
            *각 분류별로 완료 공약 수 및 전체 공약 수를 기입
          </p>
        </caption>
        <thead className="text-[12px] text-gray-700 bg-gray-100 border">
          <tr className="border">
            <th className="border"></th>
            {성격내용별공약이행완료현황항목리스트.map((항목명) => (
              <th scope="col" className="px-[24px] py-[12px] border">
                {항목명}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              완료 공약 수
            </th>
            {Array.from({ length: 8 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              전체 공약 수
            </th>
            {Array.from({ length: 8 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              비고
            </th>
            {Array.from({ length: 8 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <table className="w-full text-[12px] text-gray-500 border shadow-md">
        <caption className="p-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
          입법 현황
          <p className="mt-[4px] text-[11px] font-normal text-gray-500 ">
            *필요입법 공약 총 수: 입법이 필요한 공약의 총 수 <br />
            *입법 의결 완료 공약 총 수: 입법을 모두 완료(의결)한 공약의 총 수
          </p>
        </caption>
        <thead className="text-[12px] text-gray-700 bg-gray-100 border">
          <tr className="border">
            <th className="border"></th>
            <th scope="col" className="px-[24px] py-[12px] border">
              필요입법 공약 총 수
            </th>
            <th scope="col" className="px-[24px] py-[12px] border">
              입법 의결 완료 공약 총 수
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              공약 수
            </th>
            {Array.from({ length: 2 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              비고
            </th>
            {Array.from({ length: 2 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <table className="w-full text-[12px] text-gray-500 border shadow-md">
        <caption className="p-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
          재정현황
          <p className="mt-[4px] text-[11px] font-normal text-gray-500 ">
            *전체 공약의 재정 현황 합계
          </p>
        </caption>
        <thead className="text-[12px] text-gray-700 bg-gray-100 border">
          <tr className="border">
            <th className="border"></th>
            {재정현황항목리스트.map((항목명) => (
              <th scope="col" className="px-[24px] py-[12px] border">
                {항목명}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              금액
            </th>
            {Array.from({ length: 3 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <div className="flex">
                  <input key={index} type="text" className="w-full outline-none" />
                  <span>원</span>
                </div>
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[24px] py-[16px] font-medium text-gray-900 whitespace-nowrap "
            >
              비고
            </th>
            {Array.from({ length: 3 }).map((_, index) => (
              <td className="px-[24px] py-[16px] border">
                <input key={index} type="text" className="w-full outline-none" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default FormUploader;
