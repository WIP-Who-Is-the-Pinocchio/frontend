export interface MPDataType {
  id: number;
  name: string;
  assembly_term: number;
  profile_url: string;
  political_party: string;
  elected_count: number;
  total_promise_count: number;
  completed_promise_count: number;
  in_progress_promise_count: number;
  pending_promise_count: number;
  discarded_promise_count: number;
  other_promise_count: number;
  resolve_required_promise_count: number;
  resolved_promise_count: number;
  total_required_funds: number;
  total_secured_funds: number;
  total_executed_funds: number;
  constituency: [
    {
      region: string;
      district: string;
      section: string;
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // 문자열 인덱스 서명 추가
}
