import React from "react";

interface EmailAuthBtnProps {
  type: "submit" | "button";
  onClick?: () => void;
}

const EmailAuthBtn: React.FC<EmailAuthBtnProps> = ({ type = "button", onClick }) => {
  return (
    <>
      <button
        className="w-[50px] h-[25px] p-[3px] bg-violet-400 rounded text-[10px] text-white font-semibold"
        type={type}
        onClick={onClick}
      >
        인증하기
      </button>
    </>
  );
};

export default EmailAuthBtn;
