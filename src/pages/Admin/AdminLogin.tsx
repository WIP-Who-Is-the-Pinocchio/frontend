import React, { useState } from "react";
import LoginFormInput from "@components/LoginFormInput";
import ButtonBox from "@components/Button";
import logo from "@assets/wipLogo.svg";
import Modal from "@components/Modal/Modal.tsx";

const AdminLogin: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFormChanger =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleLogin = () => {
    //로그인 로직
    // console.log(id, password);
    setIsModalOpen(true);
  };
  return (
    <>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <div>모달 내용입니다.</div>
        </Modal>
      )}
      <div className="flex justify-center items-center min-h-[100vh] ">
        <div className="flex flex-col items-start p-4 justify-center w-[378px] min-h-200 bg-[#faf5ff] rounded">
          <div className="w-full">
            <img src={logo} alt="wip logo" />
            <div className="font-semibold  text-xl my-2">로그인</div>
            <LoginFormInput
              label="아이디"
              id="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={getFormChanger(setId)}
            />
            <LoginFormInput
              label="비밀번호"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={getFormChanger(setPassword)}
            />
            <div className="my-3">
              <ButtonBox btnName="로그인" width="w-full" onClick={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminLogin;
