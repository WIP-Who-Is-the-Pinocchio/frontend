import axios from "axios";

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // 로그인 페이지로 리디렉션
  window.alert("세션 만료로 로그아웃 되었습니다. 다시 로그인해주세요.");
  // window.location.href = "/admin/login";
};

export default logout;
