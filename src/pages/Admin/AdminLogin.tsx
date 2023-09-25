import React from "react";
import { Outlet } from "react-router-dom";
import LoginFormInput from "@components/LoginFormInput";

interface AdminLoginProps {}

const AdminLogin: React.FC<AdminLoginProps> = () => {
  return (
    <div className="bg-blue-300 flex">
      <LoginFormInput label="아이디" id="id" type="text" />
      <Outlet />
    </div>
  );
};

export default AdminLogin;
