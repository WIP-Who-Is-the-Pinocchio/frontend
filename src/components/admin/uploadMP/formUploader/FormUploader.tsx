import { useForm, SubmitHandler } from "react-hook-form";
import React, { ChangeEventHandler, useState } from "react";
import CustomSelect from "./CustomSelect";
import InputTitle from "./InputTitle";
import TextInput from "./TextInput";
import Table from "./Table";
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

const 공약이행현황 = {
  title: "공약 이행 현황",
  subtitle:
    "총 공약수 = 완료 + 추진 중 + 보류 + 폐기 + 기타 공약 수 (합계가 일치해야 함)",
  theadList: ["총공약", "완료", "추진중", "보류", "폐기", "기타"],
  tbodyList: ["공약수"],
};
const 성격내용별완료현황 = {
  title: "성격·내용별 공약 이행 완료 현황",
  subtitle:
    "총 공약수 = 완료 + 추진 중 + 보류 + 폐기 + 기타 공약 수 (합계가 일치해야 함)",
  theadList: [
    "국정공약",
    "지역공약",
    "입법공약",
    "재정공약",
    "임기내",
    "임기후",
    "지속사업",
    "신규사업",
  ],
  tbodyList: ["완료 공약수", "전체 공약수"],
};

const 입법현황 = {
  title: "입법 현황",
  subtitle:
    "필요입법 공약 총 수: 입법이 필요한 공약의 총 수,\n입법 의결 완료 공약 총 수: 입법을 모두 완료(의결)한 공약의 총 수",
  theadList: ["필요입법 공약 총 수", "입법 의결 완료 공약 총 수"],
  tbodyList: ["공약수"],
};
const 재정현황 = {
  title: "재정 현황",
  subtitle: "전체 공약의 재정 현황 합계",
  theadList: ["필요재정 총액", "확보재정 총액", "집행재정 총액"],
  tbodyList: ["금액"],
  unit: "원",
};

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
              <InputTitle>이름</InputTitle>
              <TextInput placeholder="예) 홍길동" />
            </div>
            <div>
              <InputTitle>소속 정당</InputTitle>
              <CustomSelect id="정당" optionList={정당리스트} />
            </div>
            <div>
              <InputTitle>당선 횟수</InputTitle>
              <TextInput placeholder="예) 1" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex gap-[20px]">
            <div className="flex-1">
              <InputTitle
                tooltip="의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
                    의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도
                    의회운영위원이 되는 경우를 제외하고는 다른 상임위원회의 의원이 되는
                    일은 있을 수 없다. 다만 상임위원은 그 수에 제한없이 특별위원회의
                    위원을 겸직할 수 있다. -의회용어사전"
              >
                상임위원회
              </InputTitle>

              <CustomSelect id="상임위원회" optionList={상임위원회리스트} />
            </div>
            <div className="flex-1">
              <InputTitle isOptional={true}>위원회 추가입력</InputTitle>
              <TextInput />
              <p className="mt-[4px] text-[11px] font-normal text-gray-500">
                *겸직 위원의 경우에만 작성. 2개 이상은 띄어쓰기로 구분
              </p>
            </div>
          </div>
          <div className="flex gap-[20px]">
            <div className=" flex-1">
              <InputTitle>지역구</InputTitle>
              <CustomSelect id="지역구" optionList={지역구리스트} />
            </div>
            <div className="flex-1">
              <InputTitle>세부 지역구</InputTitle>
              <TextInput placeholder="예) 안양시 동안구" />
            </div>
            <div className=" flex-1">
              <InputTitle isOptional={true}>분구</InputTitle>
              <CustomSelect id="분구" optionList={분구리스트} />
              <p className="mt-[4px] text-[11px] font-normal text-gray-500">
                *분구 지역인 경우에만 선택
              </p>
            </div>
          </div>
        </div>
      </div>
      <Table
        title={공약이행현황.title}
        subtitle={공약이행현황.subtitle}
        theadList={공약이행현황.theadList}
        tbodyList={공약이행현황.tbodyList}
      />
      <Table
        title={성격내용별완료현황.title}
        subtitle={성격내용별완료현황.subtitle}
        theadList={성격내용별완료현황.theadList}
        tbodyList={성격내용별완료현황.tbodyList}
      />
      <Table
        title={입법현황.title}
        subtitle={입법현황.subtitle}
        theadList={입법현황.theadList}
        tbodyList={입법현황.tbodyList}
      />

      <Table
        title={재정현황.title}
        subtitle={재정현황.subtitle}
        theadList={재정현황.theadList}
        tbodyList={재정현황.tbodyList}
        unit={재정현황.unit}
      />
    </form>
  );
};

export default FormUploader;
