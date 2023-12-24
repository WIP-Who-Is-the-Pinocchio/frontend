import React from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import close from "@assets/icon/close.svg";

interface ModalProps {
  className?: string;
  onClose: () => void;
}
//dim에 대한 이벤트처리

const HeaderModal: React.FC<ModalProps> = ({ className, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="w-1/5 h-full fixed top-0 z-10" onClick={onClose}>
      <div
        className={twMerge(`w-full h-full bg-purple-400`, className)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="absolute right-3 top-2 cursor-pointer" onClick={onClose}>
          <img className="w-[10px]" src={close} alt="모달닫기버튼" />
        </button>
        <div className="px-5 py-10 text-white	">관리자 계정입니다.</div>
        <div
          className="flex items-center px-5 h-20 text-white cursor-pointer hover:bg-purple-600"
          onClick={() => navigate("/admin/search")}
        >
          국회의원 검색
        </div>
        <div
          className="flex items-center px-5 h-20 text-white cursor-pointer hover:bg-purple-600"
          onClick={() => navigate("/admin/uploadMP")}
        >
          국회의원 업로드
        </div>
      </div>
    </div>
  );
};

export default HeaderModal;
