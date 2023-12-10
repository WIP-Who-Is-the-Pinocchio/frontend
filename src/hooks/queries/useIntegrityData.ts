import { useQuery } from "@tanstack/react-query";

import { IntegrityDataType } from "../../types/admin.type";
import { get } from "@api/instance";

const useIntegrityData = () => {
  const { data: integrityData } = useQuery<IntegrityDataType>({
    queryKey: ["integrityData"],
    queryFn: async () => {
      const response = await get(`/integrity-error`);
      return response.data;
    },
  });

  return { integrityData };
};
export default useIntegrityData;
