import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderModal from "@components/Modal/HeaderModal";
import { HamburgerIcon } from "@assets/icon";

const Header = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem("accessToken");

  return (
    <>
      <div
        className="flex justify-between w-full px-10 py-5"
        onClick={() => setModalOpen(true)}
      >
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
      {modalOpen && <HeaderModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default Header;
