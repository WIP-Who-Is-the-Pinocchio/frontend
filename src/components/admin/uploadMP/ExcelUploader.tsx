import { useEffect, useState } from "react";
import ExcelUploadPreparation from "./ExcelUploadPreparation";
import UploadedExcelPreview from "./UploadedExcelPreview";
import { MPDataType } from "./types";

interface ExcelUploaderProps {}

const ExcelUploader: React.FC<ExcelUploaderProps> = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [excelData, setExcelData] = useState<MPDataType[]>([]);

  useEffect(() => {
    setIsUploaded(Boolean(excelData.length > 0));
  }, [excelData]);

  const handleUpdateExcelData = (excel: MPDataType[]) => {
    setExcelData(excel);
  };

  if (isUploaded) {
    return (
      <UploadedExcelPreview
        excelData={excelData}
        onUpdateExcelData={handleUpdateExcelData}
      />
    );
  } else {
    return <ExcelUploadPreparation onUpdateExcelData={handleUpdateExcelData} />;
  }
};

export default ExcelUploader;
