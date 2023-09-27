import FormUploader from "@components/admin/uploadMP/FormUploader";
import ExcelUploader from "@components/admin/uploadMP/ExcelUploader";

interface SelectedTabProps {
  focusedTab: TabType;
}

const SelectedTab: React.FC<SelectedTabProps> = ({ focusedTab }) => {
  if (focusedTab === TabType.FORM) {
    return <FormUploader />;
  }

  if (focusedTab === TabType.EXCEL) {
    return <ExcelUploader />;
  }

  return null;
};

export default SelectedTab;
