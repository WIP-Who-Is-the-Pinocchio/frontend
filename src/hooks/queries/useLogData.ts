import { useQuery } from "@tanstack/react-query";

import { LogDataType } from "../../types/admin.type";
import { get } from "@api/instance";

const useLogData = () => {
  const { data: adminLogData } = useQuery<LogDataType[]>({
    queryKey: ["adminLogData"],
    queryFn: async () => {
      const responseData = await get(`/admin-log`);
      return responseData.data;
    },
    initialData: [],
  });

  return { adminLogData };
};

export default useLogData;
