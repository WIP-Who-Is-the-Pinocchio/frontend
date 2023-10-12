import React, { useState } from "react";
import type { ChangeEventHandler } from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  Path,
  Controller,
} from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import LoginFormInput from "@components/LoginFormInput";
import Button from "@components/Button";
// import logo from "@assets/wipLogo.svg";
// import ValidationMessage from "@components/ValidaionMessage";
// import { isEmpty } from "@utils/isEmpty";
// import { getUserData, User } from "../../data/LoginTest";
import { AdminAuthFormInputs } from "@utils/Types/adminAuthTypes";

// interface FormInputs {
//   email: string;
//   nickname: string;
//   password: string;
//   passwordCheck: string;
// }

// interface LoginFormInput {
//   label: string;
//   type: string;
//   id: Path<FormInputs>;
//   placeholder?: string;
//   register: UseFormRegister<FormInputs>;
//   required: boolean;
//   // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const AdminLogin: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminAuthFormInputs>({
    criteriaMode: "all",
  });
  // const { register, handleSubmit } = useForm<FormInputs>();
  // const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  // const onSubmit: SubmitHandler<IFormValues> = (data) => {
  //   alert(JSON.stringify(data))
  // }

  //
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showMessages, setShowMessages] = useState(false);
  // const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  // const [isLoginAttempted, setIsLoginAttempted] = useState(false);
  // const navigate = useNavigate();

  const onSubmit = (data: AdminAuthFormInputs) => console.log(data);

  // const handleChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setPassword(e.target.value);
  // };

  //로그인 로직
  const handleLogin = async () => {
    // setIsLoginAttempted(true);
    // const user = getUserData().find(
    //   (u: User) => u.email === email && u.password === password,
    // );
    // if (user) {
    //   // 유효한 아이디와 비밀번호일 때 로그인 로직 수행
    //   setIsLoginSuccess(true);
    //   setShowMessages(true);
    //   //로그인 후 값 초기화
    //   setEmail("");
    //   setPassword("");
    //   navigate("/");
    //   return;
    // }
    // if (isEmpty(email) || isEmpty(password)) {
    //   setShowMessages(true);
    //   setIsLoginSuccess(false);
    // }
    // const res = await axios.post("http://localhost:2309/admin/api/v1/auth/login", {
    //   login_name: email,
    //   password: password,
    // });
    // console.log(res);
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <form
        className="flex flex-col items-center justify-center w-[358px] min-h-200 p-4 bg-[#faf5ff] rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[90%] ">
          {/* <img className="m-[8px]" src={logo} alt="wip logo" /> */}
          <div className="font-semibold  text-[18px] m-[8px]">로그인</div>
          {/* <input
            {...register("email", {
              required: "이메일은 필수 항목입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z](-_\.?[0-9A-Za-z])*@[0-9a-zA-Z](-_\.]?[0-9A-Za-z])*\.[a-zA-Z]{2,3}$/,
                message: "이메일 형식이 아닙니다",
              },
            })}
          /> */}

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value:
                  /^[0-9a-zA-Z](-_\.?[0-9A-Za-z])*@[0-9a-zA-Z](-_\.]?[0-9A-Za-z])*\.[a-zA-Z]{2,3}$/,
                message: "이메일 형식이 아닙니다",
              },
              required: "이메일은 필수 항목입니다.",
            }}
            render={({ field }) => (
              <LoginFormInput
                {...field}
                label="이메일"
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={
              ({ messages }) => messages && console.log(errors)
              // Object.entries(messages).map(([type, message]) => (
              //   <p className="text-red-500 text-[10px] font-medium" key={type}>
              //     ⚠️{message}
              //     {/* {Object.entries(message)} */}
              //   </p>
              // ))
            }
          />
          {/* <input {...register("nickName", { min: 2, max: 10 })} />
          <input type="password" {...register("password", { min: 1, max: 6 })} />
          <input type="passwordCheck" {...register("password", { min: 1, max: 6 })} /> */}
          {/* <LoginFormInput
            label="이메일"
            id="email"
            type="text"
            placeholder="아이디를 입력해주세요"
            required={true}
            register={register}
            pattern={{
              value: /^\S+@\S+$/i,
              message: "이메일 형식이 아닙니다",
            }}
          /> */}

          {/* <ValidationMessage isValid={showMessages && isEmpty(password)}>
            * 아이디를 입력해주세요.
          </ValidationMessage>
          <LoginFormInput
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChangePassword}
          />
          <ValidationMessage isValid={showMessages && isEmpty(password)}>
            * 비밀번호를 입력해주세요.
          </ValidationMessage>
          {!isLoginSuccess &&
            !isEmpty(email) &&
            !isEmpty(password) &&
            isLoginAttempted && (
              <div className="text-red-500 text-[10px] font-medium">
                * 아이디와 비밀번호를 확인해주세요
              </div>
            )} */}

          <div className="m-[10px]">
            <input type="submit" />
            {/* <Button className="w-full">로그인</Button> */}
          </div>
          <div className=" w-full flex justify-center items-center ">
            <div className="w-[28%] h-0 mx-[7px] border-solid border-[1px] border-grey-100"></div>
            <div style={{ fontSize: "10px", zoom: 0.8 }}>
              <p className="text-slate-400">아직 회원이 아니신가요?</p>
            </div>
            <div className="w-[28%] h-0 mx-[7px] border-solid border-[1px] border-grey-100"></div>
          </div>
          <div className="m-[10px]">
            <a
              href="/admin/signup"
              className="w-full text-white text-center text-sm p-[5px] block bg-violet-500 rounded font-semibold"
            >
              회원가입
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AdminLogin;
