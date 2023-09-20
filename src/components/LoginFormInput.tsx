import React from "react";

interface DataInputProps {
  label: string;
  type: string;
  id: string;
}

function LoginFormInput({ label, type, id }: DataInputProps) {
  return (
    <>
      <label htmlFor={label}></label>
      <input type={type} id={id} />
    </>
  );
}

export default LoginFormInput;
