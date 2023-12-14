import React from "react";

interface EmailAuthBtnProps {
  type: "submit" | "button";
  children: string;
  onClick?: () => void;
}

const EmailAuthBtn: React.FC<EmailAuthBtnProps> = ({
  type = "button",
  onClick,
  children,
}) => {
  return (
    <>
      <button
        className="w-[50px] h-[25px] p-[3px] bg-violet-400 rounded text-[10px] text-white font-semibold"
        type={type}
        onClick={onClick}
      >
        {/* {showEmailAuthModal ? "재요청" : "인증하기"} */}
        {children}
      </button>
    </>
  );
};

export default EmailAuthBtn;
