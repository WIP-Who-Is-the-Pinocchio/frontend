export enum SortState {
  NONE = "NONE",
  ASC = "ASC",
  DESC = "DESC",
}

export type ConstituencyType = {
  id: string | number;
  region: string;
  district: string;
  section: string;
};

export type SortDataType = Array<{
  [key: string]: string | number | Array<ConstituencyType>;
}>;
