import React from "react";
import close from "@assets/close.svg";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal, width = 80 }) => {
  return (
    <div
      className="fixed w-full h-full bg-opacity-75 bg-black flex justify-center items-center top-0 left-0 z-50"
      onClick={closeModal}
    >
      <div
        className={`fixed rounded-lg bg-white p-4 flex flex-col items-center w-[${width}px]`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}

        <button onClick={closeModal} className="absolute right-3 top-2 cursor-pointer">
          <img src={close} alt="모달닫기버튼" width={"10px"} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
