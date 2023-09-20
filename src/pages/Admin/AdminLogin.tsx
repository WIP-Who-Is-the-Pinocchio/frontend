import React from "react";
import LoginFormInput from "@components/LoginFormInput";

function AdminLogin() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "pink",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            padding: "20px",
            justifyContent: "center",
            width: "378px",
            minHeight: "200px",
            backgroundColor: "skyblue",
          }}
        >
          <div style={{ width: "100%" }}>
            <LoginFormInput label="아이디" id="id" type="text" />
            <LoginFormInput label="비밀번호" id="password" type="password" />
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminLogin;
