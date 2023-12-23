import { TableType } from "./types";

//form에서 사용될 data입니다.
export const formResource = {
  status_of_promise: <TableType>{
    title: "공약 이행 현황",
    subtitle:
      "총 공약수 = 완료 + 추진 중 + 보류 + 폐기 + 기타 공약 수 (합계가 일치해야 함)\n*자료가 없는 경우 작성 X",
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
      "각 분류별로 완료 공약 수 및 전체 공약수를 기입 (완료 공약수 / 전체 공약수)\n*자료가 없는 경우 작성 X",
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
      "필요입법 공약 총 수: 입법이 필요한 공약의 총 수\n*입법 의결 완료 공약 총 수: 입법을 모두 완료(의결)한 공약의 총 수\n*자료가 없는 경우 작성 X",
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
    subtitle: "전체 공약의 재정 현황 합계\n*자료가 없는 경우 작성 X",
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

export const excelDataKeys = [
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
