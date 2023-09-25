import { Outlet } from "react-router-dom";
import LoginFormInput from "@components/LoginFormInput";

function AdminLogin() {
  return (
    <>
      <div className="bg-blue-300 flex fdfasdf">
        <LoginFormInput label="아이디" id="id" type="text" />
        <Outlet />
      </div>
    </>
  );
}
export default AdminLogin;
