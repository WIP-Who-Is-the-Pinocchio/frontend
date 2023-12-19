export interface LogDataType {
  admin_nickname: string;
  action: string;
  politician_name: string;
  created_at: string;
}

export interface PoliticianListType {
  id: number;
  name: string;
}

export interface DuplicatedDataType {
  region: string;
  district: string;
  section: string;
  politician_list: PoliticianListType[];
}

export interface IntegrityDataType {
  duplicated_jurisdiction: DuplicatedDataType[];
  incomplete_politician: string[];
}
