import React, { useState } from "react";
import LoginFormInput from "@components/LoginFormInput";
import ButtonBox from "@components/Button";
import logo from "@assets/wipLogo.svg";

const AdminSignUp: React.FC = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const getFormChanger =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSignUp = () => {
    //회원가입로직
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <div className="flex flex-col items-center p-4 justify-center w-[358px] min-h-200 bg-[#faf5ff] rounded">
        <div className="w-[90%] p-[8px]">
          <img src={logo} alt="wip logo" className="px-[8px]" />
          <div className="font-semibold  text-[18px] my-[10px] px-[8px]">회원가입</div>
          <LoginFormInput
            label="이름"
            id="name"
            type="text"
            placeholder="이름을 입력해주세요(2~10자)"
            onChange={getFormChanger(setId)}
          />
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

          <LoginFormInput
            label="비밀번호 확인"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={getFormChanger(setPassword)}
          />

          <div className="flex justify-center m-[15px] translate-y-[10px]">
            <ButtonBox btnName="회원가입" width="w-full" onClick={handleSignUp} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSignUp;
