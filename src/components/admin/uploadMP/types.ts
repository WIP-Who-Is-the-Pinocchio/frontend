//react-hook-form에 등록되는 input types입니다.
export interface InputTypes {
  base_info: {
    //기본정보
    assembly_term: number; //몇대
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

export enum TabType {
  FORM = "FORM",
  EXCEL = "EXCEL",
}

// export interface MPDataType {
//   [key: string]: string | null | number;
// }
export interface MPDataType {
  프로필: string;
  이름: string;
  행정구역: string;
  지역구: string;
  분구: string;
  대수: number;
  당선횟수: number;
  소속정당: string;
  상임위원회: string;
  특별위원회: string | null;
  총공약수: number | null;
  완료: number | null;
  추진중: number | null;
  보류: number | null;
  폐기: number | null;
  기타: number | null;
  국정공약: string | null;
  지역공약: string | null;
  입법공약: string | null;
  재정공약: string | null;
  임기내: string | null;
  임기후: string | null;
  지속사업: string | null;
  신규사업: string | null;
  필요입법공약총수: number | null;
  입법의결완료공약총수: number | null;
  필요재정총액: number | null;
  확보재정총액: number | null;
  집행재정총액: number | null;
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
