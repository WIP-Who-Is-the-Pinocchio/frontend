import { useEffect, useState } from "react";
import ExcelUploadPreparation from "./ExcelUploadPreparation";
import UploadedExcelPreview from "./UploadedExcelPreview";

export type MPDataType = {
  [key: string]: string;
};

export const MPDataKeys = [
  "프로필",
  "이름",
  "지역구",
  "소속정당",
  "당선횟수",
  "상임위원회",
  "총공약수",
  "완료",
  "추진중",
  "보류",
  "폐기",
  "기타",
  "국정공약",
  "지역공약",
  "입법공약",
  "재정공약",
  "임기내",
  "임기후",
  "지속사업",
  "신규사업",
  "필요입법공약총수",
  "필요재정총액",
  "확보재정총액",
  "집행재정총액",
];

function ExcelUploader() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [excelData, setExcelData] = useState<MPDataType[] | null>(null);

  useEffect(() => {
    if (excelData) {
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }
  }, [excelData]);

  if (isUploaded) {
    return <UploadedExcelPreview excelData={excelData} setExcelData={setExcelData} />;
  } else {
    return <ExcelUploadPreparation setExcelData={setExcelData} />;
  }
}

export default ExcelUploader;
