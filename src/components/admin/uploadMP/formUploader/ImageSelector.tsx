import React, { ChangeEventHandler, useState } from "react";
import { UseFormRegister, UseFormResetField } from "react-hook-form";
import { InputTypes } from "../types";
import Title from "./Title";

interface ImageSelectorProps {
  register: UseFormRegister<InputTypes>;
  resetField: UseFormResetField<InputTypes>;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ register, resetField }) => {
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
    resetField("프로필");
  };

  return (
    <div className="flex flex-col">
      <Title isOptional={true}>프로필</Title>
      <div className="flex justify-center items-center w-[150px] h-[200px] border rounded-lg bg-neutral-100">
        {profileImage ? (
          <img
            src={URL.createObjectURL(profileImage)}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <p className="text-[12px] text-gray-400 text-center">
            프로필 이미지를
            <br />
            등록해주세요.
          </p>
        )}
      </div>
      <div className="flex justify-center gap-[5px]">
        <label
          htmlFor="profileInput"
          className="py-[6px] px-[12px] mt-[10px] border border-gray-200 rounded-lg text-[12px] font-medium text-gray-900 bg-neutral-50 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
        >
          등록
        </label>
        <input
          id="profileInput"
          type="file"
          accept="image/*"
          className="hidden"
          {...register("프로필", {
            onChange: (e) => handleSetProfile(e),
          })}
        />
        <button
          className="py-[6px] px-[12px] mt-[10px] border border-gray-200 rounded-lg text-[12px] font-medium text-gray-900 bg-neutral-50 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
          onClick={handleDeleteProfile}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default ImageSelector;
