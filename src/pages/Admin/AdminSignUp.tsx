import React, { useState, useEffect } from "react";
import LoginFormInput from "@components/AdminAuthFormInput";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { debounce, set } from "lodash";
import Button from "@components/Button";
import logo from "@assets/icon/wipLogo.svg";
import { createPortal } from "react-dom";
import Modal from "@components/Modal/Modal";
import { AdminAuthFormInputs } from "../../types/adminAuthTypes";
import EmailAuthBtn from "@components/EmailAuthBtn";
import EmailAuthTimer from "@components/emailTimer";
import { register } from "module";

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
  const [nickname, setNickname] = useState("");
  const [emailValidNum, setEmailValidNum] = useState("");
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [isEmailValidate, setIsEmailVlidate] = useState(false);
  const { remainingTime, startTimer, stopTimer, formatTime } = EmailAuthTimer({
    initialTime: 180,
  });

  useEffect(() => {
    // 타이머가 완료되면 모달 닫기
    if (remainingTime <= 0) {
      setShowEmailAuthModal(false);
    }
  }, [remainingTime]);

  const onSubmit = async (data: AdminAuthFormInputs) => {
    console.log(data);
    if (!isEmailValidate) {
      window.alert("이메일 인증번호가 일치하지 않습니다.");
      return;
    }

    setShowSignupCompleteModal(true);

    // const signupRes = await axios.post("http://localhost:2309/admin/api/v1/auth/signup", {
    //   login_name: data.email,
    //   password: data.password,
    //   nickname: data.nickname,
    // });

    // console.log(signupRes);
  };

  const resetTimer = () => {
    // setIsEmailRequested(true);
    console.log("재요청됨");
    stopTimer();
    startTimer();
  };

  const handleClickEmailAuth = debounce(() => {
    if (getValues("email").length == 0) {
      //이메일 입력값 x
      alert("이메일을 입력해주세요");
      return;
    }

    if (showEmailAuthModal) {
      //이메일 인증 재요청시
      resetTimer();
      axios.post(
        `http://localhost:2309/admin/api/v1/auth/email/authorization/${getValues(
          "email",
        )}`,
        { email: getValues("email") },
      );
    }
    //처음요청
    startTimer();
    setShowEmailAuthModal(true);

    alert("이메일 인증요청이 발송되었습니다");
    axios.post(
      `http://localhost:2309/admin/api/v1/auth/email/authorization/${getValues("email")}`,
      { email: getValues("email") },
    );
    console.log(getValues("email"));
  }, 300);

  const handleClickConfirmEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailValidNum) {
      window.alert("인증번호를 입력해주세요");
      return;
    }
    //이메일 인증메일 값 일치확인
    await axios
      .get(
        `http://localhost:2309/admin/api/v1/auth/email/verification?email=${getValues(
          "email",
        )}&auth_number=${emailValidNum}`,
      )
      .then(() => {
        window.alert("이메일 인증이 완료되었습니다");
        console.log("ddd");
        setIsEmailVlidate(true);
      })
      .catch((e) => {
        console.log(e);
        console.log("틀림");
        // setError('notValidEmailNum',{type:'custom'})
        window.alert("이메일 인증번호가 일치하지않습니다");
      });
  };

  const handleChangeAuthEmailNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValidNum(e.target.value);
  };

  const handleChangeNickNameDuplication = debounce((e) => {
    const nickname = e.target.value;
    setNickname(nickname);
    console.log(nickname);
    console.log("get" + nickname);
    axios
      .get(`http://localhost:2309/admin/api/v1/auth/nickname/${nickname}`)
      .then((response) => {
        console.log(response.data.detail);
        console.log(response);
        if (response.data.status !== 200) {
          setIsNicknameDuplicated(true);
          //hookform 에러 설정
          // if (isNicknameDuplicated) {
          //   console.log("중복");
          //   setError("nickname", {
          //     type: "duplicated",
          //     message: "닉네임이 중복되었습니다.",
          //   });
          // } else {
          //   setError("nickname", {
          //     type: "duplicated",
          //     message: "",
          //   });
          // }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    field.onChange(e);
  }, 300);

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
              <div className="flex flex-col">
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
                    <EmailAuthBtn type="button" onClick={handleClickEmailAuth}>
                      {showEmailAuthModal ? "재요청" : "인증하기"}
                    </EmailAuthBtn>
                  </div>
                </div>
                {showEmailAuthModal && (
                  <div className="w-[100%] text-[10px] text-center ">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="인증번호를 입력해주세요"
                        className="w-[95%] m-[10px] p-[8px] border rounded"
                        onChange={handleChangeAuthEmailNum}
                      />
                      <button
                        className="w-[50px] h-[25px] p-[5px] bg-violet-400 text-white font-semibold rounded"
                        onClick={handleClickConfirmEmail}
                      >
                        확인
                      </button>
                      <div className="w-[50px] h-[30px] flex items-center p-2">
                        {showEmailAuthModal && (
                          <div className="text-red-400">{formatTime(remainingTime)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
                  onChange={(e) => {
                    handleChangeNickNameDuplication(e);
                    field.onChange(e);
                    // 필드의 변경 사항을 React Hook Form에게 전달합니다.
                  }}
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
