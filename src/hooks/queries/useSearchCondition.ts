import { useQuery } from "@tanstack/react-query";
import qs from "qs";

import { get } from "@api/instance";
import { MPDataType } from "../../types/MPData.type";
import { SearchConditionType } from "../../types/searchCondition.type";

const getQueryString = (condition: SearchConditionType, searchValue: string) => {
  switch (condition) {
    case "이름":
      return qs.stringify({
        name: searchValue,
        page: 0,
        size: 10,
      });
    case "소속 정당":
      return qs.stringify({
        party: searchValue,
        page: 0,
        size: 10,
      });
    case "관할 지역구":
      return qs.stringify({
        jurisdiction: searchValue,
        page: 0,
        size: 10,
      });
  }
};

const useSearchCondition = (
  condition: SearchConditionType,
  searchValue: string,
  isSearchTrigger: boolean,
) => {
  const { data: searchData } = useQuery<MPDataType[]>({
    queryKey: ["searchData"],
    queryFn: async () => {
      const responseData = await get(
        `/politician/search/21?${getQueryString(condition, searchValue)}`,
      );
      return responseData.data;
    },
    initialData: [],
    enabled: isSearchTrigger,
  });

  return { searchData };
};

export default useSearchCondition;
