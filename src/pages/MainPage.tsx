import UploadLog from "@components/UploadLog/UploadLog";
import CheckDuplicatedUpload from "@components/CheckDuplicated/CheckDuplicated";

const MainPage: React.FC = () => {
  return (
    <div className="flex gap-10 p-10">
      <div className="flex-1">
        <UploadLog />
      </div>
      <div className="flex-1">
        <CheckDuplicatedUpload />
      </div>
    </div>
  );
};

export default MainPage;
