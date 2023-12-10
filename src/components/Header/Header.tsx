import { useNavigate } from "react-router-dom";

import { HamburgerIcon } from "@assets/icon";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  return (
    <div className="flex justify-between w-full px-10 py-5">
      <img src={HamburgerIcon} alt="hamburger" className="w-10 cursor-pointer" />
      {token ? (
        <button
          className=""
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.reload();
          }}
        >
          로그아웃
        </button>
      ) : (
        <button className="" onClick={() => navigate("/admin/login")}>
          로그인
        </button>
      )}
    </div>
  );
};

export default Header;
