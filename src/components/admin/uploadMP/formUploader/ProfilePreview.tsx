import { Control, UseFormRegister, UseFormResetField, useWatch } from "react-hook-form";
import { InputTypes } from "../types";

interface ImageSelectorProps {
  register: UseFormRegister<InputTypes>;
  resetField: UseFormResetField<InputTypes>;
  control: Control<InputTypes, any>;
}

const ProfilePreview: React.FC<ImageSelectorProps> = ({ control }) => {
  const profile = useWatch({
    control,
    name: "base_info.profile_url", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: "", // default value before the render
  });

  return (
    <div className="flex flex-col">
      <h3 className="mb-[8px] text-[15px] font-medium text-gray-900">프로필 미리보기</h3>
      <div className="flex justify-center items-center w-[150px] h-[200px] border rounded-lg bg-neutral-100">
        {profile ? (
          <img src={profile} className="object-cover w-full h-full rounded-lg" />
        ) : (
          <p className="text-[12px] text-gray-400 text-center">
            프로필 이미지를
            <br />
            등록해주세요.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;
