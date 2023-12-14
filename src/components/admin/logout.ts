import axios from "axios";

const logout = async () => {
  const adminId = localStorage.getItem("adminId");
  const logout_res = await axios.post(
    `http://localhost:2309/admin/api/v1/auth/logout?${adminId}`,
  );
  console.log(logout_res);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // 로그인 페이지로 리디렉션
  // window.location.href = "/login";
  window.alert("로그아웃 되었습니다.");
};

export default logout;
