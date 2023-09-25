import React from "react";

interface DataInputProps {
  label: string;
  type: string;
  id: string;
}

const LoginFormInput: React.FC<DataInputProps> = ({ label, type, id }) => {
  return (
    <>
      <label htmlFor={label}></label>
      <input type={type} id={id} />
    </>
  );
};

export default LoginFormInput;
