import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormInput from "@components/LoginFormInput";
import ButtonBox from "@components/Button";
import logo from "@assets/wipLogo.svg";
import ValidationMessage from "@utils/ValidaionMessage";
import { isEmpty } from "@utils/loginValidation";
import { getUserData, User } from "../../data/LoginTest";

const AdminLogin: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);
  const navigate = useNavigate();

  const getFormChanger =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  //로그인 로직
  const handleLogin = () => {
    setIsLoginAttempted(true);
    const account = getUserData().find(
      (account: User) => account.id === id && account.password === password,
    );

    if (account) {
      // 유효한 아이디와 비밀번호일 때 로그인 로직 수행
      setIsLoginSuccess(true);
      setShowMessages(true);
      navigate("/");

      //로그인 후 값 초기화
      setId("");
      setPassword("");
    } else if (isEmpty(id) || isEmpty(password)) {
      setShowMessages(true);
      setIsLoginSuccess(false);
    }
  };

  const handleGoToSignUp = () => {
    navigate("/admin/signup");
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <div className="flex flex-col items-start p-4 justify-center w-[358px] min-h-200 bg-[#faf5ff] rounded">
        <div className="w-full">
          <img src={logo} alt="wip logo" />
          <div className="font-semibold  text-xl my-[10px]">로그인</div>

          <LoginFormInput
            label="아이디"
            id="id"
            type="text"
            placeholder="아이디를 입력해주세요"
            onChange={getFormChanger(setId)}
          />
          <ValidationMessage
            show={showMessages}
            check={isEmpty(id)}
            message={"* 아이디를 입력해주세요."}
          />

          <LoginFormInput
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={getFormChanger(setPassword)}
          />
          <ValidationMessage
            show={showMessages}
            check={isEmpty(password)}
            message={"* 비밀번호를 입력해주세요."}
          />
          {!isLoginSuccess && !isEmpty(id) && !isEmpty(password) && isLoginAttempted && (
            <div className="text-red-500 text-[10px] font-medium">
              * 아이디와 비밀번호를 확인해주세요
            </div>
          )}

          <div className="my-[20px]">
            <ButtonBox btnName="로그인" width="w-full" onClick={handleLogin} />
          </div>

          <div className=" w-full flex justify-items-center items-center ">
            <div className="w-[33%] h-[0]  mx-[5px] border-solid border-[1px] border-grey-100"></div>
            <div style={{ fontSize: "10px", zoom: 0.8 }}>
              <p className="text-slate-400">아직 회원이 아니신가요?</p>
            </div>
            <div className="w-[33%] h-[0] mx-[5px] border-solid border-[1px] border-grey-100"></div>
          </div>
          <div className="my-[20px]">
            <ButtonBox
              btnName="회원가입"
              width="w-full"
              color="violet-500"
              onClick={handleGoToSignUp}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
