//react-hook-form에 등록되는 input types입니다.
export interface InputTypes {
  profile: File;
  name: string;
  affiliatedParty: string; //소속정당
  numberOfElections: number; //당선횟수
  region: string; //지역구
  subRegion: string; //세부지역구
  division: string; //분구
  standingCommittees: string; //상임위원회
  additionalStandingCommittees: string[]; //추가 상임위원회
  statusOfPledge: {
    //공약이행현황
    total: {
      //총공약수
      value: number;
      notes: string;
    };
    completed: {
      //완료
      value: number;
      notes: string;
    };
    inProgress: {
      //추진중
      value: number;
      notes: string;
    };
    onHold: {
      //보류
      value: number;
      notes: string;
    };
    discarded: {
      //폐기
      value: number;
      notes: string;
    };
    other: {
      //기타
      value: number;
      notes: string;
    };
  };
  completionStatusByTheme: {
    //성격내용별완료현황
    national: { done: number; total: number; notes: string }; //국정공약
    regional: { done: number; total: number; notes: string }; //지역공약
    legislative: { done: number; total: number; notes: string }; //입법공약
    financial: { done: number; total: number; notes: string }; //재정공약
    duringTerm: { done: number; total: number; notes: string }; //임기내
    afterTerm: { done: number; total: number; notes: string }; //임기후
    continuous: { done: number; total: number; notes: string }; //지속사업
    new: { done: number; total: number; notes: string }; //신규사업
  };
  legislativeStatus: {
    //입법현황
    required: {
      //필요입법공약총수
      value: number;
      notes: string;
    };
    completed: {
      //입법의결완료공약총수
      value: number;
      notes: string;
    };
  };
  financialStatus: {
    //재정현황
    required: {
      //필요재정총액
      value: number;
      notes: string;
    };
    secured: {
      //확보재정총액
      value: number;
      notes: string;
    };
    executed: {
      //집행재정총액
      value: number;
      notes: string;
    };
  };
}

//form 내부 table에 들어갈 자료 type입니다.
export interface TableType {
  title: string;
  subtitle: string;
  theadList: string[];
  // | (keyof InputTypes["statusOfPledge"])[]
  // | (keyof InputTypes["completionStatusByTheme"])[]
  //   | (keyof InputTypes['legislativeStatus'])[]
  //   | (keyof InputTypes["financialStatus"])[];
  tbody: string;
  unit: string;
  registerName: registerNameType[];
  required: boolean;
}

type registerNameType =
  | `statusOfPledge.${keyof InputTypes["statusOfPledge"]}`
  | `completionStatusByTheme.${keyof InputTypes["completionStatusByTheme"]}`
  | `legislativeStatus.${keyof InputTypes["legislativeStatus"]}`
  | `financialStatus.${keyof InputTypes["financialStatus"]}`;

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
  statusOfPledge: <TableType>{
    title: "공약 이행 현황",
    subtitle:
      "총 공약수 = 완료 + 추진 중 + 보류 + 폐기 + 기타 공약 수 (합계가 일치해야 함)\n*자료가 없는 경우 0으로 작성",
    theadList: ["총공약수", "완료", "추진중", "보류", "폐기", "기타"],
    tbody: "공약수",
    registerName: [
      "statusOfPledge.total",
      "statusOfPledge.completed",
      "statusOfPledge.inProgress",
      "statusOfPledge.onHold",
      "statusOfPledge.discarded",
      "statusOfPledge.other",
    ],
    required: true,
  },
  completionStatusByTheme: <TableType>{
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
      "completionStatusByTheme.national",
      "completionStatusByTheme.regional",
      "completionStatusByTheme.legislative",
      "completionStatusByTheme.financial",
      "completionStatusByTheme.duringTerm",
      "completionStatusByTheme.afterTerm",
      "completionStatusByTheme.continuous",
      "completionStatusByTheme.new",
    ],
    required: true,
  },
  legislativeStatus: <TableType>{
    title: "입법 현황",
    subtitle:
      "필요입법 공약 총 수: 입법이 필요한 공약의 총 수\n*입법 의결 완료 공약 총 수: 입법을 모두 완료(의결)한 공약의 총 수\n*자료가 없는 경우 0으로 작성",
    theadList: ["필요입법공약총수", "입법의결완료공약총수"],
    tbody: "공약수",
    registerName: ["legislativeStatus.required", "legislativeStatus.completed"],
    required: true,
  },
  financialStatus: <TableType>{
    title: "재정 현황",
    subtitle: "전체 공약의 재정 현황 합계",
    theadList: ["필요재정총액", "확보재정총액", "집행재정총액"],
    tbody: "금액",
    unit: "원",
    registerName: [
      "financialStatus.required",
      "financialStatus.secured",
      "financialStatus.executed",
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

export const MPDataKeys = {
  name: "이름",
  constituency: "지역구",
  political_party: "소속정당",
  elected_count: "당선횟수",
  total_promise_count: "총공약수",
  completed_promise_count: "완료",
  in_progress_promise_count: "추진중",
  pending_promise_count: "보류",
  discarded_promise_count: "폐기",
  other_promise_count: "기타",
  resolve_required_promise_count: "필요입법공약총수",
  total_required_funds: "필요재정총액",
  total_secured_funds: "확보재정총액",
  total_executed_funds: "집행재정총액",
};
