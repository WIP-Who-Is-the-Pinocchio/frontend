import React from "react";
import LoginFormInput from "@components/LoginFormInput";

function AdminLogin() {
  return (
    <>
      <div>
        <LoginFormInput label="아이디" id="id" type="text" />
      </div>
    </>
  );
}
export default AdminLogin;
