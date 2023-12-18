import { useQuery } from "@tanstack/react-query";

import { get } from "@api/instance";
import { MPDataType } from "../../types/MPData.type";

const useGetMPData = (assembleTerms: number) => {
  const { data: MPData } = useQuery<MPDataType[]>({
    queryKey: ["MPData"],
    queryFn: async () => {
      const responseData = await get(`/politician/list/${assembleTerms}?page=0&size=10`);
      return responseData.data;
    },
    initialData: [],
  });

  return { MPData };
};

export default useGetMPData;
