import React from "react";

interface DataInputProps {
  label: string;
  type: string;
  id: string;
}

function LoginFormInput({ label, type, id }: DataInputProps) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} />
      </div>
    </>
  );
}

export default LoginFormInput;
