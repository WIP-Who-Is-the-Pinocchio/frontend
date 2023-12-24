import { SortState, SortDataType } from "../types/sortState.type";
import { MPDataType, MPDataKeys } from "@components/admin/uploadMP/types";

const findKeyByValue = (object: MPDataType, value: string) => {
  return Object.keys(object).find((key) => object[key] === value);
};

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

  const findKey = findKeyByValue(MPDataKeys, selectedKey);

  if (findKey === "constituency") {
    // "constituency" 프로퍼티를 가진 객체 배열을 정렬
    const sortedData = [...data].sort((a, b) => {
      // 배열 내 첫 번째 객체의 "constituency" 프로퍼티 값
      if (Array.isArray(a.constituency) && Array.isArray(b.constituency)) {
        const constituencyA = a.constituency[0];
        const constituencyB = b.constituency[0];

        const regionComparison = constituencyA.region.localeCompare(constituencyB.region);
        if (regionComparison !== 0) {
          return regionComparison;
        }

        const districtComparison = constituencyA.district.localeCompare(
          constituencyB.district,
        );
        if (districtComparison !== 0) {
          return districtComparison;
        }
        return constituencyA.section.localeCompare(constituencyB.section);
      }
      return 0;
    });

    return sortedData;
  }

  return [...data].sort((a, b) => {
    const aValue = typeof a[findKey!] === "number" ? a[findKey!] : String(a[findKey!]);
    const bValue = typeof b[findKey!] === "number" ? b[findKey!] : String(b[findKey!]);

    if (aValue < bValue) return currentSortState === SortState.ASC ? -1 : 1;
    if (aValue > bValue) return currentSortState === SortState.ASC ? 1 : -1;
    return 0;
  });
};

export default sortDataByKey;
