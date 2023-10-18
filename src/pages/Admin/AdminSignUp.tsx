import React, { useState, useEffect } from "react";
import LoginFormInput from "@components/AdminAuthFormInput";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Button from "@components/Button";
import logo from "@assets/icon/wipLogo.svg";
import { createPortal } from "react-dom";
import Modal from "@components/Modal/Modal";
import { AdminAuthFormInputs } from "@utils/Types/adminAuthTypes";
import EmailAuthBtn from "@components/EmailAuthBtn";

const AdminSignUp: React.FC = () => {
  const {
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminAuthFormInputs>({
    criteriaMode: "all",
  });

  const [showSignupCompleteModal, setShowSignupCompleteModal] = useState(false);
  const [showEmailAuthModal, setShowEmailAuthModal] = useState(false);
  const [_, setShouldNavigate] = useState(false);

  const onSubmit = async (data: AdminAuthFormInputs) => {
    console.log(data);
    setShowSignupCompleteModal(true);
    setShouldNavigate(true);

    // const signupRes = await axios.post("http://localhost:2309/admin/api/v1/auth/signup", {
    //   login_name: data.email,
    //   password: data.password,
    //   nickname: data.nickname,
    // });

    // console.log(signupRes);
  };
  const handleClickEmailAuth = () => {
    setShowEmailAuthModal(true);
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <form
        className="flex flex-col items-center justify-evenly w-[358px] min-h-200 bg-[#faf5ff] p-4 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        {showSignupCompleteModal &&
          createPortal(
            <Modal onClose={() => setShowSignupCompleteModal(false)} shouldNavigate>
              <div className="w-[150px] p-[10px] text-[10px] text-center ">
                회원가입이 완료되었습니다.
              </div>
            </Modal>,
            document.body,
          )}

        {showEmailAuthModal &&
          createPortal(
            <Modal onClose={() => setShowSignupCompleteModal(false)} shouldNavigate>
              <div className="flex flex-col justify-center items-center w-[200px] p-[10px] text-[10px] text-center ">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    className="m-[15px] p-[10px] border rounded"
                  />
                  <div className="w-[50px] h-[30px] p-[10px] bg-slate-200"> 시간</div>
                </div>
                <button className="w-[50px] h-[25px] p-[5px] bg-violet-400 text-white font-semibold rounded ">
                  확인
                </button>
              </div>
            </Modal>,
            document.body,
          )}
        <div className="w-[90%] p-[8px]">
          <img src={logo} alt="wip logo" className="px-[8px]" />
          <div className="my-[10px] px-[8px] font-semibold text-[18px] ">회원가입</div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                message: "이메일 형식이 아닙니다",
              },
              required: "이메일은 필수 항목입니다.",
            }}
            render={({ field }) => (
              <div className="flex items-center">
                <LoginFormInput
                  {...field}
                  label="이메일"
                  id="email"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  className="w-[200px]"
                />
                <div className="translate-y-[10px]">
                  <EmailAuthBtn type="button" onClick={handleClickEmailAuth} />
                </div>
              </div>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="text-red-500 text-[10px] font-medium" key={type}>
                  ⚠️{message}
                </p>
              ))
            }
          />
          <Controller
            name="nickname"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 10,
                message: "닉네임은 10글자 이하입니다.",
              },
              required: "닉네임은 필수 항목입니다.",
            }}
            render={({ field }) => (
              <div>
                <LoginFormInput
                  {...field}
                  label="닉네임"
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                />
              </div>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="nickname"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="text-red-500 text-[10px] font-medium" key={type}>
                  ⚠️{message}
                </p>
              ))
            }
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              minLength: {
                value: 8,
                message: "비밀번호는 8자리 이상입니다",
              },
              required: "비밀번호은 필수 항목입니다.",
            }}
            render={({ field }) => (
              <LoginFormInput
                {...field}
                label="비밀번호"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요(8자리 이상)"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="text-red-500 text-[10px] font-medium" key={type}>
                  ⚠️{message}
                </p>
              ))
            }
          />
          <Controller
            name="passwordCheck"
            control={control}
            defaultValue=""
            rules={{
              minLength: {
                value: 8,
                message: "비밀번호는 8자리 이상입니다",
              },
              validate: (value) => {
                return value === getValues("password") || "비밀번호가 일치하지 않습니다.";
              },
              required: "비밀번호은 필수 항목입니다.",
            }}
            render={({ field }) => (
              <LoginFormInput
                {...field}
                label="비밀번호 확인"
                id="passwordCheck"
                type="password"
                placeholder="비밀번호를 입력해주세요(8자리 이상)"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="passwordCheck"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="text-red-500 text-[10px] font-medium" key={type}>
                  ⚠️{message}
                </p>
              ))
            }
          />
          <div className="flex justify-center m-[10px] translate-y-[10px]">
            <Button className="w-full" type="submit">
              회원가입
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AdminSignUp;
