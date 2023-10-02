export interface valueTypes {
  프로필: File;
  이름: string;
  지역구: string;
  세부지역구: string;
  분구: string;
  소속정당: string;
  당선횟수: number;
  상임위원회: string;
  추가상임위원회: string[];
  공약이행현황: {
    총공약수: number;
    완료: number;
    추진중: number;
    보류: number;
    폐기: number;
    기타: number;
  };
  성격내용별완료현황: {
    국정공약: { 완료: number; 전체: number };
    지역공약: { 완료: number; 전체: number };
    입법공약: { 완료: number; 전체: number };
    재정공약: { 완료: number; 전체: number };
    임기내: { 완료: number; 전체: number };
    임기후: { 완료: number; 전체: number };
    지속사업: { 완료: number; 전체: number };
    신규사업: { 완료: number; 전체: number };
  };
  입법현황: {
    필요입법공약총수: number;
    입법의결완료공약총수: number;
  };
  재정현황: {
    필요재정총액: number;
    확보재정총액: number;
    집행재정총액: number;
  };
}

export const formResource = {
  정당리스트: [
    "더불어민주당",
    "국민의힘",
    "정의당",
    "진보당",
    "기본소득당",
    "시대전환",
    "한국의희망",
    "무소속",
  ],
  상임위원회리스트: [
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
  ],
  지역구리스트: [
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
  ],
  분구리스트: ["갑", "을", "병", "정", "무"],
  공약이행현황: <ResourceType>{
    title: "공약이행현황",
    subtitle:
      "총 공약수 = 완료 + 추진 중 + 보류 + 폐기 + 기타 공약 수 (합계가 일치해야 함)",
    theadList: ["총공약수", "완료", "추진중", "보류", "폐기", "기타"],
    tbodyList: ["공약수"],
    registerField: [
      "공약이행현황.총공약수",
      "공약이행현황.완료",
      "공약이행현황.추진중",
      "공약이행현황.보류",
      "공약이행현황.폐기",
      "공약이행현황.기타",
    ],
  },
  성격내용별완료현황: <ResourceType>{
    title: "성격내용별완료현황",
    subtitle:
      "각 분류별로 완료 공약 수 및 전체 공약수를 기입 (완료 공약수 / 전체 공약수)",
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
    tbodyList: ["완료 / 전체"],
    registerField: [
      "성격내용별완료현황.국정공약",
      "성격내용별완료현황.지역공약",
      "성격내용별완료현황.입법공약",
      "성격내용별완료현황.재정공약",
      "성격내용별완료현황.임기내",
      "성격내용별완료현황.임기후",
      "성격내용별완료현황.지속사업",
      "성격내용별완료현황.신규사업",
    ],
  },
  입법현황: <ResourceType>{
    title: "입법현황",
    subtitle:
      "필요입법 공약 총 수: 입법이 필요한 공약의 총 수,\n입법 의결 완료 공약 총 수: 입법을 모두 완료(의결)한 공약의 총 수",
    theadList: ["필요입법공약총수", "입법의결완료공약총수"],
    tbodyList: ["공약수"],
    registerField: ["입법현황.필요입법공약총수", "입법현황.입법의결완료공약총수"],
  },
  재정현황: <ResourceType>{
    title: "재정현황",
    subtitle: "전체 공약의 재정 현황 합계",
    theadList: ["필요재정총액", "확보재정총액", "집행재정총액"],
    tbodyList: ["금액"],
    unit: "원",
    registerField: [
      "재정현황.필요재정총액",
      "재정현황.확보재정총액",
      "재정현황.집행재정총액",
    ],
  },
};

export interface ResourceType {
  title: keyof valueTypes;
  subtitle: string;
  theadList:
    | (keyof valueTypes["입법현황"])[]
    | (keyof valueTypes["성격내용별완료현황"])[]
    | (keyof valueTypes["공약이행현황"])[]
    | (keyof valueTypes["재정현황"])[];
  tbodyList: string[];
  unit: string;
  registerField: registerFieldType[];
}

type registerFieldType =
  | `공약이행현황.${keyof valueTypes["공약이행현황"]}`
  | `성격내용별완료현황.${keyof valueTypes["성격내용별완료현황"]}`
  | `입법현황.${keyof valueTypes["입법현황"]}`
  | `재정현황.${keyof valueTypes["재정현황"]}`;
