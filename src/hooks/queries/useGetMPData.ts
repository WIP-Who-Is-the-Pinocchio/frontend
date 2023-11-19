import { useQuery } from "@tanstack/react-query";

import instance from "@api/instance";
import { MPDataType } from "../../types/MPData.type";

const useGetMPData = (assembleTerms: number) => {
  const { data: MPData } = useQuery<MPDataType[]>({
    queryKey: ["MPData"],
    queryFn: async () => {
      const responseData = await instance.get(
        `/admin/api/v1/politician/list/${assembleTerms}`,
      );
      return responseData.data;
    },
    initialData: [],
  });

  return { MPData };
};

export default useGetMPData;
