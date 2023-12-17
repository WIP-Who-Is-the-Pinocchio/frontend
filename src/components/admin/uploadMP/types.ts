//react-hook-form에 등록되는 input types입니다.
export interface InputTypes {
  assembly_term: number; //몇대
  base_info: {
    //기본정보
    profile_url: string;
    name: string;
    political_party: string; //소속정당
    elected_count: number; //당선횟수
    //공약이행현황
    total_promise_count: number; //총공약수
    completed_promise_count: number; //완료
    in_progress_promise_count: number; //추진중
    pending_promise_count: number; //보류
    discarded_promise_count: number; //폐기
    other_promise_count: number; //기타
    //입법현황
    resolve_required_promise_count: number; //필요입법공약총수
    resolved_promise_count: number; //입법의결완료공약총수
    //재정현황
    total_required_funds: number; //필요재정총액
    total_secured_funds: number; //확보재정총액
    total_executed_funds: number; //집행재정총액
  };
  //성격내용별완료현황
  promise_count_detail: {
    completed_national_promise_count: number; //국정공약
    total_national_promise_count: number;
    completed_local_promise_count: number; //지역공약
    total_local_promise_count: number;
    completed_legislative_promise_count: number; //입법공약
    total_legislative_promise_count: number;
    completed_financial_promise_count: number; //재정공약
    total_financial_promise_count: number;
    completed_in_term_promise_count: number; //임기내
    total_in_term_promise_count: number;
    completed_after_term_promise_count: number; //임기후
    total_after_term_promise_count: number;
    completed_ongoing_business_promise_count: number; //지속사업
    total_ongoing_business_promise_count: number;
    completed_new_business_promise_count: number; //신규사업
    total_new_business_promise_count: number;
  };
  constituency: [
    {
      region: string;
      district: null | string;
      section: null | string;
    },
  ];
  committee: [
    {
      is_main: boolean;
      name: string;
    },
  ];
}

//form 내부 table에 들어갈 자료 type입니다.
export interface TableType {
  title: string;
  subtitle: string;
  theadList: string[];
  tbody: string;
  unit: string;
  registerName: string[];
  required: boolean;
}

//form에서 사용될 data입니다.
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
  status_of_promise: <TableType>{
    title: "공약 이행 현황",
    subtitle:
      "총 공약수 = 완료 + 추진 중 + 보류 + 폐기 + 기타 공약 수 (합계가 일치해야 함)\n*자료가 없는 경우 0으로 작성",
    theadList: ["총공약수", "완료", "추진중", "보류", "폐기", "기타"],
    tbody: "공약수",
    registerName: [
      "base_info.total_promise_count",
      "base_info.completed_promise_count",
      "base_info.in_progress_promise_count",
      "base_info.pending_promise_count",
      "base_info.discarded_promise_count",
      "base_info.other_promise_count",
    ],
    required: false,
  },
  completion_status_by_theme: <TableType>{
    title: "성격·내용별 완료 현황",
    subtitle:
      "각 분류별로 완료 공약 수 및 전체 공약수를 기입 (완료 공약수 / 전체 공약수)\n*자료가 없는 경우 0으로 작성",
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
    tbody: "완료 / 전체",
    registerName: [
      "national_promise_count",
      "local_promise_count",
      "legislative_promise_count",
      "financial_promise_count",
      "in_term_promise_count",
      "after_term_promise_count",
      "ongoing__promise_count",
      "new_business_promise_count",
    ],
    required: false,
  },
  legislative_status: <TableType>{
    title: "입법 현황",
    subtitle:
      "필요입법 공약 총 수: 입법이 필요한 공약의 총 수\n*입법 의결 완료 공약 총 수: 입법을 모두 완료(의결)한 공약의 총 수\n*자료가 없는 경우 0으로 작성",
    theadList: ["필요입법공약총수", "입법의결완료공약총수"],
    tbody: "공약수",
    registerName: [
      "base_info.resolve_required_promise_count",
      "base_info.resolved_promise_count",
    ],
    required: false,
  },
  financial_status: <TableType>{
    title: "재정 현황",
    subtitle: "전체 공약의 재정 현황 합계",
    theadList: ["필요재정총액", "확보재정총액", "집행재정총액"],
    tbody: "금액",
    unit: "원",
    registerName: [
      "base_info.total_required_funds",
      "base_info.total_secured_funds",
      "base_info.total_executed_funds",
    ],
    required: false,
  },
};

export enum TabType {
  FORM = "FORM",
  EXCEL = "EXCEL",
}

export interface MPDataType {
  [key: string]: string;
}

export const MPDataKeys = [
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
