import useLogData from "@hooks/queries/useLogData";
import { LogDataType } from "../../types/admin.type";

const actionName = {
  bulk_create: "대량 등록",
  create: "등록",
  update: "수정",
  delete: "삭제",
};

const UploadLog = () => {
  const { adminLogData } = useLogData();

  console.log(adminLogData);

  return (
    <div className="bg-purple-50 h-36 p-5 rounded-md overflow-y-scroll drop-shadow-md">
      {adminLogData.map((data: LogDataType) => (
        <div className="pb-1">
          {data.admin_nickname}님이 {data.created_at.split("T")[0]}에{" "}
          {data.politician_name}의원 데이터를{" "}
          {actionName[data.action as keyof typeof actionName]}
          하였습니다.
        </div>
      ))}
    </div>
  );
};

export default UploadLog;
