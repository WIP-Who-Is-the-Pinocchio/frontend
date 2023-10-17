import React from "react";
import LoginFormInput from "@components/LoginFormInput";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Button from "@components/Button";
import logo from "@assets/wipLogo.svg";
import Modal from "@components/Modal/Modal";
import { AdminAuthFormInputs } from "@utils/Types/adminAuthTypes";

const AdminSignUp: React.FC = () => {
  const {
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminAuthFormInputs>({
    criteriaMode: "all",
  });

  const onSubmit = async (data: AdminAuthFormInputs) => {
    const signupRes = await axios.post("http://localhost:2309/admin/api/v1/auth/signup", {
      login_name: data.email,
      password: data.password,
      nickname: data.nickname,
    });
    console.log(signupRes);
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <form
        className="flex flex-col items-center justify-center w-[358px] min-h-200 bg-[#faf5ff] p-4 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              <LoginFormInput
                {...field}
                label="닉네임"
                id="nickname"
                type="text"
                placeholder="비밀번호를 입력해주세요"
              />
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
                placeholder="비밀번호를 입력해주세요"
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
