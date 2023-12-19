import useIntegrityData from "@hooks/queries/useIntegrityData";
import { DuplicatedDataType } from "../../types/admin.type";

const CheckDuplicatedUpload = () => {
  const { integrityData } = useIntegrityData();

  return (
    <div className="bg-purple-50 h-36 p-5 rounded-md overflow-y-scroll drop-shadow-md">
      {integrityData?.duplicated_jurisdiction.map((data: DuplicatedDataType) => (
        <div className="pb-1">
          `${data.region} ${data.district} ${data.section}` {data.politician_list[0].name}
          의 데이터가 중복 업로드 되었습니다.
        </div>
      ))}
    </div>
  );
};

export default CheckDuplicatedUpload;
