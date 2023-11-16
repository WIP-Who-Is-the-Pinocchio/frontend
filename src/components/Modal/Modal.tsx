import React from "react";
import close from "@assets/icon/close.svg";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  shouldNavigate?: boolean;
  onClose: () => void;
}
//dim에 대한 이벤트처리

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  shouldNavigate,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (shouldNavigate) {
      navigate("/admin/login");
    }
    onClose();
  };
  return (
    <div
      className=" flex justify-center items-center w-full h-full fixed top-0 left-0 bg-opacity-75 bg-black"
      onClick={handleAction}
    >
      <div
        className={twMerge(
          `flex flex-col items-center fixed rounded-lg p-[25px] bg-white`,
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
        <button className="absolute right-3 top-2 cursor-pointer" onClick={handleAction}>
          <img className="w-[10px]" src={close} alt="모달닫기버튼" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
