import { SortState, SortDataType } from "../types/sortState.type";

const sortDataByKey = (
  data: SortDataType,
  sortStates: { [key: string]: SortState },
  selectedKey?: string | null,
): SortDataType => {
  const currentSortState = sortStates[selectedKey!];

  // 선택된 키가 없거나 상태가 NONE이라면 기본 데이터를 반환
  if (!selectedKey || currentSortState === SortState.NONE) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue =
      typeof a[selectedKey!] === "number" ? a[selectedKey!] : String(a[selectedKey!]);
    const bValue =
      typeof b[selectedKey!] === "number" ? b[selectedKey!] : String(b[selectedKey!]);

    if (aValue < bValue) return currentSortState === SortState.ASC ? -1 : 1;
    if (aValue > bValue) return currentSortState === SortState.ASC ? 1 : -1;
    return 0;
  });
};

export default sortDataByKey;
