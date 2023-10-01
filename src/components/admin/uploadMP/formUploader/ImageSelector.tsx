import React, { ChangeEventHandler, useState } from "react";
import Title from "./Title";

interface ImageSelectorProps {}

const ImageSelector: React.FC<ImageSelectorProps> = () => {
  const [profileImage, setProfileImage] = useState<File>();
  const handleSetProfile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("이미지를 선택해주세요.");
      return;
    }
    setProfileImage(file);
  };
  const handleDeleteProfile = () => {
    setProfileImage(undefined);
  };

  return (
    <div className="flex flex-col">
      <Title>프로필</Title>
      <div className=" flex justify-center items-center w-[140px] h-full border bg-neutral-100">
        {profileImage ? (
          <img
            src={URL.createObjectURL(profileImage)}
            className="object-cover w-full h-full "
          />
        ) : (
          <p className="text-[12px] text-gray-400">프로필 이미지</p>
        )}
      </div>
      <div className="flex justify-center gap-[5px]">
        <label
          htmlFor="profileInput"
          className=" py-1.5 px-3 mt-[10px] text-sm font-medium text-gray-900 focus:outline-none bg-neutral-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
        >
          등록
        </label>
        <input
          id="profileInput"
          type="file"
          onChange={handleSetProfile}
          accept="image/*"
          className="hidden"
        />
        <button
          className="py-1.5 px-3 mt-[10px] text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          onClick={handleDeleteProfile}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default ImageSelector;
