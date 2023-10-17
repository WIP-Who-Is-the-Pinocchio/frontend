import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginFormInput from "@components/LoginFormInput";
import Button from "@components/Button";
import logo from "@assets/wipLogo.svg";
import { AdminAuthFormInputs } from "@utils/Types/adminAuthTypes";

const AdminLogin: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminAuthFormInputs>({
    criteriaMode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: AdminAuthFormInputs) => {
    const loginRes = await axios.post("http://localhost:2309/admin/api/v1/auth/login", {
      login_name: data.email,
      password: data.password,
    });
    window.alert("로그인되었습니다:)");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <form
        className="flex flex-col items-center justify-center w-[358px] min-h-200 p-4 bg-[#faf5ff] rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[90%] ">
          <img className="m-[8px]" src={logo} alt="wip logo" />
          <div className="font-semibold  text-[18px] m-[8px]">로그인</div>
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
                placeholder="비밀번호를 입력해주세요"
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

          <div className="m-[10px]">
            <Button className="w-full" type="submit">
              로그인
            </Button>
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
