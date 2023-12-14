import React from "react";
interface ValidationMessageProps {
  isValid: boolean;
  children: React.ReactNode;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ isValid, children }) => {
  if (!isValid) {
    return null;
  }
  return <div className="text-red-500 text-[10px] font-medium">{children}</div>;
};

export default ValidationMessage;
