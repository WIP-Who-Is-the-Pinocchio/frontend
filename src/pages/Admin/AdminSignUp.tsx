import React, { useState } from "react";
import type { ChangeEventHandler } from "react";
import LoginFormInput from "@components/LoginFormInput";
import Button from "@components/Button";
import logo from "@assets/wipLogo.svg";
import Modal from "@components/Modal/Modal";

const AdminSignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeNickName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickName(e.target.value);
  };

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleSignUp = () => {
    //회원가입로직
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      {isModalOpen && (
        <Modal
          closeModal={() => {
            setIsModalOpen(false);
          }}
        >
          <>
            <p>회원가입 추카츄카</p>
          </>
        </Modal>
      )}

      <form className="flex flex-col items-center justify-center w-[358px] min-h-200 bg-[#faf5ff] p-4 rounded">
        <div className="w-[90%] p-[8px]">
          <img src={logo} alt="wip logo" className="px-[8px]" />
          <div className="my-[10px] px-[8px] font-semibold text-[18px] ">회원가입</div>
          <LoginFormInput
            label="이메일"
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={handleChangeEmail}
          />
          <LoginFormInput
            label="닉네임"
            id="nickName"
            type="text"
            placeholder="닉네임을을 입력해주세요"
            onChange={handleChangeNickName}
          />
          <LoginFormInput
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChangePassword}
          />
          <LoginFormInput
            label="비밀번호 확인"
            id="passwordCheck"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChangePasswordCheck}
          />
          <div className="flex justify-center m-[10px] translate-y-[10px]">
            <Button className="w-full" onClick={handleSignUp}>
              회원가입
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AdminSignUp;
